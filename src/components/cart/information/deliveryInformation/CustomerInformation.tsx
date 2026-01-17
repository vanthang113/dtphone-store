import React from 'react';
import Input from '../../input/Input';
import { usePaymentForm } from '@/context/PaymentFormContext';

const CustomerInformation = () => {
    const { formData, updateCustomerInfo } = usePaymentForm();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateCustomerInfo({ email: e.target.value });
    };

    return (
        <div className="py-4">
            <h1 className='text-base text-black font-medium mb-0.5'>THÔNG TIN KHÁCH HÀNG</h1>

            <div className='bg-white flex flex-col gap-4 rounded-lg border border-gray-200 p-3 sm:p-4 mb-4'>
                <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0'>
                    <div className='text-xs sm:text-sm md:text-base text-black font-medium mr-0 sm:mr-0.5'>
                        {formData.customer.name} 
                        <span className='ml-1 text-green-500 text-sm rounded-xs px-0.5 border border-green-500'>
                            S - NEW
                        </span> 
                    </div> 
                    <div className='text-sm text-gray-600'>{formData.customer.phone}</div>
                </div>
                <div>
                    <Input 
                        name='email' 
                        id='email' 
                        label='Email *' 
                        type='email' 
                        value={formData.customer.email}
                        onChange={handleEmailChange}
                        required
                       
                    />
                </div>
                <div className='text-xs text-gray-600'>
                    <span>(*) Hóa đơn VAT sẽ được gửi qua email này</span>
                </div>
            </div>
        </div>
    );
};

export default CustomerInformation;