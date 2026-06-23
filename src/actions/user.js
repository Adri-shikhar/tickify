"use server";

import { apiReq } from "@/lib/api";

export async function getUsers() {
  const { data, error } = await apiReq("/api/users", { cache: "no-store" });
  return error ? { error } : { users: data };
}

export async function updateUserRole(id, role) {
  const { data, error } = await apiReq(`/api/users/${id}/${role}`, {
    method: "PATCH",
  });
  return error ? { error } : { success: true, role: data.role };
}

export async function markUserAsFraud(id) {
  const { data, error } = await apiReq(`/api/users/${id}/fraud`, {
    method: "PATCH",
  });
  return error ? { error } : { success: true, isFraud: data.isFraud };
}
