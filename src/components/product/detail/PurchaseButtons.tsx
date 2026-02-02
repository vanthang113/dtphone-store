import { ShoppingCart } from "lucide-react";

export default function PurchaseButtons() {
  return (
    <div
      className="
        flex flex-nowrap items-stretch justify-center
        gap-2 sm:gap-3
        mt-4 w-full max-w-[750px]
        min-w-0
      "
    >
      {/* Trả góp */}
      <button
        className="
          flex-[1] min-w-0
          min-h-[44px] sm:max-h-[64px]
          border border-[#00868B] text-[#00868B]
          font-semibold
          text-[clamp(10px,2.2vw,14px)]
          rounded-xl
          px-2 sm:px-3
          text-center
          hover:bg-blue-50 transition
          flex items-center justify-center
          whitespace-nowrap
          cursor-pointer
        "
      >
        Trả góp 0%
      </button>

      {/* Mua ngay */}
      <button
        className="
          flex-[2.2] sm:flex-[2.5] min-w-0
          min-h-[44px] sm:max-h-[64px]
          text-white rounded-xl
          px-2 sm:px-3
          text-center
          hover:brightness-110 transition
          flex flex-col items-center justify-center
          leading-tight
          cursor-pointer
        "
        style={{ background: "linear-gradient(0deg, #00868B, #00777B)" }}
      >
        <span className="text-[clamp(11px,2.6vw,16px)] font-bold leading-tight text-center whitespace-nowrap">
          MUA NGAY
        </span>
        <span className="text-[clamp(9px,2vw,13px)] font-normal text-center leading-tight line-clamp-2">
          Giao nhanh từ 2 giờ hoặc nhận tại cửa hàng
        </span>
      </button>

      {/* Thêm vào giỏ */}
      <button
        className="
          flex-[1] min-w-0
          min-h-[44px] sm:max-h-[64px]
          border border-[#00868B] text-[#00868B]
          font-semibold
          text-[clamp(10px,2.2vw,14px)]
          rounded-xl
          px-2 sm:px-3
          hover:bg-[#E0FFFF] transition
          flex items-center justify-center gap-1
          whitespace-nowrap
          cursor-pointer
        "
      >
        <ShoppingCart
          className="h-[clamp(14px,3vw,18px)] w-[clamp(14px,3vw,18px)]"
          strokeWidth={2}
        />
        <span className="truncate">Thêm vào </span>
      </button>
    </div>
  );
}
