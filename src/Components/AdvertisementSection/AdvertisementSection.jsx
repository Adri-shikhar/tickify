import { getAdvertisedTickets } from "@/actions/tickets";
import AdvertisementGrid from "./AdvertisementGrid";

export default async function AdvertisementSection() {
  const result = await getAdvertisedTickets();
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
    return <p className="text-center text-gray-500">No featured tickets right now.</p>;
  }

  return <AdvertisementGrid tickets={tickets} />;
}
