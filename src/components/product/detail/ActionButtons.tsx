'use client';
import { Heart, EthernetPort, Cpu, CircleFadingPlus } from 'lucide-react';

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
  return (
    <div className="flex space-x-4 mb-4">
      <button
        className="flex items-center text-blue-500 hover:text-blue-700"
        onClick={onFavoriteClick}
      >
        <Heart className="h-5 w-5 mr-1" strokeWidth={2} />
        Yêu thích
      </button>
      <button
        className="flex items-center text-blue-500 hover:text-blue-700"
        onClick={onQAClick}
      >
        <EthernetPort className="h-5 w-5 mr-1" strokeWidth={2} />
        Hỏi đáp
      </button>
      <button
        className="flex items-center text-blue-500 hover:text-blue-700"
        onClick={onSpecsClick}
      >
        <Cpu className="h-5 w-5 mr-1" strokeWidth={2} />
        Thông số
      </button>
      <button
        className="flex items-center text-blue-500 hover:text-blue-700"
        onClick={onCompareClick}
      >      
      </button>
    </div>
  );
}