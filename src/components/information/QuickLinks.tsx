import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Gift, ShoppingBag, MapPin, BookOpen, UserCog } from 'lucide-react';


export const QuickLinks = () => (
    <Card className="bg-white w-full px-small py-small tablet:px-1x-large tablet:py-medium rounded-1x-large mb-small">
        <CardContent className="w-full grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {[
                { href: '/promotion', icon: Gift, label: 'Hạng thành viên' },
                { href: '/promotion', icon: Gift, label: 'Mã giảm giá' },
                { href: '/order', icon: ShoppingBag, label: 'Lịch sử mua hàng' },
                { href: '/user-info', icon: MapPin, label: 'Sổ địa chỉ' },
                { href: '/promotion/s-edu', icon: BookOpen, label: 'S-Edu' },
                { href: '/user-info', icon: UserCog, label: 'Liên kết tài khoản' },
            ].map((link, index) => (
                <Link
                    key={index}
                    href={link.href}
                    className="flex flex-col items-center gap-1x-small group"
                >
                    <div className="w-[40px] h-[40px] bg-neutral-50 rounded-full flex items-center justify-center transition-colors duration-200 group-hover:bg-primary-50">
                        <link.icon size={24} className="transition-colors duration-200 group-hover:text-primary-500" />
                    </div>
                    <div className="text-1x-small tablet:text-base font-medium text-center transition-colors duration-200 group-hover:text-primary-500">
                        {link.label}
                    </div>
                </Link>
            ))}
        </CardContent>
    </Card>
); 