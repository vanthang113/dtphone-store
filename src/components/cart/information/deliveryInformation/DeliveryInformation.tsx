import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import React, { useState } from 'react';
import PickUpInStore from './PickUpInStore';
import DeliveryToYourDoor from './DeliveryToYourDoor';
import { usePaymentForm } from '@/context/PaymentFormContext';

const DeliveryInformation = () => {
    const { formData, updateDeliveryInfo } = usePaymentForm();
    const selectedTab = formData.delivery.deliveryType === 'pickup' ? 'pickUpInStore' : 'deliveryToYourDoor';

    const handleTabChange = (value: string) => {
        updateDeliveryInfo({
            deliveryType: value === 'pickUpInStore' ? 'pickup' : 'delivery',
            // Reset form fields when switching delivery type
            receiverName: '',
            province: null,
            district: null,
            ward: '',
            address: '',
            storeAddress: ''
        });
    };

    return (
        <div className='py-4'>
            <h1 className='text-base text-black font-medium mb-0.5'>THÔNG TIN NHẬN HÀNG</h1>

            <Tabs value={selectedTab} onValueChange={handleTabChange} defaultValue="pickUpInStore" className="bg-white flex flex-col gap-4 rounded-lg border border-gray-200">
                <TabsList className='grid grid-cols-2 bg-red-400 rounded-t-lg'>
                    <TabsTrigger className={`py-3 ${selectedTab === "pickUpInStore" ? "bg-red-400 rounded-tr-sm text-white" : "bg-gray-400 "}`} value="pickUpInStore">
                        Nhận tại cửa hàng
                    </TabsTrigger>
                    <TabsTrigger className={`py-3 ${selectedTab === "deliveryToYourDoor" ? "bg-red-400 rounded-tl-sm text-white" : "bg-gray-400"}`} value="deliveryToYourDoor">
                        Giao hàng tận nơi
                    </TabsTrigger>
                </TabsList>

                <div className='px-4 py-3 text-black'>
                    <TabsContent value="pickUpInStore">
                        <PickUpInStore />
                    </TabsContent>
                    <TabsContent value="deliveryToYourDoor">
                        <DeliveryToYourDoor />
                    </TabsContent>
                </div>
            </Tabs>

            <div className='text-xs my-2 text-black'>
                <span className='font-bold'>Mẹo:</span> Bạn có thể cài đặt Sổ địa chỉ tại <span className='font-bold'>Smember</span> để đặt hàng nhanh hơn.
            </div>
        </div>
    );
};

export default DeliveryInformation;