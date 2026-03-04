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
    <div className="absolute top-full z-20 mt-2 w-full rounded-md border bg-white shadow">
      <ul>
        {results.map((result, index) => (
          <li key={result.id}>
            <Link
              href={`/tovar/${result.slug}`}
              className={`block px-3 py-2 text-sm ${index === selectedIndex ? 'bg-slate-100' : ''}`}
              onMouseEnter={() => onSelectIndex(index)}
              dangerouslySetInnerHTML={{ __html: highlightText(result.name, query) }}
            />
          </li>
        ))}
      </ul>
      <Link href={`/katalog?q=${encodeURIComponent(query)}`} className="block border-t px-3 py-2 text-sm font-medium text-brand">
        Показать все результаты
      </Link>
    </div>
  );
}
