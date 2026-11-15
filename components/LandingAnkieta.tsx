"use client";

import { useState } from "react";

import { KOLORY } from "@/lib/landing-kolory";

type Wstepne = { slug: string; nazwa: string; naglowek: string; opis: string; punkty: string[]; przycisk: string; telefon: string; email: string; kolor: string };

export default function LandingAnkieta({ sesja, wstepne, nazwaZamowienia, emailKlienta }: { sesja: string; wstepne: Wstepne | null; nazwaZamowienia: string; emailKlienta: string }) {
  const w = wstepne;
  const [slug, setSlug] = useState(w?.slug ?? "");
  const [nazwa, setNazwa] = useState(w?.nazwa ?? nazwaZamowienia);
  const [naglowek, setNaglowek] = useState(w?.naglowek ?? "");
  const [opis, setOpis] = useState(w?.opis ?? "");
  const [p1, setP1] = useState(w?.punkty[0] ?? "");
  const [p2, setP2] = useState(w?.punkty[1] ?? "");
  const [p3, setP3] = useState(w?.punkty[2] ?? "");
  const [przycisk, setPrzycisk] = useState(w?.przycisk ?? "Wyślij zapytanie");
  const [telefon, setTelefon] = useState(w?.telefon ?? "");
  const [email, setEmail] = useState(w?.email ?? emailKlienta);
  const [kolor, setKolor] = useState(w?.kolor ?? "niebieski");
  const [stan, setStan] = useState<"" | "trwa" | "ok" | "blad">("");
  const [msg, setMsg] = useState("");

  async function wyslij(e: React.FormEvent) {
    e.preventDefault();
    setStan("trwa");
    const r = await fetch("/api/landing-zapis", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ sesja, slug, nazwa, naglowek, opis, punkty: [p1, p2, p3], przycisk, telefon, email, kolor }),
    }).catch(() => null);
    const d = (await r?.json().catch(() => null)) as { error?: string; adres?: string } | null;
    if (r?.ok && d?.adres) {
      setMsg(d.adres);
      return setStan("ok");
    }
    setMsg(d?.error ?? "Coś poszło nie tak. Spróbuj ponownie.");
    setStan("blad");
  }

  const pole = "mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-base text-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-white";
  const et = "block text-sm text-gray-800 dark:text-gray-200";

  return (
    <form onSubmit={wyslij} className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Treść Twojego landingu</h1>
      <p className="text-sm text-gray-700 dark:text-gray-300">Wypełnij raz, strona działa od razu. Do tej ankiety wrócisz tym samym linkiem i zmienisz treść.</p>
      <label className={et}>Adres strony: fluxlab.pl/l/…
        <input className={pole} required minLength={3} maxLength={40} value={slug} onChange={(e) => setSlug(e.target.value.toLowerCase())} placeholder="np. dachy-kowalski" />
      </label>
      <label className={et}>Nazwa firmy lub oferty
        <input className={pole} required maxLength={80} value={nazwa} onChange={(e) => setNazwa(e.target.value)} />
      </label>
      <label className={et}>Nagłówek (max 120 znaków)
        <input className={pole} required maxLength={120} value={naglowek} onChange={(e) => setNaglowek(e.target.value)} />
      </label>
      <label className={et}>Opis oferty
        <textarea className={pole} required rows={5} maxLength={800} value={opis} onChange={(e) => setOpis(e.target.value)} />
      </label>
      <fieldset className="space-y-2">
        <legend className={et}>Do trzech punktów (opcjonalnie)</legend>
        {[[p1, setP1], [p2, setP2], [p3, setP3]].map(([v, f], i) => (
          <input key={i} className={pole} maxLength={100} value={v as string} onChange={(e) => (f as (s: string) => void)(e.target.value)} />
        ))}
      </fieldset>
      <label className={et}>Tekst przycisku
        <input className={pole} maxLength={30} value={przycisk} onChange={(e) => setPrzycisk(e.target.value)} />
      </label>
      <label className={et}>Telefon do wyświetlenia (opcjonalnie)
        <input className={pole} maxLength={30} inputMode="tel" value={telefon} onChange={(e) => setTelefon(e.target.value)} />
      </label>
      <label className={et}>E-mail, na który wysyłamy zgłoszenia
        <input className={pole} type="email" required maxLength={120} value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label className={et}>Kolor przycisku
        <select className={pole} value={kolor} onChange={(e) => setKolor(e.target.value)}>
          {Object.keys(KOLORY).map((k) => (
            <option key={k} value={k}>{k}</option>
          ))}
        </select>
      </label>
      <button type="submit" disabled={stan === "trwa"} className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white disabled:opacity-60">
        Zapisz i opublikuj
      </button>
      {stan === "blad" && <p className="text-sm text-red-700">{msg}</p>}
      {stan === "ok" && (
        <p className="rounded-lg bg-gray-50 p-3 text-sm text-gray-900 dark:bg-gray-900 dark:text-white" aria-live="polite">
          Strona działa: <a className="underline" href={msg}>{msg}</a>
        </p>
      )}
    </form>
  );
}
