"use client";

import Link from "next/link";
import Image from "next/image";
import { MenuItem } from "@/components/header/MenuItem";
import { LocationItem } from "@/components/header/LocationItem";
import { SearchBar } from "@/components/header/SearchBar";
import { PhoneItem } from "@/components/header/PhoneItem";
import { StoreItem } from "@/components/header/StoreItem";
import { DeliveryTrackingItem } from "@/components/header/DeliveryTrackingItem";
import { CartItem } from "@/components/header/CartItem";
import { UserItem } from "@/components/header/UserItem";
import { MenuBanner } from "@/components/layout/MenuBanner";
import {
  MenuIcon,
  LocationIcon,
  PhoneIcon,
  StoreIcon,
  DeliveryTrackingIcon,
  CartIcon,
  UserIcon,
} from "@/components/icons/HeaderIcons";
import { useEffect, useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    try {
      const rawUser = localStorage.getItem("user");
      if (rawUser) {
        try {
          const parsed: unknown = JSON.parse(rawUser);
          const name =
            typeof parsed === "object" && parsed !== null && "name" in parsed
              ? String((parsed as { name?: unknown }).name ?? "")
              : String(parsed);

          setUserName(name || rawUser);
          return;
        } catch {
          setUserName(rawUser);
          return;
        }
      }

      const token =
        localStorage.getItem("access_token") || localStorage.getItem("token");
      if (token) {
        setUserName("Tài khoản");
        return;
      }

      setUserName(null);
    } catch {
      setUserName(null);
    }
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#008B8B] shadow-md">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-2 sm:px-4 h-[64px]">
        {/* Logo */}
        <Link
          href="/"
          className="
            flex items-center shrink-0 mr-2
            h-[64px]
            overflow-hidden
            transition-all duration-200 ease-out
            hover:scale-105 hover:drop-shadow-lg
            active:scale-95
          "
        >
          <Image
            src="/images/logo-dtphone-store-pink2.png"
            alt="Logo dtphone"
            width={220}
            height={65}
            priority
            // ✅ Mobile to hơn một chút; Desktop giữ 220px
            className="block h-auto w-[clamp(140px,34vw,220px)]"
            sizes="(max-width: 640px) 34vw, 220px"
          />
        </Link>

        {/* ✅ Desktop/Tablet: full menu */}
        <div className="hidden md:flex items-center gap-x-1 sm:gap-x-2 flex-nowrap overflow-x-auto flex-1 justify-end min-w-0">
          <MenuItem
            icon={<MenuIcon className="w-6 h-6" />}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <span>Danh mục</span>
          </MenuItem>

          <LocationItem
            icon={<LocationIcon className="w-6 h-6" />}
            location="Hồ Chí Minh"
          />

          <SearchBar />

          <PhoneItem
            icon={<PhoneIcon className="w-6 h-6" />}
            number="1800.2097"
          />

          <StoreItem
            icon={<StoreIcon className="w-6 h-6" />}
            text="Cửa hàng<br />gần bạn"
          />

          <DeliveryTrackingItem
            icon={<DeliveryTrackingIcon className="w-10 h-10" />}
            text="Tra cứu<br />đơn hàng"
          />

          <CartItem icon={<CartIcon className="w-6 h-6" />} text="Giỏ<br />hàng" />

          {userName ? (
            <Link href="/information">
              <UserItem icon={<UserIcon className="w-6 h-6" />} name={userName} />
            </Link>
          ) : (
            <Link href="/login">
              <button className="bg-white text-[#00868B] rounded-xl px-4 py-2 text-[16px] font-medium ml-2 flex items-center justify-center whitespace-nowrap leading-none">
                Đăng nhập
              </button>
            </Link>
          )}
        </div>

        {/* ✅ Mobile: Logo + Search (thu lại) + Giỏ + Đăng nhập */}
        <div className="flex md:hidden items-center gap-2 flex-1 min-w-0">
          {/* SearchBar thu lại để chừa chỗ giỏ */}
          <div className="flex-1 min-w-0 max-w-[52vw]">
            <SearchBar />
          </div>

          {/* Giỏ hàng (mobile) */}
          <div className="shrink-0">
            <CartItem icon={<CartIcon className="w-6 h-6" />} text="" />
          </div>

          {/* Đăng nhập/Tài khoản */}
          {userName ? (
            <Link href="/information" className="shrink-0">
              <button className="bg-white text-[#00868B] rounded-xl px-3 py-2 text-[14px] font-medium whitespace-nowrap leading-none">
                {userName}
              </button>
            </Link>
          ) : (
            <Link href="/login" className="shrink-0">
              <button className="bg-white text-[#00868B] rounded-xl px-3 py-2 text-[14px] font-medium whitespace-nowrap leading-none">
                Đăng nhập
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Menu Banner as Overlay (chỉ mở khi desktop dùng danh mục) */}
      {isMenuOpen && (
        <MenuBanner isOverlay onClose={() => setIsMenuOpen(false)} />
      )}
    </header>
  );
};

export default Header;
