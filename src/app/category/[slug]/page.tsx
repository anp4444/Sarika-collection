import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { categories } from '@/data/categories';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export const dynamicParams = false;

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  const category = categories.find((c) => c.slug === slug);
  const categoryProducts = products.filter((p) => p.category === slug);

  if (!category) {
    notFound();
  }

  return (
    <>
      {/* Category Header */}
      <div className="brand-gradient py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/" className="inline-flex items-center gap-1 text-amber-200 hover:text-white text-sm mb-4 transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-5xl">{category.icon}</span>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">{category.name}</h1>
              <p className="text-amber-200 mt-1">{category.description}</p>
              <p className="text-amber-300 text-sm mt-1">{categoryProducts.length} products</p>
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {categoryProducts.length > 0 ? (
          <div className="product-grid">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found in this category yet.</p>
            <p className="text-gray-400 text-sm mt-2">Check back soon for new arrivals!</p>
          </div>
        )}
      </div>

      {/* WhatsApp CTA */}
      <div className="max-w-7xl mx-auto px-4 pb-10">
        <div className="bg-gradient-to-r from-[#f4e6d2] to-[#fbf4ea] rounded-2xl p-8 text-center border border-[#e3d5c6]">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Can&apos;t find what you&apos;re looking for?</h3>
          <p className="text-gray-500 mb-4">Send us a message on WhatsApp and we&apos;ll help you find the perfect product!</p>
          <a
            href={`https://wa.me/919422703807?text=${encodeURIComponent(`Hi! I'm interested in products from ${category.name} category.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp inline-flex"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Ask on WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
