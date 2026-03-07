import Link from 'next/link';

import { Container } from '@/components/layout/Container';
import { ProductFilters } from '@/components/products/ProductFilters';
import { ProductGrid } from '@/components/products/ProductGrid';
import { loadCategories } from '@/lib/content/loadCategories';
import { loadProducts } from '@/lib/content/loadProducts';
import { loadTypes } from '@/lib/content/loadTypes';
import { normalizeSearchText } from '@/lib/search/normalize';
import type { Product } from '@/types/product';

export const metadata = { title: 'Каталог | Company Site MVP' };

type SearchParams = {
  q?: string | string[];
  type?: string | string[];
  category?: string | string[];
};

type Props = {
  searchParams: Promise<SearchParams>;
};

function toArray(value: string | string[] | undefined): string[] {
  if (!value) {
    return [];
  }

  return (Array.isArray(value) ? value : [value]).filter(Boolean);
}

function toSingle(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    return value[0] ?? '';
  }

  return value ?? '';
}

function buildKatalogHref(query: string, types: string[], categories: string[]): string {
  const params = new URLSearchParams();

  if (query) {
    params.set('q', query);
  }

  types.forEach((typeId) => {
    params.append('type', typeId);
  });

  categories.forEach((categoryId) => {
    params.append('category', categoryId);
  });

  const queryString = params.toString();
  return queryString ? `/katalog?${queryString}` : '/katalog';
}

function getRelevanceScore(product: Product, query: string): number {
  const words = query.split(' ').filter(Boolean);
  let score = 0;
  const name = normalizeSearchText(product.name);
  const shortDescription = normalizeSearchText(product.shortDescription);
  const description = normalizeSearchText(product.description);

  words.forEach((word) => {
    if (name.startsWith(word)) {
      score += 8;
    }

    if (name.includes(word)) {
      score += 4;
    }

    if (shortDescription.includes(word)) {
      score += 2;
    }

    if (description.includes(word)) {
      score += 1;
    }
  });

  return score;
}

export default async function KatalogPage({ searchParams }: Props): Promise<JSX.Element> {
  const params = await searchParams;
  const query = normalizeSearchText(toSingle(params.q));
  const selectedTypes = toArray(params.type);
  const selectedCategories = toArray(params.category);

  const types = loadTypes();
  const categories = loadCategories();
  const products = loadProducts()
    .filter((product) => {
      const queryMatch = query
        ? normalizeSearchText(`${product.name} ${product.shortDescription} ${product.description}`).includes(query)
        : true;
      const typeMatch = selectedTypes.length ? selectedTypes.includes(product.type) : true;
      const categoryMatch = selectedCategories.length ? selectedCategories.includes(product.category) : true;
      return queryMatch && typeMatch && categoryMatch;
    })
    .sort((a, b) => {
      if (query) {
        const byRelevance = getRelevanceScore(b, query) - getRelevanceScore(a, query);
        if (byRelevance !== 0) {
          return byRelevance;
        }
      }

      return a.name.localeCompare(b.name, 'ru');
    });

  const selectedTypeNames = types.filter((item) => selectedTypes.includes(item.id));
  const selectedCategoryNames = categories.filter((item) => selectedCategories.includes(item.id));

  return (
    <Container className="py-8 sm:py-10">
      <h1 className="text-3xl font-semibold">Каталог</h1>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
        Используйте фильтры, чтобы быстро сузить список по типу, категории и поисковому запросу. Если нужной позиции нет в
        выдаче, оставьте заявку — предложим подходящую замену.
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Link
          href="/konsultaciya"
          className="btn-primary"
        >
          Запросить подбор
        </Link>
        <p className="text-sm text-slate-600">Сортировка: {query ? 'релевантность' : 'по алфавиту'}</p>
      </div>

      {(query || selectedTypes.length || selectedCategories.length) && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-sm text-slate-600">Выбрано:</span>
          {query && (
            <Link
              href={buildKatalogHref('', selectedTypes, selectedCategories)}
              className="rounded-full border border-slate-300 bg-white px-3 py-1 text-sm transition hover:bg-slate-50"
            >
              Поиск: {query} ×
            </Link>
          )}
          {selectedTypeNames.map((typeItem) => (
            <Link
              key={typeItem.id}
              href={buildKatalogHref(
                query,
                selectedTypes.filter((value) => value !== typeItem.id),
                selectedCategories
              )}
              className="rounded-full border border-slate-300 bg-white px-3 py-1 text-sm transition hover:bg-slate-50"
            >
              Тип: {typeItem.name} ×
            </Link>
          ))}
          {selectedCategoryNames.map((categoryItem) => (
            <Link
              key={categoryItem.id}
              href={buildKatalogHref(
                query,
                selectedTypes,
                selectedCategories.filter((value) => value !== categoryItem.id)
              )}
              className="rounded-full border border-slate-300 bg-white px-3 py-1 text-sm transition hover:bg-slate-50"
            >
              Категория: {categoryItem.name} ×
            </Link>
          ))}
          <Link href="/katalog" className="btn-link">
            Сбросить всё
          </Link>
        </div>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
        <ProductFilters
          types={types}
          categories={categories}
          selectedTypes={selectedTypes}
          selectedCategories={selectedCategories}
        />
        {products.length ? (
          <ProductGrid products={products} />
        ) : (
          <section className="surface-panel border-dashed p-6">
            <h2 className="text-lg font-semibold">Ничего не найдено</h2>
            <p className="mt-2 text-sm text-slate-600">Попробуйте:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
              <li>сократить поисковый запрос;</li>
              <li>снять часть фильтров по типу или категории;</li>
              <li>выбрать другой тип продукции в фильтрах.</li>
            </ul>
            <Link
              href="/katalog"
              className="btn-primary mt-4"
            >
              Сбросить фильтры
            </Link>
          </section>
        )}
      </div>
    </Container>
  );
}
