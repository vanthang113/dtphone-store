import React from 'react';
import { PaymentFormData } from '@/context/PaymentFormContext';

interface CustomerInformationProps {
    formData: PaymentFormData;
}

const CustomerInformation: React.FC<CustomerInformationProps> = ({ formData }) => {
    const getDeliveryAddress = () => {
        if (formData.delivery.deliveryType === 'pickup') {
            return formData.delivery.storeAddress || 'Chưa chọn cửa hàng';
        } else {
            const { address, ward, district, province } = formData.delivery;
            return `${address}, ${ward}, ${district?.label}, ${province?.label}`;
        }
    };

    const getDeliveryType = () => {
        return formData.delivery.deliveryType === 'pickup' ? 'Nhận tại cửa hàng' : 'Giao hàng tận nơi';
    };

    return (
        <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-4">THÔNG TIN NHẬN HÀNG</h3>
            
            <div className="space-y-4 bg-white px-4 py-4 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Khách hàng</span>
                    <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">E-NEW</span>
                        <span className="text-sm">{formData.customer.name}</span>
                    </div>
                </div>
                
                <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Số điện thoại</span>
                    <span className="text-sm">{formData.customer.phone}</span>
                </div>
                
                <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Email</span>
                    <span className="text-sm text-red-600">{formData.customer.email}</span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Hình thức nhận hàng</span>
                    <span className="text-sm font-medium">{getDeliveryType()}</span>
                </div>
                
                <div className="flex justify-between items-start">
                    <span className="text-gray-600 text-sm">
                        {formData.delivery.deliveryType === 'pickup' ? 'Nhận hàng tại' : 'Giao hàng tới'}
                    </span>
                    <span className="text-sm text-right max-w-xs">{getDeliveryAddress()}</span>
                </div>

                {formData.delivery.deliveryType === 'delivery' && formData.delivery.receiverName && (
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 text-sm">Người nhận</span>
                        <span className="text-sm">{formData.delivery.receiverName}</span>
                    </div>
                )}
                
                {formData.delivery.note && (
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 text-sm">Ghi chú</span>
                        <span className="text-sm">{formData.delivery.note}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomerInformation;