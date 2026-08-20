"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input, Button, Card } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import OtpInput, { OTP_LENGTH } from "@/Components/Auth/OtpInput";
import ResendOtp from "@/Components/Auth/ResendOtp";
import { otpErrorMessage } from "@/Components/Auth/otp-errors";

const MIN_PASSWORD_LENGTH = 8;

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  const sendCode = async () => {
    setError("");
    const { error: sendError } = await authClient.emailOtp.requestPasswordReset({ email });

    if (sendError) {
      setError(otpErrorMessage(sendError, "Could not send the code. Please try again."));
      return false;
    }

    return true;
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    const ok = await sendCode();
    setLoading(false);

    if (ok) {
      setCodeSent(true);
      // Kept vague on purpose so the page can't be used to discover accounts
      setNotice(`If an account uses ${email}, a ${OTP_LENGTH}-digit code is on its way.`);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();

    if (otp.length !== OTP_LENGTH) {
      setError(`Enter all ${OTP_LENGTH} digits.`);
      return;
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
      return;
    }

    if (password !== confirmPassword) {
      setError("The two passwords don't match.");
      return;
    }

    setLoading(true);
    setError("");
    setNotice("");

    const { error: resetError } = await authClient.emailOtp.resetPassword({
      email,
      otp,
      password,
    });

    setLoading(false);

    if (resetError) {
      setError(otpErrorMessage(resetError));
      return;
    }

    router.push("/sign-in?reset=1");
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <Card className="surface surface-border w-full max-w-md rounded-2xl border p-4 shadow-xl">
        <Card.Content className="flex flex-col items-center gap-6">
          <div className="w-full text-center">
            <h1 className="bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-600 bg-clip-text pb-2 text-4xl font-extrabold tracking-tight text-transparent">
              Reset Password
            </h1>
            <p className="text-body mt-1 text-sm font-medium">
              {codeSent
                ? `Enter the code we sent to ${email} and choose a new password`
                : "We'll email you a code to reset your password"}
            </p>
          </div>

          {error && (
            <p className="w-full rounded-lg border border-red-100 bg-red-50 py-2 text-center text-sm font-medium text-red-500">
              {error}
            </p>
          )}

          {notice && !error && (
            <p className="w-full rounded-lg border border-emerald-100 bg-emerald-50 py-2 text-center text-sm font-medium text-emerald-600">
              {notice}
            </p>
          )}

          {!codeSent ? (
            <form className="flex w-full flex-col gap-4" onSubmit={handleSendCode}>
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

              <Button
                type="submit"
                disabled={loading}
                className="h-12 w-full rounded-lg bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-600 text-base font-bold text-gray-900 shadow-md hover:opacity-90"
              >
                {loading ? "Sending..." : "Email Me a Code"}
              </Button>
            </form>
          ) : (
            <form className="flex w-full flex-col gap-5" onSubmit={handleReset}>
              <OtpInput value={otp} onChange={setOtp} disabled={loading} />

              <div className="flex flex-col gap-1.5">
                <label className="text-label text-sm font-medium">New password</label>
                <Input
                  type="password"
                  placeholder={`At least ${MIN_PASSWORD_LENGTH} characters`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field h-12 w-full px-4"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-label text-sm font-medium">Confirm new password</label>
                <Input
                  type="password"
                  placeholder="Re-enter your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-field h-12 w-full px-4"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="h-12 w-full rounded-lg bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-600 text-base font-bold text-gray-900 shadow-md hover:opacity-90"
              >
                {loading ? "Saving..." : "Set New Password"}
              </Button>

              <ResendOtp
                onResend={async () => {
                  setOtp("");
                  setNotice("");
                  const ok = await sendCode();
                  if (ok) setNotice("A new code is on its way.");
                }}
              />
            </form>
          )}

          <div className="text-body text-center text-sm font-medium">
            Remembered it?{" "}
            <Link href="/sign-in" className="text-heading font-semibold underline hover:opacity-80">
              Log In
            </Link>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}
