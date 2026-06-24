"use server";

import { apiReq } from "@/lib/api";

export async function createPayment(payment) {
  const { data, error } = await apiReq("/api/payments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payment),
  });
  return error ? { error } : { success: true, payment: data };
}

export async function getUserPayments(userId) {
  const { data, error } = await apiReq(`/api/payments?user_id=${userId}`, { cache: "no-store" });
  return error ? { error } : { payments: data };
}
