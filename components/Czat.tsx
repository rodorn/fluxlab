"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { zglosZdarzenie } from "@/lib/zdarzenie";

type Wiadomosc = {
  rola: "ja" | "bot";
  tekst: string;
  ms?: number;
  opisWyceny?: string;
};

const POWITANIE: Wiadomosc = {
  rola: "bot",
  tekst:
    "Cześć, odpowiem na pytania o strony, CRM i automatyzacje. O co chcesz zapytać?",
};

const PODPOWIEDZI_DOMYSLNE = [
  "Ile kosztuje strona firmowa?",
  "Jak działa pilotaż CRM za 1 zł?",
  "Jak szybko robicie stronę?", // głos klienta
];

function podpowiedzi(sciezka: string): string[] {
  if (sciezka.startsWith("/strony-www"))
    return [
      "Który pakiet strony wybrać?",
      "Co jest w cenie strony?",
      "Jak długo trwa wdrożenie?",
    ];
  if (sciezka.startsWith("/wlasny-crm"))
    return [
      "Jak działa pilotaż CRM za 1 zł?",
      "Ile kosztuje CRM dla 5 osób?",
      "Czy CRM połączycie z moimi narzędziami?",
    ];
  if (sciezka.includes("ksef"))
    return [
      "Czy pomożecie z integracją z KSeF?",
      "Ile kosztuje integracja z KSeF?",
      "Od kiedy KSeF jest obowiązkowy?",
    ];
  if (sciezka.startsWith("/audyt"))
    return [
      "Co sprawdza darmowy audyt?",
      "Co zrobić z wynikiem audytu?",
      "Czy audyt jest naprawdę darmowy?",
    ];
  return PODPOWIEDZI_DOMYSLNE;
}

const STRONY_Z_CENAMI = ["/strony-www", "/wlasny-crm", "/wycena"];
const DYMEK_KLUCZ = "fluxlab_czat_dymek";

function zLinkami(tekst: string) {
  return tekst.split(/(https?:\/\/[^\s)]+[^\s).,])/g).map((cz, i) =>
    /^https?:\/\//.test(cz) ? (
      <a
        key={i}
        href={cz}
        className="text-accent underline underline-offset-2 break-all"
      >
        {cz.replace(/^https?:\/\/(www\.)?fluxlab\.pl/, "fluxlab.pl")}
      </a>
    ) : (
      cz
    ),
  );
}

function formatCzasu(ms: number) {
  return `${(ms / 1000).toFixed(1).replace(".", ",")} s`;
}

function Glosnik({ tekst }: { tekst: string }) {
  const [mowi, setMowi] = useState(false);
  const [dostepny, setDostepny] = useState(false);
  useEffect(() => {
    setDostepny(typeof window !== "undefined" && "speechSynthesis" in window);
    return () => {
      if (mowi) window.speechSynthesis?.cancel();
    };
  }, [mowi]);
  if (!dostepny) return null;
  function przelacz() {
    const s = window.speechSynthesis;
    if (mowi) {
      s.cancel();
      setMowi(false);
      return;
    }
    s.cancel();
    const u = new SpeechSynthesisUtterance(tekst.replace(/https?:\/\/\S+/g, ""));
    u.lang = "pl-PL";
    u.onend = () => setMowi(false);
    u.onerror = () => setMowi(false);
    setMowi(true);
    s.speak(u);
  }
  return (
    <button
      type="button"
      onClick={przelacz}
      aria-label={mowi ? "Zatrzymaj czytanie" : "Odsłuchaj odpowiedź"}
      aria-pressed={mowi}
      className="inline-flex h-6 w-6 items-center justify-center rounded-full text-gray-500 transition-colors hover:text-accent dark:text-white/50"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {mowi ? (
          <rect x="6" y="6" width="12" height="12" rx="1" />
        ) : (
          <>
            <path d="M11 5L6 9H3v6h3l5 4V5z" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
          </>
        )}
      </svg>
    </button>
  );
}

