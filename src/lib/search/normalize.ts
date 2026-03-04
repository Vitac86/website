export function normalizeSearchText(value: string): string {
  return value.toLowerCase().trim().replace(/\s+/g, ' ');
}
