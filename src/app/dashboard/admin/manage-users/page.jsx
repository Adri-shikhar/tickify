import { getUsers } from "@/actions/user";

export default async function ManageUsersPage() {
  const res = await getUsers();
  const users = res.error ? [] : (res.users ?? []);

  return (
    <div className="mx-auto max-w-4xl p-8">
      <h1 className="mb-8 text-center text-3xl font-black text-gray-900">
        Manage Users <span className="text-amber-600">({users.length})</span>
      </h1>

      {users.length === 0 ? (
        <p className="py-12 text-center text-sm text-gray-400">No users yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {users.map((user) => (
            <div
              key={String(user._id)}
              className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
            >
              <div>
                <p className="font-bold text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold uppercase text-amber-600">
                {user.role || "user"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
