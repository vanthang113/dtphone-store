"use client";

import React from "react";
import AuthCard from "@/components/auth/shared/AuthCard";
import ForgotPasswordOtpForm from "@/components/auth/ForgotPassword/ForgotPasswordOtpForm";

export default function ForgotPasswordOtpCard() {
  return (
    <AuthCard
      mascotSrc="/images/auth/robo-like.png"
      title="Xác thực OTP"
      description="Vui lòng nhập mã OTP gồm 6 chữ số để tiếp tục."
    >
      <ForgotPasswordOtpForm />
    </AuthCard>
  );
}
