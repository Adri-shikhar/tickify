"use server";

import { getUserSession } from "@/lib/session";

// Goes through the cache()-wrapped session read, so calling authHeaders() from
// a server action no longer costs an extra Atlas round trip on top of the one
// the page and layout already paid.
export async function getToken() {
  const session = await getUserSession();
  return session?.session?.token ?? null;
}

export async function authHeaders() {
  const token = await getToken();
  return token
    ? {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    : {};
}
