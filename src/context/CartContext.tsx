'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CartProduct {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  quantity: number;
  isSelected: boolean;
}

interface CartContextType {
  products: CartProduct[];
  setProducts: React.Dispatch<React.SetStateAction<CartProduct[]>>;
  selectedProducts: CartProduct[];
  totalAmount: number;
  updateProductQuantity: (id: string, quantity: number) => void;
  updateProductSelection: (id: string, isSelected: boolean) => void;
  removeProduct: (id: string) => void;
  selectAllProducts: (isSelected: boolean) => void;
  formatPrice: (price: number) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<CartProduct[]>([
    {
      id: '1',
      name: 'Quạt đứng Aqua AQS-FED3501R(W)-VN-Trắng',
      price: 890000,
      originalPrice: 1490000,
      image: '/images/fan.jpg',
      quantity: 1,
      isSelected: false,
    },
    {
      id: '2',
      name: 'Laptop Gaming MSI Katana 15 B13VFK-676VN',
      price: 25990000,
      originalPrice: 28990000,
      image: '/images/laptop.jpg',
      quantity: 1,
      isSelected: false,
    },
    {
      id: '3',
      name: 'iPhone 15 Pro Max 256GB - Titanium Natural',
      price: 32990000,
      originalPrice: 34990000,
      image: '/images/iphone.jpg',
      quantity: 1,
      isSelected: false,
    },
    {
      id: '4',
      name: 'Samsung Galaxy S24 Ultra 256GB',
      price: 29990000,
      originalPrice: 31990000,
      image: '/images/samsung.jpg',
      quantity: 1,
      isSelected: false,
    },
    {
      id: '5',
      name: 'MacBook Air M3 13 inch 256GB',
      price: 28990000,
      originalPrice: 30990000,
      image: '/images/macbook.jpg',
      quantity: 1,
      isSelected: false,
    },
    {
      id: '6',
      name: 'iPad Pro 12.9 inch M2 Wi-Fi 128GB',
      price: 26990000,
      originalPrice: 28990000,
      image: '/images/ipad.jpg',
      quantity: 1,
      isSelected: false,
    }
  ]);

  const selectedProducts = products.filter(product => product.isSelected);

  const totalAmount = selectedProducts.reduce(
    (total, product) => total + (product.price * product.quantity), 
    0
  );

  const updateProductQuantity = (id: string, quantity: number) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id ? { ...product, quantity: Math.max(1, quantity) } : product
      )
    );
  };

  const updateProductSelection = (id: string, isSelected: boolean) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id ? { ...product, isSelected } : product
      )
    );
  };

  const removeProduct = (id: string) => {
    setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
  };

  const selectAllProducts = (isSelected: boolean) => {
    setProducts(prevProducts =>
      prevProducts.map(product => ({ ...product, isSelected }))
    );
  };

  const formatPrice = (price: number): string => {
    return price.toLocaleString('vi-VN') + 'đ';
  };

  const value: CartContextType = {
    products,
    setProducts,
    selectedProducts,
    totalAmount,
    updateProductQuantity,
    updateProductSelection,
    removeProduct,
    selectAllProducts,
    formatPrice,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};