"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";

function isStrongPassword(pw: string) {
  // tối thiểu 8 ký tự (bạn có thể siết thêm)
  return pw.length >= 8;
}

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") || "";
  const otp = searchParams.get("otp") || "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showCf, setShowCf] = useState(false);
  const [error, setError] = useState("");

  const canSubmit = useMemo(() => {
    if (!password || !confirm) return false;
    if (!isStrongPassword(password)) return false;
    if (password !== confirm) return false;
    return true;
  }, [password, confirm]);

  const handleSubmit = async () => {
    setError("");

    if (!phone || !otp) {
      setError("Thiếu thông tin xác thực. Vui lòng quay lại bước OTP.");
      return;
    }

    if (!isStrongPassword(password)) {
      setError("Mật khẩu cần tối thiểu 8 ký tự.");
      return;
    }

    if (password !== confirm) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    try {
      // TODO: gọi API reset password tại đây: { phone, otp, new_password: password }
      // Thành công -> về login
      router.push("/login");
    } catch {
      setError("Không thể đặt lại mật khẩu. Vui lòng thử lại.");
    }
  };

  return (
    <div className="mx-auto w-full max-w-[520px]">
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium text-neutral-800">
          Mật khẩu mới
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPw ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11 sm:h-12 text-base pr-12"
            placeholder="Nhập mật khẩu mới"
            autoComplete="new-password"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1 h-9 w-9 sm:h-10 sm:w-10"
            onClick={() => setShowPw((v) => !v)}
            aria-label="Toggle password visibility"
          >
            {showPw ? <EyeOff className="h-5 w-5 text-neutral-600" /> : <Eye className="h-5 w-5 text-neutral-600" />}
          </Button>
        </div>
        <p className="text-xs sm:text-sm text-neutral-500">Tối thiểu 8 ký tự.</p>
      </div>

      <div className="mt-4 space-y-2">
        <Label htmlFor="confirm" className="text-sm font-medium text-neutral-800">
          Xác nhận mật khẩu
        </Label>
        <div className="relative">
          <Input
            id="confirm"
            type={showCf ? "text" : "password"}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="h-11 sm:h-12 text-base pr-12"
            placeholder="Nhập lại mật khẩu"
            autoComplete="new-password"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1 h-9 w-9 sm:h-10 sm:w-10"
            onClick={() => setShowCf((v) => !v)}
            aria-label="Toggle confirm visibility"
          >
            {showCf ? <EyeOff className="h-5 w-5 text-neutral-600" /> : <Eye className="h-5 w-5 text-neutral-600" />}
          </Button>
        </div>
      </div>

      {error ? (
        <div className="mt-4 w-full rounded-xl border border-red-200 bg-red-50 p-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      ) : null}

      <div className="mt-6 flex flex-col-reverse sm:flex-row gap-3 sm:gap-4">
        <Button variant="outline" className="h-11 sm:h-12 w-full sm:w-1/2 border-neutral-300" asChild>
          <Link
            href={`/forgot-password/otp${phone ? `?phone=${encodeURIComponent(phone)}` : ""}`}
            className="flex items-center justify-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Quay lại OTP
          </Link>
        </Button>

        <Button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="h-11 sm:h-12 w-full sm:w-1/2 bg-red-600 hover:bg-red-700 text-white font-semibold disabled:opacity-50"
        >
          Đổi mật khẩu
        </Button>
      </div>
    </div>
  );
}
