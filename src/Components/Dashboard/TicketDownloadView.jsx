"use client";

import Link from "next/link";
import { fmtPrice } from "@/lib/format";

function cityCode(city) {
  if (!city) return "— — —";
  return city
    .replace(/[^a-zA-Z]/g, "")
    .slice(0, 3)
    .toUpperCase()
    .split("")
    .join(" ");
}

function fmtDateShort(val) {
  if (!val) return "--/--/----";
  const d = new Date(val);
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
}

function fmtTime(val) {
  if (!val) return "--:--";
  return new Date(val).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function ticketNo(id) {
  const s = String(id || "").replace(/\D/g, "").slice(-10).padStart(10, "0");
  return `ETKT ${s.slice(0, 3)} ${s.slice(3)}`;
}

function Barcode() {
  const bars = [3, 1, 2, 1, 3, 2, 1, 4, 1, 2, 3, 1, 2, 4, 1, 3, 2, 1, 2, 3, 1, 4, 2, 1];
  return (
    <div className="flex h-full min-h-[140px] items-stretch gap-px bg-white px-1 py-3">
      {bars.map((w, i) => (
        <div key={i} className="bg-black" style={{ width: `${w}px` }} />
      ))}
    </div>
  );
}

function BoardingHeader() {
  return (
    <div className="flex items-center justify-between bg-[#2a9fd8] px-3 py-2 text-white sm:px-4">
      <div className="flex items-center gap-2">
        <span className="text-lg">✈</span>
        <span className="text-sm font-semibold italic sm:text-base">Tickify</span>
      </div>
      <span className="text-[10px] font-bold tracking-widest sm:text-xs">BOARDING PASS</span>
    </div>
  );
}

function Field({ label, value, className = "" }) {
  return (
    <div className={className}>
      <p className="text-[9px] uppercase text-gray-500 sm:text-[10px]">{label}</p>
      <p className="text-[11px] font-bold uppercase text-gray-900 sm:text-xs">{value}</p>
    </div>
  );
}

export default function TicketDownloadView({ booking }) {
  const id = String(booking._id);
  const seatLabel = String(booking.seatsBooked || 1).padStart(1, "0") + "A";
  const platform = `P${(id.charCodeAt(id.length - 1) % 18) + 1}`;

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-4 p-4 sm:p-6">
      <h1 className="text-center text-xl font-bold print:hidden">Your E-Ticket</h1>

      <div
        id="ticket-print"
        className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl"
      >
        {/* Header */}
        <div className="flex">
          <div className="min-w-0 flex-1">
            <BoardingHeader />
          </div>
          <div className="hidden w-[30%] border-l border-[#2389be] sm:block">
            <BoardingHeader />
          </div>
        </div>

        {/* Body */}
        <div className="flex">
          {/* Main ticket */}
          <div className="relative min-w-0 flex-1">
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.06]">
              <span className="text-[120px]">✈</span>
            </div>

            <div className="relative flex">
              <div className="hidden shrink-0 border-r border-gray-200 sm:block">
                <Barcode />
              </div>

              <div className="flex-1 space-y-3 p-3 sm:p-4">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <Field label="Name of passenger" value={booking.userName || "—"} />
                  <Field label="Carrier" value={booking.vendorName || "Tickify"} />
                  <Field label="Trip" value={booking.ticketTitle || "—"} className="sm:col-span-2" />
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                  <Field label="From" value={`${booking.from} ${cityCode(booking.from)}`} />
                  <Field label="To" value={`${booking.to} ${cityCode(booking.to)}`} />
                  <Field label="Date" value={fmtDateShort(booking.departureDateTime)} />
                  <Field label="Seats" value={booking.seatsBooked} />
                  <Field label="Paid" value={fmtPrice(booking.totalPrice)} />
                </div>

                <div className="flex flex-wrap items-end justify-between gap-4 border-t border-dashed border-gray-200 pt-3">
                  <div className="flex gap-6 sm:gap-10">
                    <div>
                      <p className="text-[10px] font-bold uppercase text-gray-500">Platform</p>
                      <p className="text-2xl font-black text-[#2a9fd8] sm:text-3xl">{platform}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase text-gray-500">Departure Time</p>
                      <p className="text-2xl font-black text-[#2a9fd8] sm:text-3xl">
                        {fmtTime(booking.departureDateTime)}
                      </p>
                    </div>
                  </div>
                  <p className="text-[10px] font-medium text-gray-500">{ticketNo(booking._id)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stub */}
          <div className="hidden w-[30%] flex-col border-l border-dashed border-gray-300 bg-gray-50/50 sm:flex">
            <div className="flex flex-1 flex-col justify-between p-3 text-[10px] sm:p-4">
              <div className="space-y-2">
                <Field label="Name of passenger" value={booking.userName || "—"} />
                <Field label="From" value={`${booking.from} ${cityCode(booking.from)}`} />
                <Field label="To" value={`${booking.to} ${cityCode(booking.to)}`} />
                <p className="pt-1 text-[9px] text-gray-500">{ticketNo(booking._id)}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 border-t border-gray-200 pt-3">
                <Field label="Seat" value={seatLabel} />
                <Field label="Date" value={fmtDateShort(booking.departureDateTime)} />
                <div>
                  <p className="text-[9px] font-bold uppercase text-gray-500">Platform</p>
                  <p className="text-lg font-black text-[#2a9fd8]">{platform}</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase text-gray-500">Departure</p>
                  <p className="text-lg font-black text-[#2a9fd8]">{fmtTime(booking.departureDateTime)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="h-3 bg-[#2a9fd8] sm:h-4" />
      </div>

      <p className="text-center text-xs font-semibold text-emerald-600 print:hidden">✓ Paid & Confirmed</p>

      <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm text-gray-700 print:hidden">
        <p className="font-bold text-blue-800">How to download:</p>
        <ol className="mt-2 list-inside list-decimal space-y-1">
          <li>Click <strong>Save as PDF</strong> below</li>
          <li>Set <strong>Destination</strong> to <strong>Save as PDF</strong></li>
          <li>Click <strong>Save</strong></li>
        </ol>
      </div>

      <button
        type="button"
        onClick={() => window.print()}
        className="rounded-lg bg-[#2a9fd8] py-3 font-bold text-white print:hidden hover:bg-[#2389be]"
      >
        Save as PDF
      </button>

      <Link
        href="/dashboard/user/my-booked-tickets"
        className="text-center text-sm text-gray-500 underline print:hidden"
      >
        Back to My Bookings
      </Link>
    </div>
  );
}
