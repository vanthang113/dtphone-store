'use client';

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
  formatPrice: (price: number) => string; // giữ lại để tương thích nơi gọi
  hideHeader?: boolean;
}

export function ProductListSection({
  title,
  categoryLink,
  relatedTags,
  products,
  hideHeader = false,
}: ProductListSectionProps) {
  return (
    <div className="mt-3 sm:mt-4 md:mt-5">
      {!hideHeader && (
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-950">
            <a href={categoryLink}>{title}</a>
          </h2>
          <a
            href={categoryLink}
            className="text-[12px] sm:text-[13px] font-normal text-[#111] hover:text-[#00868B] hover:underline hover:font-bold transition-all"
          >
            Xem tất cả
          </a>
        </div>
      )}

      <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2 mb-2 sm:mb-2.5">
        {relatedTags.map((tag, index) => (
          <a
            key={index}
            href={`/tags/${tag.toLowerCase().replace(' ', '-')}`}
            className="bg-gray-100 border border-gray-200 text-gray-600 text-[11px] sm:text-xs md:text-sm font-medium px-1 sm:px-1.5 md:px-2 py-0.5 sm:py-1 rounded-lg transition-all duration-200"
          >
            {tag}
          </a>
        ))}
      </div>

      <div className="relative overflow-hidden mx-auto max-w-[1160px] w-full">
        <div className="flex gap-2 sm:gap-3 md:gap-5 overflow-x-auto snap-x snap-mandatory py-2 px-2 sm:px-3">
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
