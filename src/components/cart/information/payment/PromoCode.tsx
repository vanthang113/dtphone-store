import { ChevronRight, Underline } from 'lucide-react';
import React, { useState } from 'react';
import Input from '../../input/Input';
import { Button } from '@/components/ui/button';

const PromoCode = () => {
     const [isPromoExpanded, setIsPromoExpanded] = useState(false);
     const [promotionCode, setPromotionCode] = useState<string>();


const handlePromotionCode = (e: React.ChangeEvent<HTMLInputElement>) => {
  setPromotionCode( e.target.value );
    };


    return (
        <div className="mb-6 mt-6" >
        <div className="grid grid-cols-6 gap-4">

          <div className='col-span-5'><Input 
        
                label='Nhập mã giảm giá chỉ áp dụng một lần' 
                value={promotionCode}
                onChange={handlePromotionCode}
            /></div>
        
<div className='col-span-1'><Button 
            className={`py-3 px-3  rounded-lg font-medium transition-all duration-300 ease-in-out ${promotionCode?.length ? "bg-red-600 text-white":"bg-gray-300 text-gray-600 "  } `}
          >
            Áp dụng
          </Button></div>

                    </div>
        
      
      </div>
    );
};

export default PromoCode;