export default function Czat() {
  const sciezka = usePathname() || "/";
  const [dymek, setDymek] = useState(false);
  const [otwarty, setOtwarty] = useState(false);
  const [historia, setHistoria] = useState<Wiadomosc[]>([POWITANIE]);
  const [pole, setPole] = useState("");
  const [czeka, setCzeka] = useState(false);
  const lista = useRef<HTMLDivElement>(null);
  const wejscie = useRef<HTMLInputElement>(null);

  useEffect(() => {
    lista.current?.scrollTo({
      top: lista.current.scrollHeight,
      behavior: "smooth",
    });
  }, [historia, czeka]);

  useEffect(() => {
    if (otwarty) wejscie.current?.focus();
  }, [otwarty]);

  // Dymek po 40 s na stronie z cenami, raz na sesję.
  useEffect(() => {
    setDymek(false);
    if (!STRONY_Z_CENAMI.some((p) => sciezka.startsWith(p)) || otwarty) return;
    try {
      if (sessionStorage.getItem(DYMEK_KLUCZ)) return;
    } catch {}
    const t = setTimeout(() => {
      try {
        if (sessionStorage.getItem(DYMEK_KLUCZ)) return;
        sessionStorage.setItem(DYMEK_KLUCZ, "1");
      } catch {}
      setDymek(true);
    }, 40_000);
    return () => clearTimeout(t);
  }, [sciezka, otwarty]);

  // Pytanie z wyszukiwarki Ctrl+K.
  const wyslijRef = useRef<(t: string) => void>(() => {});
  useEffect(() => {
    const h = (e: Event) => {
      const q = (e as CustomEvent<string>).detail;
      setOtwarty(true);
      setDymek(false);
      if (typeof q === "string" && q.trim()) {
        setTimeout(() => wyslijRef.current(q), 50);
      }
    };
    window.addEventListener("fluxlab:czat", h);
    return () => window.removeEventListener("fluxlab:czat", h);
  }, []);

  async function wyslij(tekst: string) {
    const pytanie = tekst.trim();
    if (!pytanie || czeka) return;
    const start = performance.now();
    const nowa = [...historia, { rola: "ja" as const, tekst: pytanie }];
    setHistoria(nowa);
    setPole("");
    setCzeka(true);
    zglosZdarzenie("czat_pytanie");
    try {
      const odp = await fetch("/api/czat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          historia: nowa
            .slice(1)
            .map(({ rola, tekst }) => ({ rola, tekst })),
          pathname: sciezka,
          tytul: document.title,
        }),
      });
      const d = await odp.json();
      setHistoria((h) => [
        ...h,
        {
          rola: "bot",
          tekst:
            d.tekst ??
            d.error ??
            "Coś poszło nie tak. Napisz na pawel@fluxlab.pl.",
          ms: Math.round(performance.now() - start),
          opisWyceny:
            typeof d.opisWyceny === "string" ? d.opisWyceny : undefined,
        },
      ]);
    } catch {
      setHistoria((h) => [
        ...h,
        { rola: "bot", tekst: "Brak połączenia. Napisz na pawel@fluxlab.pl." },
      ]);
    } finally {
      setCzeka(false);
    }
  }

  wyslijRef.current = wyslij;

  return (
    <>
      {dymek && !otwarty && (
        <div
          role="status"
          className="czat-dymek fixed bottom-24 right-6 z-50 flex max-w-[16rem] items-start gap-2 rounded-2xl border border-gray-200 bg-white py-2.5 pl-4 pr-2 text-sm text-gray-800 shadow-xl dark:border-white/10 dark:bg-gray-900 dark:text-white/85"
        >
          <button
            type="button"
            onClick={() => {
              setDymek(false);
              setOtwarty(true);
              zglosZdarzenie("czat_otwarty");
            }}
            className="text-left"
          >
            Pomóc wybrać pakiet?
          </button>
          <button
            type="button"
            onClick={() => setDymek(false)}
            aria-label="Zamknij podpowiedź"
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-gray-500 hover:text-accent dark:text-white/50"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      )}
      <button
        type="button"
        onClick={() => {
          setOtwarty((o) => !o);
          if (!otwarty) zglosZdarzenie("czat_otwarty");
        }}
        aria-expanded={otwarty}
        aria-label={otwarty ? "Zamknij czat" : "Zapytaj o ofertę"}
        className="przycisk-czatu fixed bottom-6 right-6 z-50 flex h-14 items-center gap-2 rounded-full bg-accent-solid px-5 text-sm font-semibold text-white shadow-xl shadow-accent/30 transition-all duration-300 hover:scale-105"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {otwarty ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
          )}
        </svg>
        <span className={otwarty ? "sr-only" : "hidden sm:inline"}>
          Zapytaj
        </span>
      </button>

      {otwarty && (
        <div
          role="dialog"
          aria-label="Czat z FluxLab"
          className="czat-okno fixed inset-x-3 bottom-24 z-50 flex max-h-[70vh] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl sm:inset-x-auto sm:right-6 sm:w-96 dark:border-white/10 dark:bg-gray-900"
        >
          <div className="border-b border-gray-200 px-5 py-4 dark:border-white/10">
            <p className="font-semibold">Zapytaj FluxLab</p>
            <p className="text-xs text-gray-500 dark:text-white/50">
              Asystent AI, odpowiada na podstawie naszego cennika
            </p>
          </div>

          <div
            ref={lista}
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
            aria-live="polite"
          >
            {historia.map((w, i) => (
              <div
                key={i}
                className={`scena-wjazd max-w-[85%] ${w.rola === "ja" ? "ml-auto" : ""}`}
              >
                <div
                  className={`whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    w.rola === "ja"
                      ? "bg-accent-solid text-white"
                      : "bg-gray-100 text-gray-800 dark:bg-white/[0.06] dark:text-white/85"
                  }`}
                >
                  {w.rola === "bot" ? zLinkami(w.tekst) : w.tekst}
                </div>
                {w.rola === "bot" && i > 0 && (
                  <div className="mt-1 flex items-center gap-1.5 pl-2 text-[11px] text-gray-500 dark:text-white/50">
                    <Glosnik tekst={w.tekst} />
                    {w.ms != null && <span>{formatCzasu(w.ms)}</span>}
                  </div>
                )}
                {w.opisWyceny && (
                  <a
                    href={`/?opis=${encodeURIComponent(w.opisWyceny)}#kontakt`}
                    className="mt-2 inline-flex rounded-full bg-accent-solid px-4 py-2 text-xs font-semibold text-white"
                  >
                    Przejdź do formularza z tym opisem
                  </a>
                )}
              </div>
            ))}
            {czeka && (
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-white/50">
                <div className="flex gap-1.5 rounded-2xl bg-gray-100 px-4 py-3 dark:bg-white/[0.06]">
                  {[0, 1, 2].map((k) => (
                    <span
                      key={k}
                      className="czat-kropka h-1.5 w-1.5 rounded-full bg-gray-400"
                      style={{ animationDelay: `${k * 0.15}s` }}
                    />
                  ))}
                </div>
                <span>pisze…</span>
              </div>
            )}
            {historia.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {podpowiedzi(sciezka).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => wyslij(p)}
                    className="rounded-full border border-accent/40 px-3 py-1.5 text-xs text-accent transition-colors hover:bg-accent/10"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              wyslij(pole);
            }}
            className="flex gap-2 border-t border-gray-200 p-3 dark:border-white/10"
          >
            <label htmlFor="czat-pole" className="sr-only">
              Twoje pytanie
            </label>
            <input
              id="czat-pole"
              ref={wejscie}
              value={pole}
              maxLength={500}
              onChange={(e) => setPole(e.target.value)}
              placeholder="Napisz pytanie"
              className="flex-1 rounded-full border border-gray-300 bg-white px-4 py-2.5 text-base outline-none focus:border-accent sm:text-sm dark:border-white/15 dark:bg-white/[0.04]"
            />
            <button
              type="submit"
              disabled={czeka || !pole.trim()}
              aria-label="Wyślij"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-solid text-white transition-opacity disabled:opacity-40"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
