import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-bg flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-8xl font-bold text-heading">
        404
      </p>
      <h1 className="mt-4 text-2xl font-bold text-heading sm:text-3xl">Page not found</h1>
      <p className="mt-3 max-w-md text-sm text-body sm:text-base">
        The page you are looking for does not exist or may have been moved.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="rounded-control bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-600 px-6 py-3 text-sm font-bold text-white shadow-card hover:opacity-90"
        >
          Back to Home
        </Link>
        <Link
          href="/all-tickets"
          className="text-heading rounded-control border border-default px-6 py-3 text-sm font-semibold hover:opacity-90"
        >
          Browse Tickets
        </Link>
      </div>
    </div>
  );
}
