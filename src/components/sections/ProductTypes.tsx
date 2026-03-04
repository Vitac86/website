import Link from 'next/link';

import { Container } from '@/components/layout/Container';
import { loadTypes } from '@/lib/content/loadTypes';

export function ProductTypes(): JSX.Element {
  const types = loadTypes();

  return (
    <section className="py-10">
      <Container>
        <h2 className="text-2xl font-semibold">Типы продукции</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {types.map((type) => (
            <Link key={type.id} href={`/katalog?type=${type.id}`} className="rounded-lg border p-4 hover:border-brand">
              <h3 className="font-medium">{type.name}</h3>
              <p className="mt-2 text-sm text-slate-600">{type.description}</p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
