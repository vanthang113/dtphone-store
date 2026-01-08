import React from 'react';
import { Pencil, Trash2, Eye, EyeOff, Star, StarOff } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

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

interface CategoriesTableProps {
  categories: Category[];
  allCategories: Category[];
  toggleActive: (id: number) => void;
  toggleFeatured: (id: number) => void;
  handleEditCategory: (category: Category) => void;
  handleDeleteCategory: (id: number) => void;
}

export default function CategoriesTable({
  categories,
  allCategories,
  toggleActive,
  toggleFeatured,
  handleEditCategory,
  handleDeleteCategory,
}: CategoriesTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <Table className="min-w-[700px] md:min-w-0">
        <TableHeader>
          <TableRow>
            <TableHead>Tên danh mục</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Danh mục cha</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Nổi bật</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">Không có danh mục phù hợp.</TableCell>
            </TableRow>
          ) : (
            categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.title}</TableCell>
                <TableCell>{category.slug}</TableCell>
                <TableCell>{allCategories.find((cat) => cat.id === category.parentId)?.title || '-'}</TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant={category.isActive ? 'secondary' : 'outline'}
                    onClick={() => toggleActive(category.id)}
                  >
                    {category.isActive ? <Eye size={16} /> : <EyeOff size={16} />}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant={category.isFeatured ? 'secondary' : 'outline'}
                    onClick={() => toggleFeatured(category.id)}
                  >
                    {category.isFeatured ? <Star size={16} /> : <StarOff size={16} />}
                  </Button>
                </TableCell>
                <TableCell className="flex gap-2 flex-wrap md:flex-nowrap">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditCategory(category)}
                  >
                    <Pencil size={16} />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}