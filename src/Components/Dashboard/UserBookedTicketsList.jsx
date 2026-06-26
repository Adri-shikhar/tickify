"use client";

import Link from "next/link";
import { fmtDate, fmtPrice } from "@/lib/format";
import { Card, Button } from "@heroui/react";
import Countdown from "react-countdown";

function getStatusBadge(status) {
  if (status === "paid") return { text: "Paid", cls: "bg-emerald-50 border-emerald-200 text-emerald-600" };
  if (status === "accepted" || status === "pay") return { text: "Accepted", cls: "bg-blue-50 border-blue-200 text-blue-600" };
  if (status === "rejected") return { text: "Rejected", cls: "bg-red-50 border-red-200 text-red-600" };
  return { text: "Pending", cls: "bg-amber-50 border-amber-200 text-amber-600" };
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
      <p className="rounded-2xl border bg-white py-12 text-center text-sm font-medium text-gray-400 shadow-sm">
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
            className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="line-clamp-1 text-lg font-bold tracking-tight text-gray-900">
                {booking.ticketTitle}
              </h2>
              <span
                className={`shrink-0 rounded-md border px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${badge.cls}`}
              >
                {badge.text}
              </span>
            </div>

            {showCountdown && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-center text-xs font-bold text-amber-800">
                Departure in <Countdown date={new Date(booking.departureDateTime)} />
              </div>
            )}

            <div className="flex justify-between rounded-xl border border-gray-100/60 bg-gray-50 p-3 text-xs font-semibold text-gray-600">
              <span>🕒 Departure: {fmtDate(booking.departureDateTime)}</span>
              <span className="font-medium text-gray-400">Booked: {fmtDate(booking.bookedAt)}</span>
            </div>

            <div className="flex items-end justify-between border-t border-dashed border-gray-100 pt-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Seats Secured</p>
                <p className="mt-0.5 text-sm font-black text-gray-800">{booking.seatsBooked}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Total Due</p>
                <p className="mt-0.5 text-lg font-black text-emerald-500">{fmtPrice(booking.totalPrice)}</p>
              </div>
            </div>

            {booking.status === "paid" && (
              <div className="border-t border-gray-100 pt-3">
                <Link
                  href={`/dashboard/user/download-ticket/${booking._id}`}
                  className="flex h-9 w-full items-center justify-center rounded-xl bg-emerald-600 text-xs font-bold text-white shadow-sm hover:bg-emerald-700"
                >
                  Download Ticket
                </Link>
              </div>
            )}

            {canPay && (
              <div className="border-t border-gray-100 pt-3">
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
                    className="h-9 w-full rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-xs font-bold text-white shadow-sm"
                  >
                    💳 Pay Now ({fmtPrice(booking.totalPrice)})
                  </Button>
                </form>
              </div>
            )}

            {isAccepted(booking.status) && departed && (
              <p className="border-t border-gray-100 pt-3 text-center text-xs font-semibold text-red-500">
                Payment closed — departure has passed.
              </p>
            )}
          </Card>
        );
      })}
    </div>
  );
}
