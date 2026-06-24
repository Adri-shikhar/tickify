"use client";

import { useSession } from "@/lib/auth-client";
import { getUserPayments } from "@/actions/payment";
import { useSessionData } from "@/lib/useSessionData";
import { fmtDate } from "@/lib/format";
import { Card } from "@heroui/react";

export default function TransactionHistoryPage() {
  const { data: session } = useSession();
  const { data: payments = [], error, loading } = useSessionData(
    session?.user?.id,
    getUserPayments,
    "payments"
  );

  return (
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col gap-6 bg-gray-50/50 p-6 md:p-8">
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">
          Transaction History <span className="text-emerald-500">({payments.length})</span>
        </h1>
        <p className="mt-1 text-sm text-gray-500">All payments made from your account.</p>
      </div>

      {loading && <p className="text-sm text-gray-500">Loading transactions...</p>}

      {error && (
        <p className="rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-500">{error}</p>
      )}

      {!loading && !error && payments.length === 0 && (
        <p className="rounded-2xl border bg-white py-12 text-center text-sm text-gray-400 shadow-sm">
          No transactions yet.
        </p>
      )}

      <div className="flex flex-col gap-4">
        {payments.map((payment) => (
          <Card key={payment._id} className="rounded-2xl border border-gray-100 p-5 shadow-md bg-white">
            <Card.Content className="flex flex-col gap-3">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-lg font-bold text-gray-900">Payment #{String(payment._id).slice(-6)}</h2>
                <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-black uppercase text-emerald-600">
                  {payment.status || "paid"}
                </span>
              </div>

              <p className="text-sm text-gray-600">
                Vendor: {payment.vendorName || "Unknown"}
                {payment.vendor_id ? ` (${payment.vendor_id})` : ""}
              </p>

              <p className="text-sm text-gray-600">Booking ID: {payment.booking_id || "N/A"}</p>

              <p className="text-sm text-gray-600">Paid: {fmtDate(payment.paidAt)}</p>

              <p className="text-lg font-black text-emerald-500">৳ {payment.totalPrice}</p>
            </Card.Content>
          </Card>
        ))}
      </div>
    </div>
  );
}
