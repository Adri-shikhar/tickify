import AdminAdvertiseList from "@/Components/Dashboard/AdminAdvertiseList";

export default async function AdvertiseTicketsPage() {
  const token = await getToken();
  console.log("token", token);
  return (
    <div className="mx-auto w-full max-w-5xl p-4 sm:p-6 md:p-8">
      <h1 className="mb-2 text-xl font-black text-gray-900 sm:text-2xl md:text-3xl">Advertise Tickets</h1>
      <p className="mb-6 text-sm text-gray-500 sm:mb-8">
        Pick up to 6 approved tickets to show on the home page advertisement section.
      </p>

      <AdminAdvertiseList />
    </div>
  );
}
