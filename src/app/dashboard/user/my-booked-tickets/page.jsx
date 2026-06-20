"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { getUserBookings } from "@/actions/booked";
import { Card } from "@heroui/react";

export default function MyBookedTicketsPage() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.id) return;

    getUserBookings(session.user.id).then((result) => {
      if (result.error) {
        setError(result.error);
      } else {
        setBookings(result.bookings ?? []);
      }
      setLoading(false);
    });
  }, [session?.user?.id]);

  const formatDate = (value) => {
    return value
      ? new Date(value).toLocaleString("en-BD", { dateStyle: "medium", timeStyle: "short" })
      : "TBA";
  };

  return (
    <div className="p-6 md:p-8 bg-gray-50/50 min-h-screen isolate">
      {/* Header Section */}
      <div className="mb-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">
          My Booked Tickets <span className="text-emerald-500">({bookings.length})</span>
        </h1>
        <p className="text-gray-500 text-sm mt-1">Review your active trips and confirmed purchases.</p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Dynamic State Feedbacks */}
        {loading && (
          <p className="text-gray-500 text-sm font-medium animate-pulse">Loading reservations...</p>
        )}

        {error && (
          <p className="max-w-md rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-500 font-medium">
            {error}
          </p>
        )}

        {!loading && !error && bookings.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-md mx-auto">
            <span className="text-3xl">🎫</span>
            <p className="text-gray-500 text-sm font-bold mt-3">No tickets booked yet</p>
            <p className="text-gray-400 text-xs mt-1">Your confirmed trip receipts will show up here.</p>
          </div>
        )}

        {/* FIXED: Swapped CSS Grid container for a clean vertical Flexbox column layout */}
        <div className="flex flex-col gap-4">
          {bookings.map((booking) => (
            <Card
              key={booking._id}
              className="w-full bg-white shadow-md rounded-2xl border border-gray-100 overflow-hidden flex flex-col justify-between transform-gpu backface-hidden"
            >
              <Card.Content className="p-5 flex flex-col gap-4">
                
                {/* Header Title & Status Badge Row */}
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-lg font-bold text-gray-900 tracking-tight line-clamp-1 leading-snug">
                    {booking.ticketTitle}
                  </h2>
                  <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-black tracking-wider text-emerald-600 uppercase shrink-0">
                    Confirmed
                  </span>
                </div>

                {/* Logistics Context Fields */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 bg-gray-50 p-3.5 rounded-xl border border-gray-100/70 text-xs font-semibold text-gray-600">
                  <div className="flex items-center gap-1.5 text-gray-800">
                    <span className="text-emerald-500">🕒</span>
                    <span>Departure: {formatDate(booking.departureDateTime)}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-medium">
                    <span>Booked on: {formatDate(booking.bookedAt)}</span>
                  </div>
                </div>

                {/* Seat Allocation and Invoice Calculations */}
                <div className="flex items-center justify-between pt-1 border-dashed border-t border-gray-100">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Seats Secured</span>
                    <span className="text-sm font-black text-gray-800 mt-0.5">
                      {booking.seatsBooked} {booking.seatsBooked === 1 ? "Seat" : "Seats"}
                    </span>
                  </div>
                  <div className="text-right flex flex-col">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Paid</span>
                    <span className="text-lg font-black text-emerald-500 mt-0.5">
                      ৳ {booking.totalPrice}
                    </span>
                  </div>
                </div>

              </Card.Content>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}