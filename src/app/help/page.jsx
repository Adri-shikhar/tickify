// Help & Support page (route: /help)
import PublicNavbar from "@/Components/Navbar/navbar";

export default function HelpPage() {
  return (
    <>
      <PublicNavbar />
      <main className="mx-auto max-w-7xl p-8">
        <h1 className="text-heading text-2xl font-bold">Help & Support</h1>
        <p className="text-body mt-2">
          Need help? Contact us at <strong>support@tickify.com</strong> or check the FAQ below.
        </p>
      </main>
    </>
  );
}
