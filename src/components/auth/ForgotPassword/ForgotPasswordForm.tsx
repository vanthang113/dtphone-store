"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import PhoneField from "@/components/auth/ForgotPassword/PhoneField";

function isValidVNPhone(phone: string) {
  return /^\d{10,11}$/.test(phone);
}

type ForgotPasswordFormProps = {
  backHref?: string;
};

export default function ForgotPasswordForm({ backHref = "/login" }: ForgotPasswordFormProps) {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleContinue = async () => {
    setError("");
    const p = phone.trim();

    if (!p) return setError("Vui lòng nhập số điện thoại");
    if (!isValidVNPhone(p)) return setError("Số điện thoại không hợp lệ (10–11 chữ số)");

    // TODO: Nối API gửi OTP tại đây (client call)
    // Ví dụ: await fetch('/api/forgot-password/send-otp', ...)
    // Sau đó router.push(`/forgot-password/otp?phone=${p}`)

    console.log("Forgot password phone:", p);
  };

  return (
    <div className="mx-auto w-full max-w-[520px]">
      <PhoneField value={phone} onChange={setPhone} error={error} />

      <div className="mt-6 flex flex-col-reverse sm:flex-row gap-3 sm:gap-4">
        <Button
          type="button"
          variant="outline"
          className="h-11 sm:h-12 w-full sm:w-1/2 border-neutral-300"
          asChild
        >
          <Link href={backHref} className="flex items-center justify-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            Quay lại đăng nhập
          </Link>
        </Button>

        <Button
          type="button"
          onClick={handleContinue}
          className="h-11 sm:h-12 w-full sm:w-1/2 bg-red-600 hover:bg-red-700 text-white font-semibold"
        >
          Tiếp tục
        </Button>
      </div>

      <p className="mt-4 text-center text-xs sm:text-sm text-neutral-500">
        Bằng việc tiếp tục, bạn đồng ý nhận mã xác thực qua SMS (nếu áp dụng).
      </p>
    </div>
  );
}
