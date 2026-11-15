"use client";

import { useState } from "react";
import { dzienKrotko, etykieta } from "@/lib/leady/rezerwacje";

const POLE = "w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-900";

export default function RezerwacjaOnline({ token, firma, dni, demo = false }: { token?: string; firma: string; dni: { data: string; godziny: string[] }[]; demo?: boolean }) {
  const [dzien, setDzien] = useState(dni[0]?.data ?? "");
  const [godz, setGodz] = useState("");
  const [stan, setStan] = useState<"" | "trwa" | "ok" | "blad">("");
  const [blad, setBlad] = useState("");
  const godziny = dni.find((d) => d.data === dzien)?.godziny ?? [];

  async function wyslij(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (demo || !godz) return;
    setStan("trwa");
    const f = new FormData(e.currentTarget);
    const r = await fetch(`/api/rezerwacja/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slot: `${dzien} ${godz}`, imie: f.get("imie"), email: f.get("email"), telefon: f.get("telefon"), uwagi: f.get("uwagi") }),
    }).catch(() => null);
    const d = await r?.json().catch(() => ({}));
    if (r?.ok) setStan("ok");
    else {
      setBlad(d?.error || "Nie udało się zarezerwować. Spróbuj za chwilę.");
      setStan("blad");
    }
  }

  if (stan === "ok")
    return (
      <p className="rounded-lg bg-emerald-50 p-4 text-sm text-emerald-900" role="status">
        Termin zarezerwowany: {etykieta(dzien, godz)}. Potwierdzenie wysłaliśmy na Twój e-mail.
      </p>
    );
  if (!dni.length) return <p className="text-sm text-gray-600">Brak wolnych terminów. Spróbuj później.</p>;

  return (
    <form onSubmit={wyslij} className="grid gap-4 text-gray-900">
      <p className="text-base font-bold">Zarezerwuj termin{firma ? ` w firmie ${firma}` : ""}</p>
      <div className="flex gap-2 overflow-x-auto pb-1" role="radiogroup" aria-label="Dzień">
        {dni.map((d) => (
          <button key={d.data} type="button" role="radio" aria-checked={dzien === d.data} onClick={() => { setDzien(d.data); setGodz(""); }}
            className={`shrink-0 rounded-lg border px-3 py-2 text-sm font-semibold ${dzien === d.data ? "border-gray-900 bg-gray-900 text-white" : "border-gray-300"}`}>
            {dzienKrotko(d.data)}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-2" role="radiogroup" aria-label="Godzina">
        {godziny.map((g) => (
          <button key={g} type="button" role="radio" aria-checked={godz === g} onClick={() => setGodz(g)}
            className={`rounded-lg border py-2.5 text-sm font-semibold ${godz === g ? "border-gray-900 bg-gray-900 text-white" : "border-gray-300"}`}>
            {g}
          </button>
        ))}
      </div>
      {!demo && (
        <>
          <input name="imie" required placeholder="Imię" aria-label="Imię" autoComplete="given-name" className={POLE} />
          <input name="email" type="email" required placeholder="E-mail (na potwierdzenie)" aria-label="E-mail" autoComplete="email" className={POLE} />
          <input name="telefon" type="tel" placeholder="Telefon (opcjonalnie)" aria-label="Telefon" autoComplete="tel" className={POLE} />
          <textarea name="uwagi" rows={2} placeholder="Uwagi (opcjonalnie)" aria-label="Uwagi" className={POLE} />
          <p className="text-xs text-gray-500">Dane posłużą wyłącznie do obsługi tej rezerwacji. Potwierdzenie przyjdzie mailem.</p>
          {stan === "blad" && <p className="text-sm text-red-700">{blad}</p>}
          <button type="submit" disabled={stan === "trwa" || !godz} className="rounded-lg bg-gray-900 px-4 py-3 text-sm font-semibold text-white disabled:opacity-50">
            {stan === "trwa" ? "Rezerwujemy..." : godz ? `Zarezerwuj ${godz}` : "Wybierz godzinę"}
          </button>
        </>
      )}
    </form>
  );
}
