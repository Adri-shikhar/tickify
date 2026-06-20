import Link from "next/link";

export default function Logo({ href = "/" }) {
  return (
    <Link
      href={href}
      className="bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-600 bg-clip-text text-xl font-extrabold tracking-tight text-transparent"
    >
      Tickify
    </Link>
  );
}
