import fs from 'node:fs';
import path from 'node:path';

type Product = { slug?: string; name?: string };

const productsDir = path.join(process.cwd(), 'content/products');
const files = fs.readdirSync(productsDir).filter((file) => file.endsWith('.json'));

let hasError = false;

for (const file of files) {
  const raw = fs.readFileSync(path.join(productsDir, file), 'utf-8');
  const parsed = JSON.parse(raw) as Product;

  if (!parsed.slug || !parsed.name) {
    hasError = true;
    console.error(`Invalid product in ${file}: missing slug or name`);
  }
}

if (hasError) {
  process.exit(1);
}

console.log(`Validated ${files.length} products successfully.`);
