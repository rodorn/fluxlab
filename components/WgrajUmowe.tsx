"use client";

import { useState } from "react";

const POLE =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-accent dark:border-gray-700 dark:bg-gray-950 dark:text-white file:mr-3 file:rounded-md file:border-0 file:bg-gray-100 file:px-3 file:py-1.5 file:text-sm file:font-semibold dark:file:bg-gray-800";

export default function WgrajUmowe({ sesja, porownanie, pytanie, faktury }: { sesja: string; porownanie: boolean; pytanie?: boolean; faktury?: boolean }) {
  const [laduje, setLaduje] = useState(false);
  const [blad, setBlad] = useState("");
  const [wynik, setWynik] = useState<{ email: string; wyslano: boolean; html: string; xlsx?: string } | null>(null);

  async function wyslij(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (laduje) return;
    setLaduje(true);
    setBlad("");
    try {
      const f = new FormData(e.currentTarget);
      f.set("sesja", sesja);
      const r = await fetch(faktury ? "/api/faktury-excel" : "/api/umowy", { method: "POST", body: f });
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
        {wynik.xlsx && (
          <a href={`data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${wynik.xlsx}`} download="faktury.xlsx" className="btn-primary mt-4 inline-block">
            Pobierz Excel
          </a>
        )}
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
        {faktury ? "Wgraj faktury w PDF, do 10 naraz. Po chwili pokażemy tabelę, wyślemy plik Excel mailem i da się go pobrać stąd." : pytanie ? "Opisz sprawę, a po chwili pokażemy wstępną odpowiedź i wyślemy ją mailem." : porownanie ? "Wgraj dwie wersje umowy w PDF: najpierw starszą, potem nowszą." : "Wgraj umowę w PDF, a po chwili pokażemy streszczenie i wyślemy je mailem."}
      </p>
      {faktury ? (
        <input type="file" name="plik" accept="application/pdf,.pdf" multiple required aria-label="Faktury (PDF)" className={POLE} />
      ) : pytanie ? (
        <textarea name="tekst" required minLength={30} maxLength={4000} rows={9} aria-label="Opis sprawy podatkowej" placeholder="Kim jesteś podatkowo (np. JDG na ryczałcie, spółka z o.o., osoba prywatna), co się stało i o co pytasz." className={POLE} />
      ) : (
        <input type="file" name="plik" accept="application/pdf,.pdf" required aria-label={porownanie ? "Wersja pierwsza (PDF)" : "Umowa (PDF)"} className={POLE} />
      )}
      {porownanie && <input type="file" name="plik" accept="application/pdf,.pdf" required aria-label="Wersja druga (PDF)" className={POLE} />}
      <button type="submit" disabled={laduje} className="btn-primary disabled:opacity-60">
        {laduje ? (faktury ? "Czytamy faktury, to potrwa do 2 minut…" : pytanie ? "Przygotowujemy odpowiedź, to potrwa do 2 minut…" : "Czytamy dokument, to potrwa do 2 minut…") : faktury ? "Zamień na Excel" : pytanie ? "Wyślij pytanie" : "Analizuj"}
      </button>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {faktury ? "PDF z tekstem, nie skan; do 4 MB łącznie, 100 faktur w miesiącu. Odczyt jest automatyczny, więc sprawdź kwoty, zanim wgrasz je do księgowości." : pytanie ? "Nie wpisuj PESEL ani numerów rachunków. Gdy odpowiedź się nie uda, zwrócimy całą płatność. To wstępna odpowiedź automatyczna, a nie doradztwo podatkowe." : "PDF z tekstem, nie skan; do 4 MB łącznie. Gdy dokumentu nie uda się przeczytać, zwrócimy całą płatność. To analiza automatyczna, a nie porada prawna."}
      </p>
      {blad && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {blad}
        </p>
      )}
    </form>
  );
}
