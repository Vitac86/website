import type { LeadPayload } from '@/types/lead';

export async function saveLeadToDb(payload: LeadPayload): Promise<void> {
  console.log('[lead:db:stub]', payload);
}
