"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAdvertisedTickets } from "@/actions/tickets";
import AdvertTicketCard from "@/Components/AdvertTicketCard";

export default function AdvertisementSection() {
  const router = useRouter();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdvertisedTickets().then((result) => {
      if (!result.error) setTickets(result.tickets || []);
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="text-gray-500">Loading featured tickets...</p>;
  if (tickets.length === 0) return <p className="text-gray-500">No featured tickets right now.</p>;

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {tickets.map((ticket) => (
        <AdvertTicketCard
          key={String(ticket._id)}
          ticket={ticket}
          onSeeDetails={() => router.push(`/all-tickets/${ticket._id}`)}
        />
      ))}
    </div>
  );
}
