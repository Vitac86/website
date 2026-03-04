import { Container } from '@/components/layout/Container';

export const metadata = { title: 'Privacy | Company Site MVP' };

export default function PrivacyPage(): JSX.Element {
  return (
    <Container className="py-10 prose">
      <h1>Политика конфиденциальности</h1>
      <p>Мы обрабатываем данные заявок только для обратной связи и консультаций по продукции.</p>
      <p>Данные не передаются третьим лицам вне рамок обслуживания заявки.</p>
    </Container>
  );
}
