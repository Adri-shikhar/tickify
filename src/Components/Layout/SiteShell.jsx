"use client";

import { usePathname } from "next/navigation";
import PublicNavbar from "@/Components/Navbar/navbar";
import Footer from "@/Components/Footer/footer";

export default function SiteShell({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  if (isDashboard) return children;

  return (
    <>
      <PublicNavbar />
      <main className="flex-1 page-bg">{children}</main>
      <Footer />
    </>
  );
}
