import Image from 'next/image';
import Link from 'next/link';

import { Container } from '@/components/layout/Container';
import { HeaderSearch } from '@/components/search/HeaderSearch';
import { loadProducts } from '@/lib/content/loadProducts';

const navLinks = [
  { href: '/', label: 'Главная' },
  { href: '/produkciya', label: 'Продукция' },
  { href: '/katalog', label: 'Каталог' },
  { href: '/o-kompanii', label: 'О компании' },
  { href: '/kontakty', label: 'Контакты' }
];

export function Header(): JSX.Element {
  const products = loadProducts();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <Container className="py-3">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/"
              aria-label="Перейти на главную страницу"
              className="flex items-center gap-2 rounded-md px-1 py-1 font-semibold text-brand transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
            >
              <Image src="/images/logo.svg" alt="Логотип" width={36} height={36} />
              <span className="text-sm sm:text-base">Company Site</span>
            </Link>
          </div>
          <HeaderSearch products={products} />
        </div>

        <nav aria-label="Основная навигация" className="mt-3 overflow-x-auto pb-1">
          <ul className="flex min-w-max items-center gap-2 text-sm">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex rounded-md px-3 py-1.5 text-slate-700 transition hover:bg-slate-100 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
