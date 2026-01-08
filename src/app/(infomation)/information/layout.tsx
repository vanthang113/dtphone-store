import { ReactNode } from 'react';
import { UserInfo } from '@/components/information/UserInfo';
import { QuickLinks } from '@/components/information/QuickLinks';
import { Sidebar } from '@/components/information/Sidebar';
import { MobileNav } from '@/components/information/MobileNav';

interface InformationLayoutProps {
    children: ReactNode;
}


export default function InformationLayout({ children }: InformationLayoutProps) {
    return (
        <div className="relative w-full bg-gray-100">
            <div className="container mx-auto max-w-screen-xl px-4 py-8 flex flex-col gap-4 pb-20 md:pb-8">
                {/* Component tiêu đề thông tin người dùng */}
                <UserInfo />
                {/* Component các liên kết hành động nhanh */}
                <QuickLinks />
                <div className="flex relative gap-4">
                    {/* Thanh điều hướng bên cạnh cho desktop */}
                    <Sidebar />
                    {/* Nội dung của các trang con sẽ được hiển thị ở đây */}
                    <main className="flex-1">
                        {children}
                    </main>
                </div>
            </div>
            {/* Thanh điều hướng dưới cùng cho thiết bị di động */}
            <MobileNav />
        </div>
    );
}