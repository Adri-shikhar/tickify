"use client";

import { useState } from "react";
import { Input, Button, Card } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { getDashboardPath } from "@/lib/dashboard";
import { FcGoogle } from "react-icons/fc";

export default function SignInForm({ passwordWasReset = false }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { data, error: signInError } = await authClient.signIn.email({ email, password });

    setLoading(false);

    if (signInError) {
      // The account exists but hasn't confirmed its email. Better Auth has
      // already emailed a fresh code (sendOnSignIn), so send them to enter it.
      if (signInError.code === "EMAIL_NOT_VERIFIED") {
        router.push(`/verify-email?email=${encodeURIComponent(email)}&sent=1`);
        return;
      }

      setError(signInError.message ?? "Sign in failed");
      return;
    }

    router.push(getDashboardPath(data?.user?.role));
    router.refresh();
  };

  const handleGoogleSignIn = async () => {
    setError("");

    const { error: googleError } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });

    if (googleError) {
      setError(googleError.message ?? "Google sign in failed");
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <Card className="bg-surface border-default w-full max-w-md rounded-card border p-4 shadow-raised">
        <Card.Content className="flex flex-col items-center gap-6">
          <div className="w-full text-center">
            <h1 className="bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-600 bg-clip-text pb-2 text-4xl font-extrabold tracking-tight text-transparent">
              Log In
            </h1>
            <p className="text-body mt-1 text-sm font-medium">Sign in to access your account</p>
          </div>

          {passwordWasReset && !error && (
            <p className="w-full rounded-control border border-success/30 bg-success-soft py-2 text-center text-sm font-medium text-success-soft-fg">
              Password updated. Log in with your new password.
            </p>
          )}

          {error && <p className="w-full text-center text-sm text-danger">{error}</p>}

          <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1.5">
              <label className="text-label text-sm font-medium">Email address</label>
              <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field h-12 w-full px-4" required />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-label text-sm font-medium">Password</label>
                <Link href="/forgot-password" className="text-body text-xs font-medium underline hover:opacity-80">
                  Forgot password?
                </Link>
              </div>
              <Input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field h-12 w-full px-4" required />
            </div>

            <Button type="submit" disabled={loading} className="mt-2 h-12 w-full rounded-control bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-600 text-base font-bold text-gray-900 shadow-card hover:opacity-90">
              {loading ? "Logging in..." : "Log In"}
            </Button>
          </form>

          <div className="flex w-full items-center gap-3">
            <div className="h-px flex-1 bg-default" />
            <span className="text-body text-xs font-medium">or</span>
            <div className="h-px flex-1 bg-default" />
          </div>

          <div className="flex w-full flex-col gap-3">
            <Button
              type="button"
              onClick={handleGoogleSignIn}
              className="border-default btn-outline flex h-12 w-full items-center justify-center gap-2 rounded-control border text-base font-semibold"
            >
              <FcGoogle className="text-xl" />
              Continue with Google
            </Button>

            <Link
              href="/sign-in/otp"
              className="border-default btn-outline flex h-12 w-full items-center justify-center gap-2 rounded-control border text-base font-semibold"
            >
              ✉️ Email me a login code
            </Link>
          </div>

          <div className="text-body mt-2 text-center text-sm font-medium">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-heading font-semibold underline hover:opacity-80">Register</Link>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}
