import Fuse from 'fuse.js';
import type { IFuseOptions } from 'fuse.js';

import { normalizeSearchText } from '@/lib/search/normalize';
import type { Product } from '@/types/product';

const options: IFuseOptions<Product> = {
  keys: [
    { name: 'name', weight: 6 },
    { name: 'synonyms', weight: 4 },
    { name: 'tags', weight: 3 },
    { name: 'category', weight: 2 },
    { name: 'type', weight: 1 }
  ],
  threshold: 0.4,
  distance: 120,
  minMatchCharLength: 2
};

export function searchProducts(products: Product[], query: string, limit = 8): Product[] {
  const normalized = normalizeSearchText(query);
  if (!normalized) {
    return [];
  }

  const fuse = new Fuse(products, options);
  return fuse.search(normalized, { limit }).map((item) => item.item);
}
