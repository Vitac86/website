import fs from 'node:fs';
import path from 'node:path';

import type { Category } from '@/types/product';

export function loadCategories(): Category[] {
  const filePath = path.join(process.cwd(), 'content/categories.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as Category[];
}
