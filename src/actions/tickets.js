"use server";

const API = process.env.TICKIFY_API_URL ?? "http://localhost:5000";

async function fetchApi(path, options = {}) {
  const res = await fetch(`${API}${path}`, options);
  const data = await res.json();

  if (!res.ok) {
    return { error: data.error ?? "Something went wrong" };
  }

  return { data };
}

export async function createTicket(ticket) {
  const { data, error } = await fetchApi("/api/tickets", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ticket),
  });

  if (error) return { error };
  return { success: true, ticket: data };
}

export async function getTickets(vendorId) {
  const path = vendorId ? `/api/tickets?vendor_id=${vendorId}` : "/api/tickets";

  const { data, error } = await fetchApi(path, { cache: "no-store" });

  if (error) return { error };
  return { tickets: data };
}

export async function getTicket(id) {
  if (!id) return { error: "Ticket ID is required" };

  const { data, error } = await fetchApi(`/api/tickets/${id}`, { cache: "no-store" });

  if (error) return { error };
  return { ticket: data };
}
