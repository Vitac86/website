import Link from 'next/link';

import { Container } from '@/components/layout/Container';
import { loadTypes } from '@/lib/content/loadTypes';

export function ProductTypes(): JSX.Element {
  const types = loadTypes();

  return (
    <section className="section-shell section-transition">
      <Container>
        <span className="section-kicker">Направления поставок</span>
        <h2 className="section-title mt-4">Типы продукции</h2>
        <p className="section-description">
          Разделы сгруппированы по назначению, чтобы проще найти нужную позицию для закупки или предварительного
          расчёта. В каждом типе собраны товары с описанием и базовыми характеристиками для первичного отбора.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {types.map((type) => (
            <Link key={type.id} href={`/katalog?type=${type.id}`} className="card-direction group">
              <h3 className="text-lg font-semibold">{type.name}</h3>
              <p className="mt-2 text-sm text-slate-600">{type.description}</p>
              <span className="card-link-arrow">Открыть направление →</span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
