"use client";

import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
import { AddressForm, AddressFormValues } from "./AddressForm";

type Address = {
  id: number;
  recipientName: string;
  phone: string;
  fullAddress: string; // for display purposes
} & AddressFormValues;

const AddressItem = ({
  address,
  onEdit,
}: {
  address: Address;
  onEdit: (address: Address) => void;
}) => (
  <div className="border rounded-lg p-4 flex flex-col space-y-4">
    <div className="flex justify-between items-center">
      <h3 className="font-bold uppercase text-black">{address.type}</h3>
      {address.isDefault && (
        <span className="text-[#00868B] text-xs font-semibold border border-[#00868B] rounded-full px-2 py-0.5">
          Mặc định
        </span>
      )}
    </div>
    <div className="text-sm text-gray-700 space-y-2">
      <p className="font-bold">
        {address.recipientName}
        <span className="text-gray-500 font-normal px-2">|</span>
        {address.phone}
      </p>
      <p>{address.fullAddress}</p>
    </div>
    <div className="flex justify-end gap-x-4 text-sm">
      <button
        onClick={() => onEdit(address)}
        className="text-[#00868B] hover:underline"
      >
        Cập nhật
      </button>
      <button className="text-red-400 hover:underline">Xóa</button>
    </div>
  </div>
);

interface FormContainerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: AddressFormValues) => void;
  address?: Address | null;
}

function EditFormDrawer({ open, onOpenChange, onSave, address }: FormContainerProps) {
  const handleCancel = () => onOpenChange(false);
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{address ? "Cập nhật địa chỉ" : "Thêm địa chỉ mới"}</DrawerTitle>
          <DrawerDescription>
            Điền thông tin chi tiết. Nhấn lưu khi hoàn tất.
          </DrawerDescription>
        </DrawerHeader>
        <AddressForm onSave={onSave} onCancel={handleCancel} address={address} />
      </DrawerContent>
    </Drawer>
  );
}

function EditFormSheet({ open, onOpenChange, onSave, address }: FormContainerProps) {
  const handleCancel = () => onOpenChange(false);
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{address ? "Cập nhật địa chỉ" : "Thêm địa chỉ mới"}</SheetTitle>
          <SheetDescription>
            Điền thông tin chi tiết. Nhấn lưu khi hoàn tất.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <AddressForm onSave={onSave} onCancel={handleCancel} address={address} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function AddressCard() {
  const [open, setOpen] = React.useState(false);
  const [editingAddress, setEditingAddress] = React.useState<Address | null>(null);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const getFullAddress = (data: AddressFormValues) => {
    return `${data.street}, ${data.ward}, ${data.district}, ${data.city}`;
  };

  const [addresses, setAddresses] = React.useState<Address[]>([
    {
      id: 1,
      type: "Nhà",
      isDefault: true,
      recipientName: "Lộc Trần Trân",
      phone: "0789006730",
      street: "Trần Trân 1",
      ward: "phu-hoa",
      district: "thoai-son",
      city: "an-giang",
      fullAddress: "Trần Trân 1, Thị trấn Phú Hoà, Huyện Thoại Sơn, An Giang",
    },
    {
      id: 2,
      type: "Công ty",
      isDefault: false,
      recipientName: "Lộc Trần Trân",
      phone: "0789006730",
      street: "123 Đường ABC",
      ward: "pbn",
      district: "q1",
      city: "hcm",
      fullAddress: "123 Đường ABC, Phường Bến Nghé, Quận 1, TP.HCM",
    },
  ]);

  const handleAdd = () => {
    setEditingAddress(null);
    setOpen(true);
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setOpen(true);
  };

  const handleSave = (data: AddressFormValues) => {
    if (editingAddress) {
      setAddresses(
        addresses.map((addr) =>
          addr.id === editingAddress.id
            ? { ...addr, ...data, fullAddress: getFullAddress(data) }
            : addr
        )
      );
    } else {
      const newAddress: Address = {
        id: Date.now(),
        recipientName: "Lộc Trần Trân",
        phone: "0789006730",
        ...data,
        fullAddress: getFullAddress(data),
      };
      setAddresses([...addresses, newAddress]);
    }
    setOpen(false);
  };

  return (
    <>
      <Card className="bg-white w-full rounded-xl">
        <CardHeader className="py-0 flex w-full justify-between items-center">
          <h2 className="text-base font-bold text-black">Số địa chỉ</h2>
          <h2
            onClick={handleAdd}
            className="text-base font-bold flex items-center gap-1 text-[#00868B] cursor-pointer"
          >
            <Pencil className="w-4 h-4" />
            Thêm địa chỉ
          </h2>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {addresses.map((address) => (
              <AddressItem key={address.id} address={address} onEdit={handleEdit} />
            ))}
          </div>
        </CardContent>
      </Card>

      {isDesktop ? (
        <EditFormSheet open={open} onOpenChange={setOpen} onSave={handleSave} address={editingAddress} />
      ) : (
        <EditFormDrawer open={open} onOpenChange={setOpen} onSave={handleSave} address={editingAddress} />
      )}
    </>
  );
}
