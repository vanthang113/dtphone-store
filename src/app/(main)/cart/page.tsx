"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import ProductItem from "@/components/cart/ProductItem";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

type CheckedState = boolean | "indeterminate";

export default function CartPage() {
  const {
    products,
    selectedProducts,
    totalAmount,
    updateProductQuantity,
    updateProductSelection,
    removeProduct,
    selectAllProducts,
    formatPrice,
  } = useCart();

  const router = useRouter();
  const [isSelectAll, setIsSelectAll] = useState(false);

  const allSelected = useMemo(() => {
    if (products.length === 0) return false;
    return products.every((p) => p.isSelected);
  }, [products]);

  useEffect(() => {
    setIsSelectAll(allSelected);
  }, [allSelected]);

  const handleSelectAll = (checked: CheckedState) => {
    const v = checked === true;
    setIsSelectAll(v);
    selectAllProducts(v);
  };

  const handleProductSelection = (productId: string, checked: CheckedState) => {
    const v = checked === true;
    updateProductSelection(productId, v);

    const nextAllSelected = products.every((product) =>
      product.id === productId ? v : product.isSelected
    );
    setIsSelectAll(nextAllSelected);
  };

  const handleQuantityChange = (productId: string, change: number) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;
    updateProductQuantity(productId, product.quantity + change);
  };

  const handleDeleteProduct = (productId: string) => {
    removeProduct(productId);
  };

  const hasSelectedProducts = selectedProducts.length > 0;

  const handleProceedToPayment = () => {
    if (hasSelectedProducts) router.push("/cart/payment-info");
  };

  return (
    <div className="md:max-w-[1200px] mx-auto relative bg-gray-100 overflow-x-hidden">
      {/* chừa chỗ cho bottom bar */}
      <div className="min-h-screen pb-28">
        {/* Header */}
        <div className="sticky top-0 z-10 w-full bg-gray-100">
          <div className="flex px-4 py-3 items-center">
            <Link href={"/"} className="shrink-0">
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </Link>

            <div className="flex-1 min-w-0">
              <h1 className="text-center text-lg font-semibold text-gray-900 truncate">
                Giỏ hàng của bạn
              </h1>
            </div>

            <div className="w-6 shrink-0" />
          </div>
        </div>

        {/* Cart Content */}
        <div className="px-4 py-4">
          <div className="flex mb-4">
            <Button className="bg-[#00868B] text-white px-4 py-2 rounded-lg text-base font-semibold mr-2">
              Giỏ hàng
            </Button>
          </div>

          <div className="flex items-center mb-4">
            <Checkbox
              id="selectAll"
              checked={isSelectAll}
              onCheckedChange={handleSelectAll}
            />
            <label
              htmlFor="selectAll"
              className="ml-2 text-gray-700 text-base font-medium"
            >
              Chọn tất cả
            </label>
          </div>

          {products.map((product) => (
            <ProductItem
              key={product.id}
              id={product.id}
              name={product.name}
              price={formatPrice(product.price)}
              originalPrice={formatPrice(product.originalPrice)}
              image={product.image}
              quantity={product.quantity}
              isSelected={product.isSelected}
              onSelectionChange={(checked: CheckedState) =>
                handleProductSelection(product.id, checked)
              }
              onQuantityChange={(change: number) =>
                handleQuantityChange(product.id, change)
              }
              onDelete={() => handleDeleteProduct(product.id)}
            />
          ))}
        </div>
      </div>

      {/* Bottom Summary */}
      <div className="fixed bottom-0 left-0 w-full flex justify-start z-50">
        <div className="w-full md:max-w-[600px] px-3 md:px-0 pb-2">
          <div
            className="
              bg-white shadow-2xl rounded-t-lg
              w-full
              p-3 md:p-4
            "
            style={{
              paddingBottom: "calc(env(safe-area-inset-bottom) + 12px)",
            }}
          >
            {/* tách 2 cột: trái là giá, phải là nút */}
            <div className="flex items-center gap-3 w-full">
              {/* LEFT */}
              <div className="flex items-center min-w-0 flex-1">
                <span className="text-gray-700 text-sm md:text-base whitespace-nowrap">
                  Tạm tính:
                </span>
                <span className="text-red-600 font-bold ml-2 text-sm md:text-base truncate">
                  {formatPrice(totalAmount)}
                </span>
              </div>

              {/* RIGHT */}
              <div
                className="
                  flex justify-end shrink-0
                "
              >
                <Button
                  className={`
                    rounded-lg font-medium text-white transition-all duration-300 ease-in-out
                    ${
                      hasSelectedProducts
                        ? "bg-[#00868B] hover:bg-[#00777B] shadow-lg transform hover:scale-105"
                        : "bg-gray-400 hover:bg-[#00868B]"
                    }

                    /* ✅ MOBILE: nhỏ lại để không đè / không bị đè */
                    min-w-[88px] px-3 py-2 text-[13px]

                    /* ✅ DESKTOP: giữ nguyên */
                    md:min-w-0 md:px-3 md:py-3 md:text-base
                  `}
                  onClick={handleProceedToPayment}
                  disabled={!hasSelectedProducts}
                >
                  Mua ngay
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
