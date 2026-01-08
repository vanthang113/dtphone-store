'use client'
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState, useRef } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MemberCard from "@/components/information/MemberCard";



export default function PromotionPage() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = () => {
      const container = scrollRef.current;
      if (container) {
        setCanScrollLeft(container.scrollLeft > 0);
        setCanScrollRight(
          container.scrollLeft + container.clientWidth < container.scrollWidth
        );
      }
    };

    const scrollBy = (distance: number) => {
      const container = scrollRef.current;
      if (container) {
        container.scrollBy({ left: distance, behavior: "smooth" });
      }
    };

    const memberCards = [
      {
        bgImage: "https://cdn-static.smember.com.vn/_next/static/media/snull-bg-card.7284811e.png",
        title: "S-NULL",
        name: "Lộc Trần Trân",
        amount: "0đ",
        target: "3.000.000đ",
        updateInfo: "",
        needMore: "Cần chi tiêu thêm 3.000.000đ để lên hạng S-NEW",
      },
      {
        bgImage: "https://cdn-static.smember.com.vn/_next/static/media/snew-bg-card.f753cfbc.png",
        title: "S-NEW",
        needMore: "Chưa mở khóa hạng thành viên",
      },
      {
        bgImage: "https://cdn-static.smember.com.vn/_next/static/media/smem-bg-card.1fa74fdc.png",
        title: "S-MEM",
        needMore: "Chưa mở khóa hạng thành viên",
      },
      {
        bgImage: "https://cdn-static.smember.com.vn/_next/static/media/svip-bg-card.59d559cc.png",
        title: "S-VIP",
        needMore: "Chưa mở khóa hạng thành viên S-VIP",
      },
      {
        bgImage: "https://cdn-static.smember.com.vn/_next/static/media/spremium-bg-card.png",
        title: "S-PREMIUM",
        needMore: "Chưa mở khóa hạng thành viên S-PREMIUM",
      },
    ];

    // Thêm dữ liệu chi tiết cho từng hạng
    const promotionDetails = [
      {
        title: "S-NULL",
        conditions: "Tổng số tiền mua hàng tích luỹ trong năm nay và năm liền trước đạt từ 0 đến 3 triệu đồng, không tính đơn hàng doanh nghiệp B2B",
        offers: "Hiện chưa có ưu đãi mua hàng đặc biệt cho hạng thành viên S-NULL",
        policy: "Hiện chưa có chính sách ưu đãi phục vụ đặc biệt cho hạng thành viên S-NULL",
      },
      {
        title: "S-NEW",
        conditions: "Tổng số tiền mua hàng tích luỹ trong năm nay và năm liền trước đạt từ 3 triệu đến dưới 10 triệu đồng, không tính đơn hàng doanh nghiệp B2B",
        offers: "Ưu đãi mua hàng cho S-NEW sẽ được cập nhật khi bạn đạt hạng này.",
        policy: "Chính sách phục vụ cho S-NEW sẽ được cập nhật khi bạn đạt hạng này.",
      },
      {
        title: "S-MEM",
        conditions: "Tổng số tiền mua hàng tích luỹ trong năm nay và năm liền trước đạt từ 10 triệu đến dưới 30 triệu đồng, không tính đơn hàng doanh nghiệp B2B",
        offers: "Ưu đãi mua hàng cho S-MEM sẽ được cập nhật khi bạn đạt hạng này.",
        policy: "Chính sách phục vụ cho S-MEM sẽ được cập nhật khi bạn đạt hạng này.",
      },
      {
        title: "S-VIP",
        conditions: "Tổng số tiền mua hàng tích luỹ trong năm nay và năm liền trước đạt từ 30 triệu đến dưới 100 triệu đồng, không tính đơn hàng doanh nghiệp B2B",
        offers: "Ưu đãi mua hàng cho S-VIP sẽ được cập nhật khi bạn đạt hạng này.",
        policy: "Chính sách phục vụ cho S-VIP sẽ được cập nhật khi bạn đạt hạng này.",
      },
      {
        title: "S-PREMIUM",
        conditions: "Tổng số tiền mua hàng tích luỹ trong năm nay và năm liền trước đạt từ 100 triệu đồng trở lên, không tính đơn hàng doanh nghiệp B2B",
        offers: "Ưu đãi mua hàng cho S-PREMIUM sẽ được cập nhật khi bạn đạt hạng này.",
        policy: "Chính sách phục vụ cho S-PREMIUM sẽ được cập nhật khi bạn đạt hạng này.",
      },
    ];

    // Tính width cho card
    const cardCount = memberCards.length;
    const widthCard = cardCount <= 3 ? `calc(100%/${cardCount} - 1.5rem)` : 'calc(100%/3 - 1.5rem)';

    return (
        <div className="flex-auto min-w-0 space-y-4">
            <Card className="bg-white w-full p-4 md:p-6 rounded-xl md:col-span-2">
                <CardHeader className="flex-row items-center justify-between p-0 pb-4">
                    <h2 className="text-lg font-semibold">
                        Ưu đãi của bạn
                    </h2>
                </CardHeader>
                <CardContent className="p-0">
                    Thông tin
                </CardContent>
            </Card>
            <Card className="bg-white w-full p-4 md:p-6 rounded-xl md:col-span-2">
                <CardHeader className="p-4 md:p-6 relative">
                  {/* Nút trái */}
                  <button
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white border rounded-full shadow p-2 disabled:opacity-30"
                    style={{ display: canScrollLeft ? 'block' : 'none' }}
                    onClick={() => scrollBy(-300)}
                    disabled={!canScrollLeft}
                    aria-label="Scroll left"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  {/* Nút phải */}
                  <button
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white border rounded-full shadow p-2 disabled:opacity-30"
                    style={{ display: canScrollRight ? 'block' : 'none' }}
                    onClick={() => scrollBy(300)}
                    disabled={!canScrollRight}
                    aria-label="Scroll right"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <ScrollContainer
                    horizontal
                    className="w-full overflow-x-auto"
                    innerRef={scrollRef}
                    onScroll={handleScroll}
                  >
                        <div className={`flex space-x-6 w-full ${cardCount > 3 ? 'min-w-max' : ''}`}>
                            {memberCards.map((card, idx) => (
                                <div
                                  key={idx}
                                  className={`transition-all duration-300 cursor-pointer ${activeIndex === idx ? 'z-10' : ''}`}
                                  style={{
                                    width: widthCard,
                                    minWidth: 200,
                                    maxWidth: 400,
                                    transform: activeIndex === idx ? 'scale(1.01)' : 'scale(1)',
                                  }}
                                  onClick={() => setActiveIndex(idx)}
                                >
                                  <MemberCard {...card} highlight={activeIndex === idx} />
                                </div>
                            ))}
                        </div>
                    </ScrollContainer>
                </CardHeader>
                <CardContent className="p-0">
                    {/* Nội dung chi tiết theo từng hạng thành viên */}
                    <div className="p-4 space-y-6">
                      <div className="text-center">
                        <div className="font-semibold text-base mb-1 text-red-500 text-lg font-bold">Điều kiện thăng cấp</div>
                        <div className="text-gray-700 text-sm">{promotionDetails[activeIndex].conditions}</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-base mb-1 text-red-500  text-lg font-bold">Ưu đãi mua hàng</div>
                        <div className="text-gray-700 text-sm">{promotionDetails[activeIndex].offers}</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-base mb-1 text-red-500  text-lg font-bold">Chính sách phục vụ</div>
                        <div className="text-gray-700 text-sm">{promotionDetails[activeIndex].policy}</div>
                      </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}