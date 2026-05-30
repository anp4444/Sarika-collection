import Link from 'next/link';
import { Heart, Shield, Truck, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <div className="brand-gradient py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">About SARIKA COLLECTION</h1>
          <p className="text-amber-200 text-lg max-w-xl mx-auto">
            Your trusted destination for quality products and festive essentials
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose max-w-none">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Story</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            SARIKA COLLECTION was born from a passion to bring quality products to our customers at affordable prices. 
            We specialize in a wide range of products including Rakhi gifts, trendy kurtis, stylish bags, religious items, 
            and festive decorations.
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            Our mission is to provide a seamless shopping experience where customers can explore our curated collection 
            and order directly through WhatsApp for personalized service. Every product in our collection is handpicked 
            for its quality, design, and value.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-10">Why Choose Us?</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {[
              { icon: Sparkles, title: 'Quality Products', desc: 'We carefully select every product to ensure premium quality and customer satisfaction.' },
              { icon: Truck, title: 'Free Shipping', desc: 'Enjoy free shipping on orders above ₹499. We deliver across India.' },
              { icon: Shield, title: 'Secure Ordering', desc: 'Order via WhatsApp with personalized assistance from our team.' },
              { icon: Heart, title: 'Customer First', desc: 'Your happiness is our priority. We provide easy returns and dedicated support.' },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 rounded-xl bg-[#f4e6d2] flex items-center justify-center flex-shrink-0">
                  <item.icon size={22} className="text-[#941424]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Ready to explore our collection?</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/category/rakhi-gifts" className="btn-primary">
              Browse Rakhi Gifts
            </Link>
            <a
              href="https://wa.me/919422703807"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
