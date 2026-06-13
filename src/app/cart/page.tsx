'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft, MessageCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const WA_NUMBER = '919422703807';

const priceText = (price: number) => (price > 0 ? `₹${price}` : 'Ask for price');

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, subtotal, totalItems } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [deliveryNote, setDeliveryNote] = useState('');

  const totalMrp = items.reduce((sum, i) => sum + i.mrp * i.quantity, 0);
  const totalDiscount = totalMrp - subtotal;
  const hasAskPriceItems = items.some((i) => i.price <= 0);
  const customerDetails = [
    customerName.trim() ? `Name: ${customerName.trim()}` : '',
    deliveryNote.trim() ? `Delivery note/address: ${deliveryNote.trim()}` : '',
  ].filter(Boolean).join('\n');

  const waMessage = encodeURIComponent(
    `Hello Sarika Collection!\n\nI would like to place an order:\n\n${items
      .map((i, idx) => {
        const lineTotal = i.price > 0 ? ` = ₹${i.price * i.quantity}` : '';
        return `${idx + 1}. ${i.name} - ${priceText(i.price)} x ${i.quantity}${lineTotal}`;
      })
      .join('\n')}${customerDetails ? `\n\nCustomer Details:\n${customerDetails}` : ''}\n\nTotal Items: ${totalItems}\nSubtotal: ₹${subtotal}${
      hasAskPriceItems ? '\nSome items need price confirmation.' : ''
    }\nTotal Savings: ₹${totalDiscount}\n\nPlease confirm the order. Thank you!`
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
          className="inline-flex min-h-[48px] items-center gap-2 bg-[#941424] hover:bg-[#6b0e1a] text-white px-6 py-3 rounded-xl font-semibold transition-all"
        >
          <ArrowLeft size={18} /> Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#fbf4ea] border-b border-[#e3d5c6]">
        <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#3b1c17]">Your Cart</h1>
          <p className="text-[#785c52] text-sm mt-1">
            {totalItems} item{totalItems > 1 ? 's' : ''} in your cart
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 pb-40 md:py-8 md:pb-8">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.slug} className="bg-white rounded-2xl border border-[#e3d5c6] p-3 sm:p-4 flex gap-3 sm:gap-4">
                <Link href={`/product/${item.slug}`} className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-28 md:w-28 md:h-28 object-cover rounded-xl"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link href={`/product/${item.slug}`}>
                    <h3 className="font-semibold text-[#3b1c17] text-sm leading-tight hover:text-[#941424] transition-colors line-clamp-2">
                      {item.name}
                    </h3>
                  </Link>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-bold text-[#941424]">{priceText(item.price)}</span>
                    {item.price > 0 && item.mrp > item.price && (
                      <span className="text-xs text-gray-400 line-through">₹{item.mrp}</span>
                    )}
                  </div>
                  <div className="flex items-end justify-between gap-2 mt-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                        className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#e3d5c6] text-[#3b1c17] hover:bg-[#f4e6d2] transition-colors active:scale-90"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-semibold text-sm">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#e3d5c6] text-[#3b1c17] hover:bg-[#f4e6d2] transition-colors active:scale-90"
                        aria-label="Increase quantity"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="font-bold text-[#3b1c17] text-sm">
                        {item.price > 0 ? `₹${item.price * item.quantity}` : 'Confirm price'}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeItem(item.slug)}
                        className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={clearCart}
              className="min-h-[44px] text-sm text-gray-400 hover:text-red-500 transition-colors"
            >
              Clear cart
            </button>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-[#e3d5c6] p-5 sm:p-6 sticky top-24">
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
                {hasAskPriceItems && (
                  <div className="rounded-lg bg-amber-50 px-3 py-2 text-amber-700">
                    Some item prices will be confirmed on WhatsApp.
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

              <div className="mt-5 space-y-3">
                <label className="block">
                  <span className="mb-1 block text-xs font-bold uppercase tracking-[0.12em] text-[#785c52]">Name</span>
                  <input
                    value={customerName}
                    onChange={(event) => setCustomerName(event.target.value)}
                    placeholder="Your name"
                    className="min-h-[48px] w-full rounded-xl border border-[#e3d5c6] bg-[#fffaf4] px-3 text-[16px] outline-none focus:border-[#941424]"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs font-bold uppercase tracking-[0.12em] text-[#785c52]">Address / note</span>
                  <textarea
                    value={deliveryNote}
                    onChange={(event) => setDeliveryNote(event.target.value)}
                    placeholder="Delivery address, pickup note, or question"
                    rows={3}
                    className="w-full resize-none rounded-xl border border-[#e3d5c6] bg-[#fffaf4] px-3 py-3 text-[16px] outline-none focus:border-[#941424]"
                  />
                </label>
              </div>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full flex min-h-[50px] items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1DA851] text-white font-semibold py-3 px-4 rounded-xl transition-all text-sm"
              >
                <MessageCircle size={18} />
                Order on WhatsApp
              </a>

              <p className="text-xs text-gray-400 mt-3 text-center">
                You will be redirected to WhatsApp with your complete order summary. We will confirm availability and delivery details.
              </p>

              <Link
                href="/"
                className="mt-4 w-full flex min-h-[44px] items-center justify-center gap-1 text-[#941424] hover:text-[#6b0e1a] font-medium text-sm transition-colors"
              >
                <ArrowLeft size={14} /> Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-[82px] z-40 border-t border-[#e3d5c6] bg-white/95 px-4 py-3 shadow-[0_-14px_35px_rgba(60,30,12,0.12)] backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-md items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#785c52]">{totalItems} item{totalItems > 1 ? 's' : ''}</p>
            <p className="text-lg font-black text-[#3b1c17]">₹{subtotal}</p>
          </div>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[50px] shrink-0 items-center justify-center rounded-xl bg-[#25D366] px-5 text-sm font-black text-white"
          >
            Send on WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
