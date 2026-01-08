"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Edit,
  Eye,
  Search,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface Staff {
  id: string;
  name: string;
  role: string;
  gender: string;
  dob: string;
  phone: string;
  email: string;
  address: string;
  cccd: string;
  code: string;
  position: string;
  department: string;
  startDate: string;
  contractType: string;
  status: string;
  account: string;
  permissions: string;
  salary: string;
  allowance: string;
  leaveDays: string;
  payMethod: string;
  bank: string;
  docs: {
    label: string;
    file: string;
  }[];
}

const staffList: Staff[] = [
  {
    id: "NV001",
    name: "Phạm Bá Dương",
    role: "Admin",
    gender: "Nam",
    dob: "01/01/2000",
    phone: "0901234567",
    email: "duong@example.com",
    address: "Hà Nội, Việt Nam",
    cccd: "123456789000",
    code: "NV001",
    position: "Kế toán",
    department: "Tài chính",
    startDate: "01/06/2022",
    contractType: "Chính thức",
    status: "Đang làm việc",
    account: "duongpb",
    permissions: "Quản lý người dùng, Xem báo cáo",
    salary: "15,000,000 VND",
    allowance: "2,000,000 VND",
    leaveDays: "12 ngày/năm",
    payMethod: "Chuyển khoản",
    bank: "1234 5678 9012 (TPBank)",
    docs: [
      { label: "Sơ yếu lý lịch", file: "so-yeu-ly-lich.pdf" },
      { label: "Chứng minh nhân dân", file: "cccd.pdf" },
      { label: "Bằng cấp", file: "bang-dai-hoc.pdf" },
    ],
  },
  {
    id: "NV002",
    name: "Nguyễn Văn A",
    role: "Site Admin",
    gender: "Nam",
    dob: "15/05/1998",
    phone: "0902345678",
    email: "vana@example.com",
    address: "TP.HCM, Việt Nam",
    cccd: "223456789000",
    code: "NV002",
    position: "Quản lý kho",
    department: "Kho vận",
    startDate: "10/09/2023",
    contractType: "Chính thức",
    status: "Đang làm việc",
    account: "nguyenvana",
    permissions: "Quản lý kho, Xem báo cáo tồn",
    salary: "12,000,000 VND",
    allowance: "1,500,000 VND",
    leaveDays: "10 ngày/năm",
    payMethod: "Chuyển khoản",
    bank: "9876 5432 1001 (Vietcombank)",
    docs: [
      { label: "Sơ yếu lý lịch", file: "so-yeu-ly-lich.pdf" },
      { label: "CCCD", file: "cccd.pdf" },
    ],
  },
  {
    id: "NV003",
    name: "Trần Thị B",
    role: "Nhân viên",
    gender: "Nữ",
    dob: "20/12/1995",
    phone: "0903456789",
    email: "thib@example.com",
    address: "Đà Nẵng, Việt Nam",
    cccd: "323456789000",
    code: "NV003",
    position: "Bán hàng",
    department: "Kinh doanh",
    startDate: "05/03/2024",
    contractType: "Thử việc",
    status: "Đang làm việc",
    account: "tranthib",
    permissions: "Bán hàng, Xem đơn",
    salary: "8,000,000 VND",
    allowance: "1,000,000 VND",
    leaveDays: "6 ngày/năm",
    payMethod: "Tiền mặt",
    bank: "",
    docs: [{ label: "Sơ yếu lý lịch", file: "so-yeu-ly-lich.pdf" }],
  },
];

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-sm p-2 rounded-md hover:bg-muted/50 transition-colors duration-200">
      <span className="font-medium text-foreground">{label}: </span>
      <span className="text-muted-foreground">{value}</span>
    </div>
  );
}

