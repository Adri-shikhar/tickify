"use client";

const inputClass =
  "w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-400";

export default function TicketSearchForm({ from, to, type, sort }) {
  const submitForm = (e) => e.currentTarget.form?.requestSubmit();

  return (
    <form
      action="/all-tickets"
      method="GET"
      className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
    >
      <input
        name="from"
        defaultValue={from}
        placeholder="Search From (Location)"
        className={inputClass}
      />

      <input
        name="to"
        defaultValue={to}
        placeholder="Search To (Location)"
        className={inputClass}
      />

      <select name="type" defaultValue={type} onChange={submitForm} className={inputClass}>
        <option value="">All Transport Types</option>
        <option value="bus">Bus</option>
        <option value="train">Train</option>
        <option value="launch">Launch</option>
        <option value="flight">Flight</option>
      </select>

      <select name="sort" defaultValue={sort} onChange={submitForm} className={inputClass}>
        <option value="">Sort by Price</option>
        <option value="price">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </form>
  );
}
