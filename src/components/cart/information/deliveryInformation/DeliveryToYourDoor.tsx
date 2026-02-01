import React, { useState, useEffect } from 'react';
import Input from '../../input/Input';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';
import { getProvinces, getDistrictsByProvinceCode } from '@/services/locationService';
import { Province, District } from '@/types/location';
import { usePaymentForm } from '@/context/PaymentFormContext';

interface SelectOption {
  value: number | string;
  label: string;
}

const DeliveryToYourDoor = () => {
  const { formData, updateDeliveryInfo } = usePaymentForm();
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [loading, setLoading] = useState(false);

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

  const handleReceiverNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateDeliveryInfo({ receiverName: e.target.value });
  };

  const handleProvinceChange = (option: SelectOption) => {
    updateDeliveryInfo({
      province: option,
      district: null,
    });
  };

  const handleDistrictChange = (option: SelectOption) => {
    updateDeliveryInfo({ district: option });
  };

  const handleWardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateDeliveryInfo({ ward: e.target.value });
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateDeliveryInfo({ address: e.target.value });
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateDeliveryInfo({ note: e.target.value });
  };

  const provinceOptions = provinces.map((province) => ({
    value: province.code,
    label: province.name,
  }));

  const districtOptions = districts.map((district) => ({
    value: district.code,
    label: district.name,
  }));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mb-4">
      <Input
        label="Tên người nhận *"
        value={formData.delivery.receiverName}
        onChange={handleReceiverNameChange}
        required
      />
      <Input label="Số điện thoại *" value={formData.customer.phone} disabled />

      <div>
        <label className="block mb-1 text-sm font-medium">TỈNH/THÀNH PHỐ *</label>
        <Select
          value={formData.delivery.province?.value?.toString() ?? ''}
          onValueChange={(val) => {
            const option = provinceOptions.find((opt) => opt.value.toString() === val);
            if (option) handleProvinceChange(option);
          }}
          disabled={loading}
        >
          <SelectTrigger className="w-full" />
          <SelectContent>
            {provinceOptions.map((option) => (
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
          onValueChange={(val) => {
            const option = districtOptions.find((opt) => opt.value.toString() === val);
            if (option) handleDistrictChange(option);
          }}
          disabled={loading || !formData.delivery.province}
        >
          <SelectTrigger className="w-full" />
          <SelectContent>
            {districtOptions.map((option) => (
              <SelectItem key={option.value} value={option.value.toString()}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Input label="PHƯỜNG/XÃ *" value={formData.delivery.ward} onChange={handleWardChange} required />
      <Input label="Số nhà, tên đường *" value={formData.delivery.address} onChange={handleAddressChange} required />

      <div className="col-span-2">
        <Input label="Ghi chú khác nếu có" value={formData.delivery.note} onChange={handleNoteChange} />
      </div>
    </div>
  );
};

export default DeliveryToYourDoor;
