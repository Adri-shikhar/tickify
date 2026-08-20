// Shared presentation helpers for tickets. These used to live inside
// AdvertTicketCard only, which is why TicketCard rendered every ticket with a
// bus icon — including flights.

const transportIcons = {
  bus: "🚌",
  train: "🚆",
  launch: "⛴️",
  flight: "✈️",
};

export function getTransportIcon(type) {
  return transportIcons[String(type || "").toLowerCase()] ?? "🚌";
}

// Perks are stored as object keys, so without this the UI shows the user
// raw strings like "chargingPort".
export const perkLabels = {
  ac: "AC",
  wifi: "WiFi",
  food: "Food",
  tv: "TV",
  chargingPort: "Charging Port",
  breakfast: "Breakfast",
};

export function getPerkLabel(key) {
  return perkLabels[key] ?? key;
}

// Returns only the perks that are switched on, already human-readable.
export function activePerkLabels(perks) {
  if (!perks) return [];
  return Object.keys(perks)
    .filter((key) => perks[key])
    .map(getPerkLabel);
}
