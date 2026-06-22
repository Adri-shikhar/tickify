"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { getVendorBookings, updateBookingStatus } from "@/actions/booked";
import { useSessionData } from "@/lib/useSessionData";
import { fmtDate } from "@/lib/format";
import { Card, Button } from "@heroui/react";

export default function BookingsPage() {
  const { data: session } = useSession();
  const { data: initialBookings, error, loading } = useSessionData(session?.user?.id, getVendorBookings, "bookings");
  const [bookings, setBookings] = useState([]);

  // Safe array synchronization guard to eliminate undefined mapping crashes
  useEffect(() => {
    if (Array.isArray(initialBookings)) {
      setTimeout(() => {
        setBookings(initialBookings);
      }, 0);
    }
  }, [initialBookings]);

  const handleAction = async (id, nextStatus) => {
    const res = await updateBookingStatus(id, nextStatus);
    if (!res.error) {
      setBookings((prev) => prev.map((b) => (b._id === id ? { ...b, status: nextStatus } : b)));
    }
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col gap-6 bg-gray-50/50 p-6 md:p-8 isolate">
      <div>
        <h1 className="text-3xl font-black text-gray-900">
          Requested Bookings <span className="text-cyan-600">({bookings?.length || 0})</span>
        </h1>
        <p className="mt-1 text-sm text-gray-500">Passenger reservations for your tickets.</p>
      </div>

      {loading && <p className="animate-pulse text-sm text-gray-500 font-medium">Loading...</p>}
      {error && <p className="rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-500 font-medium">{error}</p>}
      
      {!loading && !error && !bookings?.length && (
        <p className="rounded-2xl border bg-white py-12 text-center text-sm text-gray-400 font-medium shadow-sm">No bookings yet.</p>
      )}

      <div className="flex flex-col gap-4">
        {(bookings || []).map(({ _id, ticketTitle, departureDateTime, bookedAt, seatsBooked, totalPrice, userName, userEmail, status }) => (
          <Card key={String(_id)} className="flex flex-col gap-4 border border-gray-100 p-5 shadow-md transform-gpu backface-hidden bg-white rounded-2xl">
            
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="rounded bg-cyan-50 px-2 py-0.5 text-[10px] font-bold uppercase text-cyan-600 border border-cyan-100">Order</span>
                <h2 className="mt-1 text-lg font-bold text-gray-900 tracking-tight line-clamp-1">{ticketTitle}</h2>
              </div>

              {!status || status === "waiting for confirm" ? (
                <div className="flex gap-2 shrink-0">
                  <Button
                    size="sm"
                    onClick={() => handleAction(_id, "pay")}
                    className="bg-emerald-500 text-white font-bold text-xs px-3 h-7 rounded-md shadow-sm hover:bg-emerald-600"
                  >
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleAction(_id, "rejected")}
                    className="bg-red-500 text-white font-bold text-xs px-3 h-7 rounded-md shadow-sm hover:bg-red-600"
                  >
                    Reject
                  </Button>
                </div>
              ) : (
                <span className={`rounded-md border px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider shrink-0 ${
                  status === "pay" ? "bg-blue-50 border-blue-200 text-blue-600" : "bg-red-50 border-red-200 text-red-600"
                }`}>
                  {status === "pay" ? "pay" : "reject"}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 rounded-xl bg-gray-50 p-3 text-xs text-gray-600 border border-gray-100/60">
              <div>
                <p className="text-[10px] font-bold uppercase text-gray-400">Customer</p>
                <p className="font-bold text-gray-800 mt-0.5">{userName || "User"}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-gray-400">Email</p>
                <p className="font-semibold text-gray-700 mt-0.5">{userEmail || "N/A"}</p>
              </div>
            </div>

            <div className="flex justify-between text-xs font-semibold text-gray-500 px-0.5">
              <span>🕒 Departure: {fmtDate(departureDateTime)}</span>
              <span className="text-gray-400 font-medium">Booked: {fmtDate(bookedAt)}</span>
            </div>

            <div className="flex justify-between border-t border-dashed border-gray-100 pt-3 items-end">
              <div>
                <p className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Seats</p>
                <p className="text-sm font-black text-gray-800 mt-0.5">{seatsBooked}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Revenue</p>
                <p className="text-lg font-black text-emerald-500 mt-0.5">৳ {totalPrice}</p>
              </div>
            </div>

          </Card>
        ))}
      </div>
    </div>
  );
}