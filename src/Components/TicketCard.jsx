"use client";

// Reusable ticket card — used on the public tickets page and vendor's my-tickets page
import { Card, Button } from "@heroui/react";
import Image from "@/Components/Image";
import { fmtDate } from "@/lib/format";

export default function TicketCard({ ticket, onBook, footer, showEmail = false, buttonText = "Book Ticket" }) {
  const { title, from, to, transportType, price, quantity, departureDateTime, imageUrl, vendorName, vendorEmail, perks = {} } = ticket;

  // Only list the perks that are enabled (true)
  const activePerks = Object.keys(perks).filter((name) => perks[name]);

  return (
    <Card className="flex flex-col justify-between overflow-hidden rounded-2xl border shadow-md">
      <div className="relative h-44 w-full bg-gray-100">
        <Image src={imageUrl} alt={title} fill className="object-cover" fallbackClassName="h-full w-full text-gray-400" />
      </div>

      <Card.Content className="flex flex-col gap-3 p-5">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>

        <div className="flex items-center justify-between text-sm font-bold text-amber-500">
          <span>{from}</span>
          <span className="text-emerald-500">➔</span>
          <span>{to}</span>
        </div>

        <p className="text-xs font-bold capitalize text-gray-700">🚌 {transportType}</p>

        <div className="flex justify-between border-b border-gray-100 pb-2">
          <span className="font-extrabold text-emerald-500">৳ {price}</span>
          <span className="text-xs font-bold">Available: {quantity}</span>
        </div>

        <p className="text-xs text-gray-600">Perks: {activePerks.length ? activePerks.join(", ") : "None"}</p>

        <div className="border-t border-gray-100 pt-2 text-[11px] text-gray-600">
          <p>🕒 {fmtDate(departureDateTime)}</p>
          <p className="mt-1"><span className="font-bold">Vendor:</span> {vendorName || "vendor"}</p>
          {showEmail && <p><span className="font-bold">Email:</span> {vendorEmail || "N/A"}</p>}
        </div>
      </Card.Content>

      {/* Show footer JSX if provided, otherwise show the default Book Ticket button */}
      {(footer || onBook) && (
        <div className="px-5 pb-5">
          {footer || (
            <Button onClick={onBook} className="h-10 w-full rounded-lg bg-gradient-to-r from-emerald-400 to-blue-600 font-bold text-gray-950">
              {buttonText}
            </Button>
          )}
        </div>
      )}
    </Card>
  );
}
