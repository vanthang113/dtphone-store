"use client";

import React from "react";
import AuthCard from "@/components/auth/shared/AuthCard";
import ForgotPasswordForm from "@/components/auth/ForgotPassword/ForgotPasswordForm";

type ForgotPasswordCardProps = {
  backHref?: string;
};

export default function ForgotPasswordCard({ backHref = "/login" }: ForgotPasswordCardProps) {
  return (
    <AuthCard
      mascotSrc="/images/auth/robo-like.png"
      title="Tạo mật khẩu mới"
      description="Hãy nhập số điện thoại của bạn vào bên dưới để bắt đầu quá trình khôi phục mật khẩu."
    >
      <ForgotPasswordForm backHref={backHref} />
    </AuthCard>
  );
}
