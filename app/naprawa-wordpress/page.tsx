import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Naprawa WordPress: błąd krytyczny, biały ekran | Fluxlab",
  description:
    "„W witrynie wystąpił błąd krytyczny” albo biały ekran? Czytamy log błędów, wskazujemy przyczynę i naprawiamy. 150, 290 albo 490 zł netto, płatność po efekcie.",
  alternates: { canonical: "/naprawa-wordpress" },
  openGraph: {
    title: "Naprawa WordPress: błąd krytyczny, biały ekran | Fluxlab",
    description:
      "Czytamy log błędów, wskazujemy wtyczkę, motyw albo wersję PHP i naprawiamy. Naprawa jednej rzeczy 150, 290 albo 490 zł netto, płatność przez Useme po sprawdzeniu efektu.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, naprawa WordPressa",
      },
    ],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="naprawa-wordpress"
      breadcrumb="Naprawa WordPress"
      typ="usluga"
      h1="Naprawa WordPress, błąd krytyczny i biały ekran"
      lead="Komunikat „W witrynie wystąpił błąd krytyczny” albo pusta biała strona to zwykle jedna wtyczka, motyw albo wersja PHP. Czytamy log błędów, wskazujemy przyczynę i naprawiamy ją, a płacisz po sprawdzeniu efektu."
      cena="Naprawa 150, 290 albo 490 zł netto"
      ctaLabel="Zgłoś błąd strony"
      ctaNote="Odpisujemy w 1 dzień roboczy, z ceną i terminem"
      powiazane={[
        {
          przed:
            "Strona przekierowuje na obce serwisy albo pojawiły się nieznane konta administratora? To wygląda na włamanie:",
          kotwica: "diagnoza po włamaniu za 49 zł",
          href: "/strona-po-wlamaniu",
          po: ".",
        },
      ]}
      checks={[
        {
          title: "Co znaczy „W witrynie wystąpił błąd krytyczny”",
          desc: "WordPress zatrzymał stronę, bo kod PHP rzucił błąd, którego nie umiał obsłużyć. Ten komunikat pojawia się od wersji 5.2. Wcześniej w tej samej sytuacji zostawał biały ekran, który przy wyłączonym wyświetlaniu błędów widać do dziś.",
        },
        {
          title: "Najczęstsze przyczyny",
          desc: "Aktualizacja wtyczki albo motywu, która nie pasuje do reszty strony. Zmiana wersji PHP na hostingu. Za mały limit pamięci. Uszkodzony albo podmieniony plik.",
        },
        {
          title: "Krok 1: log błędów",
          desc: "Zaczynamy od logu: panelu hostingu albo pliku debug.log po włączeniu trybu debugowania. Log podaje plik i linię, w której strona się zatrzymała, więc przyczynę znamy, zanim cokolwiek zmienimy.",
        },
        {
          title: "Krok 2: przyczyna i cena",
          desc: "Odpisujemy, co się zepsuło i ile kosztuje naprawa: 150, 290 albo 490 zł netto, z terminem. Pracę zaczynamy po Twojej zgodzie.",
        },
        {
          title: "Krok 3: naprawa i sprawdzenie",
          desc: "Wyłączamy albo wymieniamy winną wtyczkę, dopasowujemy wersję PHP albo przywracamy uszkodzony plik. Potem sprawdzamy stronę główną, podstrony i formularz, a Ty płacisz przez Useme po sprawdzeniu efektu.",
        },
        {
          title: "Gdy w tle jest włamanie",
          desc: "Obce pliki, przekierowania albo nowe konta administratora to inna usługa. Wtedy zaczynamy od diagnozy po włamaniu za 49 zł.",
        },
      ]}
      pricing={[
        {
          name: "Naprawa jednej rzeczy",
          price: "150 / 290 / 490 zł",
          desc: "Błąd krytyczny, biały ekran, formularz albo inna jedna usterka.",
          features: [
            "cena i termin w odpowiedzi, w 1 dzień roboczy",
            "naprawa zwykle ten sam lub następny dzień",
            "płatność przez Useme po sprawdzeniu efektu",
          ],
          featured: true,
        },
        {
          name: "Diagnoza po włamaniu",
          price: "49 zł",
          desc: "Gdy błąd wygląda na skutek włamania.",
          features: [
            "lista zainfekowanych i obcych plików",
            "przekierowania i podstawieni administratorzy",
            "wycena czyszczenia bez zobowiązania",
          ],
          href: "/strona-po-wlamaniu",
          cta: "Przejdź do diagnozy",
        },
      ]}
      faq={[
        {
          q: "Co zrobić, gdy w witrynie wystąpił błąd krytyczny?",
          a: "Sprawdź skrzynkę administratora strony. WordPress wysyła tam maila z opisem błędu i linkiem do trybu odzyskiwania, w którym możesz wyłączyć winną wtyczkę albo motyw. Gdy maila nie ma, przyczynę wskaże log błędów na hostingu.",
        },
        {
          q: "Skąd się bierze biały ekran w WordPressie?",
          a: "Z tego samego, co komunikat o błędzie krytycznym: kod PHP zatrzymał stronę, a serwer nie wyświetla treści błędu. Najczęściej winna jest świeżo zaktualizowana wtyczka, motyw albo zmiana wersji PHP na hostingu.",
        },
        {
          q: "Ile kosztuje naprawa WordPressa?",
          a: "Naprawa jednej rzeczy kosztuje 150, 290 albo 490 zł netto. Którą kwotę, piszemy po obejrzeniu błędu, zanim zaczniemy pracę. Płacisz przez Useme po sprawdzeniu efektu.",
        },
        {
          q: "Jak szybko naprawicie stronę?",
          a: "Odpisujemy w 1 dzień roboczy z ceną i terminem. Sama naprawa trwa zwykle ten sam lub następny dzień.",
        },
        {
          q: "Jakie dostępy będą potrzebne?",
          a: "Zwykle konto administratora WordPressa i dostęp do panelu hostingu albo FTP. Dostępy przysyłasz po ustaleniu zakresu i ceny.",
        },
      ]}
      formId="order_naprawa_wordpress"
      formHeading="Zgłoś błąd strony na WordPressie"
      formIntro="Podaj adres strony i napisz, co widzisz i od kiedy. Jeśli masz treść błędu z maila od WordPressa, wklej ją."
      submitLabel="Zgłoś błąd strony"
      microCopy="Odpisujemy w 1 dzień roboczy, z ceną i terminem. Dostępy przysyłasz po ustaleniu zakresu."
      serviceName="Naprawa WordPress"
      serviceDesc="Naprawa błędu krytycznego i białego ekranu w WordPressie: analiza logu błędów, wskazanie wtyczki, motywu albo wersji PHP i naprawa. Naprawa jednej rzeczy 150, 290 albo 490 zł netto."
      serviceType="Naprawa strony internetowej"
    />
  );
}
