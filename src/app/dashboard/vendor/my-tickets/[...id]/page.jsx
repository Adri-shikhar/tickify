"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Card, Button } from "@heroui/react";
import { getTicket, updateTicket } from "@/actions/tickets";

const PERKS = ["ac", "wifi", "food", "tv", "chargingPort", "breakfast"];

export default function EditTicketPage() {
  const params = useParams();
  const router = useRouter();
  const ticketId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTicket(ticketId).then((result) => {
      if (result.error) setError(result.error);
      else setTicket(result.ticket);
    });
  }, [ticketId]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);

    const result = await updateTicket(ticketId, {
      title: form.get("title"),
      from: form.get("from"),
      to: form.get("to"),
      transportType: form.get("transportType"),
      price: Number(form.get("price")),
      quantity: Number(form.get("quantity")),
      departureDateTime: form.get("departureDateTime"),
      imageUrl: form.get("imageUrl") || "",
      perks: Object.fromEntries(PERKS.map((p) => [p, form.get(p) === "on"])),
    });

    setLoading(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    router.push("/dashboard/vendor/my-tickets");
  }

  const inputClass = "h-10 w-full rounded-lg bg-gray-100 px-3 text-sm outline-none";

  if (!ticket && !error) {
    return <p className="p-8 text-gray-500">Loading ticket...</p>;
  }

  if (!ticket) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500">{error || "Ticket not found"}</p>
        <Link href="/dashboard/vendor/my-tickets" className="mt-4 inline-block text-blue-600 underline">
          Back to My Tickets
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-full items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-xl rounded-xl border p-6 shadow-md">
        <Card.Content className="flex flex-col gap-5">
          <h1 className="text-center text-2xl font-bold text-cyan-600">Update Ticket</h1>

          {error && (
            <p className="rounded-lg border border-red-100 bg-red-50 p-2 text-center text-sm text-red-500">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input name="title" required defaultValue={ticket.title} placeholder="Ticket Title" className={inputClass} />

            <div className="grid grid-cols-2 gap-4">
              <input name="from" required defaultValue={ticket.from} placeholder="From (city)" className={inputClass} />
              <input name="to" required defaultValue={ticket.to} placeholder="To (city)" className={inputClass} />
            </div>

            <select name="transportType" required defaultValue={ticket.transportType} className={inputClass}>
              <option value="bus">Bus</option>
              <option value="train">Train</option>
              <option value="flight">Flight</option>
            </select>

            <div className="grid grid-cols-2 gap-4">
              <input name="price" type="number" required min="0" defaultValue={ticket.price} placeholder="Price (৳)" className={inputClass} />
              <input name="quantity" type="number" required min="1" defaultValue={ticket.quantity} placeholder="Total Seats" className={inputClass} />
            </div>

            <input
              name="departureDateTime"
              type="datetime-local"
              required
              defaultValue={ticket.departureDateTime}
              className={inputClass}
            />

            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
              {PERKS.map((p) => (
                <label key={p} className="flex items-center gap-2 capitalize">
                  <input type="checkbox" name={p} defaultChecked={ticket.perks?.[p]} />
                  {p.replace(/([A-Z])/g, " $1")}
                </label>
              ))}
            </div>

            <input
              name="imageUrl"
              type="url"
              defaultValue={ticket.imageUrl || ""}
              placeholder="Image URL (optional)"
              className={inputClass}
            />

            <Button
              type="submit"
              disabled={loading}
              className="h-10 w-full rounded-lg bg-gradient-to-r from-emerald-400 to-blue-600 font-bold text-gray-950"
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>

            <Link href="/dashboard/vendor/my-tickets" className="text-center text-sm text-gray-500 underline">
              Cancel
            </Link>
          </form>
        </Card.Content>
      </Card>
    </div>
  );
}
