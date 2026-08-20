import { getUsers } from "@/actions/user";
import AdminUserList from "@/Components/Dashboard/AdminUserList";

export default async function ManageUsersPage() {
  const res = await getUsers();
  const users = res.error ? [] : (res.users ?? []);

  return (
    <div className="mx-auto w-full max-w-6xl p-4 sm:p-6 md:p-8">
      <h1 className="mb-6 text-center text-xl font-black text-heading sm:mb-8 sm:text-2xl md:text-3xl">
        Manage Users <span className="text-accent">({users.length})</span>
      </h1>

      <AdminUserList initialUsers={users} />
    </div>
  );
}
