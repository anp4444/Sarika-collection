'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Gift, Grid2X2, Home, MessageCircle, ShoppingCart, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { categories } from '@/data/categories';
import { useCart } from '@/context/CartContext';

const WA_URL = `https://wa.me/919422703807?text=${encodeURIComponent("Hi Sarika Collection! I need help placing an order.")}`;
const categoryHref = (slug: string) => (slug === 'rakhi-gifts' ? '/rakhi' : `/category/${slug}`);

export default function MobileBottomNav() {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems } = useCart();

  const itemClass = (active: boolean) =>
    `flex min-h-[58px] flex-1 flex-col items-center justify-center gap-1 rounded-2xl text-[10px] font-black transition ${
      active ? 'bg-[#fff1f2] text-[#941424]' : 'text-[#5f463d]'
    }`;

  return (
    <>
      {categoriesOpen && (
        <div className="fixed inset-x-0 bottom-[82px] z-[9998] px-3 pb-3">
          <button
            type="button"
            aria-label="Close categories"
            className="fixed inset-0 bottom-[82px] bg-[#2b1712]/18"
            onClick={() => setCategoriesOpen(false)}
          />
          <div id="mobile-category-sheet" className="relative mx-auto max-w-md rounded-[1.35rem] border border-[#e3d5c6] bg-white p-3 shadow-[0_-18px_45px_rgba(60,30,12,0.2)]">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#b7832d]">Shop by</p>
                <h2 className="text-lg font-black leading-tight text-[#2b1712]">Categories</h2>
              </div>
              <button
                type="button"
                onClick={() => setCategoriesOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fff1f2] text-[#941424]"
                aria-label="Close categories"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid max-h-[48vh] grid-cols-3 gap-2 overflow-y-auto pb-1">
              {categories.map((category) => {
                const href = categoryHref(category.slug);
                const active = pathname === href || pathname === `/category/${category.slug}`;

                return (
                  <Link
                    key={category.slug}
                    href={href}
                    onClick={() => setCategoriesOpen(false)}
                    className={`flex min-h-[68px] items-center justify-center rounded-2xl border px-2.5 py-2 text-center text-[12px] font-black leading-tight ${
                      active
                        ? 'border-[#941424] bg-[#fff1f2] text-[#941424]'
                        : 'border-[#eadbc5] bg-[#fffaf4] text-[#3b1c17]'
                    }`}
                  >
                    {category.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <nav className="fixed inset-x-0 bottom-0 z-[9999] border-t border-[#e3d5c6] bg-white/96 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-14px_35px_rgba(60,30,12,0.12)] backdrop-blur">
        <div className="mx-auto flex max-w-md gap-1">
          <Link href="/" onClick={() => setCategoriesOpen(false)} className={itemClass(pathname === '/')}>
            <Home size={20} />
            Home
          </Link>
          <button
            type="button"
            onClick={() => setCategoriesOpen((open) => !open)}
            className={itemClass(categoriesOpen || pathname.startsWith('/category'))}
            aria-expanded={categoriesOpen}
            aria-controls="mobile-category-sheet"
          >
            <Grid2X2 size={20} />
            Categories
          </button>
          <Link href="/cart" onClick={() => setCategoriesOpen(false)} className={`relative ${itemClass(pathname === '/cart')}`}>
            <ShoppingCart size={20} />
            Cart
            {totalItems > 0 && (
              <span className="absolute right-3 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#f0a646] px-1 text-[10px] font-black text-[#2b1712]">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </Link>
          <Link href="/rakhi" onClick={() => setCategoriesOpen(false)} className={itemClass(pathname === '/rakhi')}>
            <Gift size={20} />
            Rakhi
          </Link>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setCategoriesOpen(false)}
            className="flex min-h-[58px] flex-1 flex-col items-center justify-center gap-1 rounded-2xl bg-[#25D366] text-[10px] font-black text-white shadow-sm"
          >
            <MessageCircle size={20} />
            WhatsApp
          </a>
        </div>
      </nav>
    </>
  );
}
