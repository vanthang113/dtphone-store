// import ProductCard from '@/components/product/ProductCard';

// export default function RecommendationSection() {
//   return (
//     <div className="mt-16">
//       <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">Có thể bạn cũng thích</h2>
//       <div className="flex flex-wrap gap-3 overflow-x-auto px-4 sm:px-0">
//         <ProductCard />
//         <ProductCard />
//         <ProductCard />
//         <ProductCard />
//         <ProductCard />
//       </div>
//     </div>
//   );
// }

import ProductCard from '@/components/product/ProductCard';

export default function RecommendationSection() {
  // Tạo dữ liệu mẫu cho sản phẩm đề xuất
  const recommendedProducts = [
    {
      id: "1",
      name: "iPhone 15 Pro Max 256GB",
      price: 29990000,
      originalPrice: 32990000,
      image: "/images/iphone-15-pro-max.jpg",
      rating: 4.5,
      discount: 10,
      promotion: "Mua kèm giảm 500K"
    },
    {
      id: "2", 
      name: "Samsung Galaxy S24 Ultra",
      price: 28990000,
      originalPrice: 30990000,
      image: "/images/galaxy-s24-ultra.jpg",
      rating: 4.7,
      discount: 7,
      promotion: "Tặng phụ kiện chính hãng"
    },
    {
      id: "3",
      name: "Xiaomi 14 Pro",
      price: 19990000,
      originalPrice: 21990000,
      image: "/images/xiaomi-14-pro.jpg",
      rating: 4.3,
      discount: 9,
      promotion: "Giảm thêm 500K khi mua online"
    },
    {
      id: "4",
      name: "OPPO Find X7 Ultra",
      price: 23990000,
      image: "/images/oppo-find-x7.jpg",
      rating: 4.4,
      discount: 5
    },
    {
      id: "5",
      name: "Google Pixel 8 Pro",
      price: 22990000,
      originalPrice: 24990000,
      image: "/images/pixel-8-pro.jpg",
      rating: 4.6,
      promotion: "Miễn phí giao hàng toàn quốc"
    }
  ];

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">Có thể bạn cũng thích</h2>
      <div className="flex flex-wrap gap-3 overflow-x-auto px-4 sm:px-0">
        {recommendedProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            originalPrice={product.originalPrice}
            image={product.image}
            rating={product.rating}
            discount={product.discount}
            promotion={product.promotion}
          />
        ))}
      </div>
    </div>
  );
}