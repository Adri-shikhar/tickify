"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteTicket } from "@/actions/tickets";
import TicketCard from "@/Components/TicketCard";
import Button from "@/Components/ui/Button";
import StatusBadge from "@/Components/ui/StatusBadge";
import ConfirmDialog from "@/Components/ui/ConfirmDialog";
import EmptyState from "@/Components/ui/EmptyState";

export default function VendorMyTicketsList({ initialTickets }) {
  const router = useRouter();
  const [tickets, setTickets] = useState(initialTickets);
  const [error, setError] = useState("");
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  async function confirmDelete() {
    if (!pendingDelete) return;

    setDeleting(true);
    const result = await deleteTicket(pendingDelete._id);
    setDeleting(false);

    if (result.error) {
      setError(result.error);
      setPendingDelete(null);
      return;
    }

    setTickets(tickets.filter((t) => String(t._id) !== String(pendingDelete._id)));
    setPendingDelete(null);
  }

  return (
    <>
      {error && (
        <p className="mb-4 rounded-card border border-danger/30 bg-danger-soft p-3 text-danger-soft-fg">
          {error}
        </p>
      )}

      {!tickets.length ? (
        <EmptyState
          icon="🎫"
          title="No tickets yet"
          description="Add your first trip and it will appear here once an admin approves it."
          actionLabel="Add a ticket"
          actionHref="/dashboard/vendor/add-tickets"
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tickets.map((ticket) => {
            const isRejected = ticket.status === "rejected";

            return (
              <TicketCard
                key={String(ticket._id)}
                ticket={ticket}
                showEmail
                footer={
                  <div className="flex items-center justify-between gap-3">
                    <Button
                      size="sm"
                      disabled={isRejected}
                      onClick={() => router.push(`/dashboard/vendor/my-tickets/${ticket._id}`)}
                    >
                      Update
                    </Button>

                    <div className="flex items-center gap-2">
                      <StatusBadge status={ticket.status} />
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setPendingDelete(ticket)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                }
              />
            );
          })}
        </div>
      )}

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        onClose={() => setPendingDelete(null)}
        onConfirm={confirmDelete}
        loading={deleting}
        title="Delete this ticket?"
        description={
          pendingDelete
            ? `"${pendingDelete.title}" will be removed permanently. This cannot be undone.`
            : ""
        }
        confirmLabel="Yes, delete"
      />
    </>
  );
}
