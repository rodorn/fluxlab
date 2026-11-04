import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSekcja from "@/components/FaqSekcja";

export const metadata: Metadata = {
  title: "FluxLab, gotowy SaaS, Zapier, etat czy Excel? | Fluxlab",
  description:
    "Pięć sposobów na powtarzalną pracę w firmie: koszt w 1. roku, czas do startu, własność, utrzymanie, KSeF. Także tam, gdzie FluxLab wypada słabiej.",
  alternates: { canonical: "/porownanie" },
  openGraph: {
    title: "FluxLab, gotowy SaaS, Zapier, etat czy Excel? | Fluxlab",
    description:
    "Pięć sposobów na powtarzalną pracę w firmie: koszt w 1. roku, czas do startu, własność, utrzymanie, KSeF. Także tam, gdzie FluxLab wypada słabiej.",
    locale: "pl_PL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, porównanie sposobów automatyzacji",
      },
    ],
  },
};

const OPCJE = [
  "FluxLab",
  "Gotowy SaaS",
  "Zapier lub Make",
  "Etat",
  "Excel",
] as const;

const OSIE: { os: string; wartosci: string[] }[] = [
  {
    os: "Koszt w 1. roku",
    wartosci: [
      "Od 900 zł za pierwszy proces, licencje narzędzi osobno",
      "Abonament za użytkownika, rośnie z zespołem",
      "Abonament plus Twój czas na budowę; opłaty rosną z liczbą kroków",
      "Pensja i składki, kilkadziesiąt tysięcy zł rocznie",
      "Licencja, którą już masz, plus godziny ręcznej pracy",
    ],
  },
  {
    os: "Czas do startu",
    wartosci: [
      "Pierwszy proces w 5 dni roboczych",
      "Od ręki, jeśli proces pasuje do systemu",
      "Godziny do tygodni, zależnie od Twojej wprawy",
      "Rekrutacja i wdrożenie, zwykle 1-3 miesiące",
      "Od ręki",
    ],
  },
  {
    os: "Dopasowanie do procesu",
    wartosci: [
      "Pod Twój proces i Twoje systemy",
      "Proces dopasowujesz do systemu",
      "Dobre, dopóki narzędzia mają gotowe moduły",
      "Pełne, w granicach umiejętności osoby",
      "Pełne, ale wszystko ręcznie",
    ],
  },
  {
    os: "Własność",
    wartosci: [
      "Kod, konta i dokumentacja są Twoje",
      "Dane u dostawcy, eksport zależy od planu",
      "Scenariusze na koncie dostawcy",
      "Wiedza odchodzi razem z osobą",
      "Plik jest Twój",
    ],
  },
  {
    os: "Utrzymanie",
    wartosci: [
      "30 dni poprawek, potem abonament albo zlecenia",
      "Robi dostawca",
      "Robisz Ty: zmiany API, błędy, limity",
      "Robi pracownik, póki jest",
      "Robi ten, kto pamięta, jak plik działa",
    ],
  },
  {
    os: "KSeF i e-Doręczenia",
    wartosci: [
      "Integracja z Twoim programem i bankiem",
      "Jeśli dostawca to ma, w jego zakresie",
      "Brak gotowych modułów KSeF, trzeba wołać API",
      "Ręczne wysyłki i pobieranie faktur",
      "Nie obsłuży",
    ],
  },
];

const SLABE = [
  [
    "Jedna osoba, bez dyżuru 24/7",
    "Odpisujemy w dni robocze. Jeśli proces musi mieć wsparcie w nocy i w weekend, większa firma albo gotowy SaaS z dyżurem będzie lepszy.",
  ],
  [
    "Nie zastąpimy dużego systemu",
    "ERP dla kilkuset osób czy pełny system magazynowy to praca dla zespołu wdrożeniowego, nie dla nas. Możemy go połączyć z resztą, nie zbudować od zera.",
  ],
  [
    "Licencje płacisz osobno",
    "Pipedrive, Make czy n8n w chmurze rozliczasz u dostawcy. W ofercie podajemy kwotę, ale nie ma jej w naszej cenie.",
  ],
  [
    "Gdy gotowy SaaS wystarcza, powiemy to",
    "Jeśli Twój proces mieści się w gotowym programie, wdrożenie własnego rozwiązania nie ma sensu. Wtedy dostajesz od nas nazwę programu zamiast oferty.",
  ],
];

const KIEDY = [
  [
    "Gotowy SaaS",
    "Proces jest typowy (faktury, kalendarz, prosty CRM) i zgadzasz się pracować tak, jak program zakłada.",
  ],
  [
    "Zapier lub Make",
    "Masz kilka prostych połączeń, mało uruchomień i osobę, która lubi to klikać.",
  ],
  [
    "Etat",
    "Pracy jest na cały etat i zmienia się co tydzień, a nie tylko powtarza.",
  ],
  ["Excel", "Robisz to raz w miesiącu i zajmuje to mniej niż godzinę."],
  [
    "FluxLab",
    "Ten sam proces powtarza się co dzień, łączy kilka systemów i zabiera zespołowi godziny tygodniowo.",
  ],
];

