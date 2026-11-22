import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Raport Google Analytics prostym językiem, 29 zł | Fluxlab",
  description:
    "Co poniedziałek mail: ile osób odwiedziło stronę, skąd przyszły i co się zmieniło. Bez logowania do Analytics, 29 zł netto miesięcznie.",
  alternates: { canonical: "/raport-google-analytics" },
  openGraph: {
    title: "Raport Google Analytics prostym językiem, 29 zł | Fluxlab",
    description:
      "Co poniedziałek krótki mail z Google Analytics 4: wejścia, źródła, strony i spadki, opisane zwykłymi zdaniami.",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, raport Google Analytics prostym językiem" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="raport-google-analytics"
      breadcrumb="Raport Google Analytics"
      typ="usluga"
      h1="Co mówi Google Analytics, bez logowania i bez wykresów?"
      lead="Co poniedziałek dostajesz mail: ile osób odwiedziło stronę, skąd przyszły, które strony czytano najczęściej i co spadło w porównaniu z tygodniem wcześniej. Opisane zwykłymi zdaniami. Zanim zamówisz, dodaj nasz adres jako Przeglądającego w swoim Google Analytics 4. Pierwszy raport przychodzi w kilka minut po płatności."
      ctaLabel="Włącz raport"
      ctaNote="29 zł netto miesięcznie, rezygnacja w każdej chwili"
      checks={[
        {
          title: "Wejścia i osoby",
          desc: "Ile wizyt i ile osób, ile z nich było nowych, i jak to wypada wobec poprzedniego tygodnia.",
        },
        {
          title: "Skąd przychodzą",
          desc: "Wyszukiwarki, wejścia bezpośrednie, linki z innych stron, media społecznościowe i reklamy: który kanał rośnie, a który spada.",
        },
        {
          title: "Najczęściej oglądane strony",
          desc: "Osiem stron z największą liczbą odsłon i zmiana wobec poprzedniego tygodnia. Nowa strona w czołówce to zwykle dobra wiadomość.",
        },
        {
          title: "Kluczowe zdarzenia",
          desc: "Jeśli w Analytics oznaczono formularze lub zakupy jako kluczowe zdarzenia, zobaczysz, ile ich było. Gdy nic nie oznaczono, raport o tym napisze.",
        },
      ]}
      pricing={[
        {
          name: "Raport Google Analytics co poniedziałek",
          price: "29 zł",
          kup: "ga4-raport",
          desc: "Netto, miesięcznie. W polu podaj numer usługi z Analytics, same cyfry.",
          features: [
            "mail w każdy poniedziałek rano",
            "ostatnie 7 dni wobec 7 dni wcześniej",
            "źródła wejść i najczęściej oglądane strony",
            "wnioski zwykłymi zdaniami",
            "pierwszy raport od razu po płatności",
            "rezygnacja w każdej chwili",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Jak dodać Wasz adres do Analytics?",
          a: "W Google Analytics wejdź w Administracja, potem Zarządzanie dostępem do usługi, dodaj użytkownika: raporty-ga4@fluxlab-produkty.iam.gserviceaccount.com z rolą Przeglądający. Numer usługi znajdziesz w Administracja, Szczegóły usługi. To same cyfry, a nie identyfikator pomiaru zaczynający się od G-.",
        },
        {
          q: "Co widzicie w moim koncie?",
          a: "Tylko liczby z raportu: wizyty, osoby, źródła, adresy stron i kluczowe zdarzenia. Rola Przeglądający nie pozwala niczego zmieniać. Nie zapisujemy danych z Analytics, każdy raport powstaje na świeżo i trafia na Twój adres.",
        },
        {
          q: "Co, gdy nie mamy dostępu do usługi?",
          a: "Jeśli przy zamówieniu Google odrzuci dostęp albo numer jest błędny, zwracamy całą kwotę i piszemy, co poprawić. Gdy dostęp zniknie później, mail tygodniowy to napisze.",
        },
        {
          q: "Czy raport jest pisany przez AI?",
          a: "Nie. Zdania powstają z liczb według stałych reguł, więc te same dane zawsze dają ten sam raport. Nie zgadujemy przyczyn zmian, pokazujemy, co się zmieniło.",
        },
        {
          q: "Czy działa ze starym Universal Analytics?",
          a: "Nie. Obsługujemy Google Analytics 4. Universal Analytics przestał zbierać dane w 2023 roku.",
        },
        {
          q: "Jak zrezygnować?",
          a: "Anulujesz subskrypcję, a raporty kończą się same. Dostęp konta usługi możesz też odebrać w Analytics w dowolnej chwili.",
        },
      ]}
      formId="order_ga4"
      formHeading="Kilka usług albo klientów?"
      formIntro="Prowadzisz Analytics dla kilku stron albo klientów? Napisz, ile ich jest, a odpiszemy z wyceną."
      submitLabel="Wyślij zapytanie"
      microCopy="Odpisujemy w godzinę, oddzwaniamy w 2 godziny."
      serviceName="Raport Google Analytics prostym językiem"
      serviceDesc="Cotygodniowy mail z Google Analytics 4: wejścia, źródła, najczęściej oglądane strony i zmiany opisane zwykłymi zdaniami, 29 zł netto miesięcznie."
      serviceType="Raportowanie Google Analytics"
    />
  );
}
