import { Container } from '@/components/layout/Container';
import { ConsultationForm } from '@/components/forms/ConsultationForm';

export const metadata = { title: 'Консультация | Company Site MVP' };

export default function ConsultationPage(): JSX.Element {
  return (
    <Container className="py-10">
      <h1 className="mb-4 text-2xl font-semibold">Запрос консультации</h1>
      <ConsultationForm />
    </Container>
  );
}
