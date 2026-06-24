import { getTicket } from "@/actions/tickets";
import BookTicketPage from "@/Components/BookTicketPage";

export default async function Page({ params }) {
  const { id } = await params;

  const result = await getTicket(id);

  let ticketData = null;
  if (!result.error) {
    ticketData = result.ticket;
  }

  return <BookTicketPage initialTicket={ticketData} ticketId={id} />;
}
