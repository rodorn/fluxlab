"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { LinkMenu, PozycjaMenu } from "@/lib/menu";

/** Menu desktopowe: podświetlenie jeździ za kursorem po pasku, panel jest
 *  jeden i przesuwa treść w bok przy zmianie pozycji, kafel pokazuje podgląd
 *  linku pod kursorem, a w cenniku są suwaki z prawdziwymi cenami. */

const LINK_NAV =
  "relative z-10 inline-flex items-center gap-1 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white";

function Strzalka({ otwarte }: { otwarte: boolean }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      aria-hidden="true"
      className={`transition-transform duration-300 ${otwarte ? "rotate-180" : ""}`}
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

const zl = (n: number) => `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} zł`;

/** Suwaki w panelu cennika. Ceny z cennika: strona w tydzień do 5 podstron 2 900 zł,
 *  strona z CMS 5 900 zł; CRM 499 zł miesięcznie do 3 osób, każda kolejna 99 zł. */
function SuwakiCen({ zamknij }: { zamknij: () => void }) {
  const [podstrony, setPodstrony] = useState(5);
  const [osoby, setOsoby] = useState(3);
  const strona = podstrony <= 5 ? 2900 : 5900;
  const crm = 499 + Math.max(0, osoby - 3) * 99;
  const suwak =
    "suwak-menu mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/25 accent-white";
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl bg-gradient-to-br from-accent-solid to-indigo-800 p-4 text-white">
      <div className="space-y-4">
        <label className="block">
          <span className="flex justify-between text-xs text-white/75">
            <span>
              Strona: {podstrony}{" "}
              {podstrony === 1
                ? "podstrona"
                : podstrony < 5
                  ? "podstrony"
                  : "podstron"}
            </span>
            <span className="font-semibold text-white">od {zl(strona)}</span>
          </span>
          <input
            type="range"
            min={1}
            max={20}
            value={podstrony}
            onChange={(e) => setPodstrony(+e.target.value)}
            className={suwak}
            aria-label="Liczba podstron"
          />
        </label>
        <label className="block">
          <span className="flex justify-between text-xs text-white/75">
            <span>
              CRM: {osoby}{" "}
              {osoby === 1 ? "osoba" : osoby < 5 ? "osoby" : "osób"}
            </span>
            <span className="font-semibold text-white">{zl(crm)} / mies.</span>
          </span>
          <input
            type="range"
            min={1}
            max={15}
            value={osoby}
            onChange={(e) => setOsoby(+e.target.value)}
            className={suwak}
            aria-label="Liczba osób w CRM"
          />
        </label>
      </div>
      <Link
        href="/produkty"
        onClick={zamknij}
        className="mt-4 text-sm font-semibold text-white"
      >
        Pełny cennik →
      </Link>
    </div>
  );
}

