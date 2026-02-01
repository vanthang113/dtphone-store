"use client";

import React, { useMemo, useState } from "react";
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

  // đồng bộ checkbox "Chọn tất cả" khi products thay đổi
  const allSelected = useMemo(() => {
    if (products.length === 0) return false;
    return products.every((p) => p.isSelected);
  }, [products]);

  // nếu state lệch (do update từ context), đồng bộ lại
  if (isSelectAll !== allSelected && products.length > 0) {
    // tránh setState trong render liên tục: chỉ set khi khác và có products
    // (React sẽ ổn vì điều kiện sẽ khớp sau 1 render)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // NOTE: không dùng useEffect để tránh thêm deps phức tạp cho bạn
    setTimeout(() => setIsSelectAll(allSelected), 0);
  }

  const handleSelectAll = (checked: CheckedState) => {
    const v = checked === true;
    setIsSelectAll(v);
    selectAllProducts(v);
  };

  const handleProductSelection = (productId: string, checked: CheckedState) => {
    const v = checked === true;
    updateProductSelection(productId, v);

    // Update select all checkbox (dựa trên state hiện tại)
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
    <div className="md:max-w-[1200px] mx-auto relative bg-gray-100">
      <div className="min-h-screen">
        {/* Header */}
        <div className="sticky top-0 z-10 w-full">
          <div className="flex px-4 py-3">
            <Link href={"/"}>
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </Link>
            <div className="mx-auto">
              <h1 className="text-center ml-3 text-lg font-semibold text-gray-900">
                Giỏ hàng của bạn
              </h1>
            </div>
          </div>
        </div>

        {/* Cart Content */}
        <div className="px-4 py-4">
          {/* Cart Tab */}
          <div className="flex mb-4">
            <Button className="bg-[#00868B] text-white px-4 py-2 rounded-lg text-base font-semibold mr-2">
              Giỏ hàng
            </Button>
          </div>

          {/* Select All */}
          <div className="flex items-center mb-4">
            <Checkbox id="selectAll" checked={isSelectAll} onCheckedChange={handleSelectAll} />
            <label htmlFor="selectAll" className="ml-2 text-gray-700 text-base font-medium">
              Chọn tất cả
            </label>
          </div>

          {/* Product Items */}
          {products.map((product) => (
            <ProductItem
              key={product.id}
              id={product.id}
              name={product.name}
              // ✅ ProductItem đang expect string => convert theo formatPrice (string)
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

        <div className="h-24" />
      </div>

      {/* Bottom Summary */}
      <div className="fixed bottom-0 w-full flex justify-start z-50">
        <div className="w-full md:max-w-[600px] flex justify-between bg-white shadow-2xl p-4 rounded-t-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <span className="text-gray-700">Tạm tính: </span>
              <span className="text-red-600 font-bold ml-1">{formatPrice(totalAmount)}</span>
            </div>
          </div>

          <Button
            className={`py-3 px-3 rounded-lg font-medium text-white transition-all duration-300 ease-in-out ${
              hasSelectedProducts
                ? "bg-[#00868B] hover:bg-[#00777B] shadow-lg transform hover:scale-105"
                : "bg-gray-400 hover:bg-[#00868B]"
            }`}
            onClick={handleProceedToPayment}
            disabled={!hasSelectedProducts}
          >
            Mua ngay
          </Button>
        </div>
      </div>
    </div>
  );
}
