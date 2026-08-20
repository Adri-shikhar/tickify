"use client";

import Link from "next/link";
import { fmtDate, fmtPrice } from "@/lib/format";
import { Card, Button } from "@heroui/react";
import Countdown from "react-countdown";

function getStatusBadge(status) {
  if (status === "paid") return { text: "Paid", cls: "bg-success-soft border-success/30 text-success-soft-fg" };
  if (status === "accepted" || status === "pay") return { text: "Accepted", cls: "bg-info-soft border-info/30 text-info-soft-fg" };
  if (status === "rejected") return { text: "Rejected", cls: "bg-danger-soft border-danger/30 text-danger-soft-fg" };
  return { text: "Pending", cls: "bg-warning-soft border-warning/30 text-warning-soft-fg" };
}

function isAccepted(status) {
  return status === "accepted" || status === "pay";
}

function isDeparted(departureDateTime) {
  return departureDateTime && new Date(departureDateTime) < new Date();
}

export default function UserBookedTicketsList({ bookings }) {
  if (!bookings.length) {
    return (
      <p className="rounded-card border border-default bg-surface py-12 text-center text-sm font-medium text-muted shadow-card">
        No tickets booked yet.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {bookings.map((booking) => {
        const badge = getStatusBadge(booking.status);
        const departed = isDeparted(booking.departureDateTime);
        const canPay = isAccepted(booking.status) && !departed;
        const showCountdown = booking.status !== "rejected" && !departed;

        return (
          <Card
            key={booking._id}
            className="flex flex-col gap-4 rounded-card border border-subtle bg-surface p-5 shadow-card"
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="line-clamp-1 text-lg font-bold tracking-tight text-heading">
                {booking.ticketTitle}
              </h2>
              <span
                className={`shrink-0 rounded-md border px-2.5 py-0.5 text-micro font-semibold uppercase ${badge.cls}`}
              >
                {badge.text}
              </span>
            </div>

            {showCountdown && (
              <div className="rounded-card border border-warning/30 bg-warning-soft px-3 py-2 text-center text-xs font-bold tabular-nums text-warning-soft-fg">
                Departure in <Countdown date={new Date(booking.departureDateTime)} />
              </div>
            )}

            <div className="flex justify-between rounded-card border border-subtle bg-sunken p-3 text-xs font-semibold text-body">
              <span>🕒 Departure: {fmtDate(booking.departureDateTime)}</span>
              <span className="font-medium text-muted">Booked: {fmtDate(booking.bookedAt)}</span>
            </div>

            <div className="flex items-end justify-between border-t border-dashed border-subtle pt-3">
              <div>
                <p className="text-micro font-bold uppercase text-muted">Seats Secured</p>
                <p className="mt-0.5 text-sm font-black text-heading">{booking.seatsBooked}</p>
              </div>
              <div className="text-right">
                <p className="text-micro font-bold uppercase text-muted">Total Due</p>
                <p className="mt-0.5 text-lg font-black text-success">{fmtPrice(booking.totalPrice)}</p>
              </div>
            </div>

            {booking.status === "paid" && (
              <div className="border-t border-subtle pt-3">
                <Link
                  href={`/dashboard/user/download-ticket/${booking._id}`}
                  className="flex h-9 w-full items-center justify-center rounded-card bg-success text-xs font-bold text-on-accent shadow-card hover:bg-success/90"
                >
                  Download Ticket
                </Link>
              </div>
            )}

            {canPay && (
              <div className="border-t border-subtle pt-3">
                <form
                  action="/api/payment"
                  method="POST"
                  onSubmit={(e) => {
                    e.currentTarget.paidAt.value = new Date().toISOString();
                  }}
                >
                  <input type="hidden" name="bookingId" value={String(booking._id)} />
                  <input type="hidden" name="totalPrice" value={booking.totalPrice} />
                  <input type="hidden" name="paidAt" defaultValue="" />
                  <Button
                    type="submit"
                    className="h-9 w-full rounded-card bg-gradient-to-r from-blue-500 to-indigo-600 text-xs font-bold text-white shadow-card"
                  >
                    💳 Pay Now ({fmtPrice(booking.totalPrice)})
                  </Button>
                </form>
              </div>
            )}

            {isAccepted(booking.status) && departed && (
              <p className="border-t border-subtle pt-3 text-center text-xs font-semibold text-danger">
                Payment closed — departure has passed.
              </p>
            )}
          </Card>
        );
      })}
    </div>
  );
}
