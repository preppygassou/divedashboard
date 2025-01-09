export type ProductAttribute = {
  id?: string;
  name?: string;
};

export type ProductImage = {
  id?: string;
  url?: string;
  name?: string;
  key?: string;
  etag?: string;
  alternative_text?: string;
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
 
};

export type ProductVariation = {
  attributeId: string;
  switcherId: string;
  featuredImage?: string;
  manageStock?: boolean;
  price: number;
  soldPrice?: number;
  initialQuantity?: number;
  availableQuantity: number;
  soldQuantity?: number;
};

export interface Product {
  id?: string;
  name: string;
  slug: string;
  featuredImage: Object;
  description: string;
  price: number;
  availableQuantity: number;
  soldQuantity?: number;
  initialQuantity?: number;
  tier: 'plus' | 'ultra' | 'max';
  images?: ProductImage[];
  attributes?: ProductAttribute[];
  variations?: ProductVariation[];

}