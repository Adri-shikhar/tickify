"use client";

import React, { useState } from "react";
import { Card, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { createTicket } from "@/actions/tickets";

export default function AddTicketsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!session?.user?.id) {
      setError("You must be signed in as a vendor.");
      setLoading(false);
      return;
    }

    const formData = new FormData(e.currentTarget);

    const result = await createTicket({
      title: formData.get("title"),
      from: formData.get("from"),
      to: formData.get("to"),
      transportType: formData.get("transportType"),
      price: Number(formData.get("price")),
      quantity: Number(formData.get("quantity")),
      departureDateTime: formData.get("departureDateTime"),
      imageUrl: formData.get("imageUrl") || "",
      vendor_id: session?.user?.id,
      vendorName: session?.user?.name,
      vendorEmail: session?.user?.email,
      perks: {
        ac: formData.get("ac") === "on",
        wifi: formData.get("wifi") === "on",
        food: formData.get("food") === "on",
        tv: formData.get("tv") === "on",
        chargingPort: formData.get("chargingPort") === "on",
        breakfast: formData.get("breakfast") === "on",
      },
    });

    setLoading(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    router.push("/dashboard/vendor/my-tickets");
  };

  return (
    <div className="flex min-h-full items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-xl rounded-xl border border-gray-100 bg-white p-6 shadow-md">
        <Card.Content className="flex flex-col gap-5">
          <h1 className="text-center text-2xl font-bold text-cyan-600">Add New Ticket</h1>

          {error && (
            <p className="rounded-lg border border-red-100 bg-red-50 py-2 text-center text-sm text-red-500">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              name="title"
              type="text"
              required
              placeholder="Ticket Title"
              className="h-10 w-full rounded-lg bg-gray-100 px-3 text-sm outline-none"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                name="from"
                type="text"
                required
                placeholder="From (Location)"
                className="h-10 w-full rounded-lg bg-gray-100 px-3 text-sm outline-none"
              />
              <input
                name="to"
                type="text"
                required
                placeholder="To (Location)"
                className="h-10 w-full rounded-lg bg-gray-100 px-3 text-sm outline-none"
              />
            </div>

            <select
              name="transportType"
              required
              defaultValue=""
              className="h-10 w-full rounded-lg bg-gray-100 px-3 text-sm text-gray-500 outline-none"
            >
              <option value="" disabled>
                Select Transport Type
              </option>
              <option value="bus">Bus</option>
              <option value="train">Train</option>
              <option value="flight">Flight</option>
            </select>

            <div className="grid grid-cols-2 gap-4">
              <input
                name="price"
                type="number"
                required
                min="0"
                placeholder="Price (per unit)"
                className="h-10 w-full rounded-lg bg-gray-100 px-3 text-sm outline-none"
              />
              <input
                name="quantity"
                type="number"
                required
                min="1"
                placeholder="Ticket Quantity"
                className="h-10 w-full rounded-lg bg-gray-100 px-3 text-sm outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-700">Departure Date & Time</label>
              <input
                name="departureDateTime"
                type="datetime-local"
                required
                className="h-10 w-full rounded-lg bg-gray-100 px-3 text-sm text-gray-600 outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-700">Perks</label>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="ac" /> AC
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="wifi" /> WiFi
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="food" /> Food
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="tv" /> TV
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="chargingPort" /> Charging Port
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="breakfast" /> Breakfast
                </label>
              </div>
            </div>

            <input
              name="imageUrl"
              type="url"
              placeholder="Image URL"
              className="h-10 w-full rounded-lg bg-gray-100 px-3 text-sm outline-none"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                readOnly
                value={session?.user?.name ?? "Vendor"}
                className="h-10 w-full cursor-not-allowed rounded-lg bg-gray-100 px-3 text-sm text-gray-500 outline-none"
              />
              <input
                type="email"
                readOnly
                value={session?.user?.email ?? ""}
                className="h-10 w-full cursor-not-allowed rounded-lg bg-gray-100 px-3 text-sm text-gray-500 outline-none"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="mt-2 h-10 w-full rounded-lg bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-600 text-sm font-bold text-gray-950 shadow-sm hover:opacity-90"
            >
              {loading ? "Adding..." : "Add Ticket"}
            </Button>
          </form>
        </Card.Content>
      </Card>
    </div>
  );
}
