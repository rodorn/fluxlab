"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import Znak from "./Znak";
import { SEKCJE, type Sekcja } from "@/lib/sekcje";

const sekcja = (slug: string): Sekcja => SEKCJE.find((x) => x.slug === slug)!;
const USLUGI = sekcja("uslugi");
const NARZEDZIA = sekcja("narzedzia");
const CENNIK = sekcja("cennik");
const WIEDZA = sekcja("strefa-wiedzy");
const O_NAS = sekcja("o-nas");

const BRANZE = USLUGI.grupy.find((g) => g.nazwa === "Branże")!;
const FILARY_MENU = USLUGI.grupy.filter((g) => g.hub);

const LINK_NAV =
  "relative whitespace-nowrap text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors";
const LINK_PODMENU =
  "block rounded-md px-2 py-1 text-[13px] leading-snug text-gray-600 hover:bg-gray-50 hover:text-accent dark:text-white/65 dark:hover:bg-white/5";
const NAGLOWEK_PODMENU =
  "block px-2 pb-1 text-sm font-semibold text-gray-900 hover:text-accent dark:text-white";

function Strzalka({ otwarte }: { otwarte: boolean }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      aria-hidden="true"
      className={`transition-transform ${otwarte ? "rotate-180" : ""}`}
    >
      <path
        d="M2 3.5l3 3 3-3"
        stroke="currentColor"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const [mobGrupa, setMobGrupa] = useState<string | null>(null);
  const przyciski = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menu && !open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (menu) przyciski.current[menu]?.focus();
      setMenu(null);
      setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menu, open]);

  const zamknij = () => {
    setMenu(null);
    setOpen(false);
  };

  const rozwijane = (
    id: string,
    etykieta: string,
    panel: React.ReactNode,
    wrapperClass = "relative",
  ) => (
    <div
      className={wrapperClass}
      onMouseEnter={() => setMenu(id)}
      onMouseLeave={() => setMenu((m) => (m === id ? null : m))}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null))
          setMenu((m) => (m === id ? null : m));
      }}
    >
      <button
        type="button"
        ref={(el) => {
          przyciski.current[id] = el;
        }}
        className={`${LINK_NAV} inline-flex items-center gap-1 py-5`}
        aria-haspopup="true"
        aria-expanded={menu === id}
        aria-controls={`menu-${id}`}
        onClick={() => setMenu((m) => (m === id ? null : id))}
      >
        {etykieta}
        <Strzalka otwarte={menu === id} />
      </button>
      <div id={`menu-${id}`} hidden={menu !== id}>
        {panel}
      </div>
    </div>
  );

  const panelUslug = (
    <div className="absolute left-1/2 top-full w-[min(60rem,calc(100vw-2rem))] -translate-x-1/2 rounded-xl border border-gray-200 bg-white p-4 shadow-xl dark:border-white/10 dark:bg-gray-900">
      <div className="grid grid-cols-3 gap-4">
        {FILARY_MENU.map((g) => (
          <div key={g.nazwa}>
            <Link href={g.hub!} onClick={zamknij} className={NAGLOWEK_PODMENU}>
              {g.nazwa}
            </Link>
            <ul>
              {g.strony
                .filter((x) => x.href !== g.hub)
                .map((x) => (
                  <li key={x.href}>
                    <Link
                      href={x.href}
                      onClick={zamknij}
                      className={LINK_PODMENU}
                    >
                      {x.nazwa}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-3 border-t border-gray-100 pt-3 dark:border-white/10">
        <p className="px-2 pb-1 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-white/50">
          {BRANZE.nazwa}
        </p>
        <ul className="grid grid-cols-2 gap-x-4">
          {BRANZE.strony.map((x) => (
            <li key={x.href}>
              <Link href={x.href} onClick={zamknij} className={LINK_PODMENU}>
                {x.nazwa}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const panelONas = (
    <div className="absolute right-0 top-full w-60 rounded-xl border border-gray-200 bg-white p-2 shadow-xl dark:border-white/10 dark:bg-gray-900">
      <ul>
        {O_NAS.grupy
          .flatMap((g) => g.strony)
          .map((x) => (
            <li key={x.href}>
              <Link
                href={x.href}
                onClick={zamknij}
                className={`${LINK_PODMENU} px-3 py-2 text-sm`}
              >
                {x.nazwa}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );

  const prosty = (s: Sekcja, etykieta: string) => (
    <Link href={s.hub!} className={LINK_NAV}>
      {etykieta}
    </Link>
  );

  const MOB_LINK =
    "block py-2 text-sm text-gray-700 dark:text-gray-200 hover:text-accent transition-colors";

  const mobGrupaPrzycisk = (
    id: string,
    etykieta: string,
    tresc: React.ReactNode,
  ) => (
    <div className="border-b border-gray-100 dark:border-gray-800">
      <button
        type="button"
        aria-expanded={mobGrupa === id}
        aria-controls={`mob-${id}`}
        onClick={() => setMobGrupa((g) => (g === id ? null : id))}
        className="flex w-full items-center justify-between py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200"
      >
        {etykieta}
        <Strzalka otwarte={mobGrupa === id} />
      </button>
      <div id={`mob-${id}`} hidden={mobGrupa !== id} className="pb-2 pl-3">
        {tresc}
      </div>
    </div>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 dark:bg-gray-950/85 backdrop-blur-xl border-b border-gray-200/70 dark:border-gray-800/70 shadow-sm shadow-gray-900/5"
          : "bg-white/60 dark:bg-gray-950/55 backdrop-blur-md border-b border-transparent"
      }`}
    >
      {/* Pełna szerokość, bez container-wide */}
      <div className="flex items-center justify-between h-16 px-5 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white shrink-0"
        >
          <Znak className="h-7 w-7" />
          <span>
            flux<span className="text-accent">lab</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Menu główne"
          className="hidden lg:flex items-center gap-7 absolute left-1/2 -translate-x-1/2"
        >
          {rozwijane("uslugi", "Usługi", panelUslug, "")}
          {prosty(NARZEDZIA, "Narzędzia")}
          {prosty(CENNIK, "Cennik")}
          {prosty(WIEDZA, "Strefa wiedzy")}
          {rozwijane("o-nas", "O nas", panelONas)}
        </nav>

        {/* Right */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <ThemeToggle />
          <Link href="/kontakt" className="btn-primary text-sm">
            Bezpłatna diagnoza
          </Link>
        </div>

        {/* Mobile */}
        <div className="lg:hidden flex items-center gap-1">
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
        <div className="lg:hidden max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 px-5 py-4">
          <nav aria-label="Menu mobilne" className="flex flex-col">
            {mobGrupaPrzycisk(
              "uslugi",
              "Usługi",
              <>
                {FILARY_MENU.map((g) => (
                  <div key={g.nazwa} className="mb-2">
                    <Link
                      href={g.hub!}
                      onClick={zamknij}
                      className="block py-2 text-sm font-semibold text-gray-900 dark:text-white"
                    >
                      {g.nazwa}
                    </Link>
                    {g.strony
                      .filter((x) => x.href !== g.hub)
                      .map((x) => (
                        <Link
                          key={x.href}
                          href={x.href}
                          onClick={zamknij}
                          className={MOB_LINK}
                        >
                          {x.nazwa}
                        </Link>
                      ))}
                  </div>
                ))}
                <p className="pt-1 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-white/50">
                  {BRANZE.nazwa}
                </p>
                {BRANZE.strony.map((x) => (
                  <Link
                    key={x.href}
                    href={x.href}
                    onClick={zamknij}
                    className={MOB_LINK}
                  >
                    {x.nazwa}
                  </Link>
                ))}
              </>,
            )}
            {[
              [NARZEDZIA, "Narzędzia"],
              [CENNIK, "Cennik"],
              [WIEDZA, "Strefa wiedzy"],
            ].map(([s, etykieta]) => (
              <Link
                key={(s as Sekcja).slug}
                href={(s as Sekcja).hub!}
                onClick={zamknij}
                className="border-b border-gray-100 py-2.5 text-sm font-medium text-gray-700 hover:text-accent transition-colors dark:border-gray-800 dark:text-gray-200"
              >
                {etykieta as string}
              </Link>
            ))}
            {mobGrupaPrzycisk(
              "o-nas",
              "O nas",
              O_NAS.grupy
                .flatMap((g) => g.strony)
                .map((x) => (
                  <Link
                    key={x.href}
                    href={x.href}
                    onClick={zamknij}
                    className={MOB_LINK}
                  >
                    {x.nazwa}
                  </Link>
                )),
            )}
            <Link
              href="/kontakt"
              onClick={zamknij}
              className="btn-primary mt-4 text-sm"
            >
              Bezpłatna diagnoza
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
