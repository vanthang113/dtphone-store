// Mock data for hardcoded backend responses

// ============ AUTH DATA ============
export const mockUser = {
  user_id: 1,
  full_name: 'Lộc Trần Trân',
  email: 'loc@example.com',
  phone: '0789999930',
  gender: 'male',
  date_of_birth: '1990-01-15',
  avatar_url: '/images/robo-avatar.png',
  status: 'active',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-15T00:00:00Z',
};

export const mockLoginResponse = {
  access_token: 'mock_access_token_12345',
  refresh_token: 'mock_refresh_token_67890',
  token_type: 'Bearer',
};

// ============ PRODUCT DATA ============
export const mockProducts = [
  {
    product_id: 1,
    name: 'Samsung Galaxy S24 FE',
    price: 15990000,
    discount_price: 14990000,
    brand: 'Samsung',
    rating: 4.7,
    rating_count: 2340,
    color: 'Black',
    description: 'Điện thoại Samsung Galaxy S24 FE với màn hình 6.4 inch, pin 4000mAh',
    status: 'active',
    category_id: 1,
    sku: 'SGS24FE001',
    image: '/images/my_phone/dien-thoai-samsung-galaxy-s24-fe_3__4.webp',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
  },
  {
    product_id: 2,
    name: 'Xiaomi Redmi Note 14',
    price: 5990000,
    discount_price: 5490000,
    brand: 'Xiaomi',
    rating: 4.5,
    rating_count: 1856,
    color: 'Blue',
    description: 'Xiaomi Redmi Note 14 với màn hình AMOLED 6.67 inch',
    status: 'active',
    category_id: 1,
    sku: 'XMI14001',
    image: '/images/my_phone/dien-thoai-xiaomi-redmi-note-14_1__2.webp',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
  },
  {
    product_id: 3,
    name: 'iPhone 17 256GB',
    price: 29990000,
    discount_price: 28990000,
    brand: 'Apple',
    rating: 4.9,
    rating_count: 3100,
    color: 'Midnight',
    description: 'iPhone 17 với chip A19 Pro, camera 48MP',
    status: 'active',
    category_id: 1,
    sku: 'IPH17256',
    image: '/images/my_phone/iphone-17-256gb.webp',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
  },
  {
    product_id: 4,
    name: 'Oppo Reno 12 5G',
    price: 8990000,
    discount_price: 8490000,
    brand: 'Oppo',
    rating: 4.6,
    rating_count: 1450,
    color: 'Silver',
    description: 'Oppo Reno 12 5G với màn hình 120Hz',
    status: 'active',
    category_id: 1,
    sku: 'OPP12001',
    image: '/images/my_phone/New folder/dien-thoai-oppo-reno12-5g_5__5.webp',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
  },
  {
    product_id: 5,
    name: 'Vivo V40 Pro',
    price: 12990000,
    discount_price: 11990000,
    brand: 'Vivo',
    rating: 4.4,
    rating_count: 980,
    color: 'Gold',
    description: 'Vivo V40 Pro với camera xịn sò',
    status: 'active',
    category_id: 1,
    sku: 'VIV40PRO',
    image: '/images/my_phone/dien-thoai-vivo-v40-pro.webp',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
  },
  {
    product_id: 6,
    name: 'Realme 13 Pro',
    price: 8490000,
    discount_price: 7990000,
    brand: 'Realme',
    rating: 4.3,
    rating_count: 750,
    color: 'Green',
    description: 'Realme 13 Pro với chip tốt',
    status: 'active',
    category_id: 1,
    sku: 'RLM13PRO',
    image: '/images/my_phone/dien-thoai-realme-13-pro.webp',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
  },
];

// ============ CART DATA ============
export const mockCartItems = [
  {
    product_id: 1,
    name: 'Samsung Galaxy S24 FE',
    price: 15990000,
    quantity: 1,
    image: '/images/my_phone/dien-thoai-samsung-galaxy-s24-fe_3__4.webp',
    color: 'Black',
    storage: '256GB',
  },
];

export const mockCart = {
  cart_id: 1,
  user_id: 1,
  items: mockCartItems,
  total_price: 15990000,
  total_items: 1,
  created_at: '2024-01-15T00:00:00Z',
  updated_at: '2024-01-15T00:00:00Z',
};

