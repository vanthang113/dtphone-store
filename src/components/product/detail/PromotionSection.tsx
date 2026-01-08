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
      className="mt-4 p-4 rounded-2xl border border-blue-300 w-full"
      style={{
        background: 'linear-gradient(249.83deg, #eff5ff 3.89%, rgba(244, 251, 255, 0.25) 65.75%)',
      }}
    >
      {/* Tiêu đề */}
      <div className="flex items-center mb-3 space-x-2">
        <Gift className="w-7 h-7 text-red-500" />
        <h3 className="text-base font-semibold text-black">{title}</h3>
      </div>
      {/* Nội dung khuyến mãi */}
      <ul className="text-sm text-black space-y-2 pl-1">
        {promotions.map((promo) => (
          <PromotionItem key={promo.id} id={promo.id} text={promo.text} link={promo.link} />
        ))}
      </ul>
    </div>
  );
};

export default PromotionSection;