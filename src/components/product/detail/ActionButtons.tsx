"use client";

import { Heart, EthernetPort, Cpu, CircleFadingPlus } from "lucide-react";

type ActionButtonsProps = {
  onFavoriteClick?: () => void;
  onQAClick?: () => void;
  onSpecsClick?: () => void;
  onCompareClick?: () => void;
};

export default function ActionButtons({
  onFavoriteClick,
  onQAClick,
  onSpecsClick,
  onCompareClick,
}: ActionButtonsProps) {
  const baseBtn =
    "shrink-0 inline-flex items-center text-blue-500 hover:text-blue-700 whitespace-nowrap";

  return (
    <div className="mb-4 flex flex-nowrap items-center gap-3 sm:gap-4 overflow-x-auto no-scrollbar min-w-0">
      <button className={`${baseBtn} text-sm sm:text-base`} onClick={onFavoriteClick} type="button">
        <Heart className="h-5 w-5 mr-1" strokeWidth={2} />
        Yêu thích
      </button>

      <button className={`${baseBtn} text-sm sm:text-base`} onClick={onQAClick} type="button">
        <EthernetPort className="h-5 w-5 mr-1" strokeWidth={2} />
        Hỏi đáp
      </button>

      <button className={`${baseBtn} text-sm sm:text-base`} onClick={onSpecsClick} type="button">
        <Cpu className="h-5 w-5 mr-1" strokeWidth={2} />
        Thông số
      </button>

      <button className={`${baseBtn} text-sm sm:text-base`} onClick={onCompareClick} type="button">
        <CircleFadingPlus className="h-5 w-5 mr-1" strokeWidth={2} />
        So sánh
      </button>
    </div>
  );
}
