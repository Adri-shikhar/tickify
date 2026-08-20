// Sign In page (route: /sign-in)
import SignInForm from "@/Components/Auth/SignInForm";

export const metadata = {
  title: "Log In - Tickify",
};

export default async function SignInPage({ searchParams }) {
  const params = await searchParams;

  return <SignInForm passwordWasReset={params.reset === "1"} />;
}
