import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";

const API = process.env.TICKIFY_API_URL ?? "http://localhost:5000";

export async function POST(request) {
  try {
    const headersList = await headers();
    const session = await auth.api.getSession({ headers: headersList });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const bookingId = String(formData.get("bookingId") || "");
    const totalPrice = formData.get("totalPrice");

    let booking = null;
    if (bookingId) {
      const token = session.session?.token;
      const res = await fetch(`${API}/api/bookings/${bookingId}`, {
        cache: "no-store",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) booking = await res.json();
    }

    const accepted = booking?.status === "accepted" || booking?.status === "pay";
    const departed = booking?.departureDateTime && new Date(booking.departureDateTime) < new Date();

    if (booking && (!accepted || departed)) {
      return NextResponse.redirect(new URL("/dashboard/user/my-booked-tickets", request.url));
    }

    const price = booking?.totalPrice || totalPrice;
    const origin = headersList.get("origin");

    const checkoutSession = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: booking?.ticketTitle || "Ticket" },
            unit_amount: Number(price) * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: String(session.user.id),
        bookingId: String(booking?._id || bookingId),
        ticketId: String(booking?.ticket_id || ""),
        vendorId: String(booking?.vendor_id || ""),
        vendorName: String(booking?.vendorName || ""),
        quantity: String(booking?.seatsBooked || 1),
        totalPrice: String(price),
      },
      mode: "payment",
      success_url: `${origin}/all-tickets/success?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.redirect(checkoutSession.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}
