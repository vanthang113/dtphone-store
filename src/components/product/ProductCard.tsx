'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    rating: number;
    discount?: number;
    promotion?: string;
}

function ProductCard({ id, name, price, originalPrice, image, rating, discount, promotion }: ProductCardProps) {
    const [isFavorite, setIsFavorite] = useState(false)

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setIsFavorite(!isFavorite)
    }

    return (
        <Card className="w-[221px] h-[480px] overflow-hidden rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.1)] bg-white 
                        transition-transform duration-300 ease-in-out
                        hover:shadow-[0_2px_10px_rgba(0,0,0,0.2)] hover:scale-100 
                        active:scale-95 cursor-pointer
                        flex flex-col">
            {/* Phần hình ảnh */}
            <CardHeader className="p-0 relative h-[170px] flex items-center justify-center">
                <Link href={`/products/${id}`} className="block">
                    <div
                        className="relative w-[150px] h-[150px] mx-auto 
                                    overflow-hidden rounded-md 
                                    transition-transform duration-300 ease-in-out 
                                    hover:scale-103 active:scale-95 cursor-pointer"
                    >
                        <Image
                            src={image}
                            alt={name}
                            fill
                            className="object-cover rounded-md"
                        />
                    </div>
                    {/* Thông tin giảm giá */}
                    <div className="absolute top-0 left-0 flex flex-col gap-1">
                        {discount && (
                            <div className="bg-[#00777B] text-white text-xs font-bold px-3 
                                py-1.5 rounded-r-md shadow-lg transform -translate-x-2 hover:translate-x-0 transition-all duration-300 ease-in-out 
                                hover:shadow-xl hover:scale-105 hover:bg-[#FF9999]">
                                -{discount}%
                            </div>
                        )},
                    </div>
                </Link>
            </CardHeader>

            {/* Phần thông tin sản phẩm */}
            <CardContent className="p-3 flex-1 flex flex-col min-h-0">
                <Link href={`/products/${id}`} className="block flex flex-col h-full">
                    <h3 className="text-sm font-medium line-clamp-2 mb-2 h-[48px] flex items-center">{name}</h3>
                    <div className="space-y-1 flex-1 flex flex-col">
                        {/* Giá sản phẩm */}
                        <div className="flex items-baseline gap-2 h-[36px] flex items-center">
                            <p className="text-lg font-bold text-primary-500">
                                {new Intl.NumberFormat('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND'
                                }).format(price)}
                            </p>
                            {originalPrice && (
                                <p className="text-sm text-gray-500 line-through">
                                    {new Intl.NumberFormat('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND'
                                    }).format(originalPrice)}
                                </p>
                            )}
                        </div>
                        {promotion && (
                            <div className="text-xs text-gray-600 line-clamp-2 h-[32px] flex items-center">
                                {promotion}
                            </div>
                        )}
                        <div className="flex-1"></div>
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
                                    "text-gray-300",
                                    index < rating && "text-yellow-400 fill-yellow-400"
                                )}
                            />
                        ))}
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleFavoriteClick}
                        className={cn(
                            "text-gray-500 hover:bg-transparent transition-colors duration-200",
                            isFavorite ? "text-red-500" : "hover:text-red-500"
                        )}
                    >
                        <span className="text-xs">Yêu thích</span>
                        <Heart
                            className={cn(
                                "h-4 w-4 mr-1",
                                isFavorite && "fill-red-500"
                            )}
                        />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}
export default ProductCard;