import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';

interface CustomerFilterProps {
  filters: {
    search: string;
    status: string;
    createdFrom: string;
    createdTo: string;
    totalSpent: string;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      search: string;
      status: string;
      createdFrom: string;
      createdTo: string;
      totalSpent: string;
    }>
  >;
}

export default function CustomerFilter({ filters, setFilters }: CustomerFilterProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bộ lọc khách hàng</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Tìm kiếm theo tên, SĐT, email..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="max-w-full sm:max-w-sm"
          />
          <Select
            value={filters.status}
            onValueChange={(value) => setFilters({ ...filters, status: value })}
          >
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="active">Hoạt động</SelectItem>
              <SelectItem value="inactive">Không hoạt động</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="date"
            placeholder="Từ ngày"
            value={filters.createdFrom}
            onChange={(e) => setFilters({ ...filters, createdFrom: e.target.value })}
            className="w-full sm:w-40"
          />
          <Input
            type="date"
            placeholder="Đến ngày"
            value={filters.createdTo}
            onChange={(e) => setFilters({ ...filters, createdTo: e.target.value })}
            className="w-full sm:w-40"
          />
          <Input
            type="number"
            placeholder="Tổng chi tiêu tối thiểu (VNĐ)"
            value={filters.totalSpent}
            onChange={(e) => setFilters({ ...filters, totalSpent: e.target.value })}
            className="w-full sm:w-48"
          />
        </div>
      </CardContent>
    </Card>
  );
}