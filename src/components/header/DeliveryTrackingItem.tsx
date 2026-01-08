'use client'

import React from 'next/link';
import Link from 'next/link';

interface DeliveryTrackingItemProps {
  icon: React.ReactNode;
  text: string;
}

export function DeliveryTrackingItem({ icon, text }: DeliveryTrackingItemProps) {
  return (
    <Link
      href="#"
      className="hidden md:flex items-center gap-2 text-white text-[13px] px-2 py-2 rounded-xl hover:bg-white/20 transition shrink-0"
    >
      {icon}
      <span className="leading-tight text-left" dangerouslySetInnerHTML={{ __html: text }} />
    </Link>
  );
}