"use client";

import { useSession } from "@/lib/auth-client";
import { getUserBookings } from "@/actions/booked";
import { useSessionData } from "@/lib/useSessionData";
import { fmtDate } from "@/lib/format";
import { Card, Button } from "@heroui/react";

function getStatusBadge(status) {
  if (status === "paid") {
    return { text: "Paid", cls: "bg-emerald-50 border-emerald-200 text-emerald-600" };
  }
  if (status === "pay") {
    return { text: "Approved", cls: "bg-blue-50 border-blue-200 text-blue-600" };
  }
  if (status === "rejected") {
    return { text: "Rejected", cls: "bg-red-50 border-red-200 text-red-600" };
  }
  return { text: "Waiting for Confirmation", cls: "bg-amber-50 border-amber-200 text-amber-600" };
}

export default function MyBookedTicketsPage() {
  const { data: session } = useSession();
  const { data: bookings = [], error, loading } = useSessionData(
    session?.user?.id,
    getUserBookings,
    "bookings"
  );

  return (
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col gap-6 bg-gray-50/50 p-6 md:p-8 isolate">
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">
          My Booked Tickets <span className="text-emerald-500">({bookings.length})</span>
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Track and process payments for your active trip reservations.
        </p>
      </div>

      {loading && (
        <p className="animate-pulse text-sm text-gray-500 font-medium">Loading your bookings...</p>
      )}

      {error && (
        <p className="rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-500 font-medium">
          {error}
        </p>
      )}

      {!loading && !error && bookings.length === 0 && (
        <p className="rounded-2xl border bg-white py-12 text-center text-sm text-gray-400 font-medium shadow-sm">
          No tickets booked yet.
        </p>
      )}

      <div className="flex flex-col gap-4">
        {bookings.map((booking) => {
          const badge = getStatusBadge(booking.status);
          const canPay = booking.status === "pay";

          return (
            <Card
              key={booking._id}
              className="flex flex-col gap-4 border border-gray-100 p-5 shadow-md transform-gpu backface-hidden bg-white rounded-2xl"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-lg font-bold text-gray-900 tracking-tight line-clamp-1">
                  {booking.ticketTitle}
                </h2>
                <span
                  className={`rounded-md border px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider shrink-0 ${badge.cls}`}
                >
                  {badge.text}
                </span>
              </div>

              

              <div className="flex justify-between rounded-xl bg-gray-50 p-3 text-xs font-semibold text-gray-600 border border-gray-100/60">
                <span>🕒 Departure: {fmtDate(booking.departureDateTime)}</span>
                <span className="text-gray-400 font-medium">Booked: {fmtDate(booking.bookedAt)}</span>
              </div>

              <div className="flex justify-between border-t border-dashed border-gray-100 pt-3 items-end">
                <div>
                  <p className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Seats Secured</p>
                  <p className="text-sm font-black text-gray-800 mt-0.5">{booking.seatsBooked}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Total Due</p>
                  <p className="text-lg font-black text-emerald-500 mt-0.5">৳ {booking.totalPrice}</p>
                </div>
              </div>

              {canPay && (
                <div className="border-t border-gray-100 pt-3">
                  <form action="/api/payment" method="POST">
                    <input type="hidden" name="bookingId" value={String(booking._id)} />
                    <input type="hidden" name="totalPrice" value={booking.totalPrice} />

                    <Button
                      type="submit"
                      className="w-full h-9 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-xs rounded-xl shadow-sm transition-transform active:scale-[0.98] hover:opacity-95"
                    >
                      💳 Pay Now (৳{booking.totalPrice})
                    </Button>
                  </form>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
