import { getUsers } from "@/actions/user";
import AdminUserList from "@/Components/Dashboard/AdminUserList";

export default async function ManageUsersPage() {
  const res = await getUsers();
  const users = res.error ? [] : (res.users ?? []);

  return (
    <div className="mx-auto max-w-6xl p-8">
      <h1 className="mb-8 text-center text-3xl font-black text-gray-900">
        Manage Users <span className="text-amber-600">({users.length})</span>
      </h1>

      <AdminUserList initialUsers={users} />
    </div>
  );
}
