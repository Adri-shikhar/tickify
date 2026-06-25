"use client";

import { useSession } from "@/lib/auth-client";
import ProfileCard from "@/Components/Dashboard/profile-card";

export default function VendorProfilePage() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-violet-400 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex justify-center p-4 sm:p-6 md:p-8">
      <ProfileCard user={session?.user} role="vendor" />
    </div>
  );
}
