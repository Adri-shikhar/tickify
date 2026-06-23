// Landing page (route: /)
import MainLayout from "@/Components/Layout/MainLayout";

export default function LandingPage() {
  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl p-8">
        <h1 className="text-heading">Welcome to Tickify</h1>
      </div>
    </MainLayout>
  );
}
