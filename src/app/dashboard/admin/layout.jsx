import { verifyUser } from "@/lib/session";

export default async function AdminLayout({ children }) {
  await verifyUser("admin");
  return children;
}
