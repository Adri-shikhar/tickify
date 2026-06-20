"use client";

import React, { useState } from "react";
import { Input, Button, Card } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { getDashboardPath } from "@/lib/dashboard";
import PublicNavbar from "@/Components/Navbar/navbar";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [role, setRole] = useState("user");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { error: signUpError } = await authClient.signUp.email({
      name,
      email,
      password,
      image: photoUrl || undefined,
      role,
      callbackURL: "/dashboard",
    });

    if (signUpError) {
      setError(signUpError.message ?? "Registration failed");
      console.error(signUpError);
      return;
    }

    router.push(getDashboardPath(role));
  };

  const roleBtn = (value) =>
    role === value
      ? "border-teal-500 bg-teal-50/30 ring-1 ring-teal-500/20"
      : "surface-border btn-outline border";

  return (
    <>
      <PublicNavbar />
      <div className="page-bg flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <Card className="surface surface-border w-full max-w-sm rounded-2xl border p-5 shadow-xl">
          <Card.Content className="flex flex-col items-center gap-5">
            <div className="w-full text-center">
              <h1 className="bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-600 bg-clip-text pb-1 text-3xl font-extrabold tracking-tight text-transparent">
                Sign Up
              </h1>
              <p className="text-body text-xs font-medium tracking-wide">
                Create an account to get started
              </p>
            </div>

            {error && (
              <p className="w-full rounded-lg border border-red-100 bg-red-50 py-1.5 text-center text-xs font-medium text-red-500">
                {error}
              </p>
            )}

            <form
              className="flex w-full flex-col gap-3.5"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-1">
                <label className="text-label text-xs font-medium">
                  Full Name
                </label>
                <Input
                  type="text"
                  placeholder="Enter Your Name Here"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field h-10 w-full px-3 text-sm"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-label text-xs font-medium">
                  Email address
                </label>
                <Input
                  type="email"
                  placeholder="Enter Your Email Here"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field h-10 w-full px-3 text-sm"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-label text-xs font-medium">
                  Profile Photo URL
                </label>
                <Input
                  type="url"
                  placeholder="Enter Photo URL Here"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="input-field h-10 w-full px-3 text-sm"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-label text-xs font-medium">
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="*******"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field h-10 w-full px-3 text-sm"
                />
              </div>

              <div className="flex w-full flex-col gap-1 pt-0.5">
                <label className="text-label text-xs font-medium tracking-wide">Account Type</label>
                <div className="grid w-full grid-cols-2 gap-3">
                  {["user", "vendor"].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setRole(value)}
                      className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-2 transition-all duration-200 ${roleBtn(value)}`}
                    >
                      <span className={`text-xs font-semibold capitalize ${role === value ? "text-teal-900" : "text-body"}`}>
                        {value}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                className="mt-1 h-10 w-full rounded-lg bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-600 text-sm font-bold text-gray-950 shadow-sm transition-transform hover:opacity-90 active:scale-[0.98]"
              >
                Register
              </Button>
            </form>

            <div className="mt-1 flex w-full flex-col items-center gap-2.5">
              <p className="text-body text-xs font-semibold">
                Register with social accounts
              </p>
              <Button
                variant="bordered"
                className="btn-outline flex h-10 w-full items-center justify-center gap-2.5 rounded-lg"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    fill="#EA4335"
                  />
                </svg>
                <span className="text-heading text-xs font-bold">
                  Continue with Google
                </span>
              </Button>
            </div>

            <div className="text-body mt-1 text-center text-xs font-medium">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="text-heading font-semibold underline hover:opacity-80"
              >
                Log In.
              </Link>
            </div>
          </Card.Content>
        </Card>
      </div>
    </>
  );
}
