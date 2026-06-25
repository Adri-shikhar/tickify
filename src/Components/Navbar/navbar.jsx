"use client";

// Public navbar shown on all non-dashboard pages
import { useState } from "react";
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
  { href: "dashboard", label: "Dashboard", auth: true },
  { href: "/about", label: "About" },
  { href: "/help", label: "Help & Support" },
];

function MenuIcon({ open }) {
  if (open) {
    return (
      <svg className="h-6 w-6 text-heading" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    );
  }

  return (
    <svg className="h-6 w-6 text-heading" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

export default function TickifyNavbar() {
  const { data: session, isPending } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const profilePath = session ? getProfilePath(session.user?.role) : "/sign-in";

  const setMobileMenuOpen = (open) => {
    setMobileOpen(open);
    document.body.style.overflow = open ? "hidden" : "";
  };

  const handleLogout = async () => {
    await authClient.signOut();
    setProfileOpen(false);
    setMobileMenuOpen(false);
    router.push("/sign-in");
  };

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    if (href === "dashboard") return pathname.startsWith("/dashboard");
    return pathname.startsWith(href);
  };

  const linkClass = (href) => (isActive(href) ? "nav-link-active" : "nav-link");

  const visibleLinks = publicLinks.filter((link) => !link.auth || session);

  return (
    <header className="nav-bar sticky top-0 z-50">
      <div className="h-1 bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-600" />

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Logo href="/" />

        <ul className="hidden items-center gap-8 md:flex">
          {visibleLinks.map((link) => {
            const href = link.href === "dashboard" ? "/dashboard" : link.href;
            return (
              <li key={link.label}>
                <Link href={href} className={linkClass(link.href)}>{link.label}</Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <DarkModeToggle />

          {!isPending && session ? (
            <div className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setProfileOpen((prev) => !prev)}
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
                <span className="text-heading hidden text-sm font-semibold lg:block">
                  {session.user?.name ?? "User"}
                </span>
                <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {profileOpen && (
                <>
                  <button
                    type="button"
                    className="fixed inset-0 z-40"
                    aria-label="Close profile menu"
                    onClick={() => setProfileOpen(false)}
                  />
                  <div className="dropdown-menu absolute right-0 z-50 mt-2 w-40">
                    <Link href={profilePath} onClick={() => setProfileOpen(false)} className="dropdown-item">Profile</Link>
                    <button type="button" onClick={handleLogout} className="block w-full px-4 py-2 text-left text-sm font-medium text-red-500 hover:bg-red-50">
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : !isPending ? (
            <div className="hidden items-center gap-2 md:flex">
              <Link href="/sign-up" className="text-heading rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800">
                Sign Up
              </Link>
              <Link href="/sign-in" className="rounded-lg bg-[#1a1c1e] px-5 py-2 text-sm font-medium text-white hover:bg-[#2d3135]">
                Sign In
              </Link>
            </div>
          ) : null}

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileOpen)}
            className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <MenuIcon open={mobileOpen} />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            aria-label="Close menu"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="surface-border relative z-50 border-t md:hidden">
            <ul className="flex flex-col px-4 py-3">
              {visibleLinks.map((link) => {
                const href = link.href === "dashboard" ? "/dashboard" : link.href;
                return (
                  <li key={link.label}>
                    <Link
                      href={href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block rounded-lg px-3 py-3 ${linkClass(link.href)}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {!isPending && session ? (
              <div className="surface-border border-t px-4 py-4">
                <div className="mb-3 flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-teal-400 bg-gray-200">
                    <Image
                      src={session.user?.image}
                      alt={session.user.name ?? "Profile"}
                      fill
                      className="object-cover"
                      sizes="40px"
                      fallback={
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-emerald-400 to-blue-600 text-sm font-bold text-white">
                          {session.user?.name?.[0]?.toUpperCase() ?? "U"}
                        </div>
                      }
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-heading">{session.user?.name ?? "User"}</p>
                    <p className="text-xs capitalize text-body">{session.user?.role ?? "user"}</p>
                  </div>
                </div>
                <Link
                  href={profilePath}
                  onClick={() => setMobileMenuOpen(false)}
                  className="dropdown-item mb-1"
                >
                  Profile
                </Link>
                <button type="button" onClick={handleLogout} className="dropdown-item w-full text-left text-red-500">
                  Logout
                </button>
              </div>
            ) : !isPending ? (
              <div className="surface-border flex flex-col gap-2 border-t px-4 py-4">
                <Link
                  href="/sign-in"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg bg-[#1a1c1e] px-4 py-3 text-center text-sm font-medium text-white hover:bg-[#2d3135]"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-heading surface-border rounded-lg border px-4 py-3 text-center text-sm font-medium"
                >
                  Sign Up
                </Link>
              </div>
            ) : null}
          </div>
        </>
      )}
    </header>
  );
}
