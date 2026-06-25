import { getUserSession } from "@/lib/session";
import { getTickets } from "@/actions/tickets";
import VendorMyTicketsList from "@/Components/Dashboard/VendorMyTicketsList";

export default async function MyTicketsPage() {
  const session = await getUserSession();
  const vendorId = session?.user?.id;

  const res = await getTickets(vendorId);
  const error = res.error || "";
  const tickets = res.error ? [] : (res.tickets ?? []);

  return (
    <div className="w-full p-4 sm:p-6 md:p-8">
      <h1 className="mb-6 text-xl font-black text-gray-900 sm:mb-8 sm:text-2xl md:text-3xl">
        My Tickets <span className="text-emerald-500">({tickets.length})</span>
      </h1>

      {error && <p className="mb-4 rounded-xl border border-red-100 bg-red-50 p-3 text-red-500">{error}</p>}

      <VendorMyTicketsList initialTickets={tickets} />
    </div>
  );
}
