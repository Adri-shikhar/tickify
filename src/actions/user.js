"use server";

import { apiReq } from "@/lib/api";

export async function getUsers() {
  const { data, error } = await apiReq("/api/users", { cache: "no-store" });
  return error ? { error } : { users: data };
}
