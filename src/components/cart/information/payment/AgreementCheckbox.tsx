import React, { useState } from 'react';

const AgreementCheckbox = () => {

    const [agreed, setAgreed] = useState(true);
    return (
        <div className="mb-6">
        <label className="flex items-start space-x-2 text-sm">
          <input 
            type="checkbox" 
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 w-4 h-4 text-red-600 rounded border-gray-300 focus:ring-red-500"
          />
          <span className="text-gray-600 leading-relaxed">
            Bằng việc Đặt hàng, bạn đồng ý với{' '}
            <span className="text-red-600 underline cursor-pointer">Điều khoản sử dụng</span>
            {' '}của CellphoneS. Và các giao dịch sẽ{' '}
            <span className="font-semibold">tự 10 truy tư lần</span>
            , CellphoneS sẽn pháp kiến trư thể công và{' '}
            <span className="font-semibold">CCCD</span>
            {' '}của đổng chủ thể{' '}
            <span className="font-semibold">trước khi tiến hành giao hàng</span>
            {' '}nhận hàng tại các hình thức giao hàng tạp các trường hợp gian lận.
          </span>
        </label>
      </div>
    );
};

export default AgreementCheckbox;