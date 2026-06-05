'use client';

import Link from 'next/link';
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const WA_NUMBER = '919422703807';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, subtotal, totalItems } = useCart();

  const totalMrp = items.reduce((sum, i) => sum + i.mrp * i.quantity, 0);
  const totalDiscount = totalMrp - subtotal;

  const waMessage = encodeURIComponent(
    `Hello Sarika Collection! 🙏\n\nI would like to place an order:\n\n${items
      .map(
        (i, idx) =>
          `${idx + 1}. ${i.name} — ₹${i.price} × ${i.quantity} = ₹${i.price * i.quantity}`
      )
      .join('\n')}\n\n━━━━━━━━━━━━━━━\nTotal Items: ${totalItems}\nSubtotal: ₹${subtotal}\nTotal Savings: ₹${totalDiscount}\n━━━━━━━━━━━━━━━\n\nPlease confirm the order. Thank you!`
  );
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${waMessage}`;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h1>
        <p className="text-gray-500 mb-6">Start adding products to your cart!</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#941424] hover:bg-[#6b0e1a] text-white px-6 py-3 rounded-xl font-semibold transition-all"
        >
          <ArrowLeft size={18} /> Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#fbf4ea] border-b border-[#e3d5c6]">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#3b1c17]">Your Cart</h1>
          <p className="text-[#785c52] text-sm mt-1">{totalItems} item{totalItems > 1 ? 's' : ''} in your cart</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.slug} className="bg-white rounded-2xl border border-[#e3d5c6] p-4 flex gap-4">
                <Link href={`/product/${item.slug}`} className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-xl"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link href={`/product/${item.slug}`}>
                    <h3 className="font-semibold text-[#3b1c17] text-sm leading-tight hover:text-[#941424] transition-colors line-clamp-2">
                      {item.name}
                    </h3>
                  </Link>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-bold text-[#941424]">₹{item.price}</span>
                    {item.mrp > item.price && (
                      <span className="text-xs text-gray-400 line-through">₹{item.mrp}</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#e3d5c6] text-[#3b1c17] hover:bg-[#f4e6d2] transition-colors active:scale-90"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center font-semibold text-sm">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#e3d5c6] text-[#3b1c17] hover:bg-[#f4e6d2] transition-colors active:scale-90"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-[#3b1c17] text-sm">
                        ₹{item.price * item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeItem(item.slug)}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={clearCart}
              className="text-sm text-gray-400 hover:text-red-500 transition-colors"
            >
              Clear cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-[#e3d5c6] p-6 sticky top-24">
              <h2 className="font-bold text-[#3b1c17] text-lg mb-4">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>₹{subtotal}</span>
                </div>
                {totalDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Savings</span>
                    <span>-₹{totalDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-gray-400">Based on location</span>
                </div>
                <hr className="border-[#e3d5c6]" />
                <div className="flex justify-between font-bold text-[#3b1c17] text-base">
                  <span>Total</span>
                  <span>₹{subtotal}</span>
                </div>
              </div>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1DA851] text-white font-semibold py-3 px-4 rounded-xl transition-all text-sm"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Order on WhatsApp
              </a>

              <p className="text-xs text-gray-400 mt-3 text-center">
                You&apos;ll be redirected to WhatsApp with your complete order summary. We&apos;ll confirm availability and delivery details.
              </p>

              <Link
                href="/"
                className="mt-4 w-full flex items-center justify-center gap-1 text-[#941424] hover:text-[#6b0e1a] font-medium text-sm transition-colors"
              >
                <ArrowLeft size={14} /> Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
