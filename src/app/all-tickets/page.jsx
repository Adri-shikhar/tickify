import PublicNavbar from "@/Components/Navbar/navbar";

export default function AllTicketsPage() {
  return (
    <>
      <PublicNavbar />
      <main className="mx-auto max-w-7xl flex-1 px-4 py-8 sm:px-6">
        <h1 className="text-heading text-2xl font-semibold">All Tickets</h1>
        <p className="text-body mt-2">Browse and manage every ticket in one place.</p>
      </main>
    </>
  );
}
