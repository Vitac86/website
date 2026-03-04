export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-zа-я0-9\s-]/gi, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}
