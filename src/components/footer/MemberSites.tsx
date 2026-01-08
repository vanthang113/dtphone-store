'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface MemberSite {
  name: string;
  src: string;
  href: string;
}

interface MemberSitesProps {
  sites: MemberSite[];
}

export function MemberSites({ sites }: MemberSitesProps) {
  return (
    <div className="flex flex-wrap">
      {sites.map((site, index) => (
        <div key={index} className="mb-2 w-full">
          <p className="text-xs text-gray-600 mb-1">{site.name}</p>
          <Link href={site.href} target="_blank">
            <Image src={site.src} alt={site.name} width={100} height={50} className="object-contain" />
          </Link>
        </div>
      ))}
    </div>
  );
}