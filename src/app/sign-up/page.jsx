"use client";

import { useState } from "react";
import { Input, Button, Card } from "@heroui/react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { getDashboardPath } from "@/lib/dashboard";
import { FcGoogle } from "react-icons/fc";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");

  async function registerWithEmail(e) {
    e.preventDefault();
    setError("");

    const result = await authClient.signUp.email({
      name,
      email,
      password,
      image: photoUrl || undefined,
      role,
      callbackURL: "/dashboard",
    });

    if (result.error) {
      setError(result.error.message ?? "Registration failed");
      return;
    }

    const userRole = result.data?.user?.role ?? role;
    window.location.href = getDashboardPath(userRole);
  }

  async function registerWithGoogle() {
    setError("");

    const result = await authClient.signIn.social({
      provider: "google",
      callbackURL: getDashboardPath(role),
      errorCallbackURL: "/sign-up",
      additionalData: { role },
    });

    if (result.error) {
      setError(result.error.message ?? "Google sign in failed");
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-8">
      <Card className="surface surface-border w-full max-w-sm rounded-2xl border p-5 shadow-xl">
        <Card.Content className="flex flex-col items-center gap-5">
          <div className="w-full text-center">
            <h1 className="bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-600 bg-clip-text pb-1 text-3xl font-extrabold tracking-tight text-transparent">
              Sign Up
            </h1>
            <p className="text-body text-xs font-medium">Create an account to get started</p>
          </div>

          {error && (
            <p className="w-full rounded-lg border border-red-100 bg-red-50 py-1.5 text-center text-xs font-medium text-red-500">
              {error}
            </p>
          )}

          <div className="flex w-full flex-col gap-2">
            <label className="text-label text-xs font-medium">Account Type</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole("user")}
                className={`rounded-lg border px-3 py-2 text-xs font-semibold capitalize ${
                  role === "user"
                    ? "border-teal-500 bg-teal-50 text-teal-900"
                    : "border-gray-200 bg-white text-gray-600"
                }`}
              >
                User
              </button>
              <button
                type="button"
                onClick={() => setRole("vendor")}
                className={`rounded-lg border px-3 py-2 text-xs font-semibold capitalize ${
                  role === "vendor"
                    ? "border-teal-500 bg-teal-50 text-teal-900"
                    : "border-gray-200 bg-white text-gray-600"
                }`}
              >
                Vendor
              </button>
            </div>
          </div>

          <form className="flex w-full flex-col gap-3.5" onSubmit={registerWithEmail}>
            <div className="flex flex-col gap-1">
              <label className="text-label text-xs font-medium">Full Name</label>
              <Input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field h-10 w-full px-3 text-sm"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-label text-xs font-medium">Email address</label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field h-10 w-full px-3 text-sm"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-label text-xs font-medium">Profile Photo URL (optional)</label>
              <Input
                type="url"
                placeholder="https://example.com/photo.jpg"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="input-field h-10 w-full px-3 text-sm"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-label text-xs font-medium">Password</label>
              <Input
                type="password"
                placeholder="Choose a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field h-10 w-full px-3 text-sm"
                required
              />
            </div>

            <Button
              type="submit"
              className="mt-1 h-10 w-full rounded-lg bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-600 text-sm font-bold text-gray-950 shadow-sm hover:opacity-90"
            >
              Register with Email
            </Button>
          </form>

          <div className="flex w-full items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-body text-xs font-medium">or</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <Button
            type="button"
            onClick={registerWithGoogle}
            className="surface-border btn-outline flex h-10 w-full items-center justify-center gap-2 rounded-lg border text-sm font-semibold"
          >
            <FcGoogle className="text-lg" />
            Register with Google
          </Button>

          <div className="text-body mt-1 text-center text-xs font-medium">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-heading font-semibold underline hover:opacity-80">
              Log In
            </Link>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}
