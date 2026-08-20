"use client";

import { useState } from "react";
import { Input, Button, Card } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function registerWithEmail(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await authClient.signUp.email({
      name,
      email,
      password,
      image: photoUrl || undefined,
      role,
    });

    setLoading(false);

    if (result.error) {
      setError(result.error.message ?? "Registration failed");
      return;
    }

    // Signing up doesn't create a session any more — the account has to
    // confirm its email with the code that was just sent.
    router.push(`/verify-email?email=${encodeURIComponent(email)}&sent=1`);
  }

  async function registerWithGoogle() {
    setError("");

    const result = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
      errorCallbackURL: "/sign-up",
      additionalData: { role },
    });

    if (result.error) {
      setError(result.error.message ?? "Google sign in failed");
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-8">
      <Card className="bg-surface border-default w-full max-w-md rounded-card border p-4 shadow-raised">
        <Card.Content className="flex flex-col items-center gap-6">
          <div className="w-full text-center">
            <h1 className="bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-600 bg-clip-text pb-2 text-4xl font-extrabold tracking-tight text-transparent">
              Sign Up
            </h1>
            <p className="text-body mt-1 text-sm font-medium">Create an account to get started</p>
          </div>

          {error && (
            <p className="w-full rounded-control border border-danger/30 bg-danger-soft py-2 text-center text-sm font-medium text-danger-soft-fg">
              {error}
            </p>
          )}

          <div className="flex w-full flex-col gap-2">
            <label className="text-label text-sm font-medium">Account Type</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole("user")}
                className={`rounded-control border px-3 py-2 text-sm font-semibold capitalize ${
                  role === "user"
                    ? "border-accent bg-accent-soft text-accent-soft-fg"
                    : "border-default bg-surface text-body"
                }`}
              >
                User
              </button>
              <button
                type="button"
                onClick={() => setRole("vendor")}
                className={`rounded-control border px-3 py-2 text-sm font-semibold capitalize ${
                  role === "vendor"
                    ? "border-accent bg-accent-soft text-accent-soft-fg"
                    : "border-default bg-surface text-body"
                }`}
              >
                Vendor
              </button>
            </div>
          </div>

          <form className="flex w-full flex-col gap-4" onSubmit={registerWithEmail}>
            <div className="flex flex-col gap-1.5">
              <label className="text-label text-sm font-medium">Full Name</label>
              <Input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field h-12 w-full px-4"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-label text-sm font-medium">Email address</label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field h-12 w-full px-4"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-label text-sm font-medium">Profile Photo URL (optional)</label>
              <Input
                type="url"
                placeholder="https://example.com/photo.jpg"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="input-field h-12 w-full px-4"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-label text-sm font-medium">Password</label>
              <Input
                type="password"
                placeholder="Choose a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field h-12 w-full px-4"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="mt-2 h-12 w-full rounded-control bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-600 text-base font-bold text-gray-900 shadow-card hover:opacity-90"
            >
              {loading ? "Creating account..." : "Register with Email"}
            </Button>
          </form>

          <div className="flex w-full items-center gap-3">
            <div className="h-px flex-1 bg-default" />
            <span className="text-body text-xs font-medium">or</span>
            <div className="h-px flex-1 bg-default" />
          </div>

          <Button
            type="button"
            onClick={registerWithGoogle}
            className="border-default btn-outline flex h-12 w-full items-center justify-center gap-2 rounded-control border text-base font-semibold"
          >
            <FcGoogle className="text-xl" />
            Register with Google
          </Button>

          <div className="text-body mt-2 text-center text-sm font-medium">
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
