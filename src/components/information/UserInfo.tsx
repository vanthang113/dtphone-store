import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Eye, Clock } from 'lucide-react';

export const UserInfo = () => (
  <Card className="text-black bg-white w-full px-small py-small tablet:px-1x-large tablet:py-medium rounded-1x-large mb-small">
    <CardContent className="flex flex-col lg:flex-row items-center justify-around gap-y-4 p-4 lg:p-0">
      <div className="lg:flex-1 flex justify-center">
        <div className="flex items-center gap-1x-small laptop:gap-small desktop:gap-medium">
          <div className="flex-shrink-0 w-[65px] tablet:w-[72px] aspect-square rounded-full bg-white flex items-center justify-center">
            <Image alt="avatar" title="avatar" src="/images/robo-avatar.png" width={80} height={80} className="w-[80px] h-[80px] object-contain" />
          </div>
          <div className="flex flex-col gap-3x-small tablet:gap-2x-small">
            <div className="text-medium tablet:text-base laptop:text-medium font-bold">Lộc Trần Trân</div>
            <div className="text-small font-regular text-neutral-500 gap-1x-small flex items-center">
              078*****30
              <Eye className="cursor-pointer text-neutral-400 hover:text-neutral-600 transition-colors mx-2" size={18} />
            </div>
            <div className="flex gap-2x-small">
              <span className="text-small font-bold rounded-full px-1x-small py-3x-small select-none shrink-0 bg-snull text-pure-black">S-NULL</span>
            </div>
            <div className="bg-white flex gap-2x-small items-center text-1x-small tablet:text-small font-regular p-2x-small rounded-1x-small">
              <Clock size={14} />
              Cập nhật lại sau 01/01/2026
            </div>
          </div>
        </div>
      </div>

      <div className="w-4/5 h-px bg-[#00868B] lg:w-px lg:h-24"></div>

      <div className="flex flex-row w-full lg:flex-[2]">
        <div className="flex-1 flex flex-col items-center gap-2">
          <div className="flex items-center gap-2x-small tablet:gap-1x-small laptop:gap-small desktop:gap-medium">
            <div className="flex-shrink-0 w-[48px] h-[48px] laptop:w-[72px] laptop:h-[72px] rounded-full bg-white flex items-center justify-center">
              <Image
                alt="icon-cart"
                title="icon-cart"
                width={32}
                height={32}
                className="w-[32px] h-[32px] laptop:w-[48px] laptop:h-[48px] object-contain"
                src="https://cdn-static.smember.com.vn/_next/static/media/cart-icon.3e4e1d83.svg"
              />
            </div>
            <div>
              <div className="font-bold text-xl tablet:text-3xl laptop:text-4xl">0</div>
              <div className="text-1x-small tablet:text-small laptop:text-base font-regular text-neutral-500">
                Tổng số đơn hàng <span className="hidden tablet:inline">đã mua</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-px h-24 bg-[#00868B]"></div>

        <div className="flex-1 flex flex-col items-center gap-2">
          <div className="flex items-center gap-2x-small tablet:gap-1x-small laptop:gap-small desktop:gap-medium">
            <div className="flex-shrink-0 w-[48px] h-[48px] laptop:w-[72px] laptop:h-[72px] rounded-full bg-white flex items-center justify-center">
              <Image
                alt="icon-money"
                title="icon-money"
                width={32}
                height={32}
                className="w-[32px] h-[32px] laptop:w-[48px] laptop:h-[48px] object-contain"
                src="https://cdn-static.smember.com.vn/_next/static/media/money-icon.3e6b67af.svg"
              />
            </div>
            <div>
              <div className="font-bold text-xl tablet:text-3xl laptop:text-4xl">0đ</div>
              <div className="text-1x-small tablet:text-small laptop:text-base font-regular text-neutral-500">
                Tổng tiền tích lũy
                <span className="inline-block w-[4px] h-[4px] tablet:w-[7px] tablet:h-[7px] rounded-full bg-neutral-100"></span> Từ 01/01/2024
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);
