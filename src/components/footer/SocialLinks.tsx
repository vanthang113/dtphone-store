'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface SocialLink {
  src: string;
  alt: string;
  href: string;
}

interface SocialLinksProps {
  links: SocialLink[];
}

export function SocialLinks({ links }: SocialLinksProps) {
  return (
    <div className="flex flex-wrap mb-3">
      {links.map((social, index) => (
        <div key={index} className="pr-2.5 mb-2">
          <Link href={social.href} target="_blank">
            <Image src={social.src} alt={social.alt} width={50} height={32} className="object-contain" />
          </Link>
        </div>
      ))}
    </div>
  );
}