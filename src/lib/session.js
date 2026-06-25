import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function getUserSession(requestHeaders) {
  return auth.api.getSession({
    headers: requestHeaders ?? (await headers()),
  });
  
}

export async function verifyUser(role) {
  const session = await getUserSession();
  const userRole = session?.user?.role ?? "user";

  if (!session) redirect("/sign-in");
  if (userRole !== role) redirect("/unauthorized");
}
