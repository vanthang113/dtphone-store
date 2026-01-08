"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"

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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const addressFormSchema = z.object({
    type: z.string().min(1, "Vui lòng nhập loại địa chỉ."),
    city: z.string().min(1, "Vui lòng chọn Tỉnh/Thành phố."),
    district: z.string().min(1, "Vui lòng chọn Quận/Huyện."),
    ward: z.string().min(1, "Vui lòng chọn Phường/Xã."),
    street: z.string().min(1, "Vui lòng nhập số nhà, tên đường."),
    isDefault: z.boolean().default(false),
})

export type AddressFormValues = z.infer<typeof addressFormSchema>

export function AddressForm({
    address,
    onSave,
    onCancel,
}: {
    address?: Partial<AddressFormValues> | null
    onSave: (data: AddressFormValues) => void
    onCancel: () => void
}) {
    const form = useForm<AddressFormValues>({
        defaultValues: {
            type: "",
            city: "",
            district: "",
            ward: "",
            street: "",
            isDefault: false,
            ...address,
        },
    })

    return (
        <Card className="w-full border-none shadow-none">
            {/* <CardHeader>
                <CardTitle>
                    {address ? "Cập nhật địa chỉ" : "Thêm địa chỉ mới"}
                </CardTitle>
                <CardDescription>
                    Vui lòng điền đầy đủ thông tin.
                </CardDescription>
            </CardHeader> */}
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSave)}
                        className="space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Loại địa chỉ</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Ví dụ: Nhà riêng, Văn phòng..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 gap-4">
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tỉnh/Thành phố</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl className=" w-full">
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Chọn Tỉnh/Thành phố" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="hcm">
                                                    TP. Hồ Chí Minh
                                                </SelectItem>
                                                <SelectItem value="hanoi">Hà Nội</SelectItem>
                                                <SelectItem value="danang">Đà Nẵng</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="district"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Quận/Huyện</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl className=" w-full">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Chọn Quận/Huyện" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="q1">Quận 1</SelectItem>
                                            <SelectItem value="q2">Quận 2</SelectItem>
                                            <SelectItem value="q3">Quận 3</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="ward"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phường/Xã</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl className=" w-full">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Chọn Phường/Xã" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="pdk">
                                                Phường Đa Kao
                                            </SelectItem>
                                            <SelectItem value="pbn">
                                                Phường Bến Nghé
                                            </SelectItem>
                                            <SelectItem value="pbt">
                                                Phường Bến Thành
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="street"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Số nhà, tên đường</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Ví dụ: 123 Đường ABC"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="isDefault"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">
                                            Đặt làm địa chỉ mặc định
                                        </FormLabel>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end gap-4 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                size="lg"
                                onClick={onCancel}
                            >
                                Hủy
                            </Button>
                            <Button type="submit" size="lg">
                                {address ? "Lưu thay đổi" : "Thêm địa chỉ"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
} 