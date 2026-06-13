'use client';

import { createContext, useContext, useState, useCallback, useRef, useEffect, type ReactNode } from 'react';
import type { Product } from '@/types';

export type CartItem = {
  id: number;
  slug: string;
  name: string;
  price: number;
  mrp: number;
  image: string;
  quantity: number;
};

type Toast = { message: string; id: number } | null;

type CartContextType = {
  items: CartItem[];
  addItem: (product: Product, qty?: number) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
};

const CartContext = createContext<CartContextType | null>(null);
const STORAGE_KEY = 'sarikacollection_cart';

function saveItems(items: CartItem[]) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch {}
}

function loadItems(): CartItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadItems);
  const [toast, setToast] = useState<Toast>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(null);
  const hydrated = useRef(false);

  useEffect(() => {
    const id = window.setTimeout(() => {
      hydrated.current = true;
      const stored = loadItems();
      if (stored.length) setItems(stored);
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  const showToast = useCallback((message: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ message, id: Date.now() });
    toastTimer.current = setTimeout(() => setToast(null), 2000);
  }, []);

  const addItem = useCallback((product: Product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === product.slug);
      const next = existing
        ? prev.map((i) => (i.slug === product.slug ? { ...i, quantity: i.quantity + qty } : i))
        : [
            ...prev,
            {
              id: product.id,
              slug: product.slug,
              name: product.name,
              price: product.price,
              mrp: product.mrp,
              image: product.images[0],
              quantity: qty,
            },
          ];
      saveItems(next);
      return next;
    });
    showToast(`${product.name} added to cart!`);
  }, [showToast]);

  const removeItem = useCallback((slug: string) => {
    setItems((prev) => {
      const next = prev.filter((i) => i.slug !== slug);
      saveItems(next);
      return next;
    });
  }, []);

  const updateQuantity = useCallback((slug: string, quantity: number) => {
    setItems((prev) => {
      const next = prev.map((i) =>
        i.slug === slug ? { ...i, quantity: Math.max(1, quantity) } : i
      );
      saveItems(next);
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    saveItems([]);
  }, []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal }}>
      {children}
      {toast && (
        <div
          key={toast.id}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[9999] bg-[#3b1c17] text-white px-5 py-3 rounded-xl shadow-2xl text-sm font-medium animate-slide-up flex items-center gap-2 max-w-[90vw]"
          style={{ touchAction: 'manipulation' }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 flex-shrink-0 text-green-400">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          <span className="truncate">{toast.message}</span>
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
