import Link from 'next/link';

import { Container } from '@/components/layout/Container';

export function Hero(): JSX.Element {
  return (
    <section className="bg-slate-50 py-12">
      <Container>
        <h1 className="text-3xl font-bold">Промышленная продукция для стабильной работы производства</h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          Поставляем типовые и индивидуальные решения для инженерных, монтажных и производственных задач.
          Помогаем подобрать материалы под требования проекта, срокам поставки и бюджету. На этой странице можно
          быстро перейти в каталог, посмотреть направления и оставить заявку на консультацию.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/katalog" className="inline-block rounded-md bg-brand px-4 py-2 text-white">
            Перейти в каталог
          </Link>
          <Link href="/konsultaciya" className="inline-block rounded-md border border-slate-300 px-4 py-2">
            Получить консультацию
          </Link>
        </div>
      </Container>
    </section>
  );
}
