'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Home, ShoppingBag, Shield, Gift, BookOpen, UserCog, MapPin, FileText, Mail, LogOut } from 'lucide-react';
import { useLogoutMutation } from '@/store/features/authApi';

export const Sidebar = () => {
  const pathname = usePathname();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      window.location.href = '/login';
    } catch {
      try {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
      } catch {}
      window.location.reload();
    }
  };

  const navLinks = [
    { href: '/information', icon: Home, label: 'Tổng quan' },
    { href: '/information/order', icon: ShoppingBag, label: 'Lịch sử mua hàng' },
    { href: '/information/warranty', icon: Shield, label: 'Tra cứu bảo hành', separator: true },
    { href: '/information/promotion', icon: Gift, label: 'Hạng thành viên và ưu đãi' },
    { href: '/information/promotion/s-edu', icon: BookOpen, label: 'Ưu đãi S-Student và S-Teacher', separator: true },
    { href: '/information/user-info', icon: UserCog, label: 'Thông tin tài khoản' },
    { href: '/shop', icon: MapPin, label: 'Tìm kiếm cửa hàng', external: true },
    { href: '/shop', icon: FileText, label: 'Chính sách bảo hành', external: true },
    { href: '/shop', icon: Mail, label: 'Góp ý - Phản hồi - Hỗ trợ' },
    { href: '/shop', icon: FileText, label: 'Điều khoản sử dụng', external: true, separator: true },
  ];

  return (
    <div className="hidden md:block tablet:w-1/4 laptop:w-1/4 min-h-screen tablet:min-h-[calc(100vh-280px)] shrink-0 tablet:sticky top-[32px] left-0">
      <Card className="bg-white rounded-xl h-full w-full border shadow-sm">
        <CardContent className="w-full h-full flex flex-col p-4">
          <div className="w-full flex flex-col gap-1">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href;
              return (
                <div key={index}>
                  <Link
                    href={link.href}
                    target={link.external ? '_blank' : '_self'}
                    className={`flex text-base items-center group relative transition-colors duration-200 rounded-md font-semibold ${
                      isActive ? 'bg-[#E0FFFF] text-[#00868B] font-bold' : 'text-neutral-600 hover:bg-[#E0FFFF] hover:text-[#00868B]'
                    }`}
                  >
                    <div
                      className={`absolute top-0 left-0 w-1 h-full shrink-0 rounded-r-full transition-colors duration-200 ${
                        isActive ? 'bg-[#00868B]' : 'bg-transparent group-hover:bg-[#00868B]'
                      }`}
                    />
                    <div className="w-full px-4 py-3 flex items-center gap-3">
                      <link.icon className="shrink-0" size={20} />
                      <span>{link.label}</span>
                    </div>
                  </Link>

                  {link.separator && (
                    <div className="my-2 px-2">
                      <div className="w-full h-[1px] bg-neutral-200" />
                    </div>
                  )}
                </div>
              );
            })}

            <button
              onClick={handleLogout}
              className="flex text-base items-center group relative transition-colors duration-200 rounded-md text-neutral-600 hover:bg-[#E0FFFF] hover:text-[#00868B] font-semibold"
            >
              <div className="absolute top-0 left-0 w-1 h-full shrink-0 rounded-r-full transition-colors duration-200 bg-transparent group-hover:bg-[#00868B]" />
              <div className="w-full px-4 py-3 flex items-center gap-3 text-left">
                <LogOut className="shrink-0" size={20} />
                <span>Đăng xuất</span>
              </div>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
