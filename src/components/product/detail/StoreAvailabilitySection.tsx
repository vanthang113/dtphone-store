import { PhoneCall, MapPin } from 'lucide-react';

export default function StoreAvailabilitySection() {
  return (
    <div
      className="mt-4 relative w-full h-[185px] bg-gray-200 rounded-lg overflow-hidden group"
      style={{ backgroundColor: '#f7f7f8' }}
    >
      <div className="flex items-center justify-between gap-x-4 px-4 py-2">
        <div>
          <h3 className="font-semibold text-base">Xem chi nhánh có hàng</h3>
          <p className="text-sm text-gray-600">
            Có <span className="text-blue-600 font-semibold">41</span> cửa hàng có sản phẩm
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            className="px-3 py-1 border rounded-md text-sm"
            style={{ backgroundColor: '#fff', color: 'black', borderColor: '#e4e4e7' }}
          >
            <option>Hồ Chí Minh</option>
          </select>
          <select
            className="px-3 py-1 border rounded-md text-sm"
            style={{ backgroundColor: '#fff', color: 'black', borderColor: '#e4e4e7' }}
          >
            <option>Quận/Huyện</option>
          </select>
        </div>
      </div>
      <div className="px-4">
        <div className="flex space-x-3 overflow-x-auto pt-2">
          <div
            className="w-[250px] border rounded-lg p-3 flex flex-col space-y-2"
            style={{ backgroundColor: '#fff', color: 'black', borderColor: '#e4e4e7' }}
          >
            <p className="text-sm text-gray-800">
              134 Nguyễn Thái Học, P. Phạm Ngũ Lão, Q.1, TP HCM
            </p>
            <div className="flex items-center space-x-2">
              <span className="bg-red-100 text-red-600 text-sm px-2 py-1 rounded-full flex items-center space-x-1">
                <PhoneCall className="h-3 w-3" />
                <span>02871000132</span>
              </span>
              <button className="flex items-center text-sm bg-gray-100 px-2 py-1 rounded-full">
                <MapPin className="h-3 w-3 mr-1" />
                Bản đồ
              </button>
            </div>
          </div>
          <div
            className="w-[250px] border rounded-lg p-3 flex flex-col space-y-2"
            style={{ backgroundColor: '#fff', color: 'black', borderColor: '#e4e4e7' }}
          >
            <p className="text-sm text-gray-800">
              157-159 Nguyễn Thị Minh Khai, P. Phạm Ngũ Lão, Q.1
            </p>
            <div className="flex items-center space-x-2">
              <span className="bg-red-100 text-red-600 text-sm px-2 py-1 rounded-full flex items-center space-x-1">
                <PhoneCall className="h-3 w-3" />
                <span>02871066159</span>
              </span>
              <button className="flex items-center text-sm bg-gray-100 px-2 py-1 rounded-full">
                <MapPin className="h-3 w-3 mr-1" />
                Bản đồ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}