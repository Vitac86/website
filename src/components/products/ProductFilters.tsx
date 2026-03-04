'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

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
  };

  return (
    <aside className="rounded-lg border p-4">
      <h2 className="text-base font-semibold">Фильтры</h2>

      <div className="mt-4">
        <h3 className="text-sm font-medium">Тип продукции</h3>
        <div className="mt-2 space-y-2">
          {types.map((type) => (
            <label key={type.id} className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={selectedTypes.includes(type.id)}
                onChange={(event) => updateMultiValue('type', type.id, event.target.checked)}
              />
              {type.name}
            </label>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-sm font-medium">Категория</h3>
        <div className="mt-2 space-y-2">
          {categories.map((category) => (
            <label key={category.id} className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={selectedCategories.includes(category.id)}
                onChange={(event) => updateMultiValue('category', category.id, event.target.checked)}
              />
              {category.name}
            </label>
          ))}
        </div>
      </div>

      <button type="button" onClick={resetFilters} className="mt-5 text-sm text-brand underline-offset-2 hover:underline">
        Сбросить фильтры
      </button>
    </aside>
  );
}
