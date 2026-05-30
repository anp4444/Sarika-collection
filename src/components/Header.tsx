'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { categories } from '@/data/categories';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-[#e3d5c6] bg-[#fbf4ea]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 h-16">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-lg font-bold text-[#941424] tracking-wide">SARIKA COLLECTION</span>
          <span className="text-[11px] text-[#785c52] tracking-widest uppercase">Festive Gifting</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <Link href="/" className="px-3 py-2 text-sm font-medium text-[#3b1c17] hover:text-[#941424] rounded-lg hover:bg-[#f4e6d2] transition-all">
            Home
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="px-3 py-2 text-sm font-medium text-[#3b1c17] hover:text-[#941424] rounded-lg hover:bg-[#f4e6d2] transition-all"
            >
              {cat.name}
            </Link>
          ))}
          <Link href="/about" className="px-3 py-2 text-sm font-medium text-[#3b1c17] hover:text-[#941424] rounded-lg hover:bg-[#f4e6d2] transition-all">
            About
          </Link>
          <Link href="/contact" className="px-3 py-2 text-sm font-medium text-[#3b1c17] hover:text-[#941424] rounded-lg hover:bg-[#f4e6d2] transition-all">
            Contact
          </Link>
          <Link
            href="/cart"
            className="relative ml-1 p-2 text-[#3b1c17] hover:text-[#941424] hover:bg-[#f4e6d2] rounded-lg transition-all"
          >
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#941424] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </Link>
          <a
            href="https://wa.me/919422703807"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1DA851] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat on WhatsApp
          </a>
        </nav>

        <div className="md:hidden flex items-center gap-1">
          <Link
            href="/cart"
            className="relative p-2 text-[#3b1c17] hover:text-[#941424] hover:bg-[#f4e6d2] rounded-lg transition-all"
          >
            <ShoppingCart size={22} />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#941424] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-[#3b1c17] hover:bg-[#f4e6d2] rounded-lg"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-[#e3d5c6] bg-[#fffbf6]">
          <div className="px-4 py-3 space-y-1">
            <Link href="/" onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-sm font-medium text-[#3b1c17] hover:bg-[#f4e6d2] rounded-lg">
              Home
            </Link>
            {categories.map((cat) => (
              <Link key={cat.id} href={`/category/${cat.slug}`} onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-sm font-medium text-[#3b1c17] hover:bg-[#f4e6d2] rounded-lg">
                {cat.name}
              </Link>
            ))}
            <Link href="/about" onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-sm font-medium text-[#3b1c17] hover:bg-[#f4e6d2] rounded-lg">
              About
            </Link>
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-sm font-medium text-[#3b1c17] hover:bg-[#f4e6d2] rounded-lg">
              Contact
            </Link>
            <Link href="/cart" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-[#3b1c17] hover:bg-[#f4e6d2] rounded-lg">
              <ShoppingCart size={18} />
              Cart
              {totalItems > 0 && (
                <span className="bg-[#941424] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </Link>
            <a
              href="https://wa.me/919422703807"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-lg text-sm font-semibold"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
