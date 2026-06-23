"use client";

// Book Ticket page (route: /all-tickets/[id]) — shows ticket details and a seat booking form
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "@/Components/Image";
import { useSession } from "@/lib/auth-client";
import { bookTicket } from "@/actions/booked";
import { getTicket } from "@/actions/tickets";
import { fmtDate } from "@/lib/format";
import { Card, Button } from "@heroui/react";

export default function BookTicketPage() {
  const { id } = useParams();
  const { data: session } = useSession();
  const router = useRouter();

  const [ticket, setTicket] = useState(null);
  const [seats, setSeats] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTicket(id).then(({ error, ticket }) => {
      if (error) setError(error);
      else setTicket(ticket);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session?.user) { setError("Please sign in before booking."); return; }

    setLoading(true);
    const result = await bookTicket({
      ticket_id: id,
      user_id: session.user.id,
      userName: session.user.name,
      userEmail: session.user.email,
      seatsBooked: seats,
    });
    setLoading(false);

    if (result.error) setError(result.error);
    else router.push("/dashboard/user/my-booked-tickets");
  };

  // List only the enabled perks
  const perks = ticket?.perks ? Object.keys(ticket.perks).filter((k) => ticket.perks[k]) : [];

  return (
    <div className="flex min-h-[70vh] items-center justify-center p-4 md:p-8">
        <Card className="w-full max-w-4xl rounded-2xl border p-6 shadow-md md:p-8">
          <Card.Content>
            {error && <p className="mb-6 rounded-lg border border-red-100 bg-red-50 p-3 text-sm text-red-500">{error}</p>}
            {!ticket && !error && <p className="animate-pulse py-12 text-center text-gray-400">Loading...</p>}

            {ticket && (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="relative h-56 overflow-hidden rounded-xl border bg-gray-50 md:h-80">
                  <Image src={ticket.imageUrl} alt={ticket.title} fill className="object-cover" fallbackClassName="h-full w-full" />
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex justify-between gap-4">
                    <div>
                      <h1 className="text-2xl font-black text-gray-900">{ticket.title}</h1>
                      <p className="mt-1 text-sm font-bold text-gray-700">{ticket.from} ➔ {ticket.to}</p>
                    </div>
                    <span className="rounded-full bg-blue-500 px-3 py-1 text-xs font-bold text-white capitalize">
                      {ticket.transportType || "Bus"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-y border-gray-100 py-3 text-sm">
                    <div><span className="text-gray-500">Price:</span> <span className="font-black">৳{ticket.price}</span></div>
                    <div><span className="text-gray-500">Available:</span> <span className="font-black">{ticket.quantity}</span></div>
                  </div>

                  <p className="text-xs text-gray-600">
                    <span className="font-bold text-gray-400">Departure:</span> {fmtDate(ticket.departureDateTime)}
                  </p>

                  <div className="text-xs">
                    <span className="font-bold">Perks:</span>{" "}
                    {perks.length ? perks.map((p) => p.replace(/([A-Z])/g, " $1")).join(", ") : "None"}
                  </div>

                  {/* Live total price */}
                  <div className="flex justify-between rounded-xl border border-emerald-100 bg-emerald-50 p-3 text-sm">
                    <span className="font-bold">Total:</span>
                    <span className="text-xl font-black text-emerald-600">৳ {ticket.price * seats}</span>
                  </div>

                  <div className="flex items-end gap-4">
                    <div className="flex w-24 flex-col gap-1">
                      <label className="text-[11px] font-bold uppercase text-gray-500">Seats</label>
                      <input
                        type="number"
                        min="1"
                        max={ticket.quantity}
                        value={seats}
                        onChange={(e) => setSeats(Math.max(1, Math.min(ticket.quantity, Number(e.target.value))))}
                        className="h-10 rounded-lg bg-gray-100 px-3 text-sm font-bold"
                        required
                      />
                    </div>
                    <Button type="submit" disabled={loading} className="h-10 flex-1 rounded-xl bg-gradient-to-r from-emerald-400 to-blue-600 text-sm font-black">
                      {loading ? "Booking..." : "Book Now"}
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </Card.Content>
        </Card>
    </div>
  );
}
