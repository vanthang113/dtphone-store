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
    <div className="mt-5">
      <div className="mb-2">
        <Link href="#" className="text-[22px] uppercase text-gray-700">
          Ưu đãi thanh toán
        </Link>
      </div>

      <div className="flex flex-wrap">
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