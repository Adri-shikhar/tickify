"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getLatestTickets } from "@/actions/tickets";
import TicketCard from "@/Components/TicketCard";

export default function LatestTicketsSection() {
  const router = useRouter();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLatestTickets().then((result) => {
      if (!result.error) setTickets(result.tickets || []);
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="text-gray-500">Loading latest tickets...</p>;
  if (tickets.length === 0) return <p className="text-gray-500">No tickets available yet.</p>;

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
