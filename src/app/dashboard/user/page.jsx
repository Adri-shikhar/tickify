"use client";

import { useSession } from "@/lib/auth-client";
import ProfileCard from "@/Components/Dashboard/profile-card";

export default function UserProfilePage() {
  const { data: session } = useSession();
  return (
    <div className="flex justify-center p-8">
      <ProfileCard user={session?.user} role="user" />
    </div>
  );
}