function Panel({
  p,
  opisy,
  kierunek,
  zamknij,
}: {
  p: PozycjaMenu;
  opisy: Record<string, string>;
  kierunek: number;
  zamknij: () => void;
}) {
  const [podglad, setPodglad] = useState<LinkMenu | null>(null);
  const opis = podglad ? opisy[podglad.href] : null;

  return (
    <div
      key={p.id}
      style={{ gridTemplateColumns: `repeat(${p.kolumny.length}, minmax(0, 1fr)) 14rem` }}
      className={`grid gap-5 ${
        kierunek > 0
          ? "menu-z-prawej"
          : kierunek < 0
            ? "menu-z-lewej"
            : "menu-wjazd"
      }`}
    >
      {p.kolumny.map((k, i) => (
        <div key={i}>
          <p className="px-2.5 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-white/50">
            {k.tytul}
          </p>
          <ul className="space-y-0.5">
            {k.linki.map((x) => (
              <li key={x.href + (x.cena ?? "")}>
                <Link
                  href={x.href}
                  onClick={zamknij}
                  onMouseEnter={() => setPodglad(x)}
                  onFocus={() => setPodglad(x)}
                  className="group block rounded-xl px-2.5 py-1.5 transition-colors hover:bg-gray-50 dark:hover:bg-white/5"
                >
                  <span className="flex items-center gap-1 text-[13px] font-medium text-gray-800 group-hover:text-accent dark:text-white/85">
                    {x.nazwa}
                    <span
                      aria-hidden="true"
                      className="-translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                    >
                      →
                    </span>
                  </span>
                  {(x.cena || opisy[x.href]) && (
                    <span
                      className={`block text-xs leading-snug ${
                        x.cena
                          ? "font-semibold text-accent"
                          : "text-gray-500 dark:text-white/50"
                      }`}
                    >
                      {x.cena ?? opisy[x.href]}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {p.id === "cennik" ? (
        <SuwakiCen zamknij={zamknij} />
      ) : (
        <Link
          href={podglad?.href ?? p.kafel.href}
          onClick={zamknij}
          className="relative flex min-h-[11rem] flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-accent-solid to-indigo-800 p-4 text-white"
        >
          <span key={podglad?.href ?? "kafel"} className="menu-wjazd block">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-white/60">
              {podglad ? "Podgląd" : "Polecamy"}
            </span>
            <span className="mt-1 block text-base font-bold leading-snug">
              {podglad?.nazwa ?? p.kafel.tytul}
            </span>
            <span className="mt-1 block text-[13px] leading-snug text-white/80">
              {podglad ? (podglad.cena ?? opis ?? "") : p.kafel.opis}
            </span>
          </span>
          <span className="mt-4 text-sm font-semibold">
            {podglad ? "Otwórz" : p.kafel.cta} →
          </span>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-white/10"
          />
        </Link>
      )}
    </div>
  );
}

export default function MenuDesktop({
  pozycje,
  opisy,
}: {
  pozycje: PozycjaMenu[];
  opisy: Record<string, string>;
}) {
  const [menu, setMenu] = useState<string | null>(null);
  const [kierunek, setKierunek] = useState(0);
  const [pigulka, setPigulka] = useState<{ x: number; w: number } | null>(null);
  // Panel centrujemy na oknie, nie na pasku menu, bo pasek stoi bliżej lewej
  // i przy węższych ekranach panel wychodził poza lewą krawędź.
  const [korekta, ustawKorekte] = useState(0);
  const nav = useRef<HTMLElement | null>(null);
  const przyciski = useRef<Record<string, HTMLAnchorElement | null>>({});
  const poprzedni = useRef<string | null>(null);

  const otworz = (id: string) => {
    const stary = poprzedni.current;
    const i = pozycje.findIndex((m) => m.id === id);
    const j = stary ? pozycje.findIndex((m) => m.id === stary) : -1;
    setKierunek(j < 0 ? 0 : Math.sign(i - j));
    poprzedni.current = id;
    const r = nav.current?.getBoundingClientRect();
    if (r) ustawKorekte(window.innerWidth / 2 - (r.left + r.width / 2));
    setMenu(id);
  };
  const zamknij = () => {
    poprzedni.current = null;
    setMenu(null);
    setPigulka(null);
  };
  const najedz = (id: string) => {
    const b = przyciski.current[id];
    if (b) setPigulka({ x: b.offsetLeft, w: b.offsetWidth });
  };

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      przyciski.current[menu]?.focus();
      zamknij();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menu]);

  const aktywna = pozycje.find((m) => m.id === menu);

  return (
    <nav
      ref={nav}
      aria-label="Menu główne"
      className="relative hidden flex-1 items-center justify-center gap-1 px-6 xl:flex"
      onMouseLeave={zamknij}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null))
          zamknij();
      }}
    >
      <span className="relative flex items-center gap-1">
        <span
          aria-hidden="true"
          className="absolute top-0 h-full rounded-lg bg-gray-100 transition-all duration-300 ease-out dark:bg-white/10"
          style={{
            left: pigulka?.x ?? 0,
            width: pigulka?.w ?? 0,
            opacity: pigulka ? 1 : 0,
          }}
        />
        {pozycje.map((p) => (
          <Link
            key={p.id}
            href={p.href}
            ref={(el) => {
              przyciski.current[p.id] = el;
            }}
            className={LINK_NAV}
            aria-haspopup="true"
            aria-expanded={menu === p.id}
            aria-controls="menu-panel"
            onMouseEnter={() => {
              najedz(p.id);
              otworz(p.id);
            }}
            onFocus={() => {
              najedz(p.id);
              otworz(p.id);
            }}
            onClick={zamknij}
          >
            {p.etykieta}
            <Strzalka otwarte={menu === p.id} />
          </Link>
        ))}
      </span>

      <div
        id="menu-panel"
        hidden={!aktywna}
        className="absolute left-1/2 top-full w-[min(76rem,calc(100vw-2rem))] pt-2"
        style={{ transform: `translateX(calc(-50% + ${korekta}px))` }}
      >
        {aktywna && (
          <div className="menu-panel overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl shadow-gray-900/10 dark:border-white/10 dark:bg-gray-900">
            <Panel
              key={aktywna.id}
              p={aktywna}
              opisy={opisy}
              kierunek={kierunek}
              zamknij={zamknij}
            />
          </div>
        )}
      </div>
    </nav>
  );
}
