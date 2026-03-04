import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Container } from '@/components/layout/Container';
import { loadProductBySlug } from '@/lib/content/loadProducts';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = loadProductBySlug(slug);

  if (!product) {
    return {
      title: 'Товар не найден | Company Site MVP',
      description: 'Запрошенный товар не найден. Перейдите в каталог, чтобы выбрать доступную позицию.',
    };
  }

  return {
    title: `${product.name} | Company Site MVP`,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: Props): Promise<JSX.Element> {
  const { slug } = await params;
  const product = loadProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <Container className="py-10">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <section>
          <h2 className="sr-only">Галерея</h2>
          <div className="rounded-lg border bg-slate-50 p-4">
            <Image
              src={product.image}
              alt={product.name}
              width={900}
              height={650}
              className="h-auto w-full rounded object-cover"
              priority
            />
          </div>
          <div className="mt-3 flex gap-2">
            <div className="w-20 rounded border border-brand p-1">
              <Image src={product.image} alt={`${product.name} превью`} width={120} height={80} className="h-auto w-full rounded" />
            </div>
          </div>
        </section>

        <section>
          <h1 className="text-3xl font-semibold">{product.name}</h1>
          <p className="mt-3 text-slate-600">{product.shortDescription}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/konsultaciya" className="rounded bg-brand px-4 py-2 text-white">
              Получить консультацию
            </Link>
            <Link href="/katalog" className="rounded border border-slate-300 px-4 py-2">
              Вернуться в каталог
            </Link>
          </div>
        </section>
      </div>

      <section className="mt-10 max-w-4xl">
        <h2 className="text-xl font-semibold">Описание</h2>
        <p className="mt-3 text-slate-600">{product.description}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Характеристики</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {product.specs.map((spec) => (
            <li key={spec.label} className="rounded border p-3 text-sm">
              <div className="text-slate-500">{spec.label}</div>
              <div className="mt-1 font-medium">{spec.value}</div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Документы</h2>
        <ul className="mt-3 space-y-2">
          {product.documents.map((doc) => (
            <li key={doc.title}>
              <a href={doc.url} className="text-sm text-brand underline">
                {doc.title}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}
