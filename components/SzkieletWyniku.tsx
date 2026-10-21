/** Szkielet karty wyniku, widoczny, dopóki narzędzie czeka na odpowiedź.
 *  Układ jak prawdziwy wynik (etykieta, nagłówek, trzy wiersze), żeby strona nie skakała. */
export default function SzkieletWyniku() {
  return (
    <div
      role="status"
      aria-busy="true"
      className="mt-6 rounded-xl border border-gray-200 bg-gray-50/60 p-5 dark:border-gray-800 dark:bg-gray-900/40"
    >
      <span className="sr-only">Trwa sprawdzanie, wynik pojawi się tutaj.</span>
      <div aria-hidden="true" className="space-y-3 animate-pulse motion-reduce:animate-none">
        <div className="h-3 w-24 rounded bg-gray-200 dark:bg-gray-800" />
        <div className="h-6 w-2/3 rounded bg-gray-200 dark:bg-gray-800" />
        <div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-800" />
        <div className="h-3 w-5/6 rounded bg-gray-200 dark:bg-gray-800" />
        <div className="h-3 w-3/5 rounded bg-gray-200 dark:bg-gray-800" />
      </div>
    </div>
  );
}
