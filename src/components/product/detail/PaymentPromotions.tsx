// components/product/detail/PaymentPromotions.tsx
import React from 'react';
import { CheckLine } from 'lucide-react';

interface PromotionItem {
  text: string;
  img?: string;
}

interface PaymentPromotionsProps {
  promotions: PromotionItem[];
}

const PaymentPromotions: React.FC<PaymentPromotionsProps> = ({ promotions }) => {
  return (
    <div
      className="mt-4 p-4 rounded-2xl border border-blue-300 w-full"
      style={{
        background: 'linear-gradient(to top right, #fcfeff, #eff5ff) padding-box, linear-gradient(to top right, #dbe8fe, #609afa) border-box',
      }}
    >
      <ul className="space-y-2 text-sm text-black">
        {promotions.map((item, index) => (
          <li key={index} className="flex items-start space-x-2">
            <CheckLine style={{ color: '#5ace86' }} />
            <a href="#" className="hover:underline text-black flex items-center gap-2">
              {item.img && (
                <img
                  src={item.img}
                  alt={item.img.replace('/images/', '').replace('.png', '')}
                  className="mr-2 w-[50px] h-[30px] object-contain"
                />
              )}
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentPromotions;