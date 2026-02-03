'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Banner {
  src: string;
  alt: string;
  href: string;
}

interface BannerCardProps {
  banner: Banner;
}

export function BannerCard({ banner }: BannerCardProps) {
  return (
    <Link
      href={banner.href}
      className="block w-full overflow-hidden rounded-[10px] shadow-md"
    >
      <Image
        src={banner.src}
        alt={banner.alt}
        width={690}
        height={300}
        loading="lazy"
        className="w-full h-auto rounded-[10px]"
      />
    </Link>
  );
}