export default function StaffPage() {
  const router = useRouter();
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddNew = () => router.push("/admin/staff/add-new");

  const handleViewStaffDetail = (staff: Staff) => {
    setSelectedStaff(staff);
    setIsDialogOpen(true);
  };

  const filteredStaff = useMemo(() => staffList, []);

  const renderStaffRow = (staff: Staff, index: number) => (
    <CardContent
      key={`${staff.id}-${index}`}
      className={`p-4 rounded-lg ${index % 2 === 0 ? "bg-muted/50" : "bg-background"}`}
    >
      <div className="flex items-center w-full space-x-4">
        {/* Avatar, Name & Role */}
        <div className="flex items-center flex-1 min-w-0 space-x-4">
          <Avatar className="w-14 h-14 shadow-[0_0_10px_1px_rgba(0,0,0,0.05)]">
            <AvatarImage src="/images/logo_S.png" alt={staff.name} />
            <AvatarFallback>{staff.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="truncate">
            <div className="font-medium text-sm sm:text-base truncate">
              {staff.name}
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground truncate">
              {staff.role}
            </div>
          </div>
        </div>

        {/* Gender + DOB */}
        <div className="hidden sm:flex flex-col items-center text-xs sm:text-sm w-36 shrink-0">
          <span>Giới tính: {staff.gender}</span>
          <span>Ngày sinh: {staff.dob}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 shrink-0">
          <Button variant="ghost" size="icon" onClick={() => handleViewStaffDetail(staff)}>
            <Eye className="h-4 w-4 text-blue-500" />
          </Button>
          <Button variant="ghost" size="icon">
            <Edit className="h-4 w-4 text-green-500" />
          </Button>
          <Button variant="ghost" size="icon">
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </div>
    </CardContent>
  );

  return (
    <div className="min-h-screen w-full">
      <div className="w-full px-4 py-6 sm:px-6 md:px-8 lg:py-16">
        <div className="container mx-auto">
          {/* Page Header */}
          <header className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold">Quản lý nhân viên</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Quản lý, cập nhật, thông tin chi tiết.
            </p>
          </header>

          {/* Filter & Add Section */}
          <Card className="p-4 sm:p-6 rounded-lg">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
              {/* Filters */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:space-x-4">
                <Select>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Quyền hạn" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="site-admin">Site Admin</SelectItem>
                    <SelectItem value="staff">Nhân viên</SelectItem>
                  </SelectContent>
                </Select>
                <div className="relative w-full sm:w-auto">
                  <Input
                    type="text"
                    placeholder="Tìm kiếm..."
                    className="border w-full sm:w-[200px] md:w-[300px] p-2 pl-8 rounded-lg bg-background text-foreground"
                  />
                  <Search className="h-4 w-4 text-muted-foreground absolute left-2 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Add new staff */}
              <Button
                className="bg-primary text-primary-foreground w-full sm:w-auto"
                onClick={handleAddNew}
              >
                + Thêm mới
              </Button>
            </div>

            {/* Staff List */}
            <div className="space-y-4">
              <h2 className="font-semibold">Nhân viên</h2>
              {filteredStaff.map(renderStaffRow)}
            </div>
          </Card>
        </div>
      </div>

      {/* Staff Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-full max-w-[95vw] sm:max-w-4xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 bg-background rounded-xl shadow-lg">
          {selectedStaff && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl sm:text-2xl font-bold text-foreground">
                  Chi tiết nhân viên: {selectedStaff.name}
                </DialogTitle>
                <DialogDescription className="text-sm sm:text-base text-muted-foreground">
                  Xem thông tin chi tiết về nhân viên
                </DialogDescription>
              </DialogHeader>

              <section className="space-y-6 sm:space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Avatar */}
                  <div className="flex justify-center md:block">
                    <Image
                      src="/images/avatar-placeholder.png"
                      alt={selectedStaff.name}
                      width={300}
                      height={300}
                      className="w-full max-w-[300px] rounded-lg object-cover shadow-sm"
                    />
                  </div>

                  {/* Detailed info */}
                  <div className="space-y-4 sm:space-y-6">
                    {/* Personal */}
                    <Card className="p-4 rounded-lg shadow-sm bg-card">
                      <h3 className="text-base sm:text-lg font-semibold mb-2">Thông tin cá nhân</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InfoItem label="Họ tên" value={selectedStaff.name} />
                        <InfoItem label="Giới tính" value={selectedStaff.gender} />
                        <InfoItem label="Ngày sinh" value={selectedStaff.dob} />
                        <InfoItem label="Số điện thoại" value={selectedStaff.phone} />
                        <InfoItem label="Email" value={selectedStaff.email} />
                        <InfoItem label="Địa chỉ" value={selectedStaff.address} />
                        <InfoItem label="CCCD" value={selectedStaff.cccd} />
                      </div>
                    </Card>

                    {/* Job */}
                    <Card className="p-4 rounded-lg shadow-sm bg-card">
                      <h3 className="text-base sm:text-lg font-semibold mb-2">Thông tin công việc</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InfoItem label="Mã nhân viên" value={selectedStaff.code} />
                        <InfoItem label="Vị trí" value={selectedStaff.position} />
                        <InfoItem label="Phòng ban" value={selectedStaff.department} />
                        <InfoItem label="Ngày vào làm" value={selectedStaff.startDate} />
                        <InfoItem label="Loại hợp đồng" value={selectedStaff.contractType} />
                        <InfoItem label="Trạng thái" value={selectedStaff.status} />
                      </div>
                    </Card>

                    {/* System */}
                    <Card className="p-4 rounded-lg shadow-sm bg-card">
                      <h3 className="text-base sm:text-lg font-semibold mb-2">Thông tin hệ thống</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InfoItem label="Tài khoản" value={selectedStaff.account} />
                        <InfoItem label="Vai trò" value={selectedStaff.role} />
                        <InfoItem label="Quyền hạn" value={selectedStaff.permissions} />
                      </div>
                    </Card>

                    {/* Salary */}
                    <Card className="p-4 rounded-lg shadow-sm bg-card">
                      <h3 className="text-base sm:text-lg font-semibold mb-2">Thông tin lương thưởng</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InfoItem label="Lương cơ bản" value={selectedStaff.salary} />
                        <InfoItem label="Phụ cấp" value={selectedStaff.allowance} />
                        <InfoItem label="Số ngày phép" value={selectedStaff.leaveDays} />
                        <InfoItem label="Hình thức trả lương" value={selectedStaff.payMethod} />
                        {selectedStaff.bank && (
                          <InfoItem label="Tài khoản ngân hàng" value={selectedStaff.bank} />
                        )}
                      </div>
                    </Card>

                    {/* Docs */}
                    <Card className="p-4 rounded-lg shadow-sm bg-card">
                      <h3 className="text-base sm:text-lg font-semibold mb-2">Tài liệu liên quan</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedStaff.docs.map((doc) => (
                          <InfoItem key={doc.label} label={doc.label} value={doc.file} />
                        ))}
                      </div>
                    </Card>
                  </div>
                </div>
              </section>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
