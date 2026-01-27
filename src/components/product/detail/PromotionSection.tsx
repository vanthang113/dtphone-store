// components/PromotionSection.tsx
import React from 'react';
import {Gift} from 'lucide-react';
import PromotionItem from './PromotionItem';

interface PromotionSectionProps {
  title: string;
  promotions: { id: number; text: string; link?: string }[];
}

const PromotionSection: React.FC<PromotionSectionProps> = ({ title, promotions }) => {
  return (
    <div
      className="mt-3 sm:mt-4 md:mt-5 p-2.5 sm:p-3 md:p-4 rounded-lg sm:rounded-2xl border border-blue-300 w-full"
      style={{
        background: 'linear-gradient(249.83deg, #eff5ff 3.89%, rgba(244, 251, 255, 0.25) 65.75%)',
      }}
    >
      {/* Tiêu đề */}
      <div className="flex items-center mb-2 sm:mb-3 space-x-1.5 sm:space-x-2">
        <Gift className="w-5 sm:w-6 md:w-7 h-5 sm:h-6 md:h-7 text-red-500" />
        <h3 className="text-sm sm:text-base md:text-base font-semibold text-black">{title}</h3>
      </div>
      {/* Nội dung khuyến mãi */}
      <ul className="text-xs sm:text-sm text-black space-y-1.5 sm:space-y-2 pl-0.5 sm:pl-1">
        {promotions.map((promo) => (
          <PromotionItem key={promo.id} id={promo.id} text={promo.text} link={promo.link} />
        ))}
      </ul>
    </div>
  );
};

export default PromotionSection;