import PublicNavbar from "@/Components/Navbar/navbar";

export default function AboutPage() {
  return (
    <>
      <PublicNavbar />
      <main className="mx-auto max-w-7xl p-8">
        <h1 className="text-heading text-2xl font-bold">About</h1>
        <p className="text-body mt-2">Learn more about Tickify.</p>
      </main>
    </>
  );
}
