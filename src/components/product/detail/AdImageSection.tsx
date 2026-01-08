import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

export default function AdImageSection() {
  return (
    <div className="mt-4">
      <div className="relative w-full h-[70px] bg-gray-200 rounded-lg overflow-hidden group">
        <Image
          src="/images/top_banner.png"
          alt="Hình sản phẩm iPhone 14 Pro Max"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 z-10 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button className="bg-black/40 hover:bg-black/60 text-white p-1 rounded-full cursor-pointer">
            <ChevronLeftIcon className="w-7 h-7" />
          </button>
          <button className="bg-black/40 hover:bg-black/60 text-white p-1 rounded-full cursor-pointer">
            <ChevronRightIcon className="w-7 h-7" />
          </button>
        </div>
      </div>
    </div>
  );
}