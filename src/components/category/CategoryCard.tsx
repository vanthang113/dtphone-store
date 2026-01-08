'use client'

import React from 'react';
import Link from 'next/link';

export interface CategoryItem {
  title: string;
  imageUrl: string;
  link: string;
}

interface CategoryCardProps {
  category: CategoryItem;
  index: number;
  hideHeader?: boolean;
}

export function CategoryCard({ category, index }: CategoryCardProps) {
  return (
    <div
      className={`
        w-[122px]
        ${index >= 8 ? 'hidden sm:block' : ''}
      `}
    >
      <Link
        href={category.link}
        className="block w-full min-h-[125px] rounded-[10px] bg-no-repeat shadow-md hover:scale-[1.01] hover:-translate-y-[3px] hover:shadow-lg transition-all relative overflow-hidden pt-4" // Thêm padding-top để tạo khoảng cách
        style={{
          backgroundImage: `url(${category.imageUrl})`,
          backgroundColor: '#f7f7f7',
          backgroundSize: '80px 80px',
          backgroundPosition: 'center 10px', // Điều chỉnh vị trí ảnh, đẩy xuống 20px từ top
          backgroundRepeat: 'no-repeat',
        }}
      >
        <span className="block text-xs text-black font-semibold max-w-[114px] px-2 whitespace-nowrap overflow-hidden text-ellipsis z-[1] absolute bottom-0 left-1/2 transform -translate-x-1/2 pb-2">
          {category.title}
        </span>
      </Link>
    </div>
  );
}