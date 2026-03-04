import { Container } from '@/components/layout/Container';
import { ConsultationForm } from '@/components/forms/ConsultationForm';

export function ConsultationCTA(): JSX.Element {
  return (
    <section className="py-10">
      <Container>
        <ConsultationForm />
      </Container>
    </section>
  );
}
