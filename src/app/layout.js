// Root layout — loads fonts, applies saved dark/light theme before render, sets page metadata
import { Geist, Geist_Mono } from "next/font/google";
import SiteShell from "@/Components/Layout/SiteShell";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "Tickify - Your Ticket Booking Manager",
  description: "Tickify is a platform for creating and managing your ticket bookings",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        {/* Reads localStorage before React loads to avoid a dark/light flash */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.classList.add('dark')}catch(e){}})();` }} />
      </head>
      <body className="flex min-h-full flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
