import Link from 'next/link';

import { Container } from '@/components/layout/Container';

export const metadata = { title: 'Контакты | Company Site MVP' };

export default function ContactsPage(): JSX.Element {
  return (
    <Container className="py-10">
      <h1 className="text-2xl font-semibold">Контакты</h1>
      <p className="mt-3 text-slate-600">г. Москва, ул. Примерная, 1 · +7 (900) 000-00-00 · sales@example.com</p>
      <Link href="/konsultaciya" className="mt-4 inline-block rounded bg-brand px-4 py-2 text-white">Оставить заявку</Link>
    </Container>
  );
}
