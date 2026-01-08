"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Edit, Eye, Search, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";

interface ImageType {
  src: string;
  alt: string;
}

interface Product {
  name: string;
  quantity: number;
  sale: number;
  startDate: string;
  mainImage: ImageType;
  images: ImageType[];
  priceData: { price: string; originalPrice: string };
  versions: string[];
  colors: { name: string; price: string; imageSrc: string; imageAlt: string }[];
  accessories: { name: string; imageSrc: string; imageAlt: string; price: string; originalPrice: string }[];
  technicalSpecs: [string, string][];
  promotions: { id: number; text: string; link: string }[];
  paymentPromotions: { text: string; img?: string }[];
  tradeInOptions: string[];
  features: { id: string; title: string; description: string }[];
}

const productTemplate: Product = {
  name: "iPhone 14 Pro Max",
  quantity: 250,
  sale: 10,
  startDate: "10 Sep 2022",
  mainImage: { src: '/images/ipad_pro.png', alt: 'Hình sản phẩm iPhone 14 Pro Max' },
  images: [
    { src: '/images/ipad_pro.png', alt: 'Hình phụ 1 iPhone 14 Pro Max' },
    { src: '/images/ipad_pro.png', alt: 'Hình phụ 2 iPhone 14 Pro Max' },
    { src: '/images/ipad_pro.png', alt: 'Hình phụ 3 iPhone 14 Pro Max' },
    { src: '/images/ipad_pro.png', alt: 'Hình phụ 4 iPhone 14 Pro Max' },
  ],
  priceData: { price: '30.890.000đ', originalPrice: '34.990.000đ' },
  versions: ['1TB', '512GB', '256GB'],
  colors: [
    { name: 'Tím Pha Lê', price: '30.890.000₫', imageSrc: '/images/ipad_pro.png', imageAlt: 'Tím Pha Lê' },
    { name: 'Vàng Ánh Kim', price: '31.290.000₫', imageSrc: '/images/ipad_pro.png', imageAlt: 'Vàng Ánh Kim' },
    { name: 'Đen Vũ Trụ', price: '30.690.000₫', imageSrc: '/images/ipad_pro.png', imageAlt: 'Đen Vũ Trụ' },
    { name: 'Bạc Ánh Sao', price: '30.990.000₫', imageSrc: '/images/ipad_pro.png', imageAlt: 'Bạc Ánh Sao' },
  ],
  accessories: [
    { name: 'Dán kính cường lực JCPal', imageSrc: '/images/ipad_pro.png', imageAlt: 'Dán kính JCPal', price: '390.000đ', originalPrice: '450.000đ' },
    { name: 'Ốp lưng MagSafe', imageSrc: '/images/ipad_pro.png', imageAlt: 'Ốp lưng MagSafe', price: '1.290.000đ', originalPrice: '1.490.000đ' },
    { name: 'Cáp sạc nhanh USB-C', imageSrc: '/images/ipad_pro.png', imageAlt: 'Cáp USB-C', price: '590.000đ', originalPrice: '690.000đ' },
    { name: 'Tai nghe AirPods Pro', imageSrc: '/images/ipad_pro.png', imageAlt: 'AirPods Pro', price: '5.990.000đ', originalPrice: '6.490.000đ' },
  ],
  technicalSpecs: [
    ['Kích thước màn hình', '6.7 inches'],
    ['Công nghệ màn hình', 'Super Retina XDR'],
    ['Camera sau', 'Chính 48MP, f/1.78, OIS\nTelephoto 12MP, f/2.8, zoom quang 5x\nSiêu rộng 12MP, f/2.2, 120°'],
    ['Camera trước', '12MP, f/1.9'],
    ['Chipset', 'Apple A16 Bionic'],
    ['Công nghệ NFC', 'Có'],
    ['Dung lượng RAM', '6 GB'],
    ['Bộ nhớ trong', '256 GB'],
    ['Pin', '4,323mAh'],
    ['Thẻ SIM', 'eSIM'],
    ['Hệ điều hành', 'iOS 16'],
    ['Độ phân giải màn hình', '2796 x 1290 pixels'],
    ['Tính năng màn hình', 'ProMotion 120Hz, HDR, True Tone'],
    ['Loại CPU', 'Hexa-core'],
  ],
  promotions: [
    { id: 1, text: 'Trả góp 0% đến 12 tháng qua Home Credit', link: '#' },
    { id: 2, text: 'Tặng voucher 500.000đ mua phụ kiện', link: '#' },
  ],
  paymentPromotions: [
    { text: 'Xem chính sách ưu đãi dành cho thành viên Smember' },
    { img: '/images/top_banner.png', text: 'Hoàn tiền đến 2 triệu khi mở thẻ tín dụng HSBC' },
    { img: '/images/top_banner.png', text: 'Giảm đến 1 triệu khi thanh toán qua thẻ tín dụng Vietbank' },
    { img: '/images/top_banner.png', text: 'Giảm đến 1 triệu khi thanh toán qua thẻ Muadee by HDBank' },
    { img: '/images/top_banner.png', text: 'Mở thẻ VIB nhận E-Voucher đến 600K' },
    { img: '/images/top_banner.png', text: 'Giảm đến 500.000đ khi thanh toán qua Kredivo' },
    { img: '/images/top_banner.png', text: 'Giảm 200K khi trả góp bằng thẻ Visa Sacombank qua MPOS' },
    { img: '/images/top_banner.png', text: 'Giảm đến 200K khi thanh toán qua MOMO' },
    { text: 'Liên hệ B2B để được tư vấn giá tốt nhất cho khách hàng doanh nghiệp' },
  ],
  tradeInOptions: ['iPhone 13 Pro Max', 'iPhone 12 Pro', 'Samsung S23 Ultra'],
  features: [
    { id: 'feature-1', title: 'Hiệu năng vượt trội', description: 'Chip A16 Bionic với 6 nhân CPU và 16 nhân Neural Engine, đảm bảo xử lý mượt mà.' },
    { id: 'feature-2', title: 'Màn hình ProMotion', description: 'Tần số quét 120Hz, hỗ trợ HDR và True Tone cho trải nghiệm hiển thị sắc nét.' },
    { id: 'feature-3', title: 'Camera cải tiến', description: 'Hệ thống camera 48MP với khả năng quay video 4K HDR và chế độ Cinematic.' },
  ],
};

