// All Tickets page (route: /all-tickets) — shows all approved tickets
import { getTickets } from "@/actions/tickets";
import TicketGrid from "@/Components/TicketGrid";
import TicketSearchForm from "@/Components/TicketSearchForm";
import TicketPagination from "./TicketPagination";

const PER_PAGE = 5;
const isApproved = (t) =>
  ["approved", "accepted"].includes(t.status?.toLowerCase());
export default async function AllTicketsPage({ searchParams }) {
  const params = await searchParams;

  const from = params.from || "";
  const to = params.to || "";
  const type = params.type || "";
  const sort = params.sort || "";

  const res = await getTickets();
  const error = res.error || "";

  let tickets = res.error ? [] : (res.tickets ?? []).filter(isApproved);

  if (from) {
    tickets = tickets.filter((t) =>
      t.from?.toLowerCase().includes(from.toLowerCase()),
    );
  }

  if (to) {
    tickets = tickets.filter((t) =>
      t.to?.toLowerCase().includes(to.toLowerCase()),
    );
  }

  if (type) {
    tickets = tickets.filter(
      (t) => t.transportType?.toLowerCase() === type.toLowerCase(),
    );
  }

  if (sort === "price") {
    tickets = [...tickets].sort((a, b) => Number(a.price) - Number(b.price));
  } else if (sort === "price-desc") {
    tickets = [...tickets].sort((a, b) => Number(b.price) - Number(a.price));
  }

  const totalTickets = tickets.length;
  const totalPages = Math.max(1, Math.ceil(totalTickets / PER_PAGE));
  const page = Math.min(Math.max(1, Number(params.page) || 1), totalPages);
  const start = (page - 1) * PER_PAGE;
  const paginatedTickets = tickets.slice(start, start + PER_PAGE);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="mb-6 text-2xl font-black text-gray-900">
        Available Tickets{" "}
        <span className="text-emerald-500">({totalTickets})</span>
      </h1>

      <TicketSearchForm from={from} to={to} type={type} sort={sort} />

      {error && (
        <p className="mb-4 rounded-xl border border-red-100 bg-red-50 p-3 text-red-500">
          {error}
        </p>
      )}

      {!error && !totalTickets && (
        <p className="text-gray-500">No tickets available right now.</p>
      )}

      {!error && totalTickets > 0 && (
        <>
          <p className="mb-4 text-sm text-gray-500">
            Showing {start + 1}–{Math.min(start + PER_PAGE, totalTickets)} of {totalTickets}
          </p>
          <TicketGrid tickets={paginatedTickets} />
          <TicketPagination
            page={page}
            totalPages={totalPages}
            from={from}
            to={to}
            type={type}
            sort={sort}
          />
        </>
      )}
    </div>
  );
}
