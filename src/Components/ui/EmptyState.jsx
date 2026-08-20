import Link from "next/link";

// The app had eight empty states, all a single unstyled grey paragraph, six of
// them in text-gray-400 — 2.54:1 on white, the least legible text in the
// product, and the first thing a brand-new user reads. One of them told a
// vendor to "Add your first ticket!" without linking anywhere.

export default function EmptyState({
  icon = "🎫",
  title,
  description,
  actionLabel,
  actionHref,
  className = "",
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-card border border-dashed border-default bg-surface px-6 py-16 text-center ${className}`}
    >
      <span aria-hidden="true" className="text-4xl opacity-80">
        {icon}
      </span>

      <h3 className="mt-4 text-base font-semibold text-heading">{title}</h3>

      {description && (
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-body">{description}</p>
      )}

      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="mt-6 inline-flex h-10 items-center justify-center rounded-control bg-accent px-5 text-sm font-semibold text-on-accent shadow-card transition-colors duration-150 ease-standard hover:bg-accent-hover"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
