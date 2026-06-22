import { getTicketsAdmin } from "@/actions/tickets";
import TicketCard from "@/Components/TicketCard";

export default async function ManageTicketsPage() {
  const res = await getTicketsAdmin();
  const tickets = res.error ? [] : (res.tickets ?? []);

  return (
    <div className="p-8">
      <h1 className="mb-8 text-3xl font-black text-heading">
        Manage Ticket <span className="text-amber-600">({tickets.length})</span>
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tickets.map((ticket) => (
          <TicketCard key={String(ticket._id)} ticket={ticket} showEmail />
        ))}
      </div>
    </div>
  );
}
