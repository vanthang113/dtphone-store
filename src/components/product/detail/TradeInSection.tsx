// components/product/detail/TradeInSection.tsx
import React from "react";
import { ArrowRight, ArrowBigUpDash } from "lucide-react";

interface TradeInSectionProps {
  minPrice: string;
  options: string[];
}

const TradeInSection: React.FC<TradeInSectionProps> = ({ minPrice, options }) => {
  return (
    <div
      className="
        mt-4 bg-gray-100 rounded-xl
        flex flex-nowrap items-center justify-between
        px-3 sm:px-4 py-3
        gap-2 sm:gap-4
        w-full max-w-[750px]
        min-w-0
      "
    >
      {/* Left: Icon + text */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <div
          className="
            flex shrink-0
            w-9 h-9 sm:w-10 sm:h-10
            text-white font-bold text-sm
            rounded-full
            hover:brightness-110 transition
            items-center justify-center
          "
          style={{ background: "linear-gradient(0deg, #00868B, #00868B)" }}
        >
          <ArrowBigUpDash className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>

        <div className="min-w-0">
          <p className="font-semibold text-[#00868B] text-[clamp(12px,3.2vw,16px)] leading-tight truncate">
            Thu cũ lên đời
          </p>
          <p className="text-[clamp(10px,2.6vw,14px)] text-gray-600 leading-tight truncate">
            Chỉ từ{" "}
            <span className="text-blue-600 font-semibold">{minPrice}</span>
          </p>
        </div>
      </div>

      {/* Right: Select + button */}
      <div className="flex items-center gap-2 min-w-0">
        <select
          className="
            px-2 sm:px-3 py-2
            border rounded-md
            text-[clamp(10px,2.6vw,14px)]
            text-gray-700
            focus:outline-none
            min-w-0
            w-[clamp(110px,32vw,180px)]
            bg-white
          "
        >
          {options.map((option, index) => (
            <option key={index}>{option}</option>
          ))}
        </select>

        <button
          className="
            bg-[#00868B] text-white font-semibold
            text-[clamp(10px,2.6vw,14px)]
            px-3 sm:px-4 py-2
            rounded-md
            flex items-center
            hover:brightness-110 transition
            cursor-pointer
            shrink-0
            whitespace-nowrap
          "
        >
          Kiểm tra
          <ArrowRight className="h-4 w-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default TradeInSection;
