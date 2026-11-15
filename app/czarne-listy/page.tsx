import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import CzarneListyNarzedzie from "@/components/CzarneListyNarzedzie";

export const metadata: Metadata = {
  title: "Czarne listy spamowe: sprawdź domenę za darmo | Fluxlab",
  description:
    "Sprawdź, czy domena albo serwer poczty firmy są na listach spamowych. Wynik od ręki, a potem codzienna kontrola i alert mailem. Za darmo.",
  alternates: { canonical: "/czarne-listy" },
  openGraph: {
    title: "Czarne listy spamowe: sprawdź domenę za darmo | Fluxlab",
    description: "Wynik od ręki i codzienny alert, gdy poczta firmy trafi na listę spamową.",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, czarne listy spamowe" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="czarne-listy"
      tool={<CzarneListyNarzedzie />}
      breadcrumb="Czarne listy spamowe"
      cena=""
      eyebrow="Alert o czarnej liście"
      h1="Dowiedz się, że poczta firmy trafiła na czarną listę, zanim zrobią to klienci"
      lead="Gdy serwer poczty trafi na listę spamową, maile do klientów lądują w spamie, a nikt o tym nie mówi. Sprawdź domenę teraz i zapisz się na alert. Za darmo."
      bezPrzyciskowHero
      ctaLabel="Sprawdź domenę"
      ctaNote="Wynik od ręki"
      checks={[
        {
          title: "11 list w jednym sprawdzeniu",
          desc: "Dziesięć list adresów IP, między innymi SpamCop, Barracuda i UCEPROTECT, oraz listę domen.",
        },
        {
          title: "Serwery z rekordów MX",
          desc: "Same znajdujemy serwery poczty Twojej domeny. Własny serwer wysyłkowy możesz podać ręcznie.",
        },
        {
          title: "Alert tylko przy zmianie",
          desc: "Sprawdzamy codziennie. Piszemy, gdy domena trafi na listę i gdy z niej wyjdzie.",
        },
        {
          title: "Link do zgłoszenia usunięcia",
          desc: "Przy każdej liście odnośnik do jej strony, gdzie sprawdzisz powód wpisu i poprosisz o usunięcie.",
        },
      ]}
      pricing={[
        {
          name: "Czarne listy",
          price: "0 zł",
          desc: "Wynik od ręki, potem codzienna kontrola i alert mailem.",
          features: [
            "11 list spamowych",
            "do 3 domen na jeden adres e-mail",
            "alert przy wpisie i przy wyjściu z listy",
            "wypisanie jednym kliknięciem",
          ],
          featured: true,
          href: "#narzedzie",
          cta: "Sprawdź domenę",
        },
      ]}
      faq={[
        {
          q: "Czemu to jest za darmo?",
          a: "Sprawdzenie to kilkadziesiąt zapytań DNS. Wolimy, żebyś zobaczył, że potrafimy wykryć problem z pocztą, niż zapłacił za coś, czego nie widać.",
        },
        {
          q: "Co dzieje się, gdy domena trafi na listę?",
          a: "Dostajesz mail z nazwą listy, adresem IP, którego dotyczy wpis, i linkiem do strony listy. Tam sprawdzisz powód i zgłosisz usunięcie. Do czasu usunięcia część odbiorców może odrzucać Twoje maile albo wrzucać je do spamu.",
        },
        {
          q: "Czy sprawdzacie Spamhaus?",
          a: "Jeszcze nie. Spamhaus odrzuca zapytania z serwerów w chmurze i wymaga własnego klucza. Sprawdzamy 11 innych list.",
        },
        {
          q: "Czy muszę podać serwer poczty?",
          a: "Nie. Bez niego sprawdzamy serwery z rekordów MX domeny. Serwer podaj, gdy wysyłasz maile z własnego serwera albo z programu do newsletterów na osobnym adresie IP.",
        },
        {
          q: "Co mi grozi, że ktoś zapisze mój adres?",
          a: "Dostaniesz jeden mail z wynikiem i linkiem do wypisania. Potem nic, dopóki lista się nie zmieni.",
        },
      ]}
      formId="czarne_listy_pomoc"
      formHeading="Jesteś na liście i nie wiesz, co dalej?"
      formIntro="Opisz sytuację i wklej wynik sprawdzenia. Odpiszemy, co jest przyczyną i jak to usunąć."
      submitLabel="Napisz do nas"
      microCopy="Odpowiadamy w dzień roboczy."
      serviceName="Czarne listy spamowe"
      serviceDesc="Darmowe sprawdzenie domeny i serwerów poczty na 11 listach spamowych oraz codzienny alert mailem przy zmianie."
      serviceType="Monitoring poczty"
    />
  );
}
