"use client";

import Link from "next/link";
import { 
  Home, 
  Users, 
  Film, 
  Calendar, 
  Ticket, 
  Settings, 
  BarChart3,
  LogOut,
  Building,
  UserCheck,
  Percent,
  Monitor,
  Database,
  Shield,
  MessageSquare
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Danh sách các mục sidebar cho trang admin, mỗi mục gồm tiêu đề, đường dẫn, icon và mô tả
const sidebarItems = [
  // Quản lý chung
  {
    group: "Quản lý chung",
    items: [
      {
        title: "Dashboard",
        href: "/admin",
        icon: Home,
        description: "Tổng quan hệ thống"
      },
    ]
  },
  // Sản phẩm
  {
    group: "Sản phẩm",
    items: [
      {
        title: "Sản phẩm",
        href: "/admin/products",
        icon: Database,
        description: "Quản lý sản phẩm, thêm, sửa, xóa"
      },
      {
        title: "Danh mục",
        href: "/admin/categories",
        icon: Monitor,
        description: "Quản lý danh mục sản phẩm"
      },
      {
        title: "Thuộc tính sản phẩm",
        href: "/admin/attributes",
        icon: Settings,
        description: "Quản lý màu sắc, kích thước, thuộc tính khác"
      },
      {
        title: "Kho hàng",
        href: "/admin/inventory",
        icon: BarChart3,
        description: "Quản lý tồn kho, nhập xuất kho"
      },
    ]
  },
  // Bán hàng
  {
    group: "Bán hàng",
    items: [
      {
        title: "Đơn hàng",
        href: "/admin/orders",
        icon: Ticket,
        description: "Quản lý đơn hàng, trạng thái, vận chuyển"
      },
      {
        title: "Vận chuyển",
        href: "/admin/shipping",
        icon: Calendar,
        description: "Quản lý đơn vị vận chuyển, trạng thái giao hàng"
      },
      {
        title: "Thanh toán",
        href: "/admin/payments",
        icon: Percent,
        description: "Quản lý phương thức thanh toán, đối soát"
      },
      {
        title: "Đánh giá sản phẩm",
        href: "/admin/reviews",
        icon: MessageSquare,
        description: "Quản lý đánh giá, phản hồi sản phẩm"
      },
    ]
  },
  // Khách hàng & Đối tác
  {
    group: "Khách hàng & Đối tác",
    items: [
      {
        title: "Khách hàng",
        href: "/admin/customers",
        icon: Users,
        description: "Quản lý thông tin khách hàng"
      },
      {
        title: "Nhà cung cấp",
        href: "/admin/suppliers",
        icon: Building,
        description: "Quản lý nhà cung cấp, nhập hàng"
      },
    ]
  },
  // Marketing
  {
    group: "Marketing",
    items: [
      {
        title: "Khuyến mãi",
        href: "/admin/promotions",
        icon: Percent,
        description: "Quản lý chương trình khuyến mãi, mã giảm giá"
      },
      {
        title: "Banner/Quảng cáo",
        href: "/admin/banners",
        icon: Film,
        description: "Quản lý banner, quảng cáo website"
      },
    ]
  },
  // Báo cáo & Thống kê
  {
    group: "Báo cáo & Thống kê",
    items: [
      {
        title: "Báo cáo doanh thu",
        href: "/admin/reports/revenue",
        icon: BarChart3,
        description: "Báo cáo doanh thu, hiệu suất bán hàng"
      },
      {
        title: "Báo cáo tồn kho",
        href: "/admin/reports/inventory",
        icon: Database,
        description: "Báo cáo tồn kho, nhập xuất kho"
      },
    ]
  },
  // Hệ thống
  {
    group: "Hệ thống",
    items: [
      {
        title: "Nhân viên",
        href: "/admin/staff",
        icon: UserCheck,
        description: "Quản lý nhân viên, phân quyền"
      },
      {
        title: "Phân quyền",
        href: "/admin/permissions",
        icon: Shield,
        description: "Quản lý quyền truy cập, vai trò"
      },
      {
        title: "Nhật ký hoạt động",
        href: "/admin/activity-log",
        icon: Calendar,
        description: "Theo dõi hoạt động hệ thống"
      },
      {
        title: "Hỗ trợ khách hàng",
        href: "/admin/support",
        icon: MessageSquare,
        description: "Xử lý yêu cầu, phản hồi khách hàng"
      },
      {
        title: "Cài đặt",
        href: "/admin/settings",
        icon: Settings,
        description: "Cấu hình hệ thống, thông tin cửa hàng"
      },
    ]
  },
];

// Component Sidebar chính cho trang Admin
export function AdminSidebar({ pathname }: { pathname: string }) {
  return (
    // Sidebar tổng thể
    <Sidebar>
      {/* Header của sidebar, chứa logo hoặc tiêu đề */}
      <SidebarHeader>
        {/* <Logo/> */}
      </SidebarHeader>
      <SidebarContent>
        {sidebarItems.map((group) => (
          <SidebarGroup key={group.group}>
            <SidebarGroupLabel>{group.group}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild isActive={isActive} tooltip={item.description}>
                        <Link href={item.href} className="text">
                          <Icon className="h-8 w-8 text-chart-3" />
                          <span className="ml-2 text-md">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      {/* Footer của sidebar, chứa nút đăng xuất */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <LogOut className="h-4 w-4 text-destructive" />
              Đăng xuất
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
} 