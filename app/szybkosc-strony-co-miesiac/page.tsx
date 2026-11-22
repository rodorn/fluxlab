import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Szybkość strony co miesiąc od 19 zł | Fluxlab",
  description:
    "Co miesiąc pomiar Core Web Vitals z telefonu i komputera w Google PageSpeed Insights, z porównaniem do poprzedniego miesiąca. 19 zł netto.",
  alternates: { canonical: "/szybkosc-strony-co-miesiac" },
  openGraph: {
    title: "Szybkość strony co miesiąc od 19 zł | Fluxlab",
    description:
      "Co miesiąc pomiar Core Web Vitals z telefonu i komputera w Google PageSpeed Insights, z porównaniem do poprzedniego miesiąca. 19 zł netto.",
    url: "/szybkosc-strony-co-miesiac",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, szybkość strony co miesiąc" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="szybkosc-strony-co-miesiac"
      typ="usluga"
      breadcrumb="Szybkość strony co miesiąc"
      h1="Strona zwolniła? Dowiesz się z maila, zanim zauważą to klienci"
      lead="Raz na 30 dni mierzymy Twoją stronę w Google PageSpeed Insights, osobno dla telefonu i komputera. W mailu widzisz wynik, czas wczytania głównej treści (LCP), skakanie układu (CLS) i blokowanie strony (TBT) oraz porównanie z poprzednim miesiącem."
      ctaLabel="Włącz pomiar co miesiąc"
      ctaNote="19 zł netto miesięcznie, płatność kartą, rezygnacja w dowolnym dniu"
      checks={[
        {
          title: "Pierwszy pomiar od razu",
          desc: "Zaraz po zamówieniu mierzymy stronę i wysyłamy wynik. Od niego liczymy każde porównanie.",
        },
        {
          title: "Telefon i komputer osobno",
          desc: "Każdy pomiar robimy dwa razy, bo na telefonie strona zwykle jest wyraźnie wolniejsza. Dla każdego widzisz wynik w skali do 100 i trzy wskaźniki Core Web Vitals.",
        },
        {
          title: "Dane z realnych wizyt, gdy Google je ma",
          desc: "Dla stron z dużym ruchem Google udostępnia też wyniki z prawdziwych wizyt użytkowników. Jeśli ich dla Twojej strony nie ma, w mailu ich nie ma, nic nie dopisujemy.",
        },
        {
          title: "Pomiar laboratoryjny, nie gwarancja",
          desc: "Wynik z jednego pomiaru może się różnić o kilka punktów między próbami. Liczy się kierunek z miesiąca na miesiąc.",
        },
      ]}
      pricing={[
        {
          name: "Szybkość strony co miesiąc",
          price: "19 zł/mies.",
          kup: "monitoring-szybkosc",
          desc: "Netto. Jedna strona, pomiar co 30 dni.",
          features: [
            "pierwszy pomiar od razu",
            "telefon i komputer osobno",
            "porównanie z poprzednim miesiącem",
            "rezygnacja w dowolnym dniu, płacisz za dni korzystania",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Jaki adres podać?",
          a: "Adres strony, którą mamy zmierzyć, na przykład twojafirma.pl. Strona musi być dostępna bez logowania.",
        },
        {
          q: "Co znaczą LCP, CLS i TBT?",
          a: "LCP to czas wczytania głównej treści (dobry wynik to do 2,5 s). CLS mierzy skakanie układu w trakcie ładowania (do 0,1). TBT to czas, w którym strona nie reaguje na kliknięcia (do 200 ms).",
        },
        {
          q: "Co jeśli Google nie zmierzy strony?",
          a: "Spróbujemy ponownie po kilku godzinach. Jeśli pierwszy pomiar się nie uda, nie uruchamiamy usługi i zwracamy całą opłatę.",
        },
        {
          q: "Jak zrezygnować?",
          a: "Subskrypcję anulujesz w mailu z potwierdzeniem płatności od Stripe albo odpowiadając na mail od nas. Pomiary wyłączamy automatycznie.",
        },
      ]}
      formId="order_szybkosc_strony_co_miesiac"
      formHeading="Zapytaj o więcej stron"
      formIntro="Chcesz mierzyć kilka stron? Napisz, odpiszemy z propozycją."
      submitLabel="Wyślij zapytanie"
      microCopy="Odpisujemy w godzinę, oddzwaniamy w 2 godziny."
      serviceName="Szybkość strony co miesiąc"
      serviceDesc="Miesięczny pomiar Core Web Vitals z telefonu i komputera z porównaniem do poprzedniego miesiąca, za 19 zł netto miesięcznie."
      serviceType="Audyt strony"
    />
  );
}
