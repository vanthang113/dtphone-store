// components/product/detail/TradeInSection.tsx
import React from 'react';
import { ArrowRight, ArrowBigUpDash } from 'lucide-react';

interface TradeInSectionProps {
  minPrice: string;
  options: string[];
}

const TradeInSection: React.FC<TradeInSectionProps> = ({ minPrice, options }) => {
  return (
    <div className="mt-4 bg-gray-100 rounded-xl flex items-center justify-between px-4 py-3 space-x-4 w-full max-w-[750px]">
      {/* Icon + nội dung bên trái */}
      <div className="flex items-center space-x-3">
        <div
          className="flex w-10 h-10 text-white font-bold text-sm rounded-full px-2 text-center hover:brightness-110 transition flex flex-col items-center justify-center leading-tight"
          style={{ background: 'linear-gradient(0deg, #00868B, #00868B)' }}
        >
          <ArrowBigUpDash />
        </div>

        {/* Text nội dung */}
        <div>
          <p className="font-semibold text-[#00868B]">Thu cũ lên đời</p>
          <p className="text-sm text-gray-600">
            Chỉ từ <span className="text-blue-600 font-semibold">{minPrice}</span>
          </p>
        </div>
      </div>

      {/* Dropdown chọn sản phẩm */}
      <div className="flex items-center space-x-2">
        <select className="px-3 py-2 border rounded-md text-sm min-w-[180px] text-gray-700 focus:outline-none">
          {options.map((option, index) => (
            <option key={index}>{option}</option>
          ))}
        </select>

        {/* Nút kiểm tra */}
        <button className="bg-[#00868B] text-white font-semibold text-sm px-4 py-2 rounded-md flex items-center hover:bg-[#00868B] transition cursor-pointer">
          Kiểm tra ngay
          <ArrowRight className="h-4 w-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default TradeInSection;