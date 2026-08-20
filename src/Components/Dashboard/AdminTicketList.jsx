"use client";

import { useState } from "react";
import { Card, Button } from "@heroui/react";
import { updateTicketStatus } from "@/actions/tickets";
import { fmtDate, fmtPrice } from "@/lib/format";
import StatusBadge from "@/Components/ui/StatusBadge";

export default function AdminTicketList({ initialTickets = [] }) {
  const [tickets, setTickets] = useState(initialTickets);

  async function acceptTicket(id) {
    const result = await updateTicketStatus(id, "accepted");
    if (!result.error) {
      setTickets(tickets.map((t) => (t._id === id ? { ...t, status: "accepted" } : t)));
    }
  }

  async function rejectTicket(id) {
    const result = await updateTicketStatus(id, "rejected");
    if (!result.error) {
      setTickets(tickets.map((t) => (t._id === id ? { ...t, status: "rejected" } : t)));
    }
  }

  if (tickets.length === 0) {
    return <p className="py-12 text-center text-sm text-muted">No tickets yet.</p>;
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-4">
      {tickets.map((ticket) => (
        <Card
          key={ticket._id}
          className="flex flex-col gap-4 rounded-card border border-subtle bg-surface p-5 shadow-card"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-heading">{ticket.title}</h2>
              {/* Uses the shared map so "accepted" means the same colour here as
                  it does on the vendor and customer screens */}
              <StatusBadge status={ticket.status} className="mt-1" />
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => acceptTicket(ticket._id)}
                className="bg-success text-xs font-bold text-on-accent"
              >
                Accept
              </Button>
              <Button
                size="sm"
                onClick={() => rejectTicket(ticket._id)}
                className="bg-danger text-xs font-bold text-on-accent"
              >
                Reject
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 rounded-card bg-canvas p-3 text-xs">
            <div>
              <p className="text-micro font-bold uppercase text-muted">Vendor</p>
              <p className="font-bold text-heading">{ticket.vendorName || "vendor"}</p>
            </div>
            <div>
              <p className="text-micro font-bold uppercase text-muted">Email</p>
              <p className="text-label">{ticket.vendorEmail || "N/A"}</p>
            </div>
          </div>

          <p className="text-xs text-body">
            {ticket.from} ➔ {ticket.to} · {ticket.transportType} · {fmtDate(ticket.departureDateTime)}
          </p>

          <div className="flex justify-between border-t border-dashed border-subtle pt-3 text-sm">
            <span>
              Seats: <strong>{ticket.quantity}</strong>
            </span>
            <span className="font-bold text-success">{fmtPrice(ticket.price)}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}
