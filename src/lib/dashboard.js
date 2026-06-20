export function getDashboardPath(role) {
  return role === "vendor" ? "/dashboard/vendor" : "/dashboard/user";
}

export const logoutBtn =
  "bg-red-500 text-white hover:bg-red-600 shadow-sm shadow-red-200/60";

export const themes = {
  vendor: {
    sidebar: "dashboard-sidebar-vendor",
    sidebarBorder: "dashboard-sidebar-border-vendor border-b",
    accentBar: "bg-gradient-to-r from-violet-500 via-indigo-500 to-purple-500",
    main: "dashboard-shell-vendor",
    active: "bg-gradient-to-r from-violet-600 to-indigo-500 text-white",
    inactive: "dashboard-inactive-vendor",
    button:
      "bg-gradient-to-r from-violet-600 to-indigo-500 text-white hover:opacity-90",
    spinner: "border-violet-400",
    panelLabel: "text-violet-600",
    banner: "profile-banner-vendor",
    badge: "profile-badge-vendor",
    avatar: "bg-gradient-to-br from-violet-500 to-indigo-500",
    ring: "profile-ring-vendor",
    card: "profile-card-vendor",
  },
  user: {
    sidebar: "dashboard-sidebar",
    sidebarBorder: "dashboard-sidebar-border border-b",
    accentBar: "bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400",
    main: "dashboard-shell",
    active: "bg-gradient-to-r from-teal-500 to-sky-500 text-white",
    inactive: "dashboard-inactive",
    button:
      "bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 text-white hover:opacity-90",
    spinner: "border-teal-400",
    panelLabel: "text-teal-600",
    banner: "profile-banner",
    badge: "profile-badge",
    avatar: "bg-gradient-to-br from-teal-400 to-sky-400",
    ring: "profile-ring",
    card: "profile-card",
  },
};

export const vendorLinks = [
  { href: "/", label: "Dashboard" },
  { href: "/dashboard/vendor", label: "Profile" },
  { href: "/dashboard/vendor/add-tickets", label: "Add tickets" },
  { href: "/dashboard/vendor/my-tickets", label: "My Added tickets" },
  { href: "/dashboard/vendor/bookings", label: "Requested Bookings" },
  { href: "/dashboard/vendor/revenue", label: "Revenue Overview" },
];

export const userLinks = [
  { href: "/", label: "Dashboard" },
  { href: "/dashboard/user", label: "Profile" },
  { href: "/dashboard/user/my-booked-tickets", label: "My Booked Tickets" },
  { href: "/dashboard/user/transaction-history", label: "Transaction History" },
];
