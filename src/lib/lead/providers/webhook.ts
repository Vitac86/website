import type { LeadPayload } from '@/types/lead';

export async function sendLeadWebhook(payload: LeadPayload): Promise<void> {
  const webhookUrl = process.env.WEBHOOK_URL;
  if (!webhookUrl) {
    console.log('[lead:webhook:skip] WEBHOOK_URL is not set');
    return;
  }
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Webhook error: ${response.status} ${body}`.trim());
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown webhook error';
    throw new Error(`Webhook request failed: ${message}`);
  }
}
