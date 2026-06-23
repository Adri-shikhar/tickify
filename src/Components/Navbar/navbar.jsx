"use client";

// Public navbar shown on all non-dashboard pages
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
import { getProfilePath } from "@/lib/dashboard";
import Logo from "@/Components/Logo";
import Image from "@/Components/Image";
import DarkModeToggle from "@/Components/DarkModeToggle";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/all-tickets", label: "All Tickets" },
  { href: "dashboard", label: "Dashboard", auth: true }, // only shown when signed in
  { href: "/about", label: "About" },
  { href: "/help", label: "Help & Support" },
];

export default function TickifyNavbar() {
  const { data: session, isPending } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const profilePath = session ? getProfilePath(session.user?.role) : "/sign-in";

  // Close the dropdown when clicking outside of it
  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    setOpen(false);
    router.push("/sign-in");
  };

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    if (href === "dashboard") return pathname.startsWith("/dashboard");
    return pathname.startsWith(href);
  };

  const linkClass = (href) => (isActive(href) ? "nav-link-active" : "nav-link");

  return (
    <header className="nav-bar sticky top-0 z-50">
      <div className="h-1 bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-600" />

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Logo href="/" />

        <ul className="hidden items-center gap-8 md:flex">
          {publicLinks.map((link) => {
            if (link.auth && !session) return null;
            const href = link.href === "dashboard" ? "/dashboard" : link.href;
            return (
              <li key={link.label}>
                <Link href={href} className={linkClass(link.href)}>{link.label}</Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <DarkModeToggle />

          {!isPending && session ? (
            // Profile dropdown
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center gap-3 rounded-lg px-2 py-1 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <div className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-teal-400 bg-gray-200">
                  <Image
                    src={session.user?.image}
                    alt={session.user.name ?? "Profile"}
                    fill
                    className="object-cover"
                    sizes="36px"
                    fallback={
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-emerald-400 to-blue-600 text-sm font-bold text-white">
                        {session.user?.name?.[0]?.toUpperCase() ?? "U"}
                      </div>
                    }
                  />
                </div>
                <span className="text-heading hidden text-sm font-semibold sm:block">
                  {session.user?.name ?? "User"}
                </span>
                <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {open && (
                <div className="dropdown-menu absolute right-0 mt-2 w-40">
                  <Link href={profilePath} onClick={() => setOpen(false)} className="dropdown-item">Profile</Link>
                  <button type="button" onClick={handleLogout} className="block w-full px-4 py-2 text-left text-sm font-medium text-red-500 hover:bg-red-50">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : !isPending ? (
            // Sign in / Sign up buttons
            <>
              <Link href="/sign-up" className="text-heading rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800">Sign Up</Link>
              <Link href="/sign-in" className="rounded-lg bg-[#1a1c1e] px-5 py-2 text-sm font-medium text-white hover:bg-[#2d3135]">Sign In</Link>
            </>
          ) : null}
        </div>
      </nav>
    </header>
  );
}
