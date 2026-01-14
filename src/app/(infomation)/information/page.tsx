import { Carousel } from "@/components/information/Carousel";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function InformationPage() {
    return (
        <div className="flex-auto min-w-0 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Card hiển thị thông tin tóm tắt về đơn hàng */}
                <Card className="text-black bg-white w-full p-4 md:p-6 rounded-xl md:col-span-2">
                    <CardHeader className="flex-row items-center justify-between p-0 pb-4">
                        <h2 className="text-lg font-semibold">
                            Đơn hàng của tôi
                        </h2>
                    </CardHeader>
                    <CardContent className="p-0">
                        Thông tin
                    </CardContent>
                </Card>
                {/* Card hiển thị các ưu đãi */}
                <Card className="text-black bg-white w-full p-4 md:p-6 rounded-xl">
                    <CardHeader className="flex-row items-center justify-between p-0 pb-4">
                        <h2 className="text-lg font-semibold">
                            Ưu đãi
                        </h2>
                    </CardHeader>
                    <CardContent className="p-0">
                        Thông tin
                    </CardContent>
                </Card>
            </div>
            {/* Card hiển thị danh sách sản phẩm yêu thích */}
            <Card className="text-black bg-white w-full p-4 md:p-6 rounded-xl">
                <CardHeader className="flex-row items-center justify-between p-0 pb-4">
                    <h2 className="text-lg font-semibold">
                        Sản phẩm yêu thích
                    </h2>
                </CardHeader>
                <CardContent className="p-0 w-full grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-4">
                    Thông tin
                </CardContent>
            </Card>
            {/* Carousel hiển thị các sản phẩm hoặc tin tức liên quan */}
            <Carousel />
        </div>
    );
}