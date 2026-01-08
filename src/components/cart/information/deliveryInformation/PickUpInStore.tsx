import React, { useState, useEffect } from 'react';
import Input from '../../input/Input';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from '@/components/ui/select';
import { getProvinces, getDistrictsByProvinceCode } from '@/services/locationService';
import { Province, District } from '@/types/location';
import { usePaymentForm } from '@/context/PaymentFormContext';

interface SelectOption {
  value: number | string;
  label: string;
}

const PickUpInStore = () => {
    const { formData, updateDeliveryInfo } = usePaymentForm();
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [loading, setLoading] = useState(false);
    const [storeOptions, setStoreOptions] = useState<SelectOption[]>([]);

    useEffect(() => {
        const fetchProvinces = async () => {
            setLoading(true);
            try {
                const data = await getProvinces();
                setProvinces(data);
            } catch (error) {
                console.error('Error fetching provinces:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProvinces();
    }, []);

    useEffect(() => {
        const fetchDistricts = async () => {
            if (formData.delivery.province) {
                setLoading(true);
                try {
                    const data = await getDistrictsByProvinceCode(Number(formData.delivery.province.value));
                    setDistricts(data);
                } catch (error) {
                    console.error('Error fetching districts:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                setDistricts([]);
            }
        };

        fetchDistricts();
    }, [formData.delivery.province]);

    // Mock store data - in real app this would come from API
    useEffect(() => {
        if (formData.delivery.district) {
            const mockStores = [
                { value: '1', label: 'CellphoneS Nguyễn Văn Cừ - 123 Nguyễn Văn Cừ, Q.5' },
                { value: '2', label: 'CellphoneS Lê Văn Việt - 456 Lê Văn Việt, Q.9' },
                { value: '3', label: 'CellphoneS Vincom Center - 789 Nguyễn Huệ, Q.1' }
            ];
            setStoreOptions(mockStores);
        } else {
            setStoreOptions([]);
        }
    }, [formData.delivery.district]);

    const handleProvinceChange = (option: SelectOption) => {
        updateDeliveryInfo({ 
            province: option,
            district: null,
            storeAddress: ''
        });
    };

    const handleDistrictChange = (option: SelectOption) => {
        updateDeliveryInfo({ 
            district: option,
            storeAddress: ''
        });
    };

    const handleStoreChange = (option: SelectOption) => {
        updateDeliveryInfo({ storeAddress: option.label });
    };

    const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateDeliveryInfo({ note: e.target.value });
    };

    const provinceOptions = provinces.map(province => ({
        value: province.code,
        label: province.name
    }));

    const districtOptions = districts.map(district => ({
        value: district.code,
        label: district.name
    }));

    const selectedStore = storeOptions.find(store => store.label === formData.delivery.storeAddress);

    return (
        <div className='grid grid-cols-2 gap-8 mb-4'>

                        <div>
                            <label className="block mb-1 text-sm font-medium">TỈNH/THÀNH PHỐ *</label>
                            <Select
                                value={formData.delivery.province?.value?.toString() ?? ''}
                                onValueChange={val => {
                                    const option = provinceOptions.find(opt => opt.value.toString() === val);
                                    if (option) handleProvinceChange(option);
                                }}
                                disabled={loading}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Chọn tỉnh/thành phố" />
                                </SelectTrigger>
                                <SelectContent>
                                    {provinceOptions.map(option => (
                                        <SelectItem key={option.value} value={option.value.toString()}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium">QUẬN/HUYỆN *</label>
                            <Select
                                value={formData.delivery.district?.value?.toString() ?? ''}
                                onValueChange={val => {
                                    const option = districtOptions.find(opt => opt.value.toString() === val);
                                    if (option) handleDistrictChange(option);
                                }}
                                disabled={loading || !formData.delivery.province}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Chọn quận/huyện" />
                                </SelectTrigger>
                                <SelectContent>
                                    {districtOptions.map(option => (
                                        <SelectItem key={option.value} value={option.value.toString()}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className='col-span-2'>
                            <label className="block mb-1 text-sm font-medium">Chọn địa chỉ cửa hàng *</label>
                            <Select
                                value={selectedStore?.value?.toString() ?? ''}
                                onValueChange={val => {
                                    const option = storeOptions.find(opt => opt.value.toString() === val);
                                    if (option) handleStoreChange(option);
                                }}
                                disabled={!formData.delivery.district}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Chọn cửa hàng gần bạn" />
                                </SelectTrigger>
                                <SelectContent>
                                    {storeOptions.map(option => (
                                        <SelectItem key={option.value} value={option.value.toString()}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
            
            <div className='col-span-2'>
                <Input 
                    label='Ghi chú khác nếu có' 
                    value={formData.delivery.note}
                    onChange={handleNoteChange}
                    // placeholder="Ghi chú thêm về việc nhận hàng"
                />
            </div>
        </div>
    );
};

export default PickUpInStore;