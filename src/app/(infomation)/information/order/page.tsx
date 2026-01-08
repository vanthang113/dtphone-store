'use client';

import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { Calendar as CalendarIcon } from "lucide-react";
import ScrollContainer from 'react-indiana-drag-scroll';

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";

// Mảng chứa các trạng thái của đơn hàng để filter
const statuses = [
    'Tất cả',
    'Chờ xác nhận',
    'Đã xác nhận',
    'Đang vận chuyển',
    'Đã giao hàng',
    'Đã hủy'
];

export default function OrderPage() {
    // State quản lý tab trạng thái đang được chọn
    const [activeStatus, setActiveStatus] = useState(statuses[0]);
    // State quản lý khoảng ngày được chọn trong calendar
    const [date, setDate] = useState<DateRange | undefined>(undefined);
    // State quản lý việc mở/đóng calendar
    const [isPickerOpen, setIsPickerOpen] = useState(false);

    return (
        <div className="flex-auto min-w-0 space-y-4">
            <Card className="bg-white w-full rounded-xl">
                <CardHeader className="p-4 md:p-6">
                    {/* Component thanh cuộn ngang cho các tab trạng thái */}
                    <div className="border-b border-t border-neutral-200 overflow-x-auto scrollbar-hide">
                        <ScrollContainer horizontal >
                            <nav className="px-4 md:px-6 -mb-px flex space-x-6 min-w-max">
                                {statuses.map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setActiveStatus(status)}
                                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeStatus === status
                                            ? 'border-red-500 text-red-600'
                                            : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                                            }`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </nav>
                        </ScrollContainer>
                    </div>

                    {/* Khu vực bộ lọc theo ngày */}
                    <div className="flex flex-col md:flex-row items-center md:items-center gap-y-2 md:gap-y-0 md:gap-x-4 w-full">
                        <h3 className="text-base font-semibold">Lịch sử mua hàng của bạn</h3>
                        <div className="relative w-full md:w-[260px]">
                            {/* Nút bấm để mở/đóng calendar */}
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full flex items-center justify-between font-normal",
                                    !date && "text-muted-foreground"
                                )}
                                onClick={() => setIsPickerOpen(!isPickerOpen)}
                            >
                                <span className="flex items-center gap-2">
                                    <CalendarIcon className="h-4 w-4" />
                                    Chọn ngày
                                </span>
                                {/* Hiển thị khoảng ngày đã chọn */}
                                <span className="text-xs text-neutral-500 font-normal">
                                    {date?.from ? (
                                        date.to ? (
                                            <>
                                                {date.from.toLocaleDateString("vi-VN")} - {date.to.toLocaleDateString("vi-VN")}
                                            </>
                                        ) : (
                                            date.from.toLocaleDateString("vi-VN")
                                        )
                                    ) : (
                                        ""
                                    )}
                                </span>
                            </Button>
                            {/* Component Calendar, chỉ hiển thị khi isPickerOpen là true */}
                            {isPickerOpen && (
                                <div className="absolute right-0 top-full mt-2 z-10">
                                    <Card className="bg-white border rounded-md shadow-lg">
                                        <Calendar
                                            initialFocus
                                            mode="range"
                                            defaultMonth={date?.from}
                                            selected={date}
                                            onSelect={setDate}
                                            numberOfMonths={1}
                                        />
                                    </Card>
                                </div>
                            )}
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                    {/* Nội dung danh sách đơn hàng sẽ được hiển thị ở đây */}
                    Thông tin đơn hàng sẽ được hiển thị ở đây.
                </CardContent>
            </Card>
        </div>
    );
}