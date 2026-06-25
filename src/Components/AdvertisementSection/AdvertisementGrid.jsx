"use client";

import { useRouter } from "next/navigation";
import AdvertTicketCard from "@/Components/AdvertTicketCard";

export default function AdvertisementGrid({ tickets }) {
  const router = useRouter();

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
