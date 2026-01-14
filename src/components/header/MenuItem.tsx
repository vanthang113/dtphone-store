'use client'

import React from 'react';
import Link from 'next/link';

interface MenuItemProps {
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
}

export function MenuItem({ icon, children, onClick }: MenuItemProps) {
  return (
    <Link
      href="#"
      className="hidden xl:flex items-center gap-2 text-white text-[13px] px-2 py-2 rounded-xl hover:bg-white/20 transition cursor-pointer shrink-0"
      onClick={(e) => { e.preventDefault(); onClick?.(); }}
    >
      {icon}
      {children}
    </Link>
  );
}