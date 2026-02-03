import AuthShell from "@/components/auth/shared/AuthShell";
import ResetPasswordCard from "@/components/auth/ForgotPassword/ResetPasswordCard";

export default function ResetPasswordPage() {
  return (
    <AuthShell>
      <ResetPasswordCard />
    </AuthShell>
  );
}
