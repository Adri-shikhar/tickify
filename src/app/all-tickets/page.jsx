"use client";

// All Tickets page (route: /all-tickets) — shows all approved tickets
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MainLayout from "@/Components/Layout/MainLayout";
import TicketCard from "@/Components/TicketCard";
import { getTickets } from "@/actions/tickets";

const isApproved = (t) => ["approved", "accepted"].includes(t.status?.toLowerCase());

export default function AllTicketsPage() {
  const router = useRouter();
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTickets().then(({ error, tickets }) => {
      if (error) setError(error);
      else setTickets((tickets ?? []).filter(isApproved));
      setLoading(false);
    });
  }, []);

  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <h1 className="mb-8 text-2xl font-black text-gray-900">
          Available Tickets <span className="text-emerald-500">({loading ? 0 : tickets.length})</span>
        </h1>

        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="rounded-xl border border-red-100 bg-red-50 p-3 text-red-500">{error}</p>}
        {!loading && !error && !tickets.length && <p className="text-gray-500">No tickets available right now.</p>}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tickets.map((ticket) => (
            <TicketCard
              key={String(ticket._id)}
              ticket={ticket}
              showEmail
              onBook={() => router.push(`/all-tickets/${ticket._id}`)}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
