"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "Cennik", href: "/#cennik" },
  { label: "Jak działamy", href: "/#proces" },
  { label: "O nas", href: "/#o-nas" },
  { label: "FAQ", href: "/#faq" },
];

const servicePages: { title: string; href: string; indent?: boolean }[] = [
  { title: "Automatyzacja procesów", href: "/automatyzacja-procesow-biznesowych" },
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

const articles = [
  {
    title: "Automatyzacja Pipedrive",
    description: "Jak wycisnąć 100% z CRM dzięki API i webhookom",
    href: "/automatyzacja-pipedrive",
    imageLight: "/photos/pipedrive-light.gif",
    imageDark: "/photos/pipedrive-dark.webp",
  },
  {
    title: "Automatyzacja Salesforce",
    description: "Zaawansowane integracje i custom development",
    href: "/automatyzacja-salesforce",
    imageLight: "/photos/Salesforce-light.webp",
    imageDark: "/photos/salesforce_dark.png",
  },
];

const tools: { title: string; description: string; href: string; image: string }[] = [
  {
    title: "Dobór samochodu",
    description: "Znajdź idealny segment, nadwozie i moc dla siebie",
    href: "/dobor-samochodu",
    image: "/photos/car-chooser/type-sport.webp",
  },
  {
    title: "Kalkulator kosztów",
    description: "Oblicz pełny koszt posiadania samochodu",
    href: "/kalkulator-kosztow",
    image: "/photos/car-chooser/type-osobowy.jpg",
  },
  {
    title: "Kalkulator podatkowy JDG",
    description: "Porównaj skalę, liniowy i ryczałt – składki, VAT, ulgi",
    href: "/kalkulator-podatkowy",
    image: "/photos/tax-calculation/calculator.jpg",
  },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [knowledgeOpen, setKnowledgeOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileKnowledgeOpen, setMobileKnowledgeOpen] = useState(false);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const servicesCloseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  function openKnowledge() {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setKnowledgeOpen(true);
  }

  function scheduleClose() {
    closeTimeout.current = setTimeout(() => setKnowledgeOpen(false), 150);
  }

  function openServices() {
    if (servicesCloseTimeout.current) clearTimeout(servicesCloseTimeout.current);
    setServicesOpen(true);
  }

  function scheduleServicesClose() {
    servicesCloseTimeout.current = setTimeout(() => setServicesOpen(false), 150);
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
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

          {/* Narzędzia — osobny dropdown */}
          <div className="relative group/tools">
            <Link
              href="#"
              className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors peer"
            >
              Narzędzia
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="transition-transform duration-200 mt-px group-hover/tools:rotate-180">
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <div className="absolute top-full right-0 mt-4 w-[280px] bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/60 dark:shadow-black/40 p-5 opacity-0 pointer-events-none group-hover/tools:opacity-100 group-hover/tools:pointer-events-auto transition-opacity">
              <div className="absolute -top-[7px] right-8 w-3.5 h-3.5 bg-white dark:bg-gray-900 border-l border-t border-gray-100 dark:border-gray-800 rotate-45 rounded-tl-sm" />
              <div className="space-y-1">
                {tools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                  >
                    <div className="shrink-0 w-16 h-11 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
                      <Image
                        src={tool.image}
                        alt={tool.title}
                        width={64}
                        height={44}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="min-w-0 pt-0.5">
                      <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-accent transition-colors leading-snug">
                        {tool.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-snug">
                        {tool.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <a href="/#kontakt" className="btn-primary">
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
                <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
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
                width="12" height="12" viewBox="0 0 12 12" fill="none"
                className={`transition-transform duration-200 mt-px ${mobileServicesOpen ? "rotate-180" : ""}`}
              >
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

          {/* Strefa wiedzy mobile — tylko artykuły */}
          <div>
            <button
              className="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300 w-full"
              onClick={() => setMobileKnowledgeOpen(!mobileKnowledgeOpen)}
            >
              Strefa wiedzy
              <svg
                width="12" height="12" viewBox="0 0 12 12" fill="none"
                className={`transition-transform duration-200 mt-px ${mobileKnowledgeOpen ? "rotate-180" : ""}`}
              >
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {mobileKnowledgeOpen && (
              <div className="mt-3 pl-3 border-l-2 border-accent/20 space-y-3">
                {articles.map((article) => (
                  <Link
                    key={article.href}
                    href={article.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 group"
                  >
                    <div className="shrink-0 w-10 h-7 rounded-md overflow-hidden border border-gray-100 dark:border-gray-700">
                      <Image
                        src={article.imageLight}
                        alt={article.title}
                        width={40}
                        height={28}
                        className="w-full h-full object-cover dark:hidden"
                        unoptimized
                      />
                      <Image
                        src={article.imageDark}
                        alt={article.title}
                        width={40}
                        height={28}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-accent transition-colors">
                      {article.title}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Narzędzia mobile — osobna sekcja */}
          <div>
            <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">
              Narzędzia
            </p>
            <div className="space-y-3">
              {tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2.5 group"
                >
                  <div className="shrink-0 w-10 h-7 rounded-md overflow-hidden border border-gray-100 dark:border-gray-700">
                    <Image
                      src={tool.image}
                      alt={tool.title}
                      width={40}
                      height={28}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-accent transition-colors">
                    {tool.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <a
            href="/#kontakt"
            className="btn-primary text-center"
            onClick={() => setMenuOpen(false)}
          >
            Porozmawiajmy
          </a>
        </div>
      )}
    </header>
  );
}