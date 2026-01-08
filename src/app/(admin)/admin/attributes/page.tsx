"use client";
import Image from "next/image";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const mockAttributes = [
  {
    id: 1,
    code: "color",
    name: "Màu sắc",
    name_en: "Color",
    type: "Dropdown",
    values: ["Đỏ", "Xanh", "Đen"],
    values_en: ["Red", "Blue", "Black"],
    status: true,
    public: true,
    order: 1,
    description: "Màu sắc sản phẩm theo chuẩn quốc tế.",
    category: "Quần áo",
    products: [
      { id: 1, name: "Áo thun nam", sku: "TS001", category: "Quần áo", image: "/images/ao-thun.jpg" },
    ],
    stockInfo: "Mỗi màu có tồn kho riêng.",
  },
  {
    id: 2,
    code: "size",
    name: "Kích thước",
    name_en: "Size",
    type: "Dropdown",
    values: ["S", "M", "L"],
    values_en: ["S", "M", "L"],
    status: true,
    public: true,
    order: 2,
    description: "Kích thước theo chuẩn châu Á.",
    category: "Quần áo",
    products: [
      { id: 1, name: "Áo thun nam", sku: "TS001", category: "Quần áo", image: "/images/ao-thun.jpg" },
    ],
    stockInfo: "Tồn kho theo từng size.",
  },
  {
    id: 3,
    code: "storage",
    name: "Dung lượng",
    name_en: "Storage",
    type: "Dropdown",
    values: ["128GB", "256GB", "512GB"],
    values_en: ["128GB", "256GB", "512GB"],
    status: false,
    public: false,
    order: 3,
    description: "Dung lượng bộ nhớ cho thiết bị điện tử.",
    category: "Điện tử",
    products: [
      { id: 2, name: "iPhone 15 Pro", sku: "IP15P", category: "Điện tử", image: "/images/iphone15pro.png" },
    ],
    stockInfo: "Tồn kho theo từng dung lượng.",
  },
];

