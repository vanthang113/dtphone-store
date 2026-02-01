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
    <Card className="mb-4 min-w-full" data-product-id={id}>
      <CardContent className="p-4">
        <div className="flex items-start">
          {/* Checkbox và hình ảnh */}
          <div className="flex items-center">
            <Checkbox
              checked={isSelected}
              onCheckedChange={onSelectionChange}
              className="mr-2"
            />
            <div className="ml-2 w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                {/* Hiển thị hình ảnh sản phẩm */}
                {image ? (
                  <img
                    src={image}
                    alt={name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-200 rounded-full relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    </div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-6 bg-gray-400 rounded-t"></div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Chi tiết sản phẩm */}
          <div className="flex-1 ml-4">
            <div className="flex justify-between items-start">
              <h3 className="text-gray-900 text-sm md:text-base font-semibold mb-1 overflow-x-hidden">
                {name}
              </h3>

              {/* Nút xóa */}
              <Button
                variant="ghost"
                size="sm"
                onClick={onDelete}
                className="text-gray-400 hover:text-red-500 p-1"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between mt-2">
              {/* Giá */}
              <div className="flex items-center">
                <div className="text-red-600 text-sm md:text-base font-semibold">
                  {price}
                </div>
                <div className="text-gray-400 line-through ml-2 text-xs md:text-sm font-semibold">
                  {originalPrice}
                </div>
              </div>

              {/* Điều chỉnh số lượng */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="w-8 h-8 p-0"
                >
                  <Minus className="w-3 h-3" />
                </Button>

                <span className="text-base font-normal min-w-[40px] text-center">
                  {quantity}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onQuantityChange(1)}
                  className="w-8 h-8 p-0"
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductItem;
