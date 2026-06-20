"use client";

import React, { useState } from "react";
import { Input, Button, Card } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { getDashboardPath } from "@/lib/dashboard";
import PublicNavbar from "@/Components/Navbar/navbar";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const emailValue = formData.get("email");
    const passwordValue = formData.get("password");

    const { data, error: signInError } = await authClient.signIn.email({
      email: emailValue,
      password: passwordValue,
      callbackURL: "/dashboard",
    });

    if (signInError) {
      setError(signInError.message ?? "Sign in failed");
      console.error(signInError);
      return;
    }

    router.push(getDashboardPath(data?.user?.role));
  };

  return (
    <>
      <PublicNavbar />
      <div className="page-bg flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <Card className="surface surface-border w-full max-w-md rounded-2xl border p-4 shadow-xl">
          <Card.Content className="flex flex-col items-center gap-6">
            <div className="w-full text-center">
              <h1 className="bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-600 bg-clip-text pb-2 text-5xl font-extrabold tracking-tight text-transparent">
                Log In
              </h1>
              <p className="text-body mt-1 text-sm font-medium tracking-wide">Sign in to access your account</p>
            </div>

            {error && <p className="w-full text-center text-sm text-red-500">{error}</p>}

            <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1.5">
                <label className="text-label text-sm font-medium">Email address</label>
                <Input
                  name="email"
                  type="email"
                  placeholder="Enter Your Email Here"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field h-12 w-full px-4"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-label text-sm font-medium">Password</label>
                <Input
                  name="password"
                  type="password"
                  placeholder="*******"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field h-12 w-full px-4"
                />
              </div>

              <Button
                type="submit"
                className="mt-2 h-12 w-full rounded-lg bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-600 text-base font-bold text-gray-900 shadow-md transition-transform hover:opacity-90 active:scale-[0.98]"
              >
                Log In
              </Button>
            </form>

            <div className="mt-2 flex w-full flex-col items-center gap-3">
              <p className="text-label text-sm font-semibold">Login with social accounts</p>
              <Button variant="bordered" className="btn-outline flex h-12 w-full items-center justify-center gap-3 rounded-none">
                <svg className="h-5 w-5" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                </svg>
                <span className="text-heading text-sm font-bold">Continue with Google</span>
              </Button>
            </div>

            <div className="text-body mt-2 text-center text-sm font-medium">
              Don&apos;t have an account yet?{" "}
              <Link href="/sign-up" className="text-heading font-semibold underline hover:opacity-80">
                Register.
              </Link>
            </div>
          </Card.Content>
        </Card>
      </div>
    </>
  );
}
