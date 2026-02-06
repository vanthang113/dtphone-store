import Link from 'next/link';
import { ChevronRight, Star } from 'lucide-react';

export default function ReviewList() {
  const reviews = [
    {
      name: "Dương Ngọc Ánh",
      stars: 4,
      comment: "giao hàng nhanh nhưng hộp ngoài bị móp, bên trong hàng vẫn ổn",
      time: "1 tuần trước",
      note: "Tốt",
      boughtAt: "CellphoneS",
      tags: ["Hiệu năng Mạnh mẽ", "Thời lượng pin Khủng", "Màn hình Rất sắc nét"],
    },
    {
      name: "Đoàn Minh Thiện",
      stars: 4,
      comment: "100 điểm",
      time: "1 tháng trước",
      note: "Tuyệt vời",
      boughtAt: "CellphoneS",
      tags: ["Hiệu năng Mạnh mẽ", "Thời lượng pin Khủng", "Màn hình Rất sắc nét"],
    },
  ];

  return (
    <div className="flex flex-col gap-6 bg-white rounded-lg px-4 py-4 mt-4">
      {reviews.map((review) => (
        <div key={review.name} className="border-b pb-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
              {review.name.charAt(0)}
            </div>
            <div className="flex-1">
              <p className="text-black font-semibold">{review.name}</p>
              <div className="flex items-center gap-2 text-yellow-400 text-sm mt-1">
                {Array.from({ length: review.stars }, (_, i) => <Star key={i} className="text-yellow-400 text-xs" />)}
                <span className="text-gray-700 text-sm font-medium ml-2">{review.note}</span>
              </div>
              {review.boughtAt && (
                <p className="text-xs text-green-600 font-semibold mt-1">✓ Đã mua tại {review.boughtAt}</p>
              )}
              {review.tags && (
                <div className="text-black flex flex-wrap gap-2 mt-2">
                  {review.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <p className="text-sm text-gray-800 whitespace-pre-line mt-2">{review.comment}</p>
              <p className="text-xs text-gray-500 mt-1">Đánh giá đã đăng vào {review.time}</p>
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-center mt-6">
        <Link href="#" className="px-6 py-2 rounded-full border hover:bg-gray-100 text-sm bg-white font-medium flex">
          Xem tất cả đánh giá <ChevronRight className="mt-1 h-3 w-5" />
        </Link>
      </div>
    </div>
  );
}