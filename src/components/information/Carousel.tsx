import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export const Carousel = () => {
    const slides = [
        {
            href: 'https://cellphones.com.vn/smember/promotion/s-student',
            img: 'https://cdn2.cellphones.com.vn/690x300/https://dashboard.cellphones.com.vn/storage/edu-uu-dai-sinh-vien.jpg',
            alt: 'SAY HI S-STUDENT & S-TEACHER',
        },
        {
            href: 'https://cellphones.com.vn/chao-nam-hoc-moi',
            img: 'https://cdn2.cellphones.com.vn/690x300/https://dashboard.cellphones.com.vn/storage/deal-km-b2s-2025.jpg',
            alt: 'TỰU TRƯỜNG LÊN CẤP - SĂN DEAL HỜI NGAY',
        },
        {
            href: 'https://cellphones.com.vn/dien-thoai-samsung-galaxy-a26.html',
            img: 'https://cdn2.cellphones.com.vn/690x300/https://dashboard.cellphones.com.vn/storage/dien-thoai-samsung-galaxy-a26-deal-hot.png',
            alt: 'SAMSUNG A26 5G - ƯU ĐÃI TỐT MUA NGAY',
        },
        {
            href: 'https://cellphones.com.vn/dien-thoai-xiaomi-redmi-note-14-5g.html',
            img: 'https://cdn2.cellphones.com.vn/690x300/https://dashboard.cellphones.com.vn/storage/redmi-note-14-5g.png',
            alt: 'REDMI NOTE 14 5G - MUA NGAY',
        },
        {
            href: 'https://cellphones.com.vn/dien-thoai-nothing-phone-3a.html',
            img: 'https://cdn2.cellphones.com.vn/690x300/https://dashboard.cellphones.com.vn/storage/nothing-phone-3a.png',
            alt: 'NOTHING PHONE - GIÁ TỐT MUA NGAY',
        },
        {
            href: 'https://cellphones.com.vn/uu-dai-smember',
            img: 'https://cdn2.cellphones.com.vn/690x300/https://dashboard.cellphones.com.vn/storage/banner-trang-khuyen-mai-smember-30-31-05.png',
            alt: 'TẢI APP SMEMBER - TÍCH ĐIỂM NHẬN ƯU ĐÃI',
        },
    ];

    return (
        <Card className="p-small tablet:p-medium bg-pure-white rounded-1x-large w-full">
            <CardHeader>
                <div className="text-medium font-bold">Chương trình nổi bật</div>
            </CardHeader>
            <CardContent>
                <div className="w-full flex gap-small overflow-x-auto scroll-smooth snap-x snap-mandatory">
                    {slides.map((slide, index) => (
                        <Link
                            key={index}
                            href={slide.href}
                            target="_blank"
                            className="min-w-[80%] tablet:min-w-[33%] aspect-[23/10] rounded-base shadow-sm snap-start shrink-0"
                        >
                            <Image
                                alt={slide.alt}
                                title={slide.alt}
                                width={690}
                                height={300}
                                className="w-full h-full object-cover"
                                src={slide.img}
                            />
                        </Link>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}; 