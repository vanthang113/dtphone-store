'use client'

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
      className="mb-2 mr-1.5 inline-block overflow-hidden rounded-[10px] shadow-md w-[calc(25%-7.5px)] max-[1024px]:w-[calc(49%-5px)] max-[768px]:mr-[7px]"
    >
      <Image
        src={banner.src}
        alt={banner.alt}
        width={690}
        height={300}
        loading="lazy"
        className="rounded-[10px] w-full h-auto"
      />
    </Link>
  );
}