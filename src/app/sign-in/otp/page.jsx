// Passwordless sign-in with a one-time code (route: /sign-in/otp)
import OtpSignInForm from "@/Components/Auth/OtpSignInForm";

export const metadata = {
  title: "Sign In With Code - Tickify",
};

export default function OtpSignInPage() {
  return <OtpSignInForm />;
}
