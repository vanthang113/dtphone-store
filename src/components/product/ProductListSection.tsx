'use client';

import React from 'react';
import ProductCard from './ProductCard';

interface Product {
  id: string;
  name: string;
  image: string;
  alt: string;
  price: number;
  originalPrice?: number;
  sNullPrice?: number;
  sStudentDiscount?: number;
  promotion?: string;
  rating: number;
  discount?: number;
}

interface ProductListSectionProps {
  title: string;
  categoryLink: string;
  relatedTags: string[];
  products: Product[];
  formatPrice: (price: number) => string;
  hideHeader?: boolean;
}

export function ProductListSection({ title, categoryLink, relatedTags, products, formatPrice, hideHeader = false }: ProductListSectionProps) {
  return (
    <div className="mt-5">
      {!hideHeader && (
        <div className="flex justify-between items-center mb-2.5">
          <h2 className="text-xl sm:text-2xl font-semibold text-blue-950">
            <a href={categoryLink}>{title}</a>
          </h2>
          <a
            href={categoryLink}
            className="text-[13px] font-normal text-[#111] hover:text-[#d70018] hover:underline hover:font-bold transition-all"
          >
            Xem tất cả
          </a>
        </div>
      )}
      {/* Hiển thị các tag liên quan */}
      <div className="flex flex-wrap gap-1 sm:gap-2 mb-2.5">
        {relatedTags.map((tag, index) => (
          <a
            key={index}
            href={`/tags/${tag.toLowerCase().replace(' ', '-')}`}
            className="bg-gray-100 border border-gray-200 text-gray-600 text-xs sm:text-sm font-medium px-1.5 sm:px-2 py-1 rounded-lg transition-all duration-200"
          >
            {tag}
          </a>
        ))}
      </div>
      {/* Danh sách sản phẩm */}
      <div className="relative overflow-hidden mx-auto max-w-[1160px] w-full">
        <div className="inline-grid grid-flow-col gap-5 md:gap-3 snap-x snap-mandatory py-2 justify-center">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              image={product.image}
              rating={product.rating}
              discount={product.discount}
              promotion={product.promotion}
            />
          ))}
        </div>
      </div>
    </div>
  );
}