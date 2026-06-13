import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import PwaRegister from '@/components/PwaRegister';
import MobileBottomNav from '@/components/MobileBottomNav';
import { CartProvider } from '@/context/CartContext';

export const metadata: Metadata = {
  title: 'SARIKA COLLECTION - Rakhi, Kurti, Bags, Religious & Festive Items',
  description: 'SARIKA COLLECTION - Your one-stop shop for Rakhi gifts, trendy kurtis, stylish bags, religious items, and festive decorations. Shop now!',
  keywords: 'SARIKA COLLECTION, rakhi, kurti, bags, religious items, festive items, raksha bandhan, gifts',
  manifest: '/manifest.json',
  icons: {
    apple: '/icons/icon-192.svg',
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-title': 'Sarika Collection',
    'apple-mobile-web-app-status-bar-style': 'default',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFloat />
          <MobileBottomNav />
          <PwaRegister />
        </CartProvider>
      </body>
    </html>
  );
}
