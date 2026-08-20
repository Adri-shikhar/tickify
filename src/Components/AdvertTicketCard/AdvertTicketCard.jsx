"use client";

import Image from "@/Components/Image";
import { fmtPrice } from "@/lib/format";
import { getTransportIcon, activePerkLabels } from "@/lib/transport";
import Button from "@/Components/ui/Button";

export default function AdvertTicketCard({ ticket, onSeeDetails }) {
  const { title, from, to, transportType, price, quantity, imageUrl, perks = {} } = ticket;
  const activePerks = activePerkLabels(perks);

  return (
    <div className="group flex h-full min-w-[220px] flex-col overflow-hidden rounded-card border border-default bg-surface shadow-card transition-[box-shadow,transform] duration-200 ease-standard hover:-translate-y-0.5 hover:shadow-hover">
      <div className="relative h-36 w-full shrink-0 overflow-hidden bg-sunken">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-400 ease-out-soft group-hover:scale-[1.04]"
          fallbackClassName="h-full w-full"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 to-transparent px-3 pb-3 pt-8">
          <p className="text-base font-semibold text-white">{title}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <p className="text-sm font-medium text-label">
          {from} <span className="text-accent">→</span> {to}
        </p>

        <p className="text-2xl font-bold text-heading">
          {fmtPrice(price)}{" "}
          <span className="text-sm font-normal text-muted">/ ticket</span>
        </p>

        <div className="flex flex-wrap items-center gap-2 text-sm text-label">
          <span>{getTransportIcon(transportType)}</span>
          <span className="font-medium capitalize">{transportType || "Bus"}</span>
          <span className="rounded-full bg-sunken px-2.5 py-0.5 text-micro text-body">
            {quantity} seats left
          </span>
        </div>

        <p className="text-micro font-semibold uppercase text-muted">Included perks</p>

        <div className="flex min-h-[52px] flex-wrap gap-1.5">
          {activePerks.length === 0 ? (
            <span className="text-xs text-muted">None</span>
          ) : (
            activePerks.map((perk) => (
              <span
                key={perk}
                className="rounded-full bg-sunken px-2.5 py-1 text-micro font-medium text-body"
              >
                <span className="text-success">✓</span> {perk}
              </span>
            ))
          )}
        </div>

        <Button className="mt-auto" fullWidth onClick={onSeeDetails}>
          See Details
        </Button>
      </div>
    </div>
  );
}
