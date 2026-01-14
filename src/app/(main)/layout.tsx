'use client';

import Header from '@/app/(main)/layouts/header';
import Footer from '@/app/(main)/layouts/footer';
import '../globals.css';

import { useState } from 'react';
import ChatWidget from '@/components/chat/ChatWidget';
import { MessageCircle } from 'lucide-react';
import { CartProvider } from '@/context/CartContext';
import { PaymentFormProvider } from '@/context/PaymentFormContext';
import { usePathname } from 'next/navigation';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const pathname = usePathname();

  // Ẩn HEADER chỉ ở trang auth
  const hideHeader =
    !!pathname &&
    (pathname.startsWith('/login') || pathname.startsWith('/register'));

  // Ẩn FOOTER ở trang auth + toàn bộ cart
  const hideFooter =
    !!pathname &&
    (hideHeader || pathname.startsWith('/cart'));

  return (
    <CartProvider>
      <PaymentFormProvider>
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          {!hideHeader && <Header />}

          {/* Main */}
          <main className={`flex-grow bg-white ${!hideHeader ? 'mt-[64px]' : ''}`}>
            {children}
          </main>

          {/* Floating Chat Button */}
          {!isChatOpen && (
            <button
              onClick={() => setIsChatOpen(true)}
              className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-[#00777B] text-white rounded-full shadow-lg hover:bg-[#00777B] transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Liên hệ</span>
            </button>
          )}

          {/* Chat Widget */}
          {isChatOpen && <ChatWidget onClose={() => setIsChatOpen(false)} />}

          {/* Footer */}
          {!hideFooter && <Footer />}
        </div>
      </PaymentFormProvider>
    </CartProvider>
  );
}
