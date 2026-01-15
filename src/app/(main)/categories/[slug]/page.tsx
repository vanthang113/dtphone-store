'use client';

import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import ProductBreadcrumb from '@/components/product/detail/ProductBreadcrumb';
import { ProductListSection } from '@/components/product/ProductListSection';
import HighlightSection from '@/components/product/detail/HighlightSection';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import FAQSection from '@/components/product/detail/FAQSection';
import QASection from '@/components/product/detail/QASection';
import { CategorySection } from '@/components/category/CategorySection';
import { ArrowDownNarrowWide, ArrowDownWideNarrow, ArrowUpNarrowWide, BadgeCent, CarTaxiFront, ChevronDown, Eye, Funnel, Percent } from 'lucide-react';

// Import interface và hàm từ HomePage
import { Product, CategoryItem, categoryData, productData, createSlug, formatPrice } from '@/app/(main)/page';

export default function CategoryDetail() {
  const { slug } = useParams() as { slug: string };

  // Lọc danh mục chính dựa trên slug
  const categoryGroup = categoryData.find((group) =>
    group.categoryLink.includes(slug) || group.categories.some((cat) => cat.link.includes(slug))
  );

  // Lấy danh mục con và thông tin danh mục chính
  const categories = categoryGroup ? categoryGroup.categories : [];
  const categoryTitle = categoryGroup ? categoryGroup.title : 'Danh mục không tìm thấy';
  const categoryLink = categoryGroup ? categoryGroup.categoryLink : '';
  const relatedTags = categoryGroup ? categoryGroup.relatedTags : [];

  // Lọc sản phẩm dựa trên slug (khớp chính xác với categoryLink)
  const productGroup = productData.find((group) => group.categoryLink === `/categories/${slug}`);
  const products = productGroup ? productGroup.products : [];

  // Dữ liệu cho HighlightSection và FAQSection
  const features = [
    {
      id: 'feature-1',
      title: `${categoryTitle} có những tính năng gì?`,
      description: `Sản phẩm thuộc ${categoryTitle} được thiết kế tối ưu với hiệu suất cao, phù hợp với các thiết bị Apple.`,
    },
    {
      id: 'feature-2',
      title: 'Chất lượng sản phẩm',
      description: 'Được sản xuất với vật liệu cao cấp, đảm bảo độ bền và hiệu suất lâu dài.',
    },
    {
      id: 'feature-3',
      title: 'Tương thích',
      description: `Hỗ trợ nhiều thiết bị trong hệ sinh thái ${categoryTitle}, đảm bảo kết nối mượt mà.`,
    },
  ];

  // State để quản lý trạng thái hiển thị dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    filter: false,
    product: false,
    price: false,
    utility: false,
    closure: false,
    compatibility: false,
    port: false,
    keyboard: false,
  });

  // Hàm bật/tắt dropdown
  const toggleDropdown = (type: string) => {
    setIsDropdownOpen((prev) => ({
      ...prev,
      filter: type === 'filter' ? !prev.filter : false,
      product: type === 'product' ? !prev.product : false,
      price: type === 'price' ? !prev.price : false,
      utility: type === 'utility' ? !prev.utility : false,
      closure: type === 'closure' ? !prev.closure : false,
      compatibility: type === 'compatibility' ? !prev.compatibility : false,
      port: type === 'port' ? !prev.port : false,
      keyboard: type === 'keyboard' ? !prev.keyboard : false,
    }));
  };

  return (
    <div>
      <ProductBreadcrumb slug={slug} />
      {/** Responsive Category Section */}
      <div className="max-w-[1200px] mx-auto px-4 mt-8">
        <span className="text-gray-600 text-lg font-medium block mb-4">Chọn theo sản phẩm</span>

        {/* Desktop & iPad ngang */}
        <div className="hidden md:block">
          <CategorySection
            title={categoryTitle}
            categoryLink={categoryLink}
            relatedTags={relatedTags}
            categories={categories}
            hideHeader
          />
        </div>

        {/* Mobile & iPad dọc */}
        <div className="md:hidden overflow-x-auto scrollbar-thin -mx-4 px-4">
          <div className="flex gap-3 min-w-max">
            <CategorySection
              title={categoryTitle}
              categoryLink={categoryLink}
              relatedTags={relatedTags}
              categories={categories}
              hideHeader
            />
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4">
        {/* Phần lọc với dropdown */}
        <div className="mt-6">
          <span className="text-gray-600 text-lg font-medium">Chọn theo tiêu chí</span>
          <div className="text-black flex flex-wrap gap-2 mt-2">
            <div className="relative">
              <Button
                variant={isDropdownOpen.filter ? 'destructive' : 'outline'}
                size="sm"
                onClick={() => toggleDropdown('filter')}
                className={cn('')}
              >
                Bộ lọc <ChevronDown className="mt-1" />
              </Button>
              {isDropdownOpen.filter && (
                <div className="text-black absolute z-10 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg p-2">
                  <div className="mb-2">
                    <h4 className="font-semibold text-gray-700">Tiện ích</h4>
                    <Button variant="ghost" size="sm" className="w-full text-left">
                      Sạc nhanh
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full text-left">
                      Truyền dữ liệu tốc độ cao
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full text-left">
                      Bọc vải, dù
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full text-left">
                      Đạt chuẩn MFi bộ Apple
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full text-left">
                      Chống rối
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full text-left">
                      Chống cháy nổ
                    </Button>
                  </div>
                  <div className="mb-2">
                    <h4 className="font-semibold text-gray-700">Dòng sản phẩm</h4>
                    <Button variant="ghost" size="sm" className="w-full text-left">
                      Sạc
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full text-left">
                      Cáp
                    </Button>
                  </div>
                  <div className="mb-2">
                    <h4 className="font-semibold text-gray-700">Tương thích</h4>
                    <Button variant="ghost" size="sm" className="w-full text-left">
                      Điện thoại
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full text-left">
                      Tablet
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full text-left">
                      Laptop/ Macbook
                    </Button>
                  </div>
                  <div className="mb-2">
                    <h4 className="font-semibold text-gray-700">Số cổng sạc</h4>
                    <Button variant="ghost" size="sm" className="w-full text-left">
                      1 cổng
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full text-left">
                      2 cổng
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full text-left">
                      3 cổng
                    </Button>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Loại bàn phím</h4>
                    <Button variant="ghost" size="sm" className="w-full text-left">
                      Tenkeyless
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full text-left">
                      Mini-size
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full text-left">
                      Full-size
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <Button
                variant={isDropdownOpen.product ? 'destructive' : 'outline'}
                size="sm"
                onClick={() => toggleDropdown('product')}
                className={cn('')}
              >
                 Sẵn sàng <ChevronDown className="mt-1" />
              </Button>
            </div>
            <div className="relative">
              <Button
                variant={isDropdownOpen.price ? 'destructive' : 'outline'}
                size="sm"
                onClick={() => toggleDropdown('price')}
                className={cn('')}
              >
                 Giá <ChevronDown className="mt-1" />
              </Button>
              {isDropdownOpen.price && (
                <div className="absolute z-10 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                  <Button variant="ghost" size="sm" className="w-full text-left">
                    Giá thấp
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full text-left">
                    Giá cao
                  </Button>
                </div>
              )}
            </div>
            <div className="relative">
              <Button
                variant={isDropdownOpen.utility ? 'destructive' : 'outline'}
                size="sm"
                onClick={() => toggleDropdown('utility')}
                className={cn('')}
              >
                Tiện ích <ChevronDown className="mt-1" />
              </Button>
              {isDropdownOpen.utility && (
                <div className="absolute z-10 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                  <Button variant="ghost" size="sm" className="w-full text-left">
                    Sạc nhanh
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full text-left">
                    Truyền dữ liệu tốc độ cao
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full text-left">
                    Bọc vải, dù
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full text-left">
                    Đạt chuẩn MFi bộ Apple
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full text-left">
                    Chống rối
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full text-left">
                    Chống cháy nổ
                  </Button>
                </div>
              )}
            </div>
            <div className="relative">
              <Button
                variant={isDropdownOpen.closure ? 'destructive' : 'outline'}
                size="sm"
                onClick={() => toggleDropdown('closure')}
                className={cn('')}
              >
                Đóng sản phẩm <ChevronDown className="mt-1" />
              </Button>
              {isDropdownOpen.closure && (
                <div className="absolute z-10 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                  <Button variant="ghost" size="sm" className="w-full text-left">
                    Đóng sản phẩm 1
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full text-left">
                    Đóng sản phẩm 2
                  </Button>
                </div>
              )}
            </div>
            <div className="relative">
              <Button
                variant={isDropdownOpen.compatibility ? 'destructive' : 'outline'}
                size="sm"
                onClick={() => toggleDropdown('compatibility')}
                className={cn('')}
              >
                Tương thích <ChevronDown className="mt-1" />
              </Button>
              {isDropdownOpen.compatibility && (
                <div className="absolute z-10 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                  <Button variant="ghost" size="sm" className="w-full text-left">
                    Tương thích 1
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full text-left">
                    Tương thích 2
                  </Button>
                </div>
              )}
            </div>
            <div className="relative">
              <Button
                variant={isDropdownOpen.port ? 'destructive' : 'outline'}
                size="sm"
                onClick={() => toggleDropdown('port')}
                className={cn('')}
              >
                Số cổng sạc <ChevronDown className="mt-1" />
              </Button>
              {isDropdownOpen.port && (
                <div className="absolute z-10 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                  <Button variant="ghost" size="sm" className="w-full text-left">
                    1 cổng
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full text-left">
                    2 cổng
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full text-left">
                    3 cổng
                  </Button>
                </div>
              )}
            </div>
            <div className="relative">
              <Button
                variant={isDropdownOpen.keyboard ? 'destructive' : 'outline'}
                size="sm"
                onClick={() => toggleDropdown('keyboard')}
                className={cn('')}
              >
                Loại bàn phím <ChevronDown className="mt-1" />
              </Button>
              {isDropdownOpen.keyboard && (
                <div className="absolute z-10 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                  <Button variant="ghost" size="sm" className="w-full text-left">
                    Máy tính
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full text-left">
                    Laptop
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full text-left">
                    Di động
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Phần sắp xếp */}
        <div className="mt-4">
          <span className="text-black text-lg font-medium">Sắp xếp theo</span>
          <div className="text-black ">
            <Button variant="outline" size="sm">
              <ArrowDownNarrowWide /> Giá Cao - Thấp
            </Button>
            <Button variant="outline" size="sm" className={cn('')}>
              <ArrowDownWideNarrow /> Giá Thấp - Cao
            </Button>
            <Button variant="outline" size="sm" className={cn('')}>
              <Percent /> Khuyến Mãi Hot
            </Button>
            <Button variant="destructive" size="sm" className={cn('')}>
              <Eye /> Xem nhiều
            </Button>
          </div>
        </div>

        {/* Hiển thị danh sách sản phẩm bằng ProductListSection */}
        <div className="mt-6">
          <ProductListSection
            title={productGroup?.title || 'Sản phẩm liên quan'}
            categoryLink={productGroup?.categoryLink || ''}
            relatedTags={productGroup?.relatedTags || []}
            products={products}
            formatPrice={formatPrice}
            hideHeader={false}
          />
        </div>

        {/* Tích hợp HighlightSection */}
        <HighlightSection slug={slug} />

        {/* Tích hợp Câu hỏi thường gặp */}
        <FAQSection features={features} />

        {/* Hỏi và đáp */}
        <QASection />
      </div>
    </div>
  );
}