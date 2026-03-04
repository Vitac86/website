export type ProductSpec = {
  label: string;
  value: string;
};

export type ProductDocument = {
  title: string;
  url: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  type: string;
  category: string;
  shortDescription: string;
  description: string;
  specs: ProductSpec[];
  documents: ProductDocument[];
  image: string;
};

export type ProductType = {
  id: string;
  name: string;
  description: string;
  image: string;
};

export type Category = {
  id: string;
  name: string;
};
