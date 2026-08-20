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

export default function VerifyEmailForm({ initialEmail = "", codeAlreadySent = false }) {
  const router = useRouter();
  const [email, setEmail] = useState(initialEmail);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);
  // When we arrive straight from sign-up the code is already on its way
  const [codeSent, setCodeSent] = useState(codeAlreadySent && Boolean(initialEmail));

  const sendCode = async (target = email) => {
    setError("");
    const { error: sendError } = await authClient.emailOtp.sendVerificationOtp({
      email: target,
      type: "email-verification",
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
      setNotice(`We sent a ${OTP_LENGTH}-digit code to ${email}.`);
    }
  };

  const handleVerify = async (code = otp) => {
    if (code.length !== OTP_LENGTH) {
      setError(`Enter all ${OTP_LENGTH} digits.`);
      return;
    }

    setLoading(true);
    setError("");
    setNotice("");

    const { data, error: verifyError } = await authClient.emailOtp.verifyEmail({ email, otp: code });

    setLoading(false);

    if (verifyError) {
      setError(otpErrorMessage(verifyError));
      setOtp("");
      return;
    }

    // autoSignInAfterVerification is on, so a session already exists here
    router.push(getDashboardPath(data?.user?.role));
    router.refresh();
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <Card className="surface surface-border w-full max-w-md rounded-2xl border p-4 shadow-xl">
        <Card.Content className="flex flex-col items-center gap-6">
          <div className="w-full text-center">
            <h1 className="bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-600 bg-clip-text pb-2 text-4xl font-extrabold tracking-tight text-transparent">
              Verify Email
            </h1>
            <p className="text-body mt-1 text-sm font-medium">
              {codeSent
                ? `Enter the ${OTP_LENGTH}-digit code we sent to ${email}`
                : "We'll email you a code to confirm your address"}
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
                {loading ? "Sending..." : "Send Code"}
              </Button>
            </form>
          ) : (
            <form
              className="flex w-full flex-col gap-5"
              onSubmit={(e) => {
                e.preventDefault();
                handleVerify();
              }}
            >
              <OtpInput
                value={otp}
                onChange={setOtp}
                onComplete={handleVerify}
                disabled={loading}
              />

              <Button
                type="submit"
                disabled={loading}
                className="h-12 w-full rounded-lg bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-600 text-base font-bold text-gray-900 shadow-md hover:opacity-90"
              >
                {loading ? "Verifying..." : "Verify Email"}
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
            Wrong email?{" "}
            <Link href="/sign-up" className="text-heading font-semibold underline hover:opacity-80">
              Sign up again
            </Link>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}
