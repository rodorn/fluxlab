"use client";

import { useState } from "react";
import { WOJEWODZTWA } from "@/lib/leady/bzp";

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

export interface RezerwacjaWiersz {
  id: string;
  slot: string;
  imie: string;
  email: string;
  telefon: string;
  uwagi: string;
}

export interface OpiniaWiersz {
  id: string;
  czas: string;
  email: string;
  imie: string;
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
  opinie,
  rezerwacje,
  bzp,
  ustawienia,
}: {
  panel: string;
  token: string;
  produkty: string[];
  leady: LeadWiersz[];
  ankiety: AnkietaWiersz[];
  opinie: OpiniaWiersz[];
  rezerwacje: RezerwacjaWiersz[];
  bzp: { nr: string; tytul: string; org: string; miasto: string; termin: string; url: string }[];
  ustawienia: Record<string, string>;
}) {
  const [ust, setUst] = useState(ustawienia);
  const [stan, setStan] = useState<"" | "zapis" | "ok" | "blad">("");
  const [blad, setBlad] = useState("");
  const odpowiedz = produkty.includes("lead-odpowiedz");
  const nps = produkty.includes("lead-nps");
  const rez = produkty.includes("lead-rezerwacje");
  const czat = produkty.includes("lead-czat");
  const bz = produkty.includes("lead-bzp");
  const kalk = produkty.includes("lead-kalkulator");
  const opinia = produkty.includes("lead-opinia");
  const [pr, setPr] = useState({ email: "", imie: "" });
  const [lista, setLista] = useState(opinie);
  const [prStan, setPrStan] = useState("");
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

  async function wyslijProsbe(e: React.FormEvent) {
    e.preventDefault();
    setPrStan("Wysyłanie...");
    const r = await fetch(`/api/opinia/${panel}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pr),
    }).catch(() => null);
    const d = await r?.json().catch(() => ({}));
    if (r?.ok) {
      setLista([{ id: String(Date.now()), czas: new Date().toISOString(), ...pr }, ...lista]);
      setPr({ email: "", imie: "" });
      setPrStan("Prośba wysłana.");
    } else setPrStan(d?.error || "Nie udało się wysłać.");
  }

  const adresForm = `https://fluxlab.pl/leady/formularz/${token}`;

  return (
    <div className="grid gap-10">
      {bz && (
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Zamówienia publiczne BZP</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Wpisz w ustawieniach poniżej słowa kluczowe lub kody CPV. Po zapisaniu dostaniesz mail z ogłoszeniami z ostatnich 2 dni, potem codziennie rano nowe, tylko gdy coś pasuje.
          </p>
          {bzp.length > 0 && (
            <ul className="mt-4 grid gap-3">
              {bzp.map((o) => (
                <li key={o.nr} className="rounded-xl border border-gray-200 p-3 text-sm dark:border-gray-700">
                  <a className="font-semibold text-accent underline" href={o.url} target="_blank" rel="noreferrer">{o.tytul.slice(0, 200)}</a>
                  <div className="mt-1 text-gray-600 dark:text-gray-400">{o.org}, {o.miasto}. Termin ofert: {o.termin ? new Date(o.termin).toLocaleDateString("pl-PL") : "brak"}</div>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
      {czat && (
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Czat AI</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Czat: <a className="break-all text-accent underline" href={`https://fluxlab.pl/leady/czat/${token}`}>{`https://fluxlab.pl/leady/czat/${token}`}</a>. Wklej informacje o firmie w ustawieniach poniżej, bez nich czat jest wyłączony.
          </p>
        </section>
      )}
      {rez && (
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Rezerwacje</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Kalendarz: <a className="break-all text-accent underline" href={`https://fluxlab.pl/leady/rezerwacje/${token}`}>{`https://fluxlab.pl/leady/rezerwacje/${token}`}</a>. Dni, godziny i długość wizyty ustawisz niżej w Ustawieniach (dni: 1 = poniedziałek, 12345 = pn-pt).
          </p>
          {rezerwacje.length === 0 ? (
            <p className="mt-4 rounded-xl border border-gray-200 dark:border-gray-800 p-5 text-sm text-gray-600 dark:text-gray-400">Brak nadchodzących rezerwacji.</p>
          ) : (
            <ul className="mt-4 grid gap-2">
              {rezerwacje.map((r) => (
                <li key={r.id} className="rounded-xl border border-gray-200 dark:border-gray-800 p-3 text-sm">
                  <p className="font-semibold text-gray-900 dark:text-white">{r.slot}</p>
                  <p className="break-all text-gray-700 dark:text-gray-300">{[r.imie, r.email, r.telefon].filter(Boolean).join(" · ")}</p>
                  {r.uwagi && <p className="text-gray-600 dark:text-gray-400">{r.uwagi}</p>}
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
      {opinia && (
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Prośba o opinię Google</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Najpierw wklej niżej link do opinii z Twojego profilu firmy w Google i zapisz. Z Zapier i Make wyślij POST JSON (email, imie) na <span className="break-all">https://fluxlab.pl/api/opinia/{panel}</span>. Ten adres jest tajny.
          </p>
          <form onSubmit={wyslijProsbe} className="mt-4 grid gap-3 sm:grid-cols-2">
            <input className={POLE} type="email" required placeholder="E-mail klienta" aria-label="E-mail klienta" value={pr.email} onChange={(e) => setPr({ ...pr, email: e.target.value })} />
            <input className={POLE} placeholder="Imię klienta (opcjonalnie)" aria-label="Imię klienta" value={pr.imie} onChange={(e) => setPr({ ...pr, imie: e.target.value })} />
            <div className="flex items-center gap-4 sm:col-span-2">
              <button type="submit" className="btn-primary">Wyślij prośbę</button>
              {prStan && <span className="text-sm text-gray-700 dark:text-gray-300">{prStan}</span>}
            </div>
          </form>
          {lista.length > 0 && (
            <ul className="mt-4 grid gap-2">
              {lista.map((o) => (
                <li key={o.id} className="flex flex-wrap justify-between gap-2 rounded-xl border border-gray-200 dark:border-gray-800 p-3 text-sm">
                  <span className="break-all text-gray-900 dark:text-white">{[o.imie, o.email].filter(Boolean).join(" · ")}</span>
                  <span className="text-xs text-gray-500">{new Date(o.czas).toLocaleString("pl-PL", { dateStyle: "short", timeStyle: "short", timeZone: "Europe/Warsaw" })}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
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
      {(odpowiedz || nps || opinia || kalk || rez || czat || bz) && (
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{odpowiedz ? "Odpowiedź dla zgłaszającego" : "Ustawienia"}</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {odpowiedz
              ? "Każdy, kto zostawi adres e-mail, dostaje od razu wiadomość z poniższą treścią. Bez uzupełnienia mail do zgłaszającego nie jest wysyłany."
              : "Nazwa firmy pojawia się w pytaniu ankiety i w mailu z prośbą o opinię."}
          </p>
          <form onSubmit={zapisz} className="mt-4 grid gap-3">
            <input className={POLE} placeholder="Nazwa firmy w podpisie" aria-label="Nazwa firmy" value={ust.firma ?? ""} onChange={(e) => setUst({ ...ust, firma: e.target.value })} />
            {odpowiedz && <textarea className={POLE} rows={5} placeholder="Krótka oferta: co robi firma, ile to kosztuje, kiedy nastąpi kontakt" aria-label="Treść oferty" value={ust.oferta ?? ""} onChange={(e) => setUst({ ...ust, oferta: e.target.value })} />}
            {odpowiedz && <input className={POLE} type="url" placeholder="Link do kalendarza, https://..." aria-label="Link do kalendarza" value={ust.kalendarz ?? ""} onChange={(e) => setUst({ ...ust, kalendarz: e.target.value })} />}
            {rez && (
              <div className="grid gap-3 sm:grid-cols-4">
                <input className={POLE} placeholder="Dni, np. 12345" aria-label="Dni rezerwacji (1 = poniedziałek)" value={ust.rez_dni ?? ""} onChange={(e) => setUst({ ...ust, rez_dni: e.target.value })} />
                <input className={POLE} placeholder="Od, np. 09:00" aria-label="Godzina od" value={ust.rez_od ?? ""} onChange={(e) => setUst({ ...ust, rez_od: e.target.value })} />
                <input className={POLE} placeholder="Do, np. 17:00" aria-label="Godzina do" value={ust.rez_do ?? ""} onChange={(e) => setUst({ ...ust, rez_do: e.target.value })} />
                <input className={POLE} inputMode="numeric" placeholder="Wizyta, minut" aria-label="Długość wizyty w minutach" value={ust.rez_min ?? ""} onChange={(e) => setUst({ ...ust, rez_min: e.target.value })} />
              </div>
            )}
            {bz && <input className={POLE} placeholder="Słowa kluczowe po przecinku, np. remont, dach, oprogramowanie" aria-label="Słowa kluczowe BZP" value={ust.bzp_slowa ?? ""} onChange={(e) => setUst({ ...ust, bzp_slowa: e.target.value })} />}
            {bz && <input className={POLE} placeholder="Kody CPV po przecinku, np. 45261000, 72" aria-label="Kody CPV" value={ust.bzp_cpv ?? ""} onChange={(e) => setUst({ ...ust, bzp_cpv: e.target.value })} />}
            {bz && (
              <select className={POLE} aria-label="Województwo" value={ust.bzp_woj ?? ""} onChange={(e) => setUst({ ...ust, bzp_woj: e.target.value })}>
                <option value="">Cała Polska</option>
                {Object.entries(WOJEWODZTWA).map(([kod, n]) => <option key={kod} value={kod}>{n}</option>)}
              </select>
            )}
            {czat && <textarea className={POLE} rows={8} placeholder={"Informacje o firmie dla czatu: oferta, ceny, godziny, obszar działania, kontakt, najczęstsze pytania. Czat odpowie tylko na ich podstawie."} aria-label="Wiedza czatu AI" value={ust.wiedza ?? ""} onChange={(e) => setUst({ ...ust, wiedza: e.target.value })} />}
            {kalk && <textarea className={POLE} rows={6} placeholder={"Pozycje kalkulatora, jedna w linii:\nMontaż okna | 450\nMalowanie ścian | 1200"} aria-label="Pozycje kalkulatora wyceny" value={ust.wycena ?? ""} onChange={(e) => setUst({ ...ust, wycena: e.target.value })} />}
            {opinia && <input className={POLE} type="url" placeholder="Link do opinii Google, https://..." aria-label="Link do opinii Google" value={ust.opinia ?? ""} onChange={(e) => setUst({ ...ust, opinia: e.target.value })} />}
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
