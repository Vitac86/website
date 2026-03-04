import Fuse from 'fuse.js';

import { normalizeSearchText } from '@/lib/search/normalize';
import type { Product } from '@/types/product';

const options: Fuse.IFuseOptions<Product> = {
  keys: ['name', 'shortDescription', 'description', 'type', 'category'],
  threshold: 0.35,
  minMatchCharLength: 2
};

export function searchProducts(products: Product[], query: string, limit = 8): Product[] {
  const normalized = normalizeSearchText(query);
  if (!normalized) {
    return products.slice(0, limit);
  }

  const fuse = new Fuse(products, options);
  return fuse.search(normalized, { limit }).map((item) => item.item);
}
