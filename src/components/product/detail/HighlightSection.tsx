import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import NewsItem from './NewsItem';

type HighlightSectionProps = {
  slug: string;
};

export default function HighlightSection({ }: HighlightSectionProps) {
  return (
    <div className="mt-4">
      <div className="max-w-[1200px] mx-auto ">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full h-full sm:w-1/1 bg-gray-100 rounded-2xl p-4">
            <h1 className="text-2xl font-bold mb-2">Đặc điểm nổi bật</h1>
            <div className="bg-white rounded-lg p-2 inline-block max-w-full mt-2">
              <p className="">
                <b className="text-red-500">iPad A16 11 inch</b> được trang bị chip A16 Bionic với 5 nhân CPU và 16 nhân Neural Engine, giúp xử lý đa nhiệm nhanh chóng và nâng cao hiệu suất đồ họa. Màn hình Liquid Retina 11 inch 2360 x 1640 pixel.
              </p>
            </div>
            <div className="flex flex-col bg-white rounded-lg px-2 py-1 mt-4">
              <h1 className="text-2xl font-bold mt-2">So sánh máy tính bảng iPad A16 11 inch với iPad Air 11 inch M3</h1>
              <p>iPad A16 11 inch và iPad Air 11 inch M3 được ra mắt cùng năm vậy hai thế hệ iPad này có điểm gì giống và khác, hãy cùng so sánh chi tiết:</p>
            </div>
          </div>
          <div className="w-full h-[350px] sm:w-1/2 bg-gray-100 rounded-lg px-4 py-4">
            <div className="flex justify-between">
              <h1 className="text-xl font-bold">Tin tức sản phẩm</h1>
              <Link href="Xem tất cả" className="text-blue-600 text-sm flex items-center hover:underline">
                xem tất cả <ChevronRight />
              </Link>
            </div>
            <div className="grid grid-cols-1 py-4 gap-y-4">
              <NewsItem />
              <NewsItem />
              <NewsItem />
              <NewsItem />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}