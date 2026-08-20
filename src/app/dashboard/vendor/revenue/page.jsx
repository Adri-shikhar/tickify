import { getUserSession } from "@/lib/session";
import { getVendorPayments } from "@/actions/payment";
import { getTickets } from "@/actions/tickets";
import { fmtDate, fmtPrice } from "@/lib/format";
import { Card } from "@heroui/react";

const cardClass = "rounded-card border border-subtle p-4 shadow-card sm:p-5";

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
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 p-4 sm:gap-6 sm:p-6 md:p-8">
      <div>
        <h1 className="text-xl font-black tracking-tight text-heading sm:text-2xl md:text-3xl">Revenue Overview</h1>
        <p className="mt-1 text-sm text-body">
          Track tickets added, sales, and paid transactions for your vendor account.
        </p>
      </div>

      {error && <p className="rounded-card border border-danger/30 bg-danger-soft p-3 text-sm text-danger-soft-fg">{error}</p>}

      {!error && (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Card className={cardClass}>
              <Card.Content>
                <p className="text-micro font-bold uppercase text-muted">Total Tickets Added</p>
                <p className="mt-2 text-3xl font-black text-accent">{tickets.length}</p>
              </Card.Content>
            </Card>
            <Card className={cardClass}>
              <Card.Content>
                <p className="text-micro font-bold uppercase text-muted">Total Tickets Sold</p>
                <p className="mt-2 text-3xl font-black text-success">{sold}</p>
              </Card.Content>
            </Card>
            <Card className={cardClass}>
              <Card.Content>
                <p className="text-micro font-bold uppercase text-muted">Total Revenue</p>
                <p className="mt-2 text-3xl font-black text-info">{fmtPrice(revenue)}</p>
              </Card.Content>
            </Card>
          </div>

          <Card className="rounded-card border border-subtle p-4 shadow-card sm:p-6">
            <Card.Content>
              <h2 className="text-lg font-bold text-heading">Revenue Overview</h2>
              <p className="mt-1 text-sm text-body">Summary of your ticket sales performance.</p>

              <div className="mt-6 flex flex-col gap-5">
                {[
                  ["Tickets Added", tickets.length, "bg-accent"],
                  ["Tickets Sold", sold, "bg-success"],
                  ["Revenue (tk)", revenue, "bg-info"],
                ].map(([label, value, color]) => (
                  <div key={label}>
                    <div className="mb-1 flex justify-between text-xs font-semibold text-body">
                      <span>{label}</span>
                      <span>{value}</span>
                    </div>
                    <div className="h-3 rounded-full bg-sunken">
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

          <Card className="rounded-card border border-subtle shadow-card">
            <Card.Content className="p-0">
              <div className="border-b border-subtle px-4 py-3 sm:px-6 sm:py-4">
                <h2 className="text-lg font-bold text-heading">
                  Transactions <span className="text-accent">({payments.length})</span>
                </h2>
                <p className="mt-1 text-sm text-body">All completed payments for your tickets.</p>
              </div>

              {!payments.length ? (
                <p className="px-6 py-12 text-center text-sm text-muted">
                  No transactions yet. Revenue will appear here after customers pay for accepted bookings.
                </p>
              ) : (
                <div className="w-full overflow-x-auto">
                  <table className="w-full min-w-[640px] text-left text-sm">
                    <thead>
                      <tr className="border-b border-subtle bg-sunken text-micro font-bold uppercase text-body">
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
                        <tr key={p._id} className="border-b border-subtle hover:bg-surface-hover">
                          <td className="px-6 py-4 font-mono text-xs text-label">
                            {String(p.payment_intent_id || p._id).slice(-10)}
                          </td>
                          <td className="px-6 py-4 font-semibold text-heading">{p.ticketTitle || "Ticket"}</td>
                          <td className="px-6 py-4 text-body">{p.customerEmail || "N/A"}</td>
                          <td className="px-6 py-4 font-semibold">{p.quantity || 1}</td>
                          <td className="px-6 py-4 font-black text-success">{fmtPrice(p.totalPrice)}</td>
                          <td className="px-6 py-4 text-body">{fmtDate(p.paidAt || p.createdAt)}</td>
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
