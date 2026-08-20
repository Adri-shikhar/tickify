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

const thClass = "px-2 py-2 text-left text-xs font-semibold text-body sm:px-4 sm:py-3 sm:text-sm";
const tdClass = "px-2 py-3 text-xs text-label sm:px-4 sm:py-4 sm:text-sm";

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
    return <p className="py-12 text-center text-sm text-muted">No users yet.</p>;
  }

  return (
    <div className="w-full max-w-full overflow-x-auto rounded-card border border-default bg-surface shadow-card">
      <table className="w-full min-w-[720px] border-collapse">
        <thead>
          <tr className="border-b border-default bg-canvas">
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
              <tr key={id} className="border-b border-subtle last:border-b-0">
                <td className={`${tdClass} text-center text-muted`}>{index + 1}</td>

                <td className={tdClass}>
                  <div className="relative mx-auto h-10 w-10 overflow-hidden rounded-control">
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

                <td className={`${tdClass} font-semibold text-heading`}>{name}</td>
                <td className={tdClass}>{user.email}</td>

                <td className={tdClass}>
                  {/* Fraud is not a success state — it used to render in the
                      same emerald pill as a healthy account. */}
                  <span
                    className={`inline-block rounded-full border px-3 py-1 text-micro font-semibold capitalize ${
                      user.isFraud
                        ? "border-danger/30 bg-danger-soft text-danger-soft-fg"
                        : "border-default bg-sunken text-label"
                    }`}
                  >
                    {user.isFraud ? "fraud" : role}
                  </span>
                </td>

                <td className={tdClass}>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleRoleChange(id, "admin")}
                      className="bg-warning text-xs font-bold text-on-accent hover:bg-warning/90"
                    >
                      Make Admin
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleRoleChange(id, "vendor")}
                      className="bg-accent text-xs font-bold text-on-accent hover:bg-accent-hover"
                    >
                      Make Vendor
                    </Button>
                    {role === "vendor" && !user.isFraud && (
                      <Button
                        size="sm"
                        onClick={() => handleMarkFraud(id)}
                        className="bg-danger text-xs font-bold text-on-accent hover:bg-danger/90"
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
