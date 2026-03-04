'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import { SearchDropdown } from '@/components/search/SearchDropdown';
import { useSearch } from '@/components/search/useSearch';
import type { Product } from '@/types/product';

type Props = {
  products: Product[];
};

export function HeaderSearch({ products }: Props): JSX.Element {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const router = useRouter();
  const results = useSearch(products, query, 8);
  const hasResults = query.length > 0 && results.length > 0;

  const activeProduct = useMemo(() => {
    if (selectedIndex < 0 || selectedIndex >= results.length) {
      return null;
    }
    return results[selectedIndex];
  }, [results, selectedIndex]);

  return (
    <div className="relative w-full max-w-md">
      <input
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setSelectedIndex(-1);
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown') {
            event.preventDefault();
            setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
          }
          if (event.key === 'ArrowUp') {
            event.preventDefault();
            setSelectedIndex((prev) => Math.max(prev - 1, -1));
          }
          if (event.key === 'Escape') {
            setQuery('');
            setSelectedIndex(-1);
          }
          if (event.key === 'Enter') {
            event.preventDefault();
            if (activeProduct) {
              router.push(`/tovar/${activeProduct.slug}`);
              return;
            }
            router.push(`/katalog?q=${encodeURIComponent(query)}`);
          }
        }}
        placeholder="Поиск по каталогу"
        className="w-full rounded-md border px-3 py-2 text-sm"
      />
      {hasResults ? (
        <SearchDropdown query={query} results={results} selectedIndex={selectedIndex} onSelectIndex={setSelectedIndex} />
      ) : null}
    </div>
  );
}
