import { NextRequest, NextResponse } from 'next/server';

import { leadConstants } from '@/lib/lead/constants';
import { canProcessDuplicateLead, markDuplicateLeadProcessed } from '@/lib/lead/duplicate';
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

export async function POST(request: NextRequest): Promise<NextResponse> {
  const ip = getRequestIp(request);

  try {
    const rateLimit = await checkRateLimit(ip);
    if (!rateLimit.success) {
      return NextResponse.json({ ok: false, error: RATE_LIMIT_MESSAGE }, { status: 429 });
    }
  } catch {
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
  } catch {
    return NextResponse.json({ ok: false, error: SERVICE_UNAVAILABLE_MESSAGE }, { status: 500 });
  }

  if (typeof body.formStartedAt !== 'number' || Date.now() - body.formStartedAt < leadConstants.minFillMs) {
    return NextResponse.json({ ok: true });
  }

  try {
    const canProcess = await canProcessDuplicateLead(validation.normalized.name, validation.normalized.phone);
    if (!canProcess) {
      return NextResponse.json({ ok: true });
    }
  } catch {
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
    const message = error instanceof Error ? error.message : 'Ошибка провайдера';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }

  try {
    await markDuplicateLeadProcessed(validation.normalized.name, validation.normalized.phone);
  } catch {
    return NextResponse.json({ ok: false, error: SERVICE_UNAVAILABLE_MESSAGE }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
