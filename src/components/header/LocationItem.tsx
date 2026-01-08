'use client'

import React from 'react';

interface LocationItemProps {
  icon: React.ReactNode;
  location: string;
}

export function LocationItem({ icon, location }: LocationItemProps) {
  return (
    <div className="hidden lg:flex items-center gap-2 bg-white/20 text-white text-[13px] rounded-xl px-2 py-2 cursor-pointer shrink-0">
      {icon}
      <div className="text-left leading-tight">
        <p className="text-[11px]">Xem giá tại</p>
        <p className="font-medium text-[13px]">{location}</p>
      </div>
    </div>
  );
}