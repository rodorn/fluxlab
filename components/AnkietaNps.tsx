"use client";

import { useState } from "react";

export default function AnkietaNps({ token, firma }: { token: string; firma: string }) {
  const [ocena, setOcena] = useState<number | null>(null);
  const [komentarz, setKomentarz] = useState("");
  const [stan, setStan] = useState<"" | "trwa" | "ok" | "blad">("");
  const [blad, setBlad] = useState("");

  async function wyslij(e: React.FormEvent) {
    e.preventDefault();
    if (ocena === null) return;
    setStan("trwa");
    const r = await fetch(`/api/ankieta/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ocena, komentarz }),
    }).catch(() => null);
    const d = await r?.json().catch(() => ({}));
    if (r?.ok) setStan("ok");
    else {
      setBlad(d?.error || "Nie udało się wysłać. Spróbuj za chwilę.");
      setStan("blad");
    }
  }

  if (stan === "ok") return <p className="rounded-lg bg-gray-100 p-4 text-sm">Dziękujemy za odpowiedź.</p>;

  return (
    <form onSubmit={wyslij} className="grid gap-4">
      <h1 className="text-xl font-bold">{firma ? `Jak oceniasz współpracę z firmą ${firma}?` : "Jak oceniasz naszą firmę?"}</h1>
      <p className="text-sm text-gray-600">Czy poleciłbyś nas znajomym? 0 to zdecydowanie nie, 10 to zdecydowanie tak.</p>
      <div className="grid grid-cols-6 gap-2 sm:grid-cols-11" role="radiogroup" aria-label="Ocena od 0 do 10">
        {Array.from({ length: 11 }, (_, i) => (
          <button
            key={i}
            type="button"
            role="radio"
            aria-checked={ocena === i}
            onClick={() => setOcena(i)}
            className={`rounded-lg border px-0 py-3 text-sm font-semibold ${ocena === i ? "border-gray-900 bg-gray-900 text-white" : "border-gray-300 bg-white text-gray-900"}`}
          >
            {i}
          </button>
        ))}
      </div>
      <textarea
        value={komentarz}
        maxLength={1000}
        rows={3}
        onChange={(e) => setKomentarz(e.target.value)}
        placeholder="Co możemy poprawić? (opcjonalnie)"
        aria-label="Komentarz"
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900"
      />
      {stan === "blad" && <p className="text-sm text-red-700">{blad}</p>}
      <button type="submit" disabled={ocena === null || stan === "trwa"} className="rounded-lg bg-gray-900 px-4 py-3 text-sm font-semibold text-white disabled:opacity-50">
        {stan === "trwa" ? "Wysyłamy..." : "Wyślij"}
      </button>
    </form>
  );
}
