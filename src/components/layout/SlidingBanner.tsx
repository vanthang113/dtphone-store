'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '../icons/BannerMenuIcon';

interface Slide {
  src: string;
  alt: string;
  href: string;
}

interface SlideTitle {
  label: string;
  active: boolean;
}

interface SlidingBannerProps {
  slides: Slide[];
  slideTitles: SlideTitle[];
}

export function SlidingBanner({ slides, slideTitles: initialSlideTitles }: SlidingBannerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideTitles, setSlideTitles] = useState<SlideTitle[]>(
    initialSlideTitles.map((title, index) => ({
      ...title,
      active: index === 0, 
    }))
  );

  // Hàm xử lý chuyển slide tiếp
  const handleNext = () => {
    const nextSlide = (currentSlide + 1) % slides.length; 
    setCurrentSlide(nextSlide);
    updateActiveTitle(nextSlide);
  };

  // Hàm xử lý chuyển slide trước
  const handlePrev = () => {
    const prevSlide = (currentSlide - 1 + slides.length) % slides.length; 
    setCurrentSlide(prevSlide);
    updateActiveTitle(prevSlide);
  };

  // Hàm xử lý khi click 
  const handleLabelClick = (index: number) => {
    setCurrentSlide(index);
    updateActiveTitle(index);
  };

  // Cập nhật trạng thái active
  const updateActiveTitle = (index: number) => {
    setSlideTitles((prev) =>
      prev.map((title, i) => ({
        ...title,
        active: i === index,
      }))
    );
  };

  return (
    <div className="block-top-home__sliding-banner rounded-b-2xl shadow-[0_1px_2px_0_rgba(60,64,67,0.1),0_2px_6px_2px_rgba(60,64,67,0.15)] overflow-hidden flex-1 h-full">
      <div className="w-full h-[80%] relative overflow-hidden">
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full h-full flex items-center justify-center bg-white group relative"
            >
              <div className="absolute inset-0 z-10 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={handlePrev}
                  className="bg-black/40 hover:bg-black/60 text-white p-2 rounded-full cursor-pointer"
                >
                  <ChevronLeftIcon className="w-7 h-7" />
                </button>
                <button
                  onClick={handleNext}
                  className="bg-black/40 hover:bg-black/60 text-white p-2 rounded-full cursor-pointer"
                >
                  <ChevronRightIcon className="w-7 h-7" />
                </button>
              </div>
              <Link href={slide.href} className="w-full h-full flex items-center">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  width={690}
                  height={300}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full h-[20%] bg-white flex relative">
        {slideTitles.map((item, index) => (
          <div
            key={index}
            className={`flex-1 flex items-center justify-center hover:bg-red-50 text-gray-800 text-xs font-medium text-center leading-5 cursor-pointer overflow-hidden relative ${
              item.active ? 'bg-red-50' : ''
            }`}
            onClick={() => handleLabelClick(index)}
          >
            {item.label}
            {item.active && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#00777B] rounded-full z-10" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}