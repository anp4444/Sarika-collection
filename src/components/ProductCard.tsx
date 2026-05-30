'use client';

import Link from 'next/link';
import { Product } from '@/types';
import { Star, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <div className="product-card group">
      <Link href={`/product/${product.slug}`}>
        <div className="relative overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-52 sm:h-60 object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.isNew && (
              <span className="badge-new px-3 py-1 rounded-full text-xs font-bold">NEW</span>
            )}
            {product.isBestSeller && (
              <span className="badge-bestseller px-3 py-1 rounded-full text-xs font-bold">BEST SELLER</span>
            )}
          </div>
          {product.discountPercent > 0 && (
            <span className="badge-discount absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold">
              {product.discountPercent}% OFF
            </span>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-semibold text-gray-800 text-sm leading-tight mb-2 line-clamp-2 hover:text-[#941424] transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-0.5">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <span className="text-xs text-gray-500 font-medium">{product.rating}</span>
          </div>
        </div>

        <div className="flex items-baseline flex-wrap gap-1.5 mb-3">
          <span className="current-price">₹{product.price}</span>
          {product.mrp > product.price && (
            <>
              <span className="mrp">₹{product.mrp}</span>
              <span className="discount">({product.discountPercent}% off)</span>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => addItem(product)}
          className="btn-primary w-full justify-center text-center text-sm"
        >
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
