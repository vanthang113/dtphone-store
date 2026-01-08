import React from 'react';
import { CartProduct } from '@/context/CartContext';

interface OrderSummaryProps {
  selectedProducts: CartProduct[];
  totalAmount: number;
  formatPrice?: (price: number) => string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ 
  selectedProducts, 
  totalAmount,
  formatPrice = (price: number) => price.toLocaleString('vi-VN') + '₫'
}) => {
    const totalQuantity = selectedProducts.reduce((sum, product) => sum + product.quantity, 0);
    const originalTotal = selectedProducts.reduce((sum, product) => sum + (product.originalPrice * product.quantity), 0);
    const discount = originalTotal - totalAmount;

    return (
        <div className="mb-6 space-y-3">
            <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Số lượng sản phẩm</span>
                <span className="text-sm">{totalQuantity.toString().padStart(2, '0')}</span>
            </div>
            
            <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Tổng tiền hàng</span>
                <span className="text-sm">{formatPrice(originalTotal)}</span>
            </div>
            
            <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Phí vận chuyển</span>
                <span className="text-sm text-green-600">Miễn phí</span>
            </div>
            
            {discount > 0 && (
                <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Giảm giá trực tiếp</span>
                    <span className="text-sm text-red-600">- {formatPrice(discount)}</span>
                </div>
            )}
            
            <hr className="my-3" />
            
            <div className="flex justify-between items-center">
                <div>
                    <div className="font-semibold text-base">Tổng tiền</div>
                    <div className="text-xs text-gray-500">Đã gồm VAT và được làm tròn</div>
                </div>
                <span className="font-semibold text-lg text-red-600">{formatPrice(totalAmount)}</span>
            </div>
        </div>
    );
};

export default OrderSummary;