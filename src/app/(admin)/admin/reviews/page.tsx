"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectItem, SelectContent } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

type ReviewStatus = "pending" | "approved" | "hidden";

type Review = {
  id: number;
  productImage: string;
  productName: string;
  sku: string;
  content: string;
  rating: number;
  customerName: string;
  customerId: string;
  date: string; // YYYY-MM-DD
  status: ReviewStatus;
  orderId: string;
  adminReply: string;
};

const mockReviews: Review[] = [
  {
    id: 1,
    productImage: "/public/images/Dien_thoai.webp",
    productName: "Điện thoại XYZ",
    sku: "SKU12345",
    content: "Sản phẩm rất tốt, giao hàng nhanh.",
    rating: 5,
    customerName: "Nguyễn Văn A",
    customerId: "CUST001",
    date: "2025-07-10",
    status: "pending",
    orderId: "ORD123",
    adminReply: "",
  },
];

const statusMap: Record<ReviewStatus, string> = {
  pending: "Chờ duyệt",
  approved: "Đã phê duyệt",
  hidden: "Bị ẩn",
};

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [filter, setFilter] = useState({
    product: "",
    status: "",
    rating: "",
    date: "",
    search: "",
  });

  // Thống kê tổng quan
  const total = reviews.length;
  const positive = reviews.filter((r) => r.rating >= 4).length;
  const negative = reviews.filter((r) => r.rating <= 2).length;
  const avgRating =
    total > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / total).toFixed(1)
      : "0.0";

  // Lọc dữ liệu
  const filteredReviews = reviews.filter((r) => {
    return (
      (!filter.product ||
        r.productName.toLowerCase().includes(filter.product.toLowerCase())) &&
      (!filter.status || r.status === (filter.status as ReviewStatus)) &&
      (!filter.rating || r.rating === Number(filter.rating)) &&
      (!filter.date || r.date === filter.date) &&
      (!filter.search ||
        r.productName.toLowerCase().includes(filter.search.toLowerCase()) ||
        r.customerName.toLowerCase().includes(filter.search.toLowerCase()) ||
        r.content.toLowerCase().includes(filter.search.toLowerCase()))
    );
  });

  // Xử lý thao tác admin
  const handleApprove = (id: number) => {
    setReviews(reviews.map((r) => (r.id === id ? { ...r, status: "approved" } : r)));
  };
  const handleHide = (id: number) => {
    setReviews(reviews.map((r) => (r.id === id ? { ...r, status: "hidden" } : r)));
  };
  const handleReply = (id: number, reply: string) => {
    setReviews(reviews.map((r) => (r.id === id ? { ...r, adminReply: reply } : r)));
  };

  return (
    <ScrollArea className="h-[100vh] p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Quản lý đánh giá sản phẩm</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-muted">
              <CardContent className="pt-4">
                <div className="text-muted-foreground">Tổng số đánh giá</div>
                <div className="text-xl font-bold">{total}</div>
              </CardContent>
            </Card>

            <Card className="bg-muted">
              <CardContent className="pt-4">
                <div className="text-muted-foreground">Tỷ lệ tích cực</div>
                <div className="text-xl font-bold">
                  {total > 0 ? ((positive / total) * 100).toFixed(0) : "0"}%
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted">
              <CardContent className="pt-4">
                <div className="text-muted-foreground">Tỷ lệ tiêu cực</div>
                <div className="text-xl font-bold">
                  {total > 0 ? ((negative / total) * 100).toFixed(0) : "0"}%
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted">
              <CardContent className="pt-4">
                <div className="text-muted-foreground">Điểm trung bình</div>
                <div className="text-xl font-bold">{avgRating} / 5</div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Bộ lọc & tìm kiếm</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Input
              placeholder="Lọc theo sản phẩm"
              value={filter.product}
              onChange={(e) => setFilter({ ...filter, product: e.target.value })}
              className="w-48"
            />

            <Select
              value={filter.status || "all"}
              onValueChange={(v) =>
                setFilter({ ...filter, status: v === "all" ? "" : v })
              }
            >
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="pending">Chờ duyệt</SelectItem>
                <SelectItem value="approved">Đã phê duyệt</SelectItem>
                <SelectItem value="hidden">Bị ẩn</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filter.rating || "all"}
              onValueChange={(v) =>
                setFilter({ ...filter, rating: v === "all" ? "" : v })
              }
            >
              <SelectContent>
                <SelectItem value="all">Tất cả điểm số</SelectItem>
                {[1, 2, 3, 4, 5].map((star) => (
                  <SelectItem key={star} value={String(star)}>
                    {star} sao
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              type="date"
              value={filter.date}
              onChange={(e) => setFilter({ ...filter, date: e.target.value })}
              className="w-40"
            />

            <Input
              placeholder="Tìm kiếm từ khóa..."
              value={filter.search}
              onChange={(e) => setFilter({ ...filter, search: e.target.value })}
              className="flex-1 min-w-[200px]"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách đánh giá</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ảnh</TableHead>
                <TableHead>Tên sản phẩm</TableHead>
                <TableHead>Nội dung đánh giá</TableHead>
                <TableHead>Điểm số</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Ngày gửi</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Công cụ</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredReviews.map((r) => (
                <TableRow key={r.id} className={r.rating <= 2 ? "bg-destructive/10" : ""}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={r.productImage} alt={r.productName} />
                      <AvatarFallback>SP</AvatarFallback>
                    </Avatar>
                  </TableCell>

                  <TableCell>
                    <div className="font-semibold">{r.productName}</div>
                    <div className="text-xs text-muted-foreground">SKU: {r.sku}</div>
                    <a
                      href={`/product/${r.sku}`}
                      className="text-primary text-xs underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Xem sản phẩm
                    </a>
                  </TableCell>

                  <TableCell className="max-w-xs">
                    <div>{r.content}</div>
                    {r.adminReply && (
                      <div className="mt-2 text-xs text-green-600 border-t pt-1">
                        Phản hồi: {r.adminReply}
                      </div>
                    )}
                  </TableCell>

                  <TableCell className="text-center">
                    <Badge variant={r.rating <= 2 ? "destructive" : "default"}>
                      {r.rating}★
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <div>{r.customerName}</div>
                    <div className="text-xs text-muted-foreground">{r.customerId}</div>
                  </TableCell>

                  <TableCell>{r.date}</TableCell>

                  <TableCell>
                    <Badge
                      variant={
                        r.status === "pending"
                          ? "destructive"
                          : r.status === "approved"
                          ? "default"
                          : "outline"
                      }
                    >
                      {statusMap[r.status]}
                    </Badge>
                  </TableCell>

                  <TableCell className="space-y-1">
                    <div className="flex flex-wrap gap-1">
                      {r.status === "pending" && (
                        <Button size="sm" variant="destructive" onClick={() => handleApprove(r.id)}>
                          Phê duyệt
                        </Button>
                      )}
                      {r.status !== "hidden" && (
                        <Button size="sm" variant="secondary" onClick={() => handleHide(r.id)}>
                          Ẩn
                        </Button>
                      )}
                    </div>

                    <ReplyBox review={r} onReply={handleReply} />
                  </TableCell>
                </TableRow>
              ))}

              {filteredReviews.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-muted-foreground py-4">
                    Không có đánh giá nào phù hợp.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </ScrollArea>
  );
}

type ReplyBoxProps = {
  review: Review;
  onReply: (id: number, reply: string) => void;
};

// Component phản hồi admin sử dụng shadcn
function ReplyBox({ review, onReply }: ReplyBoxProps) {
  const [reply, setReply] = useState("");

  return (
    <div className="flex gap-1 mt-1">
      <Input
        placeholder="Phản hồi..."
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        className="w-28 text-xs"
      />
      <Button
        size="sm"
        variant="default"
        className="text-xs"
        onClick={() => {
          onReply(review.id, reply);
          setReply("");
        }}
      >
        Gửi
      </Button>
    </div>
  );
}
