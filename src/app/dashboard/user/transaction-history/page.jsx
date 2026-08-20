import { getUserSession } from "@/lib/session";
import { getUserPayments } from "@/actions/payment";
import { fmtDate, fmtPrice } from "@/lib/format";
import { Card } from "@heroui/react";

export default async function TransactionHistoryPage() {
  const session = await getUserSession();
  const userId = session?.user?.id;

  const res = await getUserPayments(userId);
  const error = res.error || "";
  const payments = res.error ? [] : (res.payments ?? []);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 sm:gap-6 sm:p-6 md:p-8">
      <div>
        <h1 className="text-xl font-black tracking-tight text-heading sm:text-2xl md:text-3xl">
          Transaction History <span className="text-success">({payments.length})</span>
        </h1>
        <p className="mt-1 text-sm text-body">All payments made from your account.</p>
      </div>

      {error && <p className="rounded-card border border-danger/30 bg-danger-soft p-3 text-sm text-danger-soft-fg">{error}</p>}

      <Card className="rounded-card border border-subtle shadow-card">
        <Card.Content className="p-0">
          {!error && payments.length === 0 ? (
            <p className="px-6 py-12 text-center text-sm text-muted">No transactions yet.</p>
          ) : (
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead>
                  <tr className="border-b border-subtle bg-sunken text-micro font-bold uppercase text-body">
                    <th className="px-3 py-2 sm:px-6 sm:py-3">Transaction ID</th>
                    <th className="px-3 py-2 sm:px-6 sm:py-3">Ticket Title</th>
                    <th className="px-3 py-2 sm:px-6 sm:py-3">Amount</th>
                    <th className="px-3 py-2 sm:px-6 sm:py-3">Payment Date</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p) => (
                    <tr key={p._id} className="border-b border-subtle hover:bg-surface-hover">
                      <td className="px-6 py-4 font-mono text-xs text-label">
                        {String(p.payment_intent_id || p.session_id || p._id).slice(-12)}
                      </td>
                      <td className="px-6 py-4 font-semibold text-heading">{p.ticketTitle || "Ticket"}</td>
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
    </div>
  );
}
