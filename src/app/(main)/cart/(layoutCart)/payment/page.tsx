"use client";

import { Button } from "@/components/ui/button";
import PromoCode from "@/components/cart/information/payment/PromoCode";
import OrderSummary from "@/components/cart/information/payment/OrderSummary";
import PaymentMethod from "@/components/cart/information/payment/PaymentMethod";
import CustomerInformation from "@/components/cart/information/payment/CustomerInformation";
import AgreementCheckbox from "@/components/cart/information/payment/AgreementCheckbox";
import BottomSummary from "@/components/cart/information/deliveryInformation/BottomSummary";
import { useCart } from "@/context/CartContext";
import { usePaymentForm } from "@/context/PaymentFormContext";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const router = useRouter();
  const { selectedProducts, totalAmount, formatPrice } = useCart();
  const { formData } = usePaymentForm();

  const handleCompletePayment = () => {
    // Here you can add payment processing logic
    alert(
      `Thanh toán thành công!\n\nThông tin khách hàng:\n- Email: ${formData.customer.email}\n- Loại giao hàng: ${
        formData.delivery.deliveryType === "pickup" ? "Nhận tại cửa hàng" : "Giao hàng tận nơi"
      }\n- Tổng tiền: ${formatPrice(totalAmount)}`
    );
    // Optionally redirect to success page
    // router.push('/order-success');
  };

  // If no products are selected, redirect back to cart
  if (selectedProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Không có sản phẩm nào để thanh toán
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Vui lòng quay lại giỏ hàng và chọn sản phẩm bạn muốn mua.
        </p>
        <Button
          onClick={() => router.push("/cart")}
          className="bg-[#00868B] hover:bg-[#00868B] text-white"
        >
          Quay lại giỏ hàng
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white px-4 py-2 rounded-lg border border-gray-200">
        {/* Promo Code Section */}
        <PromoCode />

        {/* Order Summary - Pass selected products */}
        <OrderSummary selectedProducts={selectedProducts} totalAmount={totalAmount} formatPrice={formatPrice} />
      </div>

      {/* Payment Method */}
      <PaymentMethod />

      {/* Customer Information - Pass form data as props */}
      <CustomerInformation formData={formData} />

      {/* Agreement Checkbox */}
      <AgreementCheckbox />

      {/* Bottom Summary with correct total */}
      <BottomSummary
        subtotal={formatPrice(totalAmount)}
        buttonText="Thanh toán"
        onButtonClick={handleCompletePayment}
      />
    </div>
  );
}
