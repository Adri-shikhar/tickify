import { verifyUser } from "@/lib/session";

export default async function VendorLayout({ children }) {
  await verifyUser("vendor");
  return children;
}
