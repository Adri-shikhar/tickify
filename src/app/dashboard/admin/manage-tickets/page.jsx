import { getTicketsAdmin } from "@/actions/tickets";
import AdminTicketList from "@/Components/Dashboard/AdminTicketList";

export default async function ManageTicketsPage() {
  const res = await getTicketsAdmin();
  const tickets = res.error ? [] : (res.tickets ?? []);

  return (
    <div className="mx-auto max-w-4xl p-8">
      <h1 className="mb-8 text-center text-3xl font-black text-gray-900">
        Manage Ticket <span className="text-amber-600">({tickets.length})</span>
      </h1>

      <AdminTicketList initialTickets={tickets} />
    </div>
  );
}
