import { normalizeSearchText } from '@/lib/search/normalize';

export function highlightText(value: string, query: string): string {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) {
    return value;
  }

  const index = normalizeSearchText(value).indexOf(normalizedQuery);
  if (index === -1) {
    return value;
  }

  const end = index + normalizedQuery.length;
  return `${value.slice(0, index)}<mark>${value.slice(index, end)}</mark>${value.slice(end)}`;
}
