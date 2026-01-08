"use client";

import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export interface Staff {
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
  docs: { label: string; file: string }[];
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-sm p-2 rounded-md hover:bg-muted/50 transition-colors duration-200">
      <span className="font-medium text-foreground">{label}: </span>
      <span className="text-muted-foreground truncate inline-block max-w-full">{value}</span>
    </div>
  );
}

export default function AddStaffFilePage() {
  const router = useRouter();

  const [uploadedStaff, setUploadedStaff] = useState<Staff | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".json")) {
      setUploadError("Chỉ hỗ trợ tệp JSON (.json)");
      setUploadedStaff(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string) as Staff;
        if (!data.id || !data.name) throw new Error("Thiếu trường bắt buộc (id, name…)");
        setUploadedStaff(data);
        setUploadError(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setUploadedStaff(null);
        setUploadError(`Tệp không hợp lệ – ${err.message}`);
      }
    };
    reader.readAsText(file);
  };

  const handleSave = async () => {
    if (!uploadedStaff) return;
    setIsSubmitting(true);

    await new Promise((r) => setTimeout(r, 1000));
    setIsSubmitting(false);
    router.push("/admin/staff");
  };

  return (
    <div className="min-h-screen w-full px-4 py-6 sm:px-6 md:px-8 lg:py-16">
      <div className="container mx-auto">
        <h1 className="text-xl sm:text-2xl font-bold mb-6">Thêm nhân viên từ tệp JSON</h1>
        <Card className="p-4 sm:p-6 rounded-lg shadow-sm space-y-8">
          {!uploadedStaff && (
            <div className="space-y-2 max-w-lg">
              <Input type="file" accept="application/json" onChange={handleFileChange} />
              {uploadError && <p className="text-red-500 text-sm">{uploadError}</p>}
              <p className="text-xs text-muted-foreground">Chọn tệp <code>.json</code> chứa dữ liệu nhân viên.</p>
            </div>
          )}

          {uploadedStaff && (
            <CardContent className="space-y-6 sm:space-y-8">
              <div className="flex flex-col items-center sm:flex-row sm:items-start sm:space-x-6">
                <Image
                  src="/images/avatar-placeholder.png"
                  alt={uploadedStaff.name}
                  width={200}
                  height={200}
                  className="w-full max-w-[200px] rounded-lg object-cover shadow-sm"
                />
                <div className="mt-4 sm:mt-0 space-y-1 text-center sm:text-left">
                  <h2 className="text-lg sm:text-xl font-semibold text-foreground truncate">{uploadedStaff.name}</h2>
                  <p className="text-sm text-muted-foreground">{uploadedStaff.role}</p>
                </div>
              </div>
              {/* Personal */}
              <Card className="p-4 rounded-lg bg-card shadow-sm">
                <CardHeader className="p-0 mb-3"><CardTitle className="text-base sm:text-lg font-semibold">Thông tin cá nhân</CardTitle></CardHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoItem label="Họ tên" value={uploadedStaff.name} />
                  <InfoItem label="Giới tính" value={uploadedStaff.gender} />
                  <InfoItem label="Ngày sinh" value={uploadedStaff.dob} />
                  <InfoItem label="Số điện thoại" value={uploadedStaff.phone} />
                  <InfoItem label="Email" value={uploadedStaff.email} />
                  <InfoItem label="Địa chỉ" value={uploadedStaff.address} />
                  <InfoItem label="CCCD" value={uploadedStaff.cccd} />
                </div>
              </Card>
              {/* Job */}
              <Card className="p-4 rounded-lg bg-card shadow-sm">
                <CardHeader className="p-0 mb-3"><CardTitle className="text-base sm:text-lg font-semibold">Thông tin công việc</CardTitle></CardHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoItem label="Mã nhân viên" value={uploadedStaff.code} />
                  <InfoItem label="Vị trí" value={uploadedStaff.position} />
                  <InfoItem label="Phòng ban" value={uploadedStaff.department} />
                  <InfoItem label="Ngày vào làm" value={uploadedStaff.startDate} />
                  <InfoItem label="Loại hợp đồng" value={uploadedStaff.contractType} />
                  <InfoItem label="Trạng thái" value={uploadedStaff.status} />
                </div>
              </Card>
              {/* System */}
              <Card className="p-4 rounded-lg bg-card shadow-sm">
                <CardHeader className="p-0 mb-3"><CardTitle className="text-base sm:text-lg font-semibold">Thông tin hệ thống</CardTitle></CardHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoItem label="Tài khoản" value={uploadedStaff.account} />
                  <InfoItem label="Vai trò" value={uploadedStaff.role} />
                  <InfoItem label="Quyền hạn" value={uploadedStaff.permissions} />
                </div>
              </Card>
              {/* Salary */}
              <Card className="p-4 rounded-lg bg-card shadow-sm">
                <CardHeader className="p-0 mb-3"><CardTitle className="text-base sm:text-lg font-semibold">Thông tin lương thưởng</CardTitle></CardHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoItem label="Lương cơ bản" value={uploadedStaff.salary} />
                  <InfoItem label="Phụ cấp" value={uploadedStaff.allowance} />
                  <InfoItem label="Số ngày phép" value={uploadedStaff.leaveDays} />
                  <InfoItem label="Hình thức trả lương" value={uploadedStaff.payMethod} />
                  {uploadedStaff.bank && <InfoItem label="Tài khoản ngân hàng" value={uploadedStaff.bank} />}
                </div>
              </Card>
              {/* Docs */}
              <Card className="p-4 rounded-lg bg-card shadow-sm">
                <CardHeader className="p-0 mb-3"><CardTitle className="text-base sm:text-lg font-semibold">Tài liệu liên quan</CardTitle></CardHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {uploadedStaff.docs.map((doc) => (
                    <InfoItem key={doc.label} label={doc.label} value={doc.file} />
                  ))}
                </div>
              </Card>
            </CardContent>
          )}

          {/* Action */}
          <div className="flex flex-col sm:flex-row justify-end gap-4">
            <Button variant="outline" onClick={() => router.push("/admin/staff")}>Hủy</Button>
            {uploadedStaff && (
              <Button disabled={isSubmitting} onClick={handleSave}>{isSubmitting ? "Đang lưu..." : "Lưu nhân viên"}</Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
