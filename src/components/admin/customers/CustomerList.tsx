import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import CustomerDetail from './CustomerDetail';
import { Card } from '@tremor/react';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

interface CustomerListProps {
  customers: Customer[];
  setSelectedCustomer: (customer: Customer | null) => void;
  onTagUpdate: (customerId: string, tags: string[]) => void;
  onNoteUpdate: (customerId: string, note: string) => void;
}

export default function CustomerList({
  customers,
  setSelectedCustomer,
  onTagUpdate,
  onNoteUpdate,
}: CustomerListProps) {
  const [openDetail, setOpenDetail] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);

  const handleViewDetail = (customer: Customer) => {
    setCurrentCustomer(customer);
    setSelectedCustomer(customer);
    setOpenDetail(true);
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Danh sách khách hàng</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên khách hàng</TableHead>
              <TableHead>Số điện thoại</TableHead>
              <TableHead>Giới tính</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Số đơn hàng</TableHead>
              <TableHead>Tổng chi tiêu</TableHead>
              <TableHead>Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6">
                  Không có khách hàng nào.
                </TableCell>
              </TableRow>
            ) : (
              customers.map((customer) => {
                const totalSpent = customer.orders.reduce((sum, order) => sum + order.total, 0);
                return (
                  <TableRow key={customer.customers_id}>
                    <TableCell>
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-sm text-muted-foreground">{customer.email}</div>
                    </TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{customer.gender || '-'}</TableCell>
                    <TableCell>
                      <Badge variant={customer.status === 'active' ? 'default' : 'destructive'}>
                        {customer.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                      </Badge>
                    </TableCell>
                    <TableCell>{customer.orders.length}</TableCell>
                    <TableCell>{formatCurrency(totalSpent)}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => handleViewDetail(customer)}>
                        <Eye className="w-4 h-4 mr-1" />
                        Chi tiết
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CustomerDetail
        customer={currentCustomer}
        open={openDetail}
        onOpenChange={setOpenDetail}
        onTagUpdate={onTagUpdate}
        onNoteUpdate={onNoteUpdate}
      />
    </Card>
  );
}