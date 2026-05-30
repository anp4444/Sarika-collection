'use client';

import { useState, useRef } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/types';

export default function AddToCartButton({ product, qty = 1, className = '' }: { product: Product; qty?: number; className?: string }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (timerRef.current) clearTimeout(timerRef.current);
    addItem(product, qty);
    setAdded(true);
    timerRef.current = setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={handleAdd}
      className={`w-full flex items-center justify-center gap-2 font-semibold rounded-xl transition-all select-none ${added ? 'bg-green-600 text-white' : 'bg-[#941424] hover:bg-[#6b0e1a] text-white'} ${className || 'py-3 text-sm shadow-sm active:scale-95'}`}
      style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent', minHeight: '48px' }}
    >
      {added ? (
        <>
          <Check size={18} className="flex-shrink-0" />
          Added!
        </>
      ) : (
        <>
          <ShoppingCart size={18} className="flex-shrink-0" />
          Add to Cart
        </>
      )}
    </button>
  );
}
