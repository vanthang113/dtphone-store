'use client';

import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons/BannerMenuIcon';
import { Button } from '@tremor/react';
import { cn } from '@/lib/utils';

type ProductImageGalleryProps = {
  images: { src: string; alt: string }[];
  currentImage: { src: string; alt: string; index?: number };
  onPrevClick: () => void;
  onNextClick: () => void;
  onImageClick: (index: number) => void;
};

export default function ProductImageGallery({
  images,
  currentImage,
  onPrevClick,
  onNextClick,
  onImageClick,
}: ProductImageGalleryProps) {
  return (
    <div className="mt-4 sm:mt-5 md:mt-6">
      <div className="relative w-full h-[250px] sm:h-[300px] md:h-96 bg-white rounded-lg overflow-hidden group flex items-center justify-center">
        <Image
          src={currentImage.src}
          alt={currentImage.alt}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 z-10 flex items-center justify-between px-2 sm:px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            className="bg-black/40 hover:bg-black/60 text-white p-1.5 sm:p-2 rounded-full cursor-pointer"
            onClick={onPrevClick}
          >
            <ChevronLeftIcon className="w-5 sm:w-7 h-5 sm:h-7" />
          </Button>
          <button
            className="bg-black/40 hover:bg-black/60 text-white p-1.5 sm:p-2 rounded-full cursor-pointer"
            onClick={onNextClick}
          >
            <ChevronRightIcon className="w-5 sm:w-7 h-5 sm:h-7" />
          </button>
        </div>
      </div>

      <div className="mt-6 flex space-x-2 overflow-x-auto py-1">
        {images.map((image, index) => (
          <Button
            key={index}
            className={cn(
              'relative w-16 h-16 bg-white rounded-lg overflow-hidden shrink-0 border transition-all',
              currentImage.index === index && 'ring-2 ring-[#00868B] border-[#00868B]'
            )}
            onClick={() => onImageClick(index)}
          >
            <Image src={image.src} alt={image.alt} fill className="object-cover" sizes="64px" />
          </Button>
        ))}
      </div>
    </div>
  );
}
