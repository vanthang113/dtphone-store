"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddStaffManualPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    phone: "",
    email: "",
    address: "",
    cccd: "",
    code: "",
    position: "",
    department: "",
    startDate: "",
    contractType: "",
    status: "",
    account: "",
    role: "",
    permissions: "",
    salary: "",
    allowance: "",
    leaveDays: "",
    payMethod: "",
    bank: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((r) => setTimeout(r, 1000));
    setIsSubmitting(false);
    router.push("/admin/staff");
  };

  return (
    <div className="min-h-screen w-full px-4 py-6 sm:px-6 md:px-8 lg:py-16">
      <div className="container mx-auto">
        <h1 className="text-xl sm:text-2xl font-bold mb-6">Nhập nhân viên thủ công</h1>
        <Card className="p-4 sm:p-6 rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Thông tin nhân viên</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="Họ tên" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} />
              <Select onValueChange={(val) => handleChange("gender", val)}>
                <SelectTrigger><SelectValue placeholder="Giới tính" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Nam">Nam</SelectItem>
                  <SelectItem value="Nữ">Nữ</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Ngày sinh (dd/mm/yyyy)" value={formData.dob} onChange={(e) => handleChange("dob", e.target.value)} />
              <Input placeholder="SĐT" value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} />
              <Input placeholder="Email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} />
              <Input placeholder="Địa chỉ" value={formData.address} onChange={(e) => handleChange("address", e.target.value)} />
              <Input placeholder="CCCD" value={formData.cccd} onChange={(e) => handleChange("cccd", e.target.value)} />
              <Input placeholder="Mã nhân viên" value={formData.code} onChange={(e) => handleChange("code", e.target.value)} />
              <Input placeholder="Vị trí" value={formData.position} onChange={(e) => handleChange("position", e.target.value)} />
              <Input placeholder="Phòng ban" value={formData.department} onChange={(e) => handleChange("department", e.target.value)} />
              <Input placeholder="Ngày vào làm" value={formData.startDate} onChange={(e) => handleChange("startDate", e.target.value)} />
              <Input placeholder="Loại hợp đồng" value={formData.contractType} onChange={(e) => handleChange("contractType", e.target.value)} />
              <Input placeholder="Trạng thái" value={formData.status} onChange={(e) => handleChange("status", e.target.value)} />
              <Input placeholder="Tài khoản" value={formData.account} onChange={(e) => handleChange("account", e.target.value)} />
              <Input placeholder="Vai trò" value={formData.role} onChange={(e) => handleChange("role", e.target.value)} />
              <Select onValueChange={(val) => handleChange("permissions", val)}>
                <SelectTrigger><SelectValue placeholder="Phân quyền" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Site Admin">Site Admin</SelectItem>
                  <SelectItem value="Nhân viên">Nhân viên</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Lương cơ bản" value={formData.salary} onChange={(e) => handleChange("salary", e.target.value)} />
              <Input placeholder="Phụ cấp" value={formData.allowance} onChange={(e) => handleChange("allowance", e.target.value)} />
              <Input placeholder="Số ngày phép" value={formData.leaveDays} onChange={(e) => handleChange("leaveDays", e.target.value)} />
              <Input placeholder="Hình thức trả lương" value={formData.payMethod} onChange={(e) => handleChange("payMethod", e.target.value)} />
              <Input placeholder="Ngân hàng" value={formData.bank} onChange={(e) => handleChange("bank", e.target.value)} />

              {/* Action buttons */}
              <div className="col-span-full flex justify-end gap-4 mt-6">
                <Button variant="outline" type="button" onClick={() => router.push("/admin/staff")}>Hủy</Button>
                <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Đang lưu..." : "Lưu nhân viên"}</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}