"use client";

// Renders the sidebar and protects dashboard routes based on the user's role
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "@/Components/Logo";
import DarkModeToggle from "@/Components/DarkModeToggle";
import { authClient, useSession } from "@/lib/auth-client";
import {
  logoutBtn,
  themes,
  adminLinks,
  userLinks,
  vendorLinks,
  getRoleFromPath,
} from "@/lib/dashboard";
import { sidebarIcons } from "@/Components/Dashboard/sidebar-icons";

export default function DashboardLayout({ children }) {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const role = getRoleFromPath(pathname);

  if (!role) return children;

  const theme = themes[role];
  const links =
    role === "admin" ? adminLinks : role === "vendor" ? vendorLinks : userLinks;
  const showIcons = role === "admin";

  if (isPending) {
    return (
      <div
        className={`flex min-h-screen items-center justify-center ${theme.main}`}
      >
        <div
          className={`h-8 w-8 animate-spin rounded-full border-4 border-t-transparent ${theme.spinner}`}
        />
      </div>
    );
  }

  if (!session) return null;

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/sign-in");
  };

  return (
    <div
      className={`flex min-h-screen w-full flex-col md:h-screen md:flex-row md:overflow-hidden ${theme.main}`}
    >
      <aside
        className={`w-full shrink-0 md:flex md:h-full md:w-64 md:flex-col ${theme.sidebar}`}
      >
        <div className={`h-1 ${theme.accentBar}`} />

        <div
          className={`px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5 ${theme.sidebarBorder}`}
        >
          <div className="flex items-center justify-between gap-2">
            <Logo href="/" />
            <div className="flex items-center gap-1.5 sm:gap-2">
              <DarkModeToggle />
              <button
                type="button"
                onClick={handleLogout}
                className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold md:hidden ${logoutBtn}`}
              >
                Log Out
              </button>
            </div>
          </div>
          <p
            className={`mt-1 text-[10px] font-bold uppercase tracking-widest sm:mt-2 sm:text-[11px] ${theme.panelLabel}`}
          >
            {role} Panel
          </p>
        </div>

        <nav className="flex gap-1.5 overflow-x-auto px-3 py-2 sm:px-4 md:flex-1 md:flex-col md:overflow-visible md:py-6">
          {links.map(({ href, label, icon }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname === href;
            return (
              <Link
                key={label}
                href={href}
                className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition-all sm:gap-3 sm:px-4 sm:py-2.5 sm:text-sm md:shrink ${isActive ? theme.active : theme.inactive}`}
              >
                {showIcons && icon && sidebarIcons[icon]}
                <span className="whitespace-nowrap">{label}</span>
              </Link>
            );
          })}
        </nav>

        <div
          className={`hidden border-t p-4 md:block ${theme.sidebarBorder.replace("border-b", "")}`}
        >
          <button
            type="button"
            onClick={handleLogout}
            className={`w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${logoutBtn}`}
          >
            Log Out
          </button>
        </div>
      </aside>

      <main className="min-h-0 min-w-0 w-full flex-1 overflow-x-hidden overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
