"use client";

import { useState } from "react";

const POLE =
  "w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-900";

export default function FormularzLeada({ token }: { token: string }) {
  const [stan, setStan] = useState<"idle" | "trwa" | "ok" | "blad">("idle");
  const [blad, setBlad] = useState("");

  async function wyslij(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const dane = Object.fromEntries(new FormData(e.currentTarget).entries());
    setStan("trwa");
    try {
      const r = await fetch(`/api/lead/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dane),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) {
        setBlad(d?.error || "Nie udało się wysłać zgłoszenia.");
        setStan("blad");
        return;
      }
      setStan("ok");
    } catch {
      setBlad("Brak połączenia. Spróbuj ponownie.");
      setStan("blad");
    }
  }

  if (stan === "ok")
    return (
      <p className="rounded-lg bg-emerald-50 p-4 text-sm text-emerald-900">
        Dziękujemy, zgłoszenie dotarło. Odezwiemy się najszybciej, jak to możliwe.
      </p>
    );

  return (
    <form onSubmit={wyslij} className="grid gap-3 text-gray-900">
      <input name="imie" placeholder="Imię" aria-label="Imię" autoComplete="given-name" className={POLE} />
      <input name="email" type="email" placeholder="E-mail" aria-label="E-mail" autoComplete="email" className={POLE} />
      <input name="telefon" type="tel" placeholder="Telefon" aria-label="Telefon" autoComplete="tel" className={POLE} />
      <input name="firma" placeholder="Firma (opcjonalnie)" aria-label="Firma" autoComplete="organization" className={POLE} />
      <input name="nip" inputMode="numeric" placeholder="NIP (opcjonalnie)" aria-label="NIP" className={POLE} />
      <textarea name="wiadomosc" rows={3} placeholder="W czym możemy pomóc?" aria-label="Wiadomość" className={POLE} />
      <p className="text-xs text-gray-500">Podaj e-mail albo telefon. Dane posłużą wyłącznie do odpowiedzi na to zgłoszenie.</p>
      {stan === "blad" && <p className="text-sm text-red-700">{blad}</p>}
      <button type="submit" disabled={stan === "trwa"} className="rounded-lg bg-gray-900 px-4 py-3 text-sm font-semibold text-white disabled:opacity-50">
        {stan === "trwa" ? "Wysyłamy..." : "Wyślij zgłoszenie"}
      </button>
    </form>
  );
}
