import { leadConstants } from '@/lib/lead/constants';
import { leadRedis } from '@/lib/lead/redis';

type RateLimitResult = {
  success: boolean;
};

export async function checkRateLimit(key: string): Promise<RateLimitResult> {
  const now = Date.now();
  const windowMs = parseDurationToMs(leadConstants.rateLimitWindow);
  const windowStart = now - windowMs;
  const redisKey = `rl:lead:${key}`;

  const pipelineResult = await leadRedis.pipeline<number>([
    ['ZREMRANGEBYSCORE', redisKey, 0, windowStart],
    ['ZCARD', redisKey],
    ['ZADD', redisKey, now, `${now}-${crypto.randomUUID()}`],
    ['PEXPIRE', redisKey, windowMs]
  ]);

  const count = pipelineResult[1];

  return { success: count < leadConstants.rateLimitMax };
}

function parseDurationToMs(value: string): number {
  const normalized = value.trim().toLowerCase();
  const match = normalized.match(/^(\d+)\s*(ms|s|m|h|d)$/);

  if (!match) {
    return 30 * 60_000;
  }

  const amount = Number.parseInt(match[1], 10);
  const unit = match[2];

  if (unit === 'ms') {
    return amount;
  }
  if (unit === 's') {
    return amount * 1_000;
  }
  if (unit === 'm') {
    return amount * 60_000;
  }
  if (unit === 'h') {
    return amount * 60 * 60_000;
  }

  return amount * 24 * 60 * 60_000;
}
