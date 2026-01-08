import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

// Định nghĩa lại type Order (nên import từ type chung nếu có)
interface Product {
  name: string;
  quantity: number;
  price: number;
  color?: string | null;
  size?: string | null;
}
interface Payment {
  method: string;
  status: string;
}
interface Shipping {
  provider: string;
  tracking: string;
  status: string;
}
interface History {
  action: string;
  by: string;
  time: string;
}
interface Customer {
  name: string;
  phone: string;
  email: string;
  address: string;
}
export interface Order {
  id: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  customer: Customer;
  products: Product[];
  total: number;
  discount: number | string;
  payment: Payment;
  shipping: Shipping;
  history: History[];
  customerNote: string;
  internalNote: string;
}

interface OrderDetailProps {
  order: Order | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ order, open, onOpenChange }) => {
  if (!order) return null;
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full max-w-full h-screen overflow-y-auto p-2 sm:w-[95vw] sm:max-w-2xl md:w-[85vw] md:max-w-3xl lg:w-[70vw] lg:max-w-4xl xl:w-[60vw] xl:max-w-5xl sm:p-6"
      >
        <div className="flex flex-col gap-2 sm:gap-4">
          <SheetHeader>
            <SheetTitle className="text-lg sm:text-2xl text-destructive">Chi tiết đơn hàng #{order.id}</SheetTitle>
            <SheetDescription className="text-xs sm:text-base">
              Ngày đặt: {order.createdAt} | Cập nhật: {order.updatedAt}
            </SheetDescription>
          </SheetHeader>
          {/* Thông tin đơn hàng */}
          <Card className="p-2 sm:p-4 border-destructive">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg text-destructive">Thông tin đơn hàng</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
              <div>
                <div><span className="font-medium">Mã đơn hàng:</span> {order.id}</div>
                <div><span className="font-medium">Trạng thái:</span> <Badge variant="destructive">{order.status}</Badge></div>
                <div><span className="font-medium">Ngày đặt:</span> {order.createdAt}</div>
                <div><span className="font-medium">Cập nhật:</span> {order.updatedAt}</div>
              </div>
              <div>
                <div><span className="font-medium">Mã giảm giá:</span> {order.discount ? order.discount : "-"}</div>
                <div><span className="font-medium">Tổng giá trị:</span> {order.total.toLocaleString()}₫</div>
              </div>
            </CardContent>
          </Card>
          {/* Thông tin khách hàng */}
          <Card className="p-2 sm:p-4 border-destructive">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg text-destructive">Thông tin khách hàng</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
              <div>
                <div><span className="font-medium">Tên:</span> {order.customer.name}</div>
                <div><span className="font-medium">SĐT:</span> {order.customer.phone}</div>
                <div><span className="font-medium">Email:</span> {order.customer.email}</div>
              </div>
              <div>
                <div><span className="font-medium">Địa chỉ giao hàng:</span><br />{order.customer.address}</div>
              </div>
            </CardContent>
          </Card>
          {/* Chi tiết sản phẩm */}
          <Card className="p-2 sm:p-4 border-destructive">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg text-destructive">Chi tiết sản phẩm</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tên sản phẩm</TableHead>
                    <TableHead>Số lượng</TableHead>
                    <TableHead>Màu sắc</TableHead>
                    <TableHead>Giá</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.products.map((p: Product, idx: number) => (
                    <TableRow key={idx}>
                      <TableCell>{p.name}</TableCell>
                      <TableCell>{p.quantity}</TableCell>
                      <TableCell>{p.color || "-"}</TableCell>
                      <TableCell>{p.price.toLocaleString()}₫</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          {/* Thông tin thanh toán */}
          <Card className="p-2 sm:p-4 border-destructive">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg text-destructive">Thông tin thanh toán</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <div><span className="font-medium">Phương thức:</span> {order.payment.method}</div>
              <div><span className="font-medium">Trạng thái:</span> <Badge variant="destructive">{order.payment.status}</Badge></div>
            </CardContent>
          </Card>
          {/* Thông tin vận chuyển */}
          <Card className="p-2 sm:p-4 border-destructive">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg text-destructive">Thông tin vận chuyển</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <div><span className="font-medium">Đơn vị:</span> {order.shipping.provider}</div>
              <div><span className="font-medium">Mã vận đơn:</span> {order.shipping.tracking}</div>
              <div><span className="font-medium">Trạng thái:</span> <Badge variant="destructive">{order.shipping.status}</Badge></div>
            </CardContent>
          </Card>
          {/* Lịch sử thao tác */}
          <Card className="p-2 sm:p-4 border-destructive">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg text-destructive">Lịch sử thao tác</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Hành động</TableHead>
                    <TableHead>Người thực hiện</TableHead>
                    <TableHead>Thời gian</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.history.map((h: History, idx: number) => (
                    <TableRow key={idx}>
                      <TableCell>{h.action}</TableCell>
                      <TableCell>{h.by}</TableCell>
                      <TableCell>{h.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          {/* Ghi chú */}
          <Card className="p-2 sm:p-4 border-destructive">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg text-destructive">Ghi chú</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
              <div>
                <div className="font-medium mb-1">Khách hàng:</div>
                <Textarea value={order.customerNote} readOnly className="resize-none min-h-16" />
              </div>
              <div>
                <div className="font-medium mb-1">Nội bộ:</div>
                <Textarea value={order.internalNote} readOnly className="resize-none min-h-16" />
              </div>
            </CardContent>
          </Card>
          {/* Hành động */}
          <div className="flex flex-col sm:flex-row gap-2 justify-start">
            <Button variant="destructive">Cập nhật trạng thái</Button>
            <Button variant="outline">In hóa đơn</Button>
            <Button variant="outline">Liên hệ khách</Button>
            <Button variant="secondary">Chỉnh sửa</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default OrderDetail; 