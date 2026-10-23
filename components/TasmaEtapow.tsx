"use client";

import { useEffect, useRef, useState } from "react";

const ETAPY = [
  {
    nazwa: "Szkic",
    opis: "Układ strony na kartce: co jest na górze, co pod spodem.",
  },
  {
    nazwa: "Makieta",
    opis: "Ten sam układ z prawdziwymi tekstami, bez kolorów.",
  },
  {
    nazwa: "Gotowa strona",
    opis: "Kolory, zdjęcia i formularz podpięty do CRM.",
  },
] as const;

const KROK_MS = 2600;

type Etap = 0 | 1 | 2;

function Blok({
  etap,
  etykieta,
  className = "",
  makieta = "",
  gotowa = "",
  children,
}: {
  etap: Etap;
  etykieta: string;
  className?: string;
  makieta?: string;
  gotowa?: string;
  children?: React.ReactNode;
}) {
  const wyglad =
    etap === 0
      ? "border border-dashed border-gray-400 bg-transparent text-gray-400"
      : etap === 1
        ? `border border-transparent bg-gray-100 text-gray-500 ${makieta}`
        : `border border-transparent ${gotowa}`;
  return (
    <div
      className={`relative overflow-hidden rounded-md transition-all duration-500 ${wyglad} ${className}`}
    >
      {etap === 0 ? (
        <span className="absolute inset-0 flex items-center justify-center font-mono text-[9px] uppercase tracking-wider">
          {etykieta}
        </span>
      ) : (
        children
      )}
    </div>
  );
}

function Strona({ etap }: { etap: Etap }) {
  const gotowa = etap === 2;
  return (
    <div
      aria-hidden="true"
      className="flex flex-col gap-2.5 bg-white p-3 text-left text-gray-900 sm:gap-3 sm:p-4"
    >
      <div className="flex h-7 items-center justify-between gap-2">
        <Blok
          etap={etap}
          etykieta="logo"
          className="h-6 w-24"
          gotowa="bg-transparent"
        >
          <span className="flex h-full items-center gap-1.5 whitespace-nowrap px-1 text-[10px] font-bold">
            <span
              className={`h-4 w-4 rounded transition-colors duration-500 ${gotowa ? "bg-accent-solid" : "bg-gray-300"}`}
            />
            Twoja firma
          </span>
        </Blok>
        <Blok
          etap={etap}
          etykieta="menu"
          className="hidden h-6 w-28 sm:block"
          gotowa="bg-transparent"
        >
          <span className="flex h-full items-center justify-around text-[9px] text-gray-500">
            <span>Oferta</span>
            <span>Cennik</span>
            <span>Kontakt</span>
          </span>
        </Blok>
        <Blok
          etap={etap}
          etykieta="przycisk"
          className="h-6 w-20"
          gotowa="bg-accent-solid text-white"
        >
          <span className="flex h-full items-center justify-center text-[9px] font-semibold">
            Umów się
          </span>
        </Blok>
      </div>

      <div className="grid grid-cols-[1.25fr_1fr] gap-2.5 sm:gap-3">
        <div className="flex flex-col gap-2">
          <Blok
            etap={etap}
            etykieta="nagłówek"
            className="h-14 sm:h-16"
            makieta="bg-transparent"
            gotowa="bg-transparent"
          >
            <p
              className={`text-sm font-bold leading-tight tracking-tight transition-colors duration-500 sm:text-lg ${gotowa ? "text-gray-900" : "text-gray-500"}`}
            >
              Wolny termin na ten tydzień w dwie minuty
            </p>
          </Blok>
          <Blok
            etap={etap}
            etykieta="opis"
            className="h-8"
            makieta="bg-transparent"
            gotowa="bg-transparent"
          >
            <p className="text-[9px] leading-snug text-gray-500 sm:text-[10px]">
              Wybierasz godzinę, dostajesz potwierdzenie SMS-em.
            </p>
          </Blok>
          <Blok
            etap={etap}
            etykieta="przycisk"
            className="h-8 w-28"
            makieta="bg-gray-300 text-gray-600"
            gotowa="bg-accent-solid text-white shadow-lg shadow-indigo-500/30"
          >
            <span className="flex h-full items-center justify-center text-[10px] font-semibold">
              Sprawdź terminy
            </span>
          </Blok>
        </div>
        <Blok
          etap={etap}
          etykieta="zdjęcie"
          className="h-full min-h-28"
          makieta="bg-gray-200"
          gotowa="bg-gradient-to-br from-accent-solid via-indigo-600 to-fuchsia-500"
        >
          {gotowa ? (
            <span className="absolute inset-0">
              <span className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-white/25 blur-sm" />
              <span className="absolute bottom-3 left-3 right-3 rounded-md bg-white/90 p-1.5 text-[8px] text-gray-700 shadow">
                <span className="block font-semibold text-gray-900">
                  Czwartek 10:30
                </span>
                wolne
              </span>
            </span>
          ) : (
            <span className="absolute inset-0 flex items-center justify-center text-[9px]">
              zdjęcie
            </span>
          )}
        </Blok>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {["Cennik", "Opinie", "Dojazd"].map((t) => (
          <Blok
            key={t}
            etap={etap}
            etykieta="karta"
            className="h-12 sm:h-14"
            gotowa="bg-gray-50 ring-1 ring-gray-200"
          >
            <span className="flex h-full flex-col justify-center gap-1 px-2">
              <span
                className={`h-2 w-2 rounded-full transition-colors duration-500 ${gotowa ? "bg-accent-solid" : "bg-gray-300"}`}
              />
              <span className="text-[9px] font-semibold text-gray-700 sm:text-[10px]">
                {t}
              </span>
            </span>
          </Blok>
        ))}
      </div>
    </div>
  );
}

