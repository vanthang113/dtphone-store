'use client'

import React from 'react';
import Link from 'next/link';
import { BannerCard } from './BannerCard';

interface Banner {
  href: string;
  src: string;
  alt: string;
}

interface PaymentBannerSectionProps {
  paymentBanners: Banner[];
}

export function PaymentBannerSection({ paymentBanners }: PaymentBannerSectionProps) {
  return (
    <div className="mt-3 sm:mt-4 md:mt-5">
      <div className="mb-2 sm:mb-2.5">
        <Link href="#" className="text-lg sm:text-xl md:text-2xl lg:text-[22px] uppercase text-gray-700">
          Ưu đãi thanh toán
        </Link>
      </div>

      <div className="flex flex-wrap gap-1 sm:gap-2 md:gap-3">
        {paymentBanners.map((banner, index) => (
          <BannerCard
            key={index}
            banner={banner}
          />
        ))}
      </div>
    </div>
  );
}