"use client";

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Shield, 
  Key, 
  Plus, 
  Search, 
  Filter, 
  Download,
  Eye,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle
} from "lucide-react";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import AddUserDialog from "../../../../components/admin/permissions/AddUserDialog";
import AddRoleDialog from "../../../../components/admin/permissions/AddRoleDialog";
import UserDetailDialog from "../../../../components/admin/permissions/UserDetailDialog";

// Mock data for demonstration
const mockUsers = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    role: "Admin",
    status: "active",
    createdAt: "2024-01-15",
    lastLogin: "2024-03-20 14:30"
  },
  {
    id: 2,
    name: "Trần Thị B",
    email: "tranthib@example.com",
    role: "Quản lý sản phẩm",
    status: "active",
    createdAt: "2024-02-10",
    lastLogin: "2024-03-19 09:15"
  },
  {
    id: 3,
    name: "Lê Văn C",
    email: "levanc@example.com",
    role: "Nhân viên hỗ trợ",
    status: "inactive",
    createdAt: "2024-01-20",
    lastLogin: "2024-03-15 16:45"
  },
  {
    id: 4,
    name: "Phạm Thị D",
    email: "phamthid@example.com",
    role: "Quản lý đơn hàng",
    status: "pending",
    createdAt: "2024-03-01",
    lastLogin: null
  }
];

const mockRoles = [
  {
    id: 1,
    name: "Super Admin",
    description: "Quyền truy cập toàn bộ hệ thống",
    permissions: ["all"],
    userCount: 1,
    createdAt: "2024-01-01"
  },
  {
    id: 2,
    name: "Quản lý sản phẩm",
    description: "Quản lý sản phẩm, danh mục, thuộc tính",
    permissions: ["products", "categories", "attributes"],
    userCount: 3,
    createdAt: "2024-01-10"
  },
  {
    id: 3,
    name: "Quản lý đơn hàng",
    description: "Xử lý đơn hàng, vận chuyển, thanh toán",
    permissions: ["orders", "shipping", "payments"],
    userCount: 2,
    createdAt: "2024-01-15"
  },
  {
    id: 4,
    name: "Nhân viên hỗ trợ",
    description: "Hỗ trợ khách hàng, xử lý phản hồi",
    permissions: ["support", "reviews"],
    userCount: 5,
    createdAt: "2024-02-01"
  }
];

const mockPermissions = [
  {
    id: 1,
    name: "Xem sản phẩm",
    description: "Xem danh sách và chi tiết sản phẩm",
    module: "products",
    category: "read"
  },
  {
    id: 2,
    name: "Thêm sản phẩm",
    description: "Tạo sản phẩm mới",
    module: "products",
    category: "create"
  },
  {
    id: 3,
    name: "Chỉnh sửa sản phẩm",
    description: "Cập nhật thông tin sản phẩm",
    module: "products",
    category: "update"
  },
  {
    id: 4,
    name: "Xóa sản phẩm",
    description: "Xóa sản phẩm khỏi hệ thống",
    module: "products",
    category: "delete"
  },
  {
    id: 5,
    name: "Quản lý đơn hàng",
    description: "Xem và xử lý đơn hàng",
    module: "orders",
    category: "manage"
  },
  {
    id: 6,
    name: "Quản lý người dùng",
    description: "Thêm, sửa, xóa người dùng",
    module: "users",
    category: "manage"
  }
];

const mockActivityLog = [
  {
    id: 1,
    action: "Gán quyền",
    user: "Nguyễn Văn A",
    target: "Trần Thị B",
    details: "Gán vai trò 'Quản lý sản phẩm'",
    timestamp: "2024-03-20 15:30",
    ip: "192.168.1.100"
  },
  {
    id: 2,
    action: "Tạo vai trò",
    user: "Admin",
    target: "Nhân viên hỗ trợ",
    details: "Tạo vai trò mới với quyền hỗ trợ",
    timestamp: "2024-03-19 10:15",
    ip: "192.168.1.101"
  },
  {
    id: 3,
    action: "Xóa quyền",
    user: "Nguyễn Văn A",
    target: "Lê Văn C",
    details: "Thu hồi quyền 'Quản lý đơn hàng'",
    timestamp: "2024-03-18 14:20",
    ip: "192.168.1.100"
  }
];

