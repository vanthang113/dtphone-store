import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface Category {
  id: number;
  title: string;
  slug: string;
  parentId: number | null;
  image: string;
  description: string;
  order: number;
  isActive: boolean;
  isFeatured: boolean;
  metaTitle: string;
  metaDescription: string;
  tags: string[];
}

interface CategoriesFormProps {
  categories: Category[];
  currentCategory: Category | null;
  onSave: (newCategory: Category) => void;
  onClose: () => void;
}

export default function CategoriesForm({ categories, currentCategory, onSave, onClose }: CategoriesFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newCategory: Category = {
      id: currentCategory?.id || Date.now(),
      title: formData.get('title') as string,
      slug: formData.get('slug') as string,
      parentId: formData.get('parentId') === 'none' ? null : Number(formData.get('parentId')),
      image: formData.get('image') as string,
      description: formData.get('description') as string,
      order: Number(formData.get('order')),
      isActive: formData.get('isActive') === 'on',
      isFeatured: formData.get('isFeatured') === 'on',
      metaTitle: formData.get('metaTitle') as string,
      metaDescription: formData.get('metaDescription') as string,
      tags: (formData.get('tags') as string).split(',').map((tag) => tag.trim()),
    };
    onSave(newCategory);
  };

  return (
    <SheetContent side="right">
      <form className="flex flex-col gap-4 h-full" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 h-full overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{currentCategory ? 'Sửa danh mục' : 'Thêm danh mục'}</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-2 px-4">
            <label className="text-sm">Tên danh mục</label>
            <Input
              type="text"
              name="title"
              defaultValue={currentCategory?.title || ''}
              required
            />
            <label className="text-sm mt-2">Slug</label>
            <Input
              type="text"
              name="slug"
              defaultValue={currentCategory?.slug || ''}
              required
            />
            <label className="text-sm mt-2">Danh mục cha</label>
            <Select
              name="parentId"
              defaultValue={currentCategory?.parentId?.toString() || 'none'}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn danh mục cha" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Không có</SelectItem>
                {categories
                  .filter((cat) => cat.id !== currentCategory?.id)
                  .map((cat) => (
                    <SelectItem key={cat.id} value={String(cat.id)}>
                      {cat.title}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <label className="text-sm mt-2">Ảnh đại diện (URL)</label>
            <Input
              type="text"
              name="image"
              defaultValue={currentCategory?.image || ''}
            />
            <label className="text-sm mt-2">Mô tả</label>
            <Textarea
              name="description"
              defaultValue={currentCategory?.description || ''}
              rows={3}
            />
            <label className="text-sm mt-2">Thứ tự sắp xếp</label>
            <Input
              type="number"
              name="order"
              defaultValue={currentCategory?.order || 0}
              min={0}
            />
            <label className="text-sm mt-2">Hiển thị</label>
            <div className="flex items-center gap-2 mt-2">
              <input type="checkbox" name="isActive" defaultChecked={currentCategory?.isActive ?? true} />
              <span>Kích hoạt</span>
            </div>
            <label className="text-sm mt-2">Nổi bật trên trang chủ</label>
            <div className="flex items-center gap-2 mt-2">
              <input type="checkbox" name="isFeatured" defaultChecked={currentCategory?.isFeatured ?? false} />
              <span>Kích hoạt</span>
            </div>
            <label className="text-sm mt-2">Meta Title</label>
            <Input
              type="text"
              name="metaTitle"
              defaultValue={currentCategory?.metaTitle || ''}
            />
            <label className="text-sm mt-2">Meta Description</label>
            <Textarea
              name="metaDescription"
              defaultValue={currentCategory?.metaDescription || ''}
              rows={3}
            />
            <label className="text-sm mt-2">Tags (phân cách bằng dấu phẩy)</label>
            <Input
              type="text"
              name="tags"
              defaultValue={currentCategory?.tags.join(', ') || ''}
            />
          </div>
          <SheetFooter>
            <Button type="submit">Lưu</Button>
            <SheetClose asChild>
              <Button type="button" variant="outline" onClick={onClose}>
                Hủy
              </Button>
            </SheetClose>
          </SheetFooter>
        </div>
      </form>
    </SheetContent>
  );
}