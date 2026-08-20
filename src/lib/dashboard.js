// Dashboard config: sidebar links and the shared dashboard theme.
//
// This used to hold three separate 13-key class-string maps — amber for admin,
// violet for vendor, teal for user — 39 hand-maintained strings in total. Two
// problems with that: every one of them collapsed to the same grey in dark mode
// (`main` was bg-*-50 dark:bg-gray-900 in all three), so the headline idea died
// the moment anyone used the theme toggle; and two thirds of logged-in users
// never saw a brand colour anywhere in the product.
//
// Now there is ONE token-based theme, and the role identity survives as a real
// accent driven by `data-role` on the dashboard shell, which globals.css maps to
// --tk-role / --tk-role-soft. `themes` still exposes the same keys per role so
// no call site had to change.

export function getRoleFromPath(pathname) {
  if (pathname.startsWith("/dashboard/admin")) return "admin";
  if (pathname.startsWith("/dashboard/vendor")) return "vendor";
  if (pathname.startsWith("/dashboard/user")) return "user";
  return null;
}

// Returns the correct dashboard path based on the user's role
export function getDashboardPath(role) {
  if (role === "admin") return "/dashboard/admin";
  if (role === "vendor") return "/dashboard/vendor";
  return "/dashboard/user";
}

export function getProfilePath(role) {
  if (role === "admin") return "/dashboard/admin/profile";
  if (role === "vendor") return "/dashboard/vendor/profile";
  return "/dashboard/user/profile";
}

export const logoutBtn =
  "bg-danger text-on-accent hover:opacity-90 shadow-card";

// One theme, shared by all three dashboards. Anything that should still read as
// "this is the admin panel" uses the role-* utilities, which resolve through the
// data-role attribute and therefore work in both light and dark.
const dashboardTheme = {
  sidebar: "bg-surface border-r border-default",
  sidebarBorder: "border-b border-default",
  main: "bg-canvas",

  // Role identity lives here — a thin strip, a badge and a label
  accentBar: "bg-role",
  panelLabel: "text-role",
  badge: "bg-role-soft text-role border border-role/30",
  banner: "bg-role",
  avatar: "bg-role",

  // Everything else is brand-neutral
  active: "bg-accent text-on-accent",
  inactive: "text-body hover:bg-surface-hover hover:text-heading",
  button: "bg-accent text-on-accent hover:bg-accent-hover",
  spinner: "border-accent",
  card: "border-default bg-surface shadow-card",
  ring: "ring-accent/30 border-surface",
};

export const themes = {
  admin: dashboardTheme,
  vendor: dashboardTheme,
  user: dashboardTheme,
};

export const adminLinks = [
  { href: "/dashboard/admin/profile", label: "Profile", icon: "home" },
  { href: "/dashboard/admin/manage-users", label: "Manage Users", icon: "users" },
  { href: "/dashboard/admin/manage-tickets", label: "Manage Ticket", icon: "ticket" },
  { href: "/dashboard/admin/advertise-tickets", label: "Advertise Tickets", icon: "ad" },
];

export const vendorLinks = [
  { href: "/dashboard/vendor/profile", label: "Profile", icon: "home" },
  { href: "/dashboard/vendor/add-tickets", label: "Add Tickets", icon: "ticket" },
  { href: "/dashboard/vendor/my-tickets", label: "My Added Tickets", icon: "dashboard" },
  { href: "/dashboard/vendor/bookings", label: "Requested Bookings", icon: "users" },
  { href: "/dashboard/vendor/revenue", label: "Revenue Overview", icon: "ad" },
];

export const userLinks = [
  { href: "/dashboard/user/profile", label: "Profile", icon: "home" },
  { href: "/dashboard/user/my-booked-tickets", label: "My Booked Tickets", icon: "ticket" },
  { href: "/dashboard/user/transaction-history", label: "Transaction History", icon: "ad" },
];
