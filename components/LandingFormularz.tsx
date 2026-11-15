"use client";

import { useState } from "react";

import { KOLORY } from "@/lib/landing-kolory";

type Props = { slug: string; nazwa: string; przycisk: string; kolor: string; demo?: boolean };

export default function LandingFormularz({ slug, nazwa, przycisk, kolor, demo }: Props) {
  const [imie, setImie] = useState("");
  const [kontakt, setKontakt] = useState("");
  const [wiadomosc, setWiadomosc] = useState("");
  const [zgoda, setZgoda] = useState(false);
  const [firma, setFirma] = useState("");
  const [stan, setStan] = useState<"" | "trwa" | "ok" | "blad">("");
  const [blad, setBlad] = useState("");
  const barwa = KOLORY[kolor] ?? KOLORY.niebieski;

  async function wyslij(e: React.FormEvent) {
    e.preventDefault();
    if (demo) return setStan("ok");
    setStan("trwa");
    const r = await fetch("/api/landing-zgloszenie", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ slug, imie, kontakt, wiadomosc, zgoda, firma }),
    }).catch(() => null);
    if (r?.ok) return setStan("ok");
    setBlad(((await r?.json().catch(() => null)) as { error?: string } | null)?.error ?? "Coś poszło nie tak. Spróbuj ponownie.");
    setStan("blad");
  }

  if (stan === "ok")
    return (
      <p className="lf-ok" aria-live="polite">
        {demo ? "To wersja demonstracyjna, nic nie wysyłamy." : "Dziękujemy, odezwiemy się najszybciej, jak to możliwe."}
        <style>{CSS}</style>
      </p>
    );

  return (
    <form className="lf" onSubmit={wyslij} style={{ ["--b" as string]: barwa }}>
      <style>{CSS}</style>
      <label>
        Imię
        <input required maxLength={80} autoComplete="given-name" value={imie} onChange={(e) => setImie(e.target.value)} />
      </label>
      <label>
        Telefon lub e-mail
        <input required maxLength={120} autoComplete="email" value={kontakt} onChange={(e) => setKontakt(e.target.value)} />
      </label>
      <label>
        Wiadomość (opcjonalnie)
        <textarea rows={3} maxLength={1500} value={wiadomosc} onChange={(e) => setWiadomosc(e.target.value)} />
      </label>
      <input className="pulapka" tabIndex={-1} autoComplete="off" aria-hidden="true" name="firma" value={firma} onChange={(e) => setFirma(e.target.value)} />
      <label className="zgoda">
        <input type="checkbox" checked={zgoda} onChange={(e) => setZgoda(e.target.checked)} required />
        <span>Zgadzam się, aby {nazwa} skontaktowała się ze mną w sprawie tego zapytania.</span>
      </label>
      <button type="submit" disabled={stan === "trwa"}>
        {przycisk}
      </button>
      {stan === "blad" && <p className="blad">{blad}</p>}
    </form>
  );
}

const CSS = `
.lf label{display:block;font-size:14px;margin:0 0 12px}
.lf input:not([type=checkbox]),.lf textarea{display:block;width:100%;box-sizing:border-box;margin-top:6px;padding:11px;font-size:16px;border:1px solid #d1d5db;border-radius:10px;font-family:inherit}
.lf .zgoda{display:flex;gap:8px;align-items:flex-start;font-size:12px;color:#4b5563}
.lf .zgoda input{margin-top:3px}
.lf .pulapka{position:absolute;left:-9999px;width:1px;height:1px;opacity:0}
.lf button{display:block;width:100%;background:var(--b);color:#fff;border:0;padding:14px;border-radius:10px;font-size:16px;font-weight:600;cursor:pointer}
.lf button:disabled{opacity:.6}
.lf .blad{font-size:14px;color:#b91c1c;margin:10px 0 0}
.lf-ok{font-size:15px;line-height:1.5;background:#f3f4f6;border-radius:12px;padding:14px}
`;
