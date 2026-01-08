'use client';

import React from 'react';
import { SlidingBanner } from '@/components/layout/SlidingBanner';
import { RightBanner } from '@/components/layout/RightBanner';
import { ProductListSection } from '@/components/product/ProductListSection';
import { CategorySection } from '@/components/category/CategorySection';
import { PaymentBannerSection } from '@/components/banner/PaymentBannerSection';

// Định nghĩa interface
export interface Product {
  id: string;
  name: string;
  image: string;
  alt: string;
  price: number;
  originalPrice?: number;
  sNullPrice?: number;
  sStudentDiscount?: number;
  promotion?: string;
  rating: number;
  discount?: number;
}

export interface CategoryItem {
  title: string;
  imageUrl: string;
  link: string;
}

// Hàm tiện ích
export const createSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Thay thế ký tự không phải chữ/số bằng dấu gạch ngang
    .replace(/(^-|-$)/g, ''); // Xóa dấu gạch ngang ở đầu/cuối
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
};

// Dữ liệu cho nhiều CategorySection
export const categoryData = [
  {
    title: "Phụ kiện Apple",
    categoryLink: "/categories/apple-accessories",
    relatedTags: [],
    categories: [
      { title: "Phụ kiện Apple", imageUrl: '/images/my_phone/All_Phu_kien/pk-apple-cap-sac.webp', link: '/categories/phu-kien-apple' },
      { title: "Cáp sạc", imageUrl: '/images/my_phone/All_Phu_kien/cap-sac-hub.webp', link: '/categories/cap-sac' },
      { title: "Pin sạc dự phòng", imageUrl: '/images/my_phone/All_Phu_kien/pin-du-phong-20000-mah.webp', link: '/categories/pin-sac-du-phong' },
      { title: "Ốp lưng - Bao da", imageUrl: '/images/my_phone/All_Phu_kien/op-bao-da-sam-sung-s24.webp', link: '/categories/op-lung-bao-da' },
      { title: "Đàn màn hình", imageUrl: '/images/my_phone/All_Phu_kien/dan-man-hinh-iphone-15.webp', link: '/categories/dan-man-hinh' },
      { title: "Thẻ nhớ, USB", imageUrl: '/images/my_phone/All_Phu_kien/the-nho-usb-otg-the-nho-usb.webp', link: '/categories/the-nho-usb' },
      { title: "Gaming Gear, Playstation", imageUrl: '/images/my_phone/All_Phu_kien/gaming-gear-play-staytion.webp', link: '/categories/gaming-gear' },
      { title: "Sim 4G", imageUrl: '/images/my_phone/All_Phu_kien/sim-sim-4g.webp', link: '/categories/sim-4g' },
      { title: "Thiết bị mạng", imageUrl: '/images/my_phone/All_Phu_kien/thiet-bi-phat-song-wifi-router-wifi.webp', link: '/categories/thiet-bi-mang' },
      { title: "Camera", imageUrl: '/images/my_phone/All_Phu_kien/camera-may-anh.webp', link: '/categories/camera' },
      { title: "Gimbal", imageUrl: '/images/my_phone/All_Phu_kien/camera-gimbal.webp', link: '/categories/gimbal' },
      { title: "Flycam", imageUrl: '/images/my_phone/All_Phu_kien/camera-flycam.webp', link: '/categories/flycam' },
      { title: "Máy ảnh", imageUrl: '/images/my_phone/All_Phu_kien/camera-hanh-trinh-trong-nha.webp', link: '/categories/may-anh' },
      { title: "Chuột, bàn phím", imageUrl: '/images/my_phone/All_Phu_kien/phu-kien-ban-phim-chuot.webp', link: '/categories/chuot-ban-phim' },
      { title: "Balo, túi xách", imageUrl: '/images/my_phone/All_Phu_kien/balo-tui-chong-soc-laptop-17inch.webp', link: '/categories/balo-tui-xach' },
      { title: "Hub chuyển đổi", imageUrl: '/images/my_phone/All_Phu_kien/cap-sac-hub.webp', link: '/categories/hub-chuyen-doi' },
      { title: "Phụ kiện điện thoại", imageUrl: '/images/my_phone/All_Phu_kien/pk-phu-kien-dien-thoai.webp', link: '/categories/phu-kien-dien-thoai' },
      { title: "Phụ kiện Laptop", imageUrl: '/images/my_phone/All_Phu_kien/pk-may-tinh-laptop-camera.webp', link: '/categories/phu-kien-laptop' },
    ],
  },
];

