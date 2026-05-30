'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Star, CheckCircle, ShoppingCart, Minus, Plus, Truck, Shield, RefreshCw } from 'lucide-react';
import { getProductBySlug, getProductsByCategory } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/context/CartContext';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Product not found</h1>
        <Link href="/" className="text-[#941424] hover:underline">Go back home</Link>
      </div>
    );
  }

  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#941424] transition-colors">
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
            <Link href="/" className="hover:text-[#941424]">Home</Link>
            <span>/</span>
            <Link href={`/category/${product.category}`} className="hover:text-[#941424] capitalize">{product.category.replace('-', ' ')}</Link>
            <span>/</span>
            <span className="text-gray-600 truncate max-w-[200px]">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-[#f4e6d2] to-amber-50 border border-gray-200">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-80 md:h-96 object-cover"
              />
            </div>
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isNew && (
                <span className="badge-new px-4 py-1.5 rounded-full text-xs font-bold">NEW ARRIVAL</span>
              )}
              {product.isBestSeller && (
                <span className="badge-bestseller px-4 py-1.5 rounded-full text-xs font-bold">BEST SELLER</span>
              )}
            </div>
            {product.discountPercent > 0 && (
              <span className="badge-discount absolute top-4 right-4 px-4 py-1.5 rounded-full text-sm font-bold">
                {product.discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Info */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">{product.rating} out of 5</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline flex-wrap gap-3 mb-6">
              <span className="text-3xl font-bold text-[#941424]">₹{product.price}</span>
              {product.mrp > product.price && (
                <>
                  <span className="text-lg text-gray-400 line-through">₹{product.mrp}</span>
                  <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    Save ₹{product.mrp - product.price} ({product.discountPercent}% OFF)
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

            {/* Features */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Product Highlights</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Material & Color */}
            <div className="flex gap-6 mb-6 text-sm text-gray-600">
              {product.material && (
                <div>
                  <span className="text-gray-400">Material:</span>
                  <p className="font-medium text-gray-800">{product.material}</p>
                </div>
              )}
              {product.color && (
                <div>
                  <span className="text-gray-400">Color:</span>
                  <p className="font-medium text-gray-800">{product.color}</p>
                </div>
              )}
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 font-medium">Qty:</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#e3d5c6] text-[#3b1c17] hover:bg-[#f4e6d2] transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-10 text-center font-semibold text-base">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#e3d5c6] text-[#3b1c17] hover:bg-[#f4e6d2] transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => { addItem(product, qty); setQty(1); }}
              className="w-full flex items-center justify-center gap-2 bg-[#941424] hover:bg-[#6b0e1a] text-white font-semibold py-3.5 px-4 rounded-xl transition-all text-base shadow-md hover:shadow-lg mb-4"
            >
              <ShoppingCart size={20} />
              Add to Cart — ₹{product.price * qty}
            </button>

            <p className="text-xs text-gray-400 text-center mb-6">
              Added items will be saved in your cart. When ready, review and send your order on WhatsApp from the cart page.
            </p>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl">
              {[
                { icon: Truck, text: 'Free Shipping', sub: 'On orders ₹499+' },
                { icon: Shield, text: 'Secure', sub: 'Via WhatsApp' },
                { icon: RefreshCw, text: '7-Day Returns', sub: 'Easy returns' },
              ].map((item) => (
                <div key={item.text} className="text-center">
                  <item.icon size={20} className="mx-auto text-[#941424] mb-1" />
                  <p className="font-semibold text-gray-800 text-xs">{item.text}</p>
                  <p className="text-gray-400 text-[10px]">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="bg-gray-50 border-t border-gray-100 py-10">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Related Products</h2>
            <div className="product-grid">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
