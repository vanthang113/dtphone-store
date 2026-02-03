"use client";

import React from "react";
import AuthCard from "@/components/auth/shared/AuthCard";
import ResetPasswordForm from "@/components/auth/ForgotPassword/ResetPasswordForm";

export default function ResetPasswordCard() {
  return (
    <AuthCard
      mascotSrc="/images/auth/robo-like.png"
      title="Đặt lại mật khẩu"
      description="Nhập mật khẩu mới để hoàn tất quá trình khôi phục tài khoản."
    >
      <ResetPasswordForm />
    </AuthCard>
  );
}
