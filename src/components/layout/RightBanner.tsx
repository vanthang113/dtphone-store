'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Banner {
  src: string;
  alt: string;
  href: string;
}

interface RightBannerProps {
  banners: Banner[];
}

export function RightBanner({ banners }: RightBannerProps) {
  return (
    <div className="block-top-home__right-banner w-auto hidden lg:block h-full">
      <div className="right-banner h-full max-w-[280px] w-full">
        {banners.map((banner, index) => (
          <Link
            key={index}
            href="/special-event"
            className="right-banner__item rounded-lg shadow-[0_1px_2px_0_rgba(60,64,67,0.1),0_2px_6px_2px_rgba(60,64,67,0.15)] mb-[15.5px] min-h-[calc(33.33333%-10px)] overflow-hidden flex"
          >
            <Image
              src={banner.src}
              width={690}
              height={300}
              alt={banner.alt}
              className="right-banner__img object-cover"
              loading="lazy"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}