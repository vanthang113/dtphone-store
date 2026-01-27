'use client'

import React from 'react';

interface UserItemProps {
  icon: React.ReactNode;
  name: string;
}

export function UserItem({ icon, name }: UserItemProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center bg-white/20 text-white text-[11px] sm:text-[13px] rounded-xl px-2 py-1 cursor-pointer shrink-0">
      {icon}
      <span>{name}</span>
    </div>
  );
}