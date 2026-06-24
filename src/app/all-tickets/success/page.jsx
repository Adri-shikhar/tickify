import { redirect } from "next/navigation";
import Link from "next/link";
import { stripe } from "@/lib/stripe";
import { createPayment } from "@/actions/payment";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    return <p className="p-8 text-red-500">Missing payment session.</p>;
  }

  const session = await stripe.checkout.sessions.retrieve(session_id);

  if (session.status === "open") {
    redirect("/dashboard/user/my-booked-tickets");
  }

  if (session.status !== "complete") {
    return <p className="p-8 text-red-500">Payment was not completed.</p>;
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
  });

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-2xl font-bold text-emerald-600">Payment Successful!</h1>
      <p className="text-gray-600">Thank you! Your ticket is confirmed.</p>
      <Link
        href="/dashboard/user/my-booked-tickets"
        className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-bold text-white"
      >
        My Bookings
      </Link>
    </div>
  );
}
