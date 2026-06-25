import { getTicketsAdmin } from "@/actions/tickets";
import AdminTicketList from "@/Components/Dashboard/AdminTicketList";

export default async function ManageTicketsPage() {
  const res = await getTicketsAdmin();
  const tickets = res.error ? [] : (res.tickets ?? []);

  return (
    <div className="mx-auto w-full max-w-4xl p-4 sm:p-6 md:p-8">
      <h1 className="mb-6 text-center text-xl font-black text-gray-900 sm:mb-8 sm:text-2xl md:text-3xl">
        Manage Ticket <span className="text-amber-600">({tickets.length})</span>
      </h1>

      <AdminTicketList initialTickets={tickets} />
    </div>
  );
}
