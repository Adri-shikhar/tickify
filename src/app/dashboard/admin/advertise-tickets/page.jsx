import { getTicketsAdmin } from "@/actions/tickets";
import AdminAdvertiseList from "@/Components/Dashboard/AdminAdvertiseList";

export default async function AdvertiseTicketsPage() {
  const res = await getTicketsAdmin();
  const tickets = res.error ? [] : (res.tickets ?? []);

  return (
    <div className="mx-auto w-full max-w-5xl p-4 sm:p-6 md:p-8">
      <h1 className="mb-2 text-xl font-black text-heading sm:text-2xl md:text-3xl">Advertise Tickets</h1>
      <p className="mb-6 text-sm text-body sm:mb-8">
        Pick up to 6 approved tickets to show on the home page advertisement section.
      </p>

      {res.error && (
        <p className="mb-4 rounded-control bg-danger-soft p-3 text-sm text-danger-soft-fg">{res.error}</p>
      )}

      <AdminAdvertiseList initialTickets={tickets} />
    </div>
  );
}
