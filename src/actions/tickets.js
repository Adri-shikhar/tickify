"use server";

const API = process.env.TICKIFY_API_URL ?? "http://localhost:5000";

async function request(path, options) {
  const res = await fetch(`${API}${path}`, options);
  const data = await res.json();
  if (!res.ok) return { error: data.error ?? "Something went wrong" };
  return { data };
}

export async function createTicket(ticket) {
  const { data, error } = await request("/api/tickets", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ticket),
  });

  if (error) return { error };
  return { success: true, ticket: data };
}

export async function getTickets(vendorId) {
  const path = vendorId ? `/api/tickets?vendor_id=${vendorId}` : "/api/tickets";
  const { data, error } = await request(path, { cache: "no-store" });

  if (error) return { error };
  return { tickets: data };
}
