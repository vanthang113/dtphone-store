import { ShoppingCart } from 'lucide-react';

export default function PurchaseButtons() {
  return (
    <div className="flex flex-row items-stretch justify-center gap-2 sm:gap-3 mt-4 w-full max-w-[750px]">
      <button
        className="flex-1 aspect-[3/1] min-h-[44px] max-h-[64px] border border-blue-500 text-blue-600 font-semibold text-[clamp(10px,2.5vw,14px)] rounded-xl px-2 text-center hover:bg-blue-50 transition flex items-center justify-center cursor-pointer"
      >
        Trả góp 0%
      </button>

      <button
        className="flex-[2.5] aspect-[5/2] min-h-[44px] max-h-[64px] text-white rounded-xl px-2 text-center hover:brightness-110 transition flex flex-col items-center justify-center leading-tight cursor-pointer"
        style={{ background: 'linear-gradient(0deg, #d70018, #e45464)' }}
      >
        <span className="text-[clamp(11px,3vw,16px)] font-bold leading-tight text-center">MUA NGAY</span>
        <span className="text-[clamp(10px,2.3vw,13px)] font-normal text-center">Giao nhanh từ 2 giờ hoặc nhận tại cửa hàng</span>
      </button>

      <button
        className="flex-1 aspect-[3/1] min-h-[44px] max-h-[64px] border border-red-500 text-red-600 font-semibold text-[clamp(10px,2.5vw,14px)] rounded-xl px-2 hover:bg-red-50 transition flex items-center justify-center gap-1 cursor-pointer"
      >
        <ShoppingCart className="h-[clamp(14px,3vw,18px)] w-[clamp(14px,3vw,18px)]" strokeWidth={2} />
        <span>Thêm vào giỏ</span>
      </button>
    </div>
  
  );
}