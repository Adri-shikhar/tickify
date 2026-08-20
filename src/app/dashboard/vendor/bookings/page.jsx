import { getUserSession } from "@/lib/session";
import { getVendorBookings } from "@/actions/booked";
import VendorBookingsList from "@/Components/Dashboard/VendorBookingsList";

export default async function BookingsPage() {
  const session = await getUserSession();
  const vendorId = session?.user?.id;

  const res = await getVendorBookings(vendorId);
  const error = res.error || "";
  const bookings = res.error ? [] : (res.bookings ?? []);

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 p-4 sm:gap-6 sm:p-6 md:p-8">
      <div>
        <h1 className="text-xl font-black text-heading sm:text-2xl md:text-3xl">
          Requested Bookings <span className="text-accent">({bookings.length})</span>
        </h1>
        <p className="mt-1 text-sm text-body">Passenger reservations for your tickets.</p>
      </div>

      {error && (
        <p className="rounded-card border border-danger/30 bg-danger-soft p-3 text-sm font-medium text-danger-soft-fg">{error}</p>
      )}

      {!error && <VendorBookingsList initialBookings={bookings} />}
    </div>
  );
}
