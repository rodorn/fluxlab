import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { kotwica } from "@/lib/kotwica";
import ListaKsef2027 from "@/components/ListaKsef2027";
import WiadomoscKsefDlaKlientow from "@/components/WiadomoscKsefDlaKlientow";
import RamkaKsefDoWstawienia from "@/components/RamkaKsefDoWstawienia";
import NazwaNarzedzia from "@/components/NazwaNarzedzia";

export const metadata: Metadata = {
  title: "KSeF od 1 stycznia 2027: lista kontrolna dla firm | Fluxlab",
  description:
    "Koniec przepisów przejściowych KSeF 1.01.2027. Siedem pytań: faktury poza KSeF, kasa, numer KSeF w przelewie, koszty, tryb offline, numeracja, odrzucenia.",
  alternates: { canonical: "/ksef-2027" },
  openGraph: {
    title: "KSeF od 1 stycznia 2027: co musicie mieć domknięte",
    description:
      "Darmowa lista kontrolna na koniec przepisów przejściowych KSeF. Na końcu wykaz braków gotowy do wysłania księgowej, bez rejestracji.",
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/ksef-2027/opengraph-image"],
  },
};

const faq = [
  {
    q: "Co się zmienia w KSeF 1 stycznia 2027?",
    a: "Kończą się naraz wszystkie przepisy przejściowe. Znika limit 10 tys. zł brutto miesięcznie na faktury wystawiane poza KSeF, więc każda faktura dla firmy musi przejść przez system. Faktury z kas rejestrujących, w tym paragony z NIP do 450 zł, też muszą przez niego przechodzić. Przelew za fakturę z KSeF między czynnymi podatnikami VAT ma zawierać jej numer KSeF albo identyfikator zbiorczy.",
  },
  {
    q: "Czy kary za fakturę poza KSeF zaczną obowiązywać w 2027?",
    a: "Kary z art. 106ni ustawy o VAT, do 100% kwoty VAT z faktury wystawionej poza KSeF albo do 18,7% kwoty należności przy fakturze bez VAT, miały ruszyć 1 stycznia 2027. 16 września 2026 Ministerstwo Finansów zapowiedziało przesunięcie ich na 1 stycznia 2028, a 23 września 2026 opublikowało projekt tej ustawy na stronie Rządowego Centrum Legislacji (numer w wykazie prac rządu UD477, legislacja.rcl.gov.pl/projekt/12414954). Zmiana ma wejść w życie przed końcem 2026 roku, ale to wciąż projekt, a nie uchwalone prawo. Według projektu w 2027 urząd skarbowy najpierw przypomina firmie o obowiązku, a gdy ta nie zareaguje, sprawdza jej rozliczenia. Sam obowiązek wystawiania faktur w KSeF nie jest zawieszony ani o jeden dzień.",
  },
  {
    q: "Czy numer KSeF trzeba podawać w każdym przelewie?",
    a: "Od 1 stycznia 2027 obowiązek dotyczy zapłaty za fakturę z KSeF między czynnymi podatnikami VAT. Przy zapłacie za wiele faktur jednego kontrahenta wystarczy jeden identyfikator zbiorczy wygenerowany w KSeF. Nie dotyczy płatności kartą, BLIK-iem ani gotówką.",
  },
  {
    q: "Czy tokeny KSeF wygasają z końcem 2026 roku?",
    a: "Najpewniej nie, ale na dziś to tylko zapowiedź. Ministerstwo Finansów zaproponowało na konsultacjach 9.06.2026 i zapisało w Podręczniku KSeF 2.0, że tokeny zostaną po 31 grudnia 2026 r., z ważnością od 1 do 365 dni. Obowiązujące rozporządzenie w sprawie korzystania z KSeF z 12.12.2025 (Dz.U. poz. 1815) nadal wskazuje 31 grudnia 2026 r., a strona Aplikacji Podatnika KSeF podaje generowanie tokenów „do 31 grudnia 2026 r.”. Na 4.10.2026 nie znaleźliśmy opublikowanej nowelizacji. Jeśli program albo integracja łączy się z KSeF tokenem, warto już teraz wygenerować certyfikat KSeF typu 1 jako zapas na wypadek, gdyby zmiana nie zdążyła wejść w życie. Do wystawiania faktur w trybie offline potrzebny jest jednak certyfikat KSeF typu 2, bo bez niego nie da się wygenerować drugiego kodu QR na fakturze przekazanej klientowi poza systemem. Certyfikat generuje się w Aplikacji Podatnika KSeF i jest ważny 2 lata.",
  },
  {
    q: "Czy pracownik musi logować się do KSeF swoim prywatnym mObywatelem?",
    a: "Nie musi, choć tak jest najprościej. Uprawnienia w KSeF nadaje się konkretnej osobie, na jej PESEL albo NIP, i ta osoba potwierdza swoją tożsamość własnym środkiem. W Aplikacji Podatnika KSeF są dwa wejścia: profil zaufany, do którego wiele osób loguje się aplikacją mObywatel, oraz certyfikat kwalifikowany. Kto nie chce używać prywatnego telefonu, może logować się podpisem kwalifikowanym z numerem PESEL, kupionym przez firmę. Codzienne pobieranie faktur nie wymaga logowania żadnego pracownika, jeżeli program księgowy łączy się z KSeF tokenem albo certyfikatem KSeF. Uprawnienia nadane na PESEL zostają, dopóki ktoś ich nie odbierze, więc przy odejściu pracownika trzeba je wycofać.",
  },
  {
    q: "Od kiedy faktura kosztowa z KSeF jest uznana za otrzymaną?",
    a: "Od dnia nadania jej numeru w KSeF. Dostawca nie musi wysyłać jej mailem, więc termin płatności biegnie także wtedy, gdy nikt nie pobrał faktury z systemu.",
  },
  {
    q: "Mamy mniej niż 10 tys. zł faktur miesięcznie. Czy musimy coś robić?",
    a: "Tak, ale do końca 2026 roku. Limit 10 tys. zł brutto miesięcznie pozwala wystawiać faktury poza KSeF tylko do 31 grudnia 2026, i tylko do pierwszego przekroczenia. Faktura, którą przekraczacie limit w danym miesiącu, i każda następna muszą już przejść przez KSeF, także w kolejnych miesiącach poniżej 10 tys. zł. Jedno większe zlecenie jesienią wystarczy, żeby obowiązek zaczął się przed styczniem. Przy kilku fakturach miesięcznie wystarczy darmowa Aplikacja Podatnika KSeF od Ministerstwa Finansów albo program do fakturowania z obsługą KSeF.",
  },
  {
    q: "Nie mamy programu do faktur. Czy da się wystawiać faktury w KSeF za darmo?",
    a: "Tak. Ministerstwo Finansów daje trzy bezpłatne narzędzia, wszystkie logują się mObywatelem, profilem zaufanym, e-dowodem albo bankowością elektroniczną. Aplikacja Podatnika KSeF 2.0 (ap.ksef.mf.gov.pl) działa w przeglądarce dla każdej firmy, także spółki, i obsługuje faktury, korekty, faktury offline, pobieranie XML i PDF oraz nadawanie uprawnień biuru rachunkowemu. Aplikacja Mobilna KSeF 2.0 (Google Play, App Store) wystawia faktury i korekty z telefonu, pamięta listę nabywców i rachunków. e-mikrofirma w e-Urzędzie Skarbowym jest tylko dla jednoosobowej działalności: wystawia krajowe faktury sprzedaży przez KSeF, pobiera faktury zakupu i z tych danych tworzy ewidencję VAT i plik JPK_VAT. Przy kilku fakturach miesięcznie to w zupełności wystarcza. Płatny program albo integracja zaczyna się opłacać dopiero, gdy faktury powstają w sklepie, CRM albo innym systemie i ktoś przepisuje je ręcznie do KSeF.",
  },
  {
    q: "Czy po przejściu na KSeF trzeba zmienić numerację faktur?",
    a: "Nie. Numer faktury dalej nadajecie sami, tak jak dotąd, zgodnie z art. 106e ust. 1 pkt 2 ustawy o VAT, i można po prostu kontynuować obecną serię. KSeF dokłada osobny numer KSeF, ale on nie zastępuje Waszego numeru i nie jest elementem faktury. Jedna rzecz, której wcześniej nie było: KSeF odrzuca fakturę z kodem błędu 440 „Duplikat faktury”, jeśli ten sam NIP sprzedawcy wysłał już fakturę tego samego rodzaju z identycznym numerem, a sprawdza to 10 lat wstecz. Numeracja zerowana co roku bez roku w numerze (1, 2, 3…) w drugim roku zacznie więc dawać odrzucenia. Bezpiecznie jest mieć rok, a najlepiej miesiąc i rok, w numerze, np. 7/02/2026, i pilnować, żeby przy zmianie programu, np. na e-mikrofirmę, nowa seria nie powtarzała starych numerów. Faktura, która trafi do KSeF później niż faktura z wyższym numerem, bo pierwsza wysyłka została odrzucona, nie wymaga korekty.",
  },
];

