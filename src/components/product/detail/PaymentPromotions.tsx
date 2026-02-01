// components/product/detail/PaymentPromotions.tsx
import Image from 'next/image';
import { CheckLine } from 'lucide-react';

interface PromotionItem {
  text: string;
  img?: string;
}

interface PaymentPromotionsProps {
  promotions: PromotionItem[];
}

export default function PaymentPromotions({ promotions }: PaymentPromotionsProps) {
  return (
    <div
      className="mt-4 p-4 rounded-2xl border border-blue-300 w-full"
      style={{
        background:
          'linear-gradient(to top right, #fcfeff, #eff5ff) padding-box, linear-gradient(to top right, #dbe8fe, #609afa) border-box',
      }}
    >
      <ul className="space-y-2 text-sm text-black">
        {promotions.map((item, index) => (
          <li key={index} className="flex items-start space-x-2">
            <CheckLine style={{ color: '#5ace86' }} />
            <a href="#" className="hover:underline text-black flex items-center gap-2">
              {item.img && (
                <Image
                  src={item.img}
                  alt={item.img.replace('/images/', '').replace('.png', '')}
                  width={50}
                  height={30}
                  className="mr-2 object-contain"
                />
              )}
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
