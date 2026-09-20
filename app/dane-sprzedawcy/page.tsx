import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import SprzedawcaCheck from "@/components/SprzedawcaCheck";

export const metadata: Metadata = {
  title: "Czy klient ustali ze strony, komu płaci, sprawdź za darmo | Fluxlab",
  description:
    "Księgowość kupującego sprawdza sprzedawcę w wykazie podatników VAT przed przelewem. Sprawdź za darmo, czy Twoja strona podaje NIP i czy dane zgadzają się z wykazem. Uzupełnienie od 600 zł.",
  alternates: { canonical: "/dane-sprzedawcy" },
  openGraph: {
    title: "Czy klient ustali ze strony, komu płaci, sprawdź za darmo | Fluxlab",
    description:
      "Wyciągam NIP i numer konta ze strony, kontaktu i regulaminu, po czym sprawdzam je w wykazie podatników VAT. Od ręki, bez rejestracji.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, dane rejestrowe sprzedawcy na stronie firmowej",
      },
    ],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="dane-sprzedawcy"
      tool={<SprzedawcaCheck />}
      breadcrumb="Dane sprzedawcy"
      eyebrow="Przelewy między firmami"
      h1="Klient firmowy sprawdza Cię w rejestrze, zanim zapłaci"
      lead="Zanim księgowość kupującego wypuści przelew, ustala, kto jest sprzedawcą i czy figuruje w wykazie podatników VAT. Przy większych kwotach sprawdza także, czy numer konta należy do tego samego podmiotu, bo inaczej kupujący traci koszt podatkowy. Jeżeli Twoja strona nie podaje NIP-u, ten test nie ma z czego wyjść i płatność się przesuwa."
      ctaLabel="Sprawdź swoją stronę"
      ctaNote="Sprawdzenie za darmo, od ręki"
      checks={[
        {
          title: "Czy NIP jest gdziekolwiek na stronie",
          desc: "Sprawdzam stronę główną, kontakt, regulamin i politykę prywatności, bo dane rejestrowe najczęściej leżą właśnie tam, a nie na widoku.",
        },
        {
          title: "Kto naprawdę kryje się za tym NIP-em",
          desc: "Odpytuję wykaz podatników i pokazuję nazwę, adres, status VAT oraz liczbę zgłoszonych rachunków. Zdarza się, że na stronie dealera stoi NIP importera, czyli zupełnie innej spółki.",
        },
        {
          title: "Czy numer konta pasuje do NIP-u",
          desc: "Jeśli podajecie rachunek, to właśnie ta para jest sprawdzana przed przelewem. Rachunek bez NIP-u obok jest dla kupującego bezużyteczny.",
        },
        {
          title: "Gotowy fragment do wklejenia",
          desc: "Stopka z kompletem danych plus znacznik, po którym narzędzia zakupowe i wyszukiwarka odczytają je automatycznie, zamiast zgadywać z tekstu.",
        },
      ]}
      pricing={[
        {
          name: "Sprawdzenie",
          price: "0 zł",
          desc: "Od ręki, na tej stronie.",
          features: [
            "NIP i numer konta znalezione na stronie",
            "dane z wykazu podatników na dziś",
            "werdykt, czy klient ma czego szukać",
          ],
        },
        {
          name: "Uzupełnienie danych",
          price: "od 600 zł",
          desc: "Jedna firma, wszystkie jej domeny.",
          features: [
            "przegląd wszystkich Waszych adresów",
            "gotowa stopka i znacznik do wklejenia",
            "sprawdzenie zgodności z wykazem",
            "raport do pokazania klientowi",
          ],
          featured: true,
        },
        {
          name: "Pilnowanie wykazu",
          price: "od 120 zł/mc",
          desc: "Wykaz zmienia się codziennie.",
          features: [
            "codzienne sprawdzanie statusu VAT",
            "sygnał, gdy zmieni się lista rachunków",
            "sygnał, gdy zmienią się dane na stronie",
          ],
        },
      ]}
      faq={[
        {
          q: "Czy brak NIP-u na stronie jest niezgodny z prawem?",
          a: "Przepisy o świadczeniu usług drogą elektroniczną wymagają podania danych identyfikujących usługodawcę, natomiast nie będę tego sprzedawał jako straszaka karą, bo nie sprawdzałem, czy i jak bywa to egzekwowane. Powód, dla którego warto to poprawić, jest praktyczny: to jest tarcie przy płatności, a nie ryzyko mandatu.",
        },
        {
          q: "Wykaz pokazuje status inny niż Czynny, co to znaczy?",
          a: "Niekoniecznie coś złego. Taki status zwracają także duże, działające firmy, na przykład przez sposób rozliczania w grupie. Dlatego nie nazywam tego z góry problemem, tylko sygnałem do wyjaśnienia. Istotne jest to, że Twój klient zobaczy dokładnie to samo i bez wyjaśnienia wyciągnie własne wnioski.",
        },
        {
          q: "Sprawdzasz tylko sześć podstron, a moje dane są gdzie indziej.",
          a: "Wtedy narzędzie ich nie znajdzie i tak to zapisze. Nie czyta też regulaminów w plikach PDF ani danych wklejonych jako obrazek. Jeżeli u Was jest właśnie tak, to samo w sobie jest wnioskiem, bo narzędzia po stronie kupującego czytają stronę podobnie jak ja.",
        },
        {
          q: "Skąd bierzesz dane rejestrowe?",
          a: "Z publicznego wykazu podatników VAT prowadzonego przez Ministerstwo Finansów, przez jego oficjalny interfejs. Bez logowania, bez opłat i bez żadnych danych osobowych po drodze.",
        },
      ]}
      formId="order_dane_sprzedawcy"
      formHeading="Zamów uzupełnienie danych"
      formIntro="Napisz, ile macie domen i na czym stoi strona, a odeślę przegląd wszystkich adresów razem z gotowym fragmentem do wklejenia."
      submitLabel="Zamów uzupełnienie"
      microCopy="Do sprawdzenia nie potrzebuję żadnych dostępów, bo pracuję na tym, co i tak widzi każdy odwiedzający. Dostęp jest potrzebny dopiero przy wklejeniu poprawki."
      serviceName="Uzupełnienie danych rejestrowych na stronie firmowej"
      serviceDesc="Przegląd wszystkich domen firmy pod kątem danych identyfikujących sprzedawcę, zestawienie ich z wykazem podatników VAT oraz przygotowanie gotowej stopki i znaczników do wdrożenia. Od 600 zł."
      serviceType="Uzupełnienie i weryfikacja danych rejestrowych na stronie"
    />
  );
}
