import { ChevronRight, CreditCard, X, Banknote, Truck, CreditCard as CardIcon, Smartphone, Building } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface PaymentMethodOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  discount?: string;
}

const PaymentMethod = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethodOption | null>(null);

  const paymentMethods: PaymentMethodOption[] = [
    {
      id: 'transfer',
      name: 'Chuyển khoản ngân hàng',
      description: 'Chuyển khoản qua tài khoản ngân hàng',
      icon: <Building className="w-5 h-5" />,
      discount: 'Giảm 50.000₫'
    },
    {
      id: 'cod',
      name: 'Thanh toán khi nhận hàng',
      description: 'Thanh toán tiền mặt khi nhận hàng',
      icon: <Truck className="w-5 h-5" />,
    },
    {
      id: 'credit_card',
      name: 'Thẻ tín dụng/ghi nợ',
      description: 'Visa, Mastercard, JCB',
      icon: <CardIcon className="w-5 h-5" />,
      discount: 'Giảm 100.000₫'
    },
    {
      id: 'momo',
      name: 'Ví MoMo',
      description: 'Thanh toán qua ví điện tử MoMo',
      icon: <Smartphone className="w-5 h-5" />,
      discount: 'Giảm 200.000₫'
    },
    {
      id: 'zalopay',
      name: 'ZaloPay',
      description: 'Thanh toán qua ví điện tử ZaloPay',
      icon: <Smartphone className="w-5 h-5" />,
      discount: 'Giảm 150.000₫'
    },
    {
      id: 'vnpay',
      name: 'VNPay',
      description: 'Thanh toán qua cổng VNPay',
      icon: <CreditCard className="w-5 h-5" />,
      discount: 'Giảm 75.000₫'
    }
  ];

  const handlePaymentSelect = (method: PaymentMethodOption) => {
    setSelectedPayment(method);
    setIsDialogOpen(false);
  };

  const getDisplayText = () => {
    if (selectedPayment) {
      return {
        title: selectedPayment.name,
        subtitle: selectedPayment.discount || selectedPayment.description
      };
    }
    return {
      title: 'Chọn phương thức thanh toán',
      subtitle: 'Giảm thêm tới 200.000₫'
    };
  };

  const displayText = getDisplayText();

  return (
    <>
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 my-3">THÔNG TIN THANH TOÁN</h3>
        <div 
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 border border-gray-200 rounded-lg bg-white cursor-pointer hover:bg-gray-50 transition-colors gap-2 sm:gap-0"
          onClick={() => setIsDialogOpen(true)}
        >
          <div className="flex items-center space-x-2 sm:space-x-3 flex-1">
            {selectedPayment ? selectedPayment.icon : <CreditCard className="w-5 h-5 text-red-600 flex-shrink-0" />}
            <div className="min-w-0 flex-1">
              <div className={`text-xs sm:text-sm font-medium ${selectedPayment ? 'text-gray-900' : 'text-red-600'} truncate`}>
                {displayText.title}
              </div>
              <div className="text-xs text-gray-500 truncate">{displayText.subtitle}</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-red-600 flex-shrink-0" />
        </div>
      </div>

      {/* Payment Method Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black/50 z-99 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-hidden">
            {/* Dialog Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Chọn phương thức thanh toán</h2>
              <button
                onClick={() => setIsDialogOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Payment Methods List */}
            <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedPayment?.id === method.id 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-200 hover:border-red-300'
                  }`}
                  onClick={() => handlePaymentSelect(method)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${
                      selectedPayment?.id === method.id ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{method.name}</div>
                      <div className="text-sm text-gray-500">{method.description}</div>
                      {method.discount && (
                        <div className="text-sm font-medium text-red-600 mt-1">{method.discount}</div>
                      )}
                    </div>
                    {selectedPayment?.id === method.id && (
                      <div className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Dialog Footer */}
            <div className="p-4 border-t border-gray-200">
              <Button 
                onClick={() => setIsDialogOpen(false)}
                className="w-full bg-[#00868B] hover:bg-[#00868B] text-white"
              >
                Xác nhận
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentMethod;