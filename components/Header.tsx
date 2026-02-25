"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "Usługi", href: "#uslugi" },
  { label: "Cennik", href: "#cennik" },
  { label: "Jak działamy", href: "#proces" },
  { label: "O nas", href: "#o-nas" },
  { label: "FAQ", href: "#faq" },
];

const articles = [
  {
    title: "Automatyzacja Pipedrive",
    description: "Jak wycisnąć 100% z CRM dzięki API i webhookom",
    href: "/automatyzacja-pipedrive",
    image: "/photos/pipedrive-dark.webp",
  },
];

const tools: { title: string; description: string; href: string }[] = [];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [knowledgeOpen, setKnowledgeOpen] = useState(false);
  const [mobileKnowledgeOpen, setMobileKnowledgeOpen] = useState(false);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  function openKnowledge() {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setKnowledgeOpen(true);
  }

  function scheduleClose() {
    closeTimeout.current = setTimeout(() => setKnowledgeOpen(false), 150);
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
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}

          {/* Strefa wiedzy */}
          <div
            className="relative"
            onMouseEnter={openKnowledge}
            onMouseLeave={scheduleClose}
          >
            <button
              className={`flex items-center gap-1 text-sm transition-colors ${
                knowledgeOpen
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Strefa wiedzy
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className={`transition-transform duration-200 mt-px ${knowledgeOpen ? "rotate-180" : ""}`}
              >
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {knowledgeOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[540px] bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/60 dark:shadow-black/40 p-5"
                onMouseEnter={openKnowledge}
                onMouseLeave={scheduleClose}
              >
                {/* Notch */}
                <div className="absolute -top-[7px] left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white dark:bg-gray-900 border-l border-t border-gray-100 dark:border-gray-800 rotate-45 rounded-tl-sm" />

                <div className="grid grid-cols-2 gap-6">

                  {/* Artykuły */}
                  <div>
                    <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-600 uppercase tracking-widest mb-3 px-1">
                      Artykuły
                    </p>
                    <div className="space-y-1">
                      {articles.map((article) => (
                        <Link
                          key={article.href}
                          href={article.href}
                          onClick={() => setKnowledgeOpen(false)}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                        >
                          <div className="shrink-0 w-16 h-11 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
                            <Image
                              src={article.image}
                              alt={article.title}
                              width={64}
                              height={44}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="min-w-0 pt-0.5">
                            <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-accent transition-colors leading-snug">
                              {article.title}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-snug">
                              {article.description}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Narzędzia */}
                  <div>
                    <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-600 uppercase tracking-widest mb-3 px-1">
                      Narzędzia
                    </p>
                    {tools.length === 0 ? (
                      <div className="flex items-center justify-center h-14 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
                        <p className="text-xs text-gray-400 dark:text-gray-600">Wkrótce</p>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        {tools.map((tool) => (
                          <Link
                            key={tool.href}
                            href={tool.href}
                            onClick={() => setKnowledgeOpen(false)}
                            className="flex flex-col px-2.5 py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                          >
                            <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-accent transition-colors">
                              {tool.title}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                              {tool.description}
                            </p>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <a href="#kontakt" className="btn-primary">
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

          {/* Strefa wiedzy mobile */}
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
                <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                  Artykuły
                </p>
                {articles.map((article) => (
                  <Link
                    key={article.href}
                    href={article.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 group"
                  >
                    <div className="shrink-0 w-10 h-7 rounded-md overflow-hidden border border-gray-100 dark:border-gray-700">
                      <Image
                        src={article.image}
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

                <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest pt-1">
                  Narzędzia
                </p>
                {tools.length === 0 ? (
                  <p className="text-xs text-gray-400 dark:text-gray-600">Wkrótce</p>
                ) : (
                  tools.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      onClick={() => setMenuOpen(false)}
                      className="block text-sm text-gray-700 dark:text-gray-300 hover:text-accent transition-colors"
                    >
                      {tool.title}
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>

          <a
            href="#kontakt"
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