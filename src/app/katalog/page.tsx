import { Container } from '@/components/layout/Container';
import { ProductFilters } from '@/components/products/ProductFilters';
import { ProductGrid } from '@/components/products/ProductGrid';
import { normalizeSearchText } from '@/lib/search/normalize';
import { loadProducts } from '@/lib/content/loadProducts';

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
      <h1 className="mb-4 text-2xl font-semibold">Каталог</h1>
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <ProductFilters />
        <ProductGrid products={products} />
      </div>
    </Container>
  );
}
