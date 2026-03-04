import { NextRequest, NextResponse } from 'next/server';

import { checkRateLimit } from '@/lib/lead/rateLimit';
import { sendLeadEmail } from '@/lib/lead/providers/email';
import { saveLeadToDb } from '@/lib/lead/providers/db';
import { sendLeadWebhook } from '@/lib/lead/providers/webhook';
import { validateLead } from '@/lib/lead/validate';
import type { LeadPayload } from '@/types/lead';

export async function POST(request: NextRequest): Promise<NextResponse> {
  const ip = request.headers.get('x-forwarded-for') ?? 'anonymous';
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ ok: false, error: 'Слишком много запросов' }, { status: 429 });
  }

  const body = (await request.json()) as LeadPayload;
  const validation = validateLead(body);

  if (!validation.valid || !validation.normalized) {
    return NextResponse.json({ ok: false, error: validation.error ?? 'Ошибка валидации' }, { status: 400 });
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

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Ошибка провайдера';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
