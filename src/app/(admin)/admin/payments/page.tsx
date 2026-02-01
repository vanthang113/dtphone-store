'use client';

import React, { useState, useMemo, useCallback } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  CreditCard,
  TrendingUp,
  DollarSign,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Eye,
  Download,
} from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import PaymentDetail from '@/components/admin/payments/PaymentDetail';
import PaymentAnalytics from '@/components/admin/payments/PaymentAnalytics';

// Types
interface PaymentTransaction {
  id: string;
  orderId: string;
  amount: number;
  method: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded' | 'cancelled';
  transactionId?: string;
  gateway: string;
  customerName: string;
  customerEmail: string;
  createdAt: string;
  updatedAt: string;
  description?: string;
  fee: number;
  netAmount: number;
}

interface PaymentStats {
  totalRevenue: number;
  totalTransactions: number;
  successRate: number;
  pendingAmount: number;
}

// Mock data
const mockTransactions: PaymentTransaction[] = [
  {
    id: 'PAY001',
    orderId: 'ORD001',
    amount: 30400000,
    method: 'Thẻ tín dụng',
    status: 'completed',
    transactionId: 'TXN_123456789',
    gateway: 'VNPay',
    customerName: 'Nguyễn Văn A',
    customerEmail: 'a.nguyen@gmail.com',
    createdAt: '2024-12-15T10:30:00',
    updatedAt: '2024-12-15T10:32:00',
    description: 'Thanh toán đơn hàng iPhone 15 Pro',
    fee: 152000,
    netAmount: 30248000,
  },
  {
    id: 'PAY002',
    orderId: 'ORD002',
    amount: 15000000,
    method: 'Ví MoMo',
    status: 'pending',
    gateway: 'MoMo',
    customerName: 'Trần Thị B',
    customerEmail: 'b.tran@gmail.com',
    createdAt: '2024-12-15T11:15:00',
    updatedAt: '2024-12-15T11:15:00',
    description: 'Thanh toán đơn hàng Samsung Galaxy S24',
    fee: 75000,
    netAmount: 14925000,
  },
  {
    id: 'PAY003',
    orderId: 'ORD003',
    amount: 8500000,
    method: 'Chuyển khoản',
    status: 'failed',
    gateway: 'Banking',
    customerName: 'Lê Văn C',
    customerEmail: 'c.le@gmail.com',
    createdAt: '2024-12-15T09:45:00',
    updatedAt: '2024-12-15T09:47:00',
    description: 'Thanh toán đơn hàng MacBook Air',
    fee: 0,
    netAmount: 8500000,
  },
  {
    id: 'PAY004',
    orderId: 'ORD004',
    amount: 2500000,
    method: 'ZaloPay',
    status: 'refunded',
    transactionId: 'ZP_987654321',
    gateway: 'ZaloPay',
    customerName: 'Phạm Thị D',
    customerEmail: 'd.pham@gmail.com',
    createdAt: '2024-12-14T16:20:00',
    updatedAt: '2024-12-14T18:30:00',
    description: 'Hoàn tiền đơn hàng iPad',
    fee: 12500,
    netAmount: 2487500,
  },
];

const mockStats: PaymentStats = {
  totalRevenue: 56400000,
  totalTransactions: 4,
  successRate: 75,
  pendingAmount: 15000000,
};

