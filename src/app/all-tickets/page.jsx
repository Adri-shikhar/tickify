"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PublicNavbar from "@/Components/Navbar/navbar";
import TicketCard from "@/Components/TicketCard";
import { getTickets } from "@/actions/tickets";

function isApproved(ticket) {
  const status = ticket.status?.toLowerCase();
  return status === "approved" || status === "accepted";
}

export default function AllTicketsPage() {
  const router = useRouter();
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTickets() {
      const result = await getTickets();

      if (result.error) {
        setError(result.error);
      } else {
        setTickets((result.tickets ?? []).filter(isApproved));
      }

      setLoading(false);
    }

    loadTickets();
  }, []);

  return (
    <>
      <PublicNavbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <h1 className="mb-8 text-2xl font-black tracking-tight text-gray-900">
          Available Tickets{" "}
          <span className="font-extrabold text-emerald-500">
            ({loading ? 0 : tickets.length})
          </span>
        </h1>

        {loading && <p className="font-medium text-gray-500">Loading tickets...</p>}

        {error && (
          <p className="max-w-md rounded-xl border border-red-100 bg-red-50 p-3 text-red-500">
            {error}
          </p>
        )}

        {!loading && !error && tickets.length === 0 && (
          <p className="font-medium text-gray-500">No tickets available right now.</p>
        )}

        {!loading && tickets.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tickets.map((ticket) => (
              <TicketCard
                key={String(ticket._id)}
                ticket={ticket}
                showEmail
                onBook={() => router.push(`/all-tickets/${String(ticket._id)}`)}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
