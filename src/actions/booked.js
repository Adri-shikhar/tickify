"use server";

import { apiReq } from "@/lib/api";

// Books seats on a ticket (status defaults to "waiting for confirm" on backend)
export async function bookTicket(booking) {
  const { data, error } = await apiReq("/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });
  return error ? { error } : { success: true, booking: data };
}

// Fetches all bookings made by a specific user
export async function getUserBookings(userId) {
  const { data, error } = await apiReq(`/api/bookings?user_id=${userId}`, { cache: "no-store" });
  return error ? { error } : { bookings: data };
}

// Fetches all bookings for a vendor's tickets
export async function getVendorBookings(vendorId) {
  const { data, error } = await apiReq(`/api/bookings?vendor_id=${vendorId}`, { cache: "no-store" });
  return error ? { error } : { bookings: data };
}

// Workflow Update: Allows vendors to change booking status to "accepted" or "rejected"
export async function updateBookingStatus(id, status) {
  const { data, error } = await apiReq(`/api/bookings/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return error ? { error } : { success: true, status: data.status };
}