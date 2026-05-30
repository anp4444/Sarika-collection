export interface Product {
  id: number;
  slug: string;
  name: string;
  category: string;
  subcategory: string;
  images: string[];
  price: number;
  mrp: number;
  discountPercent: number;
  rating: number;
  description: string;
  features: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  material?: string;
  color?: string;
}

export interface Category {
  id: number;
  slug: string;
  name: string;
  description: string;
  image: string;
  icon: string;
  itemCount: number;
}
