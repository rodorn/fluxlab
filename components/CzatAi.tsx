"use client";

import { useRef, useState } from "react";

type Wiad = { r: "u" | "a"; t: string };

export default function CzatAi({ token, firma, demo }: { token?: string; firma: string; demo?: boolean }) {
  const [hist, setHist] = useState<Wiad[]>([]);
  const [tekst, setTekst] = useState("");
  const [zajety, setZajety] = useState(false);
  const [blad, setBlad] = useState("");
  const dol = useRef<HTMLDivElement>(null);

  async function wyslij(e: React.FormEvent) {
    e.preventDefault();
    const t = tekst.trim();
    if (!t || zajety) return;
    const nowa: Wiad[] = [...hist, { r: "u" as const, t }];
    setHist(nowa);
    setTekst("");
    setBlad("");
    setZajety(true);
    try {
      const r = await fetch(demo ? "/api/czat-demo" : `/api/czat-klienta/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ historia: nowa.slice(-12) }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Błąd");
      setHist([...nowa, { r: "a", t: d.odpowiedz }]);
    } catch (err) {
      setBlad(err instanceof Error ? err.message : "Błąd");
    } finally {
      setZajety(false);
      setTimeout(() => dol.current?.scrollIntoView({ block: "end" }), 50);
    }
  }

  return (
    <div className="text-gray-900">
      <p className="mb-3 text-sm font-semibold">{firma ? `Zapytaj ${firma}` : "Zapytaj nas"}</p>
      <div className="mb-3 max-h-80 min-h-32 space-y-2 overflow-y-auto rounded-xl border border-gray-200 bg-gray-50 p-3" aria-live="polite">
        {!hist.length && <p className="text-sm text-gray-600">Napisz pytanie, odpowiem na podstawie informacji ze strony.</p>}
        {hist.map((m, i) => (
          <p key={i} className={`max-w-[85%] whitespace-pre-wrap rounded-xl px-3 py-2 text-sm ${m.r === "u" ? "ml-auto bg-indigo-600 text-white" : "bg-white text-gray-900 border border-gray-200"}`}>
            {m.t}
          </p>
        ))}
        {zajety && <p className="text-sm text-gray-500">Trwa pisanie odpowiedzi...</p>}
        <div ref={dol} />
      </div>
      {blad && <p role="alert" className="mb-2 text-sm text-red-700">{blad}</p>}
      <form onSubmit={wyslij} className="flex gap-2">
        <input value={tekst} onChange={(e) => setTekst(e.target.value)} maxLength={500} placeholder="Twoje pytanie" aria-label="Twoje pytanie" className="min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-base text-gray-900" />
        <button type="submit" disabled={zajety || !tekst.trim()} className="btn-primary disabled:opacity-50">Wyślij</button>
      </form>
      <p className="mt-2 text-xs text-gray-500">Odpowiada asystent AI na podstawie informacji firmy. Rozmowy nie zapisujemy.</p>
    </div>
  );
}
