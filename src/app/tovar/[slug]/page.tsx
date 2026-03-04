import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Container } from '@/components/layout/Container';
import { loadProductBySlug } from '@/lib/content/loadProducts';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: Props): Promise<JSX.Element> {
  const { slug } = await params;
  const product = loadProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <Container className="py-10">
      <h1 className="text-3xl font-semibold">{product.name}</h1>
      <p className="mt-3 max-w-3xl text-slate-600">
        {product.description} Ниже указаны ключевые параметры и список документов для проверки соответствия проекту.
        При необходимости подготовим коммерческое предложение с альтернативами и сроками поставки.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Link href="/konsultaciya" className="rounded bg-brand px-4 py-2 text-white">
          Получить консультацию
        </Link>
        <Link href="/katalog" className="rounded border border-slate-300 px-4 py-2">
          Вернуться в каталог
        </Link>
      </div>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Характеристики</h2>
        <ul className="mt-2 space-y-2">
          {product.specs.map((spec) => (
            <li key={spec.label} className="text-sm">
              <strong>{spec.label}:</strong> {spec.value}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Документы</h2>
        <ul className="mt-2 space-y-2">
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
