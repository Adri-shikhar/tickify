"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "@/Components/Image";
import { useSession } from "@/lib/auth-client";
import { bookTicket } from "@/actions/booked";
import { fmtDate, fmtPrice } from "@/lib/format";
import { getTransportIcon, activePerkLabels } from "@/lib/transport";
import { Card } from "@heroui/react";
import Button from "@/Components/ui/Button";
import Modal from "@/Components/ui/Modal";
import Countdown from "react-countdown";

export default function BookTicketPage({ initialTicket, ticketId }) {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [ticket] = useState(initialTicket);
  const [seats, setSeats] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [departed, setDeparted] = useState(
    () =>
      initialTicket && new Date(initialTicket.departureDateTime) < new Date(),
  );

  async function handleSubmit(event) {
    event.preventDefault();

    if (!session?.user) {
      setError("Please sign in before booking.");
      return;
    }

    setLoading(true);

    const result = await bookTicket({
      ticket_id: ticketId,
      user_id: session.user.id,
      userName: session.user.name,
      userEmail: session.user.email,
      vendor_id: ticket.vendor_id,
      vendorName: ticket.vendorName,
      seatsBooked: seats,
    });

    setLoading(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    setModalOpen(false);
    router.push("/dashboard/user/my-booked-tickets");
  }

  function handleSeatChange(event) {
    const value = Number(event.target.value);
    const safeSeats = Math.min(Math.max(value, 1), ticket.quantity);
    setSeats(safeSeats);
  }

  if (ticket === null) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="font-semibold text-body">
          Ticket information could not be found.
        </p>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-transparent" />
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center p-4 md:p-8">
        <Card className="w-full max-w-4xl rounded-card border border-default bg-surface p-6 shadow-card md:p-8">
          <Card.Content className="flex flex-col items-center">
            <h1 className="text-center text-2xl font-bold text-heading">
              Please sign in to book this ticket.
            </h1>
            <Button className="mt-4" onClick={() => router.push("/sign-in")}>
              Sign In
            </Button>
          </Card.Content>
        </Card>
      </div>
    );
  }

  if (session.user.role !== "user") {
    return (
      <div className="flex min-h-[70vh] items-center justify-center p-4 md:p-8">
        <Card className="w-full max-w-4xl rounded-card border border-default bg-surface p-6 shadow-card md:p-8">
          <Card.Content>
            <h1 className="text-2xl font-bold text-heading">
              You are not authorized to book this ticket.
            </h1>
            <Button className="mt-4" onClick={() => router.push("/dashboard")}>
              Dashboard
            </Button>
          </Card.Content>
        </Card>
      </div>
    );
  }

  const activePerks = activePerkLabels(ticket.perks);
  const totalPrice = ticket.price * seats;
  const soldOut = ticket.quantity <= 0;
  const canBook = !soldOut && !departed;

  return (
    <>
      <div className="flex min-h-[70vh] items-center justify-center p-4 md:p-8">
        <Card className="w-full max-w-4xl rounded-card border border-default bg-surface p-6 shadow-card md:p-8">
          <Card.Content>
            {error && (
              <p className="mb-6 rounded-control border border-danger/30 bg-danger-soft p-3 text-sm text-danger-soft-fg">
                {error}
              </p>
            )}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="relative h-56 overflow-hidden rounded-card border border-default bg-sunken md:h-80">
                <Image
                  src={ticket.imageUrl}
                  alt={ticket.title}
                  fill
                  className="object-cover"
                  fallbackClassName="h-full w-full"
                />
              </div>

              <div className="flex flex-col gap-4">
                <div className="rounded-card border border-warning/30 bg-warning-soft p-3 text-center text-sm font-semibold text-warning-soft-fg">
                  {departed ? (
                    <span className="text-base font-bold text-danger">
                      This trip has already departed.
                    </span>
                  ) : (
                    <>
                      Time until departure:{" "}
                      {/* tabular-nums: the digits are proportional otherwise, so
                          the text visibly nudged sideways once per second */}
                      <span className="ml-1 text-base font-bold tabular-nums">
                        <Countdown
                          date={new Date(ticket.departureDateTime)}
                          onComplete={() => setDeparted(true)}
                        />
                      </span>
                    </>
                  )}
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-heading">
                      {ticket.title}
                    </h1>
                    <p className="mt-1 text-sm font-medium text-label">
                      {ticket.from} ➔ {ticket.to}
                    </p>
                  </div>
                  <span className="h-fit rounded-full bg-accent-soft px-3 py-1 text-micro font-semibold capitalize text-accent-soft-fg">
                    {getTransportIcon(ticket.transportType)} {ticket.transportType || "Bus"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 border-y border-subtle py-3 text-sm">
                  <div>
                    <span className="text-body">Price:</span>{" "}
                    <span className="font-bold text-heading">{fmtPrice(ticket.price)}</span>
                  </div>
                  <div>
                    <span className="text-body">Available:</span>{" "}
                    <span className="font-bold text-heading">{ticket.quantity}</span>
                  </div>
                </div>

                <p className="text-xs text-body">
                  <span className="font-semibold text-muted">Departure:</span>{" "}
                  {fmtDate(ticket.departureDateTime)}
                </p>

                <div className="text-xs text-body">
                  <span className="font-semibold">Perks:</span>{" "}
                  {activePerks.length ? activePerks.join(", ") : "None"}
                </div>

                {soldOut ? (
                  <Button disabled fullWidth size="lg" variant="secondary">
                    Sold Out
                  </Button>
                ) : departed ? (
                  <Button disabled fullWidth size="lg" variant="secondary">
                    Departure Passed
                  </Button>
                ) : (
                  <Button
                    fullWidth
                    size="lg"
                    onClick={() => {
                      setSeats(1);
                      setModalOpen(true);
                    }}
                  >
                    Book Now
                  </Button>
                )}
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>

      <Modal
        open={modalOpen && canBook}
        onClose={() => !loading && setModalOpen(false)}
        title={`Book ${ticket.title}`}
        description={`${ticket.from} ➔ ${ticket.to}`}
        dismissable={!loading}
      >
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="seats" className="text-micro font-semibold uppercase text-muted">
              Number of seats
            </label>
            <input
              id="seats"
              type="number"
              min="1"
              max={ticket.quantity}
              value={seats}
              onChange={handleSeatChange}
              className="input-field h-10 px-3 text-sm font-semibold"
              required
            />
            <p className="text-xs text-muted">Max available: {ticket.quantity}</p>
          </div>

          <div className="flex items-center justify-between rounded-card border border-accent/30 bg-accent-soft p-3 text-sm">
            <span className="font-semibold text-accent-soft-fg">Total:</span>
            <span className="text-xl font-bold text-accent-soft-fg">
              {fmtPrice(totalPrice)}
            </span>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="secondary"
              fullWidth
              disabled={loading}
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" fullWidth loading={loading}>
              {loading ? "Booking..." : "Confirm Booking"}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
