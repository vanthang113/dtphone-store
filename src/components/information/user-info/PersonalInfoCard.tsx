"use client";

import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-media-query";
import { EditInfoForm } from "./EditInfoForm";

const UserInfoField = ({ label, value }: { label: string; value: string }) => (
  <div>
    <Label>{label}</Label>
    <div className="min-h-[36px] flex items-center px-3 text-base text-gray-800 bg-transparent border-b border-input justify-end">
      {value}
    </div>
  </div>
);

function EditFormDrawer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Cập nhật thông tin</DrawerTitle>
          <DrawerDescription>
            Thay đổi thông tin cá nhân của bạn. Nhấn lưu khi hoàn tất.
          </DrawerDescription>
        </DrawerHeader>
        <EditInfoForm onSave={() => onOpenChange(false)} />
      </DrawerContent>
    </Drawer>
  );
}

function EditFormSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Cập nhật thông tin</SheetTitle>
          <SheetDescription>
            Thay đổi thông tin cá nhân của bạn. Nhấn lưu khi hoàn tất.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <EditInfoForm onSave={() => onOpenChange(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function PersonalInfoCard() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const userInfo = {
    name: "Nguyễn Văn A",
    phone: "0123456789",
    birthday: "01/01/2000",
    email: "nguyenvana@email.com",
    address: "123 Đường ABC, Quận 1, TP.HCM",
  };

  return (
    <>
      <Card className="bg-white w-full rounded-xl">
        <CardHeader className="py-0 flex w-full justify-between items-center">
          <h2 className="text-base font-bold text-black">Thông tin cá nhân</h2>
          <h2
            onClick={() => setOpen(true)}
            className="text-base font-bold flex items-center gap-1 text-[#00868B] cursor-pointer"
          >
            <Pencil className="w-4 h-4" />
            Cập nhật
          </h2>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div className="flex flex-col gap-4">
              <UserInfoField label="Họ và tên" value={userInfo.name} />
              <UserInfoField label="Số điện thoại" value={userInfo.phone} />
              <UserInfoField label="Ngày sinh" value={userInfo.birthday} />
            </div>
            <div className="flex flex-col gap-4">
              <UserInfoField label="Email" value={userInfo.email} />
              <UserInfoField label="Địa chỉ" value={userInfo.address} />
            </div>
          </div>
        </CardContent>
      </Card>

      {isDesktop ? (
        <EditFormSheet open={open} onOpenChange={setOpen} />
      ) : (
        <EditFormDrawer open={open} onOpenChange={setOpen} />
      )}
    </>
  );
}
