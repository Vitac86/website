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
const RESERVE_DUPLICATE_SLOT_SCRIPT = `
local key = KEYS[1]
local maxAccepted = tonumber(ARGV[1])
local ttlSeconds = tonumber(ARGV[2])

local current = tonumber(redis.call('GET', key) or '0')
if current >= maxAccepted then
  return 0
end

local nextCount = redis.call('INCR', key)
if nextCount == 1 then
  redis.call('EXPIRE', key, ttlSeconds)
end

return 1
`;

export async function reserveDuplicateLeadSlot(name: string, phone: string): Promise<boolean> {
  const key = buildDuplicateKey(name, phone);
  const result = await leadRedis.command<number>([
    'EVAL',
    RESERVE_DUPLICATE_SLOT_SCRIPT,
    1,
    key,
    leadConstants.duplicateMaxAccepted,
    duplicateWindowSeconds
  ]);

  return result === 1;
}

export async function releaseDuplicateLeadSlot(name: string, phone: string): Promise<void> {
  const key = buildDuplicateKey(name, phone);
  const nextCount = await leadRedis.command<number>(['DECR', key]);

  if (nextCount <= 0) {
    await leadRedis.command<number>(['DEL', key]);
  }
}
