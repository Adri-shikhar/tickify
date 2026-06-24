"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAdvertisedTickets } from "@/actions/tickets";
import AdvertTicketCard from "@/Components/AdvertTicketCard";

export default function AdvertisementSection() {
  const router = useRouter();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAdvertisedTickets().then((result) => {
      if (result.error) setError(result.error);
      else setTickets(result.tickets || []);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading featured tickets...</p>;
  }

  if (error) {
    return (
      <p className="rounded-xl border border-red-100 bg-red-50 p-4 text-center text-sm text-red-500">
        {error}
      </p>
    );
  }

  if (tickets.length === 0) {
    return (
      <p className="text-center text-gray-500">No featured tickets right now.</p>
    );
  }

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
