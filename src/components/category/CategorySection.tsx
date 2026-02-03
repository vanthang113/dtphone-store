'use client';

import React from 'react';
import Link from 'next/link';
import { CategoryCard } from './CategoryCard';

interface CategoryItem {
  title: string;
  imageUrl: string;
  link: string;
}

interface CategorySectionProps {
  categories: CategoryItem[];
  relatedTags: string[];
  title: string; // Tiêu đề động
  categoryLink: string; // Liên kết động cho tiêu đề và "Xem tất cả"
  hideHeader?: boolean; // Prop để ẩn/hiện tiêu đề, mặc định là false
}

export function CategorySection({ categories, relatedTags, title, categoryLink, hideHeader = false }: CategorySectionProps) {
  return (
    <div className="mt-3 sm:mt-4 md:mt-5">
      {!hideHeader && (
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-950 box-shadow-sm">
            <Link href={categoryLink}>{title}</Link>
          </h2>
          <Link
            href={categoryLink}
            className="text-[12px] sm:text-[13px] font-normal text-[#111] hover:text-[#00868B] hover:underline hover:font-bold transition-all"
          >
            Xem tất cả
          </Link>
        </div>
      )}
      {/* Hiển thị các tag liên quan */}
      <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2 mb-2 sm:mb-2.5">
        {relatedTags.map((tag, index) => (
          <Link
            key={index}
            href={`/tags/${tag.toLowerCase().replace(' ', '-')}`}
            className="bg-gray-100 border border-gray-200 text-gray-600 text-[11px] sm:text-xs md:text-sm font-medium px-1 sm:px-1.5 md:px-2 py-0.5 sm:py-1 rounded-lg transition-all duration-200"
          >
            {tag}
          </Link>
        ))}
      </div>
      <div className="flex flex-wrap gap-6 sm:gap-2 md:gap-3 w-full px-1 sm:px-2 md:px-0">
        {categories.map((item, index) => (
          <CategoryCard key={index} category={item} index={index} />
        ))}
      </div>
    </div>
  );
}