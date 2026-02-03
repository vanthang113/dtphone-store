'use client';

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
        <Link
          href="#"
          className="text-lg sm:text-xl md:text-2xl lg:text-[22px] uppercase text-gray-700"
        >
          Ưu đãi thanh toán
        </Link>
      </div>

      {/* GIỮ NGUYÊN flex + gap theo yêu cầu */}
      <div className="flex flex-wrap gap-1 sm:gap-2 md:gap-3 w-full">
        {paymentBanners.map((banner, index) => (
          <div
            key={index}
            className="
              min-w-0
              flex-shrink-0

              /* Mobile: gap-1 = 0.25rem => trừ 0.125rem */
              basis-[calc(50%-0.125rem)]

              /* Sm: gap-2 = 0.5rem => trừ 0.25rem */
              sm:basis-[calc(50%-0.25rem)]

              /* Md: gap-3 = 0.75rem => trừ 0.375rem */
              md:basis-[calc(50%-0.375rem)]

              /* Lg: 4 cột, gap-3 = 0.75rem
                 total gap = 3 * 0.75rem = 2.25rem
                 chia cho 4 => 0.5625rem
                 => 25% - 0.5625rem
              */
              lg:basis-[calc(25%-0.5625rem)]
            "
          >
            <BannerCard banner={banner} />
          </div>
        ))}
      </div>
    </div>
  );
}
