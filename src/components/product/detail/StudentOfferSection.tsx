import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function StudentOfferSection() {
  return (
    <div className="mt-4">
      <div
        className="w-full h-[55px] border rounded-md flex flex-col space-y-1 p-2"
        style={{ backgroundColor: '#f3feff', color: 'black', borderColor: '#11b4be' }}
      >
        <h3 className="text-xs font-semibold">
          Ưu đãi cho sinh viên - sinh viên, Giảng viên - giáo viên chỉ còn 23.390.000đ.
        </h3>
        <Link href="" className="flex items-center space-x-1 text-blue-500 hover:text-blue-700 text-xs">
          Xác định mua <ArrowRight className="h-3 w-4 ml-1" />
        </Link>
      </div>
    </div>
  );
}