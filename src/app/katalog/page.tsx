import Link from 'next/link';

import { Container } from '@/components/layout/Container';
import { ProductFilters } from '@/components/products/ProductFilters';
import { ProductGrid } from '@/components/products/ProductGrid';
import { loadProducts } from '@/lib/content/loadProducts';
import { normalizeSearchText } from '@/lib/search/normalize';

export const metadata = { title: 'Каталог | Company Site MVP' };

type Props = {
  searchParams: Promise<{ q?: string; type?: string; category?: string }>;
};

export default async function KatalogPage({ searchParams }: Props): Promise<JSX.Element> {
  const params = await searchParams;
  const query = normalizeSearchText(params.q ?? '');
  const type = params.type;
  const category = params.category;

  const products = loadProducts().filter((product) => {
    const queryMatch = query
      ? normalizeSearchText(`${product.name} ${product.shortDescription} ${product.description}`).includes(query)
      : true;
    const typeMatch = type ? product.type === type : true;
    const categoryMatch = category ? product.category === category : true;
    return queryMatch && typeMatch && categoryMatch;
  });

  return (
    <Container className="py-10">
      <h1 className="text-2xl font-semibold">Каталог</h1>
      <p className="mt-3 max-w-3xl text-slate-600">
        Используйте фильтры слева, чтобы быстро сузить список по типу, категории и поисковому запросу.
        Карточки товаров содержат краткое описание и ведут на детальную страницу с характеристиками и документами.
        Если нужной позиции нет в выдаче, оставьте заявку — предложим подходящую замену.
      </p>
      <div className="mt-4">
        <Link href="/konsultaciya" className="inline-block rounded bg-brand px-4 py-2 text-white">
          Запросить подбор
        </Link>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[260px_1fr]">
        <ProductFilters />
        <ProductGrid products={products} />
      </div>
    </Container>
  );
}
