'use client';

import Link from 'next/link';
import { ArrowLeft, Star } from 'lucide-react';
import { products } from '@/data/products';
import AddToCartButton from '@/components/AddToCartButton';

const subCategories = [
  { title: 'Kids Rakhi', slug: 'kids-rakhi', color: '#ec4899', desc: 'Colourful & fun rakhis for little brothers' },
  { title: 'Couple Rakhi', slug: 'couple-rakhi', color: '#a855f7', desc: 'Lumba rakhis & sets for bhabhi & bhaiya' },
  { title: 'Rakhi', slug: 'rakhi', color: '#941424', desc: 'Traditional & designer rakhis for every bond' },
];

export default function RakhiPage() {
  return (
    <div className="min-h-screen bg-[#fbf4ea]">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <Link href="/" className="inline-flex items-center gap-1.5 text-[#785c52] hover:text-[#941424] text-sm font-medium transition-colors mb-6">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="text-center mb-10">
          <span className="inline-block text-[#f0a646] text-sm font-bold tracking-[0.2em] uppercase mb-2">Rakhi Collection</span>
          <h1 className="text-3xl md:text-4xl font-bold text-[#3b1c17]">Choose Your Rakhi</h1>
          <p className="text-gray-500 mt-2 max-w-md mx-auto">Find the perfect rakhi for every relationship</p>
        </div>

        {subCategories.map((sub) => {
          const subProducts = products.filter(p => p.subcategory === sub.slug);
          return (
            <div key={sub.slug} className="mb-10 last:mb-0">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-1 h-6 rounded-full" style={{ background: sub.color }} />
                <h2 className="text-xl font-bold text-[#3b1c17]">{sub.title}</h2>
                <span className="text-xs text-gray-400">({sub.desc})</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
                {subProducts.map((p) => (
                  <div key={p.id} className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-amber-100/50">
                    <Link href={`/product/${p.slug}`}>
                      <div className="relative overflow-hidden">
                        <img src={p.images[0]} alt={p.name} className="w-full h-20 sm:h-52 object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    </Link>
                    <div className="p-1.5 sm:p-4">
                      <Link href={`/product/${p.slug}`}>
                        <h3 className="font-semibold text-[10px] sm:text-sm text-[#3b1c17] leading-tight mb-0.5 sm:mb-1 group-hover:text-[#941424] transition-colors line-clamp-2">{p.name}</h3>
                      </Link>
                      <div className="flex items-center gap-0.5 sm:gap-1 mb-0.5 sm:mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={8} className={`sm:size-[12px] ${i < Math.round(p.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} />
                        ))}
                      </div>
                      <div className="flex items-baseline gap-1 sm:gap-2 mb-1 sm:mb-3">
                        <span className="text-[11px] sm:text-lg font-bold text-[#941424]">₹{p.price}</span>
                        {p.mrp > p.price && <span className="text-[9px] sm:text-sm text-gray-400 line-through">₹{p.mrp}</span>}
                      </div>
                      <AddToCartButton product={p} />
                    </div>
                  </div>
                ))}
                {subProducts.length === 0 && (
                  <div className="col-span-full bg-white rounded-2xl border border-dashed border-amber-200 h-40 flex items-center justify-center">
                    <p className="text-gray-300 text-xs font-medium">Coming soon</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
