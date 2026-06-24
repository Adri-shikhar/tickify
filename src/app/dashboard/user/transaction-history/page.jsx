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
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col gap-6 bg-gray-50/50 p-6 md:p-8">
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">
          Transaction History <span className="text-emerald-500">({payments.length})</span>
        </h1>
        <p className="mt-1 text-sm text-gray-500">All payments made from your account.</p>
      </div>

      {loading && <p className="text-sm text-gray-500">Loading transactions...</p>}
      {error && <p className="rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-500">{error}</p>}

      <Card className="rounded-2xl border border-gray-100 bg-white shadow-md">
        <Card.Content className="p-0">
          {!loading && !error && payments.length === 0 ? (
            <p className="px-6 py-12 text-center text-sm text-gray-400">No transactions yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/80 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    <th className="px-6 py-3">Transaction ID</th>
                    <th className="px-6 py-3">Ticket Title</th>
                    <th className="px-6 py-3">Amount</th>
                    <th className="px-6 py-3">Payment Date</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p) => (
                    <tr key={p._id} className="border-b border-gray-50 hover:bg-gray-50/50">
                      <td className="px-6 py-4 font-mono text-xs text-gray-700">
                        {String(p.payment_intent_id || p.session_id || p._id).slice(-12)}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">{p.ticketTitle || "Ticket"}</td>
                      <td className="px-6 py-4 font-black text-emerald-600">৳ {p.totalPrice}</td>
                      <td className="px-6 py-4 text-gray-600">{fmtDate(p.paidAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card.Content>
      </Card>
    </div>
  );
}
