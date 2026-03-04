import fs from 'node:fs';
import path from 'node:path';

import type { ProductType } from '@/types/product';

export function loadTypes(): ProductType[] {
  const filePath = path.join(process.cwd(), 'content/types.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as ProductType[];
}
