// Dashboard config: sidebar links and colour themes for admin (amber), vendor (purple), and user (teal)

// Returns the correct dashboard path based on the user's role
export function getDashboardPath(role) {
  if (role === "admin") return "/dashboard/admin";
  if (role === "vendor") return "/dashboard/vendor";
  return "/dashboard/user";
}

export const logoutBtn = "bg-red-500 text-white hover:bg-red-600 shadow-sm shadow-red-200/60";

// Tailwind class sets for each dashboard type
export const themes = {
  vendor: {
    sidebar: "dashboard-sidebar-vendor",
    sidebarBorder: "dashboard-sidebar-border-vendor border-b",
    accentBar: "bg-gradient-to-r from-violet-500 via-indigo-500 to-purple-500",
    main: "dashboard-shell-vendor",
    active: "bg-gradient-to-r from-violet-600 to-indigo-500 text-white",
    inactive: "dashboard-inactive-vendor",
    button: "bg-gradient-to-r from-violet-600 to-indigo-500 text-white hover:opacity-90",
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
    button: "bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 text-white hover:opacity-90",
    spinner: "border-teal-400",
    panelLabel: "text-teal-600",
    banner: "profile-banner",
    badge: "profile-badge",
    avatar: "bg-gradient-to-br from-teal-400 to-sky-400",
    ring: "profile-ring",
    card: "profile-card",
  },
  admin: {
    sidebar: "dashboard-sidebar-admin",
    sidebarBorder: "dashboard-sidebar-border-admin border-b",
    accentBar: "bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500",
    main: "dashboard-shell-admin",
    active: "bg-gradient-to-r from-amber-600 to-rose-500 text-white shadow-sm shadow-amber-200/50",
    inactive: "dashboard-inactive-admin",
    button: "bg-gradient-to-r from-amber-600 to-rose-500 text-white hover:opacity-90",
    spinner: "border-amber-400",
    panelLabel: "text-amber-600",
    banner: "profile-banner-admin",
    badge: "profile-badge-admin",
    avatar: "bg-gradient-to-br from-amber-500 to-rose-500",
    ring: "profile-ring-admin",
    card: "profile-card-admin",
  },
};

export const adminLinks = [
  { href: "/", label: "Dashboard", icon: "dashboard" },
  { href: "/dashboard/admin", label: "Profile", icon: "home" },
  { href: "/dashboard/admin/manage-users", label: "Manage Users", icon: "users" },
  { href: "/dashboard/admin/manage-tickets", label: "Manage Ticket", icon: "ticket" },
  { href: "/dashboard/admin/advertise-tickets", label: "Advertise Tickets", icon: "ad" },
];

export const vendorLinks = [
  { href: "/", label: "Dashboard" },
  { href: "/dashboard/vendor", label: "Profile" },
  { href: "/dashboard/vendor/add-tickets", label: "Add Tickets" },
  { href: "/dashboard/vendor/my-tickets", label: "My Added Tickets" },
  { href: "/dashboard/vendor/bookings", label: "Requested Bookings" },
  { href: "/dashboard/vendor/revenue", label: "Revenue Overview" },
];

export const userLinks = [
  { href: "/", label: "Dashboard" },
  { href: "/dashboard/user", label: "Profile" },
  { href: "/dashboard/user/my-booked-tickets", label: "My Booked Tickets" },
  { href: "/dashboard/user/transaction-history", label: "Transaction History" },
];
