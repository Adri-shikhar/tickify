"use client";

// Requested Bookings page (route: /dashboard/vendor/bookings) — shows all bookings for a vendor's tickets
import { useSession } from "@/lib/auth-client";
import { getVendorBookings } from "@/actions/booked";
import { useSessionData } from "@/lib/useSessionData";
import { fmtDate } from "@/lib/format";
import { Card } from "@heroui/react";

export default function BookingsPage() {
  const { data: session } = useSession();
  const { data: bookings, error, loading } = useSessionData(session?.user?.id, getVendorBookings, "bookings");

  return (
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col gap-6 bg-gray-50/50 p-6 md:p-8">
      <div>
        <h1 className="text-3xl font-black text-gray-900">
          Requested Bookings <span className="text-cyan-600">({bookings.length})</span>
        </h1>
        <p className="mt-1 text-sm text-gray-500">Passenger reservations for your tickets.</p>
      </div>

      {loading && <p className="animate-pulse text-sm text-gray-500">Loading...</p>}
      {error && <p className="rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-500">{error}</p>}
      {!loading && !error && !bookings.length && (
        <p className="rounded-2xl border bg-white py-12 text-center text-sm text-gray-400">No bookings yet.</p>
      )}

      <div className="flex flex-col gap-4">
        {bookings.map(({ _id, ticketTitle, departureDateTime, bookedAt, seatsBooked, totalPrice, userName, userEmail }) => (
          <Card key={_id} className="flex flex-col gap-4 border border-gray-100 p-5 shadow-md">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="rounded bg-cyan-50 px-2 py-0.5 text-[10px] font-bold uppercase text-cyan-600">Order</span>
                <h2 className="mt-1 text-lg font-bold text-gray-900">{ticketTitle}</h2>
              </div>
              <span className="rounded border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-black uppercase text-emerald-600">Paid</span>
            </div>

            <div className="grid grid-cols-2 gap-3 rounded-xl bg-gray-50 p-3 text-xs">
              <div>
                <p className="text-[10px] font-bold uppercase text-gray-400">Customer</p>
                <p className="font-bold text-gray-800">{userName || "User"}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-gray-400">Email</p>
                <p className="font-semibold text-gray-700">{userEmail || "N/A"}</p>
              </div>
            </div>

            <div className="flex justify-between text-xs text-gray-500">
              <span>🕒 Departure: {fmtDate(departureDateTime)}</span>
              <span>Booked: {fmtDate(bookedAt)}</span>
            </div>

            <div className="flex justify-between border-t border-dashed border-gray-100 pt-3">
              <div>
                <p className="text-[10px] font-bold uppercase text-gray-400">Seats</p>
                <p className="text-sm font-black">{seatsBooked}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold uppercase text-gray-400">Revenue</p>
                <p className="text-lg font-black text-emerald-500">৳ {totalPrice}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
