export type ProductAttribute = {
  id: string;
  name: string;
  value: string;
};

export type ProductImage = {
  id: string;
  url: string;
  alt: string;
  colorId?: string;
};

export type ProductColor = {
  id: string;
  name: string;
  background: string;
  pattern?: string;
  preview: string;
};

export type ProductSwitcher = {
  id: string;
  name: string;
  options: string[];
  selected: string;
  colors?: ProductColor[];
};

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  tier: 'basic' | 'pro' | 'elite';
  images: ProductImage[];
  attributes: ProductAttribute[];
  switchers: ProductSwitcher[];
  features: string[];
}