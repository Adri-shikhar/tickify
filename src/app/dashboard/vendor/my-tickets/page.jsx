"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { getTickets } from "@/actions/tickets";
import { Card, Button } from "@heroui/react";

export default function MyTicketsPage() {
  const { data: session } = useSession();
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!session?.user?.id) return;

    getTickets(session.user.id).then((result) => {
      if (result.error) setError(result.error);
      else setTickets(result.tickets ?? []);
    });
  }, [session?.user?.id]);

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-900">Total (0) Tickets Added</h1>
        <p className="mt-4 text-red-500 bg-red-50 p-3 rounded-xl border border-red-100 max-w-md">{error}</p>
      </div>
    );
  }

  if (!tickets.length) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-900">Total (0) Tickets Added</h1>
        <p className="mt-4 text-gray-500 font-medium">No tickets found yet.</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50/50 min-h-screen">
      {/* Dynamic Header Matching Screenshot */}
      <h1 className="text-2xl font-black text-gray-900 mb-8 tracking-tight">
        Total <span className="text-emerald-500 font-extrabold">({tickets.length})</span> Tickets Added
      </h1>

      {/* Responsive 3-Column Ticket Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket) => {
          // Parse available perks object fields dynamically into printable labels
          const activePerks = ticket.perks 
            ? Object.keys(ticket.perks).filter((key) => ticket.perks[key]) 
            : [];

          return (
            <Card key={ticket._id} className="w-full bg-white shadow-md rounded-2xl overflow-hidden border border-gray-100 flex flex-col justify-between">
              <div>
                {/* Top Section Image Handler */}
                <div className="w-full h-44 bg-gray-100 relative overflow-hidden">
                  {ticket.imageUrl ? (
                    <img
                      src={ticket.imageUrl}
                      alt={ticket.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                      No Image Provided
                    </div>
                  )}
                </div>

                {/* Main Content Area */}
                <Card.Content className="p-5 flex flex-col gap-3">
                  {/* Title */}
                  <h2 className="text-xl font-bold text-gray-900 tracking-tight">{ticket.title}</h2>

                  {/* Locations Routing Bar */}
                  <div className="flex items-center justify-between font-bold text-sm text-amber-500 my-0.5">
                    <span>{ticket.from}</span>
                    <span className="text-emerald-500 text-lg">➔</span>
                    <span>{ticket.to}</span>
                  </div>

                  {/* Transit Vehicle Indicator */}
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700 capitalize">
                    <span className="text-emerald-500 text-base">🚌</span>
                    <span>{ticket.transportType}</span>
                  </div>

                  {/* Price Rate & Inventory Balances */}
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
                    <span className="text-base font-extrabold text-emerald-500">
                      ৳ {ticket.price} <span className="text-xs font-medium text-gray-500">/ ticket</span>
                    </span>
                    <span className="text-xs font-bold text-gray-700">
                      Available: {ticket.quantity}
                    </span>
                  </div>

                  {/* Dynamic Checked Perks Row */}
                  <div className="flex flex-col gap-1 text-xs">
                    <span className="font-bold text-gray-800">Included Perks:</span>
                    {activePerks.length > 0 ? (
                      <div className="flex flex-wrap gap-x-3 gap-y-1 text-gray-600 font-semibold">
                        {activePerks.map((perk) => (
                          <span key={perk} className="flex items-center gap-1">
                            <span className="text-emerald-500 font-bold">✓</span> 
                            <span className="capitalize">{perk.replace(/([A-Z])/g, ' $1')}</span>
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-400 italic">None</span>
                    )}
                  </div>

                  {/* Operational Data Rows */}
                  <div className="flex flex-col gap-1 text-[11px] text-gray-600 font-medium border-t border-gray-100 pt-2.5 mt-1">
                    <div className="flex items-center gap-1">
                      <span className="text-emerald-500">🕒</span>
                      <span>Departure: {ticket.departureDateTime}</span>
                    </div>
                    <div className="mt-1">
                      <span className="font-bold text-gray-800">Vendor:</span> {ticket.vendorName || "vendor"}
                    </div>
                    <div>
                      <span className="font-bold text-gray-800">Email:</span> {ticket.vendorEmail || "N/A"}
                    </div>
                  </div>
                </Card.Content>
              </div>

              {/* Action Buttons Footer Row */}
              <div className="px-5 pb-5 pt-2 flex items-center justify-between gap-4">
                {/* Gradient Update Action */}
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold text-xs px-4 h-8 rounded-lg shadow-sm transition-transform active:scale-[0.98]"
                >
                  Update
                </Button>

                {/* Conditional Pills Status Badge Alignment */}
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-black tracking-wider uppercase px-2.5 py-0.5 rounded-md border ${
                    ticket.status === "approved"
                      ? "bg-blue-50 border-blue-200 text-blue-600"
                      : "bg-gray-100 border-gray-200 text-gray-500"
                  }`}>
                    {ticket.status || "pending"}
                  </span>
                  
                  {/* Clean Bordered Delete Trigger */}
                  <Button
                    size="sm"
                    variant="bordered"
                    className="border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 font-bold text-xs h-8 px-4 rounded-lg"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}