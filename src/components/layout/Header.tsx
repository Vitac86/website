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
    <header className="border-b bg-white/95 py-3">
      <Container className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 font-semibold text-brand">
            <Image src="/images/logo.svg" alt="Логотип" width={36} height={36} />
            Company Site
          </Link>
          <nav className="hidden gap-3 text-sm lg:flex">
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-brand">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <HeaderSearch products={products} />
      </Container>
    </header>
  );
}
