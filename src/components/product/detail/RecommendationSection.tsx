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

import ProductCard from '@/components/product/ProductCard'

type RecommendProduct = {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  discount?: number
  promotion?: string
}

export default function RecommendationSection() {
  // Mock data (sau này bạn có thể thay bằng data từ API)
  const recommendedProducts: RecommendProduct[] = [
    {
      id: 'p-01',
      name: 'iPhone 15 Pro Max 256GB',
      price: 32990000,
      originalPrice: 34990000,
      image: '/images/products/iphone-15-pro-max.png',
      rating: 5,
      discount: 6,
      promotion: 'Tặng ốp lưng + dán màn hình, hỗ trợ trả góp 0%'
    },
    {
      id: 'p-02',
      name: 'Samsung Galaxy S24 Ultra 12/256GB',
      price: 28990000,
      originalPrice: 31990000,
      image: '/images/products/s24-ultra.png',
      rating: 4,
      discount: 9,
      promotion: 'Giảm thêm 500K khi thanh toán VNPay'
    },
    {
      id: 'p-03',
      name: 'Xiaomi 14 12/256GB',
      price: 18990000,
      originalPrice: 20990000,
      image: '/images/products/xiaomi-14.png',
      rating: 4,
      discount: 10,
      promotion: 'Tặng sạc nhanh 90W chính hãng'
    },
    {
      id: 'p-04',
      name: 'OPPO Reno11 F 5G 8/256GB',
      price: 8990000,
      originalPrice: 9990000,
      image: '/images/products/oppo-reno11f.png',
      rating: 4,
      discount: 10,
      promotion: 'Thu cũ đổi mới trợ giá đến 500K'
    },
    {
      id: 'p-05',
      name: 'vivo V29e 8/256GB',
      price: 7990000,
      image: '/images/products/vivo-v29e.png',
      rating: 3,
      promotion: 'Tặng tai nghe + bảo hành mở rộng 12 tháng'
    }
  ]

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">
        Có thể bạn cũng thích
      </h2>

      <div className="flex flex-wrap gap-3 overflow-x-auto px-4 sm:px-0">
        {recommendedProducts.map((p) => (
          <ProductCard
            key={p.id}
            id={p.id}
            name={p.name}
            price={p.price}
            originalPrice={p.originalPrice}
            image={p.image}
            rating={p.rating}
            discount={p.discount}
            promotion={p.promotion}
          />
        ))}
      </div>
    </div>
  )
}
