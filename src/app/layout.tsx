import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { CartProvider } from '@/context/CartContext';

export const metadata: Metadata = {
  title: 'SARIKA COLLECTION - Rakhi, Kurti, Bags, Religious & Festive Items',
  description: 'SARIKA COLLECTION - Your one-stop shop for Rakhi gifts, trendy kurtis, stylish bags, religious items, and festive decorations. Shop now!',
  keywords: 'SARIKA COLLECTION, rakhi, kurti, bags, religious items, festive items, raksha bandhan, gifts',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFloat />
        </CartProvider>
      </body>
    </html>
  );
}
