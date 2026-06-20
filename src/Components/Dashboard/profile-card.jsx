"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { themes } from "@/lib/dashboard";

export default function ProfileCard({ user, role = "user" }) {
  const theme = themes[role];
  const name = user?.name ?? "User";
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const [imageError, setImageError] = useState(false);
  const showImage = user?.image && !imageError;

  return (
    <div className={`mx-auto w-full max-w-lg overflow-hidden rounded-2xl border ${theme.card}`}>
      <div className={`h-36 ${theme.banner}`} />

      <div className="flex flex-col items-center px-6 pb-8">
        <div
          className={`profile-avatar-ring -mt-16 flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 ring-4 ${theme.ring}`}
        >
          {showImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.image}
              alt={name}
              className="h-full w-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className={`flex h-full w-full items-center justify-center text-2xl font-bold text-white ${theme.avatar}`}>
              {initials}
            </div>
          )}
        </div>

        <span className={`mt-4 rounded-full px-4 py-1 text-xs font-bold capitalize ${theme.badge}`}>
          {user?.role ?? role}
        </span>

        <h2 className="text-heading mt-3 text-xl font-bold">{name}</h2>
        <p className="text-body mt-1 text-sm">{user?.email}</p>

        <Button className={`mt-6 h-11 w-full max-w-xs rounded-xl font-semibold ${theme.button}`}>
          Edit Profile
        </Button>
      </div>
    </div>
  );
}
