"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

// Định nghĩa schema validation sử dụng Zod
const formSchema = z.object({
    name: z.string().min(2, { message: "Tên phải có ít nhất 2 ký tự." }),
    phone: z.string().min(10, { message: "Số điện thoại không hợp lệ." }),
    birthday: z.string().optional(),
    email: z.string().email({ message: "Email không hợp lệ." }),
    address: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

// Dữ liệu mẫu
const currentUserInfo = {
    name: "Nguyễn Văn A",
    phone: "0123456789",
    birthday: "2000-01-01",
    email: "nguyenvana@email.com",
    address: "123 Đường ABC, Quận 1, TP.HCM"
};

/**
 * Form chỉnh sửa thông tin cá nhân.
 * Sử dụng react-hook-form để quản lý trạng thái và Zod để validation.
 */
export function EditInfoForm({ onSave }: { onSave?: (data: FormValues) => void }) {
    // Khởi tạo form với resolver của Zod và giá trị mặc định
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: currentUserInfo,
    })

    // Hàm xử lý khi submit form
    function onSubmit(data: FormValues) {
        console.log(data) // In dữ liệu ra console để kiểm tra
        if (onSave) {
            onSave(data) // Gọi callback onSave (nếu có) để đóng form
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Họ và tên</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập họ và tên" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Số điện thoại</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập số điện thoại" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="birthday"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ngày sinh</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập email" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Địa chỉ</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập địa chỉ" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">Lưu thay đổi</Button>
            </form>
        </Form>
    )
} 