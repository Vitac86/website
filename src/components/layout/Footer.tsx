import Image from 'next/image';
import Link from 'next/link';

import { Container } from '@/components/layout/Container';

const mainLinks = [
  { href: '/', label: 'Главная' },
  { href: '/produkciya', label: 'Продукция' },
  { href: '/katalog', label: 'Каталог' },
  { href: '/o-kompanii', label: 'О компании' }
];

const supportLinks = [
  { href: '/konsultaciya', label: 'Консультация' },
  { href: '/kontakty', label: 'Контакты' }
];

const legalLinks = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/consent', label: 'Consent' }
];

export function Footer(): JSX.Element {
  return (
    <footer className="mt-12 border-t border-slate-200/80 bg-slate-100/70 py-14 text-sm text-slate-600 sm:py-16">
      <Container>
        <div className="grid gap-10 border-b border-slate-200/80 pb-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-8 lg:pb-12">
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              aria-label="Перейти на главную страницу"
              className="inline-flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-[0_10px_26px_-20px_rgba(15,36,57,0.85)]"
            >
              <Image src="/images/logo.svg" alt="Логотип Precision Cut" width={32} height={32} />
              <span className="text-sm font-bold uppercase tracking-[0.08em] text-slate-900">Precision Cut</span>
            </Link>
            <p className="max-w-sm text-sm leading-6 text-slate-600">
              Поставляем промышленную продукцию и помогаем с подбором решений: от каталога до консультации и подготовки
              коммерческого предложения.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-900">Разделы сайта</h3>
            <ul className="mt-4 space-y-2.5">
              {mainLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-600 transition-colors hover:text-brand">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-900">Связаться с нами</h3>
            <ul className="mt-4 space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-600 transition-colors hover:text-brand">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-900">Контакты</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
              <li>
                <a href="tel:+79000000000" className="transition-colors hover:text-brand">
                  +7 (900) 000-00-00
                </a>
              </li>
              <li>
                <a href="mailto:sales@example.com" className="transition-colors hover:text-brand">
                  sales@example.com
                </a>
              </li>
              <li className="leading-6">г. Москва, ул. Примерная, д. 1, офис 101</li>
              <li className="leading-6">Пн–Пт, 09:00–18:00</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 text-xs text-slate-500 sm:mt-7 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Company Site MVP</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-brand">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
