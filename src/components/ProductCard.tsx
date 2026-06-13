'use client';

import Link from 'next/link';
import { Product } from '@/types';
import { Star } from 'lucide-react';
import AddToCartButton from './AddToCartButton';

export default function ProductCard({ product }: { product: Product }) {
  const hasPrice = product.price > 0;

  return (
    <div className="product-card group">
      <Link href={`/product/${product.slug}`}>
        <div className="relative overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-20 sm:h-60 object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute top-1 sm:top-3 left-1 sm:left-3 flex flex-col gap-0.5 sm:gap-1">
            {product.isNew && (
              <span className="badge-new px-1 sm:px-3 py-0.5 sm:py-1 rounded-full text-[7px] sm:text-xs font-bold">NEW</span>
            )}
            {product.isBestSeller && (
              <span className="badge-bestseller px-1 sm:px-3 py-0.5 sm:py-1 rounded-full text-[7px] sm:text-xs font-bold">BEST SELLER</span>
            )}
          </div>
          {hasPrice && product.discountPercent > 0 && (
            <span className="badge-discount absolute top-1 sm:top-3 right-1 sm:right-3 px-1 sm:px-3 py-0.5 sm:py-1 rounded-full text-[7px] sm:text-xs font-bold">
              {product.discountPercent}% OFF
            </span>
          )}
        </div>
      </Link>

      <div className="p-2 sm:p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-semibold text-gray-800 text-[10px] sm:text-sm leading-tight mb-0.5 sm:mb-2 line-clamp-2 hover:text-[#941424] transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2 mb-0.5 sm:mb-2">
          <div className="flex items-center gap-0.5">
            <Star size={9} className="sm:size-[14px] fill-amber-400 text-amber-400" />
            <span className="text-[9px] sm:text-xs text-gray-500 font-medium">{product.rating}</span>
          </div>
        </div>

        <div className="flex items-baseline flex-wrap gap-1 sm:gap-1.5 mb-1 sm:mb-3">
          <span className="text-[11px] sm:text-base font-bold text-[#941424]">{hasPrice ? `₹${product.price}` : 'Ask for price'}</span>
          {hasPrice && product.mrp > product.price && (
            <>
              <span className="text-[9px] sm:text-sm text-gray-400 line-through">₹{product.mrp}</span>
              <span className="text-[8px] sm:text-xs text-green-600 font-medium">({product.discountPercent}% off)</span>
            </>
          )}
        </div>

        <AddToCartButton product={product} />
      </div>
    </div>
  );
}
