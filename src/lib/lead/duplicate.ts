import { createHash } from 'node:crypto';

import { leadConstants } from '@/lib/lead/constants';
import { leadRedis } from '@/lib/lead/redis';

function normalizeNameForDuplicate(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, ' ');
}

function buildDuplicateKey(name: string, phone: string): string {
  const normalized = `${normalizeNameForDuplicate(name)}|${phone}`;
  const hash = createHash('sha256').update(normalized).digest('hex');
  return `dup:lead:${hash}`;
}

const duplicateWindowSeconds = leadConstants.duplicateWindowHours * 60 * 60;

export async function canProcessDuplicateLead(name: string, phone: string): Promise<boolean> {
  const key = buildDuplicateKey(name, phone);
  const count = await leadRedis.command<number | null>(['GET', key]);
  return Number(count ?? 0) < leadConstants.duplicateMaxAccepted;
}

export async function markDuplicateLeadProcessed(name: string, phone: string): Promise<void> {
  const key = buildDuplicateKey(name, phone);
  const nextCount = await leadRedis.command<number>(['INCR', key]);

  if (nextCount === 1) {
    await leadRedis.command<number>(['EXPIRE', key, duplicateWindowSeconds]);
  }
}