// Dữ liệu cho nhiều ProductListSection
export const productData = [
  {
    title: "Sản phẩm nổi bật",
    categoryLink: "/categories/featured-phones",
    relatedTags: ["Samsung", "Xiaomi", "iPhone"],
    isHiddenOnHome: false,
    products: [
      {
        id: "samsung-galaxy-s24-fe",
        name: "Samsung Galaxy S24 FE",
        image: "/images/my_phone/dien-thoai-samsung-galaxy-s24-fe_3__4.webp",
        alt: "Samsung Galaxy S24 FE",
        price: 15990000,
        originalPrice: 17990000,
        sNullPrice: 14990000,
        sStudentDiscount: 500000,
        promotion: "Giảm thêm 1 triệu khi mua kèm ốp lưng",
        rating: 4.7,
        discount: 11,
      },
      {
        id: "xiaomi-redmi-note-14",
        name: "Xiaomi Redmi Note 14",
        image: "/images/my_phone/dien-thoai-xiaomi-redmi-note-14_1__2.webp",
        alt: "Xiaomi Redmi Note 14",
        price: 5990000,
        originalPrice: 6990000,
        sNullPrice: 5790000,
        sStudentDiscount: 200000,
        promotion: "Tặng sạc nhanh 33W",
        rating: 4.5,
        discount: 14,
      },
      {
        id: "iphone-17-256gb",
        name: "iPhone 17 256GB",
        image: "/images/my_phone/iphone_17_256gb-3.webp",
        alt: "iPhone 17 256GB",
        price: 25990000,
        originalPrice: 27990000,
        sNullPrice: 24990000,
        sStudentDiscount: 1000000,
        promotion: "Tặng tai nghe AirPods khi mua trong tuần",
        rating: 4.9,
        discount: 7,
      },
      {
        id: "iphone-15-plus",
        name: "iPhone 15 Plus",
        image: "/images/my_phone/iphone-15-plus_1_.webp",
        alt: "iPhone 15 Plus",
        price: 19990000,
        originalPrice: 21990000,
        sNullPrice: 18990000,
        sStudentDiscount: 500000,
        promotion: "Giảm 2 triệu khi đổi máy cũ",
        rating: 4.8,
        discount: 9,
      },
      {
        id: "iphone-16-pro-max",
        name: "iPhone 16 Pro Max",
        image: "/images/my_phone/iphone-16-pro-max.webp",
        alt: "iPhone 16 Pro Max",
        price: 32990000,
        originalPrice: 34990000,
        sNullPrice: 31990000,
        sStudentDiscount: 1000000,
        promotion: "Miễn phí trả góp 0% trong 6 tháng",
        rating: 4.9,
        discount: 6,
      },
    ],
  },
  {
    title: "Flash Sale",
    categoryLink: "/categories/gaming-laptops",
    relatedTags: ["Asus", "Lenovo", "HP"],
    isHiddenOnHome: false,
    products: [
      {
        id: "asus-gaming-laptop-1",
        name: "Asus ROG Strix G16",
        image: "/images/my_phone/laptop_gaming/text_d_i_1__3_8.webp",
        alt: "Asus ROG Strix G16",
        price: 29990000,
        originalPrice: 32990000,
        sNullPrice: 28990000,
        sStudentDiscount: 1000000,
        promotion: "Tặng chuột gaming khi mua trong tháng",
        rating: 4.8,
        discount: 9,
      },
      {
        id: "lenovo-gaming-laptop-1",
        name: "Lenovo Legion 5 Pro",
        image: "/images/my_phone/laptop_gaming/text_d_i_1__4_8.png",
        alt: "Lenovo Legion 5 Pro",
        price: 27990000,
        originalPrice: 30990000,
        sNullPrice: 26990000,
        sStudentDiscount: 800000,
        promotion: "Giảm 1,5 triệu khi mua kèm bàn phím",
        rating: 4.7,
        discount: 10,
      },
      {
        id: "hp-gaming-laptop-1",
        name: "HP Omen 16",
        image: "/images/my_phone/laptop_gaming/text_d_i_1__4_10.webp",
        alt: "HP Omen 16",
        price: 31990000,
        originalPrice: 34990000,
        sNullPrice: 30990000,
        sStudentDiscount: 1200000,
        promotion: "Tặng balo gaming trị giá 2 triệu",
        rating: 4.9,
        discount: 8,
      },
      {
        id: "asus-gaming-laptop-2",
        name: "Asus TUF Gaming A15",
        image: "/images/my_phone/laptop_gaming/text_d_i_7_36.webp",
        alt: "Asus TUF Gaming A15",
        price: 25990000,
        originalPrice: 28990000,
        sNullPrice: 24990000,
        sStudentDiscount: 700000,
        promotion: "Miễn phí bảo hành mở rộng 1 năm",
        rating: 4.6,
        discount: 10,
      },
      {
        id: "lenovo-gaming-laptop-2",
        name: "Lenovo LOQ 15",
        image: "/images/my_phone/laptop_gaming/text_d_i_15__1_2.webp",
        alt: "Lenovo LOQ 15",
        price: 23990000,
        originalPrice: 26990000,
        sNullPrice: 22990000,
        sStudentDiscount: 600000,
        promotion: "Giảm 10% khi mua kèm tai nghe",
        rating: 4.7,
        discount: 11,
      },
    ],
  },
  // Nhóm sản phẩm cho từng danh mục con của "Phụ kiện Apple"
  {
    title: "Danh mục nổi bật",
    categoryLink: "/categories/phu-kien-apple",
    relatedTags: ["Apple", "Tai nghe", "Sạc"],
    isHiddenOnHome: true,
    products: [
      {
        id: "apple-group-117-1",
        name: "Phụ kiện Apple Group 117",
        image: "/images/my_phone/Phu_kien_apple/group_117_1.webp",
        alt: "Phụ kiện Apple Group 117",
        price: 5990000,
        originalPrice: 6490000,
        sNullPrice: 5790000,
        sStudentDiscount: 200000,
        promotion: "Giảm 5% khi mua cùng iPhone",
        rating: 4.9,
        discount: 7,
      },
      {
        id: "apple-pencil-usb-c",
        name: "Apple Pencil USB-C",
        image: "/images/my_phone/Phu_kien_apple/apple-pencil-usb-c-thumb.webp",
        alt: "Apple Pencil USB-C",
        price: 2990000,
        originalPrice: 3490000,
        sNullPrice: 2890000,
        sStudentDiscount: 100000,
        promotion: "Tặng đầu cọ thay thế khi mua",
        rating: 4.8,
        discount: 14,
      },
      {
        id: "apple-airpods-max",
        name: "Apple AirPods Max",
        image: "/images/my_phone/Phu_kien_apple/apple-airpods-max-1_1.webp",
        alt: "Apple AirPods Max",
        price: 13990000,
        originalPrice: 15990000,
        sNullPrice: 13500000,
        sStudentDiscount: 500000,
        promotion: "Tặng hộp đựng khi mua trong tháng",
        rating: 4.9,
        discount: 12,
      },
      {
        id: "apple-airpods-4",
        name: "Apple AirPods 4",
        image: "/images/my_phone/Phu_kien_apple/apple-airpods-4-thumb.webp",
        alt: "Apple AirPods 4",
        price: 4990000,
        originalPrice: 5490000,
        sNullPrice: 4790000,
        sStudentDiscount: 200000,
        promotion: "Giảm 10% khi mua cùng iPhone",
        rating: 4.7,
        discount: 9,
      },
      {
        id: "apple-airtag",
        name: "Apple AirTag",
        image: "/images/my_phone/Phu_kien_apple/airtag.webp",
        alt: "Apple AirTag",
        price: 790000,
        originalPrice: 890000,
        sNullPrice: 750000,
        sStudentDiscount: 40000,
        promotion: "Tặng vòng đeo khi mua 2 chiếc",
        rating: 4.6,
        discount: 11,
      },
    ],
  },
  {
    title: "Cáp sạc",
    categoryLink: "/categories/cap-sac",
    relatedTags: ["USB-C", "Lightning", "Sạc nhanh"],
    isHiddenOnHome: true,
    products: [
      {
        id: "apple-usb-c-cable-1m",
        name: "Cáp sạc Apple USB-C to Lightning 1m",
        image: "/images/my_phone/Cap_sac/cap-aukey-usb-c-to-lightning-mfi-cb-cl5-1-2m.webp",
        alt: "Cáp sạc Apple USB-C to Lightning 1m",
        price: 590000,
        originalPrice: 690000,
        sNullPrice: 550000,
        sStudentDiscount: 40000,
        promotion: "Giảm 50.000đ khi mua cùng iPhone",
        rating: 4.8,
        discount: 14,
      },
      {
        id: "apple-usb-c-20w",
        name: "Cáp sạc Apple USB-C 20W",
        image: "/images/my_phone/Cap_sac/cap-type-c-ti-type-c-apple-240w-2m_1.webp",
        alt: "Cáp sạc Apple USB-C 20W",
        price: 790000,
        originalPrice: 890000,
        sNullPrice: 750000,
        sStudentDiscount: 50000,
        promotion: "Tặng kèm túi đựng cáp",
        rating: 4.7,
        discount: 11,
      },
      {
        id: "baseus-crystal-shine-1-2m-1",
        name: "Cáp Baseus Crystal Shine USB-C to Lightning 1.2m",
        image: "/images/my_phone/Cap_sac/cap-type-c-to-lightning-baseus-crystal-shine-1-2m_1_.webp",
        alt: "Cáp Baseus Crystal Shine USB-C to Lightning 1.2m",
        price: 350000,
        originalPrice: 450000,
        sNullPrice: 330000,
        sStudentDiscount: 20000,
        promotion: "Tặng móc khóa khi mua 2 chiếc",
        rating: 4.6,
        discount: 22,
      },
      {
        id: "baseus-crystal-shine-1-2m-2",
        name: "Cáp Baseus Crystal Shine USB-C to Lightning 1.2m (Phiên bản 2)",
        image: "/images/my_phone/Cap_sac/cap-type-c-to-lightning-baseus-crystal-shine-1-2m_1_.webp",
        alt: "Cáp Baseus Crystal Shine USB-C to Lightning 1.2m (Phiên bản 2)",
        price: 360000,
        originalPrice: 460000,
        sNullPrice: 340000,
        sStudentDiscount: 20000,
        promotion: "Giảm 30.000đ khi mua cùng sạc",
        rating: 4.7,
        discount: 21,
      },
    ],
  },
  {
    title: "Pin sạc dự phòng",
    categoryLink: "/categories/pin-sac-du-phong",
    relatedTags: ["MagSafe", "Apple", "Dung lượng cao"],
    isHiddenOnHome: true,
    products: [
      {
        id: "apple-power-bank-10000",
        name: "Pin dự phòng Apple MagSafe 10000mAh",
        image: "/images/my_phone/Pin_du_phong/frame_511_5_.webp",
        alt: "Pin dự phòng Apple MagSafe 10000mAh",
        price: 2490000,
        originalPrice: 2990000,
        sNullPrice: 2390000,
        sStudentDiscount: 100000,
        promotion: "Giảm 100.000đ cho sinh viên",
        rating: 4.9,
        discount: 16,
      },
      {
        id: "aukey-power-bank-10000",
        name: "Pin sạc dự phòng Aukey 10000mAh PD 20W",
        image: "/images/my_phone/Pin_du_phong/pin-sac-du-phong-aukey-10000mah-pd-20w-pb-n83s.webp",
        alt: "Pin sạc dự phòng Aukey 10000mAh PD 20W",
        price: 1290000,
        originalPrice: 1490000,
        sNullPrice: 1250000,
        sStudentDiscount: 50000,
        promotion: "Tặng cáp sạc khi mua",
        rating: 4.7,
        discount: 13,
      },
      {
        id: "ugreen-magnetic-power-bank-10000",
        name: "Pin sạc dự phòng không dây Ugreen Magnetic 10000mAh 20W",
        image: "/images/my_phone/Pin_du_phong/pin-sac-du-phong-khong-day-ugreen-magnetic-pb561-10-000mah-20w.webp",
        alt: "Pin sạc dự phòng không dây Ugreen Magnetic 10000mAh 20W",
        price: 1990000,
        originalPrice: 2290000,
        sNullPrice: 1890000,
        sStudentDiscount: 100000,
        promotion: "Giảm 50.000đ khi mua cùng iPhone",
        rating: 4.8,
        discount: 13,
      },
      {
        id: "xiaomi-power-bank-10000",
        name: "Pin sạc dự phòng Xiaomi 10000mAh 22.5W",
        image: "/images/my_phone/Pin_du_phong/sac-pin-du-phong-xiaomi-10000mah-22-5w.webp",
        alt: "Pin sạc dự phòng Xiaomi 10000mAh 22.5W",
        price: 890000,
        originalPrice: 1090000,
        sNullPrice: 850000,
        sStudentDiscount: 40000,
        promotion: "Tặng dây sạc 1m",
        rating: 4.6,
        discount: 18,
      },
      {
        id: "xiaomi-fast-charge",
        name: "Pin sạc nhanh Xiaomi",
        image: "/images/my_phone/Pin_du_phong/xiao-mi-sac-nhanh.webp",
        alt: "Pin sạc nhanh Xiaomi",
        price: 1190000,
        originalPrice: 1390000,
        sNullPrice: 1150000,
        sStudentDiscount: 50000,
        promotion: "Giảm 10% khi mua 2 chiếc",
        rating: 4.7,
        discount: 14,
      },
    ],
  },
  {
    title: "Ốp lưng - Bao da",
    categoryLink: "/categories/op-lung-bao-da",
    relatedTags: ["iPhone", "Silicone", "Leather"],
    isHiddenOnHome: true,
    products: [
      {
        id: "apple-iphone-case-14pro",
        name: "Ốp lưng iPhone 14 Pro Silicone",
        image: "/images/my_phone/Op_lung_bao_da/op-lung-iphone-14-apple-silicone-case-with-magsafe.webp",
        alt: "Ốp lưng iPhone 14 Pro Silicone",
        price: 1290000,
        originalPrice: 1490000,
        sNullPrice: 1250000,
        sStudentDiscount: 50000,
        promotion: "Tặng khăn lau màn hình",
        rating: 4.6,
        discount: 13,
      },
      {
        id: "apple-leather-case-15promax",
        name: "Bao da iPhone 15 Pro Max Leather",
        image: "/images/my_phone/Op_lung_bao_da/group_112_1_1.webp",
        alt: "Bao da iPhone 15 Pro Max Leather",
        price: 1990000,
        originalPrice: 2290000,
        sNullPrice: 1950000,
        sStudentDiscount: 70000,
        promotion: "Bảo hành 1 đổi 1 trong 6 tháng",
        rating: 4.8,
        discount: 13,
      },
      {
        id: "zagg-iphone-14-case",
        name: "Ốp lưng iPhone 14 Zagg with MagSafe",
        image: "/images/my_phone/Op_lung_bao_da/op-lung-iphone-14-zagg-with-magsafe.webp",
        alt: "Ốp lưng iPhone 14 Zagg with MagSafe",
        price: 1490000,
        originalPrice: 1690000,
        sNullPrice: 1450000,
        sStudentDiscount: 60000,
        promotion: "Tặng dán màn hình khi mua",
        rating: 4.7,
        discount: 12,
      },
      {
        id: "apple-iphone-16promax-clear",
        name: "Ốp lưng iPhone 16 Pro Max Apple MagSafe Clear",
        image: "/images/my_phone/Op_lung_bao_da/op-lung-iphone-16-pro-max-apple-magsafe-clear_1_.webp",
        alt: "Ốp lưng iPhone 16 Pro Max Apple MagSafe Clear",
        price: 1790000,
        originalPrice: 1990000,
        sNullPrice: 1750000,
        sStudentDiscount: 70000,
        promotion: "Giảm 5% khi mua cùng iPhone 16",
        rating: 4.9,
        discount: 10,
      },
      {
        id: "custom-iphone-case-2025",
        name: "Ốp lưng iPhone Custom 2025",
        image: "/images/my_phone/Op_lung_bao_da/text_ng_n_-_2025-05-22t093351.559.webp",
        alt: "Ốp lưng iPhone Custom 2025",
        price: 990000,
        originalPrice: 1290000,
        sNullPrice: 950000,
        sStudentDiscount: 40000,
        promotion: "Tặng sticker cá nhân hóa",
        rating: 4.5,
        discount: 23,
      },
    ],
  },
  {
    title: "Thẻ nhớ, USB",
    categoryLink: "/categories/the-nho-usb",
    relatedTags: ["USB", "Thẻ nhớ", "Lưu trữ"],
    isHiddenOnHome: true,
    products: [
      {
        id: "apple-usb-128gb",
        name: "USB Apple 128GB",
        image: "/images/my_phone/The_nho/text_ng_n_-_2025-06-05t140104.910.webp",
        alt: "USB Apple 128GB",
        price: 890000,
        originalPrice: 990000,
        sNullPrice: 850000,
        sStudentDiscount: 40000,
        promotion: "Tặng dây đeo khi mua",
        rating: 4.6,
        discount: 10,
      },
      {
        id: "sandisk-microsdhc-256gb",
        name: "Thẻ nhớ microSDHC SanDisk Ultra A1 256GB 150MB/s",
        image: "/images/my_phone/The_nho/the-nho-microsdhc-sandisk-ultra-a1-256gb-150mbs.webp",
        alt: "Thẻ nhớ microSDHC SanDisk Ultra A1 256GB 150MB/s",
        price: 1290000,
        originalPrice: 1490000,
        sNullPrice: 1250000,
        sStudentDiscount: 50000,
        promotion: "Tặng adapter khi mua",
        rating: 4.8,
        discount: 13,
      },
      {
        id: "sandisk-usb-3-1-128gb",
        name: "USB 3.1 SanDisk Ultra Dual 128GB Type-C",
        image: "/images/my_phone/The_nho/usb-3-1-sandisk-ultra-dual-128gb-type-c-ddc4.webp",
        alt: "USB 3.1 SanDisk Ultra Dual 128GB Type-C",
        price: 750000,
        originalPrice: 890000,
        sNullPrice: 720000,
        sStudentDiscount: 30000,
        promotion: "Giảm 50.000đ khi mua 2 chiếc",
        rating: 4.7,
        discount: 15,
      },
      {
        id: "kingston-usb-3-2-64gb",
        name: "USB 3.2 Kingston DataTraveler Exodia Onyx 64GB",
        image: "/images/my_phone/The_nho/usb-3-2-kingston-datatraveler-exodia-onyx-64gb.webp",
        alt: "USB 3.2 Kingston DataTraveler Exodia Onyx 64GB",
        price: 450000,
        originalPrice: 550000,
        sNullPrice: 430000,
        sStudentDiscount: 20000,
        promotion: "Tặng móc khóa khi mua",
        rating: 4.5,
        discount: 18,
      },
      {
        id: "custom-usb-2025",
        name: "USB Custom 2025",
        image: "/images/my_phone/The_nho/text_ng_n_-_2025-08-04t102100.044_1_1.webp",
        alt: "USB Custom 2025",
        price: 990000,
        originalPrice: 1190000,
        sNullPrice: 950000,
        sStudentDiscount: 40000,
        promotion: "Tặng khắc chữ miễn phí",
        rating: 4.6,
        discount: 16,
      },
    ],
  }
];

