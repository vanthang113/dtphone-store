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

// Schema for password change form with password confirmation validation
const passwordFormSchema = z
    .object({
        currentPassword: z.string().min(1, {
            message: "Vui lòng nhập mật khẩu hiện tại.",
        }),
        newPassword: z.string().min(8, {
            message: "Mật khẩu mới phải có ít nhất 8 ký tự.",
        }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Mật khẩu không khớp.",
        path: ["confirmPassword"], // path of error
    })

export type PasswordFormValues = z.infer<typeof passwordFormSchema>

export function PasswordForm({
    onSave,
    onCancel,
}: {
    onSave: (data: PasswordFormValues) => void
    onCancel: () => void
}) {
    const form = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordFormSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    })

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSave)}
                className="space-y-4 px-4 py-6"
            >
                <FormField
                    control={form.control}
                    name="currentPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mật khẩu hiện tại</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Nhập mật khẩu hiện tại"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mật khẩu mới</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Nhập mật khẩu mới"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Xác nhận mật khẩu mới</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Xác nhận mật khẩu mới"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-end gap-4 pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                        size="lg"
                    >
                        Hủy
                    </Button>
                    <Button type="submit" size="lg">
                        Lưu thay đổi
                    </Button>
                </div>
            </form>
        </Form>
    )
} 