// ============ CATEGORY DATA ============
export const mockCategories = [
  {
    category_id: 1,
    name: 'Điện thoại',
    description: 'Các mẫu điện thoại mới nhất',
    image: '/images/cellphones/dien-thoai.webp',
    status: 'active',
  },
  {
    category_id: 2,
    name: 'Phụ kiện Apple',
    description: 'Phụ kiện chính hãng cho Apple',
    image: '/images/my_phone/All_Phu_kien/pk-apple-cap-sac.webp',
    status: 'active',
  },
  {
    category_id: 3,
    name: 'Cáp sạc',
    description: 'Cáp sạc nhanh cho mọi thiết bị',
    image: '/images/my_phone/All_Phu_kien/cap-sac-hub.webp',
    status: 'active',
  },
];

// ============ ORDER DATA ============
export const mockOrders = [
  {
    order_id: 1,
    user_id: 1,
    total_price: 15990000,
    status: 'completed',
    payment_method: 'credit_card',
    delivery_address: '123 Đường ABC, Quận 1, TP.HCM',
    created_at: '2024-01-10T10:30:00Z',
    updated_at: '2024-01-12T15:45:00Z',
    items: [
      {
        product_id: 1,
        product_name: 'Samsung Galaxy S24 FE',
        quantity: 1,
        price: 15990000,
        image: '/images/my_phone/dien-thoai-samsung-galaxy-s24-fe_3__4.webp',
      },
    ],
  },
];

// ============ PROMOTION DATA ============
export const mockPromotions = [
  {
    promotion_id: 1,
    title: 'Giảm giá 10% toàn bộ điện thoại Samsung',
    description: 'Chương trình khuyến mãi dành cho thành viên S-NULL',
    discount_percent: 10,
    start_date: '2024-01-01T00:00:00Z',
    end_date: '2024-01-31T23:59:59Z',
    status: 'active',
  },
  {
    promotion_id: 2,
    title: 'Tặng phụ kiện khi mua iPhone',
    description: 'Tặng miễn phí ốp lưng khi mua iPhone 17',
    discount_type: 'gift',
    start_date: '2024-01-01T00:00:00Z',
    end_date: '2024-02-28T23:59:59Z',
    status: 'active',
  },
];

// ============ STORE DATA ============
export const mockStores = [
  {
    store_id: 1,
    name: 'DTPhone - Chi nhánh Quận 1',
    address: '123 Nguyễn Huệ, Quận 1, TP.HCM',
    phone: '028-1234-5678',
    email: 'q1@dtphone.vn',
    open_time: '09:00',
    close_time: '21:00',
    status: 'open',
  },
  {
    store_id: 2,
    name: 'DTPhone - Chi nhánh Quận 3',
    address: '456 Đường Tô Hiến Thành, Quận 3, TP.HCM',
    phone: '028-9876-5432',
    email: 'q3@dtphone.vn',
    open_time: '08:30',
    close_time: '21:30',
    status: 'open',
  },
];

// ============ PAYMENT DATA ============
export const mockPaymentMethods = [
  {
    id: 'credit_card',
    name: 'Thẻ tín dụng',
    icon: '/images/payment/credit-card.svg',
  },
  {
    id: 'debit_card',
    name: 'Thẻ ghi nợ',
    icon: '/images/payment/debit-card.svg',
  },
  {
    id: 'bank_transfer',
    name: 'Chuyển khoản ngân hàng',
    icon: '/images/payment/bank-transfer.svg',
  },
  {
    id: 'e_wallet',
    name: 'Ví điện tử',
    icon: '/images/payment/e-wallet.svg',
  },
  {
    id: 'cod',
    name: 'Thanh toán khi nhận hàng',
    icon: '/images/payment/cod.svg',
  },
];

// ============ UTILITY FUNCTIONS ============
export const getMockProductById = (id: number) => {
  return mockProducts.find((p) => p.product_id === id);
};

export const getMockProductsByCategory = (categoryId: number) => {
  return mockProducts.filter((p) => p.category_id === categoryId);
};

export const getMockOrderById = (id: number) => {
  return mockOrders.find((o) => o.order_id === id);
};

export const getRelatedProducts = (productId: number, limit: number = 6) => {
  const product = getMockProductById(productId);
  if (!product) return [];
  const related = getMockProductsByCategory(product.category_id);
  return related.filter((p) => p.product_id !== productId).slice(0, limit);
};
