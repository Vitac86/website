import fs from 'node:fs';
import path from 'node:path';

type Product = {
  id?: string;
  slug?: string;
  name?: string;
  synonyms?: string[];
  tags?: string[];
  type?: string;
  category?: string;
  shortDescription?: string;
  description?: string;
  specs?: Array<{ label?: string; value?: string }>;
  documents?: Array<{ title?: string; url?: string }>;
  image?: string;
};

const productsDir = path.join(process.cwd(), 'content/products');
const files = fs.readdirSync(productsDir).filter((file) => file.endsWith('.json'));

const requiredFields: Array<keyof Product> = [
  'id',
  'slug',
  'name',
  'synonyms',
  'tags',
  'type',
  'category',
  'shortDescription',
  'description',
  'specs',
  'documents',
  'image'
];

const ids = new Map<string, string>();
const slugs = new Map<string, string>();
let hasError = false;

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

for (const file of files) {
  const raw = fs.readFileSync(path.join(productsDir, file), 'utf-8');
  const parsed = JSON.parse(raw) as Product;

  for (const field of requiredFields) {
    if (!(field in parsed)) {
      hasError = true;
      console.error(`Invalid product in ${file}: missing required field \"${field}\"`);
    }
  }

  if (!isNonEmptyString(parsed.id)) {
    hasError = true;
    console.error(`Invalid product in ${file}: field \"id\" must be a non-empty string`);
  } else if (ids.has(parsed.id)) {
    hasError = true;
    console.error(`Duplicate id \"${parsed.id}\" found in ${ids.get(parsed.id)} and ${file}`);
  } else {
    ids.set(parsed.id, file);
  }

  if (!isNonEmptyString(parsed.slug)) {
    hasError = true;
    console.error(`Invalid product in ${file}: field \"slug\" must be a non-empty string`);
  } else if (slugs.has(parsed.slug)) {
    hasError = true;
    console.error(`Duplicate slug \"${parsed.slug}\" found in ${slugs.get(parsed.slug)} and ${file}`);
  } else {
    slugs.set(parsed.slug, file);
  }

  if (!isNonEmptyString(parsed.name)) {
    hasError = true;
    console.error(`Invalid product in ${file}: field \"name\" must be a non-empty string`);
  }

  if (!Array.isArray(parsed.synonyms) || parsed.synonyms.length === 0 || parsed.synonyms.some((synonym) => !isNonEmptyString(synonym))) {
    hasError = true;
    console.error(`Invalid product in ${file}: field \"synonyms\" must be a non-empty array of strings`);
  }

  if (!Array.isArray(parsed.tags) || parsed.tags.length === 0 || parsed.tags.some((tag) => !isNonEmptyString(tag))) {
    hasError = true;
    console.error(`Invalid product in ${file}: field \"tags\" must be a non-empty array of strings`);
  }

  for (const field of ['type', 'category', 'shortDescription', 'description', 'image'] as const) {
    if (!isNonEmptyString(parsed[field])) {
      hasError = true;
      console.error(`Invalid product in ${file}: field \"${field}\" must be a non-empty string`);
    }
  }

  if (
    !Array.isArray(parsed.specs) ||
    parsed.specs.length === 0 ||
    parsed.specs.some((spec) => !isNonEmptyString(spec.label) || !isNonEmptyString(spec.value))
  ) {
    hasError = true;
    console.error(`Invalid product in ${file}: field \"specs\" must be a non-empty array with label/value strings`);
  }

  if (
    !Array.isArray(parsed.documents) ||
    parsed.documents.length === 0 ||
    parsed.documents.some((document) => !isNonEmptyString(document.title) || !isNonEmptyString(document.url))
  ) {
    hasError = true;
    console.error(`Invalid product in ${file}: field \"documents\" must be a non-empty array with title/url strings`);
  }
}

if (hasError) {
  process.exit(1);
}

console.log(`Validated ${files.length} products successfully. Unique ids: ${ids.size}. Unique slugs: ${slugs.size}.`);
