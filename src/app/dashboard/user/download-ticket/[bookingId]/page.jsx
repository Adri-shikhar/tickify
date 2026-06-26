import Link from "next/link";
import { redirect } from "next/navigation";
import { getBooking } from "@/actions/booked";
import { getUserSession } from "@/lib/session";
import TicketDownloadView from "@/Components/Dashboard/TicketDownloadView";

export default async function DownloadTicketPage({ params }) {
  const { bookingId } = await params;
  const session = await getUserSession();

  if (!session?.user?.id) redirect("/sign-in");

  const { booking, error } = await getBooking(bookingId);

  if (error || !booking) {
    return (
      <p className="p-8 text-center text-red-500">
        Ticket not found.{" "}
        <Link href="/dashboard/user/my-booked-tickets" className="underline">
          Go back
        </Link>
      </p>
    );
  }

  if (String(booking.user_id) !== String(session.user.id)) redirect("/unauthorized");

  if (booking.status !== "paid") {
    return (
      <p className="p-8 text-center text-amber-600">
        Pay first to download.{" "}
        <Link href="/dashboard/user/my-booked-tickets" className="underline">
          My Bookings
        </Link>
      </p>
    );
  }

  return <TicketDownloadView booking={booking} />;
}
