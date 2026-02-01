"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  Ticket,
  DollarSign,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Film,
  Star,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { AreaChart, BarChart, DonutChart } from "@tremor/react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Dashboard() {
  // Mock data for demonstration
  const stats = [
    {
      title: "Tổng doanh thu",
      value: "₫125,000,000",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: DollarSign,
      description: "So với tháng trước",
    },
    {
      title: "Đơn hàng đã bán",
      value: "1,234",
      change: "+8.2%",
      changeType: "positive" as const,
      icon: Ticket,
      description: "Trong tháng này",
    },
    {
      title: "Khách hàng mới",
      value: "89",
      change: "+15.3%",
      changeType: "positive" as const,
      icon: Users,
      description: "Khách hàng mới",
    },
    {
      title: "Sản phẩm đang bán",
      value: "120",
      change: "+5",
      changeType: "positive" as const,
      icon: Film,
      description: "Sản phẩm hiện tại",
    },
  ];

  // Chart data
  const revenueData = [
    { month: "T1", "Doanh thu": 85, "Số đơn hàng": 1200 },
    { month: "T2", "Doanh thu": 92, "Số đơn hàng": 1350 },
    { month: "T3", "Doanh thu": 78, "Số đơn hàng": 1100 },
    { month: "T4", "Doanh thu": 95, "Số đơn hàng": 1400 },
    { month: "T5", "Doanh thu": 110, "Số đơn hàng": 1600 },
    { month: "T6", "Doanh thu": 125, "Số đơn hàng": 1800 },
    { month: "T7", "Doanh thu": 98, "Số đơn hàng": 1450 },
    { month: "T8", "Doanh thu": 105, "Số đơn hàng": 1550 },
    { month: "T9", "Doanh thu": 115, "Số đơn hàng": 1700 },
    { month: "T10", "Doanh thu": 130, "Số đơn hàng": 1900 },
    { month: "T11", "Doanh thu": 140, "Số đơn hàng": 2100 },
    { month: "T12", "Doanh thu": 125, "Số đơn hàng": 1850 },
  ];

  const dailyOrdersData = [
    { day: "T2", "Số đơn hàng": 45, "Doanh thu": 72 },
    { day: "T3", "Số đơn hàng": 52, "Doanh thu": 83 },
    { day: "T4", "Số đơn hàng": 38, "Doanh thu": 61 },
    { day: "T5", "Số đơn hàng": 67, "Doanh thu": 105 },
    { day: "T6", "Số đơn hàng": 89, "Doanh thu": 142 },
    { day: "T7", "Số đơn hàng": 95, "Doanh thu": 152 },
    { day: "CN", "Số đơn hàng": 78, "Doanh thu": 125 },
  ];

  const categoryData = [
    { name: "Điện thoại", value: 40 },
    { name: "Laptop", value: 25 },
    { name: "Phụ kiện", value: 20 },
    { name: "Tablet", value: 10 },
    { name: "Khác", value: 5 },
  ];

  const topProducts = [
    {
      title: "iPhone 15 Pro Max",
      rating: 4.8,
      sold: 156,
      revenue: "₫31,200,000",
      image: "https://via.placeholder.com/60x90",
      category: "Điện thoại",
    },
    {
      title: "Samsung Galaxy S24 Ultra",
      rating: 4.6,
      sold: 134,
      revenue: "₫24,120,000",
      image: "https://via.placeholder.com/60x90",
      category: "Điện thoại",
    },
    {
      title: "AirPods Pro 2",
      rating: 4.4,
      sold: 98,
      revenue: "₫15,680,000",
      image: "https://via.placeholder.com/60x90",
      category: "Phụ kiện",
    },
    {
      title: "AirPods Pro 2",
      rating: 4.4,
      sold: 98,
      revenue: "₫15,680,000",
      image: "https://via.placeholder.com/60x90",
      category: "Phụ kiện",
    },
  ];

  const recentOrders = [
    {
      id: "#DH001",
      customer: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      product: "iPhone 15 Pro Max",
      date: "2024-01-15",
      time: "09:30",
      quantity: 1,
      status: "delivered",
      amount: "₫32,000,000",
    },
    {
      id: "#DH002",
      customer: "Trần Thị B",
      email: "tranthib@email.com",
      product: "Samsung Galaxy S24 Ultra",
      date: "2024-01-15",
      time: "10:00",
      quantity: 2,
      status: "pending",
      amount: "₫48,000,000",
    },
    {
      id: "#DH003",
      customer: "Lê Văn C",
      email: "levanc@email.com",
      product: "AirPods Pro 2",
      date: "2024-01-16",
      time: "11:30",
      quantity: 1,
      status: "delivered",
      amount: "₫5,680,000",
    },
    {
      id: "#DH004",
      customer: "Phạm Thị D",
      email: "phamthid@email.com",
      product: "iPad Pro 2022",
      date: "2024-01-16",
      time: "13:00",
      quantity: 1,
      status: "cancelled",
      amount: "₫22,000,000",
    },
    {
      id: "#DH005",
      customer: "Hoàng Văn E",
      email: "hoangvane@email.com",
      product: "MacBook Pro M3",
      date: "2024-01-17",
      time: "14:30",
      quantity: 1,
      status: "delivered",
      amount: "₫45,000,000",
    },
    {
      id: "#DH006",
      customer: "Vũ Thị F",
      email: "vuthif@email.com",
      product: "Apple Watch Series 9",
      date: "2024-01-17",
      time: "16:00",
      quantity: 2,
      status: "pending",
      amount: "₫18,000,000",
    },
    {
      id: "#DH007",
      customer: "Đặng Văn G",
      email: "dangvang@email.com",
      product: "Sony WH-1000XM5",
      date: "2024-01-18",
      time: "09:15",
      quantity: 1,
      status: "delivered",
      amount: "₫8,500,000",
    },
    {
      id: "#DH008",
      customer: "Bùi Thị H",
      email: "buithih@email.com",
      product: "iPad Air 2024",
      date: "2024-01-18",
      time: "11:45",
      quantity: 1,
      status: "pending",
      amount: "₫28,000,000",
    },
  ];

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const getOrderStatusText = (status: string) => {
    switch (status) {
      case "delivered":
        return "Đã giao hàng";
      case "pending":
        return "Chờ xử lý";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Quản lý và theo dõi hoạt động bán hàng</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                {stat.changeType === "positive" ? (
                  <ArrowUpRight className="h-3 w-3 text-green-600" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-600" />
                )}
                <span className={stat.changeType === "positive" ? "text-green-600" : "text-red-600"}>
                  {stat.change}
                </span>
                <span>so với tháng trước</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Doanh thu theo tháng</CardTitle>
            <CardDescription>Biểu đồ doanh thu và số đơn hàng trong năm 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <AreaChart
              className="h-72 mt-4"
              data={revenueData}
              index="month"
              categories={["Doanh thu", "Số đơn hàng"]}
              colors={["blue", "green"]}
              valueFormatter={(value) => `${value}`}
              yAxisWidth={40}
            />
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Phân bố danh mục</CardTitle>
            <CardDescription>Tỷ lệ các danh mục sản phẩm bán chạy</CardDescription>
          </CardHeader>
          <CardContent>
            <DonutChart
              className="h-72 mt-4"
              data={categoryData}
              category="value"
              index="name"
              valueFormatter={(value) => `${value}%`}
              colors={["red", "pink", "yellow", "purple", "cyan"]}
            />
          </CardContent>
        </Card>

        {/* Daily Orders */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Đơn hàng theo ngày trong tuần</CardTitle>
            <CardDescription>Số lượng đơn hàng và doanh thu theo từng ngày</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart
              className="h-72 mt-4"
              data={dailyOrdersData}
              index="day"
              categories={["Số đơn hàng", "Doanh thu"]}
              colors={["blue", "green"]}
              valueFormatter={(value) => `${value}`}
              yAxisWidth={40}
            />
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Orders */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Đơn hàng gần đây</CardTitle>
            <CardDescription>Các đơn hàng mới nhất trong hệ thống</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Desktop Table */}
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Khách hàng</TableHead>
                    <TableHead>Sản phẩm</TableHead>
                    <TableHead>Ngày/Giờ</TableHead>
                    <TableHead>Số lượng</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Thành tiền</TableHead>
                    <TableHead className="text-right">Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="" />
                            <AvatarFallback>{getInitials(order.customer)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{order.customer}</div>
                            <div className="text-sm text-muted-foreground">{order.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Film className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{order.product}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="text-sm">{order.date}</div>
                          <div className="text-xs text-muted-foreground">{order.time}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{order.quantity}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getOrderStatusColor(order.status)}>
                          {getOrderStatusText(order.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{order.amount}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Mở menu</span>
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Xem chi tiết
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Chỉnh sửa
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Xóa
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="" />
                        <AvatarFallback>{getInitials(order.customer)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{order.customer}</div>
                        <div className="text-sm text-muted-foreground">{order.email}</div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Mở menu</span>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Film className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{order.product}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Ngày:</span>
                      <span>
                        {order.date} {order.time}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Số lượng:</span>
                      <Badge variant="secondary">{order.quantity}</Badge>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Trạng thái:</span>
                      <Badge variant="outline" className={getOrderStatusColor(order.status)}>
                        {getOrderStatusText(order.status)}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Thành tiền:</span>
                      <span className="font-medium text-green-600">{order.amount}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious className="pointer-events-none opacity-50" />
                  </PaginationItem>

                  <PaginationItem>
                    <PaginationLink isActive>1</PaginationLink>
                  </PaginationItem>

                  <PaginationItem>
                    <PaginationLink>2</PaginationLink>
                  </PaginationItem>

                  <PaginationItem>
                    <PaginationLink>3</PaginationLink>
                  </PaginationItem>

                  <PaginationItem>
                    <PaginationNext />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </CardContent>
        </Card>

        {/* Top Products & Quick Stats */}
        <div className="col-span-3 space-y-6">
          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle>Sản phẩm bán chạy</CardTitle>
              <CardDescription>Top sản phẩm có doanh thu cao nhất</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={product.image} />
                    <AvatarFallback>
                      <Film className="h-6 w-6" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{product.title}</p>
                    <p className="text-xs text-muted-foreground">{product.category}</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{product.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{product.sold} đã bán</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-600">{product.revenue}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Thống kê nhanh</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Tỷ lệ hoàn thành đơn</span>
                  <span className="font-medium">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Đánh giá trung bình</span>
                  <span className="font-medium">4.6/5</span>
                </div>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">120</div>
                  <div className="text-xs text-muted-foreground">Sản phẩm đang bán</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">32</div>
                  <div className="text-xs text-muted-foreground">Đơn hàng hôm nay</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
