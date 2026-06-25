"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteTicket } from "@/actions/tickets";
import TicketCard from "@/Components/TicketCard";
import { Button } from "@heroui/react";

const statusStyle = {
  approved: "bg-emerald-50 border-emerald-200 text-emerald-600",
  accepted: "bg-emerald-50 border-emerald-200 text-emerald-600",
  rejected: "bg-red-50 border-red-200 text-red-600",
};

export default function VendorMyTicketsList({ initialTickets }) {
  const router = useRouter();
  const [tickets, setTickets] = useState(initialTickets);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deleteTitle, setDeleteTitle] = useState("");

  function openDeleteModal(ticket) {
    setDeleteId(ticket._id);
    setDeleteTitle(ticket.title);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setDeleteId("");
    setDeleteTitle("");
  }

  async function yesDelete() {
    const result = await deleteTicket(deleteId);

    if (result.error) {
      setError(result.error);
      closeModal();
      return;
    }

    setTickets(tickets.filter((t) => String(t._id) !== String(deleteId)));
    closeModal();
  }

  return (
    <>
      {error && <p className="mb-4 rounded-xl border border-red-100 bg-red-50 p-3 text-red-500">{error}</p>}

      {!tickets.length && <p className="text-gray-500">No tickets yet. Add your first ticket!</p>}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tickets.map((ticket) => {
          const isRejected = ticket.status === "rejected";

          return (
            <TicketCard
              key={String(ticket._id)}
              ticket={ticket}
              showEmail
              footer={
                <div className="flex items-center justify-between gap-4">
                  <Button
                    size="sm"
                    disabled={isRejected}
                    onClick={() => router.push(`/dashboard/vendor/my-tickets/${ticket._id}`)}
                    className="h-8 rounded-lg bg-gradient-to-r from-teal-500 to-blue-600 text-xs font-bold text-white"
                  >
                    Update
                  </Button>

                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-md border px-2.5 py-0.5 text-[10px] font-black uppercase ${
                        statusStyle[ticket.status?.toLowerCase()] ??
                        "border-amber-200 bg-amber-50 text-amber-600"
                      }`}
                    >
                      {ticket.status || "pending"}
                    </span>

                    <Button
                      size="sm"
                      variant="bordered"
                      onClick={() => openDeleteModal(ticket)}
                      className="h-8 text-xs font-bold"
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

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-bold text-gray-900">Delete ticket?</h2>
            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to delete <strong>{deleteTitle}</strong>? This cannot be undone.
            </p>

            <div className="mt-6 flex gap-3">
              <Button
                type="button"
                variant="bordered"
                onClick={closeModal}
                className="h-10 flex-1 rounded-xl text-sm font-bold"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={yesDelete}
                className="h-10 flex-1 rounded-xl bg-red-500 text-sm font-bold text-white"
              >
                Yes, Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
