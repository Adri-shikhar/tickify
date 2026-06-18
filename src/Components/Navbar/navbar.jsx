"use client";

import { buttonVariants } from "@heroui/styles";
import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";

const navLinkClass =
  "text-gray-800 hover:text-black font-medium text-[15px] transition-colors";

export default function TickifyNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src={logo}
            alt="Tickify Logo"
            width={120}
            height={36}
            priority
            className="object-contain"
          />
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          <li>
            <Link href="/" className={navLinkClass}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/all-tickets" className={navLinkClass}>
              All Tickets
            </Link>
          </li>
          <li>
            <Link href="/dashboard" className={navLinkClass}>
              Dashboard
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="/Sign-up"
            className={buttonVariants({
              variant: "ghost",
              className: "text-gray-800 font-medium hover:bg-gray-100",
            })}
          >
            Sign Up
          </Link>
          <Link
            href="/Sign-in"
            className={buttonVariants({
              variant: "primary",
              className:
                "bg-[#1a1c1e] px-5 tracking-wide shadow-sm hover:bg-[#2d3135]",
            })}
          >
            Sign In
          </Link>
        </div>
      </nav>
    </header>
  );
}
