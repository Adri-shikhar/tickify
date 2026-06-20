"use client";

// My Added Tickets page (route: /dashboard/vendor/my-tickets)
import { useSession } from "@/lib/auth-client";
import { getTickets } from "@/actions/tickets";
import { useSessionData } from "@/lib/useSessionData";
import TicketCard from "@/Components/TicketCard";
import { Button } from "@heroui/react";

// Colour classes for each possible ticket status
const statusStyle = {
  approved: "bg-emerald-50 border-emerald-200 text-emerald-600",
  accepted: "bg-emerald-50 border-emerald-200 text-emerald-600",
  rejected: "bg-red-50 border-red-200 text-red-600",
};

export default function MyTicketsPage() {
  const { data: session } = useSession();
  const { data: tickets, error, loading } = useSessionData(session?.user?.id, getTickets, "tickets");

  return (
    <div className="p-8">
      <h1 className="mb-8 text-2xl font-black text-gray-900">
        My Tickets <span className="text-emerald-500">({tickets.length})</span>
      </h1>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="rounded-xl border border-red-100 bg-red-50 p-3 text-red-500">{error}</p>}
      {!loading && !error && !tickets.length && <p className="text-gray-500">No tickets yet. Add your first ticket!</p>}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tickets.map((ticket) => (
          <TicketCard
            key={String(ticket._id)}
            ticket={ticket}
            showEmail
            footer={
              <div className="flex items-center justify-between gap-4">
                {/* Update and Delete buttons — not yet functional */}
                <Button size="sm" className="h-8 rounded-lg bg-gradient-to-r from-teal-500 to-blue-600 text-xs font-bold text-white">Update</Button>
                <div className="flex items-center gap-2">
                  <span className={`rounded-md border px-2.5 py-0.5 text-[10px] font-black uppercase ${statusStyle[ticket.status?.toLowerCase()] ?? "bg-amber-50 border-amber-200 text-amber-600"}`}>
                    {ticket.status || "pending"}
                  </span>
                  <Button size="sm" variant="bordered" className="h-8 text-xs font-bold">Delete</Button>
                </div>
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
}
