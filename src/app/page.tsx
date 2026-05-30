'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Gift, Clock, ShieldCheck } from 'lucide-react';
import { categories } from '@/data/categories';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';

const rakhiProducts = products.filter(p => p.category === 'rakhi-gifts').slice(0, 4);
const hamperProducts = products.filter(p => p.category === 'rakhi-gifts' && p.name.toLowerCase().includes('hamper')).slice(0, 2).length > 0
  ? products.filter(p => p.category === 'rakhi-gifts' && p.name.toLowerCase().includes('hamper')).slice(0, 2)
  : products.filter(p => p.category === 'rakhi-gifts').slice(4, 6);
const poojaProducts = products.filter(p => p.category === 'religious-items').slice(0, 3);
const bagProducts = products.filter(p => p.category === 'bags').slice(0, 1);

function HomeProductCard({ product }: { product: typeof products[0] }) {
  const { addItem } = useCart();
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
      <Link href={`/product/${product.slug}`}>
        <div className="relative overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-52 object-cover hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.isNew && (
              <span className="bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">New Arrival</span>
            )}
            {product.isBestSeller && (
              <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">Bestseller</span>
            )}
          </div>
          {product.discountPercent > 0 && (
            <span className="absolute top-3 right-3 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              {product.discountPercent}% OFF
            </span>
          )}
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-semibold text-[#3b1c17] text-sm leading-tight mb-1 hover:text-[#941424] transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-lg font-bold text-[#941424]">₹{product.price}</span>
          {product.mrp > product.price && (
            <>
              <span className="text-sm text-gray-400 line-through">₹{product.mrp}</span>
              <span className="text-xs text-green-600 font-semibold">{product.discountPercent}% OFF</span>
            </>
          )}
        </div>
        <button
          type="button"
          onClick={() => addItem(product)}
          className="block w-full text-center bg-[#941424] hover:bg-[#6b0e1a] text-white text-sm font-semibold py-3 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 active:scale-95"
        >
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default function HomePage() {
  const categoryCards = categories.filter(c => ['rakhi-gifts', 'bags', 'religious-items'].includes(c.slug));
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
      <section className="bg-[#fbf4ea] border-b border-[#e3d5c6]">
        <div className="max-w-7xl mx-auto px-4 py-10 md:py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-block bg-[#941424]/10 text-[#941424] text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
                Rakshabandhan Special 2026
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-[#3b1c17] leading-tight mb-4">
                Tie the thread of love this Rakshabandhan
              </h1>
              <p className="text-[#785c52] text-base mb-6 max-w-lg leading-relaxed">
                Handpicked rakhis, gift hampers and pooja essentials — crafted with love and delivered with care. Browse and order in seconds, straight to our WhatsApp.
              </p>
              {/* Countdown Timer */}
              <div className="flex gap-3 mb-6">
                {[
                  { value: timeLeft.days, label: 'Days' },
                  { value: timeLeft.hours, label: 'Hours' },
                  { value: timeLeft.minutes, label: 'Mins' },
                  { value: timeLeft.seconds, label: 'Secs' },
                ].map((t) => (
                  <div key={t.label} className="bg-[#941424] text-white rounded-xl px-3 py-2 md:px-4 md:py-3 text-center min-w-[60px] md:min-w-[72px]">
                    <div className="text-xl md:text-2xl font-bold leading-none">{String(t.value).padStart(2, '0')}</div>
                    <div className="text-[10px] md:text-xs text-white/70 mt-1">{t.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/category/rakhi-gifts"
                  className="bg-[#941424] hover:bg-[#6b0e1a] text-[#fcf8f1] px-6 py-3 rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-lg"
                >
                  Shop Rakhis
                </Link>
                <Link
                  href="/category/bags"
                  className="bg-[#fffbf6] text-[#3b1c17] px-6 py-3 rounded-xl font-semibold text-sm transition-all border border-[#e3d5c6] hover:border-[#d4c4b0]"
                >
                  Gift Hampers
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="https://sarikacollection.netlify.app/hero-rakhi.png"
                alt="Festive Rakshabandhan flat-lay with rakhis, diya and sweets"
                className="w-full max-w-md rounded-3xl shadow-lg"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&q=80'; }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#3b1c17]">Shop by Category</h2>
            <p className="text-gray-500 mt-2">Everything you need to celebrate, beautifully curated.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categoryCards.map((cat) => (
              <Link key={cat.id} href={`/category/${cat.slug}`} className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
                <div className="relative h-48">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="text-2xl mb-1 block">{cat.icon}</span>
                    <h3 className="text-white font-bold text-lg">{cat.name}</h3>
                    <p className="text-white/80 text-xs">{cat.itemCount}+ Items</p>
                  </div>
                </div>
              </Link>
            ))}
            <Link href="/category/rakhi-gifts" className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
              <div className="relative h-48">
                <img src={hamperCategory.image} alt="Gift Hampers" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="text-2xl mb-1 block">🎁</span>
                  <h3 className="text-white font-bold text-lg">Gift Hampers</h3>
                  <p className="text-white/80 text-xs">10+ Items</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Rakhis Section */}
      <section className="py-12 bg-[#fbf4ea]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#3b1c17]">Rakhis</h2>
              <p className="text-gray-500 text-sm mt-1">Threads of love for every bond</p>
            </div>
            <Link href="/category/rakhi-gifts" className="text-[#941424] hover:text-[#6b0e1a] font-semibold text-sm flex items-center gap-1">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {rakhiProducts.map((p) => (
              <HomeProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Gift Hampers */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#3b1c17]">Gift Hampers & Combos</h2>
              <p className="text-gray-500 text-sm mt-1">Rakhi paired with sweets, chocolates & more</p>
            </div>
            <Link href="/category/rakhi-gifts" className="text-[#941424] hover:text-[#6b0e1a] font-semibold text-sm flex items-center gap-1">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {hamperProducts.map((p) => (
              <HomeProductCard key={p.id} product={p} />
            ))}
            {products.filter(p => p.category === 'rakhi-gifts').slice(6, 8).map((p) => (
              <HomeProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Pooja Items */}
      <section className="py-12 bg-[#fbf4ea]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#3b1c17]">Pooja & Religious Items</h2>
              <p className="text-gray-500 text-sm mt-1">Brass diyas, thalis and festive decor</p>
            </div>
            <Link href="/category/religious-items" className="text-[#941424] hover:text-[#6b0e1a] font-semibold text-sm flex items-center gap-1">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {poojaProducts.map((p) => (
              <HomeProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Bags Collection */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#3b1c17]">Bags Collection</h2>
              <p className="text-gray-500 text-sm mt-1">Stylish handbags & tote bags</p>
            </div>
            <Link href="/category/bags" className="text-[#941424] hover:text-[#6b0e1a] font-semibold text-sm flex items-center gap-1">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bagProducts.map((p) => (
              <HomeProductCard key={p.id} product={p} />
            ))}
            {products.filter(p => p.category === 'bags').slice(1, 4).map((p) => (
              <HomeProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-[#941424] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-amber-300 text-sm font-bold tracking-wider uppercase">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">The Story Behind Sarika Collection</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                Sarika Collection started over 12 years ago as a small home-based business with a simple goal: helping families celebrate festivals with beautiful and meaningful products.
              </p>
              <p className="text-white/80 leading-relaxed mb-4">
                What began with a few orders from friends and relatives gradually grew through trust, quality, and customer satisfaction. Every Rakhi, gift hamper, pooja item, and festive product is selected with care and packed with love.
              </p>
              <p className="text-white/80 leading-relaxed">
                Today, Sarika Collection proudly serves more than 1000 happy customers. From Raksha Bandhan and Diwali to weddings and religious celebrations, our mission remains the same: delivering quality products and creating joyful memories.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: '12+', label: 'Years Experience' },
                { num: '1000+', label: 'Happy Customers' },
                { num: '100%', label: 'Customer Focused' },
                { num: '24/7', label: 'WhatsApp Support' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10">
                  <div className="text-3xl md:text-4xl font-bold text-amber-300">{stat.num}</div>
                  <div className="text-white/70 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Shop */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#3b1c17]">Why shop with Sarika Collection</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: ShoppingCart, title: 'Add to Cart', desc: 'Browse, add items to your cart and review everything before ordering.' },
              { icon: Gift, title: 'Handpicked & Festive', desc: 'Curated rakhis, hampers and pooja items for every celebration.' },
              { icon: Clock, title: 'Timely Delivery', desc: 'Order early so your gifts arrive right on time for the festival.' },
              { icon: ShieldCheck, title: 'Quality Assured', desc: 'Carefully packed with love so every item reaches you perfectly.' },
            ].map((item) => (
              <div key={item.title} className="bg-[#fbf4ea] rounded-2xl p-6 text-center border border-amber-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#941424]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon size={24} className="text-[#941424]" />
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
