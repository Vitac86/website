import Link from 'next/link';

import { Container } from '@/components/layout/Container';

export const metadata = { title: 'О компании | Company Site MVP' };

export default function AboutPage(): JSX.Element {
  return (
    <Container className="py-10">
      <h1 className="text-2xl font-semibold">О компании</h1>
      <p className="mt-3 text-slate-600">Короткая заглушка о компании: опыт, производство, сервис.</p>
      <Link href="/konsultaciya" className="mt-4 inline-block rounded bg-brand px-4 py-2 text-white">Получить консультацию</Link>
    </Container>
  );
}
