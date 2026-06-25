import { redirect } from "next/navigation";
import { getUserSession } from "@/lib/session";

export default async function TicketDetailLayout({ children }) {
  const session = await getUserSession();
  if (!session) redirect("/sign-in");
  return children;
}
