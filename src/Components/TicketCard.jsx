"use client";

import React from "react";
import { Card, Button } from "@heroui/react";
import Image from "@/Components/Image";

export default function TicketCard({ ticket, onBook, footer, showEmail = false }) {
  // Destructure properties to remove repetitive "ticket." lookups
  const {
    title,
    from,
    to,
    transportType,
    price,
    quantity,
    departureDateTime,
    imageUrl,
    vendorName,
    vendorEmail,
    perks = {},
  } = ticket;

  // Inline filter for active perks
  const activePerks = Object.keys(perks).filter((name) => perks[name]);

  // Inline dynamic date parsing
  const formattedDate = departureDateTime
    ? new Date(departureDateTime).toLocaleString("en-BD", { dateStyle: "medium", timeStyle: "short" })
    : "TBA";

  return (
    <Card className="flex w-full flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md transform-gpu backface-hidden">
      <div>
        {/* Banner Image */}
        <div className="relative h-44 w-full overflow-hidden bg-gray-100">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            fallbackClassName="h-full w-full text-gray-400"
          />
        </div>

        {/* Card Body Metrics Content */}
        <Card.Content className="flex flex-col gap-3 p-5">
          <h2 className="text-xl font-bold tracking-tight text-gray-900">{title}</h2>

          {/* Route Segment */}
          <div className="my-0.5 flex items-center justify-between text-sm font-bold text-amber-500">
            <span>{from}</span>
            <span className="text-lg text-emerald-500">➔</span>
            <span>{to}</span>
          </div>

          {/* Vehicle Type */}
          <div className="flex items-center gap-1.5 text-xs font-bold capitalize text-gray-700">
            <span className="text-base text-emerald-500">🚌</span>
            <span>{transportType}</span>
          </div>

          {/* Inventory Rates */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
            <span className="text-base font-extrabold text-emerald-500">
              ৳ {price} <span className="text-xs font-medium text-gray-500">/ ticket</span>
            </span>
            <span className="text-xs font-bold text-gray-700">Available: {quantity}</span>
          </div>

          {/* Perks Layout Grid */}
          <div className="flex flex-col gap-1 text-xs">
            <span className="font-bold text-gray-800">Included Perks:</span>
            {activePerks.length > 0 ? (
              <div className="flex flex-wrap gap-x-3 gap-y-1 font-semibold text-gray-600">
                {activePerks.map((perk) => (
                  <span key={perk} className="flex items-center gap-1">
                    <span className="font-bold text-emerald-500">✓</span>
                    <span className="capitalize">{perk.replace(/([A-Z])/g, " $1")}</span>
                  </span>
                ))}
              </div>
            ) : (
              <span className="italic text-gray-400">None</span>
            )}
          </div>

          {/* Operational Details Log Footer info */}
          <div className="mt-1 flex flex-col gap-1 border-t border-gray-100 pt-2.5 text-[11px] font-medium text-gray-600">
            <div className="flex items-center gap-1">
              <span className="text-emerald-500">🕒</span>
              <span>Departure: {formattedDate}</span>
            </div>
            <div className="mt-1">
              <span className="font-bold text-gray-800">Vendor:</span> {vendorName || "vendor"}
            </div>
            {showEmail && (
              <div>
                <span className="font-bold text-gray-800">Email:</span> {vendorEmail || "N/A"}
              </div>
            )}
          </div>
        </Card.Content>
      </div>

      {/* Primary Execution Conditional Action Bar */}
      {(footer || onBook) && (
        <div className="px-5 pb-5 pt-2">
          {footer || (
            <Button
              type="button"
              onClick={onBook}
              className="h-10 w-full rounded-lg bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-600 text-sm font-bold text-gray-950 shadow-sm hover:opacity-90"
            >
              Book Ticket
            </Button>
          )}
        </div>
      )}
    </Card>
  );
}