import AuthShell from "@/components/auth/shared/AuthShell";
import ForgotPasswordCard from "@/components/auth/ForgotPassword/ForgotPasswordCard";

export default function ForgotPasswordPage() {
  return (
    <AuthShell>
      <ForgotPasswordCard backHref="/login" />
    </AuthShell>
  );
}
