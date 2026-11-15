import { zlozMail, type Raport, type Suma } from "@/lib/automaty/sprzedaz-dzien";

const s = (brutto: number, platnosci: number, zwroty = 0, zwrotyKwota = 0, nieudane = 0, najwieksza = 0): Suma => ({
  waluta: "pln",
  brutto,
  platnosci,
  zwroty,
  zwrotyKwota,
  nieudane,
  najwieksza,
});

const PRZYKLAD: Raport = {
  wczoraj: { od: 0, do: 0, etykieta: "wtorek, 10 listopada" },
  dzis: [s(184_700, 23, 1, 9_900, 2, 49_900)],
  poprzedni: [s(151_200, 19)],
  tydzien: [s(203_400, 27, 2, 18_000)],
  siedem: [s(1_126_500, 148)],
};

/** Prawdziwy układ maila, który dostaje klient, na wymyślonych liczbach. */
export default function PodgladRaportuSprzedazy() {
  const mail = zlozMail(PRZYKLAD, false);
  return (
    <div className="mx-auto mt-16 max-w-xl">
      <h2 className="h2-sekcji text-center">Tak wygląda raport</h2>
      <p className="mt-3 text-center text-sm text-gray-600 dark:text-gray-300">
        Tak wygląda mail o 7:00. Liczby poniżej są przykładowe.
      </p>
      <div className="mt-4 rounded-2xl border border-gray-200/80 bg-white p-2 text-gray-900 dark:border-gray-800/80">
        <p className="px-4 pt-3 text-xs text-gray-500">{mail.temat}</p>
        <div dangerouslySetInnerHTML={{ __html: mail.html }} />
      </div>
    </div>
  );
}
