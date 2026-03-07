import Link from 'next/link';

import { Container } from '@/components/layout/Container';

export function Footer(): JSX.Element {
  return (
    <footer className="mt-8 border-t border-slate-200/80 bg-white/70 py-10 text-sm text-slate-600">
      <Container className="flex flex-col gap-2 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Company Site MVP</p>
        <div className="flex gap-4">
          <Link href="/privacy" className="btn-link">
            Privacy
          </Link>
          <Link href="/consent" className="btn-link">
            Consent
          </Link>
        </div>
      </Container>
    </footer>
  );
}
