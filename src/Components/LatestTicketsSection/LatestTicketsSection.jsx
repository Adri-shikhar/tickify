import { getLatestTickets } from "@/actions/tickets";
import LatestTicketsGrid from "./LatestTicketsGrid";

export default async function LatestTicketsSection() {
  const result = await getLatestTickets();
  const error = result.error || "";
  const tickets = result.error ? [] : (result.tickets ?? []);

  if (error) {
    return (
      <p className="rounded-xl border border-red-100 bg-red-50 p-4 text-center text-sm text-red-500">
        {error}
      </p>
    );
  }

  if (!tickets.length) {
    return <p className="text-center text-gray-500">No tickets available yet.</p>;
  }

  return <LatestTicketsGrid tickets={tickets} />;
}
