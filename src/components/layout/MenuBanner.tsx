'use client';

import Link from 'next/link';
import { ChevronRightIcon } from '../icons/BannerMenuIcon';
import {
  PhoneTabletIcon,
  LaptopIcon,
  AudioIcon,
  WatchCameraIcon,
  HomeApplianceIcon,
  AccessoryIcon,
  TvIcon,
  TradeInIcon,
  RefurbishedIcon,
  PromotionIcon,
  TechNewsIcon,
} from '@/components/icons/BannerMenuIcon';

export interface MenuItem {
  icon: React.ReactNode;
  links: { href: string; text: string }[];
  isMultiple: boolean;
  subMenu?: { href: string; text: string }[];
}

const menuItems: MenuItem[] = [
  {
    icon: <PhoneTabletIcon className="w-6 h-6" />,
    links: [{ href: '/danh-muc/dien-thoai', text: 'Điện thoại' }, { href: '/danh-muc/tablet', text: 'Tablet' }],
    isMultiple: true,
    subMenu: [
      { href: '/danh-muc/dien-thoai/tu-10-trieu', text: 'Từ 10 triệu' },
      { href: '/danh-muc/dien-thoai/tu-10-15-trieu', text: 'Từ 10 - 15 triệu' },
      { href: '/danh-muc/dien-thoai/tu-15-20-trieu', text: 'Từ 15 - 20 triệu' },
    ],
  },
  {
    icon: <LaptopIcon className="w-6 h-6" />,
    links: [{ href: '/danh-muc/laptop', text: 'Laptop' }],
    isMultiple: false,
    subMenu: [
      { href: '/danh-muc/laptop/tu-10-trieu', text: 'Từ 10 triệu' },
      { href: '/danh-muc/laptop/tu-20-25-trieu', text: 'Từ 20 - 25 triệu' },
      { href: '/danh-muc/laptop/tu-25-30-trieu', text: 'Từ 25 - 30 triệu' },
    ],
  },
  {
    icon: <AudioIcon className="w-6 h-6" />,
    links: [{ href: '/danh-muc/am-thanh', text: 'Âm thanh' }],
    isMultiple: false,
    subMenu: [
      { href: '/danh-muc/am-thanh/loa-bluetooth', text: 'Loa Bluetooth' },
      { href: '/danh-muc/am-thanh/tai-nghe', text: 'Tai nghe' },
    ],
  },
  {
    icon: <WatchCameraIcon className="w-6 h-6" />,
    links: [{ href: '/danh-muc/dong-ho', text: 'Đồng hồ' }, { href: '/danh-muc/camera', text: 'Camera' }],
    isMultiple: true,
    subMenu: [
      { href: '/danh-muc/dong-ho/thong-minh', text: 'Đồng hồ thông minh' },
      { href: '/danh-muc/dong-ho/thoi-trang', text: 'Đồng hồ thời trang' },
    ],
  },
  {
    icon: <HomeApplianceIcon className="w-6 h-6" />,
    links: [{ href: '/danh-muc/do-gia-dung', text: 'Đồ gia dụng' }],
    isMultiple: true,
    subMenu: [
      { href: '/danh-muc/do-gia-dung/may-loc-khong-khi', text: 'Máy lọc không khí' },
      { href: '/danh-muc/do-gia-dung/may-hut-bui', text: 'Máy hút bụi' },
    ],
  },
  {
    icon: <AccessoryIcon className="w-6 h-6" />,
    links: [{ href: '/danh-muc/phu-kien', text: 'Phụ kiện' }],
    isMultiple: false,
    subMenu: [
      { href: '/danh-muc/phu-kien/op-lung', text: 'Ốp lưng' },
      { href: '/danh-muc/phu-kien/sac-du-phong', text: 'Sạc dự phòng' },
    ],
  },
  {
    icon: <TvIcon className="w-6 h-6" />,
    links: [{ href: '/danh-muc/tivi', text: 'Tivi' }],
    isMultiple: false,
    subMenu: [
      { href: '/danh-muc/tivi/led', text: 'Tivi LED' },
      { href: '/danh-muc/tivi/qled', text: 'Tivi QLED' },
    ],
  },
  {
    icon: <TradeInIcon className="w-6 h-6" />,
    links: [{ href: '/danh-muc/thu-cu-doi-moi', text: 'Thu cũ đổi mới' }],
    isMultiple: false,
    subMenu: [],
  },
  {
    icon: <RefurbishedIcon className="w-6 h-6" />,
    links: [{ href: '/danh-muc/hang-cu', text: 'Hàng cũ' }],
    isMultiple: false,
    subMenu: [],
  },
  {
    icon: <PromotionIcon className="w-6 h-6" />,
    links: [{ href: '/danh-muc/khuyen-mai', text: 'Khuyến mãi' }],
    isMultiple: false,
    subMenu: [],
  },
  {
    icon: <TechNewsIcon className="w-6 h-6" />,
    links: [{ href: '/danh-muc/tin-cong-nghe', text: 'Tin công nghệ' }],
    isMultiple: false,
    subMenu: [],
  },
];

interface MenuBannerProps {
  isOverlay?: boolean;
  onClose?: () => void;
}

export function MenuBanner({ isOverlay = false, onClose }: MenuBannerProps) {
  return (
    <div
      className={`${isOverlay ? 'fixed inset-0 bg-black/50 z-50' : ''}`}
      onClick={isOverlay ? onClose : undefined}
    >
      <div
        className={`${isOverlay ? 'w-[225px] max-w-[1200px] px-4 ml-[65px] md:ml-[45px] pt-[8px] mt-18' : 'md:block w-[225px] h-full'} rounded-2xl shadow-[0_1px_2px_0_rgba(60,64,67,0.1),0_2px_6px_2px_rgba(60,64,67,0.15)] overflow-hidden bg-white`}
        onClick={(e) => isOverlay && e.stopPropagation()}
      >
        <div className="menu-wrapper overflow-y-auto scrollbar-none p-2">
          <div className="menu-tree w-full rounded-lg p-0">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="label-menu-tree px-2 py-0.5 group hover:scale-105 hover:opacity-70 rounded-md relative overflow-hidden"
              >
                <Link
                  href={item.links[0].href}
                  className="label-item flex items-center justify-between min-h-[31.3px] cursor-pointer text-gray-800 no-underline"
                  onClick={onClose}
                >
                  <div className="right-content flex items-center gap-2">
                    {item.icon}
                    <span className="single-link text-sm font-medium">{item.links[0].text}</span>
                  </div>
                  <div className="icon-right w-[7.5px]">
                    <ChevronRightIcon className="w-3.5 h-3.5 text-gray-500" />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}