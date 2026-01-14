import Link from 'next/link';
import { SmartphoneCharging, ShieldX, Cpu, Tickets } from 'lucide-react';

export default function ProductCommitmentSection() {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-black mb-4">Cam kết sản phẩm</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col p-4 bg-gray-50 rounded-2xl space-y-2">
          <div
            className="w-10 h-10 text-white font-bold text-sm rounded-full px-2 text-center hover:brightness-110 transition flex flex-col items-center justify-center leading-tight"
            style={{ background: 'linear-gradient(0deg, #00868B, #00868B)' }}
          >
            <SmartphoneCharging />
          </div>
          <p className="text-sm text-gray-800">Mới, đầy đủ phụ kiện từ nhà sản xuất</p>
        </div>
        <div className="flex flex-col p-4 bg-gray-50 rounded-2xl space-y-2">
          <div
            className="w-10 h-10 text-white font-bold text-sm rounded-full px-2 text-center hover:brightness-110 transition flex flex-col items-center justify-center leading-tight"
            style={{ background: 'linear-gradient(0deg, #00868B, #00868B)' }}
          >
            <ShieldX />
          </div>
          <p className="text-sm text-gray-800">
            Bảo hành 12 tháng tại trung tâm bảo hành Chính hãng. 1 đổi 1 trong 30 ngày nếu có lỗi phần cứng từ nhà sản xuất.
            <Link href="#" className="text-blue-600 ml-1">Xem chi tiết</Link>
          </p>
        </div>
        <div className="flex flex-col p-4 bg-gray-50 rounded-2xl space-y-2">
          <div
            className="w-10 h-10 text-white font-bold text-sm rounded-full px-2 text-center hover:brightness-110 transition flex flex-col items-center justify-center leading-tight"
            style={{ background: 'linear-gradient(0deg, #00868B, #00868B)' }}
          >
            <Cpu />
          </div>
          <div className="text-sm text-gray-800">
            <p>Samsung S24 Ultra</p>
            <p>2. Cáp truyền dữ liệu</p>
            <p>3. Que lấy sim</p>
            <p>* Galaxy S24 Ultra không bao gồm củ sạc.</p>
          </div>
        </div>
        <div className="flex flex-col p-4 bg-gray-50 rounded-2xl space-y-2">
          <div
            className="w-10 h-10 text-white font-bold text-sm rounded-full flex flex-col items-center justify-center"
            style={{ background: 'linear-gradient(0deg, #00868B, #00868B)' }}
          >
            <Tickets />
          </div>
          <p className="text-sm text-gray-800">
            Giá sản phẩm <strong>đã bao gồm thuế VAT</strong>, giúp bạn yên tâm và dễ dàng trong việc tính toán chi phí.
          </p>
        </div>
      </div>
    </div>
  );
}