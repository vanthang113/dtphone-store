'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Upload, Plus } from 'lucide-react';
import CustomerList from '@/components/admin/customers/CustomerList';
import CustomerFilter from '@/components/admin/customers/CustomerFilter';
import CustomerDashboard from '@/components/admin/customers/CustomerDashboard';
import CustomerExportImport from '@/components/admin/customers/CustomerExportImport';

// Mock data (replace with API in production)
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

const mockCustomers: Customer[] = [
  {
    customers_id: 'CUST001',
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0901234567',
    address: '123 Đường Láng, Hà Nội',
    password: 'hashed_password',
    created_at: '2024-01-15',
    gender: 'Nam',
    status: 'active',
    orders: [
      { id: 'ORD001', total: 5000000, createdAt: '2024-12-10' },
      { id: 'ORD002', total: 3000000, createdAt: '2024-12-15' },
    ],
    tags: ['VIP', 'Frequent'],
    notes: 'Khách hàng thân thiết, yêu cầu giao hàng nhanh.',
    recentActivity: [
      { action: 'Đặt hàng mới', timestamp: '2024-12-15 10:30' },
    ],
  },
  {
    customers_id: 'CUST002',
    name: 'Trần Thị B',
    email: 'tranthib@example.com',
    phone: '0912345678',
    address: '456 Nguyễn Trãi, TP.HCM',
    password: 'hashed_password',
    created_at: '2024-02-10',
    gender: 'Nữ',
    status: 'inactive',
    orders: [{ id: 'ORD003', total: 2000000, createdAt: '2024-11-20' }],
    tags: ['New'],
    notes: 'Khách mới, cần tư vấn thêm.',
    recentActivity: [],
  },
];

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    createdFrom: '',
    createdTo: '',
    totalSpent: '',
  });
  const [showExportImport, setShowExportImport] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Filtered customers based on filters
  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchSearch =
        customer.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        customer.phone.includes(filters.search) ||
        customer.email.toLowerCase().includes(filters.search.toLowerCase());

      const matchStatus = filters.status === 'all' || customer.status === filters.status;

      const matchCreated =
        (!filters.createdFrom || new Date(customer.created_at) >= new Date(filters.createdFrom)) &&
        (!filters.createdTo || new Date(customer.created_at) <= new Date(filters.createdTo));

      const totalSpent = customer.orders.reduce((sum, order) => sum + order.total, 0);
      const matchTotalSpent = !filters.totalSpent || totalSpent >= parseInt(filters.totalSpent);

      return matchSearch && matchStatus && matchCreated && matchTotalSpent;
    });
  }, [customers, filters]);

  // Handle tag updates
  const handleTagUpdate = (customerId: string, newTags: string[]) => {
    setCustomers(
      customers.map((c) =>
        c.customers_id === customerId ? { ...c, tags: newTags } : c
      )
    );
  };

  // Handle note updates
  const handleNoteUpdate = (customerId: string, note: string) => {
    setCustomers(
      customers.map((c) =>
        c.customers_id === customerId ? { ...c, notes: note } : c
      )
    );
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Quản lý khách hàng</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowExportImport(true)}>
            <Upload className="w-4 h-4 mr-2" />
            Xuất/Nhập dữ liệu
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Thêm khách hàng
          </Button>
        </div>
      </div>

      {/* Mini Dashboard */}
      <CustomerDashboard customers={customers} />

      {/* Filters */}
      <CustomerFilter filters={filters} setFilters={setFilters} />

      {/* Customer List */}
      <CustomerList
        customers={filteredCustomers}
        setSelectedCustomer={setSelectedCustomer}
        onTagUpdate={handleTagUpdate}
        onNoteUpdate={handleNoteUpdate}
      />

      {/* Export/Import Dialog */}
      <CustomerExportImport
        open={showExportImport}
        onOpenChange={setShowExportImport}
        onImport={(newCustomers) => setCustomers([...customers, ...newCustomers])}
      />
    </div>
  );
}