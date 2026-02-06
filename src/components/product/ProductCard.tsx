'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Star, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useMemo, useState } from 'react'

export interface ProductCardProps {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  discount?: number
  promotion?: string
}

function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  rating,
  discount,
  promotion
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  const safeRating = useMemo(() => {
    if (Number.isNaN(rating)) return 0
    return Math.max(0, Math.min(5, Math.floor(rating)))
  }, [rating])

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsFavorite(!isFavorite)
  }

  return (
    <Card
      className="w-[200px] sm:w-[210px] md:w-[221px] h-[450px] sm:h-[465px] md:h-[480px] overflow-hidden rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.1)] bg-white 
                        transition-transform duration-300 ease-in-out
                        hover:shadow-[0_2px_10px_rgba(0,0,0,0.2)] hover:scale-100 
                        active:scale-95 cursor-pointer
                        flex flex-col flex-shrink-0"
    >
      {/* Phần hình ảnh */}
      <CardHeader className="p-0 relative h-[140px] sm:h-[155px] md:h-[170px] flex items-center justify-center">
        <Link href={`/products/${id}`} className="block">
          <div
            className="relative w-[120px] sm:w-[135px] md:w-[150px] h-[120px] sm:h-[135px] md:h-[150px] mx-auto 
                                    overflow-hidden rounded-md 
                                    transition-transform duration-300 ease-in-out 
                                    hover:scale-103 active:scale-95 cursor-pointer"
          >
            <Image src={image} alt={name} fill className="object-cover rounded-md" />
          </div>

          {/* Thông tin giảm giá */}
          <div className="absolute top-0 left-0 flex flex-col gap-1">
            {discount ? (
              <div
                className="bg-[#00777B] text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 
                                py-1 sm:py-1.5 rounded-r-md shadow-lg transform -translate-x-2 hover:translate-x-0 transition-all duration-300 ease-in-out 
                                hover:shadow-xl hover:scale-105 hover:bg-[#FF9999]"
              >
                -{discount}%
              </div>
            ) : null}
          </div>
        </Link>
      </CardHeader>

      {/* Phần thông tin sản phẩm */}
      <CardContent className="p-2 sm:p-2.5 md:p-3 flex-1 flex flex-col min-h-0">
        <Link href={`/products/${id}`} className="block flex flex-col h-full">
          <h3 className="text-[11px] text-black sm:text-sm md:text-sm font-medium line-clamp-2 mb-1 sm:mb-2 h-[40px] sm:h-[48px] flex items-center">
            {name}
          </h3>

          <div className="space-y-0.5 sm:space-y-1 flex-1 flex flex-col">
            {/* Giá sản phẩm */}
            <div className="flex items-baseline gap-1 sm:gap-2 h-[30px] sm:h-[36px] flex items-center">
              <p className="text-sm text-black sm:text-lg font-bold text-primary-500">
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND'
                }).format(price)}
              </p>

              {originalPrice ? (
                <p className="text-[10px] sm:text-sm text-gray-500 line-through">
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                  }).format(originalPrice)}
                </p>
              ) : null}
            </div>

            {promotion ? (
              <div className="text-[9px] sm:text-xs text-gray-600 line-clamp-2 h-[28px] sm:h-[32px] flex items-center">
                {promotion}
              </div>
            ) : null}

            <div className="flex-1" />
          </div>
        </Link>
      </CardContent>

      {/* Phần footer với đánh giá và nút yêu thích */}
      <CardFooter className="px-3 pb-3 pt-2 mt-auto h-[50px] flex items-center border-t border-gray-100">
        <div className="flex items-center justify-between w-full">
          {/* Đánh giá sao */}
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={15}
                className={cn(
                  'text-gray-300',
                  index < safeRating && 'text-yellow-400 fill-yellow-400'
                )}
              />
            ))}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleFavoriteClick}
            className={cn(
              'text-gray-500 hover:bg-transparent transition-colors duration-200',
              isFavorite ? 'text-red-500' : 'hover:text-red-500'
            )}
          >
            <span className="text-xs">Yêu thích</span>
            <Heart className={cn('h-4 w-4 mr-1', isFavorite && 'fill-red-500')} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default ProductCard
