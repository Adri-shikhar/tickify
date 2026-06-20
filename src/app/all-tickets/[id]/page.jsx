"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PublicNavbar from "@/Components/Navbar/navbar";
import Image from "@/Components/Image";
import { useSession } from "@/lib/auth-client";
import { bookTicket } from "@/actions/booked";
import { getTicket } from "@/actions/tickets";
import { Card, Button } from "@heroui/react";

export default function BookTicketPage() {
  const { id } = useParams();
  const { data: session } = useSession();
  const router = useRouter();

  const [ticket, setTicket] = useState(null);
  const [seats, setSeats] = useState(1); // Track seats for real-time calculation
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    getTicket(id).then((res) => {
      if (res.error) setError(res.error);
      else setTicket(res.ticket);
    });
  }, [id]);

  useEffect(() => {
    if (!ticket?.departureDateTime) return;

    const interval = setInterval(() => {
      const timeDiff = new Date(ticket.departureDateTime).getTime() - new Date().getTime();
      
      if (timeDiff <= 0) {
        setCountdown("0d 0h 0m 0s");
        clearInterval(interval);
        return;
      }

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [ticket?.departureDateTime]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!session?.user) {
      setError("Please sign in first.");
      return;
    }

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

  const activePerks = ticket?.perks
    ? Object.keys(ticket.perks).filter((key) => ticket.perks[key])
    : [];

  const formattedDate = ticket?.departureDateTime
    ? new Date(ticket.departureDateTime).toLocaleString("en-BD", { dateStyle: "medium", timeStyle: "short" })
    : "TBA";

  return (
    <>
      <PublicNavbar />

      <div className="flex min-h-[85vh] items-center justify-center bg-gray-50/50 p-4 md:p-8">
        <Card className="w-full max-w-4xl rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-md transform-gpu backface-hidden">
          <Card.Content>
            
            {error && (
              <p className="rounded-lg border border-red-100 bg-red-50 py-2.5 px-4 text-center text-xs font-semibold text-red-500 mb-6">
                {error}
              </p>
            )}

            {!ticket && !error && (
              <p className="text-center text-sm font-medium text-gray-400 animate-pulse py-12">Loading trip configurations...</p>
            )}

            {ticket && (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
                
                {/* Left Side Image */}
                <div className="md:col-span-6 relative h-56 md:h-auto min-h-[280px] w-full overflow-hidden rounded-xl bg-gray-50 border border-gray-100">
                  <Image
                    src={ticket.imageUrl}
                    alt={ticket.title}
                    fill
                    className="object-cover"
                    sizes="(max-w-7xl) 50vw, 100vw"
                    fallbackClassName="h-full w-full rounded-xl text-gray-400"
                  />
                </div>

                {/* Right Side Content */}
                <div className="md:col-span-6 flex flex-col justify-between gap-4">
                  
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h1 className="text-2xl font-black text-gray-900 tracking-tight leading-tight">
                        {ticket.title}
                      </h1>
                      <p className="font-bold text-gray-700 text-sm mt-1.5 flex items-center gap-2">
                        <span>{ticket.from}</span>
                        <span className="text-emerald-500 text-base">➔</span>
                        <span>{ticket.to}</span>
                      </p>
                    </div>
                    <span className="rounded-full bg-blue-500 px-3.5 py-1 text-xs font-bold capitalize text-white tracking-wide shadow-sm shrink-0">
                      {ticket.transportType || "Bus"}
                    </span>
                  </div>

                  {/* Countdown */}
                  {ticket.departureDateTime && (
                    <div className="bg-gray-50/60 rounded-xl p-3 border border-gray-100/70 inline-block w-full">
                      <p className="text-[11px] font-bold text-gray-400 tracking-wide uppercase">Departure Countdown</p>
                      <p className="text-xl font-black text-emerald-500 tracking-tight mt-0.5">
                        {countdown || "Calculating..."}
                      </p>
                    </div>
                  )}

                  {/* Pricing Matrix */}
                  <div className="grid grid-cols-2 gap-4 border-y border-gray-100 py-3 text-sm">
                    <div>
                      <span className="text-gray-500 font-medium">Price:</span>
                      <span className="font-black text-gray-900 ml-1">৳{ticket.price}</span>
                    </div>
                    <div className="text-right md:text-left">
                      <span className="text-gray-500 font-medium">Available:</span>
                      <span className="font-black text-gray-900 ml-1">{ticket.quantity}</span>
                    </div>
                  </div>

                  {/* Departure Log */}
                  <div className="text-xs font-semibold text-gray-600">
                    <span className="text-gray-400 font-bold">Departure Date:</span> {formattedDate}
                  </div>

                  {/* Perks List */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold text-gray-800 tracking-wide">Included Perks:</span>
                    {activePerks.length > 0 ? (
                      <ul className="list-disc list-inside space-y-1 text-xs font-bold text-gray-600 pl-1">
                        {activePerks.map((perk) => (
                          <li key={perk} className="capitalize">
                            {perk.replace(/([A-Z])/g, " $1")}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-xs italic text-gray-400">No extra perks specified</span>
                    )}
                  </div>

                  {/* Dynamic Total Cost Display Box */}
                  <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-3 flex items-center justify-between text-sm mt-1">
                    <span className="font-bold text-gray-700">Total Calculated Cost:</span>
                    <span className="text-xl font-black text-emerald-600">৳ {ticket.price * seats}</span>
                  </div>

                  {/* Input and Submission Section */}
                  <div className="pt-2 flex flex-col sm:flex-row items-end sm:items-center justify-between gap-4">
                    <div className="flex flex-col gap-1 w-full sm:w-32">
                      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Seats</label>
                      <input
                        name="seats"
                        type="number"
                        min="1"
                        max={ticket.quantity}
                        value={seats}
                        onChange={(e) => setSeats(Math.max(1, Math.min(ticket.quantity, Number(e.target.value))))}
                        required
                        className="h-10 w-full rounded-lg bg-gray-100 px-3 text-sm font-bold text-gray-800 outline-none transition-colors focus:bg-gray-200/50 border border-transparent"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="h-10 w-full sm:flex-1 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-600 font-black text-sm text-gray-950 shadow-md transition-all active:scale-[0.98]"
                    >
                      {loading ? "Booking..." : "Book Now"}
                    </Button>
                  </div>

                </div>
              </form>
            )}
          </Card.Content>
        </Card>
      </div>
    </>
  );
}