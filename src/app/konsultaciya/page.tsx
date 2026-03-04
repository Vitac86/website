import Link from 'next/link';

import { ConsultationForm } from '@/components/forms/ConsultationForm';
import { Container } from '@/components/layout/Container';

export const metadata = { title: 'Консультация | Company Site MVP' };

export default function ConsultationPage(): JSX.Element {
  return (
    <Container className="py-10">
      <h1 className="text-2xl font-semibold">Запрос консультации</h1>
      <p className="mt-3 max-w-3xl text-slate-600">
        Оставьте контактные данные и коротко опишите задачу: тип продукции, объём и желаемые сроки поставки.
        Специалист свяжется с вами, уточнит детали и предложит подходящие позиции из каталога.
      </p>
      <div className="mt-4">
        <Link href="/katalog" className="inline-block rounded border border-slate-300 px-4 py-2">
          Перейти в каталог
        </Link>
      </div>
      <div className="mt-6">
        <ConsultationForm />
      </div>
    </Container>
  );
}
