// Dashboard layout wrapper — DashboardLayout handles the sidebar and auth guard
import DashboardLayout from "@/Components/Dashboard/dashboard-layout";

export default function Layout({ children }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
