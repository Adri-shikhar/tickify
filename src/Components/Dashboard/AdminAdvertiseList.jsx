"use client";

import { useEffect, useState } from "react";
import { getTicketsAdmin, toggleAdvertise } from "@/actions/tickets";
import { Button } from "@heroui/react";

export default function AdminAdvertiseList() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getTicketsAdmin().then((result) => {
      if (result.error) setError(result.error);
      else setTickets(result.tickets || []);
      setLoading(false);
    });
  }, []);

  const approved = tickets.filter((t) => t.status === "accepted");
  const advertisedCount = tickets.filter((t) => t.isAdvertised).length;

  async function handleToggle(ticket) {
    setError("");
    const newValue = !ticket.isAdvertised;

    if (newValue && advertisedCount >= 6) {
      setError("Maximum 6 tickets can be advertised");
      return;
    }

    const result = await toggleAdvertise(ticket._id, newValue);

    if (result.error) {
      setError(result.error);
      return;
    }

    setTickets(
      tickets.map((t) => (String(t._id) === String(ticket._id) ? { ...t, isAdvertised: newValue } : t))
    );
  }

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div>
      <p className="mb-4 text-sm font-semibold text-gray-600">
        Advertised: <span className="text-cyan-600">{advertisedCount} / 6</span>
      </p>

      {error && <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-500">{error}</p>}

      {approved.length === 0 ? (
        <p className="text-gray-500">No approved tickets to advertise.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead>
              <tr className="border-b bg-gray-50 text-xs font-bold uppercase text-gray-500">
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Route</th>
                <th className="px-4 py-3">Transport</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Advertise</th>
              </tr>
            </thead>
            <tbody>
              {approved.map((ticket) => (
                <tr key={String(ticket._id)} className="border-b">
                  <td className="px-4 py-3 font-semibold">{ticket.title}</td>
                  <td className="px-4 py-3">
                    {ticket.from} → {ticket.to}
                  </td>
                  <td className="px-4 py-3 capitalize">{ticket.transportType}</td>
                  <td className="px-4 py-3 font-bold text-emerald-600">৳ {ticket.price}</td>
                  <td className="px-4 py-3">
                    <Button
                      size="sm"
                      onClick={() => handleToggle(ticket)}
                      className={
                        ticket.isAdvertised
                          ? "bg-red-500 text-xs font-bold text-white"
                          : "bg-cyan-600 text-xs font-bold text-white"
                      }
                    >
                      {ticket.isAdvertised ? "Unadvertise" : "Advertise"}
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
