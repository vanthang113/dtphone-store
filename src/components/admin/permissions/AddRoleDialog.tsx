import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface AddRoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddRoleDialog: React.FC<AddRoleDialogProps> = ({ open, onOpenChange }) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>Tạo vai trò mới</DialogTitle>
        <DialogDescription>
          Tạo vai trò mới với các quyền truy cập cụ thể
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="roleName">Tên vai trò</Label>
          <Input id="roleName" placeholder="Nhập tên vai trò" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="roleDescription">Mô tả</Label>
          <Textarea id="roleDescription" placeholder="Mô tả vai trò và quyền hạn" />
        </div>
        <div className="space-y-2">
          <Label>Quyền truy cập</Label>
          <div className="space-y-3">
            <div className="space-y-2">
              <div className="font-medium">Sản phẩm</div>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="Sản phẩm-Xem" />
                  <Label htmlFor="Sản phẩm-Xem" className="text-sm">Xem sản phẩm</Label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Hủy
        </Button>
        <Button>Tạo vai trò</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default AddRoleDialog; 