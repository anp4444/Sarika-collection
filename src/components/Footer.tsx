import Link from 'next/link';
import { Phone, Mail, MapPin, Heart } from 'lucide-react';
import { categories } from '@/data/categories';

export default function Footer() {
  return (
    <footer className="brand-gradient text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <svg width="38" height="38" viewBox="0 0 60 60">
                <circle cx="30" cy="30" r="28" fill="#1a2634" />
                <circle cx="30" cy="30" r="28" fill="none" stroke="#f0a646" strokeWidth="1.5" />
                <circle cx="30" cy="30" r="24" fill="none" stroke="#f0a646" strokeWidth="0.5" opacity="0.4" />
                <path d="M30 8 L32 16 M30 8 L28 16 M22 30 L14 30 M38 30 L46 30" stroke="#f0a646" strokeWidth="1" opacity="0.5" />
                <circle cx="30" cy="30" r="12" fill="none" stroke="#f0a646" strokeWidth="1.2" />
                <text x="30" y="27" fontFamily="Georgia, serif" fontSize="18" fontWeight="bold" fill="#f0a646" textAnchor="middle" dominantBaseline="central">S</text>
                <text x="34" y="37" fontFamily="Georgia, serif" fontSize="10" fontWeight="bold" fill="#d4a84b" textAnchor="middle" dominantBaseline="central">C</text>
              </svg>
              <div>
                <span className="text-lg font-semibold text-white tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', Georgia, serif" }}>Sarika Collection</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-3 h-px bg-[#f0a646]/50 inline-block" />
                  <span className="text-[9px] text-white/60 tracking-[0.25em] uppercase font-medium" style={{ fontFamily: "'Cinzel', Georgia, serif" }}>Since 2016</span>
                  <span className="w-3 h-px bg-[#f0a646]/50 inline-block" />
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              Your one-stop destination for premium Rakhi gifts, trendy kurtis, stylish bags, religious items, and festive decorations.
            </p>
            <div className="space-y-2 text-sm">
              <a href="tel:+919422703807" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                <Phone size={14} /> +91 9422703807
              </a>
              <a href="mailto:info@sarikacollection.com" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                <Mail size={14} /> info@sarikacollection.com
              </a>
              <div className="flex items-start gap-2 text-gray-300">
                <MapPin size={14} className="mt-1" />
                <span>Your City, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-sm text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-300 hover:text-white transition-colors">Contact Us</Link></li>
              <li><a href="https://wa.me/919422703807" target="_blank" className="text-sm text-gray-300 hover:text-white transition-colors">Order on WhatsApp</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Categories</h4>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/category/${cat.slug}`} className="text-sm text-gray-300 hover:text-white transition-colors">
                    {cat.icon} {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / WhatsApp CTA */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Shop via WhatsApp</h4>
            <p className="text-sm text-gray-300 mb-4">
              Browse our collection and order directly through WhatsApp. Quick and easy!
            </p>
            <a
              href="https://wa.me/919422703807"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-xl font-semibold text-sm transition-all"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Order Now
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-gray-400">
            <p className="flex items-center gap-1">
              &copy; 2026 SARIKA COLLECTION. All rights reserved.
            </p>
            <p className="flex items-center gap-1">
              Made with <Heart size={14} className="text-red-400" /> for our customers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
