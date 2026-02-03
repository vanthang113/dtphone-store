"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, RotateCw } from "lucide-react";
import OtpInputs from "@/components/auth/ForgotPassword/OtpInputs";

function maskPhone(phone: string) {
  // 09xxxx1234 -> 09****1234
  if (!phone) return "";
  if (phone.length < 7) return phone;
  return `${phone.slice(0, 2)}****${phone.slice(-4)}`;
}

export default function ForgotPasswordOtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") || "";

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  // resend timer
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [isResending, setIsResending] = useState(false);

  const canSubmit = useMemo(() => otp.replace(/\D/g, "").length === 6, [otp]);

  React.useEffect(() => {
    if (secondsLeft <= 0) return;
    const t = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [secondsLeft]);

  const handleVerify = async () => {
    setError("");

    if (!phone) {
      setError("Thiếu số điện thoại. Vui lòng quay lại bước trước.");
      return;
    }

    if (!canSubmit) {
      setError("Vui lòng nhập đủ 6 chữ số OTP");
      return;
    }

    try {
      // TODO: gọi API verify OTP tại đây
      // Nếu thành công -> sang trang reset (kèm phone/otp)
      router.push(`/forgot-password/reset?phone=${encodeURIComponent(phone)}&otp=${encodeURIComponent(otp)}`);
    } catch {
      setError("Mã OTP không đúng hoặc đã hết hạn. Vui lòng thử lại.");
    }
  };

  const handleResend = async () => {
    if (secondsLeft > 0) return;

    setError("");
    setIsResending(true);
    try {
      // TODO: gọi API resend OTP tại đây
      setSecondsLeft(30);
    } catch {
      setError("Không thể gửi lại OTP. Vui lòng thử lại.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[560px]">
      <div className="text-center">
        <p className="text-sm sm:text-base text-neutral-700">
          Nhập mã OTP đã gửi đến <span className="font-semibold">{maskPhone(phone)}</span>
        </p>
      </div>

      <div className="mt-5">
        <OtpInputs value={otp} onChange={setOtp} length={6} />
      </div>

      {error ? (
        <div className="mt-4 w-full rounded-xl border border-red-200 bg-red-50 p-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      ) : null}

      <div className="mt-6 flex flex-col-reverse sm:flex-row gap-3 sm:gap-4">
        <Button variant="outline" className="h-11 sm:h-12 w-full sm:w-1/2 border-neutral-300" asChild>
          <Link
            href={`/forgot-password${phone ? `?phone=${encodeURIComponent(phone)}` : ""}`}
            className="flex items-center justify-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Quay lại
          </Link>
        </Button>

        <Button
          type="button"
          onClick={handleVerify}
          className="h-11 sm:h-12 w-full sm:w-1/2 bg-red-600 hover:bg-red-700 text-white font-semibold"
        >
          Xác nhận
        </Button>
      </div>

      <div className="mt-4 flex flex-col items-center justify-center gap-2">
        <button
          type="button"
          onClick={handleResend}
          disabled={secondsLeft > 0 || isResending}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#00868B] disabled:opacity-60"
        >
          <RotateCw className="h-4 w-4" />
          {secondsLeft > 0 ? `Gửi lại mã (${secondsLeft}s)` : isResending ? "Đang gửi lại..." : "Gửi lại mã"}
        </button>

        <p className="text-xs sm:text-sm text-neutral-500">
          Không nhận được mã? Kiểm tra SMS hoặc thử gửi lại.
        </p>
      </div>
    </div>
  );
}
