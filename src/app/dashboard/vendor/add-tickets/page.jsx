"use client";

// Add Tickets page (route: /dashboard/vendor/add-tickets) — form to create a new ticket
import { useState } from "react";
import { Card, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { createTicket } from "@/actions/tickets";

const PERKS = ["ac", "wifi", "food", "tv", "chargingPort", "breakfast"];

export default function AddTicketsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session?.user?.id) { setError("You must be signed in as a vendor."); return; }

    setLoading(true);
    const form = new FormData(e.currentTarget);

    const result = await createTicket({
      title: form.get("title"),
      from: form.get("from"),
      to: form.get("to"),
      transportType: form.get("transportType"),
      price: Number(form.get("price")),
      quantity: Number(form.get("quantity")),
      departureDateTime: form.get("departureDateTime"),
      imageUrl: form.get("imageUrl") || "",
      vendor_id: session.user.id,
      vendorName: session.user.name,
      vendorEmail: session.user.email,
      // Build { ac: true, wifi: false, ... } from the checkboxes
      perks: Object.fromEntries(PERKS.map((p) => [p, form.get(p) === "on"])),
    });

    setLoading(false);
    if (result.error) setError(result.error);
    else router.push("/dashboard/vendor/my-tickets");
  };

  const inputClass = "h-10 w-full rounded-lg bg-gray-100 px-3 text-sm outline-none";

  return (
    <div className="flex min-h-full items-center justify-center bg-gray-50 p-4 sm:p-6">
      <Card className="w-full max-w-xl rounded-xl border p-4 shadow-md sm:p-6">
        <Card.Content className="flex flex-col gap-5">
          <h1 className="text-center text-2xl font-bold text-cyan-600">Add New Ticket</h1>

          {error && <p className="rounded-lg border border-red-100 bg-red-50 p-2 text-center text-sm text-red-500">{error}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input name="title" required placeholder="Ticket Title" className={inputClass} />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input name="from" required placeholder="From (city)" className={inputClass} />
              <input name="to" required placeholder="To (city)" className={inputClass} />
            </div>

            <select name="transportType" required defaultValue="" className={inputClass}>
              <option value="" disabled>Select Transport Type</option>
              <option value="bus">Bus</option>
              <option value="train">Train</option>
              <option value="flight">Flight</option>
            </select>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input name="price" type="number" required min="0" placeholder="Price (tk)" className={inputClass} />
              <input name="quantity" type="number" required min="1" placeholder="Total Seats" className={inputClass} />
            </div>

            <input name="departureDateTime" type="datetime-local" required className={inputClass} />

            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
              {PERKS.map((p) => (
                <label key={p} className="flex items-center gap-2 capitalize">
                  <input type="checkbox" name={p} />
                  {p.replace(/([A-Z])/g, " $1")} {/* "chargingPort" → "charging Port" */}
                </label>
              ))}
            </div>

            <input name="imageUrl" type="url" placeholder="Image URL (optional)" className={inputClass} />

            <Button type="submit" disabled={loading} className="h-10 w-full rounded-lg bg-gradient-to-r from-emerald-400 to-blue-600 font-bold text-gray-950">
              {loading ? "Adding..." : "Add Ticket"}
            </Button>
          </form>
        </Card.Content>
      </Card>
    </div>
  );
}
