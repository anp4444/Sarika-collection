'use client';

import Link from 'next/link';
import { Grid2X2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { categories } from '@/data/categories';

const categoryHref = (slug: string) => (slug === 'rakhi-gifts' ? '/rakhi' : `/category/${slug}`);

export default function MobileCategoryBar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Product categories"
      className="fixed inset-x-0 top-16 z-[45] border-b border-[#e3d5c6] bg-white/96 shadow-[0_8px_22px_rgba(60,30,12,0.08)] backdrop-blur md:hidden"
    >
      <div className="no-scrollbar flex gap-2 overflow-x-auto px-3 py-2">
        <Link
          href="/#mobile-discovery"
          className="flex min-h-[42px] shrink-0 items-center gap-1.5 rounded-full border border-[#941424] bg-[#941424] px-3.5 text-xs font-black text-white"
        >
          <Grid2X2 size={15} />
          All
        </Link>
        {categories.map((category) => {
          const href = categoryHref(category.slug);
          const active = pathname === href || pathname === `/category/${category.slug}`;

          return (
            <Link
              key={category.slug}
              href={href}
              aria-current={active ? 'page' : undefined}
              className={`flex min-h-[42px] shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-xs font-black transition ${
                active
                  ? 'border-[#941424] bg-[#fff1f2] text-[#941424]'
                  : 'border-[#e3d5c6] bg-[#fffaf4] text-[#3b1c17]'
              }`}
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] shadow-sm">
                {category.icon}
              </span>
              {category.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
