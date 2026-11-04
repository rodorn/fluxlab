const PUNKTY = [
  [
    "Płatność",
    "Pierwsze zlecenie przez Useme. Kolejne na fakturę VAT płatną przed startem, usługi miesięczne na początku miesiąca. Bez zaliczek. Usługi ze stałą ceną można też opłacić online w koszyku.",
  ],
  [
    "Umowa i zakres",
    "Zakres, cenę i termin dostajesz na piśmie przed startem. Cena się nie zmienia, nie rozliczamy godzin.",
  ],
  [
    "Dane osobowe",
    "Gdy praca obejmuje dane Twoich klientów albo pracowników, podpisujemy umowę powierzenia przetwarzania danych.",
  ],
  [
    "Harmonogram i odbiór",
    "Termin jest w ofercie, większość wdrożeń kończy się w 2–3 tygodnie. Przez 30 dni po odbiorze poprawki są bezpłatne, a błędy z naszej strony także później.",
  ],
];

export default function DlaZakupow({ className = "" }: { className?: string }) {
  return (
    <section aria-labelledby="dla-zakupow" className={className}>
      <div className="rounded-2xl bg-gray-50 p-6 dark:bg-white/5">
        <h2 id="dla-zakupow" className="text-lg font-bold text-gray-900 dark:text-white">
          Dla księgowości i działu zakupów
        </h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          {PUNKTY.map(([t, o]) => (
            <div key={t}>
              <dt className="text-sm font-semibold text-gray-900 dark:text-white">{t}</dt>
              <dd className="text-sm text-gray-600 dark:text-gray-400">{o}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Wszystko na jednej stronie do przesłania w firmie:{" "}
          <a href="/dla-zespolu" className="font-medium text-accent underline underline-offset-2">
            fluxlab.pl/dla-zespolu
          </a>
        </p>
      </div>
    </section>
  );
}
