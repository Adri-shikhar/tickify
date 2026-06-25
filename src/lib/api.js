import { redirect } from "next/navigation";

// All backend API calls go through this one function
const API = process.env.TICKIFY_API_URL ?? "http://localhost:5000";

export async function apiReq(path, options = {}) {
  try {
    const res = await fetch(`${API}${path}`, options);
    const data = await res.json();

    if (res.status === 401) redirect("/sign-in");
    if (res.status === 403) redirect("/unauthorized");

    return res.ok ? { data } : { error: data.error ?? "Something went wrong" };
  } catch (err) {
    return { error: err.message };
  }
}
