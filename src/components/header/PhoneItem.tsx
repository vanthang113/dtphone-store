'use client'

import React from 'next/link';

interface PhoneItemProps {
  icon: React.ReactNode;
  number: string;
}

export function PhoneItem({ icon, number }: PhoneItemProps) {
  return (
    <div className="hidden xl:flex items-center gap-2 text-white text-[13px] px-2 py-2 rounded-xl hover:bg-white/20 transition cursor-pointer shrink-0">
      {icon}
      <div className="leading-tight">
        <p className="text-xs">Gọi mua hàng</p>
        <p className="font-medium text-[13px]">{number}</p>
      </div>
    </div> 
  );
}