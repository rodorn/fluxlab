"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import ZnakFl from "./ZnakFl";
import Wyszukiwarka from "./Wyszukiwarka";
import MenuDesktop from "./MenuDesktop";
import type { LinkMenu, PozycjaMenu } from "@/lib/menu";

/** Na telefonie w kategorii pokazujemy tylko 5 linków, po kolei z każdej
 *  kolumny, bo pełna lista przytłaczała. Resztę daje „Zobacz wszystko”.
 *  Cennik zostaje w całości, z nagłówkami i cenami. */
const najwazniejsze = (p: PozycjaMenu): LinkMenu[] => {
  const wynik: LinkMenu[] = [];
  const najdluzsza = Math.max(...p.kolumny.map((k) => k.linki.length));
  for (let i = 0; i < najdluzsza && wynik.length < 5; i++)
    for (const k of p.kolumny)
      if (
        k.linki[i] &&
        k.linki[i].href !== p.href &&
        wynik.length < 5 &&
        !wynik.some((x) => x.href === k.linki[i].href)
      )
        wynik.push(k.linki[i]);
  return wynik;
};


const IKONA_LUPY = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.7" />
    <path
      d="M14 14l3.5 3.5"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>
);

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

export default function HeaderKlient({
  menu,
  opisy,
}: {
  menu: PozycjaMenu[];
  opisy: Record<string, string>;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobGrupa, setMobGrupa] = useState<string | null>(null);
  const [szukaj, setSzukaj] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSzukaj((s) => !s);
        return;
      }
      if (e.key !== "/" || e.ctrlKey || e.metaKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t?.closest("input, textarea, select, [contenteditable]")) return;
      e.preventDefault();
      setSzukaj(true);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const zamknij = () => {
    setOpen(false);
  };

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
          ? "bg-white dark:bg-gray-950 border-b border-gray-200/60 dark:border-gray-800/60 shadow-sm shadow-gray-900/5"
          : "bg-white dark:bg-gray-950 border-b border-transparent"
      }`}
    >
      {/* Pełna szerokość, bez container-wide */}
      <div className="flex items-center justify-between h-16 px-5 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="znak-link flex items-center gap-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white shrink-0"
        >
          <ZnakFl className="znak-ikona h-7 w-7" />
          <span translate="no">
            flux<span className="text-accent">lab</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <MenuDesktop pozycje={menu} opisy={opisy} />

        {/* Right */}
        <div className="hidden xl:flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setSzukaj(true)}
            aria-label="Ctrl K, szukaj na stronie"
            aria-haspopup="dialog"
            className="flex items-center gap-2 rounded-lg border border-gray-200 px-2.5 py-1.5 text-gray-500 transition-colors hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent dark:border-white/10 dark:text-gray-400 dark:hover:text-white"
          >
            {IKONA_LUPY}
            <kbd className="text-[11px] font-sans">Ctrl K</kbd>
          </button>
          <ThemeToggle />
          <Link href="/kontakt" className="btn-primary">
            Zamów wycenę
          </Link>
        </div>

        {/* Mobile */}
        <div className="xl:hidden flex items-center gap-1">
          <button
            type="button"
            onClick={() => setSzukaj(true)}
            aria-label="Szukaj na stronie"
            aria-haspopup="dialog"
            className="p-2 text-gray-700 dark:text-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
          >
            {IKONA_LUPY}
          </button>
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
        <div className="menu-mob xl:hidden h-[calc(100dvh-4rem)] overflow-y-auto border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 px-5 py-4">
          <nav aria-label="Menu mobilne" className="flex flex-col">
            {menu.map((p) => (
              <div key={p.id}>
                {mobGrupaPrzycisk(
                  p.id,
                  p.etykieta,
                  <>
                    {(p.id === "cennik"
                      ? p.kolumny
                      : [{ tytul: "", linki: najwazniejsze(p) }]
                    ).map((k, i) => (
                      <div key={i} className="mb-1">
                        {k.tytul && (
                          <p className="pt-1 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-white/50">
                            {k.tytul}
                          </p>
                        )}
                        {k.linki.map((x) => (
                          <Link
                            key={x.href + (x.cena ?? "")}
                            href={x.href}
                            onClick={zamknij}
                            className={MOB_LINK}
                          >
                            {x.nazwa}
                            {x.cena && (
                              <span className="text-accent"> · {x.cena}</span>
                            )}
                          </Link>
                        ))}
                      </div>
                    ))}
                    <Link
                      href={p.href}
                      onClick={zamknij}
                      className="block py-2 text-sm font-semibold text-accent"
                    >
                      Zobacz wszystko →
                    </Link>
                  </>,
                )}
              </div>
            ))}
            <Link
              href="/kontakt"
              onClick={zamknij}
              className="btn-primary mt-4"
            >
              Zamów wycenę
            </Link>
          </nav>
        </div>
      )}
      <Wyszukiwarka otwarte={szukaj} onZamknij={() => setSzukaj(false)} />
    </header>
  );
}
