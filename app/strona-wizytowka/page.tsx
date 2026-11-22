import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Strona firmy z wizytówki Google, 99 zł | Fluxlab",
  description:
    "Podajesz nazwę firmy, a my budujemy stronę z danych jej wizytówki Google: opis, godziny, telefon, mapa i opinie. Adres w kilka minut, 99 zł netto.",
  alternates: { canonical: "/strona-wizytowka" },
  openGraph: {
    title: "Strona firmy z wizytówki Google, 99 zł | Fluxlab",
    description:
      "Własny adres, godziny, telefon, mapa i opinie z Google, bez pisania treści. Gotowe w kilka minut po płatności.",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, strona firmy z wizytówki Google" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="strona-wizytowka"
      breadcrumb="Strona z wizytówki Google"
      typ="usluga"
      h1="Masz wizytówkę w Google, a nie masz strony?"
      lead="Podajesz nazwę firmy i miasto albo link do Map Google. Pobieramy publiczne dane Twojej wizytówki i w kilka minut po płatności wysyłamy adres strony: opis, adres, godziny otwarcia, telefon, mapa i opinie klientów. Strona działa 30 dni, potem ją przedłużasz albo nie."
      ctaLabel="Zbuduj stronę"
      ctaNote="99 zł netto, jednorazowo, 30 dni działania"
      checks={[
        {
          title: "Dane prosto z wizytówki",
          desc: "Nazwa, rodzaj działalności, adres, telefon, strona www, godziny otwarcia i ocena. Nic nie przepisujesz.",
        },
        {
          title: "Mapa i dojazd",
          desc: "Osadzona mapa z pinezką i link do wyznaczenia trasy w Mapach Google.",
        },
        {
          title: "Opinie z podpisem Google",
          desc: "Do 5 opinii, które Google udostępnia, z imieniem autora i informacją, że pochodzą z Google.",
        },
        {
          title: "Czytelna na telefonie",
          desc: "Jedna kolumna, duże numery telefonu i adresu. Klient dzwoni jednym dotknięciem.",
        },
      ]}
      pricing={[
        {
          name: "Strona z wizytówki Google",
          price: "99 zł",
          kup: "wizytowka-strona",
          desc: "Netto, jednorazowo. Adres strony przychodzi mailem w kilka minut.",
          features: [
            "strona pod adresem fluxlab.pl/w/nazwa-firmy",
            "opis, godziny, telefon, mapa",
            "do 5 opinii z Google",
            "działa 30 dni od zamówienia",
            "zwrot, gdy znajdziemy złą firmę",
          ],
          featured: true,
        },
        {
          name: "Utrzymanie strony",
          price: "19 zł",
          kup: "wizytowka-utrzymanie",
          desc: "Netto, miesięcznie. Zamów z tego samego adresu e-mail co stronę.",
          features: [
            "strona działa dalej bez limitu 30 dni",
            "dane odświeżane co miesiąc z wizytówki",
            "przypomnienie przed końcem okresu",
            "rezygnacja w każdej chwili",
          ],
        },
      ]}
      faq={[
        {
          q: "Skąd macie dane mojej firmy?",
          a: "Z publicznej wizytówki firmy w Mapach Google, przez oficjalny interfejs Google. Pokazujemy to, co każdy widzi w wyszukiwarce.",
        },
        {
          q: "Co, jeśli znajdziecie inną firmę niż moja?",
          a: "W mailu jest adres strony. Jeśli dotyczy innej firmy, napisz odpowiedzią na ten mail, a zwrócimy całą kwotę albo poprawimy zamówienie, gdy podasz link do swojej wizytówki w Mapach Google.",
        },
        {
          q: "Czy mogę zmienić opis albo zdjęcia?",
          a: "Strona pokazuje to, co jest w wizytówce, więc zmieniasz to w swoim profilu w Google, a po odświeżeniu danych zmiana pojawia się na stronie. Zdjęć na stronie nie ma.",
        },
        {
          q: "Co po 30 dniach?",
          a: "Bez utrzymania strona przestaje się wyświetlać i po 60 dniach usuwamy jej dane. Z utrzymaniem za 19 zł miesięcznie działa dalej, a dane odświeżamy raz w miesiącu.",
        },
        {
          q: "Czy strona pojawi się w wynikach Google?",
          a: "Nie. Strona ma ustawiony zakaz indeksowania, bo służy do wysłania klientowi adresu, nie do pozycjonowania. Własna domena i pozycjonowanie to osobna usługa.",
        },
        {
          q: "Czy muszę być właścicielem firmy?",
          a: "Strona zawiera wyłącznie dane publiczne. Opisujemy je jako wygenerowane z wizytówki Google i nie podajemy się za firmę. Usunięcie strony na prośbę firmy robimy od ręki.",
        },
      ]}
      formId="order_wizytowka"
      formHeading="Potrzebujesz własnej domeny i pełnej strony?"
      formIntro="Napisz, czym zajmuje się firma, a odpiszemy z wyceną strony na własnym adresie."
      submitLabel="Wyślij zapytanie"
      microCopy="Odpisujemy w godzinę, oddzwaniamy w 2 godziny."
      serviceName="Strona firmy z wizytówki Google"
      serviceDesc="Strona firmy zbudowana z publicznych danych wizytówki Google: opis, godziny, telefon, mapa i opinie, 99 zł netto jednorazowo, utrzymanie 19 zł miesięcznie."
      serviceType="Tworzenie strony internetowej"
    />
  );
}
