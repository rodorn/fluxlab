import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Kopia zapasowa WordPressa za 29 zł | Fluxlab",
  description:
    "Wtyczka wysyła raz dziennie bazę i pliki strony WordPress na nasz serwer. Trzy ostatnie kopie do pobrania, każda do 1 GB. 29 zł netto miesięcznie.",
  alternates: { canonical: "/kopia-wordpressa" },
  openGraph: {
    title: "Kopia zapasowa WordPressa za 29 zł | Fluxlab",
    description:
      "Codzienna kopia bazy i plików strony poza Twoim hostingiem. Trzy ostatnie kopie do pobrania w każdej chwili.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, kopia zapasowa WordPressa",
      },
    ],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="kopia-wordpressa"
      breadcrumb="Kopia zapasowa WordPressa"
      typ="usluga"
      h1="Co, jeśli hosting straci Twoją stronę? Miej kopię poza nim"
      lead="Po płatności dostajesz mailem wtyczkę z Twoim tokenem. Po włączeniu wysyła ona raz dziennie bazę danych i katalog wp-content na nasz serwer. Trzy ostatnie kopie pobierzesz z prywatnej strony, kiedy ich potrzebujesz."
      ctaLabel="Zamów kopię strony"
      ctaNote="29 zł netto miesięcznie, rezygnacja w każdej chwili"
      checks={[
        {
          title: "Baza i pliki w jednym ZIP-ie",
          desc: "Kopia zawiera zrzut bazy danych oraz cały wp-content: motywy, wtyczki i media. Nie obejmuje pliku konfiguracji wp-config, więc nie ma w niej haseł do hostingu.",
        },
        {
          title: "Kopia poza hostingiem",
          desc: "Plik jedzie szyfrowanym połączeniem na osobny serwer. Awaria hostingu albo włamanie nie usuną ostatnich trzech kopii.",
        },
        {
          title: "Limity podane wprost",
          desc: "Kopia ma do 1 GB po spakowaniu, przechowujemy 3 ostatnie, razem do 3 GB na stronę. Większe strony wymagają innego rozwiązania.",
        },
      ]}
      pricing={[
        {
          name: "Kopia jednej strony WordPress",
          price: "29 zł",
          kup: "kopia-wp",
          desc: "Netto, miesięcznie. Wtyczka w mailu w kilka minut po płatności.",
          features: [
            "kopia bazy i wp-content raz dziennie",
            "3 ostatnie kopie do pobrania, każda do 1 GB",
            "mail, gdy kopia nie dotarła od 3 dni",
            "po anulowaniu kopie są usuwane",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Czy kopie są szyfrowane na serwerze?",
          a: "Nie. Połączenie jest szyfrowane, ale pliki leżą na dysku bez szyfrowania, a w bazie są m.in. skróty haseł użytkowników. Dostęp ma tylko osoba z prywatnym adresem do pobrania, więc nie udostępniaj go dalej.",
        },
        {
          q: "Czy sami odtwarzacie stronę z kopii?",
          a: "Nie. Dostajesz ZIP, w którym zrzut bazy importujesz w panelu bazy danych, a wp-content wgrywasz na hosting. Pomoc w odtworzeniu wyceniamy osobno.",
        },
        {
          q: "Co, jeśli strona jest większa niż 1 GB?",
          a: "Wtyczka przerwie kopię i pokaże komunikat w panelu WordPressa. Opłata za miesiąc zostaje, dlatego sprawdź rozmiar katalogu wp-content przed zakupem.",
        },
        {
          q: "Co, jeśli adres strony będzie niepoprawny?",
          a: "Zwracamy całą kwotę i wysyłamy mail z wyjaśnieniem, więc nic nie tracisz.",
        },
      ]}
      formId="order_kopia_wp"
      formHeading="Zapytaj o większą stronę"
      formIntro="Strona powyżej 1 GB, kilka stron albo dłuższe przechowywanie? Napisz, a odpiszemy z wyceną."
      submitLabel="Wyślij zapytanie"
      microCopy="Odpowiadamy w ciągu 1 dnia roboczego."
      serviceName="Kopia zapasowa WordPressa"
      serviceDesc="Codzienna kopia bazy danych i wp-content strony WordPress na osobnym serwerze, trzy ostatnie kopie do pobrania, 29 zł netto miesięcznie."
      serviceType="Kopia zapasowa strony WordPress"
    />
  );
}
