"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getToken() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
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
