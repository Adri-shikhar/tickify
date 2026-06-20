"use client";

// Vendor Profile page (route: /dashboard/vendor)
import { useSession } from "@/lib/auth-client";
import ProfileCard from "@/Components/Dashboard/profile-card";

export default function VendorProfilePage() {
  const { data: session } = useSession();
  return (
    <div className="flex justify-center p-8">
      <ProfileCard user={session?.user} role="vendor" />
    </div>
  );
}
