"use client";

import { useState } from "react";

export interface LeadWiersz {
  id: string;
  czas: string;
  pola: Record<string, string>;
  firma: { nazwa?: string | null; adres?: string | null; krs?: string | null; branza?: string; blad?: string } | null;
  ocena: { kategoria?: string; punkty?: number; streszczenie?: string; nastepny_krok?: string } | null;
  status: string;
}

export interface AnkietaWiersz {
  id: string;
  czas: string;
  ocena: number;
  komentarz: string;
}

const POLE =
  "w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-3.5 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-accent";
const KOLOR: Record<string, string> = {
  gorący: "text-red-700 dark:text-red-400",
  ciepły: "text-amber-700 dark:text-amber-400",
  zimny: "text-sky-700 dark:text-sky-400",
};

export default function PanelLeadow({
  panel,
  token,
  produkty,
  leady,
  ankiety,
  ustawienia,
}: {
  panel: string;
  token: string;
  produkty: string[];
  leady: LeadWiersz[];
  ankiety: AnkietaWiersz[];
  ustawienia: Record<string, string>;
}) {
  const [ust, setUst] = useState(ustawienia);
  const [stan, setStan] = useState<"" | "zapis" | "ok" | "blad">("");
  const [blad, setBlad] = useState("");
  const odpowiedz = produkty.includes("lead-odpowiedz");
  const nps = produkty.includes("lead-nps");
  const prom = ankiety.filter((a) => a.ocena >= 9).length;
  const kryt = ankiety.filter((a) => a.ocena <= 6).length;
  const wynikNps = ankiety.length ? Math.round(((prom - kryt) / ankiety.length) * 100) : null;
  const adresAnkiety = `https://fluxlab.pl/ankieta/${token}`;

  async function zapisz(e: React.FormEvent) {
    e.preventDefault();
    setStan("zapis");
    const r = await fetch(`/api/lead-ustawienia/${panel}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ust),
    }).catch(() => null);
    const d = await r?.json().catch(() => ({}));
    if (r?.ok) setStan("ok");
    else {
      setBlad(d?.error || "Nie udało się zapisać.");
      setStan("blad");
    }
  }

  const adresForm = `https://fluxlab.pl/leady/formularz/${token}`;

  return (
    <div className="grid gap-10">
      {nps && (
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Ankieta NPS</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Link dla Twoich klientów: <a className="break-all text-accent underline" href={adresAnkiety}>{adresAnkiety}</a>
          </p>
          {wynikNps === null ? (
            <p className="mt-4 rounded-xl border border-gray-200 dark:border-gray-800 p-5 text-sm text-gray-600 dark:text-gray-400">Jeszcze nikt nie odpowiedział.</p>
          ) : (
            <>
              <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">NPS {wynikNps}</span> z {ankiety.length} odpowiedzi: promotorzy {prom}, krytycy {kryt}, neutralni {ankiety.length - prom - kryt}.
              </p>
              <ul className="mt-4 grid gap-3">
                {ankiety.map((a) => (
                  <li key={a.id} className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/50 p-4 text-sm">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="font-semibold text-gray-900 dark:text-white">Ocena {a.ocena}/10</p>
                      <p className="text-xs text-gray-500">{new Date(a.czas).toLocaleString("pl-PL", { dateStyle: "short", timeStyle: "short", timeZone: "Europe/Warsaw" })}</p>
                    </div>
                    {a.komentarz && <p className="mt-1 text-gray-700 dark:text-gray-300">{a.komentarz}</p>}
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>
      )}
      {(odpowiedz || nps) && (
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{odpowiedz ? "Odpowiedź dla zgłaszającego" : "Ustawienia"}</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {odpowiedz
              ? "Każdy, kto zostawi adres e-mail, dostaje od razu wiadomość z poniższą treścią. Bez uzupełnienia mail do zgłaszającego nie jest wysyłany."
              : "Nazwa firmy pojawia się w pytaniu ankiety."}
          </p>
          <form onSubmit={zapisz} className="mt-4 grid gap-3">
            <input className={POLE} placeholder="Nazwa firmy w podpisie" aria-label="Nazwa firmy" value={ust.firma ?? ""} onChange={(e) => setUst({ ...ust, firma: e.target.value })} />
            {odpowiedz && <textarea className={POLE} rows={5} placeholder="Krótka oferta: co robi firma, ile to kosztuje, kiedy nastąpi kontakt" aria-label="Treść oferty" value={ust.oferta ?? ""} onChange={(e) => setUst({ ...ust, oferta: e.target.value })} />}
            {odpowiedz && <input className={POLE} type="url" placeholder="Link do kalendarza, https://..." aria-label="Link do kalendarza" value={ust.kalendarz ?? ""} onChange={(e) => setUst({ ...ust, kalendarz: e.target.value })} />}
            <div className="flex items-center gap-4">
              <button type="submit" disabled={stan === "zapis"} className="btn-primary disabled:opacity-50">
                {stan === "zapis" ? "Zapis..." : "Zapisz"}
              </button>
              {stan === "ok" && <span className="text-sm text-emerald-700 dark:text-emerald-400">Zapisane, działa od następnego zgłoszenia.</span>}
              {stan === "blad" && <span className="text-sm text-red-700 dark:text-red-400">{blad}</span>}
            </div>
          </form>
        </section>
      )}
      <section>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Zgłoszenia</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Formularz: <a className="break-all text-accent underline" href={adresForm}>{adresForm}</a>
        </p>
        {leady.length === 0 ? (
          <p className="mt-4 rounded-xl border border-gray-200 dark:border-gray-800 p-5 text-sm text-gray-600 dark:text-gray-400">
            Jeszcze nic nie wpłynęło. Wklej formularz na stronę albo wyślij zgłoszenie próbne.
          </p>
        ) : (
          <ul className="mt-4 grid gap-3">
            {leady.map((l) => (
              <li key={l.id} className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/50 p-4 text-sm">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {l.firma?.nazwa || l.pola.firma || l.pola.imie || l.pola.email || "Zgłoszenie"}
                  </p>
                  <p className="text-xs text-gray-500">{new Date(l.czas).toLocaleString("pl-PL", { dateStyle: "short", timeStyle: "short", timeZone: "Europe/Warsaw" })}</p>
                </div>
                {l.ocena?.kategoria && (
                  <p className={`mt-1 font-semibold ${KOLOR[l.ocena.kategoria] ?? ""}`}>
                    Lead {l.ocena.kategoria}, {l.ocena.punkty}/10
                  </p>
                )}
                {l.ocena?.streszczenie && <p className="mt-1 text-gray-700 dark:text-gray-300">{l.ocena.streszczenie}</p>}
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {[l.pola.imie, l.pola.email, l.pola.telefon].filter(Boolean).join(" · ")}
                </p>
                {l.pola.wiadomosc && <p className="mt-1 text-gray-700 dark:text-gray-300">{l.pola.wiadomosc}</p>}
                {l.firma && !l.firma.blad && (
                  <p className="mt-2 text-xs text-gray-500">
                    {[l.firma.adres, l.firma.krs && `KRS ${l.firma.krs}`, l.firma.branza].filter(Boolean).join(" · ")}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
