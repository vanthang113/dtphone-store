'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, Gift, UserCog } from 'lucide-react';

// Mảng chứa các liên kết chính cho thanh điều hướng trên di động
const mobileNavLinks = [
    { href: '/information', icon: Home, label: 'Tổng quan' },
    { href: '/information/order', icon: ShoppingBag, label: 'Lịch sử' },
    { href: '/information/promotion', icon: Gift, label: 'Ưu đãi' },
    { href: '/information/user-info', icon: UserCog, label: 'Tài khoản' }
];

export const MobileNav = () => {
    const pathname = usePathname(); // Hook để xác định tab nào đang active

    return (
        // Container chính, chỉ hiển thị trên mobile (ẩn từ md trở lên)
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 shadow-[0_-1px_3px_rgba(0,0,0,0.1)] z-50">
            <div className="flex justify-around items-center h-16 max-w-screen-xl mx-auto">
                {mobileNavLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.label}
                            href={link.href}
                            // Thay đổi màu sắc và độ đậm của chữ nếu link đang active
                            className={`flex flex-col items-center justify-center gap-1 text-xs w-full h-full transition-colors font-medium ${isActive ? 'text-red-500 font-semibold' : 'text-neutral-600 hover:text-red-500'
                                }`}
                        >
                            <link.icon size={22} />
                            <span>{link.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}; 