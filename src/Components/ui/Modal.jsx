"use client";

// The app had two hand-rolled modals (the booking form and the delete
// confirmation). Neither trapped focus, closed on Escape, locked body scroll,
// restored focus on close, or animated. This primitive does all five, so both
// call sites get them for free.
import { useCallback, useEffect, useId, useRef } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const sizes = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
};

export default function Modal({
  open,
  onClose,
  title,
  description,
  size = "md",
  dismissable = true,
  children,
}) {
  const panelRef = useRef(null);
  const restoreFocusRef = useRef(null);
  const headingId = useId();
  const descriptionId = useId();

  const close = useCallback(() => {
    if (dismissable) onClose?.();
  }, [dismissable, onClose]);

  // Lock body scroll while open, and put the scrollbar's width back as padding
  // so the page behind doesn't visibly shift sideways.
  useEffect(() => {
    if (!open) return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, [open]);

  // Remember what was focused, move focus in, and hand it back on close.
  useEffect(() => {
    if (!open) return;

    restoreFocusRef.current = document.activeElement;
    const panel = panelRef.current;
    const first = panel?.querySelector(FOCUSABLE);
    (first ?? panel)?.focus();

    return () => {
      const target = restoreFocusRef.current;
      if (target instanceof HTMLElement) target.focus();
    };
  }, [open]);

  // Escape closes; Tab cycles within the dialog instead of escaping behind it.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        close();
        return;
      }

      if (event.key !== "Tab") return;

      const nodes = panelRef.current?.querySelectorAll(FOCUSABLE);
      if (!nodes?.length) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-[2px] animate-in fade-in-0 duration-150 ease-out-soft"
      onMouseDown={(event) => {
        // mousedown on the backdrop itself, so a drag that ends outside a form
        // field doesn't dismiss the dialog
        if (event.target === event.currentTarget) close();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? headingId : undefined}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        className={`w-full ${sizes[size] ?? sizes.md} rounded-sheet border border-default bg-raised p-6 shadow-raised outline-none animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2 duration-250 ease-out-quad`}
      >
        {title && (
          <h2 id={headingId} className="text-lg font-semibold text-heading">
            {title}
          </h2>
        )}

        {description && (
          <p id={descriptionId} className="mt-2 text-sm leading-relaxed text-body">
            {description}
          </p>
        )}

        {children}
      </div>
    </div>
  );
}
