'use client';

import ProductBreadcrumb from '@/components/product/detail/ProductBreadcrumb';
import PaymentPromotions from '@/components/product/detail/PaymentPromotions';
import TradeInSection from '@/components/product/detail/TradeInSection';
import PromotionSection from '@/components/product/detail/PromotionSection';
import ActionButtons from '@/components/product/detail/ActionButtons';
import TechnicalSpecs from '@/components/product/detail/TechnicalSpecs';
import WarrantyOptions from '@/components/product/detail/WarrantyOptions';
import RelatedAccessories from '@/components/product/detail/RelatedAccessories';
import ProductCommitmentSection from '@/components/product/detail/ProductCommitmentSection';
import FAQSection from '@/components/product/detail/FAQSection';
import StudentOfferSection from '@/components/product/detail/StudentOfferSection';
import AdImageSection from '@/components/product/detail/AdImageSection';
import StoreAvailabilitySection from '@/components/product/detail/StoreAvailabilitySection';
import PurchaseButtons from '@/components/product/detail/PurchaseButtons';
import RecommendationSection from '@/components/product/detail/RecommendationSection';
import HighlightSection from '@/components/product/detail/HighlightSection';
import ReviewSection from '@/components/product/detail/ReviewSection';
import QASection from '@/components/product/detail/QASection';
import ProductImageGallery from '@/components/product/detail/ProductImageGallery';
import ProductInfoPanel from '@/components/product/detail/ProductInfoPanel';
import { Star } from 'lucide-react';
import { useState } from 'react';
import { use } from 'react';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default function ProductDetail({ params }: Props) {
  const { slug } = use(params);

  const [currentImage, setCurrentImage] = useState<{ src: string; alt: string; index?: number }>({
    src: '/images/my_phone/New folder/dien-thoai-itel-p55-plus-8gb-256gb_1__2.webp',
    alt: 'Product Image 1',
    index: 0,
  });

  const handleFavoriteClick = () => console.log('Favorite clicked');
  const handleQAClick = () => console.log('Q&A clicked');
  const handleSpecsClick = () => console.log('Specs clicked');
  const handleCompareClick = () => console.log('Compare clicked');
  const handleVersionClick = (version: string) => console.log(`Version ${version} clicked`);
  const handleColorClick = (color: string) => {
    const selectedColor = colors.find((c) => c.name === color);
    if (selectedColor) {
      const imageIndex = images.findIndex((img) => img.src === selectedColor.imageSrc);
      setCurrentImage({
        src: selectedColor.imageSrc,
        alt: selectedColor.imageAlt,
        index: imageIndex !== -1 ? imageIndex : undefined,
      });
      console.log(`Color ${color} clicked`);
    }
  };
  const handleAddToCart = (accessory: string) => console.log(`Added ${accessory} to cart`);
  const handlePrevClick = () => {
    setCurrentImage((prev) => {
      const currentIndex = prev.index ?? 0;
      const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
      return { ...images[newIndex], index: newIndex };
    });
  };
  const handleNextClick = () => {
    setCurrentImage((prev) => {
      const currentIndex = prev.index ?? 0;
      const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
      return { ...images[newIndex], index: newIndex };
    });
  };
  const handleImageClick = (index: number) => {
    setCurrentImage({ ...images[index], index });
  };

  const images = [
    { src: '/images/my_phone/New folder/dien-thoai-itel-p55-plus-8gb-256gb_1__2.webp', alt: 'Product Image 1' },
    { src: '/images/my_phone/New folder/dien-thoai-meizu-mblu-21_3__1.webp', alt: 'Product Image 2' },
    { src: '/images/my_phone/New folder/dien-thoai-meizu-mblu-21_4__2.webp', alt: 'Product Image 3' },
    { src: '/images/my_phone/New folder/dien-thoai-nubia-a56_1.webp', alt: 'Product Image 1' },
    { src: '/images/my_phone/New folder/dien-thoai-nubia-z70s-ultra-5g_10_.webp', alt: 'Product Image 2' },
    { src: '/images/my_phone/New folder/dien-thoai-nubia-z70s-ultra-5g_11__2.webp', alt: 'Product Image 3' },
    { src: '/images/my_phone/New folder/dien-thoai-oppo-reno12-5g_5__5.webp', alt: 'Product Image 1' },
    { src: '/images/my_phone/New folder/dien-thoai-zte-blade-a55_1.webp', alt: 'Product Image 2' },
    { src: '/images/my_phone/New folder/group_1_7.webp', alt: 'Product Image 3' },
  ];

  const price = '20.990.000đ';
  const originalPrice = '23.990.000đ';
  const versions = ['256GB', '512GB', '1TB'];
  const colors = [
    { name: 'Black Titanium', price: '20.990.000đ', imageSrc: '/images/my_phone/New folder/dien-thoai-meizu-mblu-21_4__2.webp', imageAlt: 'Black Titanium' },
    { name: 'White Titanium', price: '21.490.000đ', imageSrc: '/images/my_phone/New folder/dien-thoai-oppo-reno12-5g_5__5.webp', imageAlt: 'White Titanium' },
    { name: 'Blue Titanium', price: '21.990.000đ', imageSrc: '/images/my_phone/New folder/dien-thoai-nubia-z70s-ultra-5g_10_.webp', imageAlt: 'Blue Titanium' },
  ];

  const accessories = [
    { name: 'Dán kính cường lực iPhone 16 Pro Max chính hãng JCPal', imageSrc: '/images/top_banner.png', imageAlt: 'Phụ kiện 2', price: '390.000đ', originalPrice: '450.000đ' },
    { name: 'Dán kính cường lực iPhone 16 Pro Max chính hãng JCPal', imageSrc: '/images/top_banner.png', imageAlt: 'Phụ kiện 2', price: '390.000đ', originalPrice: '450.000đ' },
    { name: 'Dán kính cường lực iPhone 16 Pro Max chính hãng JCPal', imageSrc: '/images/top_banner.png', imageAlt: 'Phụ kiện 2', price: '390.000đ', originalPrice: '450.000đ' },
    { name: 'Dán kính cường lực iPhone 16 Pro Max chính hãng JCPal', imageSrc: '/images/top_banner.png', imageAlt: 'Phụ kiện 2', price: '390.000đ', originalPrice: '450.000đ' },
  ];

  const technicalSpecs: [string, string][] = [
    ['Kích thước màn hình', '6.8 inches'],
    ['Công nghệ màn hình', 'Dynamic AMOLED 2X'],
    ['Camera sau', 'Camera chính: 200MP, Laser AF, OIS\nCamera: 50MP, PDAF, OIS, zoom quang học 5x\nCamera tele: 10MP\nCamera góc siêu rộng: 12 MP, f/2.2, 13mm, 120°'],
    ['Camera trước', '12 MP, f/2.2'],
    ['Chipset', 'Snapdragon 8 Gen 3 For Galaxy'],
    ['Công nghệ NFC', 'Có'],
    ['Dung lượng RAM', '12 GB'],
    ['Bộ nhớ trong', '256 GB'],
    ['Pin', '5,000mAh'],
    ['Thẻ SIM', 'SIM 1 + SIM 2 / SIM 1 + eSIM / 2 eSIM'],
    ['Hệ điều hành', 'Android 14, One UI 6.1'],
    ['Độ phân giải màn hình', '1440 x 3120 pixels'],
    ['Tính năng màn hình', 'Độ sáng cao nhất 2,600 nits, 120Hz, Corning® Gorilla® Armor®, 16 triệu màu'],
    ['Loại CPU', '3.39GHz,3.1GHz,2.9GHz,2.2GHz'],
    ['Tương thích', 'Bút SPEN - tích hợp sẵn lên máy'],
  ];

  const promotions = [
    { id: 1, text: 'Trả góp 0% đến 12 tháng, 0đ trả trước qua Samsung Finance+', link: '#' },
    { id: 2, text: 'Tặng voucher 500.000đ mua Gia dụng (áp dụng 1 số sản phẩm nhất định)', link: '#' },
  ];

  const paymentPromotions = [
    { text: 'Xem chính sách ưu đãi dành cho thành viên Smember' },
    { img: '/images/hsbc_full-removebg-preview.png', text: 'Hoàn tiền đến 2 triệu khi mở thẻ tín dụng HSBC' },
    { img: '/images/VBB-removebg-preview.png', text: 'Giảm đến 1 triệu khi thanh toán qua thẻ tín dụng Vietbank' },
    { img: '/images/logo-CMuLB7N9-removebg-preview.png', text: 'Giảm đến 1 triệu khi thanh toán qua thẻ Muadee by HDBank' },
    { img: '/images/LOGO-VIB-Blue-removebg-preview.png', text: 'Mở thẻ VIB nhận E-Voucher đến 600K' },
    { img: '/images/kredivo-removebg-preview.png', text: 'Giảm đến 500.000đ khi thanh toán qua Kredivo' },
    { img: '/images/sacombank-removebg-preview.png', text: 'Giảm 200K khi trả góp bằng thẻ Visa Sacombank qua MPOS' },
    { img: '/images/images.png', text: 'Giảm đến 200K khi thanh toán qua MOMO' },
    { text: 'Liên hệ B2B để được tư vấn giá tốt nhất cho khách hàng doanh nghiệp khi mua số lượng nhiều' },
  ];

  const tradeInOptions = ['Tìm sản phẩm muốn t', 'iPhone 15 Pro Max', 'Samsung S24 Ultra'];

  const features = [
    { id: 'feature-1', title: 'Samsung Galaxy S24 dùng chip gì?', description: 'Chip A16 Bionic với 5 nhân CPU và 16 nhân Neural Engine, giúp xử lý đa nhiệm nhanh chóng và nâng cao hiệu suất đồ họa.' },
    { id: 'feature-2', title: 'Dung lượng', description: 'Chip A16 Bionic với 5 nhân CPU và 16 nhân Neural Engine, giúp xử lý đa nhiệm nhanh chóng và nâng cao hiệu suất đồ họa.' },
    { id: 'feature-3', title: 'khung viền Samsung', description: 'Chip A16 Bionic với 5 nhân CPU và 16 nhân Neural Engine, giúp xử lý đa nhiệm nhanh chóng và nâng cao hiệu suất đồ họa.' },
  ];

  return (
    <>
      <ProductBreadcrumb slug={slug} />
      <div className="pt-6 sm:pt-8 md:pt-10 lg:pt-20">
        <div className="max-w-[1200px] mx-auto px-2 sm:px-3 md:px-4">
          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 md:gap-6">
            <div className="w-full lg:w-1/2 pr-0 lg:pr-3 md:pr-4">
              <h1 className="text-lg sm:text-xl md:text-2xl text-black font-bold mb-2 sm:mb-3">Chi tiết sản phẩm: {slug}</h1>
              <div className="flex items-center mb-3 sm:mb-4">
                <Star className="text-yellow-500 text-base sm:text-lg md:text-xl" />
                <span className="text-base sm:text-lg md:text-lg font-semibold ml-1">4.9</span>
                <span className="text-gray-500 ml-1 text-xs sm:text-sm">(302 đánh giá)</span>
              </div>
              <ActionButtons
                onFavoriteClick={handleFavoriteClick}
                onQAClick={handleQAClick}
                onSpecsClick={handleSpecsClick}
                onCompareClick={handleCompareClick}
              />
              <ProductImageGallery
                images={images}
                currentImage={currentImage}
                onPrevClick={handlePrevClick}
                onNextClick={handleNextClick}
                onImageClick={handleImageClick}
              />
              <ProductCommitmentSection />
              <TechnicalSpecs specs={technicalSpecs} />
              <FAQSection features={features} />
            </div>

            <div className="w-full lg:w-1/2 pl-0 lg:pl-3 md:pl-4">
              <ProductInfoPanel
                price={price}
                originalPrice={originalPrice}
                versions={versions}
                colors={colors}
                onVersionClick={handleVersionClick}
                onColorClick={handleColorClick}
              />
              <AdImageSection />
              <PromotionSection title="Khuyến mãi hấp dẫn" promotions={promotions} />
              <PurchaseButtons />
              <TradeInSection minPrice="20.990.000đ" options={tradeInOptions} />
              <PaymentPromotions promotions={paymentPromotions} />
              <RelatedAccessories accessories={accessories} onAddToCart={handleAddToCart} />
              
            </div>
          </div>

          <ReviewSection slug={slug} />
          <QASection />
        </div>
      </div>
    </>
  );
}