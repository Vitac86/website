'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import type { Category, ProductType } from '@/types/product';

type Props = {
  types: ProductType[];
  categories: Category[];
  selectedTypes: string[];
  selectedCategories: string[];
};

export function ProductFilters({ types, categories, selectedTypes, selectedCategories }: Props): JSX.Element {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const updateMultiValue = (key: 'type' | 'category', value: string, checked: boolean): void => {
    const nextParams = new URLSearchParams(searchParams.toString());
    const current = nextParams.getAll(key);
    const nextValues = checked ? [...new Set([...current, value])] : current.filter((item) => item !== value);

    nextParams.delete(key);
    nextValues.forEach((item) => nextParams.append(key, item));

    const query = nextParams.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const resetFilters = (): void => {
    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.delete('type');
    nextParams.delete('category');

    const query = nextParams.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    setMobileOpen(false);
  };

  const hasSelected = selectedTypes.length > 0 || selectedCategories.length > 0;

  const filterContent = (
    <>
      <h2 className="text-base font-semibold">Фильтры</h2>

      <details className="mt-4 rounded-md border border-slate-200 p-3 lg:border-0 lg:p-0" open>
        <summary className="cursor-pointer list-none text-sm font-medium marker:hidden">Тип продукции</summary>
        <div className="mt-3 space-y-2">
          {types.map((type) => (
            <label
              key={type.id}
              className="flex cursor-pointer items-center gap-2 rounded px-1 py-1 text-sm text-slate-700 transition hover:bg-slate-100"
            >
              <input
                type="checkbox"
                aria-label={`Фильтр по типу: ${type.name}`}
                className="h-4 w-4 rounded border-slate-300 text-brand focus-visible:ring-brand"
                checked={selectedTypes.includes(type.id)}
                onChange={(event) => updateMultiValue('type', type.id, event.target.checked)}
              />
              {type.name}
            </label>
          ))}
        </div>
      </details>

      <details className="mt-3 rounded-md border border-slate-200 p-3 lg:border-0 lg:p-0" open>
        <summary className="cursor-pointer list-none text-sm font-medium marker:hidden">Категория</summary>
        <div className="mt-3 space-y-2">
          {categories.map((category) => (
            <label
              key={category.id}
              className="flex cursor-pointer items-center gap-2 rounded px-1 py-1 text-sm text-slate-700 transition hover:bg-slate-100"
            >
              <input
                type="checkbox"
                aria-label={`Фильтр по категории: ${category.name}`}
                className="h-4 w-4 rounded border-slate-300 text-brand focus-visible:ring-brand"
                checked={selectedCategories.includes(category.id)}
                onChange={(event) => updateMultiValue('category', category.id, event.target.checked)}
              />
              {category.name}
            </label>
          ))}
        </div>
      </details>

      <button
        type="button"
        onClick={resetFilters}
        className="mt-5 text-sm text-brand underline-offset-2 transition hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
      >
        Сбросить фильтры
      </button>
    </>
  );

  return (
    <>
      <div className="lg:hidden">
        <button
          type="button"
          aria-label="Открыть фильтры каталога"
          onClick={() => setMobileOpen(true)}
          className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
        >
          Фильтры {hasSelected ? `(${selectedTypes.length + selectedCategories.length})` : ''}
        </button>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-40 bg-slate-900/30 p-4 lg:hidden" role="dialog" aria-modal="true" aria-label="Фильтры каталога">
          <aside className="ml-auto h-full w-full max-w-sm overflow-y-auto rounded-xl bg-white p-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold">Фильтры</h2>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Закрыть фильтры"
                className="rounded-md px-2 py-1 text-sm text-slate-600 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
              >
                Закрыть
              </button>
            </div>
            {filterContent}
          </aside>
        </div>
      ) : null}

      <aside className="hidden self-start rounded-xl border border-slate-200 bg-white p-4 lg:sticky lg:top-24 lg:block">{filterContent}</aside>
    </>
  );
}
