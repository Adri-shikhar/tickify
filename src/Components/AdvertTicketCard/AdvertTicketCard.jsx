"use client";

import Image from "@/Components/Image";

const perkLabels = {
  ac: "AC",
  wifi: "WiFi",
  food: "Food",
  tv: "TV",
  chargingPort: "Charging Port",
  breakfast: "Breakfast",
};

function getTransportIcon(type) {
  if (type === "train") return "🚆";
  if (type === "flight") return "✈️";
  return "🚌";
}

export default function AdvertTicketCard({ ticket, onSeeDetails }) {
  const { title, from, to, transportType, price, quantity, imageUrl, perks = {} } = ticket;
  const activePerks = Object.keys(perks).filter((name) => perks[name]);

  return (
    <div className="flex h-full min-w-[220px] flex-col overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-lg">
      <div className="relative h-36 w-full shrink-0 bg-gray-200">
        <Image src={imageUrl} alt={title} fill className="object-cover" fallbackClassName="h-full w-full" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 pb-3 pt-8">
          <p className="text-lg font-bold text-white">{title}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <p className="text-sm font-bold text-emerald-600">
          {from} <span className="text-emerald-500">→</span> {to}
        </p>

        <p className="text-2xl font-bold text-gray-900">
          ৳ {price}{" "}
          <span className="text-sm font-normal text-gray-500">/ ticket</span>
        </p>

        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-800">
          <span>{getTransportIcon(transportType)}</span>
          <span className="font-semibold capitalize">{transportType || "Bus"}</span>
          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-600">
            {quantity} seats left
          </span>
        </div>

        <p className="text-xs font-bold text-gray-900">Included Perks:</p>

        <div className="flex min-h-[52px] flex-wrap gap-1.5">
          {activePerks.length === 0 ? (
            <span className="text-xs text-gray-400">None</span>
          ) : (
            activePerks.map((perk) => (
              <span
                key={perk}
                className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-700"
              >
                <span className="text-emerald-500">✓</span> {perkLabels[perk] || perk}
              </span>
            ))
          )}
        </div>

        <button
          type="button"
          onClick={onSeeDetails}
          className="mt-auto w-full rounded-xl bg-gradient-to-r from-blue-500 to-emerald-400 py-2.5 text-sm font-bold text-white hover:opacity-90"
        >
          See Details
        </button>
      </div>
    </div>
  );
}
