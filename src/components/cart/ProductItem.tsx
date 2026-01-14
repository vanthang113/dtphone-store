import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

interface ProductItemProps {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  quantity: number;
  isSelected: boolean;
  onSelectionChange: (checked: boolean) => void;
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
  const formatPrice = (price: number): string => {
    return price.toLocaleString('vi-VN') + 'đ';
  };

  return (
    <Card className="border border-gray-300 mb-4">
      <CardContent className="p-4">
        <div className="md:flex items-start">
          {/* Checkbox */}
          <div className="flex items-start">
            <Checkbox
              id={`product-${id}`}
              checked={isSelected}
              onCheckedChange={onSelectionChange}
              className="mt-1"
            />
          </div>
          
          {/* Product Image */}
          <div className="ml-3 w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
              <div className="w-12 h-12 bg-gray-200 rounded-full relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-6 bg-gray-400 rounded-t"></div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="md:flex-1 ml-3">
            <h3 className="text-white text-base font-semibold mb-1">
              {name}
            </h3>
            
            <div className="md:flex items-center justify-between">
              <div>
                <span className="text-red-600 text-base font-semibold">
                  {formatPrice(price)}
                </span>
                <span className="text-gray-400 line-through ml-2 text-sm font-semibold">
                  {formatPrice(originalPrice)}
                </span>
              </div>
              
              {/* Delete Button */}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onDelete}
                className="p-1 hover:bg-gray-100"
              >
                <Trash2 className="w-5 h-5 text-white" />
              </Button>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center justify-end mt-2">
              <div className="flex items-center border border-gray-300 rounded">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onQuantityChange(-1)}
                  className="p-1 hover:bg-gray-100 h-8 w-8"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4 text-white" />
                </Button>
                <span className="px-3 py-1 text-white min-w-[40px] text-center">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onQuantityChange(1)}
                  className="p-1 hover:bg-gray-100 h-8 w-8"
                >
                  <Plus className="w-4 h-4 text-white" />
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