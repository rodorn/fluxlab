"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import type { WpisIndeksu } from "@/lib/indeks-stron";

const POLECANE = [
  "/strony-www",
  "/wlasny-crm",
  "/automatyzacja-leadow-crm",
  "/audyt-strony",
  "/produkty",
  "/narzedzia",
];
const MAX_WYNIKOW = 8;

function normalizuj(s: string): string {
  let w = "";
  for (const znak of s.toLowerCase()) {
    const n = znak === "ł" ? "l" : znak.normalize("NFD").replace(/[̀-ͯ]/g, "");
    w += n.length === 1 ? n : znak;
  }
  return w;
}

type Wiersz = { wpis: WpisIndeksu; tytulN: string; opisN: string };

function podswietl(tekst: string, tekstN: string, slowa: string[]): ReactNode {
  if (!slowa.length || tekst.length !== tekstN.length) return tekst;
  const maska = new Array<boolean>(tekst.length).fill(false);
  for (const s of slowa) {
    let i = tekstN.indexOf(s);
    while (i !== -1) {
      for (let k = i; k < i + s.length; k++) maska[k] = true;
      i = tekstN.indexOf(s, i + s.length);
    }
  }
  const czesci: ReactNode[] = [];
  let start = 0;
  while (start < tekst.length) {
    let koniec = start;
    while (koniec < tekst.length && maska[koniec] === maska[start]) koniec++;
    const kawalek = tekst.slice(start, koniec);
    czesci.push(
      maska[start] ? (
        <mark key={start} className="bg-accent/20 text-inherit rounded">
          {kawalek}
        </mark>
      ) : (
        kawalek
      ),
    );
    start = koniec;
  }
  return czesci;
}

function skroc(opis: string, slowa: string[]): string {
  if (opis.length <= 110) return opis;
  const n = normalizuj(opis);
  const trafienia = slowa.map((s) => n.indexOf(s)).filter((i) => i > 60);
  if (!trafienia.length) return opis.slice(0, 107).trimEnd() + "...";
  const od = Math.max(0, Math.min(...trafienia) - 40);
  return "..." + opis.slice(od, od + 107).trim() + "...";
}

