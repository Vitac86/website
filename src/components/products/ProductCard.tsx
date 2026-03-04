import Image from 'next/image';
import Link from 'next/link';

import type { Product } from '@/types/product';

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props): JSX.Element {
  return (
    <article className="rounded-lg border p-4">
      <Image src={product.image} alt={product.name} width={400} height={260} className="mb-3 h-40 w-full rounded object-cover" />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="mt-2 text-sm text-slate-600">{product.shortDescription}</p>
      <Link href={`/tovar/${product.slug}`} className="mt-3 inline-block text-sm font-medium text-brand">
        Открыть карточку
      </Link>
    </article>
  );
}