export default function AttributePage() {
  return (
    <div className="p-4 sm:p-6">
      {/* Header Section */}
      <div className="mb-6">
        <div className="mb-4">
          <h1 className="text-xl sm:text-2xl font-bold mb-1">Quản lý thuộc tính sản phẩm</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Quản lý, cập nhật, tổ chức thuộc tính sản phẩm, liên kết sản phẩm, mô tả, đa ngôn ngữ, kho, lịch sử...</p>
        </div>
        {/* Search and Filters - UI only */}
        <div className="space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between sm:gap-4">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
            <Input placeholder="Tìm kiếm..." className="w-full sm:w-48" disabled />
            <div className="grid grid-cols-2 sm:flex gap-2">
              <Select>
                <SelectTrigger className="w-full sm:w-36">
                  <SelectValue placeholder="Danh mục" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả danh mục</SelectItem>
                  <SelectItem value="Quần áo">Quần áo</SelectItem>
                  <SelectItem value="Điện tử">Điện tử</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full sm:w-36">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="active">Kích hoạt</SelectItem>
                  <SelectItem value="inactive">Vô hiệu hóa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <Select>
              <SelectTrigger className="w-full sm:w-36">
                <SelectValue placeholder="Sắp xếp" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="order">Thứ tự hiển thị</SelectItem>
                <SelectItem value="name">Tên thuộc tính</SelectItem>
              </SelectContent>
            </Select>
            <Sheet>
              <SheetTrigger asChild>
                <Button className="font-semibold w-full sm:w-auto">+ Thêm thuộc tính</Button>
              </SheetTrigger>
              <SheetContent className="w-full max-w-2xl p-4 sm:p-6 overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Thêm/Sửa thuộc tính (Demo tĩnh)</SheetTitle>
                </SheetHeader>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="code">Mã thuộc tính</Label>
                      <Input id="code" value="" disabled />
                    </div>
                    <div>
                      <Label htmlFor="order">Thứ tự hiển thị</Label>
                      <Input id="order" type="number" min={1} value="" disabled />
                    </div>
                    <div>
                      <Label htmlFor="name">Tên thuộc tính (VI)</Label>
                      <Input id="name" value="" disabled />
                    </div>
                    <div>
                      <Label htmlFor="name_en">Tên thuộc tính (EN)</Label>
                      <Input id="name_en" value="" disabled />
                    </div>
                    <div>
                      <Label htmlFor="type">Loại thuộc tính</Label>
                      <Select>
                        <SelectTrigger className="w-full" disabled>
                          <SelectValue placeholder="Chọn loại" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Dropdown">Dropdown</SelectItem>
                          <SelectItem value="Checkbox">Checkbox</SelectItem>
                          <SelectItem value="Text">Text</SelectItem>
                          <SelectItem value="Number">Number</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="category">Danh mục</Label>
                      <Input id="category" value="" disabled />
                    </div>
                    <div>
                      <Label htmlFor="values">Giá trị (VI, phẩy)</Label>
                      <Input id="values" value="" disabled />
                    </div>
                    <div>
                      <Label htmlFor="values_en">Giá trị (EN, phẩy)</Label>
                      <Input id="values_en" value="" disabled />
                    </div>
                    <div className="col-span-1 sm:col-span-2">
                      <Label htmlFor="description">Mô tả</Label>
                      <Input id="description" value="" disabled />
                    </div>
                    <div className="col-span-1 sm:col-span-2">
                      <Label htmlFor="stockInfo">Thông tin kho</Label>
                      <Input id="stockInfo" value="" disabled />
                    </div>
                    <div className="flex items-center gap-2">
                      <Label htmlFor="status">Kích hoạt</Label>
                      <Switch id="status" checked disabled />
                    </div>
                    <div className="flex items-center gap-2">
                      <Label htmlFor="public">Hiển thị công khai</Label>
                      <Switch id="public" checked disabled />
                    </div>
                  </div>
                  <SheetFooter className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
                    <Button type="button" variant="outline" className="w-full sm:w-auto">Hủy</Button>
                    <Button type="submit" className="w-full sm:w-auto">Lưu</Button>
                  </SheetFooter>
                </form>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Table Section - Mobile Responsive */}
      <Card className="overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã</TableHead>
                <TableHead>Tên (VI/EN)</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Giá trị (VI/EN)</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead>Sản phẩm liên quan</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Công khai</TableHead>
                <TableHead>Mô tả</TableHead>
                <TableHead>Kho</TableHead>
                <TableHead>Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAttributes.map(attr => (
                <TableRow key={attr.id}>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="ml-2">{attr.order}</span>
                    </div>
                  </TableCell>
                  <TableCell>{attr.code}</TableCell>
                  <TableCell>
                    <div>{attr.name}</div>
                    <div className="text-xs text-muted-foreground">{attr.name_en}</div>
                  </TableCell>
                  <TableCell>{attr.type}</TableCell>
                  <TableCell>
                    <div>{attr.values.join(", ")}</div>
                    <div className="text-xs text-muted-foreground">{attr.values_en?.join(", ")}</div>
                  </TableCell>
                  <TableCell>{attr.category}</TableCell>
                  <TableCell>
                    {attr.products.map(p => (
                      <div key={p.id} className="flex items-center gap-2 mb-1">
                        <Image src={p.image} alt={p.name} width={32} height={32} className="rounded object-cover border" />
                        <div>
                          <div className="font-medium text-sm">{p.name}</div>
                          <div className="text-xs text-muted-foreground">{p.sku} - {p.category}</div>
                        </div>
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>
                    <Switch checked={attr.status} disabled />
                    <span className="ml-2 text-sm">{attr.status ? "Đang sử dụng" : "Ẩn"}</span>
                  </TableCell>
                  <TableCell>
                    <Switch checked={attr.public} disabled />
                    <span className="ml-2 text-sm">{attr.public ? "Công khai" : "Nội bộ"}</span>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[120px] truncate" title={attr.description}>{attr.description}</div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[120px] truncate" title={attr.stockInfo}>{attr.stockInfo}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline">Sửa</Button>
                        </DialogTrigger>
                        <DialogContent className="p-4 sm:p-6 max-w-lg w-full">
                          <DialogHeader>
                            <DialogTitle>Sửa thuộc tính</DialogTitle>
                          </DialogHeader>
                          <form className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="code">Mã thuộc tính</Label>
                                <Input id="code" value={attr.code} disabled />
                              </div>
                              <div>
                                <Label htmlFor="order">Thứ tự hiển thị</Label>
                                <Input id="order" type="number" min={1} value={attr.order} disabled />
                              </div>
                              <div>
                                <Label htmlFor="name">Tên thuộc tính (VI)</Label>
                                <Input id="name" value={attr.name} disabled />
                              </div>
                              <div>
                                <Label htmlFor="name_en">Tên thuộc tính (EN)</Label>
                                <Input id="name_en" value={attr.name_en} disabled />
                              </div>
                              <div>
                                <Label htmlFor="type">Loại thuộc tính</Label>
                                <Select>
                                  <SelectTrigger className="w-full" disabled>
                                    <SelectValue placeholder="Chọn loại" defaultValue={attr.type} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Dropdown">Dropdown</SelectItem>
                                    <SelectItem value="Checkbox">Checkbox</SelectItem>
                                    <SelectItem value="Text">Text</SelectItem>
                                    <SelectItem value="Number">Number</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label htmlFor="category">Danh mục</Label>
                                <Input id="category" value={attr.category} disabled />
                              </div>
                              <div>
                                <Label htmlFor="values">Giá trị (VI, phẩy)</Label>
                                <Input id="values" value={attr.values.join(", ")} disabled />
                              </div>
                              <div>
                                <Label htmlFor="values_en">Giá trị (EN, phẩy)</Label>
                                <Input id="values_en" value={attr.values_en?.join(", ")} disabled />
                              </div>
                              <div className="col-span-1 sm:col-span-2">
                                <Label htmlFor="description">Mô tả</Label>
                                <Input id="description" value={attr.description} disabled />
                              </div>
                              <div className="col-span-1 sm:col-span-2">
                                <Label htmlFor="stockInfo">Thông tin kho</Label>
                                <Input id="stockInfo" value={attr.stockInfo} disabled />
                              </div>
                              <div className="flex items-center gap-2">
                                <Label htmlFor="status">Kích hoạt</Label>
                                <Switch id="status" checked={attr.status} disabled />
                              </div>
                              <div className="flex items-center gap-2">
                                <Label htmlFor="public">Hiển thị công khai</Label>
                                <Switch id="public" checked={attr.public} disabled />
                              </div>
                            </div>
                            <DialogFooter className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
                              <Button type="button" variant="outline" className="w-full sm:w-auto">Hủy</Button>
                              <Button type="submit" className="w-full sm:w-auto" disabled>Lưu</Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="destructive">Xóa</Button>
                        </DialogTrigger>
                        <DialogContent className="p-4 sm:p-6 max-w-sm w-full">
                          <DialogHeader>
                            <DialogTitle>Xác nhận xóa</DialogTitle>
                          </DialogHeader>
                          <div className="py-4">Bạn có chắc chắn muốn xóa thuộc tính này không?</div>
                          <DialogFooter>
                            <Button variant="outline">Hủy</Button>
                            <Button variant="destructive">Xóa</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile/Tablet Cards */}
        <div className="lg:hidden">
          <div className="p-4 space-y-4">
            {mockAttributes.map(attr => (
              <Card key={attr.id} className="p-4">
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-muted-foreground">#{attr.order}</span>
                        <span className="text-sm font-medium text-muted-foreground">•</span>
                        <span className="text-sm font-medium">{attr.code}</span>
                      </div>
                      <h3 className="font-semibold">{attr.name}</h3>
                      {attr.name_en && <p className="text-sm text-muted-foreground">{attr.name_en}</p>}
                    </div>
                    <div className="flex gap-1">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline">Sửa</Button>
                        </DialogTrigger>
                        <DialogContent className="p-4 sm:p-6 max-w-lg w-full">
                          <DialogHeader>
                            <DialogTitle>Sửa thuộc tính</DialogTitle>
                          </DialogHeader>
                          <form className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="code">Mã thuộc tính</Label>
                                <Input id="code" value={attr.code} disabled />
                              </div>
                              <div>
                                <Label htmlFor="order">Thứ tự hiển thị</Label>
                                <Input id="order" type="number" min={1} value={attr.order} disabled />
                              </div>
                              <div>
                                <Label htmlFor="name">Tên thuộc tính (VI)</Label>
                                <Input id="name" value={attr.name} disabled />
                              </div>
                              <div>
                                <Label htmlFor="name_en">Tên thuộc tính (EN)</Label>
                                <Input id="name_en" value={attr.name_en} disabled />
                              </div>
                              <div>
                                <Label htmlFor="type">Loại thuộc tính</Label>
                                <Select>
                                  <SelectTrigger className="w-full" disabled>
                                    <SelectValue placeholder="Chọn loại" defaultValue={attr.type} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Dropdown">Dropdown</SelectItem>
                                    <SelectItem value="Checkbox">Checkbox</SelectItem>
                                    <SelectItem value="Text">Text</SelectItem>
                                    <SelectItem value="Number">Number</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label htmlFor="category">Danh mục</Label>
                                <Input id="category" value={attr.category} disabled />
                              </div>
                              <div>
                                <Label htmlFor="values">Giá trị (VI, phẩy)</Label>
                                <Input id="values" value={attr.values.join(", ")} disabled />
                              </div>
                              <div>
                                <Label htmlFor="values_en">Giá trị (EN, phẩy)</Label>
                                <Input id="values_en" value={attr.values_en?.join(", ")} disabled />
                              </div>
                              <div className="col-span-1 sm:col-span-2">
                                <Label htmlFor="description">Mô tả</Label>
                                <Input id="description" value={attr.description} disabled />
                              </div>
                              <div className="col-span-1 sm:col-span-2">
                                <Label htmlFor="stockInfo">Thông tin kho</Label>
                                <Input id="stockInfo" value={attr.stockInfo} disabled />
                              </div>
                              <div className="flex items-center gap-2">
                                <Label htmlFor="status">Kích hoạt</Label>
                                <Switch id="status" checked={attr.status} disabled />
                              </div>
                              <div className="flex items-center gap-2">
                                <Label htmlFor="public">Hiển thị công khai</Label>
                                <Switch id="public" checked={attr.public} disabled />
                              </div>
                            </div>
                            <DialogFooter className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
                              <Button type="button" variant="outline" className="w-full sm:w-auto">Hủy</Button>
                              <Button type="submit" className="w-full sm:w-auto" disabled>Lưu</Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="destructive">Xóa</Button>
                        </DialogTrigger>
                        <DialogContent className="p-4 sm:p-6 max-w-sm w-full">
                          <DialogHeader>
                            <DialogTitle>Xác nhận xóa</DialogTitle>
                          </DialogHeader>
                          <div className="py-4">Bạn có chắc chắn muốn xóa thuộc tính này không?</div>
                          <DialogFooter>
                            <Button variant="outline">Hủy</Button>
                            <Button variant="destructive">Xóa</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                  {/* Details */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Loại:</span>
                      <p className="font-medium">{attr.type}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Danh mục:</span>
                      <p className="font-medium">{attr.category}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-muted-foreground">Giá trị (VI):</span>
                      <p className="font-medium">{attr.values.join(", ")}</p>
                    </div>
                    {attr.values_en && attr.values_en.length > 0 && (
                      <div className="col-span-2">
                        <span className="text-muted-foreground">Giá trị (EN):</span>
                        <p className="font-medium">{attr.values_en.join(", ")}</p>
                      </div>
                    )}
                  </div>
                  {/* Products */}
                  {attr.products.length > 0 && (
                    <div>
                      <span className="text-sm text-muted-foreground">Sản phẩm liên quan:</span>
                      <div className="mt-2 space-y-2">
                        {attr.products.map(p => (
                          <div key={p.id} className="flex items-center gap-2">
                            <Image src={p.image} alt={p.name} width={24} height={24} className="rounded object-cover border" />
                            <div>
                              <div className="font-medium text-sm">{p.name}</div>
                              <div className="text-xs text-muted-foreground">{p.sku}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Switches */}
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-2">
                      <Switch checked={attr.status} disabled />
                      <span className="text-sm">{attr.status ? "Đang sử dụng" : "Ẩn"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={attr.public} disabled />
                      <span className="text-sm">{attr.public ? "Công khai" : "Nội bộ"}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        {/* Pagination - UI only */}
        <div className="mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious className="pointer-events-none opacity-50" />
                  </PaginationItem>
                  
                  <PaginationItem>
                    <PaginationLink isActive>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  
                  <PaginationItem>
                    <PaginationLink>
                      2
                    </PaginationLink>
                  </PaginationItem>
                  
                  <PaginationItem>
                    <PaginationLink>
                      3
                    </PaginationLink>
                  </PaginationItem>
                  
                  <PaginationItem>
                    <PaginationNext />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
      </Card>
    </div>
  );
}   