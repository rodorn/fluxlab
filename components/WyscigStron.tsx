"use client";

import { useEffect, useRef, useState } from "react";
import { zglosZdarzenie } from "@/lib/zdarzenie";

type Pomiar = { ttfb: number; calosc: number; kb: number; adres: string };
type Wynik = { klient: Pomiar; fluxlab: Pomiar };

function ustawWartosc(el: HTMLTextAreaElement, wartosc: string) {
  Object.getOwnPropertyDescriptor(
    HTMLTextAreaElement.prototype,
    "value",
  )?.set?.call(el, wartosc);
  el.dispatchEvent(new Event("input", { bubbles: true }));
}

function domena(adres: string): string {
  try {
    return new URL(adres).hostname.replace(/^www\./, "");
  } catch {
    return adres;
  }
}

const liczba = (n: number) => Math.round(n).toLocaleString("pl-PL");
const kb = (n: number) => n.toLocaleString("pl-PL", { maximumFractionDigits: 1 });

function werdykt(w: Wynik): string {
  const k = w.klient.calosc;
  const f = w.fluxlab.calosc;
  if (k <= f * 0.95) {
    return "Twoja strona jest szybsza od naszej. Gratulacje, dobra robota.";
  }
  if (k <= f * 1.15) {
    return "Wynik jest bardzo zbliżony. Różnicę widać głównie na wolniejszych telefonach.";
  }
  const razy = k / f;
  const t =
    razy >= 1.5 ? `Twoja strona ładuje się około ${razy.toLocaleString("pl-PL", { maximumFractionDigits: 1 })} razy dłużej.` : "Twoja strona ładuje się wyraźnie dłużej.";
  return `${t} Da się to skrócić.`;
}

