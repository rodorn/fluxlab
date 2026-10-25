import { RODZAJE } from "@/lib/opcjeStrony";
import { zl } from "@/lib/wycena";


const OD = new Set(["sklep"]);
const PLATNOSC: Record<string, string> = {
  landing: "Useme albo 50% proformą",
  firmowa: "30% z góry",
  sklep: "Po rozmowie",
};
const SRODEK = 1;

const th =
  "px-4 py-3 text-left align-baseline text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400";
const kol = (i: number) =>
  i === SRODEK ? "bg-gray-50/80 dark:bg-white/[0.04]" : "";

export default function TabelaCennika() {
  const wiersze: { nazwa: string; wartosc: (i: number) => string; przyklad?: (i: number) => string; duze?: boolean }[] = [
    {
      nazwa: "Cena netto",
      duze: true,
      wartosc: (i) => `${OD.has(RODZAJE[i].id) ? "od " : ""}${zl(RODZAJE[i].cena)}`,
    },
    {
      nazwa: "Podstrony",
      wartosc: (i) => `do ${RODZAJE[i].podstron}`,
      przyklad: (i) => RODZAJE[i].przyklad,
    },
    {
      nazwa: "Czas",
      wartosc: (i) =>
        RODZAJE[i].tygodnie === 1 ? "7 dni" : `${RODZAJE[i].tygodnie} tyg.`,
    },
    { nazwa: "W zakresie", wartosc: (i) => RODZAJE[i].opis },
    { nazwa: "Płatność", wartosc: (i) => PLATNOSC[RODZAJE[i].id] ?? "" },
  ];

  return (
    <div>
      <p className="mb-2 text-right text-xs text-gray-500 dark:text-gray-400 md:hidden" aria-hidden="true">
        Przesuń tabelę w bok →
      </p>
      <div className="overflow-x-auto overscroll-x-contain border-y border-gray-300 dark:border-gray-600 [-webkit-overflow-scrolling:touch]">
        <table className="w-full min-w-[40rem] border-collapse text-sm text-gray-900 dark:text-gray-100 [font-variant-numeric:tabular-nums]">
          <caption className="sr-only">
            Porównanie pakietów stron WWW: cena netto, liczba podstron, czas realizacji, zakres i płatność.
          </caption>
          <thead>
            <tr className="border-b border-gray-300 dark:border-gray-600">
              <td className="w-[7.5rem] px-4 py-4 sm:w-36" />
              {RODZAJE.map((r, i) => (
                <th
                  key={r.id}
                  scope="col"
                  className={`${th} ${kol(i)} !normal-case !tracking-normal !text-base !font-semibold !text-gray-900 dark:!text-white`}
                >
                  {r.nazwa}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {wiersze.map((w) => (
              <tr
                key={w.nazwa}
                className="border-b border-gray-200 last:border-b-0 dark:border-gray-700/70"
              >
                <th scope="row" className={`${th} sticky left-0 z-10 bg-white py-4 dark:bg-gray-900`}>
                  {w.nazwa}
                </th>
                {RODZAJE.map((r, i) => (
                  <td
                    key={r.id}
                    className={`px-4 py-4 align-baseline ${kol(i)} ${
                      w.duze
                        ? "text-2xl font-semibold tracking-tight text-accent"
                        : "leading-relaxed text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {w.wartosc(i)}
                    {w.przyklad && (
                      <span className="mt-1 block text-xs text-gray-500 dark:text-gray-400">
                        {w.przyklad(i)}
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
