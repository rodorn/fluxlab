"use client";

import { useEffect, useRef, useState } from "react";
import { zglosZdarzenie } from "@/lib/zdarzenie";
import { USLUGI_HANDLOWCA } from "@/lib/uslugiHandlowca";

type FaktyStrony = {
  host: string;
  ms: number;
  kb: number;
  https: boolean;
  tytul: string;
  technologie: string[];
  sociale: string[];
  formularz: boolean;
  telefon: boolean;
  sklep: boolean;
};
type Rejestr = { nazwa: string; status: string; adres: string; od: string };
type Profil = {
  firma: {
    nazwa: string;
    branza: string;
    miasto: string;
    strona: string;
    opis: string;
  };
  obserwacje: { obszar: string; fakt: string; wniosek: string }[];
  zrodla: string[];
};
type Pakiet = { wstep: string; pakiet: { id: string; powod: string }[] };

const PYTANIA = [
  {
    id: "osoby",
    tekst: "Ile osób pracuje w firmie?",
    wiele: false,
    opcje: ["tylko ja", "2-5", "6-20", "ponad 20"],
  },
  {
    id: "klienci",
    tekst: "Skąd dziś przychodzą klienci?",
    wiele: true,
    opcje: [
      "polecenia",
      "Google",
      "media społecznościowe",
      "portale",
      "telefon",
    ],
  },
  {
    id: "cel",
    tekst: "Co chcesz poprawić najbardziej?",
    wiele: false,
    opcje: [
      "więcej zapytań",
      "szybsza obsługa leadów",
      "mniej ręcznej pracy",
      "wygląd strony",
      "wiedza o konkurencji",
    ],
  },
];

const OBSZARY: Record<string, string> = {
  strona: "Strona",
  google: "Google",
  opinie: "Opinie",
  social: "Social media",
  rejestr: "Rejestr",
  konkurencja: "Konkurencja",
  zespol: "Zespół",
};

const zl = (n: number) => `${n.toLocaleString("pl-PL")} zł`;

function doFormularza(tekst: string) {
  const msg = document.getElementById("message") as HTMLTextAreaElement | null;
  if (msg) {
    Object.getOwnPropertyDescriptor(
      HTMLTextAreaElement.prototype,
      "value",
    )?.set?.call(msg, tekst);
    msg.dispatchEvent(new Event("input", { bubbles: true }));
  }
  document
    .getElementById("kontakt")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
  window.setTimeout(() => {
    (document.getElementById("email") as HTMLInputElement | null)?.focus({
      preventScroll: true,
    });
  }, 600);
}

