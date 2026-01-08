"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import Image from "next/image";

interface Color {
  name: string;
  price: string;
  image: File | null;
  imagePreview: string | null;
}

interface TechnicalSpec {
  key: string;
  value: string;
}

function AddNewProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    sale: "",
    startDate: new Date(),
    thumbnail: null as File | null,
    thumbnailPreview: null as string | null,
  });
  const [colors, setColors] = useState<Color[]>([]);
  const [technicalSpecs, setTechnicalSpecs] = useState<TechnicalSpec[]>([{ key: "", value: "" }]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        thumbnail: file,
        thumbnailPreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleColorChange = (index: number, field: keyof Color, value: string | File | null) => {
    setColors((prev) =>
      prev.map((color, i) =>
        i === index
          ? {
              ...color,
              [field]: value,
              imagePreview: field === "image" && value instanceof File ? URL.createObjectURL(value) : color.imagePreview,
            }
          : color
      )
    );
  };

  const addColor = () => {
    setColors((prev) => [...prev, { name: "", price: "", image: null, imagePreview: null }]);
  };

  const removeColor = (index: number) => {
    setColors((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSpecChange = (index: number, field: keyof TechnicalSpec, value: string) => {
    setTechnicalSpecs((prev) =>
      prev.map((spec, i) => (i === index ? { ...spec, [field]: value } : spec))
    );
  };

  const addSpec = () => {
    setTechnicalSpecs((prev) => [...prev, { key: "", value: "" }]);
  };

  const removeSpec = (index: number) => {
    setTechnicalSpecs((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("Dữ liệu form:", { ...formData, colors, technicalSpecs });
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Giả lập API call
    setIsSubmitting(false);
    router.push("/admin/products");
  };

  return (
    <div className="min-h-screen w-full">
      <div className="w-full px-4 py-6 sm:px-6 md:px-8 lg:py-16">
        <div className="container mx-auto">
          <div className="flex justify-start mb-4">
            <h1 className="text-xl sm:text-2xl font-bold">Thêm sản phẩm mới</h1>
          </div>
          <Card className="p-4 sm:p-6 rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Nhập thông tin sản phẩm</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <Label htmlFor="name">Tên sản phẩm</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Nhập tên sản phẩm"
                      className="mt-1 rounded-md bg-background text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="quantity">Số lượng</Label>
                    <Input
                      id="quantity"
                      name="quantity"
                      type="number"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      placeholder="Nhập số lượng"
                      className="mt-1 rounded-md bg-background text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="sale">Giảm giá (%)</Label>
                    <Input
                      id="sale"
                      name="sale"
                      type="number"
                      value={formData.sale}
                      onChange={handleInputChange}
                      placeholder="Nhập phần trăm giảm giá"
                      className="mt-1 rounded-md bg-background text-foreground"
                    />
                  </div>
                  <div>
                    <Label>Ngày ra mắt</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal mt-1 rounded-md cursor-pointer"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {format(formData.startDate, "PPP", { locale: vi })}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.startDate}
                          onSelect={(date) =>
                            date &&
                            setFormData((prev) => ({ ...prev, startDate: date }))
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label htmlFor="thumbnail">Hình ảnh chính</Label>
                    <Input
                      id="thumbnail"
                      name="thumbnail"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="mt-1 rounded-md cursor-pointer"
                    />
                    {formData.thumbnailPreview && (
                      <div className="mt-2">
                        <Image
                          src={formData.thumbnailPreview}
                          alt="Preview"
                          width={80}
                          height={80}
                          className="object-cover rounded-md shadow-sm"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label>Màu sắc</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addColor}
                      className="rounded-md hover:bg-accent hover:text-accent-foreground transition-colors duration-200 cursor-pointer"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Thêm màu
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {colors.map((color, index) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 p-3 rounded-md bg-muted/50 hover:bg-muted transition-colors duration-200 gap-4"
                      >
                        <div className="flex-1">
                          <Label htmlFor={`color-name-${index}`}>Tên màu</Label>
                          <Input
                            id={`color-name-${index}`}
                            value={color.name}
                            onChange={(e) => handleColorChange(index, "name", e.target.value)}
                            placeholder="Nhập tên màu"
                            className="mt-1 rounded-md bg-background text-foreground"
                          />
                        </div>
                        <div className="flex-1">
                          <Label htmlFor={`color-price-${index}`}>Giá</Label>
                          <Input
                            id={`color-price-${index}`}
                            value={color.price}
                            onChange={(e) => handleColorChange(index, "price", e.target.value)}
                            placeholder="Nhập giá"
                            className="mt-1 rounded-md bg-background text-foreground"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`color-image-${index}`}>Hình ảnh</Label>
                          <Input
                            id={`color-image-${index}`}
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleColorChange(index, "image", e.target.files?.[0] || null)}
                            className="mt-1 rounded-md cursor-pointer"
                          />
                        </div>
                        {color.imagePreview && (
                          <div className="mt-2 sm:mt-0">
                            <Image
                              src={color.imagePreview}
                              alt={`Preview ${color.name}`}
                              width={48}
                              height={48}
                              className="object-cover rounded-md shadow-sm"
                            />
                          </div>
                        )}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeColor(index)}
                          className="text-red-500 hover:text-red-600 cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label>Thông số kỹ thuật</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addSpec}
                      className="rounded-md hover:bg-accent hover:text-accent-foreground transition-colors duration-200 cursor-pointer"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Thêm thông số
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {technicalSpecs.map((spec, index) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 p-3 rounded-md bg-muted/50 hover:bg-muted transition-colors duration-200 gap-4"
                      >
                        <div className="flex-1">
                          <Label htmlFor={`spec-key-${index}`}>Tên thông số</Label>
                          <Input
                            id={`spec-key-${index}`}
                            value={spec.key}
                            onChange={(e) => handleSpecChange(index, "key", e.target.value)}
                            placeholder="Nhập tên thông số"
                            className="mt-1 rounded-md bg-background text-foreground"
                          />
                        </div>
                        <div className="flex-1">
                          <Label htmlFor={`spec-value-${index}`}>Giá trị</Label>
                          <Input
                            id={`spec-value-${index}`}
                            value={spec.value}
                            onChange={(e) => handleSpecChange(index, "value", e.target.value)}
                            placeholder="Nhập giá trị"
                            className="mt-1 rounded-md bg-background text-foreground"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSpec(index)}
                          className="text-red-500 hover:text-red-600 cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/admin/products")}
                    className="rounded-md cursor-pointer w-full sm:w-auto"
                  >
                    Hủy
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-200 cursor-pointer w-full sm:w-auto"
                  >
                    {isSubmitting ? "Đang lưu..." : "Lưu sản phẩm"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AddNewProductPage;