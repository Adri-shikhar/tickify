"use client";

// Sign Up page (route: /sign-up)
import { useState } from "react";
import { Input, Button, Card } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { getDashboardPath } from "@/lib/dashboard";
import PublicNavbar from "@/Components/Navbar/navbar";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [role, setRole] = useState("user"); // "user" or "vendor"
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { error: signUpError } = await authClient.signUp.email({
      name, email, password, image: photoUrl || undefined, role, callbackURL: "/dashboard",
    });

    if (signUpError) { setError(signUpError.message ?? "Registration failed"); return; }

    router.push(getDashboardPath(role));
  };

  // Highlight the selected role button
  const roleBtn = (value) =>
    role === value ? "border-teal-500 bg-teal-50/30 ring-1 ring-teal-500/20" : "surface-border btn-outline border";

  return (
    <>
      <PublicNavbar />
      <div className="page-bg flex min-h-screen items-center justify-center px-4 py-8">
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

            <form className="flex w-full flex-col gap-3.5" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1">
                <label className="text-label text-xs font-medium">Full Name</label>
                <Input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} className="input-field h-10 w-full px-3 text-sm" required />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-label text-xs font-medium">Email address</label>
                <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field h-10 w-full px-3 text-sm" required />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-label text-xs font-medium">Profile Photo URL (optional)</label>
                <Input type="url" placeholder="https://example.com/photo.jpg" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} className="input-field h-10 w-full px-3 text-sm" />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-label text-xs font-medium">Password</label>
                <Input type="password" placeholder="Choose a password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field h-10 w-full px-3 text-sm" required />
              </div>

              <div className="flex w-full flex-col gap-1">
                <label className="text-label text-xs font-medium">Account Type</label>
                <div className="grid w-full grid-cols-2 gap-3">
                  {["user", "vendor"].map((value) => (
                    <button key={value} type="button" onClick={() => setRole(value)} className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-2 transition-all ${roleBtn(value)}`}>
                      <span className={`text-xs font-semibold capitalize ${role === value ? "text-teal-900" : "text-body"}`}>{value}</span>
                    </button>
                  ))}
                </div>
              </div>

              <Button type="submit" className="mt-1 h-10 w-full rounded-lg bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-600 text-sm font-bold text-gray-950 shadow-sm hover:opacity-90">
                Register
              </Button>
            </form>

            <div className="text-body mt-1 text-center text-xs font-medium">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-heading font-semibold underline hover:opacity-80">Log In</Link>
            </div>
          </Card.Content>
        </Card>
      </div>
    </>
  );
}
