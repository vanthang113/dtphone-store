import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";

type CheckedState = boolean | "indeterminate";

interface ProductItemProps {
  id: string;
  name: string;
  price: string;
  originalPrice: string;
  image: string;
  quantity: number;
  isSelected: boolean;
  onSelectionChange: (checked: CheckedState) => void;
  onQuantityChange: (change: number) => void;
  onDelete: () => void;
}

const ProductItem: React.FC<ProductItemProps> = ({
  id,
  name,
  price,
  originalPrice,
  image,
  quantity,
  isSelected,
  onSelectionChange,
  onQuantityChange,
  onDelete,
}) => {
  return (
    <Card className="mb-4 w-full min-w-0" data-product-id={id}>
      <CardContent className="p-4 min-w-0">
        <div className="flex items-start w-full min-w-0 overflow-hidden">
          {/* Checkbox + image */}
          <div className="flex items-center shrink-0">
            <Checkbox
              checked={isSelected}
              onCheckedChange={onSelectionChange}
              className="mr-2"
            />

            <div className="ml-2 w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                {image ? (
                  <img
                    src={image}
                    alt={name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-200 rounded-full relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 bg-gray-300 rounded-full" />
                    </div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-6 bg-gray-400 rounded-t" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 ml-4 min-w-0">
            {/* Title + Trash */}
            <div className="flex justify-between items-start gap-2 min-w-0">
              <h3 className="text-gray-900 text-sm md:text-base font-semibold mb-1 min-w-0 truncate">
                {name}
              </h3>

              <Button
                variant="ghost"
                size="sm"
                onClick={onDelete}
                className="text-gray-400 hover:text-red-500 p-1 shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            {/* ✅ Mobile: 2 hàng (giá -> qty) | Desktop: 1 hàng */}
            <div className="mt-2 min-w-0">
              {/* Hàng giá */}
              <div className="flex items-center gap-2 min-w-0">
                <div className="text-red-600 text-sm md:text-base font-semibold whitespace-nowrap">
                  {price}
                </div>
                <div className="text-gray-400 line-through text-xs md:text-sm font-semibold whitespace-nowrap">
                  {originalPrice}
                </div>
              </div>

              {/* Hàng qty: mobile tách riêng để không đè nhau */}
              <div className="mt-2 flex justify-end md:mt-0 md:justify-end">
                <div className="flex items-center gap-2 shrink-0 md:gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="w-7 h-7 p-0 md:w-8 md:h-8"
                  >
                    <Minus className="w-3 h-3" />
                  </Button>

                  <span className="text-sm md:text-base font-normal min-w-[28px] md:min-w-[40px] text-center">
                    {quantity}
                  </span>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onQuantityChange(1)}
                    className="w-7 h-7 p-0 md:w-8 md:h-8"
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              {/* ✅ Desktop (md+) muốn giống trước: giá + qty cùng 1 hàng
                  -> Ta không cần thêm block khác, vì qty đã nằm right,
                  và desktop không bị chật nên vẫn nhìn cân đối.
              */}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductItem;
