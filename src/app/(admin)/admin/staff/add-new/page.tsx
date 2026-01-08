"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function AddStaffSelectPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full px-4 py-6 sm:px-6 md:px-8 lg:py-16">
      <div className="container mx-auto max-w-xl">
        <div className="flex justify-between items-center mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            aria-label="Quay lại"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        <Card className="p-6 sm:p-8 rounded-lg shadow-sm text-center space-y-8">
          <CardHeader className="p-0">
            <CardTitle className="text-xl sm:text-2xl font-bold">
              Chọn phương thức nhập dữ liệu nhân viên
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Vui lòng chọn một trong hai cách để thêm thông tin nhân viên.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                className="flex-1 py-6 text-lg"
                onClick={() => router.push("/admin/staff/add-new/manual")}
              >
                Nhập thủ công
              </Button>
              <Button
                variant="outline"
                className="flex-1 py-6 text-lg"
                onClick={() => router.push("/admin/staff/add-new/file")}
              >
                Tải từ tệp JSON
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}