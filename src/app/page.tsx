'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Heart,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
} from 'lucide-react';
import AddToCartButton from '@/components/AddToCartButton';
import { categories } from '@/data/categories';
import { products } from '@/data/products';
import type { Product } from '@/types';

const festivalDate = new Date('2026-08-28T00:00:00');
const categoryImages: Record<string, string> = {
  'rakhi-gifts': '/images/peacock rakhi.jpg',
  bags: '/images/charm pair availble in lavener yellow light green light blue and pink.jpg',
  'religious-items': '/images/ganesha rakhi.jpg',
  'food-items': '/images/hero-rakhi.png',
};

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const update = () => {
      const diff = festivalDate.getTime() - Date.now();
      const safeDiff = Math.max(diff, 0);

      setTimeLeft({
        days: Math.floor(safeDiff / 86400000),
        hours: Math.floor((safeDiff % 86400000) / 3600000),
        minutes: Math.floor((safeDiff % 3600000) / 60000),
        seconds: Math.floor((safeDiff % 60000) / 1000),
      });
    };

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return timeLeft;
}

function SectionHeading({
  label,
  title,
  description,
  href,
}: {
  label: string;
  title: string;
  description: string;
  href?: string;
}) {
  return (
    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#b7832d]">{label}</p>
        <h2 className="mt-2 text-2xl font-bold leading-tight text-[#2b1712] md:text-4xl">{title}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#72554b] md:text-base">{description}</p>
      </div>
      {href && (
        <Link
          href={href}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-[#d9c7ae] bg-white px-5 py-2.5 text-sm font-semibold text-[#7c1021] shadow-sm transition hover:border-[#7c1021] hover:-translate-y-0.5"
        >
          View all
          <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
}

function ProductTile({ product, featured = false }: { product: Product; featured?: boolean }) {
  return (
    <article className={`group overflow-hidden rounded-[1.35rem] border border-[#eadbc5] bg-white shadow-[0_18px_45px_rgba(60,30,12,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(60,30,12,0.12)] ${featured ? 'md:grid md:grid-cols-[1.1fr_0.9fr]' : ''}`}>
      <Link href={`/product/${product.slug}`} className={`block overflow-hidden bg-[#f7ead8] ${featured ? 'min-h-[320px]' : ''}`}>
        <img
          src={product.images[0]}
          alt={product.name}
          className={`w-full object-cover transition duration-700 group-hover:scale-105 ${featured ? 'h-full min-h-[320px]' : 'h-56 sm:h-64'}`}
        />
      </Link>
      <div className="p-4 md:p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1 text-[#d2912f]">
            <Star size={15} className="fill-current" />
            <span className="text-xs font-bold text-[#6d5146]">{product.rating}</span>
          </div>
          {product.discountPercent > 0 && (
            <span className="rounded-full bg-[#edf8f1] px-3 py-1 text-[11px] font-bold text-[#087c43]">
              {product.discountPercent}% off
            </span>
          )}
        </div>
        <Link href={`/product/${product.slug}`}>
          <h3 className="line-clamp-2 text-base font-bold leading-snug text-[#2b1712] transition group-hover:text-[#941424]">
            {product.name}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#7b6056]">{product.description}</p>
        <div className="mt-4 flex flex-wrap items-baseline gap-2">
          <span className="text-2xl font-black text-[#941424]">&#8377;{product.price}</span>
          {product.mrp > product.price && <span className="text-sm font-medium text-[#a39187] line-through">&#8377;{product.mrp}</span>}
        </div>
        <div className="mt-4">
          <AddToCartButton product={product} className="py-3 text-sm shadow-[0_10px_24px_rgba(148,20,36,0.18)]" />
        </div>
      </div>
    </article>
  );
}

function ProductRail({ products: railProducts }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {railProducts.map((product) => (
        <ProductTile key={product.id} product={product} />
      ))}
    </div>
  );
}

export default function HomePage() {
  const timeLeft = useCountdown();

  const collections = useMemo(
    () => [
      products.find((p) => p.slug === 'mandala-art-stone-rakhi'),
      products.find((p) => p.slug === 'beautiful-bhai-bhabhi-pair'),
      products.find((p) => p.slug === 'train-rakhi-kids'),
    ].filter(Boolean) as Product[],
    []
  );

  const signatureRakhis = products.filter((p) => p.subcategory === 'rakhi').slice(0, 4);
  const coupleRakhis = products.filter((p) => p.subcategory === 'couple-rakhi').slice(0, 4);
  const kidsRakhis = products.filter((p) => p.subcategory === 'kids-rakhi').slice(0, 4);
  const categoryCards = categories.filter((c) => ['rakhi-gifts', 'bags', 'religious-items', 'food-items'].includes(c.slug));

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#fff7ec]">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_10%,rgba(240,166,70,0.24),transparent_28%),radial-gradient(circle_at_86%_12%,rgba(148,20,36,0.16),transparent_24%),linear-gradient(135deg,#fff7ec_0%,#fffaf5_44%,#f8e1bf_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-white to-transparent" />

        <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-14 pt-10 md:grid-cols-[0.95fr_1.05fr] md:items-center md:pb-20 md:pt-16">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#e7cfac] bg-white/75 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#8b6425] shadow-sm">
              <Sparkles size={14} />
              Rakshabandhan Special 2026
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-[1.02] text-[#291511] md:text-6xl lg:text-7xl">
              Celebrate every bond with rakhis that feel personal.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#6e5147] md:text-lg">
              Shop curated rakhis, bhai-bhabhi pairs, kids favourites, festive gifts and pooja essentials from Sarika Collection.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/category/rakhi-gifts"
                className="inline-flex items-center gap-2 rounded-full bg-[#941424] px-7 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_rgba(148,20,36,0.26)] transition hover:-translate-y-0.5 hover:bg-[#6b0e1a]"
              >
                Shop collection
                <ArrowRight size={17} />
              </Link>
              <a
                href="https://wa.me/919422703807"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#d9c4a4] bg-white px-7 py-3.5 text-sm font-bold text-[#2b1712] shadow-sm transition hover:-translate-y-0.5 hover:border-[#941424]"
              >
                <MessageCircle size={17} />
                Order on WhatsApp
              </a>
            </div>

            <div className="mt-9 grid max-w-xl grid-cols-4 gap-2 rounded-[1.4rem] border border-[#ead8bb] bg-white/70 p-2 shadow-[0_22px_60px_rgba(80,35,20,0.08)] backdrop-blur">
              {[
                { value: timeLeft.days, label: 'Days' },
                { value: timeLeft.hours, label: 'Hours' },
                { value: timeLeft.minutes, label: 'Mins' },
                { value: timeLeft.seconds, label: 'Secs' },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl bg-[#fff8ef] px-2 py-3 text-center">
                  <div className="text-2xl font-black text-[#941424] md:text-3xl">{String(item.value).padStart(2, '0')}</div>
                  <div className="mt-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#8d6d5e]">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[520px]">
            <div className="absolute left-0 top-8 hidden w-44 rounded-[1.5rem] border border-white/70 bg-white p-3 shadow-[0_24px_60px_rgba(60,28,12,0.16)] md:block">
              <div className="flex items-center gap-2 text-xs font-bold text-[#8a6a5e]">
                <PackageCheck size={15} className="text-[#941424]" />
                Packed with care
              </div>
            </div>
            <div className="absolute right-2 top-0 h-72 w-56 overflow-hidden rounded-[2rem] border-[7px] border-white bg-white shadow-[0_30px_70px_rgba(70,28,12,0.18)] sm:right-12">
              <img src="/images/hero-rakhi.png" alt="Festive rakhi arrangement" className="h-full w-full object-cover" />
            </div>
            {collections.map((product, index) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className={`absolute overflow-hidden rounded-[1.5rem] border-[7px] border-white bg-white shadow-[0_28px_70px_rgba(70,28,12,0.18)] transition hover:-translate-y-1 ${
                  index === 0
                    ? 'bottom-8 left-0 h-64 w-[58%]'
                    : index === 1
                      ? 'bottom-0 right-0 h-56 w-[48%]'
                      : 'left-[30%] top-32 h-52 w-[42%]'
                }`}
              >
                <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="line-clamp-1 text-sm font-bold text-white">{product.name}</p>
                  <p className="text-xs font-semibold text-white/80">&#8377;{product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-5">
        <div className="mx-auto grid max-w-7xl gap-3 px-4 md:grid-cols-4">
          {[
            { icon: Truck, title: 'Timely festive delivery', text: 'Order early for Rakshabandhan' },
            { icon: ShieldCheck, title: 'Quality checked', text: 'Selected and packed carefully' },
            { icon: ShoppingBag, title: 'Cart to WhatsApp', text: 'Review your order before sending' },
            { icon: Heart, title: '1000+ customers', text: 'Trusted for family celebrations' },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-3 rounded-2xl border border-[#efdfc9] bg-[#fffaf4] p-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#941424] text-white">
                <item.icon size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#2b1712]">{item.title}</h3>
                <p className="text-xs leading-5 text-[#7b6056]">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#fffaf4] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            label="Signature edit"
            title="Rakhis with a festive finish"
            description="Classic, spiritual and statement rakhis chosen for color, detail and gifting value."
            href="/category/rakhi-gifts"
          />
          <ProductRail products={signatureRakhis} />
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            label="Shop by mood"
            title="One store for the whole celebration"
            description="Move from rakhi selection to gifting, pooja and treats without losing the festive thread."
          />
          <div className="grid gap-4 md:grid-cols-4 md:auto-rows-[240px]">
            {categoryCards.map((cat, index) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className={`group relative overflow-hidden rounded-[1.5rem] bg-[#2b1712] shadow-[0_22px_55px_rgba(50,20,10,0.12)] ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
              >
                <img
                  src={categoryImages[cat.slug] ?? cat.image}
                  alt={cat.name}
                  className="h-full min-h-[240px] w-full object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <h3 className="text-xl font-black text-white md:text-2xl">{cat.name}</h3>
                  <p className="mt-1 max-w-xs text-sm leading-6 text-white/78">{cat.description}</p>
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/14 px-4 py-2 text-xs font-bold text-white backdrop-blur">
                    Explore {cat.itemCount}+ items
                    <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#2b1712] py-16 text-white md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#f0ba62]">Bhai-bhabhi pairs</p>
            <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">Coordinated sets that look premium in every thali.</h2>
            <p className="mt-4 text-base leading-7 text-white/72">
              Lumba pairs, peacock details, rudraksh accents and handpainted pieces for families who love a matching festive look.
            </p>
            <Link
              href="/category/rakhi-gifts"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#f0a646] px-6 py-3 text-sm font-black text-[#2b1712] transition hover:-translate-y-0.5 hover:bg-[#ffc56b]"
            >
              Shop couple rakhis
              <ArrowRight size={17} />
            </Link>
          </div>
          <ProductRail products={coupleRakhis} />
        </div>
      </section>

      <section className="bg-[#fffaf4] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            label="For little brothers"
            title="Playful rakhis kids actually get excited about"
            description="Bright, character-led and activity-inspired designs for the youngest festival stars."
            href="/category/rakhi-gifts"
          />
          <ProductRail products={kidsRakhis} />
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] border border-[#eadbc5] bg-[#fff6e8] shadow-[0_28px_80px_rgba(60,26,12,0.1)] md:grid-cols-[1fr_0.9fr]">
          <div className="p-6 md:p-10 lg:p-12">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#b7832d]">Our story</p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-[#2b1712] md:text-5xl">A homegrown collection built on trust.</h2>
            <p className="mt-5 text-base leading-8 text-[#6e5147]">
              Sarika Collection began as a small home-based business and grew through careful selection, honest pricing and happy festival orders. Every rakhi, hamper and pooja item is chosen with the same personal attention.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ['12+', 'Years'],
                ['1000+', 'Customers'],
                ['100%', 'Care'],
                ['24/7', 'WhatsApp'],
              ].map(([num, label]) => (
                <div key={label} className="rounded-2xl bg-white p-4 text-center shadow-sm">
                  <div className="text-2xl font-black text-[#941424]">{num}</div>
                  <div className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#876b5e]">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative min-h-[360px]">
            <img src="/images/peacock couple rakhi.jpg" alt="Peacock couple rakhi set" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2b1712]/55 to-transparent" />
          </div>
        </div>
      </section>

      <section className="bg-[#941424] px-4 py-12 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ffd38a]">Need help choosing?</p>
            <h2 className="mt-2 text-3xl font-black md:text-4xl">Send your list on WhatsApp and we will help you order.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/78">
              Perfect for bulk gifting, family orders, last-minute questions and custom festive combinations.
            </p>
          </div>
          <a
            href="https://wa.me/919422703807"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-black text-[#941424] transition hover:-translate-y-0.5 hover:bg-[#fff3dd]"
          >
            <MessageCircle size={18} />
            Chat now
          </a>
        </div>
      </section>
    </>
  );
}
