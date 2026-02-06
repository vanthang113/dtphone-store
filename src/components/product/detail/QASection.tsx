import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { ChevronRightIcon } from '@/components/icons/BannerMenuIcon';

export default function QASection() {
  const reviews = [
    {
      id: '1',
      name: "Dương Ngọc Ánh",
      stars: 4,
      comment: "giao hàng nhanh nhưng hộp ngoài bị móp, bên trong hàng vẫn ổn",
      time: "1 tuần trước",
      note: "Tốt",
      boughtAt: "CellphoneS",
      tags: ["Hiệu năng Mạnh mẽ", "Thời lượng pin Khủng", "Màn hình Rất sắc nét"],
    },
    {
      id: '2',
      name: "Đoàn Minh Thiện",
      stars: 4,
      comment: "100 điểm",
      time: "1 tháng trước",
      note: "Tuyệt vời",
      boughtAt: "CellphoneS",
      tags: ["Hiệu năng Mạnh mẽ", "Thời lượng pin Khủng", "Màn hình Rất sắc nét"],
    },
    {
      id: '3',
      name: "Đoàn Minh Thiện",
      stars: 4,
      comment: "100 điểm",
      time: "1 tháng trước",
      note: "Tuyệt vời",
      boughtAt: "CellphoneS",
      tags: ["Hiệu năng Mạnh mẽ", "Thời lượng pin Khủng", "Màn hình Rất sắc nét"],
    },
    {
      id: '4',
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
    <div className="w-full h-full rounded-lg bg-gray-100 mt-4 items-start md:items-center gap-4 p-4">
      <h1 className="text-black text-xl font-bold">Hỏi và đáp</h1>
      <div className="flex flex-col md:flex-row items-start md:items-center mt-4 bg-white rounded-lg p-4 gap-4">
        <Image
          src="/images/robo-avatar.png"
          alt="Bot"
          width={96}
          height={96}
          className="object-contain"
        />
        <div className="flex-1">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Hãy đặt câu hỏi cho chúng tôi</h2>
            <p className="text-sm text-gray-600">
              CellphoneS sẽ phản hồi trong vòng 1 giờ. Nếu Quý khách gửi câu hỏi sau 22h, chúng tôi sẽ trả lời vào sáng hôm sau. Thông tin có thể thay đổi theo thời gian, vui lòng đặt câu hỏi để nhận được cập nhật mới nhất!
            </p>
          </div>
          <div className="flex w-full mt-2">
            <input
              type="text"
              placeholder="Viết câu hỏi của bạn tại đây"
              className="flex-grow px-4 py-4 border rounded-lg outline-none text-sm bg-white mr-2"
            />
            <button className="bg-[#00868B] text-white px-4 py-4 rounded-lg flex items-center gap-1 hover:bg-[#00777B] text-sm">
              Gửi câu hỏi <ArrowRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 bg-white rounded-lg px-4 py-4 mt-4">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                {review.name.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="text-black font-semibold">{review.name}</p>
                <div className="flex items-center gap-2 text-yellow-400 text-sm mt-1">
                  {Array.from({ length: review.stars }, (_, i) => <Star key={i} className="text-yellow-400 text-sm" />)}
                  <span className="text-gray-700 text-sm font-medium ml-2">{review.note}</span>
                </div>
                {review.boughtAt && (
                  <p className="text-xs text-green-600 font-semibold mt-1">✓ Đã mua tại {review.boughtAt}</p>
                )}
                {review.tags && (
                  <div className=" text-black flex flex-wrap gap-2 mt-2">
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
          <Link href="#" className="text-white px-6 py-2 rounded-full border hover:bg-[#00868B] text-sm bg-[#00868B] font-medium flex">
            Xem tất cả đánh giá <ChevronRightIcon className="mt-1 h-3 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}