import { redirect } from "next/navigation";

// All backend API calls go through this one function
const API = process.env.TICKIFY_API_URL ?? "http://localhost:5000";

export async function apiReq(path, options = {}) {
  let res;
  let data;

  // Only the network call is guarded. redirect() must stay OUTSIDE this block:
  // it signals by throwing a NEXT_REDIRECT control-flow error, so calling it in
  // here meant the catch swallowed the redirect and returned it as a string
  // error instead — 401s and 403s never actually redirected anyone.
  try {
    res = await fetch(`${API}${path}`, options);
    data = await res.json();
  } catch (err) {
    return { error: err.message };
  }

  if (res.status === 401) redirect("/sign-in");
  if (res.status === 403) redirect("/unauthorized");

  return res.ok ? { data } : { error: data?.error ?? "Something went wrong" };
}
