import { NextRequest, NextResponse } from 'next/server';

import { leadConstants } from '@/lib/lead/constants';
import { releaseDuplicateLeadSlot, reserveDuplicateLeadSlot } from '@/lib/lead/duplicate';
import { getRequestIp } from '@/lib/lead/ip';
import { sendLeadEmail } from '@/lib/lead/providers/email';
import { saveLeadToDb } from '@/lib/lead/providers/db';
import { sendLeadWebhook } from '@/lib/lead/providers/webhook';
import { checkRateLimit } from '@/lib/lead/rateLimit';
import { validateLead } from '@/lib/lead/validate';
import { verifyTurnstileToken } from '@/lib/lead/turnstile';
import type { LeadPayload } from '@/types/lead';

const TURNSTILE_FAIL_MESSAGE = 'Не удалось подтвердить отправку. Попробуйте ещё раз.';
const RATE_LIMIT_MESSAGE = 'Слишком много запросов. Попробуйте позже.';
const SERVICE_UNAVAILABLE_MESSAGE = 'Сервис временно недоступен. Попробуйте позже.';
const CONFIG_UNAVAILABLE_MESSAGE = 'Форма временно недоступна из-за конфигурации. Попробуйте позже.';

function isConfigError(error: unknown): boolean {
  if (!(error instanceof Error)) {
    return false;
  }

  return error.message === 'Redis is not configured' || error.message === 'Turnstile is not configured';
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const ip = getRequestIp(request);

  try {
    const rateLimit = await checkRateLimit(ip);
    if (!rateLimit.success) {
      return NextResponse.json({ ok: false, error: RATE_LIMIT_MESSAGE }, { status: 429 });
    }
  } catch (error) {
    if (isConfigError(error)) {
      return NextResponse.json({ ok: false, error: CONFIG_UNAVAILABLE_MESSAGE }, { status: 503 });
    }

    return NextResponse.json({ ok: false, error: SERVICE_UNAVAILABLE_MESSAGE }, { status: 500 });
  }

  let body: LeadPayload;

  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ ok: false, error: 'Некорректный JSON' }, { status: 400 });
  }

  if (typeof body.company === 'string' && body.company.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const validation = validateLead(body);

  if (!validation.valid || !validation.normalized) {
    return NextResponse.json({ ok: false, error: validation.error ?? 'Ошибка валидации' }, { status: 400 });
  }

  if (!body.turnstileToken || body.turnstileToken.trim().length === 0) {
    return NextResponse.json({ ok: false, error: TURNSTILE_FAIL_MESSAGE }, { status: 400 });
  }

  try {
    const turnstile = await verifyTurnstileToken(body.turnstileToken, ip);
    if (!turnstile.success) {
      return NextResponse.json({ ok: false, error: TURNSTILE_FAIL_MESSAGE }, { status: 400 });
    }
  } catch (error) {
    if (isConfigError(error)) {
      return NextResponse.json({ ok: false, error: CONFIG_UNAVAILABLE_MESSAGE }, { status: 503 });
    }

    return NextResponse.json({ ok: false, error: SERVICE_UNAVAILABLE_MESSAGE }, { status: 500 });
  }

  const formStartedAt = body.formStartedAt;
  if (typeof formStartedAt !== 'number' || !Number.isFinite(formStartedAt)) {
    return NextResponse.json({ ok: true });
  }

  const now = Date.now();
  const fillDurationMs = now - formStartedAt;

  if (fillDurationMs < leadConstants.minFillMs) {
    return NextResponse.json({ ok: true });
  }

  if (fillDurationMs < 0 || fillDurationMs > leadConstants.maxFillAgeMs) {
    return NextResponse.json({ ok: true });
  }

  let duplicateSlotReserved = false;

  try {
    duplicateSlotReserved = await reserveDuplicateLeadSlot(validation.normalized.name, validation.normalized.phone);
    if (!duplicateSlotReserved) {
      return NextResponse.json({ ok: true });
    }
  } catch (error) {
    if (isConfigError(error)) {
      return NextResponse.json({ ok: false, error: CONFIG_UNAVAILABLE_MESSAGE }, { status: 503 });
    }

    return NextResponse.json({ ok: false, error: SERVICE_UNAVAILABLE_MESSAGE }, { status: 500 });
  }

  const provider = process.env.LEAD_PROVIDER ?? 'email';

  try {
    if (provider === 'db') {
      await saveLeadToDb(validation.normalized);
    } else if (provider === 'webhook') {
      await sendLeadWebhook(validation.normalized);
    } else {
      await sendLeadEmail(validation.normalized);
    }
  } catch (error) {
    if (duplicateSlotReserved) {
      try {
        await releaseDuplicateLeadSlot(validation.normalized.name, validation.normalized.phone);
      } catch (releaseError) {
        console.error('Failed to release duplicate slot after provider error', releaseError);
      }
    }

    console.error('Lead provider failed', error);
    return NextResponse.json({ ok: false, error: SERVICE_UNAVAILABLE_MESSAGE }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
