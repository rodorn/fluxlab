const WIERSZE = [
  [
    "2026-11-14 16:42",
    "Anna Kowalska",
    "anna@firma-przyklad.pl",
    "Proszę o wycenę 3 stanowisk.",
  ],
  [
    "2026-11-15 08:10",
    "Marek Nowak",
    "marek@sklep-przyklad.pl",
    "Czy jest integracja z Allegro?",
  ],
];

/** Przykładowy arkusz i wiadomość na kanale, podpisane jako przykład. */
export default function PodgladFormularza() {
  return (
    <div className="mx-auto mt-16 max-w-3xl text-left">
      <h2 className="h2-sekcji text-center">Tak wygląda efekt</h2>
      <p className="mt-3 text-center text-sm text-gray-600 dark:text-gray-300">
        Dane poniżej są przykładowe.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-gray-200/80 bg-white p-4 text-gray-900 dark:border-gray-800/80">
          <p className="text-xs font-semibold text-gray-500">Arkusz Google</p>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-200">
                  {["Data", "Imię i nazwisko", "E-mail", "Wiadomość"].map(
                    (h) => (
                      <th key={h} className="py-1 pr-3 font-semibold">
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {WIERSZE.map((w) => (
                  <tr key={w[0]} className="border-b border-gray-100 align-top">
                    {w.map((c, i) => (
                      <td key={i} className="py-1 pr-3">
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-200/80 bg-white p-4 text-gray-900 dark:border-gray-800/80">
          <p className="text-xs font-semibold text-gray-500">
            Kanał w Teams lub Slacku
          </p>
          <div className="mt-2 rounded-xl bg-gray-50 p-3 text-sm">
            <p className="font-semibold">
              Nowe zgłoszenie: Zapytania ze strony
            </p>
            <dl className="mt-2 space-y-1 text-xs">
              <div className="flex gap-2">
                <dt className="font-semibold">Imię i nazwisko</dt>
                <dd>Marek Nowak</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-semibold">E-mail</dt>
                <dd>marek@sklep-przyklad.pl</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-semibold">Wiadomość</dt>
                <dd>Czy jest integracja z Allegro?</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
