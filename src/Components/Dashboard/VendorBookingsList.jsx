"use client";

import { useState } from "react";
import { updateBookingStatus } from "@/actions/booked";
import { fmtDate, fmtPrice } from "@/lib/format";
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
      <p className="rounded-card border border-default bg-surface py-12 text-center text-sm font-medium text-muted shadow-card">
        No bookings yet.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {bookings.map(({ _id, ticketTitle, departureDateTime, bookedAt, seatsBooked, totalPrice, userName, userEmail, status }) => (
        <Card
          key={String(_id)}
          className="backface-hidden flex transform-gpu flex-col gap-4 rounded-card border border-subtle bg-surface p-5 shadow-card"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="rounded border border-accent/30 bg-accent-soft px-2 py-0.5 text-micro font-bold uppercase text-accent-soft-fg">
                Order
              </span>
              <h2 className="mt-1 line-clamp-1 text-lg font-bold tracking-tight text-heading">{ticketTitle}</h2>
            </div>

            {!status || status === "pending" || status === "waiting for confirm" ? (
              <div className="flex shrink-0 gap-2">
                <Button
                  size="sm"
                  onClick={() => handleAction(_id, "accepted")}
                  className="h-7 rounded-md bg-success px-3 text-xs font-bold text-on-accent shadow-card hover:bg-success/90"
                >
                  Accept
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleAction(_id, "rejected")}
                  className="h-7 rounded-md bg-danger px-3 text-xs font-bold text-on-accent shadow-card hover:bg-danger/90"
                >
                  Reject
                </Button>
              </div>
            ) : (
              <span
                className={`shrink-0 rounded-md border px-2.5 py-0.5 text-micro font-semibold uppercase ${
                  status === "accepted" || status === "pay"
                    ? "border-info/30 bg-info-soft text-info-soft-fg"
                    : "border-danger/30 bg-danger-soft text-danger-soft-fg"
                }`}
              >
                {status === "accepted" || status === "pay" ? "accepted" : "rejected"}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 rounded-card border border-subtle bg-sunken p-3 text-xs text-body">
            <div>
              <p className="text-micro font-bold uppercase text-muted">Customer</p>
              <p className="mt-0.5 font-bold text-heading">{userName || "User"}</p>
            </div>
            <div>
              <p className="text-micro font-bold uppercase text-muted">Email</p>
              <p className="mt-0.5 font-semibold text-label">{userEmail || "N/A"}</p>
            </div>
          </div>

          <div className="flex justify-between px-0.5 text-xs font-semibold text-body">
            <span>🕒 Departure: {fmtDate(departureDateTime)}</span>
            <span className="font-medium text-muted">Booked: {fmtDate(bookedAt)}</span>
          </div>

          <div className="flex items-end justify-between border-t border-dashed border-subtle pt-3">
            <div>
              <p className="text-micro font-bold uppercase text-muted">Seats</p>
              <p className="mt-0.5 text-sm font-black text-heading">{seatsBooked}</p>
            </div>
            <div className="text-right">
              <p className="text-micro font-bold uppercase text-muted">Revenue</p>
              <p className="mt-0.5 text-lg font-black text-success">{fmtPrice(totalPrice)}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
