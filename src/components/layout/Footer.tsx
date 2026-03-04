import Link from 'next/link';

import { Container } from '@/components/layout/Container';

export function Footer(): JSX.Element {
  return (
    <footer className="border-t py-8 text-sm text-slate-600">
      <Container className="flex flex-col gap-2 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Company Site MVP</p>
        <div className="flex gap-4">
          <Link href="/privacy">Privacy</Link>
          <Link href="/consent">Consent</Link>
        </div>
      </Container>
    </footer>
  );
}
