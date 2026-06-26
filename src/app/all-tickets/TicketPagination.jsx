import Link from "next/link";

function buildHref(page, { from, to, type, sort }) {
  const q = new URLSearchParams();
  if (from) q.set("from", from);
  if (to) q.set("to", to);
  if (type) q.set("type", type);
  if (sort) q.set("sort", sort);
  if (page > 1) q.set("page", String(page));
  const query = q.toString();
  return query ? `/all-tickets?${query}` : "/all-tickets";
}

const btnClass =
  "rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-semibold text-gray-700 hover:border-emerald-400 hover:text-emerald-600";

export default function TicketPagination({ page, totalPages, from, to, type, sort }) {
  if (totalPages <= 1) return null;

  const filters = { from, to, type, sort };

  return (
    <nav className="mt-8 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
      {page > 1 ? (
        <Link href={buildHref(page - 1, filters)} className={btnClass}>
          Previous
        </Link>
      ) : (
        <span className={`${btnClass} opacity-40`}>Previous</span>
      )}

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
        <Link
          key={n}
          href={buildHref(n, filters)}
          className={`${btnClass} min-w-9 text-center ${
            n === page ? "border-emerald-500 bg-emerald-500 text-white" : ""
          }`}
        >
          {n}
        </Link>
      ))}

      {page < totalPages ? (
        <Link href={buildHref(page + 1, filters)} className={btnClass}>
          Next
        </Link>
      ) : (
        <span className={`${btnClass} opacity-40`}>Next</span>
      )}
    </nav>
  );
}
