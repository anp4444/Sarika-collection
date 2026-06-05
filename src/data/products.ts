import { Product } from '@/types';

export const products: Product[] = [];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.category === categorySlug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isBestSeller || p.isNew).slice(0, 8);
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.isNew).slice(0, 8);
}

export function getBestSellers(): Product[] {
  return products.filter((p) => p.isBestSeller).slice(0, 8);
}
