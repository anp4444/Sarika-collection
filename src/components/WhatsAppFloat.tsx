import { MessageCircle } from 'lucide-react';

export default function WhatsAppFloat() {
  const waUrl = `https://wa.me/919422703807?text=${encodeURIComponent("Hi! I'm looking for a product that I couldn't find on your website. Can you help me find it?")}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-bold text-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
      aria-label="Request a product on WhatsApp"
      style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent', minHeight: '48px' }}
    >
      <MessageCircle size={20} />
      <span className="hidden sm:inline">Request a Product</span>
    </a>
  );
}