export default function Wyszukiwarka({
  otwarte,
  onZamknij,
}: {
  otwarte: boolean;
  onZamknij: () => void;
}) {
  const router = useRouter();
  const [zamontowane, setZamontowane] = useState(false);
  const [widoczne, setWidoczne] = useState(false);
  const [zapytanie, setZapytanie] = useState("");
  const [aktywny, setAktywny] = useState(0);
  const [wiersze, setWiersze] = useState<Wiersz[]>([]);
  const okno = useRef<HTMLDivElement>(null);
  const pole = useRef<HTMLInputElement>(null);
  const lista = useRef<HTMLUListElement>(null);
  const poprzedniFokus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (otwarte) {
      poprzedniFokus.current = document.activeElement as HTMLElement | null;
      setZamontowane(true);
      setZapytanie("");
      setAktywny(0);
      const r = requestAnimationFrame(() =>
        requestAnimationFrame(() => setWidoczne(true)),
      );
      return () => cancelAnimationFrame(r);
    }
    setWidoczne(false);
    const t = setTimeout(() => setZamontowane(false), 160);
    poprzedniFokus.current?.focus?.();
    return () => clearTimeout(t);
  }, [otwarte]);

  useEffect(() => {
    if (!otwarte || wiersze.length) return;
    let anulowano = false;
    import("@/lib/indeks-stron").then((m) => {
      if (anulowano) return;
      setWiersze(
        m.INDEKS_STRON.map((wpis) => ({
          wpis,
          tytulN: normalizuj(wpis.tytul),
          opisN: normalizuj(wpis.opis),
        })),
      );
    });
    return () => {
      anulowano = true;
    };
  }, [otwarte, wiersze.length]);

  useEffect(() => {
    if (zamontowane) pole.current?.focus();
  }, [zamontowane]);

  useEffect(() => {
    if (!zamontowane) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [zamontowane]);

  const slowa = useMemo(
    () => normalizuj(zapytanie).split(/\s+/).filter(Boolean),
    [zapytanie],
  );

  const wyniki = useMemo(() => {
    if (!slowa.length) {
      return POLECANE.map((u) => wiersze.find((w) => w.wpis.url === u)).filter(
        (w): w is Wiersz => !!w,
      );
    }
    const oceny: { w: Wiersz; punkty: number }[] = [];
    for (const w of wiersze) {
      let punkty = 0;
      let wszystkie = true;
      const slowaTytulu = w.tytulN.split(/[^a-z0-9]+/);
      for (const s of slowa) {
        let p = 0;
        if (slowaTytulu.includes(s)) p = 12;
        else if (slowaTytulu.some((t) => t.startsWith(s))) p = 9;
        else if (w.tytulN.includes(s)) p = 6;
        if (w.opisN.includes(s)) p += 2;
        if (!p) {
          wszystkie = false;
          break;
        }
        punkty += p;
      }
      if (wszystkie) oceny.push({ w, punkty });
    }
    oceny.sort((a, b) => b.punkty - a.punkty);
    return oceny.slice(0, MAX_WYNIKOW).map((o) => o.w);
  }, [slowa, wiersze]);

  useEffect(() => {
    setAktywny(0);
  }, [zapytanie]);

  useEffect(() => {
    lista.current
      ?.querySelector<HTMLElement>(`[data-i="${aktywny}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [aktywny]);

  const przejdz = (url: string) => {
    onZamknij();
    router.push(url);
  };

  const zapytajAsystenta = () => {
    onZamknij();
    setTimeout(
      () =>
        (
          document.querySelector(".przycisk-czatu") as HTMLButtonElement | null
        )?.click(),
      200,
    );
  };

  const brak = slowa.length > 0 && wiersze.length > 0 && wyniki.length === 0;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onZamknij();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (wyniki.length) setAktywny((a) => (a + 1) % wyniki.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (wyniki.length)
        setAktywny((a) => (a - 1 + wyniki.length) % wyniki.length);
    } else if (e.key === "Enter") {
      if (wyniki[aktywny]) {
        e.preventDefault();
        przejdz(wyniki[aktywny].wpis.url);
      }
    } else if (e.key === "Tab") {
      const f = Array.from(
        okno.current?.querySelectorAll<HTMLElement>(
          "input, button:not([disabled])",
        ) ?? [],
      );
      if (!f.length) return;
      const i = f.indexOf(document.activeElement as HTMLElement);
      const nastepny = e.shiftKey ? i - 1 : i + 1;
      e.preventDefault();
      f[(nastepny + f.length) % f.length].focus();
    }
  };

  if (!zamontowane) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[60] flex items-start justify-center px-3 pt-[12vh] bg-gray-950/50 backdrop-blur-sm transition-opacity duration-150 ${
        widoczne ? "opacity-100" : "opacity-0"
      }`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onZamknij();
      }}
    >
      <div
        ref={okno}
        role="dialog"
        aria-modal="true"
        aria-label="Szukaj na stronie"
        onKeyDown={onKeyDown}
        className={`w-full max-w-xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl transition duration-150 dark:border-white/10 dark:bg-gray-900 ${
          widoczne ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="flex items-center gap-3 border-b border-gray-100 px-4 dark:border-white/10">
          <svg
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
            className="shrink-0 text-gray-400"
          >
            <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.7" />
            <path
              d="M14 14l3.5 3.5"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
          <input
            ref={pole}
            type="text"
            value={zapytanie}
            onChange={(e) => setZapytanie(e.target.value)}
            placeholder="Czego szukasz? Na przykład KSeF, CRM, audyt"
            aria-label="Szukaj na stronie"
            autoComplete="off"
            spellCheck={false}
            style={{ outline: "none", boxShadow: "none" }}
            role="combobox"
            aria-expanded="true"
            aria-controls="wyniki-szukania"
            aria-activedescendant={
              wyniki[aktywny] ? `wynik-${aktywny}` : undefined
            }
            className="h-14 w-full rounded-none border-0 bg-transparent text-base text-gray-900 shadow-none outline-none ring-0 placeholder:text-gray-400 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 dark:text-white"
          />
          <kbd className="hidden shrink-0 rounded border border-gray-200 px-1.5 py-0.5 text-[11px] text-gray-500 sm:block dark:border-white/15 dark:text-white/50">
            Esc
          </kbd>
        </div>

        <div className="max-h-[min(26rem,60vh)] overflow-y-auto p-2">
          {!slowa.length && wyniki.length > 0 && (
            <p className="px-3 pb-1 pt-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-white/50">
              Polecane
            </p>
          )}
          {brak ? (
            <div className="px-3 py-8 text-center text-sm text-gray-600 dark:text-gray-300">
              Nic nie znaleźliśmy.{" "}
              <button
                type="button"
                onClick={zapytajAsystenta}
                className="font-medium text-accent underline underline-offset-2 hover:text-accent-hover"
              >
                Zapytaj asystenta
              </button>
            </div>
          ) : (
            <ul ref={lista} id="wyniki-szukania" role="listbox">
              {wyniki.map((w, i) => (
                <li
                  key={w.wpis.url}
                  id={`wynik-${i}`}
                  role="option"
                  aria-selected={i === aktywny}
                  data-i={i}
                  onMouseMove={() => setAktywny(i)}
                  onClick={() => przejdz(w.wpis.url)}
                  className={`cursor-pointer rounded-lg px-3 py-2 ${
                    i === aktywny
                      ? "bg-accent/10"
                      : ""
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      {podswietl(w.wpis.tytul, w.tytulN, slowa)}
                    </span>
                    <span className="hidden shrink-0 text-xs text-gray-400 sm:block">
                      {w.wpis.url}
                    </span>
                  </div>
                  <p className="mt-0.5 line-clamp-2 text-xs leading-snug text-gray-500 dark:text-white/55">
                    {slowa.length
                      ? podswietl(
                          skroc(w.wpis.opis, slowa),
                          normalizuj(skroc(w.wpis.opis, slowa)),
                          slowa,
                        )
                      : w.wpis.opis}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center gap-4 border-t border-gray-100 px-4 py-2 text-[11px] text-gray-500 dark:border-white/10 dark:text-white/50">
          <span>↑↓ wybierz</span>
          <span>Enter otwórz</span>
          <span>Esc zamknij</span>
        </div>
      </div>
    </div>,
    document.body,
  );
}
