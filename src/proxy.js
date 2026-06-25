import { NextResponse } from "next/server";
import { getRoleFromPath } from "./lib/dashboard";
import { getUserSession } from "./lib/session";

export async function proxy(request) {
  const pathname = request.nextUrl.pathname;

  // Ticket detail is private; list (/all-tickets) and success stay public
  if (
    pathname.startsWith("/all-tickets/") &&
    !pathname.startsWith("/all-tickets/success")
  ) {
    const session = await getUserSession(request.headers);
    if (!session) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    return NextResponse.next();
  }

  const requiredRole = getRoleFromPath(pathname);
  if (!requiredRole) {
    return NextResponse.next();
  }

  const session = await getUserSession(request.headers);

  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  const userRole = session.user?.role ?? "user";
  if (userRole !== requiredRole) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/all-tickets/:path*"],
};
