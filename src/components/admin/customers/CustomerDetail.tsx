import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import CustomerTags from './CustomerTags';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

interface Customer {
  customers_id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  created_at: string;
  gender?: string;
  status: 'active' | 'inactive';
  orders: { id: string; total: number; createdAt: string }[];
  tags: string[];
  notes: string;
  recentActivity?: { action: string; timestamp: string }[];
}

interface CustomerDetailProps {
  customer: Customer | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTagUpdate: (customerId: string, tags: string[]) => void;
  onNoteUpdate: (customerId: string, note: string) => void;
}

export default function CustomerDetail({
  customer,
  open,
  onOpenChange,
  onTagUpdate,
  onNoteUpdate,
}: CustomerDetailProps) {
  const [note, setNote] = useState(customer?.notes || '');

  if (!customer) return null;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

  const handleSaveNote = () => {
    onNoteUpdate(customer.customers_id, note);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full max-w-full h-screen overflow-y-auto p-2 sm:p-6 sm:w-[95vw] sm:max-w-2xl md:w-[85vw] md:max-w-3xl lg:w-[70vw] lg:max-w-4xl xl:w-[60vw] xl:max-w-5xl">
        <div className="flex flex-col gap-4">
          <SheetHeader>
            <SheetTitle className="text-lg sm:text-2xl text-destructive">
              Chi tiết khách hàng #{customer.customers_id}
            </SheetTitle>
            <SheetDescription className="text-xs sm:text-base">
              Ngày tạo: {format(new Date(customer.created_at), 'dd/MM/yyyy', { locale: vi })}
            </SheetDescription>
          </SheetHeader>

          {/* Personal Information */}
          <Card className="p-2 sm:p-4 border-destructive">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg text-destructive">
                Thông tin cá nhân
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
              <div>
                <div><span className="font-medium">Tên:</span> {customer.name}</div>
                <div><span className="font-medium">Email:</span> {customer.email}</div>
                <div><span className="font-medium">SĐT:</span> {customer.phone}</div>
              </div>
              <div>
                <div><span className="font-medium">Địa chỉ:</span> {customer.address}</div>
                <div><span className="font-medium">Giới tính:</span> {customer.gender || '-'}</div>
                <div>
                  <span className="font-medium">Trạng thái:</span>{' '}
                  <Badge variant={customer.status === 'active' ? 'default' : 'destructive'}>
                    {customer.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order History */}
          <Card className="p-2 sm:p-4 border-destructive">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg text-destructive">
                Lịch sử đơn hàng
              </CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã đơn hàng</TableHead>
                    <TableHead>Tổng tiền</TableHead>
                    <TableHead>Ngày đặt</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customer.orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{formatCurrency(order.total)}</TableCell>
                      <TableCell>
                        {format(new Date(order.createdAt), 'dd/MM/yyyy', { locale: vi })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          {customer.recentActivity && customer.recentActivity.length > 0 && (
            <Card className="p-2 sm:p-4 border-destructive">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg text-destructive">
                  Hoạt động gần đây
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Hành động</TableHead>
                      <TableHead>Thời gian</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customer.recentActivity.map((activity, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{activity.action}</TableCell>
                        <TableCell>
                          {format(new Date(activity.timestamp), 'dd/MM/yyyy HH:mm', { locale: vi })}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {/* Tags */}
          <Card className="p-2 sm:p-4 border-destructive">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg text-destructive">
                Nhãn phân loại
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CustomerTags
                customerId={customer.customers_id}
                tags={customer.tags}
                onTagUpdate={onTagUpdate}
              />
            </CardContent>
          </Card>

          {/* Notes */}
          <Card className="p-2 sm:p-4 border-destructive">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg text-destructive">Ghi chú nội bộ</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="resize-none min-h-16"
                placeholder="Thêm ghi chú..."
              />
              <Button className="mt-2" onClick={handleSaveNote}>
                Lưu ghi chú
              </Button>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="destructive">Cập nhật trạng thái</Button>
            <Button variant="outline">Liên hệ khách hàng</Button>
            <Button variant="secondary">Chỉnh sửa</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}