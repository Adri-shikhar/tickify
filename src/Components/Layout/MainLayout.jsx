import PublicNavbar from "@/Components/Navbar/navbar";
import Footer from "@/Components/Footer/footer";

export default function MainLayout({ children }) {
  return (
    <>
      <PublicNavbar />
      <main className="flex-1 page-bg">{children}</main>
      <Footer />
    </>
  );
}
