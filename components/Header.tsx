"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const NAV = [
  { href: "/strony-www", label: "Strony WWW" },
  { href: "/automatyzacja-leadow-crm", label: "Automatyzacja" },
  { href: "/scraping-danych", label: "Dane" },
  { href: "/strefa-wiedzy", label: "Strefa wiedzy" },
  { href: "/narzedzia", label: "Narzędzia" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 dark:bg-gray-950/85 backdrop-blur-xl border-b border-gray-200/70 dark:border-gray-800/70 shadow-sm shadow-gray-900/5"
          : "bg-white/60 dark:bg-gray-950/55 backdrop-blur-md border-b border-transparent"
      }`}
    >
      {/* Pełna szerokość — bez container-wide */}
      <div className="flex items-center justify-between h-16 px-5 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white shrink-0"
        >
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-gradient-to-br from-accent to-violet-500" />
          flux<span className="text-accent">lab</span>
        </Link>

        {/* Desktop nav — linki z animowanym podkreśleniem */}
        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <ThemeToggle />
          <Link href="/kontakt" className="btn-primary text-sm">
            Bezpłatna diagnoza
          </Link>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-1">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Zamknij menu" : "Otwórz menu"}
            aria-expanded={open}
            className="p-2 text-gray-700 dark:text-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              {open ? (
                <path
                  d="M5 5l12 12M17 5L5 17"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M3 6h16M3 11h16M3 16h16"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 px-5 py-4">
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-accent transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/kontakt"
              onClick={() => setOpen(false)}
              className="btn-primary mt-3 text-sm"
            >
              Bezpłatna diagnoza
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
