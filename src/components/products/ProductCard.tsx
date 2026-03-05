import Image from 'next/image';
import Link from 'next/link';

import type { Product } from '@/types/product';

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props): JSX.Element {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Image src={product.image} alt={product.name} width={400} height={260} className="mb-3 h-40 w-full rounded-lg object-cover" />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="mt-2 text-sm text-slate-600">{product.shortDescription}</p>
      <Link
        href={`/tovar/${product.slug}`}
        aria-label={`Открыть карточку товара ${product.name}`}
        className="mt-3 inline-block rounded-md text-sm font-medium text-brand transition hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
      >
        Открыть карточку
      </Link>
    </article>
  );
}
