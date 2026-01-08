import Link from 'next/link';
import { Star } from 'lucide-react';

export default function ReviewSummary() {
  return (
    <div className="w-full bg-white rounded-lg mt-4 p-4 flex flex-col lg:flex-row justify-between gap-4">
      <div className="flex flex-col items-center justify-center w-full lg:w-1/3 text-center">
        <p className="text-5xl font-bold text-gray-900">4.6<span className="text-2xl text-gray-400">/5</span></p>
        <div className="flex text-yellow-400 my-2">
          <Star className="text-yellow-400 text-xs" />
          <Star className="text-yellow-400 text-xs" />
          <Star className="text-yellow-400 text-xs" />
          <Star className="text-yellow-400 text-xs" />
          <Star className="text-yellow-400 text-xs" />
        </div>
        <p className="text-sm text-gray-600">11 lượt đánh giá</p>
        <Link href="#" className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
          Viết đánh giá
        </Link>
      </div>
      <div className="w-full lg:w-1/2 flex flex-col justify-center text-sm gap-1">
        {[5, 4, 3, 2, 1].map((star) => (
          <div key={star} className="flex items-center gap-1 mb-1">
            <span className="text-gray-700">{star}</span>
            <div className="flex text-yellow-400 text-xs">
              <Star className="text-yellow-400 text-xs" />
            </div>
            <div className="w-full bg-gray-300 h-2 rounded-full overflow-hidden max-w-[300px]">
              <div
                className="bg-red-600 h-2"
                style={{ width: star === 5 ? "65%" : star === 4 ? "35%" : "0%" }}
              />
            </div>
            <span className="text-gray-500 text-xs w-16 text-right">
              {star === 5 ? "7 đánh giá" : star === 4 ? "4 đánh giá" : "0 đánh giá"}
            </span>
          </div>
        ))}
      </div>
      <div className="hidden md:block w-px h-24 bg-gray-400 mt-10"></div>
      <div className="w-full lg:w-1/2">
        <h2 className="font-semibold mt-4">Đánh giá theo trải nghiệm</h2>
        {['Hiệu năng', 'Thời lượng pin', 'Màn hình'].map((item) => (
          <div key={item} className="flex items-center justify-between mt-3">
            <span>{item}</span>
            <div className="flex items-center space-x-1">
              <div className="flex text-yellow-400">
                <Star className="text-yellow-400 text-xs" />
                <Star className="text-yellow-400 text-xs" />
                <Star className="text-yellow-400 text-xs" />
                <Star className="text-yellow-400 text-xs" />
                <Star className="text-yellow-400 text-xs" />
              </div>
              <span className="text-sm text-gray-600 ml-2">4.7/5 (9 đánh giá)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}