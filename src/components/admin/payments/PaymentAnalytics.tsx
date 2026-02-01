import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AreaChart,
  BarChart,
  LineChart,
  DonutChart,
  Metric,
  Text,
  Flex,
  Grid,
} from "@tremor/react";
import {
  TrendingUp,
  TrendingDown,
  CreditCard,
  Wallet,
} from "lucide-react";

// Mock data for charts
const revenueData = [
  { month: "Jan", "Doanh thu": 2400000, "Giao dịch": 45 },
  { month: "Feb", "Doanh thu": 1398000, "Giao dịch": 32 },
  { month: "Mar", "Doanh thu": 9800000, "Giao dịch": 87 },
  { month: "Apr", "Doanh thu": 3908000, "Giao dịch": 56 },
  { month: "May", "Doanh thu": 4800000, "Giao dịch": 73 },
  { month: "Jun", "Doanh thu": 3800000, "Giao dịch": 68 },
];

const paymentMethodData = [
  { name: "Thẻ tín dụng", value: 45, amount: 25000000 },
  { name: "Ví MoMo", value: 25, amount: 15000000 },
  { name: "ZaloPay", value: 15, amount: 8500000 },
  { name: "Chuyển khoản", value: 10, amount: 5200000 },
  { name: "COD", value: 5, amount: 2300000 },
];

const dailyTransactions = [
  { day: "Mon", "Thành công": 12, "Thất bại": 2, "Đang xử lý": 1 },
  { day: "Tue", "Thành công": 19, "Thất bại": 1, "Đang xử lý": 2 },
  { day: "Wed", "Thành công": 15, "Thất bại": 3, "Đang xử lý": 1 },
  { day: "Thu", "Thành công": 22, "Thất bại": 1, "Đang xử lý": 0 },
  { day: "Fri", "Thành công": 18, "Thất bại": 2, "Đang xử lý": 3 },
  { day: "Sat", "Thành công": 8, "Thất bại": 1, "Đang xử lý": 1 },
  { day: "Sun", "Thành công": 6, "Thất bại": 0, "Đang xử lý": 0 },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(value);
};

const valueFormatter = (number: number) => formatCurrency(number);

// Màu cho chấm hiển thị (không dùng tailwind class động để tránh mất màu khi build)
const DOT_COLORS = ["#3b82f6", "#14b8a6", "#f59e0b", "#f43f5e", "#6366f1"]; // blue, teal, amber, rose, indigo

export default function PaymentAnalytics() {
  const totalRevenue = revenueData.reduce((sum, item) => sum + item["Doanh thu"], 0);
  const totalTransactions = revenueData.reduce((sum, item) => sum + item["Giao dịch"], 0);
  const avgTransactionValue = totalRevenue / totalTransactions;

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Doanh thu trung bình/giao dịch</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Metric>{formatCurrency(avgTransactionValue)}</Metric>
            <Flex className="mt-2">
              <Text>
                <TrendingUp className="w-3 h-3 inline mr-1" />
                +8.2% so với tháng trước
              </Text>
            </Flex>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Phương thức phổ biến nhất</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Metric>Thẻ tín dụng</Metric>
            <Text className="mt-2">45% tổng số giao dịch</Text>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tỷ lệ thất bại</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Metric>2.1%</Metric>
            <Flex className="mt-2">
              <Text>
                <TrendingDown className="w-3 h-3 inline mr-1" />
                Giảm 0.5% so với tuần trước
              </Text>
            </Flex>
          </CardContent>
        </Card>
      </Grid>

      <Grid numItems={1} numItemsLg={2} className="gap-6">
        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Xu hướng doanh thu</CardTitle>
          </CardHeader>
          <CardContent>
            <AreaChart
              className="h-72"
              data={revenueData}
              index="month"
              categories={["Doanh thu"]}
              colors={["blue"]}
              valueFormatter={valueFormatter}
              yAxisWidth={80}
            />
          </CardContent>
        </Card>

        {/* Payment Methods Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Phân bố phương thức thanh toán</CardTitle>
          </CardHeader>
          <CardContent>
            <DonutChart
              className="h-72"
              data={paymentMethodData}
              category="value"
              index="name"
              valueFormatter={(number: number) => `${number}%`}
              colors={["blue", "teal", "amber", "rose", "indigo"]}
              showLabel={true}
            />
          </CardContent>
        </Card>
      </Grid>

      <Grid numItems={1} numItemsLg={2} className="gap-6">
        {/* Daily Transaction Status */}
        <Card>
          <CardHeader>
            <CardTitle>Trạng thái giao dịch theo ngày</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              className="h-72"
              data={dailyTransactions}
              index="day"
              categories={["Thành công", "Thất bại", "Đang xử lý"]}
              colors={["emerald", "red", "amber"]}
              valueFormatter={(number: number) => `${number} giao dịch`}
              stack={true}
            />
          </CardContent>
        </Card>

        {/* Payment Method Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Hiệu suất phương thức thanh toán</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentMethodData.map((method, index) => {
                const successRate = 95 - index * 3; // Mock success rates
                const dotColor = DOT_COLORS[index] ?? "#3b82f6";

                return (
                  <div key={method.name} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <span
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: dotColor }}
                        aria-hidden="true"
                      />
                      <div>
                        <Text className="font-medium">{method.name}</Text>
                        <Text className="text-sm">{formatCurrency(method.amount)}</Text>
                      </div>
                    </div>

                    <div className="text-right">
                      <Badge
                        variant={
                          successRate > 90 ? "default" : successRate > 80 ? "secondary" : "destructive"
                        }
                      >
                        {successRate}% thành công
                      </Badge>
                      <Text className="text-sm mt-1">{method.value}% tổng số</Text>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </Grid>

      {/* Transaction Volume Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Xu hướng số lượng giao dịch</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart
            className="h-72"
            data={revenueData}
            index="month"
            categories={["Giao dịch"]}
            colors={["blue"]}
            valueFormatter={(number: number) => `${number} giao dịch`}
            yAxisWidth={60}
          />
        </CardContent>
      </Card>
    </div>
  );
}
