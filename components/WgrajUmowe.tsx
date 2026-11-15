"use client";

import { useState } from "react";

const POLE =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-accent dark:border-gray-700 dark:bg-gray-950 dark:text-white file:mr-3 file:rounded-md file:border-0 file:bg-gray-100 file:px-3 file:py-1.5 file:text-sm file:font-semibold dark:file:bg-gray-800";

export default function WgrajUmowe({ sesja, porownanie }: { sesja: string; porownanie: boolean }) {
  const [laduje, setLaduje] = useState(false);
  const [blad, setBlad] = useState("");
  const [wynik, setWynik] = useState<{ email: string; wyslano: boolean; html: string } | null>(null);

  async function wyslij(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (laduje) return;
    setLaduje(true);
    setBlad("");
    try {
      const f = new FormData(e.currentTarget);
      f.set("sesja", sesja);
      const r = await fetch("/api/umowy", { method: "POST", body: f });
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ok) throw new Error(d.error || "Coś poszło nie tak. Spróbuj ponownie.");
      setWynik(d);
    } catch (err) {
      setBlad((err as Error).message);
    } finally {
      setLaduje(false);
    }
  }

  if (wynik)
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gotowe</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          {wynik.wyslano ? `Wynik wysłaliśmy też na adres ${wynik.email}.` : "Nie udało się wysłać maila, więc wynik masz tylko tutaj."}
        </p>
        <iframe
          title="Wynik analizy"
          srcDoc={wynik.html}
          sandbox=""
          className="mt-5 h-[70vh] w-full rounded-xl border border-gray-200 bg-white dark:border-gray-800"
        />
      </div>
    );

  return (
    <form onSubmit={wyslij} className="flex flex-col gap-3 text-left">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Płatność przyjęta</h1>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        {porownanie ? "Wgraj dwie wersje umowy w PDF: najpierw starszą, potem nowszą." : "Wgraj umowę w PDF, a po chwili pokażemy streszczenie i wyślemy je mailem."}
      </p>
      <input type="file" name="plik" accept="application/pdf,.pdf" required aria-label={porownanie ? "Wersja pierwsza (PDF)" : "Umowa (PDF)"} className={POLE} />
      {porownanie && <input type="file" name="plik" accept="application/pdf,.pdf" required aria-label="Wersja druga (PDF)" className={POLE} />}
      <button type="submit" disabled={laduje} className="btn-primary disabled:opacity-60">
        {laduje ? "Czytamy dokument, to potrwa do 2 minut…" : "Analizuj"}
      </button>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        PDF z tekstem, nie skan; do 4 MB łącznie. Gdy dokumentu nie uda się przeczytać, zwrócimy całą płatność. To analiza automatyczna, a nie porada prawna.
      </p>
      {blad && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {blad}
        </p>
      )}
    </form>
  );
}
