import { Container } from '@/components/layout/Container';

export const metadata = { title: 'Consent | Company Site MVP' };

export default function ConsentPage(): JSX.Element {
  return (
    <Container className="py-10 prose">
      <h1>Согласие на обработку персональных данных</h1>
      <p>Отправляя форму, пользователь соглашается на обработку имени и телефона для связи.</p>
      <p>Согласие действует до достижения цели обработки или отзыва пользователем.</p>
    </Container>
  );
}
