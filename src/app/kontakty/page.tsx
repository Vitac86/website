import Link from 'next/link';

import { Container } from '@/components/layout/Container';

export const metadata = { title: 'Контакты | Company Site MVP' };

export default function ContactsPage(): JSX.Element {
  return (
    <Container className="space-y-8 py-10">
      <section>
        <h1 className="text-2xl font-semibold">Контакты</h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          Свяжитесь с нами удобным способом: поможем с подбором продукции, уточним наличие и подготовим коммерческое
          предложение. Для быстрых запросов используйте телефон или email, для более подробных — форму консультации.
        </p>
      </section>

      <section className="rounded-lg border p-5">
        <h2 className="text-xl font-semibold">Как с нами связаться</h2>
        <ul className="mt-4 space-y-2 text-slate-700">
          <li>
            <strong>Телефон:</strong> +7 (900) 000-00-00
          </li>
          <li>
            <strong>Email:</strong> sales@example.com
          </li>
          <li>
            <strong>Адрес:</strong> г. Москва, ул. Примерная, д. 1, офис 101
          </li>
          <li>
            <strong>Часы работы:</strong> Пн–Пт, 09:00–18:00 (placeholder)
          </li>
        </ul>
        <Link href="/konsultaciya" className="mt-5 inline-block rounded bg-brand px-4 py-2 text-white">
          Получить консультацию
        </Link>
      </section>
    </Container>
  );
}
