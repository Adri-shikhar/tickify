import { verifyUser } from "@/lib/session";

export default async function UserLayout({ children }) {
  await verifyUser("user");
  return children;
}