export default function Ksef2027Page() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumbs
          items={[
            { label: "Narzędzia", href: "/narzedzia" },
            { label: "KSeF od 1 stycznia 2027" },
          ]}
        />
        <section className="container-wide pb-14 md:pb-20 pt-6">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
              Darmowa lista kontrolna
            </p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              KSeF od 1 stycznia 2027: co musicie mieć domknięte
            </h1>
            <p className="mt-5 text-lg text-gray-600 dark:text-gray-300">
              Tego dnia kończą się naraz wszystkie przepisy przejściowe
              Krajowego Systemu e-Faktur: limit faktur poza KSeF, wyjątek dla
              kas rejestrujących i swoboda przy przelewach. Siedem pytań poniżej
              pokazuje, co jeszcze zostało do zrobienia, a na końcu dostajecie
              wykaz braków gotowy do wysłania księgowej. Bez rejestracji i bez
              podawania jakichkolwiek danych.
            </p>
          </div>

          <div className="mt-10 max-w-4xl">
            <NazwaNarzedzia href="/ksef-2027" />
            <ListaKsef2027 formularz="/ksef-integracja#zamow" />
          </div>

          <div className="mt-14 max-w-4xl">
            <WiadomoscKsefDlaKlientow />
          </div>

          <div className="mt-14 max-w-4xl">
            <RamkaKsefDoWstawienia />
          </div>

          <div className="mt-14 max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Częste pytania o KSeF w 2027
            </h2>
            <dl className="mt-6 space-y-5">
              {faq.map((f) => (
                <div key={f.q} id={kotwica(f.q)} className="scroll-mt-20">
                  <dt className="font-semibold text-gray-900 dark:text-white">
                    {f.q}
                  </dt>
                  <dd className="mt-1 text-gray-600 dark:text-gray-300">
                    {f.a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-14 max-w-3xl rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-gray-50/60 dark:bg-gray-900/40 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Kiedy faktury powstają poza programem księgowym
            </h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              Punkty o przelewach, fakturach kosztowych i stanie faktur to
              miejsca, gdzie dane przechodzą między programami. Jeżeli faktury
              powstają w sklepie, w systemie zamówień albo w CRM, a ktoś
              przenosi je dziś ręcznie, sprawdźcie, od kiedy obowiązek dotyczy
              Waszej grupy podatników i co da się spiąć z KSeF.
            </p>
            <p className="mt-4">
              <Link
                href="/ksef-integracja"
                className="font-semibold text-accent hover:underline"
              >
                Integracja z KSeF i terminy dla Waszej grupy
              </Link>
            </p>
            <p className="mt-2">
              <Link
                href="/numer-ksef"
                className="font-semibold text-accent hover:underline"
              >
                Sprawdźcie numery KSeF z przelewów, czy nie mają literówki
              </Link>
            </p>
          </div>
        </section>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Lista kontrolna KSeF na 1 stycznia 2027",
            url: "https://fluxlab.pl/ksef-2027",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Dowolna przeglądarka",
            inLanguage: "pl",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "PLN",
            },
            provider: { "@type": "Organization", name: "Fluxlab" },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              url: `https://fluxlab.pl/ksef-2027#${kotwica(f.q)}`,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />

      <Footer />
    </>
  );
}
