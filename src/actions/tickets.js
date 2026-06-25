"use server";

import { apiReq } from "@/lib/api";
import { authHeaders } from "@/actions/token";

// Creates a new ticket in the database
export async function createTicket(ticket) {
  const { data, error } = await apiReq("/api/tickets", {
    method: "POST",
    headers: await authHeaders(),
    body: JSON.stringify(ticket),
  });
  return error ? { error } : { success: true, ticket: data };
}

// Public on all-tickets page; vendor filter requires auth
export async function getTickets(vendorId) {
  const path = vendorId ? `/api/tickets?vendor_id=${vendorId}` : "/api/tickets";
  const options = { cache: "no-store" };
  if (vendorId) options.headers = await authHeaders();
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
  return error ? { error } : { success: true, status: data.status };
}

export async function updateTicket(id, ticket) {
  const { data, error } = await apiReq(`/api/tickets/${id}`, {
    method: "PUT",
    headers: await authHeaders(),
    body: JSON.stringify(ticket),
  });
  return error ? { error } : { success: true, ticket: data };
}

export async function deleteTicket(id) {
  const { data, error } = await apiReq(`/api/tickets/${id}`, {
    method: "DELETE",
    headers: await authHeaders(),
  });
  return error ? { error } : { success: true };
}

// Public — home page
export async function getAdvertisedTickets() {
  const { data, error } = await apiReq("/api/tickets/advertised", {
    cache: "no-store",
  });
  return error ? { error } : { tickets: data };
}

// Public — home page
export async function getLatestTickets() {
  const { data, error } = await apiReq("/api/tickets/latest", {
    cache: "no-store",
  });
  return error ? { error } : { tickets: data };
}

export async function toggleAdvertise(id, isAdvertised) {
  const { data, error } = await apiReq(`/api/tickets/${id}/advertise`, {
    method: "PATCH",
    headers: await authHeaders(),
    body: JSON.stringify({ isAdvertised }),
  });
  return error ? { error } : { success: true, isAdvertised: data.isAdvertised };
}
