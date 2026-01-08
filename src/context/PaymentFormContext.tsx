'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
}

export interface DeliveryInfo {
  deliveryType: 'pickup' | 'delivery';
  receiverName: string;
  province: { value: number | string; label: string } | null;
  district: { value: number | string; label: string } | null;
  ward: string;
  address: string;
  note: string;
  storeAddress?: string;
}

export interface PaymentFormData {
  customer: CustomerInfo;
  delivery: DeliveryInfo;
}

interface PaymentFormContextType {
  formData: PaymentFormData;
  updateCustomerInfo: (info: Partial<CustomerInfo>) => void;
  updateDeliveryInfo: (info: Partial<DeliveryInfo>) => void;
  isFormValid: () => boolean;
  resetForm: () => void;
}

const PaymentFormContext = createContext<PaymentFormContextType | undefined>(undefined);

export const usePaymentForm = () => {
  const context = useContext(PaymentFormContext);
  if (context === undefined) {
    throw new Error('usePaymentForm must be used within a PaymentFormProvider');
  }
  return context;
};

interface PaymentFormProviderProps {
  children: ReactNode;
}

export const PaymentFormProvider: React.FC<PaymentFormProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState<PaymentFormData>({
    customer: {
      name: 'A Đạt',
      phone: '0799009054',
      email: '',
    },
    delivery: {
      deliveryType: 'pickup',
      receiverName: '',
      province: null,
      district: null,
      ward: '',
      address: '',
      note: '',
      storeAddress: '',
    },
  });

  const updateCustomerInfo = (info: Partial<CustomerInfo>) => {
    setFormData(prev => ({
      ...prev,
      customer: { ...prev.customer, ...info }
    }));
  };

  const updateDeliveryInfo = (info: Partial<DeliveryInfo>) => {
    setFormData(prev => ({
      ...prev,
      delivery: { ...prev.delivery, ...info }
    }));
  };

  const isFormValid = (): boolean => {
    const { customer, delivery } = formData;
    
    // Validate customer information
    if (!customer.email.trim()) return false;
    
    // Validate delivery information based on type
    if (delivery.deliveryType === 'delivery') {
      return !!(
        delivery.receiverName.trim() &&
        delivery.province &&
        delivery.district &&
        delivery.ward.trim() &&
        delivery.address.trim()
      );
    } else {
      // For pickup, just need store address selection
      return !!delivery.storeAddress?.trim();
    }
  };

  const resetForm = () => {
    setFormData({
      customer: {
        name: 'A Đạt',
        phone: '0799009054',
        email: '',
      },
      delivery: {
        deliveryType: 'pickup',
        receiverName: '',
        province: null,
        district: null,
        ward: '',
        address: '',
        note: '',
        storeAddress: '',
      },
    });
  };

  const value: PaymentFormContextType = {
    formData,
    updateCustomerInfo,
    updateDeliveryInfo,
    isFormValid,
    resetForm,
  };

  return (
    <PaymentFormContext.Provider value={value}>
      {children}
    </PaymentFormContext.Provider>
  );
};