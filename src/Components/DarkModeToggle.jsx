"use client";

import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

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
      aria-label={dark ? "Light mode" : "Dark mode"}
      className="rounded-lg px-2 py-1 text-lg hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
}
