import fs from 'node:fs';
import path from 'node:path';

import type { Product } from '@/types/product';

const productsDir = path.join(process.cwd(), 'content/products');

export function loadProducts(): Product[] {
  const files = fs.readdirSync(productsDir).filter((file) => file.endsWith('.json'));
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(productsDir, file), 'utf-8');
    return JSON.parse(raw) as Product;
  });
}

export function loadProductBySlug(slug: string): Product | undefined {
  return loadProducts().find((product) => product.slug === slug);
}
