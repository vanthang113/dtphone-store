'use client'

import React from 'react';

interface LocationItemProps {
  icon: React.ReactNode;
  location: string;
}

export function LocationItem({ icon, location }: LocationItemProps) {
  return (
    <div className="hidden xl:flex items-center gap-2 text-white text-[13px] px-2 py-2 rounded-xl hover:bg-white/20 transition cursor-pointer shrink-0">
      {icon}
      <div className="text-left leading-tight">
        <p className="text-[11px]">Xem giá tại</p>
        <p className="font-medium text-[13px]">{location}</p>
      </div>
    </div>
  );
}