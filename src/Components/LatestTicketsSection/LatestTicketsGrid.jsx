"use client";

import { useRouter } from "next/navigation";
import TicketCard from "@/Components/TicketCard";

export default function LatestTicketsGrid({ tickets }) {
  const router = useRouter();

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
