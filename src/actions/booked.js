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

export async function bookTicket(booking) {
  const { data, error } = await fetchApi("/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });

  if (error) return { error };
  return { success: true, booking: data };
}

export async function getUserBookings(userId) {
  if (!userId) return { error: "User ID is required" };

  const { data, error } = await fetchApi(`/api/bookings?user_id=${userId}`, {
    cache: "no-store",
  });

  if (error) return { error };
  return { bookings: data };
}
