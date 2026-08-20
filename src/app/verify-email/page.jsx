// Email verification with a one-time code (route: /verify-email)
import VerifyEmailForm from "@/Components/Auth/VerifyEmailForm";

export const metadata = {
  title: "Verify Email - Tickify",
};

export default async function VerifyEmailPage({ searchParams }) {
  const params = await searchParams;

  return (
    <VerifyEmailForm
      initialEmail={params.email || ""}
      // sign-up and sign-in already triggered a code before redirecting here
      codeAlreadySent={params.sent === "1"}
    />
  );
}
