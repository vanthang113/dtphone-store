import Link from "next/link";
import { Star } from "lucide-react";

export default function ReviewSummary() {
  return (
    <div className="w-full bg-white rounded-lg mt-4 p-4">
      {/* Desktop giữ layout cũ: flex-row; Mobile sẽ wrap hợp lý */}
      <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
        {/* Khối điểm tổng */}
        <div className="flex flex-col items-center justify-center w-full lg:w-1/3 text-center">
          <p className="text-5xl font-bold text-gray-900">
            4.6<span className="text-2xl text-gray-400">/5</span>
          </p>

          <div className="flex text-yellow-400 my-2">
            <Star className="text-yellow-400 text-xs" />
            <Star className="text-yellow-400 text-xs" />
            <Star className="text-yellow-400 text-xs" />
            <Star className="text-yellow-400 text-xs" />
            <Star className="text-yellow-400 text-xs" />
          </div>

          <p className="text-sm text-gray-600">11 lượt đánh giá</p>

          <Link
            href="#"
            className="mt-4 px-4 py-2 bg-[#00868B] text-white rounded-lg hover:bg-[#00777B] transition"
          >
            Viết đánh giá
          </Link>
        </div>

        {/* ✅ Mobile: gom 2 khối lg:w-1/2 vào 1 grid để cân đối & song song */}
        <div className="w-full lg:w-[calc(100%-33.333333%)]">
          {/* sm: 2 cột song song, mobile nhỏ vẫn 1 cột; desktop giữ như cũ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row lg:items-stretch gap-4">
            {/* Khối thống kê sao */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center text-sm gap-1">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-2 mb-1">
                  <span className="text-gray-700 w-3 text-right">{star}</span>

                  <div className="flex text-yellow-400 text-xs shrink-0">
                    <Star className="text-yellow-400 text-xs" />
                  </div>

                  <div className="flex-1 bg-gray-300 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-yellow-400 h-2"
                      style={{ width: star === 5 ? "65%" : star === 4 ? "35%" : "0%" }}
                    />
                  </div>

                  <span className="text-gray-500 text-xs w-20 text-right shrink-0">
                    {star === 5 ? "7 đánh giá" : star === 4 ? "4 đánh giá" : "0 đánh giá"}
                  </span>
                </div>
              ))}
            </div>

            {/* ✅ Divider: mobile dùng ngang, desktop dùng dọc */}
            <div className="block lg:hidden h-px w-full bg-gray-200 my-1" />
            <div className="hidden lg:block w-px bg-gray-400 self-stretch mx-2" />

            {/* Khối trải nghiệm */}
            <div className="w-full lg:w-1/2">
              <h2 className="font-semibold mt-1 lg:mt-4">Đánh giá theo trải nghiệm</h2>

              {["Hiệu năng", "Thời lượng pin", "Màn hình"].map((item) => (
                <div
                  key={item}
                  className="text-black flex items-start justify-between mt-3 gap-3"
                >
                  <span className="shrink-0">{item}</span>

                  <div className="flex flex-col items-end gap-1">
                    <div className="flex text-yellow-400">
                      <Star className="text-yellow-400 text-xs" />
                      <Star className="text-yellow-400 text-xs" />
                      <Star className="text-yellow-400 text-xs" />
                      <Star className="text-yellow-400 text-xs" />
                      <Star className="text-yellow-400 text-xs" />
                    </div>
                    <span className="text-sm text-gray-600">4.7/5 (9 đánh giá)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* end grid */}
        </div>
      </div>
    </div>
  );
}
