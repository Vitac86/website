import Link from 'next/link';

import { Container } from '@/components/layout/Container';
import { loadCategories } from '@/lib/content/loadCategories';
import { loadTypes } from '@/lib/content/loadTypes';

export const metadata = { title: 'Продукция | Company Site MVP' };

export default function ProdukciyaPage(): JSX.Element {
  const types = loadTypes();
  const categories = loadCategories();

  return (
    <Container className="space-y-8 py-10">
      <section>
        <h1 className="text-2xl font-semibold">Продукция</h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          Здесь собраны основные направления поставок для производства, монтажа и технического обслуживания.
          Сначала выберите тип продукции, затем уточните категорию и параметры в каталоге. Если нужна помощь с
          подбором аналогов или расчётом объёма, отправьте запрос на консультацию.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/katalog" className="rounded bg-brand px-4 py-2 text-white">
            Открыть каталог
          </Link>
          <Link href="/konsultaciya" className="rounded border border-slate-300 px-4 py-2">
            Получить консультацию
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Типы продукции</h2>
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
