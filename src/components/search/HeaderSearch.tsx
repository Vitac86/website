'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

import { SearchDropdown } from '@/components/search/SearchDropdown';
import { useSearch } from '@/components/search/useSearch';
import type { Product } from '@/types/product';

type Props = {
  products: Product[];
};

export function HeaderSearch({ products }: Props): JSX.Element {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const results = useSearch(products, debouncedQuery, 8);
  const trimmedQuery = query.trim();
  const hasQuery = trimmedQuery.length > 0;
  const hasResults = isOpen && hasQuery && results.length > 0;

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setDebouncedQuery(query);
    }, 200);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [query]);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent): void => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', onPointerDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
    };
  }, []);

  useEffect(() => {
    if (selectedIndex >= results.length) {
      setSelectedIndex(-1);
    }
  }, [results.length, selectedIndex]);

  const activeProduct = useMemo(() => {
    if (selectedIndex < 0 || selectedIndex >= results.length) {
      return null;
    }
    return results[selectedIndex];
  }, [results, selectedIndex]);

  return (
    <div ref={rootRef} className="relative w-full max-w-xl">
      <label htmlFor="header-search" className="sr-only">
        Поиск по каталогу
      </label>
      <input
        id="header-search"
        aria-label="Поиск по каталогу"
        aria-expanded={hasResults}
        aria-controls="search-suggestions"
        role="combobox"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setSelectedIndex(-1);
          setIsOpen(event.target.value.trim().length > 0);
        }}
        onFocus={() => {
          if (query.trim().length > 0) {
            setIsOpen(true);
          }
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown') {
            event.preventDefault();
            setIsOpen(true);
            setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
          }
          if (event.key === 'ArrowUp') {
            event.preventDefault();
            setIsOpen(true);
            setSelectedIndex((prev) => Math.max(prev - 1, -1));
          }
          if (event.key === 'Escape') {
            setIsOpen(false);
            setSelectedIndex(-1);
          }
          if (event.key === 'Enter') {
            event.preventDefault();
            if (activeProduct) {
              router.push(`/tovar/${activeProduct.slug}`);
              setIsOpen(false);
              return;
            }
            if (trimmedQuery) {
              router.push(`/katalog?q=${encodeURIComponent(trimmedQuery)}`);
              setIsOpen(false);
            }
          }
        }}
        placeholder="Поиск по каталогу"
        className="field-input header-search-input"
      />
      {hasResults ? (
        <SearchDropdown
          query={query}
          results={results}
          selectedIndex={selectedIndex}
          onSelectIndex={setSelectedIndex}
        />
      ) : null}
    </div>
  );
}
