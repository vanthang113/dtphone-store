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

  // Ẩn HEADER ở trang auth
  const hideHeader =
    !!pathname &&
    (
      pathname.startsWith('/login') ||
      pathname.startsWith('/register') ||
      pathname.startsWith('/forgot-password')
    );

  // Ẩn FOOTER ở trang auth + toàn bộ cart
  const hideFooter =
    !!pathname &&
    (hideHeader || pathname.startsWith('/cart'));

  // Ẩn phần liên hệ chatbox
  const hideFloating =
    !!pathname &&
    (
      pathname.startsWith('/login') ||
      pathname.startsWith('/register') ||
      pathname.startsWith('/forgot-password') ||
      pathname.startsWith('/cart') ||
      pathname.startsWith('/checkout')
    );

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
          {!hideFloating && !isChatOpen && (
            <button
              onClick={() => setIsChatOpen(true)}
              className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#00777B] text-white rounded-full shadow-lg hover:bg-[#00777B] transition-colors"
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
