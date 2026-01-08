import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface UserDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const StatusBadge = <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Kích hoạt</span>;
const RoleBadge = <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Quản lý sản phẩm</span>;

const UserDetailDialog: React.FC<UserDetailDialogProps> = ({ open, onOpenChange }) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>Chi tiết người dùng</DialogTitle>
        <DialogDescription>
          Thông tin chi tiết và quyền truy cập của người dùng
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium">Họ và tên</Label>
            <p>Nguyễn Văn A</p>
          </div>
          <div>
            <Label className="text-sm font-medium">Email</Label>
            <p>nguyenvana@example.com</p>
          </div>
          <div>
            <Label className="text-sm font-medium">Vai trò</Label>
            <div className="mt-1">{RoleBadge}</div>
          </div>
          <div>
            <Label className="text-sm font-medium">Trạng thái</Label>
            <div className="mt-1">{StatusBadge}</div>
          </div>
          <div>
            <Label className="text-sm font-medium">Ngày tạo</Label>
            <p>2024-01-15</p>
          </div>
          <div>
            <Label className="text-sm font-medium">Đăng nhập cuối</Label>
            <p>2024-03-20 14:30</p>
          </div>
        </div>
        <Separator />
        <div>
          <Label className="text-sm font-medium mb-2">Quyền truy cập</Label>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox checked />
              <Label className="text-sm">Xem sản phẩm</Label>
            </div>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Đóng
        </Button>
        <Button>Lưu thay đổi</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default UserDetailDialog; 