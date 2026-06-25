"use client";

import { useState } from "react";
import { updateBookingStatus } from "@/actions/booked";
import { fmtDate } from "@/lib/format";
import { Card, Button } from "@heroui/react";

export default function VendorBookingsList({ initialBookings }) {
  const [bookings, setBookings] = useState(initialBookings);

  const handleAction = async (id, nextStatus) => {
    const res = await updateBookingStatus(id, nextStatus);
    if (!res.error) {
      setBookings((prev) => prev.map((b) => (b._id === id ? { ...b, status: nextStatus } : b)));
    }
  };

  if (!bookings.length) {
    return (
      <p className="rounded-2xl border bg-white py-12 text-center text-sm font-medium text-gray-400 shadow-sm">
        No bookings yet.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {bookings.map(({ _id, ticketTitle, departureDateTime, bookedAt, seatsBooked, totalPrice, userName, userEmail, status }) => (
        <Card
          key={String(_id)}
          className="backface-hidden flex transform-gpu flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-md"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="rounded border border-cyan-100 bg-cyan-50 px-2 py-0.5 text-[10px] font-bold uppercase text-cyan-600">
                Order
              </span>
              <h2 className="mt-1 line-clamp-1 text-lg font-bold tracking-tight text-gray-900">{ticketTitle}</h2>
            </div>

            {!status || status === "pending" || status === "waiting for confirm" ? (
              <div className="flex shrink-0 gap-2">
                <Button
                  size="sm"
                  onClick={() => handleAction(_id, "accepted")}
                  className="h-7 rounded-md bg-emerald-500 px-3 text-xs font-bold text-white shadow-sm hover:bg-emerald-600"
                >
                  Accept
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleAction(_id, "rejected")}
                  className="h-7 rounded-md bg-red-500 px-3 text-xs font-bold text-white shadow-sm hover:bg-red-600"
                >
                  Reject
                </Button>
              </div>
            ) : (
              <span
                className={`shrink-0 rounded-md border px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${
                  status === "accepted" || status === "pay"
                    ? "border-blue-200 bg-blue-50 text-blue-600"
                    : "border-red-200 bg-red-50 text-red-600"
                }`}
              >
                {status === "accepted" || status === "pay" ? "accepted" : "rejected"}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 rounded-xl border border-gray-100/60 bg-gray-50 p-3 text-xs text-gray-600">
            <div>
              <p className="text-[10px] font-bold uppercase text-gray-400">Customer</p>
              <p className="mt-0.5 font-bold text-gray-800">{userName || "User"}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase text-gray-400">Email</p>
              <p className="mt-0.5 font-semibold text-gray-700">{userEmail || "N/A"}</p>
            </div>
          </div>

          <div className="flex justify-between px-0.5 text-xs font-semibold text-gray-500">
            <span>🕒 Departure: {fmtDate(departureDateTime)}</span>
            <span className="font-medium text-gray-400">Booked: {fmtDate(bookedAt)}</span>
          </div>

          <div className="flex items-end justify-between border-t border-dashed border-gray-100 pt-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Seats</p>
              <p className="mt-0.5 text-sm font-black text-gray-800">{seatsBooked}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Revenue</p>
              <p className="mt-0.5 text-lg font-black text-emerald-500">৳ {totalPrice}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
