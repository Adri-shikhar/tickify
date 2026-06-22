"use client";

// Renders the sidebar and protects dashboard routes based on the user's role
import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "@/Components/Logo";
import DarkModeToggle from "@/Components/DarkModeToggle";
import { authClient, useSession } from "@/lib/auth-client";
import { getDashboardPath, logoutBtn, themes, adminLinks, userLinks, vendorLinks } from "@/lib/dashboard";
import { sidebarIcons } from "@/Components/Dashboard/sidebar-icons";

function roleFromPath(pathname) {
  if (pathname.startsWith("/dashboard/admin")) return "admin";
  if (pathname.startsWith("/dashboard/vendor")) return "vendor";
  if (pathname.startsWith("/dashboard/user")) return "user";
  return null;
}

export default function DashboardLayout({ children }) {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const role = roleFromPath(pathname);

  useEffect(() => {
    if (isPending || !role) return;
    if (!session) { router.replace("/sign-in"); return; }

    const userRole = session.user?.role;
    if (userRole !== role) router.replace(getDashboardPath(userRole));
  }, [isPending, session, router, role]);

  if (!role) return children;

  const theme = themes[role];
  const links = role === "admin" ? adminLinks : role === "vendor" ? vendorLinks : userLinks;
  const showIcons = role === "admin";

  if (isPending) {
    return (
      <div className={`flex min-h-screen items-center justify-center ${theme.main}`}>
        <div className={`h-8 w-8 animate-spin rounded-full border-4 border-t-transparent ${theme.spinner}`} />
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className={`flex h-screen overflow-hidden ${theme.main}`}>
      <aside className={`sticky top-0 flex h-full w-64 shrink-0 flex-col ${theme.sidebar}`}>
        <div className={`h-1 ${theme.accentBar}`} />

        <div className={`px-6 py-5 ${theme.sidebarBorder}`}>
          <div className="flex items-center justify-between gap-3">
            <Logo href="/" />
            <DarkModeToggle />
          </div>
          <p className={`mt-2 text-[11px] font-bold uppercase tracking-widest ${theme.panelLabel}`}>
            {role} Panel
          </p>
        </div>

        <nav className="flex flex-1 flex-col gap-1.5 px-4 py-6">
          {links.map(({ href, label, icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${isActive ? theme.active : theme.inactive}`}
              >
                {showIcons && icon && sidebarIcons[icon]}
                {label}
              </Link>
            );
          })}
        </nav>

        <div className={`border-t p-4 ${theme.sidebarBorder}`}>
          <button
            type="button"
            onClick={async () => { await authClient.signOut(); router.push("/sign-in"); }}
            className={`w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${logoutBtn}`}
          >
            Log Out
          </button>
        </div>
      </aside>

      <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
