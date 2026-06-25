import { getUserSession } from "@/lib/session";
import { getVendorPayments } from "@/actions/payment";
import { getTickets } from "@/actions/tickets";
import { fmtDate, fmtPrice } from "@/lib/format";
import { Card } from "@heroui/react";

const cardClass = "rounded-2xl border border-gray-100 bg-white p-4 shadow-md sm:p-5";

export default async function RevenuePage() {
  const session = await getUserSession();
  const vendorId = session?.user?.id;

  const [payRes, ticketRes] = await Promise.all([
    getVendorPayments(vendorId),
    getTickets(vendorId),
  ]);

  const error = payRes.error || ticketRes.error || "";
  const payments = payRes.error ? [] : (payRes.payments ?? []);
  const tickets = ticketRes.error ? [] : (ticketRes.tickets ?? []);

  const sold = payments.reduce((n, p) => n + Number(p.quantity || 0), 0);
  const revenue = payments.reduce((n, p) => n + Number(p.totalPrice || 0), 0);
  const max = Math.max(tickets.length, sold, revenue, 1);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 bg-gray-50/50 p-4 sm:gap-6 sm:p-6 md:p-8">
      <div>
        <h1 className="text-xl font-black tracking-tight text-gray-900 sm:text-2xl md:text-3xl">Revenue Overview</h1>
        <p className="mt-1 text-sm text-gray-500">
          Track tickets added, sales, and paid transactions for your vendor account.
        </p>
      </div>

      {error && <p className="rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-500">{error}</p>}

      {!error && (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Card className={cardClass}>
              <Card.Content>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Total Tickets Added</p>
                <p className="mt-2 text-3xl font-black text-cyan-600">{tickets.length}</p>
              </Card.Content>
            </Card>
            <Card className={cardClass}>
              <Card.Content>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Total Tickets Sold</p>
                <p className="mt-2 text-3xl font-black text-emerald-600">{sold}</p>
              </Card.Content>
            </Card>
            <Card className={cardClass}>
              <Card.Content>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Total Revenue</p>
                <p className="mt-2 text-3xl font-black text-indigo-600">{fmtPrice(revenue)}</p>
              </Card.Content>
            </Card>
          </div>

          <Card className="rounded-2xl border border-gray-100 bg-white p-4 shadow-md sm:p-6">
            <Card.Content>
              <h2 className="text-lg font-bold text-gray-900">Revenue Overview</h2>
              <p className="mt-1 text-sm text-gray-500">Summary of your ticket sales performance.</p>

              <div className="mt-6 flex flex-col gap-5">
                {[
                  ["Tickets Added", tickets.length, "bg-cyan-500"],
                  ["Tickets Sold", sold, "bg-emerald-500"],
                  ["Revenue (tk)", revenue, "bg-indigo-500"],
                ].map(([label, value, color]) => (
                  <div key={label}>
                    <div className="mb-1 flex justify-between text-xs font-semibold text-gray-600">
                      <span>{label}</span>
                      <span>{value}</span>
                    </div>
                    <div className="h-3 rounded-full bg-gray-100">
                      <div
                        className={`h-full rounded-full ${color}`}
                        style={{ width: `${value ? Math.max((value / max) * 100, 8) : 0}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card.Content>
          </Card>

          <Card className="rounded-2xl border border-gray-100 bg-white shadow-md">
            <Card.Content className="p-0">
              <div className="border-b border-gray-100 px-4 py-3 sm:px-6 sm:py-4">
                <h2 className="text-lg font-bold text-gray-900">
                  Transactions <span className="text-cyan-600">({payments.length})</span>
                </h2>
                <p className="mt-1 text-sm text-gray-500">All completed payments for your tickets.</p>
              </div>

              {!payments.length ? (
                <p className="px-6 py-12 text-center text-sm text-gray-400">
                  No transactions yet. Revenue will appear here after customers pay for accepted bookings.
                </p>
              ) : (
                <div className="w-full overflow-x-auto">
                  <table className="w-full min-w-[640px] text-left text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50/80 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                        <th className="px-3 py-2 sm:px-6 sm:py-3">Transaction ID</th>
                        <th className="px-3 py-2 sm:px-6 sm:py-3">Ticket</th>
                        <th className="px-3 py-2 sm:px-6 sm:py-3">Customer</th>
                        <th className="px-3 py-2 sm:px-6 sm:py-3">Qty</th>
                        <th className="px-3 py-2 sm:px-6 sm:py-3">Amount</th>
                        <th className="px-3 py-2 sm:px-6 sm:py-3">Payment Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((p) => (
                        <tr key={p._id} className="border-b border-gray-50 hover:bg-gray-50/50">
                          <td className="px-6 py-4 font-mono text-xs text-gray-700">
                            {String(p.payment_intent_id || p._id).slice(-10)}
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-900">{p.ticketTitle || "Ticket"}</td>
                          <td className="px-6 py-4 text-gray-600">{p.customerEmail || "N/A"}</td>
                          <td className="px-6 py-4 font-semibold">{p.quantity || 1}</td>
                          <td className="px-6 py-4 font-black text-emerald-600">{fmtPrice(p.totalPrice)}</td>
                          <td className="px-6 py-4 text-gray-600">{fmtDate(p.paidAt || p.createdAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card.Content>
          </Card>
        </>
      )}
    </div>
  );
}
