"use client";

// "Resend code" link with a countdown. The server rate-limits OTP requests to
// 3 per minute, so the cooldown keeps users from hitting that wall.
import { useEffect, useState } from "react";

const COOLDOWN_SECONDS = 60;

export default function ResendOtp({ onResend, startCounting = true }) {
  const [seconds, setSeconds] = useState(startCounting ? COOLDOWN_SECONDS : 0);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (seconds <= 0) return;
    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds]);

  const handleResend = async () => {
    setSending(true);
    setSent(false);
    await onResend();
    setSending(false);
    setSent(true);
    setSeconds(COOLDOWN_SECONDS);
  };

  if (seconds > 0) {
    return (
      <p className="text-body text-center text-xs font-medium">
        {sent ? "Code sent. " : ""}You can request a new code in {seconds}s
      </p>
    );
  }

  return (
    <p className="text-body text-center text-xs font-medium">
      Didn&apos;t get the code?{" "}
      <button
        type="button"
        onClick={handleResend}
        disabled={sending}
        className="text-heading font-semibold underline hover:opacity-80 disabled:opacity-50"
      >
        {sending ? "Sending..." : "Resend code"}
      </button>
    </p>
  );
}
