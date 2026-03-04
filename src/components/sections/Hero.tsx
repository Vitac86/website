import Link from 'next/link';

import { Container } from '@/components/layout/Container';

export function Hero(): JSX.Element {
  return (
    <section className="bg-slate-50 py-12">
      <Container>
        <h1 className="text-3xl font-bold">Промышленная продукция для бизнеса</h1>
        <p className="mt-3 max-w-2xl text-slate-600">MVP-версия сайта компании с каталогом, поиском и формой заявок.</p>
        <Link href="/katalog" className="mt-5 inline-block rounded-md bg-brand px-4 py-2 text-white">
          Перейти в каталог
        </Link>
      </Container>
    </section>
  );
}
