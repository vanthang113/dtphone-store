'use client';

import { ShieldCheck, CircleAlert } from 'lucide-react';

export default function WarrantyOptions() {
  return (
    <div className="mt-4 p-4 rounded-lg bg-[#f7f7f8]">
      <div className="flex items-center gap-2 mb-4">
        <ShieldCheck className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold">Chọn gói dịch vụ bảo hành</h3>
        <CircleAlert className="w-4 h-4 text-gray-500" />
      </div>
      <div className="flex flex-wrap gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <button
            key={index}
            className="w-[170px] p-3 bg-white border rounded-xl text-left hover:shadow-md cursor-pointer"
          >
            <div className="flex items-start space-x-1">
              <p className="text-sm font-semibold truncate w-full">
                S24+ 12 tháng00000000000000
              </p>
              <CircleAlert className="text-gray-500 w-3 h-3 mt-1" />
            </div>
            <p className="mt-1 text-sm font-bold text-red-600 flex items-start">1.600.000đ</p>
          </button>
        ))}
      </div>
    </div>
  );
}
