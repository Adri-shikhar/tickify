"use server";

import { apiReq } from "@/lib/api";

// Creates a new ticket in the database
export async function createTicket(ticket) {
  const { data, error } = await apiReq("/api/tickets", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ticket),
  });
  return error ? { error } : { success: true, ticket: data };
}

// Fetches all tickets, or just one vendor's tickets if vendorId is provided
export async function getTickets(vendorId) {
  const path = vendorId ? `/api/tickets?vendor_id=${vendorId}` : "/api/tickets";
  const { data, error } = await apiReq(path, { cache: "no-store" });
  return error ? { error } : { tickets: data };
}

// Fetches a single ticket by its ID
export async function getTicket(id) {
  const { data, error } = await apiReq(`/api/tickets/${id}`, { cache: "no-store" });
  return error ? { error } : { ticket: data };
}

// Fetches all tickets for admin
export async function getTicketsAdmin() {
  const { data, error } = await apiReq("/api/tickets/admin", { cache: "no-store" });
  return error ? { error } : { tickets: data };
}

// Admin: update ticket status to accepted or rejected
export async function updateTicketStatus(id, status) {
  const { data, error } = await apiReq(`/api/tickets/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return error ? { error } : { success: true, status: data.status };
}