export default function PaymentPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('today');
  const [selectedTransaction, setSelectedTransaction] = useState<PaymentTransaction | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Filtered transactions
  const filteredTransactions = useMemo(() => {
    // NOTE: dateFilter hiện chỉ lưu state (UI), chưa áp vào điều kiện lọc.
    // Nếu bạn muốn mình thêm lọc theo today/week/month... thì mình sẽ thêm ở bước sau.
    return mockTransactions.filter((transaction) => {
      const matchSearch =
        transaction.id.toLowerCase().includes(search.toLowerCase()) ||
        transaction.orderId.toLowerCase().includes(search.toLowerCase()) ||
        transaction.customerName.toLowerCase().includes(search.toLowerCase()) ||
        transaction.customerEmail.toLowerCase().includes(search.toLowerCase());

      const matchStatus = statusFilter === 'all' || transaction.status === statusFilter;
      const matchMethod = methodFilter === 'all' || transaction.method === methodFilter;

      return matchSearch && matchStatus && matchMethod;
    });
    // ✅ bỏ dateFilter khỏi deps vì chưa dùng trong logic
  }, [search, statusFilter, methodFilter]);

  const handleViewDetail = useCallback((transaction: PaymentTransaction) => {
    setSelectedTransaction(transaction);
    setIsDetailOpen(true);
  }, []);

  const StatusBadge = ({ status }: { status: PaymentTransaction['status'] }) => {
    const statusConfig = {
      pending: { label: 'Đang xử lý', variant: 'secondary' as const, icon: Clock },
      completed: { label: 'Thành công', variant: 'default' as const, icon: CheckCircle },
      failed: { label: 'Thất bại', variant: 'destructive' as const, icon: XCircle },
      refunded: { label: 'Đã hoàn tiền', variant: 'outline' as const, icon: RefreshCw },
      cancelled: { label: 'Đã hủy', variant: 'secondary' as const, icon: AlertTriangle },
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  return (
    <div className="p-2 sm:p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Quản lý thanh toán</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Xuất báo cáo
          </Button>
          <Button size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Đồng bộ
          </Button>
        </div>
      </div>

      {/* Main Content with Tabs */}
      <Tabs defaultValue="transactions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="transactions" className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Giao dịch
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Phân tích
          </TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tổng doanh thu</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(mockStats.totalRevenue)}</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="w-3 h-3 inline mr-1" />
                  +12.5% so với tháng trước
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tổng giao dịch</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStats.totalTransactions}</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="w-3 h-3 inline mr-1" />
                  +5 giao dịch hôm nay
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tỷ lệ thành công</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStats.successRate}%</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="w-3 h-3 inline mr-1" />
                  +2.1% so với tuần trước
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Chờ xử lý</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(mockStats.pendingAmount)}</div>
                <p className="text-xs text-muted-foreground">1 giao dịch đang chờ</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Bộ lọc giao dịch</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  placeholder="Tìm kiếm theo mã giao dịch, đơn hàng, khách hàng..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="max-w-full sm:max-w-sm"
                />

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả trạng thái</SelectItem>
                    <SelectItem value="pending">Đang xử lý</SelectItem>
                    <SelectItem value="completed">Thành công</SelectItem>
                    <SelectItem value="failed">Thất bại</SelectItem>
                    <SelectItem value="refunded">Đã hoàn tiền</SelectItem>
                    <SelectItem value="cancelled">Đã hủy</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={methodFilter} onValueChange={setMethodFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Phương thức" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả phương thức</SelectItem>
                    <SelectItem value="Thẻ tín dụng">Thẻ tín dụng</SelectItem>
                    <SelectItem value="Ví MoMo">Ví MoMo</SelectItem>
                    <SelectItem value="ZaloPay">ZaloPay</SelectItem>
                    <SelectItem value="Chuyển khoản">Chuyển khoản</SelectItem>
                    <SelectItem value="COD">Thanh toán khi nhận hàng</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Thời gian" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Hôm nay</SelectItem>
                    <SelectItem value="yesterday">Hôm qua</SelectItem>
                    <SelectItem value="week">Tuần này</SelectItem>
                    <SelectItem value="month">Tháng này</SelectItem>
                    <SelectItem value="quarter">Quý này</SelectItem>
                    <SelectItem value="year">Năm này</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Transactions Table */}
          <Card>
            <CardHeader>
              <CardTitle>Danh sách giao dịch</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mã giao dịch</TableHead>
                      <TableHead>Đơn hàng</TableHead>
                      <TableHead>Khách hàng</TableHead>
                      <TableHead>Phương thức</TableHead>
                      <TableHead>Số tiền</TableHead>
                      <TableHead>Phí</TableHead>
                      <TableHead>Thực nhận</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Thời gian</TableHead>
                      <TableHead>Hành động</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {filteredTransactions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={10} className="text-center py-6">
                          Không có giao dịch nào.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-mono text-sm">
                            {transaction.id}
                            {transaction.transactionId && (
                              <div className="text-xs text-muted-foreground">{transaction.transactionId}</div>
                            )}
                          </TableCell>

                          <TableCell>
                            <div className="font-medium">{transaction.orderId}</div>
                            <div className="text-sm text-muted-foreground">{transaction.gateway}</div>
                          </TableCell>

                          <TableCell>
                            <div className="font-medium">{transaction.customerName}</div>
                            <div className="text-sm text-muted-foreground">{transaction.customerEmail}</div>
                          </TableCell>

                          <TableCell>{transaction.method}</TableCell>

                          <TableCell className="font-medium">{formatCurrency(transaction.amount)}</TableCell>

                          <TableCell className="text-red-600">-{formatCurrency(transaction.fee)}</TableCell>

                          <TableCell className="font-medium text-green-600">{formatCurrency(transaction.netAmount)}</TableCell>

                          <TableCell>
                            <StatusBadge status={transaction.status} />
                          </TableCell>

                          <TableCell>
                            <div className="text-sm">{format(new Date(transaction.createdAt), 'dd/MM/yyyy', { locale: vi })}</div>
                            <div className="text-xs text-muted-foreground">
                              {format(new Date(transaction.createdAt), 'HH:mm', { locale: vi })}
                            </div>
                          </TableCell>

                          <TableCell>
                            <Button variant="outline" size="sm" onClick={() => handleViewDetail(transaction)}>
                              <Eye className="w-4 h-4 mr-1" />
                              Chi tiết
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <PaymentAnalytics />
        </TabsContent>
      </Tabs>

      {/* Payment Detail Sheet */}
      <PaymentDetail transaction={selectedTransaction} open={isDetailOpen} onOpenChange={setIsDetailOpen} />
    </div>
  );
}
