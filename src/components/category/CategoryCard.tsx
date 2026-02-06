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
        w-[100px] sm:w-[110px] md:w-[122px]
        ${index >= 8 ? 'hidden sm:block' : ''}
      `}
    >
      <Link
        href={category.link}
        className="block w-full min-h-[105px] sm:min-h-[115px] md:min-h-[125px] rounded-[10px] bg-no-repeat shadow-md hover:scale-[1.01] hover:-translate-y-[3px] hover:shadow-lg transition-all relative overflow-hidden pt-3 sm:pt-4"
        style={{
          backgroundImage: `url(${category.imageUrl})`,
          backgroundColor: '#f7f7f7',
          backgroundSize: '60px 60px',
          backgroundPosition: 'center 8px',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <span className="block text-black text-[10px] sm:text-xs font-semibold max-w-[94px] sm:max-w-[104px] md:max-w-[114px] px-1.5 sm:px-2 whitespace-nowrap overflow-hidden text-ellipsis z-[1] absolute bottom-0 left-1/2 transform -translate-x-1/2 pb-1.5 sm:pb-2">
          {category.title}
        </span>
      </Link>
    </div>
  );
}