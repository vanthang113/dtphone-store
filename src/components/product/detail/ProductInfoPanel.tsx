'use client';

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils"; // Dùng nếu bạn đang dùng shadcn/ui hoặc có sẵn hàm cn
import { Button } from '@tremor/react';

type ColorOption = {
  name: string;
  price: string;
  imageSrc: string;
  imageAlt: string;
};

type ProductInfoPanelProps = {
  price: string;
  originalPrice: string;
  versions: string[];
  colors: ColorOption[];
  onVersionClick?: (version: string) => void;
  onColorClick?: (color: string) => void;
};

export default function ProductInfoPanel({
  price,
  originalPrice,
  versions,
  colors,
  onVersionClick,
  onColorClick,
}: ProductInfoPanelProps) {
  const [selection, setSelection] = useState<{ color: string | null; version: string | null }>({
    color: null,
    version: null,
  })


  return (
    <div className="space-y-6">
      {/* Product Price */}
      <div className="p-4 bg-blue-50 border border-blue-800 rounded-2xl w-fit">
        <h3 className="text-[#00868B] font-semibold mb-2">Giá sản phẩm</h3>
        <p className="text-2xl font-bold text-red-600">
          {price} <span className="text-gray-500 line-through">{originalPrice}</span>
        </p>
      </div>

      {/* Product Versions */}
      <div>
        <h3 className="text-[#00868B] font-semibold mb-2">Phiên bản</h3>
        <div className="flex space-x-3">
          {versions.map((version, index) => (
            <Button
              key={index}
              className={cn(
                "bg-[#00868B] w-[100px] h-[55px] border rounded-lg text-center hover:shadow-md transition-shadow cursor-pointer",
                selection.version === version && "border-red-400 ring-2 ring-red-300"
              )}

              onClick={() => {
                onVersionClick?.(version);
                setSelection((prev) => ({ ...prev, version }));
              }}
            >
              {version}
            </Button>
          ))}
        </div>
      </div>

      {/* Product Colors */}
      <div>
        <h3 className="text-[#00868B] font-semibold mb-2">Màu sắc</h3>
        <div className="flex flex-wrap gap-2">
          {colors.map((color, index) => (
            <Card
              key={index}
              className={cn(
                "flex items-center p-2 border rounded-lg min-w-[250px] hover:shadow-md transition-shadow cursor-pointer",
                selection.color === color.name && "border-red-400 ring-2 ring-red-300"
              )}
              onClick={() => {
                onColorClick?.(color.name);
                setSelection((prev) => ({ ...prev, color: color.name }));
              }}
            >
              <div className="flex flex-col">
                <span className="text-base font-bold text-black">{color.name}</span>
                <span className="text-lg text-black">{color.price}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
