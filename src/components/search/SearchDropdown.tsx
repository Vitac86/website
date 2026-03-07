'use client';

import Link from 'next/link';

import { highlightText } from '@/components/search/highlight';
import type { Product } from '@/types/product';

type Props = {
  query: string;
  results: Product[];
  selectedIndex: number;
  onSelectIndex: (index: number) => void;
};

export function SearchDropdown({ query, results, selectedIndex, onSelectIndex }: Props): JSX.Element | null {
  if (!query) {
    return null;
  }

  return (
    <div id="search-suggestions" className="surface-panel absolute top-full z-20 mt-2 w-full overflow-hidden">
      <ul role="listbox" aria-label="Подсказки поиска">
        {results.map((result, index) => (
          <li key={result.id} role="option" aria-selected={index === selectedIndex}>
            <Link
              href={`/tovar/${result.slug}`}
              className={`block px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 ${
                index === selectedIndex ? 'bg-brand/10 text-brand' : 'hover:bg-slate-50'
              }`}
              onMouseEnter={() => onSelectIndex(index)}
            >
              {highlightText(result.name, query)}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href={`/katalog?q=${encodeURIComponent(query)}`}
        className="block rounded-b-lg border-t border-slate-200 px-3 py-2 text-sm font-medium text-brand transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
      >
        Показать все результаты
      </Link>
    </div>
  );
}
