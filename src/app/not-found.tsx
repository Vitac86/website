import Link from 'next/link';

import { Container } from '@/components/layout/Container';

export default function NotFound(): JSX.Element {
  return (
    <Container className="py-16">
      <h1 className="text-3xl font-semibold">404 — Страница не найдена</h1>
      <Link href="/" className="mt-4 inline-block text-brand underline">Вернуться на главную</Link>
    </Container>
  );
}