function Chip({
  dobrze,
  children,
}: {
  dobrze: boolean;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${
        dobrze
          ? "border-emerald-300 text-emerald-800 dark:border-emerald-700 dark:text-emerald-300"
          : "border-amber-300 text-amber-800 dark:border-amber-700 dark:text-amber-300"
      }`}
    >
      <span aria-hidden="true">{dobrze ? "✓" : "!"}</span>
      {children}
    </span>
  );
}

export default function WirtualnyHandlowiec() {
  const [firma, setFirma] = useState("");
  const [etap, setEtap] = useState<"start" | "analiza" | "gotowe">("start");
  const [blad, setBlad] = useState("");
  const [strona, setStrona] = useState<FaktyStrony | null>(null);
  const [bladStrony, setBladStrony] = useState("");
  const [rejestr, setRejestr] = useState<Rejestr | null>(null);
  const [zapytania, setZapytania] = useState<string[]>([]);
  const [profil, setProfil] = useState<Profil | null>(null);
  const [odpowiedzi, setOdpowiedzi] = useState<Record<string, string[]>>({});
  const [pakiet, setPakiet] = useState<Pakiet | null>(null);
  const [wybrane, setWybrane] = useState<string[]>([]);
  const [ladPakiet, setLadPakiet] = useState(false);
  const [postep, setPostep] = useState(0);
  const przerwij = useRef<AbortController | null>(null);

  useEffect(() => {
    if (etap !== "analiza") return;
    const t0 = Date.now();
    const id = window.setInterval(() => {
      const s = (Date.now() - t0) / 1000;
      setPostep(Math.min(94, Math.round(100 * (1 - Math.exp(-s / 30)))));
    }, 400);
    return () => window.clearInterval(id);
  }, [etap]);

  useEffect(() => () => przerwij.current?.abort(), []);

  async function analizuj(e: React.FormEvent) {
    e.preventDefault();
    if (etap === "analiza" || firma.trim().length < 3) return;
    przerwij.current?.abort();
    const ac = new AbortController();
    przerwij.current = ac;
    setBlad("");
    setStrona(null);
    setBladStrony("");
    setRejestr(null);
    setZapytania([]);
    setProfil(null);
    setPakiet(null);
    setWybrane([]);
    setPostep(0);
    setEtap("analiza");
    zglosZdarzenie("handlowiec_start");
    try {
      const res = await fetch("/api/handlowiec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firma: firma.trim() }),
        signal: ac.signal,
      });
      if (!res.ok || !res.body) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Coś poszło nie tak. Spróbuj jeszcze raz.");
      }
      const czytnik = res.body.pipeThrough(new TextDecoderStream()).getReader();
      let bufor = "";
      let gotowyProfil: Profil | null = null;
      for (;;) {
        const { value, done } = await czytnik.read();
        if (done) break;
        bufor += value;
        const linie = bufor.split("\n");
        bufor = linie.pop() ?? "";
        for (const l of linie) {
          if (!l.trim()) continue;
          const z = JSON.parse(l);
          if (z.typ === "strona") {
            if (z.dane) setStrona(z.dane);
            else setBladStrony(z.blad);
          } else if (z.typ === "rejestr") setRejestr(z.dane);
          else if (z.typ === "szukamy")
            setZapytania((q) =>
              q.includes(z.zapytanie) ? q : [...q, z.zapytanie],
            );
          else if (z.typ === "profil") gotowyProfil = z.dane;
          else if (z.typ === "blad") throw new Error(z.error);
        }
      }
      if (!gotowyProfil)
        throw new Error("Analiza się nie zakończyła. Spróbuj jeszcze raz.");
      setProfil(gotowyProfil);
      setPostep(100);
      setEtap("gotowe");
      zglosZdarzenie("handlowiec_profil");
    } catch (err) {
      if (ac.signal.aborted) return;
      setBlad(
        err instanceof Error
          ? err.message
          : "Brak połączenia. Spróbuj jeszcze raz.",
      );
      setEtap("start");
    }
  }

  async function dobierz() {
    if (!profil || ladPakiet) return;
    setLadPakiet(true);
    setBlad("");
    try {
      const res = await fetch("/api/handlowiec/pakiet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profil, strona, odpowiedzi }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || "Nie udało się dobrać pakietu.");
      setPakiet(j);
      setWybrane((j as Pakiet).pakiet.map((p) => p.id));
      zglosZdarzenie("handlowiec_pakiet");
    } catch (err) {
      setBlad(
        err instanceof Error
          ? err.message
          : "Brak połączenia. Spróbuj jeszcze raz.",
      );
    } finally {
      setLadPakiet(false);
    }
  }

  const komplet = PYTANIA.every((p) => (odpowiedzi[p.id] ?? []).length > 0);

  useEffect(() => {
    if (profil && komplet && !pakiet && !ladPakiet) dobierz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profil, komplet]);

  function zaznacz(pid: string, opcja: string, wiele: boolean) {
    setOdpowiedzi((o) => {
      const teraz = o[pid] ?? [];
      const nowe = wiele
        ? teraz.includes(opcja)
          ? teraz.filter((x) => x !== opcja)
          : [...teraz, opcja]
        : [opcja];
      return { ...o, [pid]: nowe };
    });
  }

  const uslugi = USLUGI_HANDLOWCA.filter((u) => wybrane.includes(u.id));
  const jednorazowo = uslugi.reduce((s, u) => s + u.jednorazowo, 0);
  const miesiecznie = uslugi.reduce((s, u) => s + u.miesiecznie, 0);
  const powod = (id: string) => pakiet?.pakiet.find((p) => p.id === id)?.powod;
  const pozostale = USLUGI_HANDLOWCA.filter(
    (u) => !pakiet?.pakiet.some((p) => p.id === u.id),
  );

  function wyslijPakiet() {
    zglosZdarzenie("handlowiec_do_formularza");
    doFormularza(
      [
        `Pakiet dla: ${profil?.firma.nazwa ?? firma}`,
        ...uslugi.map((u) => `- ${u.nazwa} (${u.cena})`),
        jednorazowo ? `Jednorazowo: ${zl(jednorazowo)} netto` : "",
        miesiecznie ? `Miesięcznie: od ${zl(miesiecznie)} netto` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    );
  }

  const ramka =
    "rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-gray-900";

  return (
    <div className="mx-auto mt-10 max-w-5xl text-left">
      <form
        onSubmit={analizuj}
        className="mx-auto flex max-w-2xl flex-col gap-3 sm:flex-row"
      >
        <label htmlFor="wh-firma" className="sr-only">
          Nazwa firmy, NIP albo adres strony
        </label>
        <input
          id="wh-firma"
          type="text"
          value={firma}
          maxLength={200}
          onChange={(e) => setFirma(e.target.value)}
          placeholder="twojafirma.pl, NIP albo nazwa i miasto"
          className="min-w-0 flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
        />
        <button
          type="submit"
          disabled={etap === "analiza"}
          className="btn-primary disabled:opacity-60"
        >
          {etap === "analiza" ? "Sprawdzamy..." : "Przygotuj propozycję"}
        </button>
      </form>
      {blad && (
        <p
          role="alert"
          className="mt-3 text-center text-sm text-red-600 dark:text-red-400"
        >
          {blad}
        </p>
      )}

      {etap !== "start" && (
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <div className={ramka} aria-live="polite">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                Co już wiemy
              </h3>
              <span className="tabular-nums text-xs text-gray-500 dark:text-gray-400">
                {postep}%
              </span>
            </div>
            <div className="mb-5 h-1 overflow-hidden rounded-full bg-gray-100 dark:bg-white/10">
              <div
                className="h-full rounded-full bg-accent-solid transition-[width] duration-500"
                style={{ width: `${postep}%` }}
              />
            </div>

            {strona && (
              <div className="mb-4">
                <p className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                  {strona.host}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Chip dobrze={strona.ms < 800}>odpowiedź {strona.ms} ms</Chip>
                  <Chip dobrze={strona.https}>
                    {strona.https ? "HTTPS" : "bez HTTPS"}
                  </Chip>
                  <Chip dobrze={strona.formularz}>
                    {strona.formularz ? "formularz" : "brak formularza"}
                  </Chip>
                  <Chip dobrze={strona.telefon}>
                    {strona.telefon
                      ? "klikalny telefon"
                      : "telefon nieklikalny"}
                  </Chip>
                  <Chip dobrze={strona.sociale.length > 0}>
                    {strona.sociale.length
                      ? strona.sociale.join(", ")
                      : "brak linków do social media"}
                  </Chip>
                  {strona.technologie.slice(0, 3).map((t) => (
                    <Chip key={t} dobrze>
                      {t}
                    </Chip>
                  ))}
                </div>
              </div>
            )}
            {bladStrony && (
              <p className="mb-4 text-sm text-amber-700 dark:text-amber-300">
                Strona: {bladStrony}
              </p>
            )}
            {rejestr && (
              <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">
                <span className="font-semibold">{rejestr.nazwa}</span>, VAT:{" "}
                {rejestr.status.toLowerCase()}
                {rejestr.od && `, od ${rejestr.od.slice(0, 4)}`}
              </p>
            )}

            {!profil && (
              <ul className="space-y-2">
                {zapytania.map((q, i) => (
                  <li
                    key={q}
                    className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    <span
                      aria-hidden="true"
                      className={
                        i === zapytania.length - 1
                          ? "animate-pulse text-accent"
                          : "text-emerald-600"
                      }
                    >
                      {i === zapytania.length - 1 ? "●" : "✓"}
                    </span>
                    <span>Szukamy: {q}</span>
                  </li>
                ))}
                {!zapytania.length && (
                  <li className="animate-pulse text-sm text-gray-500 dark:text-gray-400">
                    Przeglądamy stronę, rejestry i wyniki wyszukiwania...
                  </li>
                )}
              </ul>
            )}

            {profil && (
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {profil.firma.nazwa}
                  {profil.firma.miasto && `, ${profil.firma.miasto}`}
                </p>
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                  {profil.firma.opis}
                </p>
                <ul className="space-y-3">
                  {profil.obserwacje.map((o) => (
                    <li key={o.fakt} className="text-sm">
                      <span className="mr-2 rounded-md bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-700 dark:bg-white/10 dark:text-gray-300">
                        {OBSZARY[o.obszar] ?? o.obszar}
                      </span>
                      <span className="text-gray-800 dark:text-gray-200">
                        {o.fakt}
                      </span>
                      <span className="block pt-0.5 text-gray-500 dark:text-gray-400">
                        {o.wniosek}
                      </span>
                    </li>
                  ))}
                </ul>
                {profil.zrodla.length > 0 && (
                  <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                    Źródła:{" "}
                    {profil.zrodla.slice(0, 5).map((z, i) => {
                      let host = z;
                      try {
                        host = new URL(z).hostname.replace(/^www\./, "");
                      } catch {}
                      return (
                        <span key={z}>
                          {i > 0 && ", "}
                          <a
                            href={z}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="underline hover:text-accent"
                          >
                            {host}
                          </a>
                        </span>
                      );
                    })}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className={ramka}>
            {!pakiet ? (
              <>
                <h3 className="mb-1 text-base font-semibold text-gray-900 dark:text-white">
                  Trzy pytania, zanim skończymy
                </h3>
                <p className="mb-5 text-sm text-gray-600 dark:text-gray-400">
                  Dzięki nim propozycja będzie dopasowana, a nie ogólna.
                </p>
                <div className="space-y-5">
                  {PYTANIA.map((p) => (
                    <fieldset key={p.id}>
                      <legend className="mb-2 text-sm font-medium text-gray-800 dark:text-gray-200">
                        {p.tekst}
                      </legend>
                      <div className="flex flex-wrap gap-2">
                        {p.opcje.map((o) => {
                          const on = (odpowiedzi[p.id] ?? []).includes(o);
                          return (
                            <button
                              key={o}
                              type="button"
                              aria-pressed={on}
                              onClick={() => zaznacz(p.id, o, p.wiele)}
                              className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                                on
                                  ? "border-transparent bg-accent-solid text-white"
                                  : "border-gray-300 text-gray-700 hover:border-accent dark:border-gray-700 dark:text-gray-300"
                              }`}
                            >
                              {o}
                            </button>
                          );
                        })}
                      </div>
                    </fieldset>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={dobierz}
                  disabled={!profil || ladPakiet}
                  className="btn-primary mt-6 w-full disabled:opacity-60"
                >
                  {ladPakiet
                    ? "Dobieramy pakiet..."
                    : profil
                      ? "Pokaż propozycję"
                      : "Propozycja po zakończeniu analizy"}
                </button>
              </>
            ) : (
              <>
                <h3 className="mb-1 text-base font-semibold text-gray-900 dark:text-white">
                  Propozycja dla Ciebie
                </h3>
                <p className="mb-5 text-sm text-gray-600 dark:text-gray-400">
                  {pakiet.wstep}
                </p>
                <ul className="space-y-2">
                  {[
                    ...pakiet.pakiet
                      .map((p) => USLUGI_HANDLOWCA.find((u) => u.id === p.id)!)
                      .filter(Boolean),
                    ...pozostale,
                  ].map((u) => {
                    const on = wybrane.includes(u.id);
                    const p = powod(u.id);
                    return (
                      <li key={u.id}>
                        <label
                          className={`flex cursor-pointer gap-3 rounded-xl border p-3 transition-colors ${
                            on
                              ? "border-accent bg-accent/5"
                              : "border-gray-200 dark:border-white/10"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={on}
                            onChange={() =>
                              setWybrane((w) =>
                                on ? w.filter((x) => x !== u.id) : [...w, u.id],
                              )
                            }
                            className="mt-1 h-4 w-4 shrink-0 accent-[rgb(var(--accent-solid))]"
                          />
                          <span className="min-w-0 flex-1">
                            <span className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between sm:gap-x-3">
                              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                {u.nazwa}
                              </span>
                              <span className="text-xs tabular-nums text-gray-600 dark:text-gray-400">
                                {u.cena}
                              </span>
                            </span>
                            {p && (
                              <span className="mt-0.5 block text-xs text-gray-600 dark:text-gray-400">
                                {p}
                              </span>
                            )}
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-5 flex flex-wrap items-baseline justify-between gap-2 border-t border-gray-200 pt-4 dark:border-white/10">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Razem netto
                  </span>
                  <span className="text-base font-semibold tabular-nums text-gray-900 dark:text-white">
                    {[
                      jednorazowo ? `${zl(jednorazowo)} raz` : "",
                      miesiecznie ? `od ${zl(miesiecznie)}/mies.` : "",
                    ]
                      .filter(Boolean)
                      .join(" + ") || "nic nie wybrano"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={wyslijPakiet}
                  disabled={!uslugi.length}
                  className="btn-primary mt-5 w-full disabled:opacity-60"
                >
                  Wyślij nam ten pakiet
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
