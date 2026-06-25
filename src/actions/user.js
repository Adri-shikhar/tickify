"use server";

import { apiReq } from "@/lib/api";
import { authHeaders } from "@/actions/token";

export async function getUsers() {
  const { data, error } = await apiReq("/api/users", {
    cache: "no-store",
    headers: await authHeaders(),
  });
  return error ? { error } : { users: data };
}

export async function updateUserRole(id, role) {
  const { data, error } = await apiReq(`/api/users/${id}/${role}`, {
    method: "PATCH",
    headers: await authHeaders(),
  });
  return error ? { error } : { success: true, role: data.role };
}

export async function markUserAsFraud(id) {
  const { data, error } = await apiReq(`/api/users/${id}/fraud`, {
    method: "PATCH",
    headers: await authHeaders(),
  });
  return error ? { error } : { success: true, isFraud: data.isFraud };
}
