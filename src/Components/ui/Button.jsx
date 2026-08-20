"use client";

// One button, four variants. Replaces a gradient class string that was
// copy-pasted verbatim into nine files with three different text colours.
//
// It also fixes a real bug: HeroUI's Button wraps react-aria, which accepts
// `isDisabled` and silently discards a plain `disabled` prop. Every auth form
// passed `disabled={loading}`, so those buttons stayed fully clickable while
// their request was in flight. Mapping it here means no call site can get it
// wrong again.
import { Button as HeroButton } from "@heroui/react";

const variants = {
  primary:
    "bg-accent text-on-accent hover:bg-accent-hover active:bg-accent-press shadow-card",
  secondary:
    "border border-default bg-surface text-heading hover:bg-surface-hover hover:border-strong",
  ghost:
    "bg-transparent text-body hover:bg-surface-hover hover:text-heading",
  danger:
    "bg-danger text-on-accent hover:opacity-90 shadow-card",
  success:
    "bg-success text-on-accent hover:opacity-90 shadow-card",
};

const sizes = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-5 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  className = "",
  children,
  ...rest
}) {
  const isDisabled = disabled || loading;

  return (
    <HeroButton
      isDisabled={isDisabled}
      aria-busy={loading || undefined}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-control font-semibold",
        "transition-[background-color,box-shadow,transform,opacity] duration-150 ease-standard",
        "active:scale-[.97]",
        "disabled:pointer-events-none disabled:opacity-50 disabled:active:scale-100",
        variants[variant] ?? variants.primary,
        sizes[size] ?? sizes.md,
        fullWidth ? "w-full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {loading && (
        <span
          aria-hidden="true"
          className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent opacity-70"
        />
      )}
      {children}
    </HeroButton>
  );
}
