export interface ProductFeature {
  icon: string;
  title: string;
  desc: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  stars: number;
  reviews: number;
  badge: string;
  badgeColor: string;
  badgeTextColor: string;
  badgeBorder?: string;
  images: string[];
  includes: string[];
  shortDesc: string;
  description: string;
  features: ProductFeature[];
  specs: ProductSpec[];
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  image: string;
}

export type AddToCartInput = Pick<CartItem, 'id' | 'name' | 'price' | 'image'> & { qty?: number };
