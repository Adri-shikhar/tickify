"use client";

// Shows the user's avatar, name, email, and role badge
import { Button } from "@heroui/react";
import Image from "@/Components/Image";
import { themes } from "@/lib/dashboard";

export default function ProfileCard({ user, role = "user" }) {
  const theme = themes[role];
  const name = user?.name ?? "User";

  // Build 1-2 letter initials for the avatar fallback
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className={`mx-auto w-full max-w-lg overflow-hidden rounded-2xl border ${theme.card}`}>
      <div className={`h-36 ${theme.banner}`} />

      <div className="flex flex-col items-center px-6 pb-8">
        <div className={`profile-avatar-ring relative -mt-16 h-28 w-28 overflow-hidden rounded-full border-4 ring-4 ${theme.ring}`}>
          <Image
            src={user?.image}
            alt={name}
            fill
            className="object-cover"
            sizes="112px"
            fallback={
              <div className={`flex h-full w-full items-center justify-center text-2xl font-bold text-white ${theme.avatar}`}>
                {initials}
              </div>
            }
          />
        </div>

        <span className={`mt-4 rounded-full px-4 py-1 text-xs font-bold capitalize ${theme.badge}`}>
          {user?.role ?? role}
        </span>

        <h2 className="mt-3 text-xl font-bold text-gray-900 dark:text-gray-100">{name}</h2>
        <p className="mt-1 text-sm text-gray-500">{user?.email}</p>

        {/* Edit Profile button — not yet functional */}
        <Button className={`mt-6 h-11 w-full max-w-xs rounded-xl font-semibold ${theme.button}`}>
          Edit Profile
        </Button>
      </div>
    </div>
  );
}
