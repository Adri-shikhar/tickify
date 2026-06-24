"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "@/Components/Image";
import { useSession } from "@/lib/auth-client";
import { bookTicket } from "@/actions/booked";
import { fmtDate } from "@/lib/format";
import { Card, Button } from "@heroui/react";
import Countdown from "react-countdown";

function getPerksText(perks) {
  if (!perks) return "None";

  const activePerks = Object.keys(perks).filter((key) => perks[key] === true);
  return activePerks.length ? activePerks.join(", ") : "None";
}

export default function BookTicketPage({ initialTicket, ticketId }) {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [ticket] = useState(initialTicket);
  const [seats, setSeats] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!session?.user) {
      setError("Please sign in before booking.");
      return;
    }

    setLoading(true);

    const result = await bookTicket({
      ticket_id: ticketId,
      user_id: session.user.id,
      userName: session.user.name,
      userEmail: session.user.email,
      vendor_id: ticket.vendor_id,
      vendorName: ticket.vendorName,
      seatsBooked: seats,
    });

    setLoading(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    router.push("/dashboard/user/my-booked-tickets");
  }

  function handleSeatChange(event) {
    const value = Number(event.target.value);
    const safeSeats = Math.min(Math.max(value, 1), ticket.quantity);
    setSeats(safeSeats);
  }

  if (ticket === null) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-gray-500 font-bold">Ticket information could not be found.</p>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-400 border-t-transparent" />
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center p-4 md:p-8">
        <Card className="w-full max-w-4xl rounded-2xl border p-6 shadow-md md:p-8">
          <Card.Content className="flex flex-col items-center">
            <h1 className="text-center text-2xl font-bold text-gray-900">
              Please sign in to book this ticket.
            </h1>
            <Button onClick={() => router.push("/sign-in")} className="mt-4">
              Sign In
            </Button>
          </Card.Content>
        </Card>
      </div>
    );
  }

  if (session.user.role !== "user") {
    return (
      <div className="flex min-h-[70vh] items-center justify-center p-4 md:p-8">
        <Card className="w-full max-w-4xl rounded-2xl border p-6 shadow-md md:p-8">
          <Card.Content>
            <h1 className="text-2xl font-bold text-gray-900">
              You are not authorized to book this ticket.
            </h1>
            <Button onClick={() => router.push("/dashboard")} className="mt-4">
              Dashboard
            </Button>
          </Card.Content>
        </Card>
      </div>
    );
  }

  const perksText = getPerksText(ticket.perks);
  const totalPrice = ticket.price * seats;
  const soldOut = ticket.quantity <= 0;

  return (
    <div className="flex min-h-[70vh] items-center justify-center p-4 md:p-8">
      <Card className="w-full max-w-4xl rounded-2xl border p-6 shadow-md md:p-8">
        <Card.Content>
          {error && (
            <p className="mb-6 rounded-lg border border-red-100 bg-red-50 p-3 text-sm text-red-500">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="relative h-56 overflow-hidden rounded-xl border bg-gray-50 md:h-80">
              <Image
                src={ticket.imageUrl}
                alt={ticket.title}
                fill
                className="object-cover"
                fallbackClassName="h-full w-full"
              />
            </div>

            <div className="flex flex-col gap-4">
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-center text-sm font-bold text-amber-700">
                Time until departure:{" "}
                <span className="text-base font-black text-amber-900 ml-1">
                  <Countdown
                    date={new Date(ticket.departureDateTime)}
                    onComplete={() =>
                      setError("This trip has already departed. Booking is no longer available.")
                    }
                  />
                </span>
              </div>

              <div className="flex justify-between gap-4 items-start">
                <div>
                  <h1 className="text-2xl font-black text-gray-900">{ticket.title}</h1>
                  <p className="mt-1 text-sm font-bold text-gray-700">
                    {ticket.from} ➔ {ticket.to}
                  </p>
                </div>
                <span className="h-fit rounded-full bg-blue-500 px-3 py-1 text-xs font-bold text-white capitalize">
                  {ticket.transportType || "Bus"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 border-y border-gray-100 py-3 text-sm">
                <div>
                  <span className="text-gray-500">Price:</span>{" "}
                  <span className="font-black">৳{ticket.price}</span>
                </div>
                <div>
                  <span className="text-gray-500">Available:</span>{" "}
                  <span className="font-black">{ticket.quantity}</span>
                </div>
              </div>

              <p className="text-xs text-gray-600">
                <span className="font-bold text-gray-400">Departure:</span>{" "}
                {fmtDate(ticket.departureDateTime)}
              </p>

              <div className="text-xs">
                <span className="font-bold">Perks:</span> {perksText}
              </div>

              <div className="flex justify-between rounded-xl border border-emerald-100 bg-emerald-50 p-3 text-sm">
                <span className="font-bold">Total:</span>
                <span className="text-xl font-black text-emerald-600">৳ {totalPrice}</span>
              </div>

              <div className="flex items-end gap-4">
                <div className="flex w-24 flex-col gap-1">
                  <label className="text-[11px] font-bold uppercase text-gray-500">Seats</label>
                  <input
                    type="number"
                    min="1"
                    max={ticket.quantity}
                    value={seats}
                    onChange={handleSeatChange}
                    className="h-10 rounded-lg bg-gray-100 px-3 text-sm font-bold"
                    required
                  />
                </div>

                {soldOut ? (
                  <Button
                    disabled
                    className="h-10 flex-1 rounded-xl bg-gray-300 text-sm font-black text-gray-500"
                  >
                    Sold Out
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={loading || error !== ""}
                    className="h-10 flex-1 rounded-xl bg-gradient-to-r from-emerald-400 to-blue-600 text-sm font-black text-white"
                  >
                    {loading ? "Booking..." : "Book Now"}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Card.Content>
      </Card>
    </div>
  );
}