const PYTANIA = [
  {
    q: "Ile kosztuje automatyzacja w porównaniu z etatem?",
    a: "Pierwszy proces kosztuje od 900 zł jednorazowo, a etat to pensja i składki co miesiąc. Automatyzacja nie zastąpi całej osoby, ale zdejmuje z niej powtarzalne kroki, które zajmują po kilka godzin tygodniowo.",
  },
  {
    q: "Czy mogę zacząć od Zapiera i przejść do was później?",
    a: "Tak. Scenariusze z Zapiera i Make przenosimy na własny serwer z n8n, gdy opłaty za kroki zaczynają rosnąć.",
  },
  {
    q: "Co, jeśli wybiorę gotowy SaaS?",
    a: "Jeśli pasuje do procesu, to dobry wybór. Możemy go połączyć z resztą Twoich systemów, gdy zabraknie gotowej integracji.",
  },
];

export default function PorownaniePage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs href="/porownanie" items={[{ label: "Porównanie" }]} />

        <section className="pt-6 pb-10">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <p className="section-label mb-3">Porównanie</p>
              <h1 className="h1-strony">Pięć sposobów na powtarzalną pracę</h1>
              <p className="hero-lead">
                Ten sam proces można oddać programowi, narzędziu do łączenia
                aplikacji, nowej osobie albo zostawić w Excelu. Poniżej, co to
                znaczy dla kosztu, czasu i własności, także tam, gdzie wypadamy
                słabiej.
              </p>
            </div>
          </div>
        </section>

        <section className="container-wide pb-12" aria-labelledby="tabela">
          <h2 id="tabela" className="h2-sekcji mb-6 text-center">
            Porównanie w sześciu punktach
          </h2>
          <div className="grid gap-4 md:hidden">
            {OPCJE.map((o, i) => (
              <div
                key={o}
                className={`rounded-2xl border p-5 ${o === "FluxLab" ? "border-accent" : "border-gray-200 dark:border-white/10"}`}
              >
                <h3 className={`text-base font-bold ${o === "FluxLab" ? "text-accent" : "text-gray-900 dark:text-white"}`}>
                  {o}
                </h3>
                <dl className="mt-3 space-y-2">
                  {OSIE.map((r) => (
                    <div key={r.os}>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{r.os}</dt>
                      <dd className="text-sm text-gray-700 dark:text-gray-300">{r.wartosci[i]}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
          <div className="hidden overflow-x-auto rounded-2xl border border-gray-200 dark:border-white/10 md:block">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-gray-50 dark:bg-white/5">
                <tr>
                  <th
                    scope="col"
                    className="p-3 font-semibold text-gray-900 dark:text-white"
                  />
                  {OPCJE.map((o) => (
                    <th
                      key={o}
                      scope="col"
                      className={`p-3 font-semibold ${o === "FluxLab" ? "text-accent" : "text-gray-900 dark:text-white"}`}
                    >
                      {o}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {OSIE.map((r) => (
                  <tr
                    key={r.os}
                    className="border-t border-gray-200 align-top dark:border-white/10"
                  >
                    <th
                      scope="row"
                      className="p-3 font-semibold text-gray-900 dark:text-white"
                    >
                      {r.os}
                    </th>
                    {r.wartosci.map((w, i) => (
                      <td
                        key={i}
                        className="p-3 text-gray-600 dark:text-gray-400"
                      >
                        {w}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
            Ceny FluxLab netto, z{" "}
            <Link href="/produkty" className="text-accent hover:underline">
              cennika
            </Link>
            . Stan na 5 listopada 2026.
          </p>
        </section>

        <section className="container-wide pb-12" aria-labelledby="slabe">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-gray-50 p-6 dark:bg-white/5">
              <h2
                id="slabe"
                className="text-lg font-bold text-gray-900 dark:text-white"
              >
                Gdzie wypadamy słabiej
              </h2>
              <dl className="mt-4 space-y-3">
                {SLABE.map(([t, o]) => (
                  <div key={t}>
                    <dt className="text-sm font-semibold text-gray-900 dark:text-white">
                      {t}
                    </dt>
                    <dd className="text-sm text-gray-600 dark:text-gray-400">
                      {o}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="rounded-2xl bg-gray-50 p-6 dark:bg-white/5">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Kiedy co wybrać
              </h2>
              <dl className="mt-4 space-y-3">
                {KIEDY.map(([t, o]) => (
                  <div key={t}>
                    <dt className="text-sm font-semibold text-gray-900 dark:text-white">
                      {t}
                    </dt>
                    <dd className="text-sm text-gray-600 dark:text-gray-400">
                      {o}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Szczegóły narzędzi:{" "}
            <Link
              href="/strefa-wiedzy/zapier-make-n8n-porownanie"
              className="text-accent hover:underline"
            >
              Zapier, Make i n8n
            </Link>
            ,{" "}
            <Link
              href="/tansze-automatyzacje"
              className="text-accent hover:underline"
            >
              koszt opłat za kroki
            </Link>
            ,{" "}
            <Link
              href="/koszt-recznej-obslugi-leadow"
              className="text-accent hover:underline"
            >
              koszt ręcznej obsługi
            </Link>
            .
          </p>
        </section>

        <FaqSekcja
          pytania={PYTANIA}
          sciezka="/porownanie"
          className="container-wide pb-14"
        />
        <CTA naglowek="Sprawdź, która z pięciu dróg pasuje do Twojego procesu" />
      </main>
      <Footer />
    </>
  );
}
