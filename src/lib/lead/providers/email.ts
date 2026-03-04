import type { LeadPayload } from '@/types/lead';

export async function sendLeadEmail(payload: LeadPayload): Promise<void> {
  const lines = [
    '[lead:email] New lead received',
    `name: ${payload.name}`,
    `phone: ${payload.phone}`,
    `consent: ${payload.consent ? 'yes' : 'no'}`,
    `page: ${payload.page ?? '-'}`,
    `utm: ${payload.utm ? JSON.stringify(payload.utm) : '-'}`,
    `smtp_host: ${process.env.SMTP_HOST ?? '-'}`,
    `smtp_to: ${process.env.SMTP_TO ?? '-'}`
  ];

  console.log(lines.join('\n'));
}
