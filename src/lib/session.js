import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

// Wrapped in React cache() so a layout, its page, and any server actions they
// call share ONE session lookup per render pass instead of three or four.
// Note this cannot help the proxy: Next runs proxy.js as a separate invocation
// with no React render scope, so that one is always its own call.
export const getUserSession = cache(async (requestHeaders) => {
  return auth.api.getSession({
    headers: requestHeaders ?? (await headers()),
  });
});

export async function verifyUser(role) {
  const session = await getUserSession();
  const userRole = session?.user?.role ?? "user";

  if (!session) redirect("/sign-in");
  if (userRole !== role) redirect("/unauthorized");

  return session;
}
