// Formats a date value into a readable string, e.g. "21 Jun 2026, 2:30 am". Returns "TBA" if empty.
export const fmtDate = (val) =>
  val ? new Date(val).toLocaleString("en-BD", { dateStyle: "medium", timeStyle: "short" }) : "TBA";

// Formats price as "855tk"
export const fmtPrice = (val) => `${Number(val || 0)}tk`;
