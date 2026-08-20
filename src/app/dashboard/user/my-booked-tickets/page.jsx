import { getUserSession } from "@/lib/session";
import { getUserBookings } from "@/actions/booked";
import UserBookedTicketsList from "@/Components/Dashboard/UserBookedTicketsList";

export default async function MyBookedTicketsPage() {
  const session = await getUserSession();
  const userId = session?.user?.id;

  const res = await getUserBookings(userId);
  const error = res.error || "";
  const bookings = res.error ? [] : (res.bookings ?? []);

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 p-4 sm:gap-6 sm:p-6 md:p-8">
      <div>
        <h1 className="text-xl font-black tracking-tight text-heading sm:text-2xl md:text-3xl">
          My Booked Tickets <span className="text-success">({bookings.length})</span>
        </h1>
        <p className="mt-1 text-sm text-body">
          Track and process payments for your active trip reservations.
        </p>
      </div>

      {error && (
        <p className="rounded-card border border-danger/30 bg-danger-soft p-3 text-sm font-medium text-danger-soft-fg">
          {error}
        </p>
      )}

      {!error && <UserBookedTicketsList bookings={bookings} />}
    </div>
  );
}
