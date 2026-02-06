// components/PromotionItem.tsx
import React from 'react';

interface PromotionItemProps {
  id: number;
  text: string;
  link?: string;
}

const PromotionItem: React.FC<PromotionItemProps> = ({ id, text, link }) => {
  return (
    <li className="flex items-start space-x-2">
      <span
        className="bg-gradient-to-br text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
        style={{ background: 'linear-gradient(233.74deg, #eff5ff -33.75%, #3b82f6 71.83%)' }}
      >
        {id}
      </span>
      <span>
        {text}
        {link && <a href={link} className="text-[#00868B] ml-1">Xem chi tiết</a>}
      </span>
    </li>
  );
};

export default PromotionItem;