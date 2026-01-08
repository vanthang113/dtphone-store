import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  AlertTriangle,
  Copy,
  ExternalLink,
  Download,
  RotateCcw
} from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

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

interface PaymentDetailProps {
  transaction: PaymentTransaction | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PaymentDetail({ transaction, open, onOpenChange }: PaymentDetailProps) {
  if (!transaction) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const getStatusConfig = (status: PaymentTransaction['status']) => {
    const configs = {
      pending: { label: "Đang xử lý", variant: "secondary" as const, icon: Clock, color: "text-yellow-600" },
      completed: { label: "Thành công", variant: "default" as const, icon: CheckCircle, color: "text-green-600" },
      failed: { label: "Thất bại", variant: "destructive" as const, icon: XCircle, color: "text-red-600" },
      refunded: { label: "Đã hoàn tiền", variant: "outline" as const, icon: RefreshCw, color: "text-blue-600" },
      cancelled: { label: "Đã hủy", variant: "secondary" as const, icon: AlertTriangle, color: "text-gray-600" }
    };
    return configs[status];
  };

  const statusConfig = getStatusConfig(transaction.status);
  const StatusIcon = statusConfig.icon;

  const handleRefund = () => {
    // Implement refund logic
    console.log('Processing refund for:', transaction.id);
  };

  const handleRetry = () => {
    // Implement retry logic for failed transactions
    console.log('Retrying transaction:', transaction.id);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <StatusIcon className={`w-5 h-5 ${statusConfig.color}`} />
            Chi tiết giao dịch
          </SheetTitle>
          <SheetDescription>
            Thông tin chi tiết về giao dịch thanh toán
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Transaction Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Trạng thái giao dịch</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge variant={statusConfig.variant} className="flex items-center gap-2 text-sm px-3 py-1">
                  <StatusIcon className="w-4 h-4" />
                  {statusConfig.label}
                </Badge>
                <div className="text-sm text-muted-foreground">
                  Cập nhật: {format(new Date(transaction.updatedAt), "dd/MM/yyyy HH:mm", { locale: vi })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cơ bản</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Mã giao dịch</label>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-mono text-sm">{transaction.id}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(transaction.id)}
                      className="h-6 w-6 p-0"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Mã đơn hàng</label>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-medium">{transaction.orderId}</span>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>

              {transaction.transactionId && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Mã giao dịch bên thứ 3</label>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-mono text-sm">{transaction.transactionId}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(transaction.transactionId!)}
                      className="h-6 w-6 p-0"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Phương thức</label>
                  <div className="mt-1 font-medium">{transaction.method}</div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Cổng thanh toán</label>
                  <div className="mt-1 font-medium">{transaction.gateway}</div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Mô tả</label>
                <div className="mt-1">{transaction.description || 'Không có mô tả'}</div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin khách hàng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Tên khách hàng</label>
                <div className="mt-1 font-medium">{transaction.customerName}</div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <div className="mt-1">{transaction.customerEmail}</div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Details */}
          <Card>
            <CardHeader>
              <CardTitle>Chi tiết tài chính</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Số tiền giao dịch:</span>
                <span className="font-bold text-lg">{formatCurrency(transaction.amount)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Phí giao dịch:</span>
                <span className="text-red-600 font-medium">-{formatCurrency(transaction.fee)}</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center">
                <span className="font-medium">Số tiền thực nhận:</span>
                <span className="font-bold text-lg text-green-600">{formatCurrency(transaction.netAmount)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Lịch sử giao dịch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="font-medium">Tạo giao dịch</div>
                  <div className="text-sm text-muted-foreground">
                    {format(new Date(transaction.createdAt), "dd/MM/yyyy HH:mm", { locale: vi })}
                  </div>
                </div>
              </div>
              
              {transaction.createdAt !== transaction.updatedAt && (
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    transaction.status === 'completed' ? 'bg-green-500' : 
                    transaction.status === 'failed' ? 'bg-red-500' : 'bg-yellow-500'
                  }`}></div>
                  <div className="flex-1">
                    <div className="font-medium">Cập nhật trạng thái</div>
                    <div className="text-sm text-muted-foreground">
                      {format(new Date(transaction.updatedAt), "dd/MM/yyyy HH:mm", { locale: vi })}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Hành động</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-col gap-2">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Tải xuất hóa đơn
                </Button>
                
                {transaction.status === 'completed' && (
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-orange-600 hover:text-orange-700"
                    onClick={handleRefund}
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Hoàn tiền
                  </Button>
                )}
                
                {transaction.status === 'failed' && (
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-blue-600 hover:text-blue-700"
                    onClick={handleRetry}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Thử lại giao dịch
                  </Button>
                )}
                
                {transaction.transactionId && (
                  <Button variant="outline" className="w-full justify-start">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Xem trên cổng thanh toán
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
}