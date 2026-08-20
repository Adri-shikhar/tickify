"use client";

// Reusable ticket card — used on the public tickets page and vendor's my-tickets page
import { Card, Button } from "@heroui/react";
import Image from "@/Components/Image";
import { fmtDate, fmtPrice } from "@/lib/format";
import { getTransportIcon, activePerkLabels } from "@/lib/transport";

export default function TicketCard({ ticket, onBook, footer, showEmail = false, buttonText = "Book Ticket" }) {
  const { title, from, to, transportType, price, quantity, departureDateTime, imageUrl, vendorName, vendorEmail, perks = {} } = ticket;

  const activePerks = activePerkLabels(perks);

  return (
    /* p-0 is required: HeroUI's .card base applies its own padding through an
       opaque class name, which used to inset the "full-bleed" image by 16px
       and stop the card's own radius from clipping it. */
    <Card className="group flex flex-col justify-between overflow-hidden rounded-card border border-default bg-surface p-0 shadow-card transition-[box-shadow,transform] duration-200 ease-standard hover:-translate-y-0.5 hover:shadow-hover">
      <div className="relative h-44 w-full overflow-hidden bg-sunken">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-400 ease-out-soft group-hover:scale-[1.04]"
          fallbackClassName="h-full w-full"
        />
      </div>

      <Card.Content className="flex flex-col gap-3 p-5">
        <h2 className="text-lg font-semibold text-heading">{title}</h2>

        <div className="flex items-center justify-between text-sm font-medium text-label">
          <span>{from}</span>
          <span className="text-accent">➔</span>
          <span>{to}</span>
        </div>

        <p className="text-xs font-medium capitalize text-body">
          {getTransportIcon(transportType)} {transportType}
        </p>

        <div className="flex items-baseline justify-between border-b border-subtle pb-2">
          <span className="text-2xl font-bold text-heading">{fmtPrice(price)}</span>
          <span className="text-micro font-semibold uppercase text-muted">
            {quantity} left
          </span>
        </div>

        <p className="text-xs text-body">Perks: {activePerks.length ? activePerks.join(", ") : "None"}</p>

        <div className="border-t border-subtle pt-2 text-micro text-muted">
          <p>🕒 {fmtDate(departureDateTime)}</p>
          <p className="mt-1"><span className="font-semibold text-body">Vendor:</span> {vendorName || "vendor"}</p>
          {showEmail && <p><span className="font-semibold text-body">Email:</span> {vendorEmail || "N/A"}</p>}
        </div>
      </Card.Content>

      {/* Show footer JSX if provided, otherwise show the default Book Ticket button */}
      {(footer || onBook) && (
        <div className="px-5 pb-5">
          {footer || (
            <Button
              onClick={onBook}
              className="h-10 w-full rounded-control bg-accent font-semibold text-on-accent hover:bg-accent-hover"
            >
              {buttonText}
            </Button>
          )}
        </div>
      )}
    </Card>
  );
}