// Dữ liệu cho PaymentBannerSection
export const paymentBanners = [
  { href: "/promotions/techcombank", src: "/images/Uu_dai_thanh_toan/acbbank.webp", alt: "iphone techcombank" },
  { href: "/promotions/mbbank", src: "/images/Uu_dai_thanh_toan/hsbcneeeeew.webp", alt: "iphone mbbank" },
  { href: "/promotions/acb", src: "/images/Uu_dai_thanh_toan/kdooo.webp", alt: "iphone acb" },
  { href: "/promotions/hsbc", src: "/images/Uu_dai_thanh_toan/vibbbsbcb.webp", alt: "hsbc iphone" },
];

export default function HomePage() {
  return (
    <section className="box-border block h-full mx-auto relative w-full max-w-[1200px] py-2 px-2 bg-white">
      {/* Menu banner */}
      <div className="mb-3 w-full h-[400px]">
        {/* Top Home Section */}
        <div className="flex flex-row flex-nowrap gap-4 h-full">
          <SlidingBanner
            slides={[
              { src: '/images/banner/iPhone-17-Pro-PRE-home-0925.webp', alt: 'Mừng khai trương ưu đãi cực khủng', href: '/promotions/opening' },
              { src: '/images/banner/galaxy-s25-fe-home-0925.webp', alt: 'Slide 2', href: '/promotions/slide2' },
              { src: '/images/banner/app3-home.jpg', alt: 'Mừng khai trương ưu đãi cực khủng2', href: '/promotions/opening2' },
              { src: '/images/banner/honor-400-5g-home-0925.webp', alt: 'Slide 3', href: '/promotions/slide3' },
              { src: '/images/banner/aceeap77.webp', alt: 'Mừng khai trương ưu đãi cực khủng3', href: '/promotions/opening3' },
            ]}
            slideTitles={[
              { label: 'IPHONE 17 2025', active: true },
              { label: 'GALAXY S25 FE', active: false },
              { label: 'AIRPODS PRO 3', active: false },
              { label: 'HONOR 400 5G', active: false },
              { label: 'ACER ASPIRE 7', active: false },
            ]}
          />
          <RightBanner
            banners={[
              { src: '/images/Galaxy S25 Ultra 5G - img.webp', alt: 'Banner quảng cáo 1', href: '/products/galaxy-s25' },
              { src: '/images/watch series 11.webp', alt: 'Banner quảng cáo 2', href: '/products/watch-series-11' },
              { src: '/images/Camp-laptop-T9_Right-banner-1.webp', alt: 'Banner quảng cáo 3', href: '/promotions/laptop-campaign' },
            ]}
          />
        </div>
      </div>

      <main className="container mx-auto py-1">
        {/* Hiển thị nhiều ProductListSection, chỉ hiển thị nếu isHiddenOnHome là false */}
        {productData
          .filter((productGroup) => !productGroup.isHiddenOnHome)
          .map((productGroup, index) => (
            <ProductListSection
              key={`product-${index}`}
              title={productGroup.title}
              categoryLink={productGroup.categoryLink}
              relatedTags={productGroup.relatedTags}
              products={productGroup.products}
              formatPrice={formatPrice}
              hideHeader={false}
            />
          ))}
        {/* Hiển thị nhiều CategorySection */}
        {categoryData.map((category, index) => (
          <CategorySection
            key={`category-${index}`}
            title={category.title}
            categoryLink={category.categoryLink}
            relatedTags={category.relatedTags}
            categories={category.categories}
            hideHeader={false}
          />
        ))}

        <PaymentBannerSection paymentBanners={paymentBanners} />
      </main>
    </section>
  );
}