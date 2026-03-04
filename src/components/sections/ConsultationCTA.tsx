import Link from 'next/link';

import { Container } from '@/components/layout/Container';
import { ConsultationForm } from '@/components/forms/ConsultationForm';

export function ConsultationCTA(): JSX.Element {
  return (
    <section className="py-10">
      <Container>
        <h2 className="text-2xl font-semibold">Нужна помощь с подбором?</h2>
        <p className="mt-3 max-w-3xl text-slate-600">
          Опишите задачу в форме, и мы предложим подходящие позиции с учётом объёма, условий эксплуатации и сроков.
          Если удобнее обсудить детали по телефону, перейдите в раздел контактов и выберите подходящий канал связи.
        </p>
        <Link href="/kontakty" className="mt-4 inline-block rounded-md border border-slate-300 px-4 py-2">
          Перейти в контакты
        </Link>
        <div className="mt-6">
          <ConsultationForm />
        </div>
      </Container>
    </section>
  );
}
