"use client";

import { useState } from "react";
import { Card, Button } from "@heroui/react";
import { updateTicketStatus } from "@/actions/tickets";
import { fmtDate, fmtPrice } from "@/lib/format";

export default function AdminTicketList({ initialTickets = [] }) {
  const [tickets, setTickets] = useState(initialTickets);

  async function acceptTicket(id) {
    console.log("Accepting ticket", id);
    const result = await updateTicketStatus(id, "accepted");
    if (!result.error) {
      setTickets(tickets.map((t) => (t._id === id ? { ...t, status: "accepted" } : t)));
      console.log("Ticket accepted");
    }
  }

  async function rejectTicket(id) {
    const result = await updateTicketStatus(id, "rejected");
    if (!result.error) {
      setTickets(tickets.map((t) => (t._id === id ? { ...t, status: "rejected" } : t)));
      console.log("Ticket rejected");
    }
  }

  if (tickets.length === 0) {
    return <p className="py-12 text-center text-sm text-gray-400">No tickets yet.</p>;
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-4">
      {tickets.map((ticket) => (
        <Card
          key={ticket._id}
          className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-md"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">{ticket.title}</h2>
              <p className="mt-1 text-xs font-bold uppercase text-amber-600">{ticket.status || "pending"}</p>
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => acceptTicket(ticket._id)}
                className="bg-emerald-500 text-xs font-bold text-white"
              >
                Accept
              </Button>
              <Button
                size="sm"
                onClick={() => rejectTicket(ticket._id)}
                className="bg-red-500 text-xs font-bold text-white"
              >
                Reject
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 rounded-xl bg-gray-50 p-3 text-xs">
            <div>
              <p className="text-[10px] font-bold uppercase text-gray-400">Vendor</p>
              <p className="font-bold text-gray-800">{ticket.vendorName || "vendor"}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase text-gray-400">Email</p>
              <p className="text-gray-700">{ticket.vendorEmail || "N/A"}</p>
            </div>
          </div>

          <p className="text-xs text-gray-500">
            {ticket.from} ➔ {ticket.to} · {ticket.transportType} · {fmtDate(ticket.departureDateTime)}
          </p>

          <div className="flex justify-between border-t border-dashed border-gray-100 pt-3 text-sm">
            <span>
              Seats: <strong>{ticket.quantity}</strong>
            </span>
            <span className="font-bold text-emerald-500">{fmtPrice(ticket.price)}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}
