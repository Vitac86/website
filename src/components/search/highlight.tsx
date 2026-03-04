import type { ReactNode } from 'react';

import { normalizeSearchText } from '@/lib/search/normalize';

export function highlightText(value: string, query: string): ReactNode {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) {
    return value;
  }

  const normalizedValue = normalizeSearchText(value);
  const matchIndex = normalizedValue.indexOf(normalizedQuery);
  if (matchIndex === -1) {
    return value;
  }

  const endIndex = matchIndex + normalizedQuery.length;

  return (
    <>
      {value.slice(0, matchIndex)}
      <mark className="rounded bg-amber-100 px-0.5 text-inherit">{value.slice(matchIndex, endIndex)}</mark>
      {value.slice(endIndex)}
    </>
  );
}
