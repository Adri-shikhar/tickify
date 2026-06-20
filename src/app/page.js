// Landing page (route: /)
import PublicNavbar from "@/Components/Navbar/navbar";

export default function LandingPage() {
  return (
    <>
      <PublicNavbar />
      <main className="min-h-screen p-8">
        <h1 className="text-heading">Welcome to Tickify</h1>
      </main>
    </>
  );
}
