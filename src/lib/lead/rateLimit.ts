const bucket = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 10 * 60_000;
const LIMIT = 5;

export function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const entry = bucket.get(key);

  if (!entry || now - entry.ts > WINDOW_MS) {
    bucket.set(key, { count: 1, ts: now });
    return true;
  }

  if (entry.count >= LIMIT) {
    return false;
  }

  bucket.set(key, { count: entry.count + 1, ts: entry.ts });
  return true;
}
