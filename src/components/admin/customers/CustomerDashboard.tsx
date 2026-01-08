import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Users, UserPlus, DollarSign, MapPin } from 'lucide-react';

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

interface CustomerDashboardProps {
  customers: Customer[];
}

export default function CustomerDashboard({ customers }: CustomerDashboardProps) {
  const totalCustomers = customers.length;
  const newCustomersThisMonth = customers.filter(
    (c) => new Date(c.created_at).getMonth() === new Date().getMonth()
  ).length;
  const topSpenders = customers
    .map((c) => ({
      name: c.name,
      totalSpent: c.orders.reduce((sum, order) => sum + order.total, 0),
    }))
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 3);
  const customersByRegion = customers.reduce((acc, c) => {
    const region = c.address.split(', ').pop() || 'Unknown';
    acc[region] = (acc[region] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tổng số khách hàng</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalCustomers}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Khách hàng mới (tháng)</CardTitle>
          <UserPlus className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{newCustomersThisMonth}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Top chi tiêu</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {topSpenders.map((spender, idx) => (
              <div key={idx} className="text-sm">
                {spender.name}: {formatCurrency(spender.totalSpent)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Theo khu vực</CardTitle>
          <MapPin className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(customersByRegion).map(([region, count], idx) => (
              <div key={idx} className="text-sm">
                {region}: {count}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}