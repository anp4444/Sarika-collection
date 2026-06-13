'use client';

import Link from 'next/link';
import { Grid2X2, Home, MessageCircle, ShoppingCart } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';

const WA_URL = `https://wa.me/919422703807?text=${encodeURIComponent("Hi Sarika Collection! I need help placing an order.")}`;

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { totalItems } = useCart();

  const itemClass = (active: boolean) =>
    `flex min-h-[52px] flex-1 flex-col items-center justify-center gap-0.5 rounded-2xl text-[10px] font-bold transition ${
      active ? 'bg-[#941424] text-white shadow-sm' : 'text-[#5f463d]'
    }`;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-[90] border-t border-[#e3d5c6] bg-[#fffaf4]/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-14px_35px_rgba(60,30,12,0.12)] backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-md gap-1">
        <Link href="/" className={itemClass(pathname === '/')}>
          <Home size={20} />
          Home
        </Link>
        <Link href="/#mobile-discovery" className={itemClass(false)}>
          <Grid2X2 size={20} />
          Browse
        </Link>
        <Link href="/cart" className={`relative ${itemClass(pathname === '/cart')}`}>
          <ShoppingCart size={20} />
          Cart
          {totalItems > 0 && (
            <span className="absolute right-5 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#f0a646] px-1 text-[10px] font-black text-[#2b1712]">
              {totalItems > 9 ? '9+' : totalItems}
            </span>
          )}
        </Link>
        <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="flex min-h-[52px] flex-1 flex-col items-center justify-center gap-0.5 rounded-2xl bg-[#25D366] text-[10px] font-bold text-white shadow-sm">
          <MessageCircle size={20} />
          WhatsApp
        </a>
      </div>
    </nav>
  );
}
