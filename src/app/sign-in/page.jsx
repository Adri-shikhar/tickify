"use client";

// Sign In page (route: /sign-in)
import { useState } from "react";
import { Input, Button, Card } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { getDashboardPath } from "@/lib/dashboard";
import PublicNavbar from "@/Components/Navbar/navbar";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { data, error: signInError } = await authClient.signIn.email({ email, password, callbackURL: "/dashboard" });

    if (signInError) { setError(signInError.message ?? "Sign in failed"); return; }

    router.push(getDashboardPath(data?.user?.role));
  };

  return (
    <>
      <PublicNavbar />
      <div className="page-bg flex min-h-screen items-center justify-center px-4 py-12">
        <Card className="surface surface-border w-full max-w-md rounded-2xl border p-4 shadow-xl">
          <Card.Content className="flex flex-col items-center gap-6">
            <div className="w-full text-center">
              <h1 className="bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-600 bg-clip-text pb-2 text-5xl font-extrabold tracking-tight text-transparent">
                Log In
              </h1>
              <p className="text-body mt-1 text-sm font-medium">Sign in to access your account</p>
            </div>

            {error && <p className="w-full text-center text-sm text-red-500">{error}</p>}

            <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1.5">
                <label className="text-label text-sm font-medium">Email address</label>
                <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field h-12 w-full px-4" required />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-label text-sm font-medium">Password</label>
                <Input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field h-12 w-full px-4" required />
              </div>

              <Button type="submit" className="mt-2 h-12 w-full rounded-lg bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-600 text-base font-bold text-gray-900 shadow-md hover:opacity-90">
                Log In
              </Button>
            </form>

            <div className="text-body mt-2 text-center text-sm font-medium">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="text-heading font-semibold underline hover:opacity-80">Register</Link>
            </div>
          </Card.Content>
        </Card>
      </div>
    </>
  );
}
