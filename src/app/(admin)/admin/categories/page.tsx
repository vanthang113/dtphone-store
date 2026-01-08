'use client';

import React, { useState, useMemo } from 'react';
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import CategoriesForm from '@/components/admin/categories/categories-form';
import CategoriesTable from '@/components/admin/categories/categories-table';
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from '@radix-ui/react-separator';

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

const initialCategories: Category[] = [
    {
        id: 1,
        title: 'Điện thoại',
        slug: '/dien-thoai',
        parentId: null,
        image: '/images/phone.jpg',
        description: 'Danh mục các loại điện thoại thông minh',
        order: 1,
        isActive: true,
        isFeatured: true,
        metaTitle: 'Điện thoại thông minh chính hãng',
        metaDescription: 'Mua điện thoại thông minh chính hãng, giá tốt nhất',
        tags: ['smartphone', 'điện thoại'],
    },
    {
        id: 2,
        title: 'iPhone',
        slug: '/dien-thoai/iphone',
        parentId: 1,
        image: '/images/iphone.jpg',
        description: 'Các dòng iPhone chính hãng từ Apple',
        order: 2,
        isActive: true,
        isFeatured: false,
        metaTitle: 'iPhone chính hãng',
        metaDescription: 'Mua iPhone chính hãng với giá ưu đãi',
        tags: ['iphone', 'apple'],
    },
    {
        id: 3,
        title: 'Samsung',
        slug: '/dien-thoai/samsung',
        parentId: 1,
        image: '/images/samsung.jpg',
        description: 'Các dòng Samsung chính hãng',
        order: 3,
        isActive: true,
        isFeatured: false,
        metaTitle: 'Samsung chính hãng',
        metaDescription: 'Mua Samsung chính hãng với giá ưu đãi',
        tags: ['samsung', 'android'],
    },
];

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>(initialCategories);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterParentId, setFilterParentId] = useState<string>('all');

    const handleAddCategory = () => {
        setCurrentCategory(null);
        setIsModalOpen(true);
    };

    const handleEditCategory = (category: Category) => {
        setCurrentCategory(category);
        setIsModalOpen(true);
    };

    const handleDeleteCategory = (id: number) => {
        setCategories(categories.filter((cat) => cat.id !== id));
    };

    const toggleActive = (id: number) => {
        setCategories(
            categories.map((cat) =>
                cat.id === id ? { ...cat, isActive: !cat.isActive } : cat
            )
        );
    };

    const toggleFeatured = (id: number) => {
        setCategories(
            categories.map((cat) =>
                cat.id === id ? { ...cat, isFeatured: !cat.isFeatured } : cat
            )
        );
    };

    const handleSaveCategory = (newCategory: Category) => {
        if (currentCategory) {
            setCategories(
                categories.map((cat) => (cat.id === currentCategory.id ? newCategory : cat))
            );
        } else {
            setCategories([...categories, newCategory]);
        }
        setIsModalOpen(false);
    };

    // Lọc và tìm kiếm danh mục
    const filteredCategories = useMemo(() => {
        return categories.filter((cat) => {
            const matchesSearch =
                cat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                cat.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesParent =
                filterParentId === 'all' || cat.parentId === (filterParentId === 'null' ? null : Number(filterParentId));
            return matchesSearch && matchesParent;
        });
    }, [categories, searchTerm, filterParentId]);

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Quản lý danh mục</h1>
                <Sheet open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <SheetTrigger asChild>
                        <Button onClick={handleAddCategory} className="flex items-center">
                            <Plus size={20} className="mr-2" /> Thêm danh mục
                        </Button>
                    </SheetTrigger>
                    <CategoriesForm
                        categories={categories}
                        currentCategory={currentCategory}
                        onSave={handleSaveCategory}
                        onClose={() => setIsModalOpen(false)}
                    />
                </Sheet>
            </div>

            {/* Bộ lọc và tìm kiếm */}
            <Card className="mb-4 p-4">
                <div className="flex flex-wrap gap-4 items-end">
                    <div>
                        <label className="block text-sm mb-1">Tìm kiếm</label>
                        <Input
                            placeholder="Tên hoặc tags..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-48"
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Danh mục cha</label>
                        <Select value={filterParentId} onValueChange={setFilterParentId}>
                            <SelectTrigger className="w-48">
                                <SelectValue placeholder="Chọn danh mục cha" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tất cả</SelectItem>
                                <SelectItem value="null">Không có danh mục cha</SelectItem>
                                {categories
                                    .filter((cat) => cat.parentId === null)
                                    .map((cat) => (
                                        <SelectItem key={cat.id} value={String(cat.id)}>
                                            {cat.title}
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </Card>
            <Separator className="mb-4" />
            <Card>
                <CategoriesTable
                    categories={filteredCategories}
                    allCategories={categories}
                    toggleActive={toggleActive}
                    toggleFeatured={toggleFeatured}
                    handleEditCategory={handleEditCategory}
                    handleDeleteCategory={handleDeleteCategory}
                />
            </Card>
        </div>
    );
}