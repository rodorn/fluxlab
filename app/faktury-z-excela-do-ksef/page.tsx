import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Faktury z Excela do KSeF, 49 zł/mies. | Fluxlab",
  description:
    "Wgrywasz arkusz z pozycjami, a my wystawiamy faktury w KSeF i odsyłamy numery KSeF na maila. Bez programu fakturującego. 49 zł netto miesięcznie.",
  alternates: { canonical: "/faktury-z-excela-do-ksef" },
  openGraph: {
    title: "Faktury z Excela do KSeF, 49 zł/mies. | Fluxlab",
    description: "Arkusz z pozycjami zamieniamy na faktury w KSeF i odsyłamy zestawienie z numerami KSeF.",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, faktury z Excela do KSeF" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="faktury-z-excela-do-ksef"
      breadcrumb="Faktury z Excela do KSeF"
      eyebrow="KSeF dla firm"
      h1="Faktury z Excela wystawiane prosto w KSeF"
      lead="Prowadzisz sprzedaż w arkuszu i nie chcesz kupować programu do fakturowania tylko dlatego, że KSeF jest obowiązkowy. Wgrywasz plik z pozycjami, my budujemy z niego faktury FA(3), wystawiamy je w KSeF Twoim tokenem i odsyłamy na maila zestawienie z numerami KSeF."
      ctaLabel="Włącz wystawianie z Excela"
      ctaZamow="Włącz wystawianie z Excela, 49 zł/mies."
      ctaNote="49 zł netto miesięcznie, rezygnacja w dowolnym dniu"
      powiazane={[
        {
          przed: "Chcesz też dostawać faktury od dostawców? Zobacz",
          kotwica: "faktury kosztowe z KSeF na maila",
          href: "/faktury-kosztowe-z-ksef-na-mail",
          po: ".",
        },
        {
          przed: "Nie wiesz, czy firma jest gotowa na KSeF? Zrób",
          kotwica: "test gotowości na KSeF 2027",
          href: "/ksef-2027",
          po: ".",
        },
      ]}
      checks={[
        {
          title: "Jeden plik, wiele faktur",
          desc: "Jeden wiersz to jedna pozycja. Wiersze o tym samym numerze tworzą jedną fakturę, więc w jednym pliku wysyłasz do 200 faktur. Plik może być w formacie Excela albo CSV, wzór kolumn pobierzesz po opłaceniu zamówienia.",
        },
        {
          title: "Błąd w pliku nie wystawia nic",
          desc: "Zanim cokolwiek trafi do KSeF, sprawdzamy cały plik. Jeśli któryś wiersz jest błędny, nie wystawiamy żadnej faktury, a w mailu dostajesz listę wierszy do poprawy. Faktury w KSeF nie da się usunąć, dlatego wolimy zatrzymać całą partię.",
        },
        {
          title: "Numery wracają do Ciebie",
          desc: "Po wystawieniu przychodzi mail z zestawieniem CSV: numer faktury, nabywca, kwota brutto i numer KSeF. Dopisujesz je do swojego arkusza.",
        },
      ]}
      pricing={[
        {
          name: "Faktury z Excela do KSeF",
          price: "49 zł/mies.",
          kup: "faktury-z-excela",
          desc: "Netto. Jedna firma, jeden NIP, dowolna liczba plików w miesiącu.",
          features: [
            "wystawianie faktur FA(3) w KSeF z pliku Excela lub CSV",
            "kontrola całego pliku przed wysyłką",
            "mail z numerami KSeF po wystawieniu",
            "rezygnacja w dowolnym dniu",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Ile to kosztuje?",
          a: "49 zł netto miesięcznie, bez opłaty na start i bez umowy na czas określony. Rezygnujesz w dowolnym dniu. Więcej o tym, co zmienia KSeF, piszemy w artykułach o KSeF.",
          linki: [{ fraza: "artykułach o KSeF", href: "/strefa-wiedzy/kategoria/ksef" }],
        },
        {
          q: "Skąd wziąć token KSeF?",
          a: "W Aplikacji Podatnika KSeF, w zakładce Tokeny, wybierz Generuj token i zaznacz uprawnienia do wystawiania i przeglądania faktur. Po opłaceniu zamówienia na stronie z formularzem znajdziesz krótką instrukcję.",
        },
        {
          q: "Jakie dane muszą być w pliku?",
          a: "Numer faktury, nabywca, opis pozycji i cena netto są obowiązkowe. Reszta ma wartości domyślne: ilość 1, jednostka szt., VAT 23%, data wystawienia dzisiejsza. Dla osoby bez NIP zostaw pole NIP puste.",
        },
        {
          q: "Czy wystawicie faktury korygujące albo w walucie?",
          a: "Nie, na razie wystawiamy zwykłe faktury VAT w złotych. Korekty i faktury walutowe wystawisz w Aplikacji Podatnika KSeF.",
        },
        {
          q: "Kiedy faktury trafią do KSeF?",
          a: "W ciągu godziny od wgrania pliku. Mail z numerami KSeF przychodzi zaraz po wystawieniu.",
        },
        {
          q: "Co jeśli KSeF odrzuci jakąś fakturę?",
          a: "Pozostałe faktury z pliku zostają wystawione, a w zestawieniu dostajesz opis powodu przy odrzuconej. Poprawiasz tylko ten wiersz i wgrywasz go ponownie.",
        },
        {
          q: "Co się dzieje z moimi danymi po rezygnacji?",
          a: "Token i dane firmy usuwamy przy najbliższym przebiegu po anulowaniu subskrypcji. Wgrany plik kasujemy po wystawieniu faktur.",
        },
        {
          q: "Jak zrezygnować?",
          a: "W dowolnym dniu, odpisując na mail z zestawieniem. Za niewykorzystane dni zwracamy pieniądze.",
        },
      ]}
      formId="order_faktury_z_excela"
      formHeading="Włącz wystawianie z Excela"
      formIntro="Po opłaceniu zamówienia podasz dane firmy, token KSeF i wgrasz plik."
      submitLabel="Włącz wystawianie"
      microCopy="Rezygnacja w dowolnym dniu, płacisz za dni korzystania."
      serviceName="Faktury z Excela do KSeF"
      serviceDesc="Faktury FA(3) wystawiane w KSeF z pliku Excela, z mailem z numerami KSeF. 49 zł netto miesięcznie."
      serviceType="Automatyzacja księgowości"
    />
  );
}
