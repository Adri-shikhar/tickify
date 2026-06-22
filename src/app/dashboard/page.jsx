"use client";

// Dashboard redirect page (route: /dashboard) — redirects to /dashboard/vendor or /dashboard/user based on role

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { getDashboardPath } from "@/lib/dashboard";

export default function DashboardRedirectPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (isPending) return;
    if (!session) { router.replace("/sign-in"); return; }
    router.replace(getDashboardPath(session.user?.role));
  }, [isPending, session, router]);

  return (
    <div className="page-bg flex min-h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-500 border-t-transparent" />
    </div>
  );
}
