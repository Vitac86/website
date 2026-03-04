'use client';

import { useMemo } from 'react';

import { searchProducts } from '@/lib/search/engine';
import type { Product } from '@/types/product';

export function useSearch(products: Product[], query: string, limit = 8): Product[] {
  return useMemo(() => searchProducts(products, query, limit), [products, query, limit]);
}
