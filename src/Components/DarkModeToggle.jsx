"use client";

// Toggles dark mode and saves the preference to localStorage
import { useState } from "react";

function getInitialDark() {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains("dark");
}

export default function DarkModeToggle() {
  const [dark, setDark] = useState(getInitialDark);

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setDark(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex h-10 w-10 items-center justify-center rounded-control text-lg hover:bg-surface-hover"
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
}
