'use client'
import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import OrderDetail from "@/components/admin/orders/OrderDetail";

// Định nghĩa type rõ ràng cho Order và các thành phần liên quan
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
interface Order {
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

const mockOrders: Order[] = [
  {
    id: "ORD001",
    status: "Chờ xác nhận",
    createdAt: "2024-06-01 10:00",
    updatedAt: "2024-06-02 12:00",
    customer: {
      name: "Nguyễn Văn A",
      phone: "0901234567",
      email: "a.nguyen@gmail.com",
      address: "123 Lê Lợi, Q.1, TP.HCM",
    },
    products: [
      { name: "iPhone 15 Pro", quantity: 1, price: 30000000, color: "Đen", size: null },
      { name: "Ốp lưng", quantity: 2, price: 200000, color: "Trong suốt", size: null },
    ],
    total: 30400000,
    discount: 0,
    payment: {
      method: "COD",
      status: "Chưa thanh toán",
    },
    shipping: {
      provider: "Giao Hàng Nhanh",
      tracking: "GHN123456",
      status: "Chưa giao",
    },
    history: [
      { action: "Tạo đơn", by: "Khách hàng", time: "2024-06-01 10:00" },
      { action: "Chờ xác nhận", by: "Hệ thống", time: "2024-06-01 10:01" },
    ],
    customerNote: "Giao giờ hành chính",
    internalNote: "Liên hệ xác nhận trước khi giao",
  },
  // ... thêm mock order khác nếu muốn
];

export default function OrderPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [open, setOpen] = useState(false);

  const filteredOrders = mockOrders.filter((order: Order) => {
    const matchSearch =
      order.id.includes(search) ||
      order.customer.name.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.phone.includes(search);
    const matchStatus = statusFilter === "all" ? true : order.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleShowDetail = (order: Order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  return (
    <div className="p-2 sm:p-4 md:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Quản lý đơn hàng</h1>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4">
        <Input
          placeholder="Tìm kiếm theo mã đơn, tên khách, SĐT..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-full sm:max-w-xs"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Tất cả trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả trạng thái</SelectItem>
            <SelectItem value="Chờ xác nhận">Chờ xác nhận</SelectItem>
            <SelectItem value="Đang xử lý">Đang xử lý</SelectItem>
            <SelectItem value="Đang giao">Đang giao</SelectItem>
            <SelectItem value="Hoàn thành">Hoàn thành</SelectItem>
            <SelectItem value="Đã hủy">Đã hủy</SelectItem>
            <SelectItem value="Hoàn tiền">Hoàn tiền</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="overflow-x-auto rounded-lg border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã đơn</TableHead>
              <TableHead>Khách hàng</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Ngày đặt</TableHead>
              <TableHead>Cập nhật</TableHead>
              <TableHead>Tổng tiền</TableHead>
              <TableHead>Thanh toán</TableHead>
              <TableHead>Vận chuyển</TableHead>
              <TableHead>Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-6">
                  Không có đơn hàng nào.
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order: Order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>
                    {order.customer.name}
                    <br />
                    <span className="text-xs text-muted-foreground">{order.customer.phone}</span>
                  </TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{order.createdAt}</TableCell>
                  <TableCell>{order.updatedAt}</TableCell>
                  <TableCell>{order.total.toLocaleString()}₫</TableCell>
                  <TableCell>
                    {order.payment.method}
                    <br />
                    <span className="text-xs text-muted-foreground">{order.payment.status}</span>
                  </TableCell>
                  <TableCell>
                    {order.shipping.provider}
                    <br />
                    <span className="text-xs text-muted-foreground">{order.shipping.status}</span>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => handleShowDetail(order)}>
                      Xem chi tiết
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Sheet chi tiết đơn hàng */}
      <OrderDetail order={selectedOrder} open={open} onOpenChange={setOpen} />
    </div>
  );
}