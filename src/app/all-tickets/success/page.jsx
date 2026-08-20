import { redirect } from "next/navigation";
import Link from "next/link";
import { stripe } from "@/lib/stripe";
import { createPayment } from "@/actions/payment";

function Notice({ tone = "danger", title, children }) {
  const tones = {
    danger: "border-danger/30 bg-danger-soft text-danger-soft-fg",
    warning: "border-warning/30 bg-warning-soft text-warning-soft-fg",
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center p-6">
      <div className={`w-full max-w-md rounded-card border p-6 text-center ${tones[tone]}`}>
        <p className="text-base font-semibold">{title}</p>
        <div className="mt-3 text-sm">{children}</div>
      </div>
    </div>
  );
}

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    return (
      <Notice title="Missing payment session">
        We couldn&apos;t find a payment to confirm.{" "}
        <Link href="/dashboard/user/my-booked-tickets" className="font-semibold underline">
          Back to my bookings
        </Link>
      </Notice>
    );
  }

  const session = await stripe.checkout.sessions.retrieve(session_id);

  if (session.status === "open") {
    redirect("/dashboard/user/my-booked-tickets");
  }

  if (session.status !== "complete") {
    return (
      <Notice tone="warning" title="Payment was not completed">
        Nothing has been charged. You can try again from your bookings.{" "}
        <Link href="/dashboard/user/my-booked-tickets" className="font-semibold underline">
          Back to my bookings
        </Link>
      </Notice>
    );
  }

  const m = session.metadata || {};

  await createPayment({
    session_id,
    user_id: m.userId,
    booking_id: m.bookingId,
    currency: session.currency || "usd",
    status: "paid",
    customerEmail: session.customer_details?.email || "",
    payment_intent_id: String(session.payment_intent || ""),
    paidAt: m.paidAt || new Date().toISOString(),
  });

  return (
    <div className="flex min-h-[70vh] items-center justify-center p-6">
      <div className="w-full max-w-md rounded-sheet border border-default bg-surface p-8 text-center shadow-card animate-in fade-in-0 zoom-in-95 duration-250 ease-out-quad">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success-soft text-3xl">
          ✓
        </div>

        <h1 className="mt-5 text-2xl font-bold text-heading">Payment successful</h1>
        <p className="mt-2 text-sm leading-relaxed text-body">
          Your ticket is confirmed. A receipt has been sent to{" "}
          <span className="font-medium text-label">
            {session.customer_details?.email || "your email"}
          </span>
          .
        </p>

        <div className="mt-8 flex flex-col gap-3">
          {m.bookingId && (
            <Link
              href={`/dashboard/user/download-ticket/${m.bookingId}`}
              className="inline-flex h-11 items-center justify-center rounded-control bg-accent px-5 text-sm font-semibold text-on-accent shadow-card transition-colors duration-150 ease-standard hover:bg-accent-hover"
            >
              Download ticket
            </Link>
          )}
          <Link
            href="/dashboard/user/my-booked-tickets"
            className="inline-flex h-11 items-center justify-center rounded-control border border-default bg-surface px-5 text-sm font-semibold text-heading transition-colors duration-150 ease-standard hover:bg-surface-hover"
          >
            My bookings
          </Link>
        </div>
      </div>
    </div>
  );
}
