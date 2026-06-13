'use client';

import Link from 'next/link';
import { MessageCircle, Star } from 'lucide-react';
import { Product } from '@/types';
import AddToCartButton from './AddToCartButton';

export default function ProductCard({ product }: { product: Product }) {
  const hasPrice = product.price > 0;
  const waUrl = `https://wa.me/919422703807?text=${encodeURIComponent(`Hi Sarika Collection! I want to know more about ${product.name}.`)}`;

  return (
    <div className="product-card group">
      <Link href={`/product/${product.slug}`}>
        <div className="relative overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-110 sm:h-60 sm:aspect-auto"
            loading="lazy"
          />
          <div className="absolute top-1.5 left-1.5 flex flex-col gap-1 sm:top-3 sm:left-3">
            {product.isNew && (
              <span className="badge-new rounded-full px-1.5 py-0.5 text-[8px] font-bold sm:px-3 sm:py-1 sm:text-xs">NEW</span>
            )}
            {product.isBestSeller && (
              <span className="badge-bestseller rounded-full px-1.5 py-0.5 text-[8px] font-bold sm:px-3 sm:py-1 sm:text-xs">BEST SELLER</span>
            )}
          </div>
          {hasPrice && product.discountPercent > 0 && (
            <span className="badge-discount absolute top-1.5 right-1.5 rounded-full px-1.5 py-0.5 text-[8px] font-bold sm:top-3 sm:right-3 sm:px-3 sm:py-1 sm:text-xs">
              {product.discountPercent}% OFF
            </span>
          )}
        </div>
      </Link>

      <div className="p-2.5 sm:p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="mb-1.5 min-h-[34px] text-[12px] font-semibold leading-tight text-gray-800 line-clamp-2 transition-colors hover:text-[#941424] sm:mb-2 sm:text-sm">
            {product.name}
          </h3>
        </Link>

        <div className="mb-1 flex items-center gap-1 sm:mb-2 sm:gap-2">
          <Star size={12} className="fill-amber-400 text-amber-400 sm:size-[14px]" />
          <span className="text-[11px] font-medium text-gray-500 sm:text-xs">{product.rating}</span>
        </div>

        <div className="mb-2 flex min-h-[24px] flex-wrap items-baseline gap-1 sm:mb-3 sm:gap-1.5">
          <span className="text-sm font-bold text-[#941424] sm:text-base">{hasPrice ? `₹${product.price}` : 'Ask for price'}</span>
          {hasPrice && product.mrp > product.price && (
            <>
              <span className="text-[10px] text-gray-400 line-through sm:text-sm">₹{product.mrp}</span>
              <span className="text-[10px] font-medium text-green-600 sm:text-xs">({product.discountPercent}% off)</span>
            </>
          )}
        </div>

        <div className="space-y-2">
          <AddToCartButton product={product} className="min-h-[44px] py-2 text-xs shadow-sm active:scale-95 sm:py-3 sm:text-sm" />
          {!hasPrice && (
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[42px] w-full items-center justify-center gap-1.5 rounded-xl bg-[#25D366] px-2 py-2 text-xs font-bold text-white"
            >
              <MessageCircle size={15} />
              Ask
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
