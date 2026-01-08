import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Input } from '@/components/ui/input';

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

interface CustomerExportImportProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (newCustomers: Customer[]) => void;
}

export default function CustomerExportImport({
  open,
  onOpenChange,
  onImport,
}: CustomerExportImportProps) {
  const [file, setFile] = useState<File | null>(null);

  const handleExportExcel = () => {
    // Logic to export customers to Excel
    console.log('Exporting to Excel...');
  };

  const handleExportPDF = () => {
    // Logic to export customers to PDF
    console.log('Exporting to PDF...');
  };

  const handleImportCSV = () => {
    if (!file) return;
    // Mock CSV parsing logic (replace with actual CSV parser like PapaParse)
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n').slice(1); // Skip header
      const newCustomers: Customer[] = lines.map((line, idx) => {
        const [name, email, phone, address, created_at, gender, status] = line.split(',');
        return {
          customers_id: `CUST${100 + idx}`,
          name,
          email,
          phone,
          address,
          password: 'hashed_password',
          created_at,
          gender,
          status: status as 'active' | 'inactive',
          orders: [],
          tags: [],
          notes: '',
        };
      });
      onImport(newCustomers);
      setFile(null);
      onOpenChange(false);
    };
    reader.readAsText(file);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Xuất/Nhập dữ liệu khách hàng</DialogTitle>
          <DialogDescription>Quản lý xuất và nhập dữ liệu khách hàng</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium">Xuất dữ liệu</h3>
            <div className="flex gap-2 mt-2">
              <Button variant="outline" onClick={handleExportExcel}>
                <Download className="w-4 h-4 mr-2" />
                Xuất Excel
              </Button>
              <Button variant="outline" onClick={handleExportPDF}>
                <Download className="w-4 h-4 mr-2" />
                Xuất PDF
              </Button>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium">Nhập dữ liệu</h3>
            <Input
              type="file"
              accept=".csv"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="mt-2"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Đóng
          </Button>
          <Button onClick={handleImportCSV} disabled={!file}>
            Nhập CSV
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}