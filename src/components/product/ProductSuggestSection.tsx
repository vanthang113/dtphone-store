'use client';

import { useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '../icons/BannerMenuIcon';
import { CustomRadialIcon } from '../icons/MainIcon';
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

interface ProductSuggestSectionProps {
  products: Product[];
  formatPrice: (price: number) => string;
}

export function ProductSuggestSection({ products, formatPrice: _formatPrice }: ProductSuggestSectionProps) {
  const suggestRef = useRef<HTMLDivElement>(null);
  const ITEM_WIDTH = 224.8 + 8;

  const scrollSuggest = (direction: 'left' | 'right') => {
    if (suggestRef.current) {
      const offset = direction === 'left' ? -ITEM_WIDTH : ITEM_WIDTH;
      suggestRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="my-4 rounded-2xl bg-gradient-to-r from-pink-200 to-blue-200 p-2">
      {/* Tiêu đề */}
      <div className="flex items-center mb-2">
        <CustomRadialIcon className="w-10 h-10" />
        <span className="text-xl sm:text-2xl font-semibold text-blue-950 ml-2">
          GỢI Ý CHO BẠN
        </span>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="relative group mx-auto max-w-[1156px] w-full px-2">
        {/* Nút trái */}
        <button
          onClick={() => scrollSuggest('left')}
          className="hidden group-hover:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 shadow-md rounded-full"
        >
          <ChevronLeftIcon className="w-6 h-6 text-gray-600" />
        </button>

        {/* Danh sách sản phẩm */}
        <div ref={suggestRef} className="overflow-hidden">
          <div className="grid grid-flow-col auto-cols-[minmax(224.8px,_1fr)] gap-2 snap-x snap-mandatory">
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

        {/* Nút phải */}
        <button
          onClick={() => scrollSuggest('right')}
          className="hidden group-hover:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 shadow-md rounded-full"
        >
          <ChevronRightIcon className="w-6 h-6 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
