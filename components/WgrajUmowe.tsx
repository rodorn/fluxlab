"use client";

import { useState } from "react";

import { PYTANIA } from "@/lib/regulamin-pytania";

const POLE =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-accent dark:border-gray-700 dark:bg-gray-950 dark:text-white file:mr-3 file:rounded-md file:border-0 file:bg-gray-100 file:px-3 file:py-1.5 file:text-sm file:font-semibold dark:file:bg-gray-800";

export default function WgrajUmowe({ sesja, porownanie, pytanie, faktury, adres, ankieta }: { sesja: string; porownanie: boolean; pytanie?: boolean; faktury?: boolean; adres?: boolean; ankieta?: boolean }) {
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
      const r = await fetch(ankieta ? "/api/regulamin-ankieta" : faktury ? "/api/faktury-excel" : adres ? "/api/tlumaczenie-strony" : "/api/umowy", { method: "POST", body: f });
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

  if (ankieta)
    return (
      <form onSubmit={wyslij} className="flex flex-col gap-4 text-left">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Płatność przyjęta</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">Odpowiedz na 15 pytań o sklep. Regulamin i politykę prywatności pokażemy na ekranie i wyślemy mailem jako pliki do wklejenia.</p>
        {PYTANIA.map((p) => (
          <label key={p.nazwa} className="flex flex-col gap-1.5 text-sm font-medium text-gray-900 dark:text-white">
            {p.etykieta}
            {p.typ === "wybor" ? (
              <select name={p.nazwa} required className={POLE} defaultValue="">
                <option value="" disabled>
                  Wybierz
                </option>
                {p.opcje?.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ) : p.typ === "dlugi" ? (
              <textarea name={p.nazwa} required rows={3} maxLength={600} placeholder={p.podpowiedz} className={POLE} />
            ) : (
              <input type="text" name={p.nazwa} required={!p.opcjonalne} maxLength={600} placeholder={p.podpowiedz} className={POLE} />
            )}
          </label>
        ))}
        <button type="submit" disabled={laduje} className="btn-primary disabled:opacity-60">
          {laduje ? "Przygotowujemy dokumenty, to potrwa do 4 minut…" : "Przygotuj dokumenty"}
        </button>
        <p className="text-xs text-gray-500 dark:text-gray-400">Gdy dokumentów nie uda się przygotować, zwrócimy całą płatność. Dokumenty są automatyczne i nie zastępują porady prawnika; przeczytaj je i uzupełnij miejsca w nawiasach kwadratowych przed publikacją.</p>
        {blad && (
          <p role="alert" className="text-sm text-red-600 dark:text-red-400">
            {blad}
          </p>
        )}
      </form>
    );

  return (
    <form onSubmit={wyslij} className="flex flex-col gap-3 text-left">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Płatność przyjęta</h1>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        {adres ? "Podaj adres strony. Pobierzemy ją i do 5 podstron z jej linków, przetłumaczymy teksty na angielski i niemiecki i wyślemy pliki mailem." : faktury ? "Wgraj faktury w PDF, do 10 naraz. Po chwili pokażemy tabelę, wyślemy plik Excel mailem i da się go pobrać stąd." : pytanie ? "Opisz sprawę, a po chwili pokażemy wstępną odpowiedź i wyślemy ją mailem." : porownanie ? "Wgraj dwie wersje umowy w PDF: najpierw starszą, potem nowszą." : "Wgraj umowę w PDF, a po chwili pokażemy streszczenie i wyślemy je mailem."}
      </p>
      {adres ? (
        <input type="text" name="adres" required minLength={4} maxLength={300} inputMode="url" autoCapitalize="none" aria-label="Adres strony" placeholder="twojafirma.pl" className={POLE} />
      ) : faktury ? (
        <input type="file" name="plik" accept="application/pdf,.pdf" multiple required aria-label="Faktury (PDF)" className={POLE} />
      ) : pytanie ? (
        <textarea name="tekst" required minLength={30} maxLength={4000} rows={9} aria-label="Opis sprawy podatkowej" placeholder="Kim jesteś podatkowo (np. JDG na ryczałcie, spółka z o.o., osoba prywatna), co się stało i o co pytasz." className={POLE} />
      ) : (
        <input type="file" name="plik" accept="application/pdf,.pdf" required aria-label={porownanie ? "Wersja pierwsza (PDF)" : "Umowa (PDF)"} className={POLE} />
      )}
      {porownanie && <input type="file" name="plik" accept="application/pdf,.pdf" required aria-label="Wersja druga (PDF)" className={POLE} />}
      <button type="submit" disabled={laduje} className="btn-primary disabled:opacity-60">
        {laduje ? (adres ? "Tłumaczymy stronę, to potrwa do 4 minut…" : faktury ? "Czytamy faktury, to potrwa do 2 minut…" : pytanie ? "Przygotowujemy odpowiedź, to potrwa do 2 minut…" : "Czytamy dokument, to potrwa do 2 minut…") : adres ? "Przetłumacz stronę" : faktury ? "Zamień na Excel" : pytanie ? "Wyślij pytanie" : "Analizuj"}
      </button>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {adres ? "Tłumaczymy teksty widoczne w kodzie strony; treści doładowywane skryptem mogą wypaść. Gdy tłumaczenie się nie uda, zwrócimy całą płatność. Tłumaczenie jest automatyczne, więc przeczytaj je przed publikacją." : faktury ? "PDF z tekstem, nie skan; do 4 MB łącznie, 100 faktur w miesiącu. Odczyt jest automatyczny, więc sprawdź kwoty, zanim wgrasz je do księgowości." : pytanie ? "Nie wpisuj PESEL ani numerów rachunków. Gdy odpowiedź się nie uda, zwrócimy całą płatność. To wstępna odpowiedź automatyczna, a nie doradztwo podatkowe." : "PDF z tekstem, nie skan; do 4 MB łącznie. Gdy dokumentu nie uda się przeczytać, zwrócimy całą płatność. To analiza automatyczna, a nie porada prawna."}
      </p>
      {blad && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {blad}
        </p>
      )}
    </form>
  );
}
