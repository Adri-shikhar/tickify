"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { getTickets } from "@/actions/tickets";
import TicketCard from "@/Components/TicketCard";
import { Button } from "@heroui/react";

function getStatusStyles(status) {
  const value = status?.toLowerCase();

  if (value === "approved" || value === "accepted") {
    return "bg-emerald-50 border-emerald-200 text-emerald-600";
  }

  if (value === "rejected") {
    return "bg-red-50 border-red-200 text-red-600";
  }

  return "bg-amber-50 border-amber-200 text-amber-600";
}

export default function MyTicketsPage() {
  const { data: session } = useSession();
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!session?.user?.id) return;

    getTickets(session.user.id).then((result) => {
      if (result.error) setError(result.error);
      else setTickets(result.tickets ?? []);
    });
  }, [session?.user?.id]);

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-900">Total (0) Tickets Added</h1>
        <p className="mt-4 max-w-md rounded-xl border border-red-100 bg-red-50 p-3 text-red-500">
          {error}
        </p>
      </div>
    );
  }

  if (!tickets.length) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-900">Total (0) Tickets Added</h1>
        <p className="mt-4 font-medium text-gray-500">No tickets found yet.</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="mb-8 text-2xl font-black tracking-tight text-gray-900">
        Total <span className="font-extrabold text-emerald-500">({tickets.length})</span> Tickets
        Added
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tickets.map((ticket) => (
          <TicketCard
            key={String(ticket._id)}
            ticket={ticket}
            showEmail
            footer={
              <div className="flex items-center justify-between gap-4">
                <Button
                  size="sm"
                  className="h-8 rounded-lg bg-gradient-to-r from-teal-500 to-blue-600 px-4 text-xs font-bold text-white shadow-sm"
                >
                  Update
                </Button>

                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-md border px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${getStatusStyles(ticket.status)}`}
                  >
                    {ticket.status || "pending"}
                  </span>

                  <Button
                    size="sm"
                    variant="bordered"
                    className="h-8 rounded-lg border border-gray-300 bg-white px-4 text-xs font-bold text-gray-700"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
}
