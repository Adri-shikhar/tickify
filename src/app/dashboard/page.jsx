import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getDashboardPath } from "@/lib/dashboard";

// Server-side redirect — instantly bounces to the correct role dashboard
export default async function DashboardRedirectPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) redirect("/sign-in");

  redirect(getDashboardPath(session.user?.role));
}
