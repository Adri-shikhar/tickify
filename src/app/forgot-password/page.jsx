// Password reset with a one-time code (route: /forgot-password)
import ForgotPasswordForm from "@/Components/Auth/ForgotPasswordForm";

export const metadata = {
  title: "Reset Password - Tickify",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