function Tor({
  nazwa,
  wartosc,
  dotRef,
  trackRef,
  kolor,
}: {
  nazwa: string;
  wartosc: number;
  dotRef: React.RefObject<HTMLSpanElement | null>;
  trackRef: React.RefObject<HTMLDivElement | null>;
  kolor: "klient" | "fluxlab";
}) {
  const dot =
    kolor === "fluxlab"
      ? "bg-accent-solid shadow-[0_0_14px_4px_rgba(99,102,241,0.55)]"
      : "bg-gray-500 shadow-[0_0_14px_4px_rgba(107,114,128,0.5)] dark:bg-gray-300";
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
        <span className="min-w-0 truncate font-semibold text-gray-900 dark:text-white">
          {nazwa}
        </span>
        <span className="shrink-0 tabular-nums text-gray-600 dark:text-gray-300">
          {liczba(wartosc)} ms
        </span>
      </div>
      <div
        ref={trackRef}
        className="relative h-9 overflow-hidden rounded-full border border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800"
      >
        <div
          className="absolute inset-y-1/2 left-4 right-9 h-px -translate-y-1/2 border-t border-dashed border-gray-300 dark:border-gray-600"
          aria-hidden="true"
        />
        <span
          ref={dotRef}
          className={`absolute left-1.5 top-1/2 -mt-2.5 h-5 w-5 rounded-full ${dot}`}
          aria-hidden="true"
        />
        <span
          className="absolute right-0 top-0 h-full w-7 border-l border-gray-300 dark:border-gray-600"
          style={{
            backgroundImage:
              "conic-gradient(#111 25%, #fff 0 50%, #111 0 75%, #fff 0)",
            backgroundSize: "10px 10px",
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

export default function WyscigStron() {
  const [adres, setAdres] = useState("");
  const [faza, setFaza] = useState<"spoczynek" | "pomiar" | "jazda" | "meta">(
    "spoczynek",
  );
  const [blad, setBlad] = useState("");
  const [wynik, setWynik] = useState<Wynik | null>(null);
  const [licznik, setLicznik] = useState({ k: 0, f: 0 });

  const dotK = useRef<HTMLSpanElement>(null);
  const dotF = useRef<HTMLSpanElement>(null);
  const trK = useRef<HTMLDivElement>(null);
  const trF = useRef<HTMLDivElement>(null);

  async function start(e: React.FormEvent) {
    e.preventDefault();
    if (faza === "pomiar" || faza === "jazda") return;
    if (!adres.trim()) {
      setBlad("Wpisz adres swojej strony.");
      return;
    }
    setBlad("");
    setWynik(null);
    setLicznik({ k: 0, f: 0 });
    setFaza("pomiar");
    zglosZdarzenie("wyscig_stron");
    try {
      const res = await fetch("/api/wyscig", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adres: adres.trim() }),
      });
      const dane = await res.json().catch(() => ({}));
      if (!res.ok) {
        setBlad(dane.error || "Pomiar się nie udał. Spróbuj jeszcze raz.");
        setFaza("spoczynek");
        return;
      }
      setWynik(dane as Wynik);
      setFaza("jazda");
    } catch {
      setBlad("Brak połączenia. Spróbuj jeszcze raz.");
      setFaza("spoczynek");
    }
  }

  useEffect(() => {
    if (!wynik) return;
    const k = wynik.klient.calosc;
    const f = wynik.fluxlab.calosc;
    const min = Math.max(1, Math.min(k, f));
    const czas = (v: number) => Math.min(6000, 1200 * (v / min));
    const dK = czas(k);
    const dF = czas(f);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const anim: Animation[] = [];
    const jedz = (
      dot: HTMLSpanElement | null,
      tr: HTMLDivElement | null,
      d: number,
    ) => {
      if (!dot || !tr) return;
      const dystans = tr.clientWidth - 20 - 6 - 28 - 4;
      const a = dot.animate(
        [
          { transform: "translateX(0)" },
          { transform: `translateX(${dystans}px)` },
        ],
        {
          duration: reduced ? 1 : d,
          easing: "cubic-bezier(0.45, 0.05, 0.35, 1)",
          fill: "forwards",
        },
      );
      anim.push(a);
    };
    jedz(dotK.current, trK.current, dK);
    jedz(dotF.current, trF.current, dF);

    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const el = now - t0;
      setLicznik({
        k: Math.min(k, (el / dK) * k),
        f: Math.min(f, (el / dF) * f),
      });
      if (el < Math.max(dK, dF)) raf = requestAnimationFrame(tick);
      else {
        setLicznik({ k, f });
        setFaza("meta");
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      anim.forEach((a) => a.cancel());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wynik]);

  function chceSzybsza() {
    if (!wynik) return;
    document
      .getElementById("kontakt")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    const msg = document.getElementById("message") as HTMLTextAreaElement | null;
    if (msg) {
      ustawWartosc(
        msg,
        `Wyścig stron: ${domena(wynik.klient.adres)}: ${liczba(wynik.klient.calosc)} ms, ${kb(wynik.klient.kb)} KB. fluxlab.pl: ${liczba(wynik.fluxlab.calosc)} ms, ${kb(wynik.fluxlab.kb)} KB. Chcę szybszą stronę.`,
      );
    }
    window.setTimeout(() => {
      (document.getElementById("email") as HTMLInputElement | null)?.focus({
        preventScroll: true,
      });
    }, 600);
  }

  const zajety = faza === "pomiar" || faza === "jazda";
  const widok = faza !== "spoczynek" || wynik;
  const nazwaK = wynik ? domena(wynik.klient.adres) : domena(adres.trim() || "twoja strona");

  return (
    <section
      id="wyscig-stron"
      aria-labelledby="wyscig-stron-heading"
      className="scroll-mt-20 container-wide"
    >
      <div className="mx-auto max-w-3xl py-10 text-center lg:py-12">
        <h2 id="wyscig-stron-heading" className="h2-sekcji mb-3">
          Wyścig: Twoja strona kontra fluxlab.pl
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-gray-600 dark:text-gray-400">
          Wpisz adres swojej strony. Zmierzymy, jak szybko odpowiada i ile
          waży, a potem puścimy obie na tor.
        </p>

        <form
          onSubmit={start}
          className="mx-auto flex max-w-xl flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="wyscig-adres" className="sr-only">
            Adres Twojej strony
          </label>
          <input
            id="wyscig-adres"
            type="text"
            inputMode="url"
            autoComplete="url"
            value={adres}
            maxLength={200}
            onChange={(e) => setAdres(e.target.value)}
            placeholder="np. twojafirma.pl"
            className="min-w-0 flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          />
          <button
            type="submit"
            disabled={zajety}
            className="btn-primary disabled:opacity-60"
          >
            {faza === "pomiar" ? "Mierzymy..." : "Ścigaj się z nami"}
          </button>
        </form>
        {blad && (
          <p role="alert" className="mt-3 text-sm text-red-600 dark:text-red-400">
            {blad}
          </p>
        )}

        {widok && (
          <div className="mx-auto mt-10 max-w-xl space-y-5 text-left" aria-live="polite">
            <Tor
              nazwa={nazwaK}
              wartosc={licznik.k}
              dotRef={dotK}
              trackRef={trK}
              kolor="klient"
            />
            <Tor
              nazwa="fluxlab.pl"
              wartosc={licznik.f}
              dotRef={dotF}
              trackRef={trF}
              kolor="fluxlab"
            />
            {faza === "pomiar" && (
              <p className="animate-pulse text-center text-sm text-gray-500 dark:text-gray-400">
                Zawodnicy na starcie, trwa pomiar...
              </p>
            )}
          </div>
        )}

        {faza === "meta" && wynik && (
          <div className="mt-8">
            <p className="text-base font-medium text-gray-900 dark:text-white">
              Twoja strona: {liczba(wynik.klient.calosc)} ms, {kb(wynik.klient.kb)} KB.
              {" "}fluxlab.pl: {liczba(wynik.fluxlab.calosc)} ms, {kb(wynik.fluxlab.kb)} KB.
            </p>
            <p className="mt-2 text-gray-600 dark:text-gray-300">{werdykt(wynik)}</p>
            <button type="button" onClick={chceSzybsza} className="btn-primary mt-6">
              Chcę szybszą stronę
            </button>
          </div>
        )}

        <p className="mt-8 text-xs text-gray-500 dark:text-gray-400">
          Mierzymy z naszego serwera: czas do pierwszego bajtu i pobranie HTML,
          lepszy z dwóch prób.
        </p>
      </div>
    </section>
  );
}
