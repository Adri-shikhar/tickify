"use client";

import { useState } from "react";
import { toggleAdvertise } from "@/actions/tickets";
import { Button } from "@heroui/react";
import { fmtPrice } from "@/lib/format";

export default function AdminAdvertiseList({ initialTickets }) {
  const [tickets, setTickets] = useState(initialTickets);
  const [error, setError] = useState("");
  const [togglingId, setTogglingId] = useState(null);

  const approved = tickets.filter((t) => t.status === "accepted");
  const advertisedCount = tickets.filter((t) => t.isAdvertised).length;

  async function handleToggle(ticket) {
    setError("");
    const newValue = !ticket.isAdvertised;
    const currentCount = tickets.filter((t) => t.isAdvertised).length;

    if (newValue && currentCount >= 6) {
      setError("Maximum 6 tickets can be advertised");
      return;
    }

    setTogglingId(String(ticket._id));
    const result = await toggleAdvertise(ticket._id, newValue);
    setTogglingId(null);

    if (result.error) {
      setError(result.error);
      return;
    }

    setTickets((prev) =>
      prev.map((t) => (String(t._id) === String(ticket._id) ? { ...t, isAdvertised: newValue } : t))
    );
  }

  return (
    <div>
      <p className="mb-4 text-sm font-semibold text-body">
        Advertised: <span className="text-accent">{advertisedCount} / 6</span>
      </p>

      {error && (
        <p className="mb-4 rounded-control bg-danger-soft p-3 text-sm text-danger-soft-fg">{error}</p>
      )}

      {approved.length === 0 ? (
        <p className="text-body">No approved tickets to advertise.</p>
      ) : (
        <div className="w-full max-w-full overflow-x-auto rounded-card border border-default bg-surface shadow-card">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-default bg-canvas text-xs font-bold uppercase text-body">
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Route</th>
                <th className="px-4 py-3">Transport</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Advertise</th>
              </tr>
            </thead>
            <tbody>
              {approved.map((ticket) => (
                <tr key={String(ticket._id)} className="border-b border-default">
                  <td className="px-4 py-3 font-semibold">{ticket.title}</td>
                  <td className="px-4 py-3">
                    {ticket.from} → {ticket.to}
                  </td>
                  <td className="px-4 py-3 capitalize">{ticket.transportType}</td>
                  <td className="px-4 py-3 font-bold text-success">{fmtPrice(ticket.price)}</td>
                  <td className="px-4 py-3">
                    <Button
                      size="sm"
                      disabled={togglingId === String(ticket._id)}
                      onClick={() => handleToggle(ticket)}
                      className={
                        ticket.isAdvertised
                          ? "bg-danger text-xs font-bold text-on-accent"
                          : "bg-accent text-xs font-bold text-on-accent"
                      }
                    >
                      {togglingId === String(ticket._id)
                        ? "..."
                        : ticket.isAdvertised
                          ? "Unadvertise"
                          : "Advertise"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
