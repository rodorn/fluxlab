"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { event as gaEvent } from "@/lib/gtag";

const navLinks = [
  { label: "Cennik", href: "/#cennik" },
  { label: "Jak działamy", href: "/#proces" },
  { label: "O nas", href: "/#o-nas" },
  { label: "FAQ", href: "/#faq" },
];

const servicePages: { title: string; href: string; indent?: boolean }[] = [
  {
    title: "Automatyzacja procesów",
    href: "/automatyzacja-procesow-biznesowych",
  },
  { title: "Automatyzacja CRM", href: "/automatyzacja-crm" },
  { title: "Pipedrive", href: "/automatyzacja-pipedrive", indent: true },
  { title: "Salesforce", href: "/automatyzacja-salesforce", indent: true },
  { title: "Integracje API", href: "/integracje-api" },
  { title: "Automatyzacja raportowania", href: "/automatyzacja-raportowania" },
  { title: "Automatyzacja leadów", href: "/automatyzacja-leadow" },
  { title: "Automatyzacja z AI", href: "/automatyzacja-ai" },
  { title: "n8n", href: "/n8n" },
  { title: "Zapier vs Make", href: "/zapier-make" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesCloseTimeout = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  function openServices() {
    if (servicesCloseTimeout.current)
      clearTimeout(servicesCloseTimeout.current);
    setServicesOpen(true);
  }

  function scheduleServicesClose() {
    servicesCloseTimeout.current = setTimeout(
      () => setServicesOpen(false),
      150,
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
      <div className="container-wide flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            flux<span className="text-accent">lab</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {/* Usługi dropdown */}
          <div
            className="relative"
            onMouseEnter={openServices}
            onMouseLeave={scheduleServicesClose}
          >
            <button
              className={`flex items-center gap-1 text-sm transition-colors ${
                servicesOpen
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Usługi
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className={`transition-transform duration-200 mt-px ${servicesOpen ? "rotate-180" : ""}`}
              >
                <path
                  d="M2 4l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {servicesOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/60 dark:shadow-black/40 p-4"
                onMouseEnter={openServices}
                onMouseLeave={scheduleServicesClose}
              >
                <div className="absolute -top-[7px] left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white dark:bg-gray-900 border-l border-t border-gray-100 dark:border-gray-800 rotate-45 rounded-tl-sm" />
                <div className="space-y-0.5">
                  {servicePages.map((sp) => (
                    <Link
                      key={sp.href}
                      href={sp.href}
                      onClick={() => setServicesOpen(false)}
                      className={`block px-3 py-1.5 rounded-xl text-sm hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-accent transition-colors ${
                        sp.indent
                          ? "pl-7 text-gray-500 dark:text-gray-400 text-xs"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {sp.indent ? `└ ${sp.title}` : sp.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}

          {/* Strefa wiedzy — link do huba */}
          <Link
            href="/strefa-wiedzy"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Strefa wiedzy
          </Link>

          <Link
            href="/narzedzia"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Narzędzia
          </Link>
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <a
            href="/#kontakt"
            className="btn-primary"
            onClick={() =>
              gaEvent("cta_click", {
                location: "header",
                label: "porozmawiajmy",
              })
            }
          >
            Porozmawiajmy
          </a>
        </div>

        {/* Mobile: toggle + hamburger */}
        <div className="md:hidden flex items-center gap-1">
          <ThemeToggle />
          <button
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M4 4L16 16M16 4L4 16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M3 5h14M3 10h14M3 15h14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 px-6 py-4 flex flex-col gap-4">
          {/* Usługi mobile */}
          <div>
            <button
              className="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300 w-full"
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
            >
              Usługi
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className={`transition-transform duration-200 mt-px ${mobileServicesOpen ? "rotate-180" : ""}`}
              >
                <path
                  d="M2 4l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {mobileServicesOpen && (
              <div className="mt-3 pl-3 border-l-2 border-accent/20 space-y-2">
                {servicePages.map((sp) => (
                  <Link
                    key={sp.href}
                    href={sp.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block hover:text-accent transition-colors ${
                      sp.indent
                        ? "pl-4 text-xs text-gray-500 dark:text-gray-400"
                        : "text-sm text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {sp.indent ? `└ ${sp.title}` : sp.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-gray-700 dark:text-gray-300"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}

          <Link
            href="/strefa-wiedzy"
            className="text-sm text-gray-700 dark:text-gray-300"
            onClick={() => setMenuOpen(false)}
          >
            Strefa wiedzy
          </Link>

          <Link
            href="/narzedzia"
            className="text-sm text-gray-700 dark:text-gray-300"
            onClick={() => setMenuOpen(false)}
          >
            Narzędzia
          </Link>

          <a
            href="/#kontakt"
            className="btn-primary text-center"
            onClick={() => {
              setMenuOpen(false);
              gaEvent("cta_click", {
                location: "mobile_menu",
                label: "porozmawiajmy",
              });
            }}
          >
            Porozmawiajmy
          </a>
        </div>
      )}
    </header>
  );
}
