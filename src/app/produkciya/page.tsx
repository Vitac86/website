import Link from 'next/link';

import { Container } from '@/components/layout/Container';
import { loadCategories } from '@/lib/content/loadCategories';
import { loadTypes } from '@/lib/content/loadTypes';

export const metadata = { title: 'Продукция | Company Site MVP' };

export default function ProdukciyaPage(): JSX.Element {
  const types = loadTypes();
  const categories = loadCategories();

  return (
    <Container className="py-10 space-y-8">
      <section>
        <h1 className="text-2xl font-semibold">Продукция</h1>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {types.map((type) => (
            <Link key={type.id} href={`/katalog?type=${type.id}`} className="rounded border p-3">
              {type.name}
            </Link>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Категории</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link key={category.id} href={`/katalog?category=${category.id}`} className="rounded border p-3">
              {category.name}
            </Link>
          ))}
        </div>
      </section>
    </Container>
  );
}