const products: Product[] = Array(8).fill(productTemplate);

function ProductsPage() {
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddNew = () => {
    router.push("/admin/products/add-new");
  };

  const handleViewProduct = (productName: string) => {
    setSelectedProduct(productName);
    setIsDialogOpen(true);
  };

  const selectedProductData = selectedProduct
    ? products.find((p) => p.name === selectedProduct)
    : null;

  return (
    <div className="min-h-screen w-full">
      <div className="w-full px-4 py-6 sm:px-6 md:px-8 lg:py-16">
        <div className="container mx-auto">
          <div className="justify-start mb-6">
            <h1 className="text-xl sm:text-2xl font-bold">Quản lý sản phẩm</h1>
            <p className="text-sm sm:text-base text-muted-foreground">Quản lý, cập nhật, tổ chức thuộc tính sản phẩm, liên kết sản phẩm, mô tả, đa ngôn ngữ, kho, lịch sử...</p>
          </div>
          <Card className="p-4 sm:p-6 rounded-lg">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 gap-4">
                <Select>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Bộ lọc" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high-to-low">Giá cao đến thấp</SelectItem>
                    <SelectItem value="low-to-high">Giá thấp đến cao</SelectItem>
                    <SelectItem value="release-date">Ngày ra mắt</SelectItem>
                  </SelectContent>
                </Select>
                <div className="relative w-full sm:w-auto">
                  <Input
                    type="text"
                    placeholder="Tìm kiếm..."
                    className="border w-full sm:w-[200px] md:w-[300px] p-2 pl-8 rounded-lg bg-background text-foreground"
                  />
                  <Search className="h-4 w-4 text-muted-foreground absolute left-2 top-1/2 transform -translate-y-1/2" />
                </div>
              </div>
              <Button
                className="bg-primary text-primary-foreground cursor-pointer w-full sm:w-auto"
                onClick={handleAddNew}
              >
                + Thêm mới
              </Button>
            </div>
            <div className="space-y-4">
              {products.map((item, index) => (
                <div
                  key={`${item.name}-${index}`}
                  className={`flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 rounded-lg ${
                    index % 2 === 0 ? "bg-muted/50" : "bg-background"
                  }`}
                >
                  <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                    <Image
                      src={item.mainImage.src}
                      alt={item.mainImage.alt}
                      width={64}
                      height={64}
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-md object-cover"
                    />
                    <div>
                      <div className="font-medium text-sm sm:text-base">{item.name}</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">{item.startDate}</div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                    <div className="text-xs sm:text-sm mb-2 sm:mb-0">
                      <div>Số lượng: {item.quantity}</div>
                      <div>Giảm giá: {item.sale}%</div>
                    </div>
                    <div className="flex space-x-2">
                      <Eye
                        className="h-4 w-4 text-blue-500 cursor-pointer"
                        onClick={() => handleViewProduct(item.name)}
                      />
                      <Edit className="h-4 w-4 text-green-500 cursor-pointer" />
                      <Trash2 className="h-4 w-4 text-red-500 cursor-pointer" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-full max-w-[95vw] sm:max-w-4xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 bg-background rounded-xl shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl font-bold text-foreground">
              Chi tiết sản phẩm: {selectedProduct}
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base text-muted-foreground">
              Xem thông tin chi tiết về sản phẩm
            </DialogDescription>
          </DialogHeader>
          {selectedProductData && (
            <div className="space-y-6 sm:space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4">
                  <Image
                    src={selectedProductData.mainImage.src}
                    alt={selectedProductData.mainImage.alt}
                    width={300}
                    height={300}
                    className="w-full max-w-[300px] mx-auto rounded-lg object-cover shadow-sm"
                  />
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {selectedProductData.images.map((img: ImageType, idx) => (
                      <Image
                        key={idx}
                        src={img.src}
                        alt={img.alt}
                        width={80}
                        height={80}
                        className="rounded-md object-cover hover:scale-105 transition-transform duration-200 cursor-pointer"
                      />
                    ))}
                  </div>
                </div>
                <div className="space-y-4 sm:space-y-6">
                  <Card className="p-4 bg-card rounded-lg shadow-sm">
                    <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">Giá sản phẩm</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg sm:text-2xl font-bold text-primary">{selectedProductData.priceData.price}</span>
                      <span className="text-xs sm:text-sm text-muted-foreground line-through">{selectedProductData.priceData.originalPrice}</span>
                    </div>
                  </Card>
                  <Card className="p-4 bg-card rounded-lg shadow-sm">
                    <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">Phiên bản</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProductData.versions.map((version) => (
                        <Button
                          key={version}
                          variant="outline"
                          className="text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors duration-200 cursor-pointer"
                        >
                          {version}
                        </Button>
                      ))}
                    </div>
                  </Card>
                  <Card className="p-4 bg-card rounded-lg shadow-sm">
                    <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">Màu sắc</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedProductData.colors.map((color) => (
                        <div
                          key={color.name}
                          className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted/50 transition-colors duration-200"
                        >
                          <Image
                            src={color.imageSrc}
                            alt={color.imageAlt}
                            width={40}
                            height={40}
                            className="rounded-md object-cover"
                          />
                          <div>
                            <div className="font-medium text-foreground">{color.name}</div>
                            <div className="text-sm text-muted-foreground">{color.price}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                  <Card className="p-4 bg-card rounded-lg shadow-sm">
                    <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">Phụ kiện</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedProductData.accessories.map((accessory) => (
                        <div
                          key={accessory.name}
                          className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted/50 transition-colors duration-200"
                        >
                          <Image
                            src={accessory.imageSrc}
                            alt={accessory.imageAlt}
                            width={40}
                            height={40}
                            className="rounded-md object-cover"
                          />
                          <div>
                            <div className="text-sm font-medium text-foreground">{accessory.name}</div>
                            <div className="text-sm text-muted-foreground">{accessory.price}</div>
                            <div className="text-xs text-muted-foreground line-through">{accessory.originalPrice}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
              <Card className="p-4 bg-card rounded-lg shadow-sm">
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">Thông số kỹ thuật</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedProductData.technicalSpecs.map(([key, value]) => (
                    <div key={key} className="text-sm p-2 rounded-md hover:bg-muted/50 transition-colors duration-200">
                      <span className="font-medium text-foreground">{key}: </span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </Card>
              <Card className="p-4 bg-card rounded-lg shadow-sm">
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">Khuyến mãi</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {selectedProductData.promotions.map((promo) => (
                    <li key={promo.id}>
                      <Link
                        href={promo.link}
                        className="text-blue-500 hover:underline hover:text-blue-600 transition-colors duration-200 cursor-pointer"
                      >
                        {promo.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Card>
              <Card className="p-4 bg-card rounded-lg shadow-sm">
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">Ưu đãi thanh toán</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {selectedProductData.paymentPromotions.map((promo, idx) => (
                    <li key={idx} className="flex items-center space-x-3">
                      {promo.img && (
                        <Image
                          src={promo.img}
                          alt={promo.text}
                          width={50}
                          height={20}
                          className="object-contain"
                        />
                      )}
                      <span className="text-muted-foreground">{promo.text}</span>
                    </li>
                  ))}
                </ul>
              </Card>
              <Card className="p-4 bg-card rounded-lg shadow-sm">
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">Tùy chọn thu cũ đổi mới</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProductData.tradeInOptions.map((option) => (
                    <Button
                      key={option}
                      variant="outline"
                      className="text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors duration-200 cursor-pointer"
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </Card>
              <Card className="p-4 bg-card rounded-lg shadow-sm">
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">Tính năng nổi bật</h3>
                <div className="space-y-4">
                  {selectedProductData.features.map((feature) => (
                    <div
                      key={feature.id}
                      className="p-3 rounded-md hover:bg-muted/50 transition-colors duration-200"
                    >
                      <h4 className="font-medium text-foreground">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ProductsPage;