"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { event as gaEvent } from "@/lib/gtag";

const navLinks = [
  { label: "Jak pracuję", href: "/jak-pracuje" },
  { label: "Cennik", href: "/#cennik" },
  { label: "FAQ", href: "/#faq" },
];

// 3 filary — główne ścieżki Fluxlab
const pillarPages = [
  {
    title: "Strony WWW",
    subtitle: "Nowa strona albo poprawki w obecnej",
    href: "/strony-www",
  },
  {
    title: "Automatyzacja CRM i leadów",
    subtitle: "Lead → CRM → handlowiec → raport",
    href: "/automatyzacja-leadow-crm",
  },
  {
    title: "Scraping danych",
    subtitle: "Web, PDF, maile, dokumenty",
    href: "/scraping-danych",
  },
];

const servicePages: { title: string; href: string; indent?: boolean }[] = [
  { title: "Automatyzacja CRM", href: "/automatyzacja-crm", indent: true },
  { title: "Pipedrive", href: "/automatyzacja-pipedrive", indent: true },
  { title: "Salesforce", href: "/automatyzacja-salesforce", indent: true },
  {
    title: "Automatyzacja leadów",
    href: "/automatyzacja-leadow",
    indent: true,
  },
  { title: "Automatyzacja raportowania", href: "/automatyzacja-raportowania" },
  { title: "Integracje API", href: "/integracje-api" },
  {
    title: "Automatyzacja procesów",
    href: "/automatyzacja-procesow-biznesowych",
  },
  { title: "Automatyzacja z AI", href: "/automatyzacja-ai" },
  { title: "n8n", href: "/n8n" },
  { title: "Zapier vs Make", href: "/zapier-make" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const servicesCloseTimeout = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-strong shadow-sm shadow-gray-200/40 dark:shadow-black/40 border-b border-gray-200/60 dark:border-gray-800/80"
          : "glass-subtle border-b border-gray-100/60 dark:border-gray-800/60"
      }`}
    >
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
              aria-haspopup="menu"
              aria-expanded={servicesOpen}
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
                role="menu"
                className="animate-fade-up absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[420px] bg-white dark:bg-gray-900 rounded-2xl shadow-xl shadow-gray-200/60 dark:shadow-black/40 border border-gray-200 dark:border-gray-800 p-5"
                onMouseEnter={openServices}
                onMouseLeave={scheduleServicesClose}
              >
                <div className="absolute -top-[7px] left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white dark:bg-gray-900 border-l border-t border-gray-200 dark:border-gray-800 rotate-45 rounded-tl-sm" />

                {/* 3 filary — primary cards */}
                <p className="text-[10px] font-semibold uppercase tracking-widest text-accent mb-3 px-1">
                  3 filary
                </p>
                <div className="space-y-2 mb-4">
                  {pillarPages.map((pp) => (
                    <Link
                      key={pp.href}
                      href={pp.href}
                      role="menuitem"
                      onClick={() => setServicesOpen(false)}
                      className="block p-3 rounded-xl hover:bg-accent/5 dark:hover:bg-accent/10 border border-transparent hover:border-accent/20 transition-all group"
                    >
                      <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-accent transition-colors">
                        {pp.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {pp.subtitle}
                      </p>
                    </Link>
                  ))}
                </div>

                {/* Separator */}
                <div className="border-t border-gray-200/60 dark:border-gray-700/60 my-3" />

                {/* Pozostałe usługi */}
                <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2 px-1">
                  Szczegółowe usługi
                </p>
                <div className="space-y-0.5">
                  {servicePages.map((sp) => (
                    <Link
                      key={sp.href}
                      href={sp.href}
                      role="menuitem"
                      onClick={() => setServicesOpen(false)}
                      className={`block px-3 py-1.5 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-accent transition-colors ${
                        sp.indent
                          ? "pl-5 text-gray-500 dark:text-gray-400 text-xs"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {sp.title}
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
            onClick={() => {
              const params = {
                location: "header",
                label: "diagnoza",
              };
              gaEvent("cta_click", params);
              gaEvent("cta_click_header", params);
            }}
          >
            Zamów diagnozę
          </a>
        </div>

        {/* Mobile: toggle + hamburger */}
        <div className="md:hidden flex items-center gap-1">
          <ThemeToggle />
          <button
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            aria-expanded={menuOpen}
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
              <div className="mt-3 pl-3 border-l-2 border-accent/20 space-y-3">
                {/* 3 filary primary */}
                {pillarPages.map((pp) => (
                  <Link
                    key={pp.href}
                    href={pp.href}
                    onClick={() => setMenuOpen(false)}
                    className="block hover:text-accent transition-colors"
                  >
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {pp.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {pp.subtitle}
                    </p>
                  </Link>
                ))}

                {/* Separator */}
                <div className="border-t border-gray-200/60 dark:border-gray-700/60 pt-2 mt-2">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1.5">
                    Szczegółowe usługi
                  </p>
                  {servicePages.map((sp) => (
                    <Link
                      key={sp.href}
                      href={sp.href}
                      onClick={() => setMenuOpen(false)}
                      className={`block hover:text-accent transition-colors ${
                        sp.indent
                          ? "pl-3 text-xs text-gray-500 dark:text-gray-400 py-0.5"
                          : "text-sm text-gray-700 dark:text-gray-300 py-0.5"
                      }`}
                    >
                      {sp.title}
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
              const params = {
                location: "mobile_menu",
                label: "diagnoza",
              };
              gaEvent("cta_click", params);
              gaEvent("cta_click_header", params);
            }}
          >
            Zamów diagnozę
          </a>
        </div>
      )}
    </header>
  );
}
