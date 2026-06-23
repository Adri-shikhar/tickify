import Link from "next/link";
import Logo from "@/Components/Logo";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/all-tickets", label: "All Tickets" },
  { href: "/help", label: "Contact Us" },
  { href: "/about", label: "About" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="space-y-4">
            <Logo href="/" />
            <p className="max-w-xs text-sm leading-relaxed text-body">
              Book bus, train, launch &amp; flight tickets easily.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-heading">Quick Links</h3>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-body transition-colors hover:text-teal-600 dark:hover:text-teal-400">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-heading">Contact Info</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-body">
              <li>
                <a href="mailto:support@tickify.com" className="hover:text-teal-600 dark:hover:text-teal-400">
                  support@tickify.com
                </a>
              </li>
              <li>
                <a href="tel:+8801700000000" className="hover:text-teal-600 dark:hover:text-teal-400">
                  +880 1700-000000
                </a>
              </li>
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-600 dark:hover:text-teal-400">
                  Facebook Page
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-heading">Payment Methods</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {["Stripe", "Visa", "Mastercard"].map((method) => (
                <span
                  key={method}
                  className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-xs font-bold text-heading"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--color-border)] bg-[var(--color-bg)]">
        <p className="px-4 py-4 text-center text-xs text-body sm:text-sm">
          &copy; 2025 TicketBari. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
