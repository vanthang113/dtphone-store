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
      className="flex items-center gap-2 bg-white/20 text-white text-[13px] rounded-xl px-2 py-2.5 shrink-0"
      onClick={(e) => { e.preventDefault(); onClick?.(); }}
    >
      {icon}
      {children}
    </Link>
  );
}