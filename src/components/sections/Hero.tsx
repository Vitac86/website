import Link from 'next/link';

import { Container } from '@/components/layout/Container';

export function Hero(): JSX.Element {
  return (
    <section className="relative overflow-hidden bg-slate-900 py-14 text-white sm:py-16 lg:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(56,120,183,0.34),transparent_44%),radial-gradient(circle_at_80%_80%,rgba(22,58,96,0.44),transparent_48%),linear-gradient(150deg,rgba(10,16,24,0.98),rgba(15,26,39,0.95))]" />
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] [background-size:50px_50px]" />

      <Container className="relative">
        <div className="max-w-3xl rounded-2xl border border-slate-600/50 bg-slate-900/45 p-6 shadow-[0_24px_48px_-30px_rgba(2,6,23,0.95)] backdrop-blur-sm sm:p-8 lg:p-10">
          <span className="inline-flex items-center rounded-full border border-sky-300/30 bg-sky-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-sky-100/90">
            Надёжные поставки для производства
          </span>

          <h1 className="marketing-text mt-5 text-white">Промышленная продукция для стабильной работы производства</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
            Поставляем типовые и индивидуальные решения для инженерных, монтажных и производственных задач.
            Помогаем подобрать материалы под требования проекта, срокам поставки и бюджету. На этой странице можно
            быстро перейти в каталог, посмотреть направления и оставить заявку на консультацию.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/katalog" className="btn-primary">
              Перейти в каталог
            </Link>
            <Link href="/konsultaciya" className="btn-ghost-dark">
              Получить консультацию
            </Link>
          </div>

          <p className="mt-5 text-sm leading-6 text-slate-300">Технический подбор, согласование сроков и коммерческие условия под ваш проект.</p>
        </div>
      </Container>
    </section>
  );
}
