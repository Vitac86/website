const DEFAULT_RATE_LIMIT_MAX = 5;
const DEFAULT_RATE_LIMIT_WINDOW = '30 m';
const DEFAULT_MIN_FILL_MS = 3000;
const DEFAULT_MAX_FILL_AGE_MS = 24 * 60 * 60 * 1000;
const DEFAULT_DUPLICATE_WINDOW_HOURS = 24;
const DEFAULT_DUPLICATE_MAX_ACCEPTED = 2;

function readInt(name: string, fallback: number): number {
  const value = process.env[name];
  if (!value) {
    return fallback;
  }

  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export const leadConstants = {
  rateLimitMax: readInt('LEAD_RATE_LIMIT_MAX', DEFAULT_RATE_LIMIT_MAX),
  rateLimitWindow: process.env.LEAD_RATE_LIMIT_WINDOW || DEFAULT_RATE_LIMIT_WINDOW,
  minFillMs: readInt('LEAD_MIN_FILL_MS', DEFAULT_MIN_FILL_MS),
  maxFillAgeMs: DEFAULT_MAX_FILL_AGE_MS,
  duplicateWindowHours: readInt('LEAD_DUPLICATE_WINDOW_HOURS', DEFAULT_DUPLICATE_WINDOW_HOURS),
  duplicateMaxAccepted: readInt('LEAD_DUPLICATE_MAX_ACCEPTED', DEFAULT_DUPLICATE_MAX_ACCEPTED)
};
