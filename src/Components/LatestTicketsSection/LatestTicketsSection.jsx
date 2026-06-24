"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getLatestTickets } from "@/actions/tickets";
import TicketCard from "@/Components/TicketCard";

export default function LatestTicketsSection() {
  const router = useRouter();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getLatestTickets().then((result) => {
      if (result.error) setError(result.error);
      else setTickets(result.tickets || []);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading latest tickets...</p>;
  }

  if (error) {
    return (
      <p className="rounded-xl border border-red-100 bg-red-50 p-4 text-center text-sm text-red-500">
        {error}
      </p>
    );
  }

  if (tickets.length === 0) {
    return <p className="text-center text-gray-500">No tickets available yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {tickets.map((ticket) => (
        <TicketCard
          key={String(ticket._id)}
          ticket={ticket}
          buttonText="See details"
          onBook={() => router.push(`/all-tickets/${ticket._id}`)}
        />
      ))}
    </div>
  );
}
