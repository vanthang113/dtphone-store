'use client'

import React, { JSX, useState } from 'react';
import { ChevronLeft, Trash2, Plus, Minus, ChevronDown, ChevronUp, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DeliveryToYourDoor from '@/components/cart/information/deliveryInformation/DeliveryToYourDoor';
import PickUpInStore from '@/components/cart/information/deliveryInformation/PickUpInStore';
import Input from '@/components/cart/input/Input';
import Link from 'next/link';
import ProductItem from '@/components/cart/information/deliveryInformation/ProductItem';
import CustomerInformation from '@/components/cart/information/deliveryInformation/CustomerInformation';
import DeliveryInformation from '@/components/cart/information/deliveryInformation/DeliveryInformation';
import BottomSummary from '@/components/cart/information/deliveryInformation/BottomSummary';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { usePaymentForm } from '@/context/PaymentFormContext';

export default function PaymentInfoPage(): JSX.Element {
  const router = useRouter();
  const { selectedProducts, totalAmount, formatPrice } = useCart();
  const { isFormValid } = usePaymentForm();
  
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Show only first product initially, all products when expanded
  const visibleProducts = showAllProducts ? selectedProducts : selectedProducts.slice(0, 1);
  const hiddenProductsCount = selectedProducts.length - 1;

  const handleViewAllProducts = () => {
    if (!showAllProducts) {
      setIsAnimating(true);
      setShowAllProducts(true);
      // Reset animation state after transition completes
      setTimeout(() => setIsAnimating(false), 600);
    } else {
      setShowAllProducts(false);
      setIsAnimating(false);
    }
  };

  // Handle navigation to payment page
  const handleContinueToPayment = () => {
    if (isFormValid()) {
      router.push('/cart/payment');
    }
  };

  // If no products are selected, redirect back to cart
  if (selectedProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Không có sản phẩm nào được chọn
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Vui lòng quay lại giỏ hàng và chọn sản phẩm bạn muốn mua.
        </p>
        <Button 
          onClick={() => router.push('/cart')}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          Quay lại giỏ hàng
        </Button>
      </div>
    );
  }

  const isFormCompleted = isFormValid();

  return (
    <div>
      {/* Cart Content */}
      <div className="px-4 py-4 rounded-lg bg-white border border-gray-200 transition-all duration-300 ease-in-out">
        {/* Header with product count */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Sản phẩm đã chọn ({selectedProducts.length})
          </h2>
          
          {/* View All Products Button */}
          {hiddenProductsCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleViewAllProducts}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-all duration-200 rounded-lg px-3 py-2"
            >
              {showAllProducts ? (
                <>
                  <EyeOff className="w-4 h-4" />
                  Thu gọn
                  <ChevronUp className="w-4 h-4 transition-transform duration-200" />
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  Xem tất cả
                  <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                </>
              )}
            </Button>
          )}
        </div>

        {/* Products Display */}
        <div className="space-y-0">
          {/* First product - always visible */}
          {selectedProducts.length > 0 && (
            <div className="transition-all duration-300 ease-in-out">
              <ProductItem 
                key={selectedProducts[0].id}
                name={selectedProducts[0].name}
                price={formatPrice(selectedProducts[0].price)}
                originalPrice={formatPrice(selectedProducts[0].originalPrice)}
                quantity={selectedProducts[0].quantity}
                image={selectedProducts[0].image}
              />
            </div>
          )}

          {/* Additional products with smooth animation */}
          <div 
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              showAllProducts 
                ? 'max-h-[2000px] opacity-100' 
                : 'max-h-0 opacity-0'
            }`}
          >
            {selectedProducts.slice(1).map((product, index) => (
              <div 
                key={product.id}
                className={`transform transition-all duration-500 ease-out ${
                  showAllProducts 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-[-20px] opacity-0'
                }`}
                style={{
                  transitionDelay: showAllProducts ? `${(index + 1) * 100}ms` : '0ms'
                }}
              >
                <ProductItem 
                  name={product.name}
                  price={formatPrice(product.price)}
                  originalPrice={formatPrice(product.originalPrice)}
                  quantity={product.quantity}
                  image={product.image}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Hidden products summary when collapsed */}
        {!showAllProducts && hiddenProductsCount > 0 && (
          <div className="mt-4 p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200 transition-all duration-300 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600 font-medium">
                  +{hiddenProductsCount} sản phẩm khác đã chọn
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleViewAllProducts}
                className="text-xs bg-white hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 transition-all duration-200"
              >
                Xem chi tiết →
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* customer information */}
      <CustomerInformation />

      {/* Delivery information */}
      <DeliveryInformation />

      <div className="h-24"></div>

      {/* Bottom Summary with form validation using BottomSummary component */}
      <BottomSummary 
        subtotal={formatPrice(totalAmount)}
        buttonText={isFormCompleted ? 'Tiếp tục' : 'Vui lòng điền đầy đủ thông tin'}
        onButtonClick={handleContinueToPayment}
        disabled={!isFormCompleted}
      />
      
      {/* Additional validation message */}
      {!isFormCompleted && (
        <div className="fixed bottom-20 left-0 right-0 z-40">
          <div className="max-w-[600px] mx-auto px-4">
            <p className="text-xs text-gray-500 text-center bg-white/90 py-1 rounded">
              Các trường có dấu (*) là bắt buộc
            </p>
          </div>
        </div>
      )}
    </div>
  )
}