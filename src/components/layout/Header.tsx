import Image from 'next/image';
import Link from 'next/link';

import { Container } from '@/components/layout/Container';
import { HeaderSearch } from '@/components/search/HeaderSearch';
import { loadProducts } from '@/lib/content/loadProducts';

const navLinks = [
  { href: '/produkciya', label: 'Продукция' },
  { href: '/katalog', label: 'Решения' },
  { href: '/o-kompanii', label: 'Отрасли' },
  { href: '/konsultaciya', label: 'Инжиниринг' }
];

export function Header(): JSX.Element {
  const products = loadProducts();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-slate-50/85 backdrop-blur-xl">
      <Container className="py-3">
        <div className="flex items-center gap-3 lg:gap-4">
          <Link
            href="/"
            aria-label="Перейти на главную страницу"
            className="group flex shrink-0 items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 shadow-[0_10px_20px_-16px_rgba(15,36,57,0.9)] transition-all duration-300 hover:border-slate-300 hover:shadow-[0_14px_28px_-20px_rgba(15,36,57,0.9)]"
          >
            <Image src="/images/logo.svg" alt="Логотип" width={34} height={34} />
            <span className="text-sm font-bold uppercase tracking-[0.08em] text-slate-900 transition-colors group-hover:text-brand">Precision Cut</span>
          </Link>

          <div className="hidden min-w-0 flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-white/92 p-1.5 shadow-[0_14px_28px_-22px_rgba(15,36,57,0.9)] lg:flex">
            <nav aria-label="Основная навигация" className="shrink-0">
              <ul className="flex items-center gap-0.5">
                {navLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-flex rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition-all duration-300 hover:bg-slate-100 hover:text-brand"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="min-w-0 flex-1">
              <HeaderSearch products={products} />
            </div>

            <Link href="/konsultaciya" className="btn-primary shrink-0 whitespace-nowrap px-4">
              Запросить консультацию
            </Link>
          </div>
        </div>

        <div className="mt-3 grid gap-3 lg:hidden">
          <HeaderSearch products={products} />
          <div className="overflow-x-auto pb-1">
            <ul className="flex min-w-max items-center gap-1 rounded-lg border border-slate-200 bg-white p-1.5">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-flex rounded-md px-3 py-1.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-brand">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Link href="/konsultaciya" className="btn-primary w-full">
            Запросить консультацию
          </Link>
        </div>
      </Container>
    </header>
  );
}