export default function Permissions() {
  // Chỉ giữ state mở/đóng dialog nếu cần hiển thị dialog
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [showAddRoleDialog, setShowAddRoleDialog] = useState(false);
  const [showUserDetailDialog, setShowUserDetailDialog] = useState(false);
  const [tab, setTab] = useState("users");

  // Badge mẫu
  const StatusBadge = <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Kích hoạt</span>;
  const RoleBadge = <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Quản lý sản phẩm</span>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Quản lý phân quyền</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button  className='min-w-40' variant="outline" onClick={() => setShowAddUserDialog(true)}>
            Thêm người dùng
          </Button>
          <Button className='min-w-40' variant="outline" onClick={() => setShowAddRoleDialog(true)}>
            Thêm vai trò
          </Button>
          <Button className='min-w-40' variant="outline">
            Xuất dữ liệu
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Input placeholder="Tìm kiếm theo tên, email hoặc vai trò..." className="pl-10" />
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="active">Kích hoạt</SelectItem>
                <SelectItem value="inactive">Bị khóa</SelectItem>
                <SelectItem value="pending">Chờ duyệt</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Vai trò" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả vai trò</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Quản lý sản phẩm">Quản lý sản phẩm</SelectItem>
                <SelectItem value="Quản lý đơn hàng">Quản lý đơn hàng</SelectItem>
                <SelectItem value="Nhân viên hỗ trợ">Nhân viên hỗ trợ</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={tab} onValueChange={setTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users" className="flex items-center gap-2">
            Người dùng (1)
          </TabsTrigger>
          <TabsTrigger value="roles" className="flex items-center gap-2">
            Vai trò (1)
          </TabsTrigger>
          <TabsTrigger value="permissions" className="flex items-center gap-2">
            Quyền (1)
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            Lịch sử
          </TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Danh sách người dùng</CardTitle>
              <CardDescription>
                Quản lý thông tin và quyền truy cập của người dùng hệ thống
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Người dùng</TableHead>
                      <TableHead>Vai trò</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Ngày tạo</TableHead>
                      <TableHead>Đăng nhập cuối</TableHead>
                      <TableHead>Hành động</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div>
                          <div className="font-medium">Nguyễn Văn A</div>
                          <div className="text-sm text-muted-foreground">nguyenvana@example.com</div>
                        </div>
                      </TableCell>
                      <TableCell>{RoleBadge}</TableCell>
                      <TableCell>{StatusBadge}</TableCell>
                      <TableCell>2024-01-15</TableCell>
                      <TableCell>2024-03-20 14:30</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => setShowUserDetailDialog(true)}>
                            Xem
                          </Button>
                          <Button size="sm" variant="outline">Sửa</Button>
                          <Button size="sm" variant="destructive">Xóa</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Roles Tab */}
        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Danh sách vai trò</CardTitle>
              <CardDescription>
                Quản lý các vai trò và quyền hạn trong hệ thống
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="relative">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Quản lý sản phẩm</CardTitle>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline">Sửa</Button>
                        <Button size="sm" variant="destructive">Xóa</Button>
                      </div>
                    </div>
                    <CardDescription>Quản lý sản phẩm, danh mục, thuộc tính</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Số người dùng:</span>
                        <span>3</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Ngày tạo:</span>
                        <span className="text-muted-foreground">2024-01-10</span>
                      </div>
                      <Separator />
                      <div>
                        <div className="text-sm font-medium mb-2">Quyền hạn:</div>
                        <div className="flex flex-wrap gap-1">
                          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">products</span>
                          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">categories</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Permissions Tab */}
        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Danh sách quyền</CardTitle>
              <CardDescription>
                Quản lý các quyền truy cập chi tiết trong hệ thống
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold capitalize">products</h3>
                  <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="font-medium">Xem sản phẩm</div>
                          <div className="text-sm text-muted-foreground">Xem danh sách và chi tiết sản phẩm</div>
                          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">read</span>
                        </div>
                        <Switch />
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Log Tab */}
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lịch sử hoạt động</CardTitle>
              <CardDescription>
                Theo dõi các thay đổi quyền và hoạt động quản trị
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600">Q</span>
                    </div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Gán quyền</span>
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">2024-03-20 15:30</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">Nguyễn Văn A</span> đã gán quyền cho <span className="font-medium">Trần Thị B</span>
                    </div>
                    <div className="text-sm">Gán vai trò 'Quản lý sản phẩm'</div>
                    <div className="text-xs text-muted-foreground">IP: 192.168.1.100</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add User Dialog */}
      <AddUserDialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog} />
      {/* Add Role Dialog */}
      <AddRoleDialog open={showAddRoleDialog} onOpenChange={setShowAddRoleDialog} />
      {/* User Detail Dialog */}
      <UserDetailDialog open={showUserDetailDialog} onOpenChange={setShowUserDetailDialog} />
    </div>
  );
}