import AdminAdvertiseList from "@/Components/Dashboard/AdminAdvertiseList";

export default function AdvertiseTicketsPage() {
  return (
    <div className="mx-auto max-w-5xl p-8">
      <h1 className="mb-2 text-3xl font-black text-gray-900">Advertise Tickets</h1>
      <p className="mb-8 text-sm text-gray-500">
        Pick up to 6 approved tickets to show on the home page advertisement section.
      </p>

      <AdminAdvertiseList />
    </div>
  );
}
