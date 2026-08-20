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

// Window of page numbers around the current page, with first/last always shown
// and gaps collapsed. Previously every page rendered a chip, so a few hundred
// tickets produced a wall of numbers that wrapped over several rows.
function pageItems(page, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const items = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(totalPages - 1, page + 1);

  if (start > 2) items.push("gap-start");
  for (let n = start; n <= end; n++) items.push(n);
  if (end < totalPages - 1) items.push("gap-end");

  items.push(totalPages);
  return items;
}

// 44px targets so they are comfortably tappable
const base =
  "inline-flex h-11 min-w-11 items-center justify-center rounded-control border px-3 text-sm font-medium transition-colors duration-150 ease-standard";
const enabled = `${base} border-default bg-surface text-label hover:border-strong hover:text-heading`;
const disabled = `${base} border-subtle bg-surface text-muted opacity-50`;
const current = `${base} border-accent bg-accent text-on-accent`;

export default function TicketPagination({ page, totalPages, from, to, type, sort }) {
  if (totalPages <= 1) return null;

  const filters = { from, to, type, sort };
  const items = pageItems(page, totalPages);

  return (
    <nav className="mt-8 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
      {page > 1 ? (
        <Link href={buildHref(page - 1, filters)} className={enabled} rel="prev">
          Previous
        </Link>
      ) : (
        <span className={disabled} aria-disabled="true">
          Previous
        </span>
      )}

      {items.map((item) =>
        typeof item === "string" ? (
          <span key={item} className="px-1 text-sm text-muted" aria-hidden="true">
            …
          </span>
        ) : (
          <Link
            key={item}
            href={buildHref(item, filters)}
            className={item === page ? current : enabled}
            aria-current={item === page ? "page" : undefined}
          >
            {item}
          </Link>
        ),
      )}

      {page < totalPages ? (
        <Link href={buildHref(page + 1, filters)} className={enabled} rel="next">
          Next
        </Link>
      ) : (
        <span className={disabled} aria-disabled="true">
          Next
        </span>
      )}
    </nav>
  );
}
