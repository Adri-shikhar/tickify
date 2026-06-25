import Link from "next/link";
import { getTicket } from "@/actions/tickets";
import EditTicketForm from "@/Components/Dashboard/EditTicketForm";

export default async function EditTicketPage({ params }) {
  const { id: idParam } = await params;
  const ticketId = Array.isArray(idParam) ? idParam[0] : idParam;

  const result = await getTicket(ticketId);

  if (result.error || !result.ticket) {
    return (
      <div className="p-4 text-center sm:p-6 md:p-8">
        <p className="text-red-500">{result.error || "Ticket not found"}</p>
        <Link href="/dashboard/vendor/my-tickets" className="mt-4 inline-block text-blue-600 underline">
          Back to My Tickets
        </Link>
      </div>
    );
  }

  return <EditTicketForm ticket={result.ticket} ticketId={ticketId} />;
}
