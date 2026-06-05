'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Gift, Clock, ShieldCheck, Sparkles, TrendingUp, Heart, Star } from 'lucide-react';
import { categories } from '@/data/categories';
import { products } from '@/data/products';
import AddToCartButton from '@/components/AddToCartButton';

export default function HomePage() {
  const categoryCards = categories.filter(c => ['rakhi-gifts', 'bags', 'religious-items', 'food-items'].includes(c.slug));
  const hamperCategory = { id: 99, slug: 'rakhi-gifts', name: 'Gift Hampers', icon: '🎁', image: 'https://images.unsplash.com/photo-1608744882201-52a7f7f3e9f6?w=600&q=80', description: 'Combos with sweets & more', itemCount: 10, color: 'from-red-900' };

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date('2026-08-28T00:00:00');
    const update = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-[#fbf4ea] via-[#fbf4ea] to-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, #941424 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#f0a646]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#941424]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 relative">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-block bg-gradient-to-r from-[#941424] to-[#6b0e1a] text-white text-xs font-bold px-4 py-1.5 rounded-full tracking-wide uppercase shadow-lg shadow-[#941424]/20">
                  Rakshabandhan Special 2026
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#3b1c17] leading-[1.1] mb-4">
                Tie the thread of{' '}
                <span className="text-[#941424]">love</span>
                <br />this Rakshabandhan
              </h1>
              <p className="text-[#785c52] text-base md:text-lg mb-8 max-w-lg leading-relaxed">
                Handpicked rakhis, gift hampers and pooja essentials — crafted with love and delivered with care.
              </p>
              {/* Countdown Timer */}
              <div className="mb-8">
                <p className="text-[#785c52] text-xs font-semibold uppercase tracking-wider mb-3">Rakshabandhan arrives in</p>
                <div className="flex gap-2 md:gap-3">
                  {[
                    { value: timeLeft.days, label: 'Days' },
                    { value: timeLeft.hours, label: 'Hours' },
                    { value: timeLeft.minutes, label: 'Mins' },
                    { value: timeLeft.seconds, label: 'Secs' },
                  ].map((t) => (
                    <div key={t.label} className="bg-white/80 backdrop-blur-sm border border-[#e3d5c6] rounded-xl px-3 py-2.5 md:px-5 md:py-3.5 text-center min-w-[60px] md:min-w-[80px] shadow-sm">
                      <div className="text-xl md:text-3xl font-bold text-[#941424] leading-none">{String(t.value).padStart(2, '0')}</div>
                      <div className="text-[10px] md:text-xs text-[#785c52] mt-1 font-medium">{t.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/category/rakhi-gifts"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#941424] to-[#6b0e1a] hover:from-[#6b0e1a] hover:to-[#941424] text-[#fcf8f1] px-7 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Sparkles size={16} />
                  Shop Rakhis
                </Link>
                <Link
                  href="/category/bags"
                  className="inline-flex items-center gap-2 bg-white hover:bg-[#fbf4ea] text-[#3b1c17] px-7 py-3.5 rounded-xl font-semibold text-sm transition-all border-2 border-[#e3d5c6] hover:border-[#f0a646] hover:-translate-y-0.5 active:translate-y-0 shadow-sm"
                >
                  <Gift size={16} />
                  Gift Hampers
                </Link>
              </div>
            </div>
            <div className="flex justify-center relative">
              <div className="absolute w-72 h-72 bg-[#f0a646]/10 rounded-full blur-2xl -z-10" />
              <div className="absolute w-48 h-48 bg-[#941424]/5 rounded-full blur-2xl -z-10 top-10 right-10" />
              <img
                src="https://sarikacollection.netlify.app/hero-rakhi.png"
                alt="Festive Rakshabandhan flat-lay with rakhis, diya and sweets"
                className="w-full max-w-md rounded-3xl shadow-2xl shadow-[#941424]/10 rotate-1 hover:rotate-0 transition-transform duration-500"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&q=80'; }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="relative bg-gradient-to-r from-[#941424] via-[#b0172c] to-[#941424] overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 40px)' }} />
        <div className="relative max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="hidden sm:flex text-3xl">🎉</span>
            <div>
              <p className="text-white font-bold text-sm sm:text-base">Free Delivery on orders above ₹999</p>
              <p className="text-amber-200 text-xs">Use code: FESTIVE2026</p>
            </div>
          </div>
          <Link
            href="/category/food-items"
            className="inline-flex items-center gap-2 bg-[#f0a646] hover:bg-[#d4912e] text-[#3b1c17] px-5 py-2 rounded-lg font-bold text-xs transition-all whitespace-nowrap shadow-lg"
          >
            <TrendingUp size={14} />
            Shop Now
          </Link>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-14 md:py-18 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-block text-[#f0a646] text-sm font-bold tracking-[0.2em] uppercase mb-2">Categories</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#3b1c17]">Shop by Category</h2>
            <p className="text-gray-500 mt-2 max-w-md mx-auto">Everything you need to celebrate, beautifully curated.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {categoryCards.map((cat) => (
              <Link key={cat.id} href={`/category/${cat.slug}`} className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-52">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#941424]/0 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="text-3xl mb-1.5 block drop-shadow-lg">{cat.icon}</span>
                    <h3 className="text-white font-bold text-lg drop-shadow-md">{cat.name}</h3>
                    <p className="text-white/70 text-xs font-medium">{cat.itemCount}+ Items</p>
                  </div>
                  <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-4 h-4">
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
            <Link href="/category/rakhi-gifts" className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-52">
                <img src={hamperCategory.image} alt="Gift Hampers" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="text-3xl mb-1.5 block drop-shadow-lg">🎁</span>
                  <h3 className="text-white font-bold text-lg drop-shadow-md">Gift Hampers</h3>
                  <p className="text-white/70 text-xs font-medium">10+ Items</p>
                </div>
                <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-4 h-4">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="border-t border-amber-100" />
      </div>

      {/* Bestsellers */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[#f0a646] text-xs font-bold tracking-[0.2em] uppercase">Top Picks</span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#3b1c17] mt-1">Bestsellers</h2>
              <p className="text-gray-500 text-sm mt-1">Our most loved products this season</p>
            </div>
            <Link href="/category/food-items" className="hidden sm:inline-flex items-center gap-1 text-[#941424] hover:text-[#6b0e1a] font-semibold text-sm border border-[#e3d5c6] hover:border-[#941424] px-4 py-2 rounded-xl transition-all">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-dashed border-amber-200 h-52 flex items-center justify-center">
                <p className="text-gray-300 text-xs font-medium">Add product</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Group */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#f0a646] via-[#e8992e] to-[#d4912e]">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 py-10 md:py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                <Heart size={18} className="text-white fill-white" />
                <h2 className="text-white text-xl md:text-2xl font-bold">Join our WhatsApp Group</h2>
              </div>
              <p className="text-white/85 text-sm">Get exclusive offers, new arrivals & festive updates first!</p>
            </div>
            <a
              href="https://chat.whatsapp.com/1wVIawvKnRA9qY79GXTOpg?s=cl&p=a&mlu=1&amv=1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-white hover:bg-[#fbf4ea] text-[#3b1c17] font-bold px-7 py-3.5 rounded-xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap text-sm"
              style={{ minHeight: '48px' }}
            >
              <svg viewBox="0 0 24 24" fill="#25D366" width="22" height="22">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Join WhatsApp Group
            </a>
          </div>
        </div>
      </section>

      {/* Rakhis Section */}
      <section className="py-14 bg-[#fbf4ea]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[#f0a646] text-xs font-bold tracking-[0.2em] uppercase">Rakhi Collection</span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#3b1c17] mt-1">Rakhis</h2>
              <p className="text-gray-500 text-sm mt-1">Threads of love for every bond</p>
            </div>
            <Link href="/category/rakhi-gifts" className="hidden sm:inline-flex items-center gap-1 text-[#941424] hover:text-[#6b0e1a] font-semibold text-sm border border-[#e3d5c6] hover:border-[#941424] px-4 py-2 rounded-xl transition-all">
              View All →
            </Link>
          </div>

          {/* Kids Rakhi */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-1 h-6 bg-pink-500 rounded-full" />
              <h3 className="text-lg font-bold text-[#3b1c17]">Kids Rakhi</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {products.filter(p => p.subcategory === 'kids-rakhi').map((p) => (
                <div key={p.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-amber-100/50">
                  <Link href={`/product/${p.slug}`}>
                    <div className="relative overflow-hidden">
                      <img src={p.images[0]} alt={p.name} className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link href={`/product/${p.slug}`}>
                      <h4 className="font-semibold text-[#3b1c17] text-sm leading-tight mb-1 group-hover:text-[#941424] transition-colors line-clamp-2">{p.name}</h4>
                    </Link>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className={i < Math.round(p.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'} />
                      ))}
                    </div>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-lg font-bold text-[#941424]">₹{p.price}</span>
                      {p.mrp > p.price && (
                        <span className="text-sm text-gray-400 line-through">₹{p.mrp}</span>
                      )}
                    </div>
                    <AddToCartButton product={p} />
                  </div>
                </div>
              ))}
              {products.filter(p => p.subcategory === 'kids-rakhi').length === 0 && (
                <div className="col-span-full bg-white rounded-2xl border border-dashed border-amber-200 h-40 flex items-center justify-center">
                  <p className="text-gray-300 text-xs font-medium">No products yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Couple Rakhi */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-1 h-6 bg-purple-500 rounded-full" />
              <h3 className="text-lg font-bold text-[#3b1c17]">Couple Rakhi</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {products.filter(p => p.subcategory === 'couple-rakhi').map((p) => (
                <div key={p.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-amber-100/50">
                  <Link href={`/product/${p.slug}`}>
                    <div className="relative overflow-hidden">
                      <img src={p.images[0]} alt={p.name} className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link href={`/product/${p.slug}`}>
                      <h4 className="font-semibold text-[#3b1c17] text-sm leading-tight mb-1 group-hover:text-[#941424] transition-colors line-clamp-2">{p.name}</h4>
                    </Link>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className={i < Math.round(p.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'} />
                      ))}
                    </div>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-lg font-bold text-[#941424]">₹{p.price}</span>
                      {p.mrp > p.price && (
                        <span className="text-sm text-gray-400 line-through">₹{p.mrp}</span>
                      )}
                    </div>
                    <AddToCartButton product={p} />
                  </div>
                </div>
              ))}
              {products.filter(p => p.subcategory === 'couple-rakhi').length === 0 && (
                <div className="col-span-full bg-white rounded-2xl border border-dashed border-amber-200 h-40 flex items-center justify-center">
                  <p className="text-gray-300 text-xs font-medium">Coming soon</p>
                </div>
              )}
            </div>
          </div>

          {/* Rakhi */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-1 h-6 bg-[#941424] rounded-full" />
              <h3 className="text-lg font-bold text-[#3b1c17]">Rakhi</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {products.filter(p => p.subcategory === 'rakhi').map((p) => (
                <div key={p.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-amber-100/50">
                  <Link href={`/product/${p.slug}`}>
                    <div className="relative overflow-hidden">
                      <img src={p.images[0]} alt={p.name} className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link href={`/product/${p.slug}`}>
                      <h4 className="font-semibold text-[#3b1c17] text-sm leading-tight mb-1 group-hover:text-[#941424] transition-colors line-clamp-2">{p.name}</h4>
                    </Link>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className={i < Math.round(p.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'} />
                      ))}
                    </div>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-lg font-bold text-[#941424]">₹{p.price}</span>
                      {p.mrp > p.price && (
                        <span className="text-sm text-gray-400 line-through">₹{p.mrp}</span>
                      )}
                    </div>
                    <AddToCartButton product={p} />
                  </div>
                </div>
              ))}
              {products.filter(p => p.subcategory === 'rakhi').length === 0 && (
                <div className="col-span-full bg-white rounded-2xl border border-dashed border-amber-200 h-40 flex items-center justify-center">
                  <p className="text-gray-300 text-xs font-medium">Coming soon</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Gift Hampers */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[#f0a646] text-xs font-bold tracking-[0.2em] uppercase">Combos</span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#3b1c17] mt-1">Gift Hampers & Combos</h2>
              <p className="text-gray-500 text-sm mt-1">Rakhi paired with sweets, chocolates & more</p>
            </div>
            <Link href="/category/rakhi-gifts" className="hidden sm:inline-flex items-center gap-1 text-[#941424] hover:text-[#6b0e1a] font-semibold text-sm border border-[#e3d5c6] hover:border-[#941424] px-4 py-2 rounded-xl transition-all">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-dashed border-amber-200 h-52 flex items-center justify-center">
                <p className="text-gray-300 text-xs font-medium">Add product</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pooja Items */}
      <section className="py-14 bg-[#fbf4ea]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[#f0a646] text-xs font-bold tracking-[0.2em] uppercase">Religious</span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#3b1c17] mt-1">Pooja & Religious Items</h2>
              <p className="text-gray-500 text-sm mt-1">Brass diyas, thalis and festive decor</p>
            </div>
            <Link href="/category/religious-items" className="hidden sm:inline-flex items-center gap-1 text-[#941424] hover:text-[#6b0e1a] font-semibold text-sm border border-[#e3d5c6] hover:border-[#941424] px-4 py-2 rounded-xl transition-all">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-dashed border-amber-200 h-52 flex items-center justify-center">
                <p className="text-gray-300 text-xs font-medium">Add product</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bags Collection */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[#f0a646] text-xs font-bold tracking-[0.2em] uppercase">Accessories</span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#3b1c17] mt-1">Bags Collection</h2>
              <p className="text-gray-500 text-sm mt-1">Stylish handbags & tote bags</p>
            </div>
            <Link href="/category/bags" className="hidden sm:inline-flex items-center gap-1 text-[#941424] hover:text-[#6b0e1a] font-semibold text-sm border border-[#e3d5c6] hover:border-[#941424] px-4 py-2 rounded-xl transition-all">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-dashed border-amber-200 h-52 flex items-center justify-center">
                <p className="text-gray-300 text-xs font-medium">Add product</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="relative py-20 bg-gradient-to-br from-[#941424] via-[#7a101d] to-[#5a0c14] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#f0a646]/50 to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#f0a646]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-300/5 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-[#f0a646]/20 text-[#f0a646] text-xs font-bold px-4 py-1.5 rounded-full tracking-wide uppercase border border-[#f0a646]/20">
                <Heart size={12} /> Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-6 leading-tight">
                The Story Behind<br />
                <span className="text-[#f0a646]">Sarika Collection</span>
              </h2>
              <div className="space-y-4 text-white/80 leading-relaxed text-sm md:text-base">
                <p>
                  Sarika Collection started over 12 years ago as a small home-based business with a simple goal: helping families celebrate festivals with beautiful and meaningful products.
                </p>
                <p>
                  What began with a few orders from friends and relatives gradually grew through trust, quality, and customer satisfaction. Every Rakhi, gift hamper, pooja item, and festive product is selected with care and packed with love.
                </p>
                <p>
                  Today, Sarika Collection proudly serves more than 1000 happy customers. From Raksha Bandhan and Diwali to weddings and religious celebrations, our mission remains the same: delivering quality products and creating joyful memories.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: '12+', label: 'Years Experience' },
                { num: '1000+', label: 'Happy Customers' },
                { num: '100%', label: 'Customer Focused' },
                { num: '24/7', label: 'WhatsApp Support' },
              ].map((stat) => (
                <div key={stat.label} className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
                  <div className="text-3xl md:text-4xl font-bold text-[#f0a646] mb-1">{stat.num}</div>
                  <div className="text-white/60 text-sm group-hover:text-white/80 transition-colors">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Shop */}
      <section className="py-16 bg-[#fbf4ea]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-block text-[#f0a646] text-sm font-bold tracking-[0.2em] uppercase mb-2">Why Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#3b1c17]">Why shop with Sarika Collection</h2>
            <p className="text-gray-500 mt-2 max-w-lg mx-auto">We make celebrating festivals easy, affordable, and memorable.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: ShoppingCart, title: 'Add to Cart', desc: 'Browse, add items to your cart and review everything before ordering.' },
              { icon: Gift, title: 'Handpicked & Festive', desc: 'Curated rakhis, hampers and pooja items for every celebration.' },
              { icon: Clock, title: 'Timely Delivery', desc: 'Order early so your gifts arrive right on time for the festival.' },
              { icon: ShieldCheck, title: 'Quality Assured', desc: 'Carefully packed with love so every item reaches you perfectly.' },
            ].map((item) => (
              <div key={item.title} className="group bg-white rounded-2xl p-6 text-center border border-amber-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-[#941424] to-[#6b0e1a] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#941424]/20">
                  <item.icon size={24} className="text-white" />
                </div>
                <h3 className="font-bold text-[#3b1c17] text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
