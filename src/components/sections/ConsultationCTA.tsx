import Link from 'next/link';

import { Container } from '@/components/layout/Container';
import { ConsultationForm } from '@/components/forms/ConsultationForm';

export function ConsultationCTA(): JSX.Element {
  return (
    <section className="section-shell section-transition pb-16 sm:pb-20">
      <Container>
        <div className="surface-panel relative overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_18%,rgba(15,76,129,0.1),transparent_42%)]" />

          <div className="relative grid gap-7 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <div>
              <span className="section-kicker">Коммерческая консультация</span>
              <h2 className="section-title mt-4">Нужна помощь с подбором?</h2>
              <p className="section-description">
                Опишите задачу в форме, и мы предложим подходящие позиции с учётом объёма, условий эксплуатации и сроков.
                Если удобнее обсудить детали по телефону, перейдите в раздел контактов и выберите подходящий канал связи.
              </p>
              <Link href="/kontakty" className="btn-secondary mt-5">
                Перейти в контакты
              </Link>
            </div>

            <div className="form-shell">
              <ConsultationForm />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
