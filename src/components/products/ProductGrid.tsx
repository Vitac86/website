import { ProductCard } from '@/components/products/ProductCard';
import type { Product } from '@/types/product';

type Props = {
  products: Product[];
};

export function ProductGrid({ products }: Props): JSX.Element {
  if (!products.length) {
    return <p className="rounded-md border border-dashed p-6 text-sm text-slate-500">По вашему запросу товары не найдены.</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
