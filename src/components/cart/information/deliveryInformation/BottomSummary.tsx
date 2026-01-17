import { Button } from '@/components/ui/button';
import React from 'react';

interface BottomSummaryProps {
  subtotal: number | string;
  buttonText: string;
  onButtonClick?: () => void;
  disabled?: boolean;
}

const BottomSummary: React.FC<BottomSummaryProps> = ({
  subtotal,
  buttonText,
  onButtonClick,
  disabled = false,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 w-full flex justify-start z-50">
      <div className="w-full md:max-w-[600px] bg-white shadow-2xl p-3 sm:p-4 rounded-t-lg flex flex-col gap-2 sm:gap-3">
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <span className="text-gray-700">Tạm tính:</span>
          <span className="text-red-600 font-bold ml-1 text-sm sm:text-base">
            {typeof subtotal === 'number'
              ? subtotal.toLocaleString('vi-VN') + 'đ'
              : subtotal}
          </span>
        </div>
        <Button
          className={`py-3 px-3 rounded-lg font-medium w-full transition-all duration-300 ${
            disabled
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-[#00868B] hover:bg-[#00868B] text-white shadow-lg'
          }`}
          onClick={onButtonClick}
          disabled={disabled}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default BottomSummary;