"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input, Button, Card } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { getDashboardPath } from "@/lib/dashboard";
import OtpInput, { OTP_LENGTH } from "@/Components/Auth/OtpInput";
import ResendOtp from "@/Components/Auth/ResendOtp";
import { otpErrorMessage } from "@/Components/Auth/otp-errors";

export default function OtpSignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  const sendCode = async () => {
    setError("");
    const { error: sendError } = await authClient.emailOtp.sendVerificationOtp({
      email,
      type: "sign-in",
    });

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
      // Deliberately vague — we don't reveal whether the account exists
      setNotice(`If an account uses ${email}, a ${OTP_LENGTH}-digit code is on its way.`);
    }
  };

  const handleSignIn = async (code = otp) => {
    if (code.length !== OTP_LENGTH) {
      setError(`Enter all ${OTP_LENGTH} digits.`);
      return;
    }

    setLoading(true);
    setError("");
    setNotice("");

    const { data, error: signInError } = await authClient.signIn.emailOtp({ email, otp: code });

    setLoading(false);

    if (signInError) {
      setError(otpErrorMessage(signInError));
      setOtp("");
      return;
    }

    router.push(getDashboardPath(data?.user?.role));
    router.refresh();
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <Card className="bg-surface border-default w-full max-w-md rounded-card border p-4 shadow-raised">
        <Card.Content className="flex flex-col items-center gap-6">
          <div className="w-full text-center">
            <h1 className="bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-600 bg-clip-text pb-2 text-4xl font-extrabold tracking-tight text-transparent">
              Sign In With Code
            </h1>
            <p className="text-body mt-1 text-sm font-medium">
              {codeSent ? `Enter the code we sent to ${email}` : "No password needed — we'll email you a code"}
            </p>
          </div>

          {error && (
            <p className="w-full rounded-control border border-danger/30 bg-danger-soft py-2 text-center text-sm font-medium text-danger-soft-fg">
              {error}
            </p>
          )}

          {notice && !error && (
            <p className="w-full rounded-control border border-success/30 bg-success-soft py-2 text-center text-sm font-medium text-success-soft-fg">
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
                className="h-12 w-full rounded-control bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-600 text-base font-bold text-gray-900 shadow-card hover:opacity-90"
              >
                {loading ? "Sending..." : "Email Me a Code"}
              </Button>
            </form>
          ) : (
            <form
              className="flex w-full flex-col gap-5"
              onSubmit={(e) => {
                e.preventDefault();
                handleSignIn();
              }}
            >
              <OtpInput value={otp} onChange={setOtp} onComplete={handleSignIn} disabled={loading} />

              <Button
                type="submit"
                disabled={loading}
                className="h-12 w-full rounded-control bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-600 text-base font-bold text-gray-900 shadow-card hover:opacity-90"
              >
                {loading ? "Signing in..." : "Sign In"}
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
            <Link href="/sign-in" className="text-heading font-semibold underline hover:opacity-80">
              Use password instead
            </Link>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}
