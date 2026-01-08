import Link from 'next/link';

export default function ReviewFilters() {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      {["Tất cả", "Có hình ảnh", "Đã mua hàng", "5 sao", "4 sao", "3 sao", "2 sao", "1 sao"].map((filter) => (
        <Link
          key={filter}
          href="#"
          className={`px-3 py-1 rounded-full text-sm border ${filter === "Tất cả" ? 'bg-blue-100 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
        >
          {filter}
        </Link>
      ))}
    </div>
  );
}