export default function TasmaEtapow() {
  const [etap, setEtap] = useState<Etap>(0);
  const [sam, setSam] = useState(true);
  const [widac, setWidac] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setEtap(2);
      setSam(false);
      return;
    }
    const node = ref.current;
    if (!node || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([w]) => setWidac(w.isIntersecting), {
      threshold: 0.4,
    });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!sam || !widac || etap === 2) return;
    const t = setTimeout(() => setEtap((e) => (e + 1) as Etap), KROK_MS);
    return () => clearTimeout(t);
  }, [sam, widac, etap]);

  const wybierz = (i: Etap) => {
    setSam(false);
    setEtap(i);
  };

  return (
    <section
      ref={ref}
      aria-label="Etapy projektu strony"
      className="container-wide py-12"
    >
      <h2 className="h2-sekcji mb-8 text-center">
        Od szkicu do gotowej strony
      </h2>
      <div className="mx-auto max-w-2xl">
        <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-xl dark:border-white/10">
          <div className="flex items-center gap-1.5 border-b border-gray-200 bg-gray-50 px-3 py-2 dark:border-white/10 dark:bg-gray-950">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
            <span className="ml-2 flex-1 truncate rounded-lg bg-white px-3 py-1 text-xs text-gray-500 dark:bg-gray-900 dark:text-gray-400">
              twojafirma.pl
            </span>
          </div>
          <Strona etap={etap} />
        </div>

        <div
          role="tablist"
          aria-label="Etap"
          className="mt-5 grid grid-cols-3 gap-2"
        >
          {ETAPY.map((e, i) => (
            <button
              key={e.nazwa}
              type="button"
              role="tab"
              aria-selected={etap === i}
              onClick={() => wybierz(i as Etap)}
              className={`relative overflow-hidden rounded-xl border px-2 py-2.5 text-xs font-semibold sm:text-sm transition-colors ${
                etap === i
                  ? "border-accent bg-accent/10 text-gray-900 dark:text-white"
                  : "border-gray-200 text-gray-500 hover:text-gray-900 dark:border-white/10 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              <span className="tabular-nums text-accent">{i + 1}</span>{" "}
              {e.nazwa}
              {sam && widac && etap === i && i < 2 && (
                <span
                  aria-hidden="true"
                  className="tasma-postep absolute bottom-0 left-0 h-0.5 bg-accent"
                  style={{ animationDuration: `${KROK_MS}ms` }}
                />
              )}
            </button>
          ))}
        </div>
        <p
          aria-live="polite"
          className="mt-3 min-h-[2.5rem] text-center text-sm text-gray-600 dark:text-gray-400"
        >
          {ETAPY[etap].opis}
        </p>
      </div>
    </section>
  );
}
