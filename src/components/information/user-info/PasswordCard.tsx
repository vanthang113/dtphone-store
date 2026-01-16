"use client"

import * as React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Pencil } from "lucide-react"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import { PasswordForm, PasswordFormValues } from "./PasswordForm"

interface FormContainerProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSave: (data: PasswordFormValues) => void
}

function EditFormDrawer({ open, onOpenChange, onSave }: FormContainerProps) {
    const handleCancel = () => onOpenChange(false)
    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Thay đổi mật khẩu</DrawerTitle>
                    <DrawerDescription>
                        Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho
                        người khác.
                    </DrawerDescription>
                </DrawerHeader>
                <PasswordForm onSave={onSave} onCancel={handleCancel} />
            </DrawerContent>
        </Drawer>
    )
}

function EditFormSheet({ open, onOpenChange, onSave }: FormContainerProps) {
    const handleCancel = () => onOpenChange(false)
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-md">
                <SheetHeader>
                    <SheetTitle>Thay đổi mật khẩu</SheetTitle>
                    <SheetDescription>
                        Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho
                        người khác.
                    </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                    <PasswordForm onSave={onSave} onCancel={handleCancel} />
                </div>
            </SheetContent>
        </Sheet>
    )
}

export function PasswordCard() {
    const [open, setOpen] = React.useState(false)
    const [lastUpdated, setLastUpdated] =
        React.useState("03/11/2024 16:42")

    const isDesktop = useMediaQuery("(min-width: 768px)")

    const handleUpdate = () => {
        setOpen(true)
    }

    const handleSave = (data: PasswordFormValues) => {
        console.log("Password change data:", data)
        const now = new Date()
        const formattedDate = `${now.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" })} ${now.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}`
        setLastUpdated(formattedDate)
        setOpen(false)
    }

    return (
        <>
            <Card className="bg-white w-full md:w-1/2 rounded-xl">
                <CardHeader className="py-0 flex w-full justify-between items-center">
                    <h2 className="text-base font-bold text-black">Thay đổi mật khẩu</h2>
                    <h2
                        onClick={handleUpdate}
                        className="text-base font-bold flex items-center gap-1 text-[#00868B] cursor-pointer"
                    >
                        <Pencil className="w-4 h-4" />
                        Cập nhật
                    </h2>
                </CardHeader>
                <CardContent className="p-4 md:p-6 space-y-4">
                    <div className="flex justify-between items-center text-base">
                        <span className="text-gray-400">
                            Cập nhật lần cuối lúc:
                        </span>
                        <span className="text-gray-700">{lastUpdated}</span>
                    </div>
                </CardContent>
            </Card>

            {isDesktop ? (
                <EditFormSheet
                    open={open}
                    onOpenChange={setOpen}
                    onSave={handleSave}
                />
            ) : (
                <EditFormDrawer
                    open={open}
                    onOpenChange={setOpen}
                    onSave={handleSave}
                />
            )}
        </>
    )
} 