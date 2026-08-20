"use server";

import { revalidateTag } from "next/cache";
import { apiReq } from "@/lib/api";
import { authHeaders } from "@/actions/token";

// Marks the cached public ticket lists stale so a change shows up instead of
// waiting out the revalidate window. "max" gives stale-while-revalidate; the
// bare one-argument form is deprecated in Next 16.
function invalidateTickets() {
  revalidateTag("tickets", "max");
}

// Creates a new ticket in the database
export async function createTicket(ticket) {
  const { data, error } = await apiReq("/api/tickets", {
    method: "POST",
    headers: await authHeaders(),
    body: JSON.stringify(ticket),
  });
  if (!error) invalidateTickets();
  return error ? { error } : { success: true, ticket: data };
}

// Public on all-tickets page; vendor filter requires auth
export async function getTickets(vendorId) {
  const path = vendorId ? `/api/tickets?vendor_id=${vendorId}` : "/api/tickets";

  // A vendor's own list is per-user and must stay uncached. The public list is
  // the same for everyone, so it is cached briefly — otherwise every filter
  // change and every page-number click refetched the entire collection.
  const options = vendorId
    ? { cache: "no-store", headers: await authHeaders() }
    : { next: { revalidate: 60, tags: ["tickets"] } };

  const { data, error } = await apiReq(path, options);
  return error ? { error } : { tickets: data };
}

// Protected — ticket detail / book page (all-tickets/[id])
export async function getTicket(id) {
  const { data, error } = await apiReq(`/api/tickets/${id}`, {
    cache: "no-store",
    headers: await authHeaders(),
  });
  return error ? { error } : { ticket: data };
}

export async function getTicketsAdmin() {
  const { data, error } = await apiReq("/api/tickets/admin", {
    cache: "no-store",
    headers: await authHeaders(),
  });
  return error ? { error } : { tickets: data };
}

export async function updateTicketStatus(id, status) {
  const { data, error } = await apiReq(`/api/tickets/${id}`, {
    method: "PATCH",
    headers: await authHeaders(),
    body: JSON.stringify({ status }),
  });
  if (!error) invalidateTickets();
  return error ? { error } : { success: true, status: data.status };
}

export async function updateTicket(id, ticket) {
  const { data, error } = await apiReq(`/api/tickets/${id}`, {
    method: "PUT",
    headers: await authHeaders(),
    body: JSON.stringify(ticket),
  });
  if (!error) invalidateTickets();
  return error ? { error } : { success: true, ticket: data };
}

export async function deleteTicket(id) {
  const { error } = await apiReq(`/api/tickets/${id}`, {
    method: "DELETE",
    headers: await authHeaders(),
  });
  if (!error) invalidateTickets();
  return error ? { error } : { success: true };
}

// Public — home page. Cached: this is identical for every visitor and changes
// rarely, and cache:"no-store" was forcing the whole landing page to be
// re-rendered from scratch on every single request.
export async function getAdvertisedTickets() {
  const { data, error } = await apiReq("/api/tickets/advertised", {
    next: { revalidate: 60, tags: ["tickets"] },
  });
  return error ? { error } : { tickets: data };
}

// Public — home page
export async function getLatestTickets() {
  const { data, error } = await apiReq("/api/tickets/latest", {
    next: { revalidate: 60, tags: ["tickets"] },
  });
  return error ? { error } : { tickets: data };
}

export async function toggleAdvertise(id, isAdvertised) {
  const { data, error } = await apiReq(`/api/tickets/${id}/advertise`, {
    method: "PATCH",
    headers: await authHeaders(),
    body: JSON.stringify({ isAdvertised }),
  });
  if (!error) invalidateTickets();
  return error ? { error } : { success: true, isAdvertised: data.isAdvertised };
}
