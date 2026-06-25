"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import Image from "@/Components/Image";
import { markUserAsFraud, updateUserRole } from "@/actions/user";
import { themes } from "@/lib/dashboard";

function getUserId(user) {
  return String(user._id ?? user.id);
}

function getInitials(name) {
  return (name ?? "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const thClass = "px-2 py-2 text-left text-xs font-semibold text-gray-600 sm:px-4 sm:py-3 sm:text-sm";
const tdClass = "px-2 py-3 text-xs text-gray-700 sm:px-4 sm:py-4 sm:text-sm";

export default function AdminUserList({ initialUsers = [] }) {
  const [users, setUsers] = useState(initialUsers);
  const avatarTheme = themes.user.avatar;

  async function handleRoleChange(id, role) {
    const result = await updateUserRole(id, role);
    if (!result.error) {
      setUsers(users.map((u) => (getUserId(u) === id ? { ...u, role } : u)));
    }
  }

  async function handleMarkFraud(id) {
    const result = await markUserAsFraud(id);
    if (!result.error) {
      setUsers(users.map((u) => (getUserId(u) === id ? { ...u, isFraud: true } : u)));
    }
  }

  if (users.length === 0) {
    return <p className="py-12 text-center text-sm text-gray-400">No users yet.</p>;
  }

  return (
    <div className="w-full max-w-full overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full min-w-[720px] border-collapse">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className={`${thClass} w-12`}>#</th>
            <th className={`${thClass} w-20`}>Photo</th>
            <th className={thClass}>Name</th>
            <th className={thClass}>Email</th>
            <th className={`${thClass} w-32`}>Role / Status</th>
            <th className={`${thClass} w-72`}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            const id = getUserId(user);
            const name = user.name ?? "User";
            const role = user.role ?? "user";
            const initials = getInitials(name);

            return (
              <tr key={id} className="border-b border-gray-100 last:border-b-0">
                <td className={`${tdClass} text-center text-gray-400`}>{index + 1}</td>

                <td className={tdClass}>
                  <div className="relative mx-auto h-10 w-10 overflow-hidden rounded-lg">
                    <Image
                      src={user.image}
                      alt={name}
                      fill
                      className="object-cover"
                      sizes="40px"
                      fallback={
                        <div
                          className={`flex h-full w-full items-center justify-center text-xs font-bold text-white ${avatarTheme}`}
                        >
                          {initials}
                        </div>
                      }
                    />
                  </div>
                </td>

                <td className={`${tdClass} font-semibold text-gray-900`}>{name}</td>
                <td className={tdClass}>{user.email}</td>

                <td className={tdClass}>
                  <span className="inline-block rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold capitalize text-emerald-600">
                    {user.isFraud ? "fraud" : role}
                  </span>
                </td>

                <td className={tdClass}>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleRoleChange(id, "admin")}
                      className="bg-amber-400 text-xs font-bold text-white hover:bg-amber-500"
                    >
                      Make Admin
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleRoleChange(id, "vendor")}
                      className="bg-teal-400 text-xs font-bold text-white hover:bg-teal-500"
                    >
                      Make Vendor
                    </Button>
                    {role === "vendor" && !user.isFraud && (
                      <Button
                        size="sm"
                        onClick={() => handleMarkFraud(id)}
                        className="bg-rose-400 text-xs font-bold text-white hover:bg-rose-500"
                      >
                        Mark as Fraud
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
