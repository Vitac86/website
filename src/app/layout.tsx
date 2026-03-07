import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';

import '@/app/globals.css';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap'
});

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-manrope',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Company Site MVP',
  description: 'MVP сайт компании на Next.js'
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="ru">
      <body className={`${inter.variable} ${manrope.variable} font-sans`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
