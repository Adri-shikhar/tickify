// Dashboard config: sidebar links and colour themes for admin (amber), vendor (purple), and user (teal)

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

export const logoutBtn = "bg-red-500 text-white hover:bg-red-600 shadow-sm shadow-red-200/60";

// Tailwind class sets for each dashboard type
export const themes = {
  vendor: {
    sidebar: "bg-white border-r border-violet-100 dark:bg-gray-800 dark:border-violet-900/40",
    sidebarBorder: "border-b border-violet-100 dark:border-violet-900/40",
    accentBar: "bg-gradient-to-r from-violet-500 via-indigo-500 to-purple-500",
    main: "bg-violet-50 dark:bg-gray-900",
    active: "bg-gradient-to-r from-violet-600 to-indigo-500 text-white",
    inactive: "text-gray-600 hover:bg-violet-100 dark:text-gray-300 dark:hover:bg-gray-700",
    button: "bg-gradient-to-r from-violet-600 to-indigo-500 text-white hover:opacity-90",
    spinner: "border-violet-400",
    panelLabel: "text-violet-600 dark:text-violet-400",
    banner: "bg-gradient-to-r from-violet-500 via-indigo-500 to-purple-500",
    badge: "bg-violet-50 text-violet-700 border border-violet-200 dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-700",
    avatar: "bg-gradient-to-br from-violet-500 to-indigo-500",
    ring: "ring-violet-200 border-white dark:ring-violet-700 dark:border-gray-800",
    card: "border-violet-100 bg-white shadow-md dark:bg-gray-800 dark:border-violet-900/40",
  },
  user: {
    sidebar: "bg-white border-r border-teal-100 dark:bg-gray-800 dark:border-teal-900/40",
    sidebarBorder: "border-b border-teal-100 dark:border-teal-900/40",
    accentBar: "bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400",
    main: "bg-teal-50 dark:bg-gray-900",
    active: "bg-gradient-to-r from-teal-500 to-sky-500 text-white",
    inactive: "text-gray-600 hover:bg-teal-100 dark:text-gray-300 dark:hover:bg-gray-700",
    button: "bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 text-white hover:opacity-90",
    spinner: "border-teal-400",
    panelLabel: "text-teal-600 dark:text-teal-400",
    banner: "bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400",
    badge: "bg-teal-50 text-teal-700 border border-teal-200 dark:bg-teal-900/30 dark:text-teal-300 dark:border-teal-700",
    avatar: "bg-gradient-to-br from-teal-400 to-sky-400",
    ring: "ring-teal-200 border-white dark:ring-teal-700 dark:border-gray-800",
    card: "border-teal-100 bg-white shadow-md dark:bg-gray-800 dark:border-teal-900/40",
  },
  admin: {
    sidebar: "bg-white border-r border-amber-100 dark:bg-gray-800 dark:border-amber-900/40",
    sidebarBorder: "border-b border-amber-100 dark:border-amber-900/40",
    accentBar: "bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500",
    main: "bg-amber-50 dark:bg-gray-900",
    active: "bg-gradient-to-r from-amber-600 to-rose-500 text-white shadow-sm shadow-amber-200/50",
    inactive: "text-gray-600 hover:bg-amber-100 dark:text-gray-300 dark:hover:bg-gray-700",
    button: "bg-gradient-to-r from-amber-600 to-rose-500 text-white hover:opacity-90",
    spinner: "border-amber-400",
    panelLabel: "text-amber-600 dark:text-amber-400",
    banner: "bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500",
    badge: "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700",
    avatar: "bg-gradient-to-br from-amber-500 to-rose-500",
    ring: "ring-amber-200 border-white dark:ring-amber-700 dark:border-gray-800",
    card: "border-amber-100 bg-white shadow-md dark:bg-gray-800 dark:border-amber-900/40",
  },
};

export const adminLinks = [
  { href: "/", label: "Home", icon: "dashboard" },
  { href: "/dashboard/admin/profile", label: "Profile", icon: "home" },
  { href: "/dashboard/admin/manage-users", label: "Manage Users", icon: "users" },
  { href: "/dashboard/admin/manage-tickets", label: "Manage Ticket", icon: "ticket" },
  { href: "/dashboard/admin/advertise-tickets", label: "Advertise Tickets", icon: "ad" },
];

export const vendorLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard/vendor/profile", label: "Profile" },
  { href: "/dashboard/vendor/add-tickets", label: "Add Tickets" },
  { href: "/dashboard/vendor/my-tickets", label: "My Added Tickets" },
  { href: "/dashboard/vendor/bookings", label: "Requested Bookings" },
  { href: "/dashboard/vendor/revenue", label: "Revenue Overview" },
];

export const userLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard/user/profile", label: "Profile" },
  { href: "/dashboard/user/my-booked-tickets", label: "My Booked Tickets" },
  { href: "/dashboard/user/transaction-history", label: "Transaction History" },
];
