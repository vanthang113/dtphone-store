'use client'

import React from 'next/link';
import Link from 'next/link';

interface CartItemProps {
  icon: React.ReactNode;
  text: string;
}

export function CartItem({ icon, text }: CartItemProps) {
  return (
    <Link
      href="/cart"
      className="flex items-center gap-2 text-white text-[13px] px-2 py-2 rounded-xl hover:bg-white/20 transition shrink-0"
    >
      {icon}
      <span className="leading-tight text-left" dangerouslySetInnerHTML={{ __html: text }} />
    </Link>
  );
}