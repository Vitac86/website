import type { LeadPayload } from '@/types/lead';

export async function sendLeadEmail(payload: LeadPayload): Promise<void> {
  console.log('[lead:email]', {
    to: process.env.SMTP_TO,
    host: process.env.SMTP_HOST,
    payload
  });
}
