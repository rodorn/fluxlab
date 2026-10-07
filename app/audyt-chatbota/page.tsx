import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Audyt chatbota, co asystent AI mówi klientom | Fluxlab",
  description:
    "Zadajemy Twojemu botowi 150 realnych pytań klienta i zderzamy odpowiedzi z cennikiem, regulaminem i zasadami zwrotów. Wyłapujemy halucynacje. 69 zł.",
  alternates: { canonical: "/audyt-chatbota" },
  openGraph: {
    title:
      "Audyt chatbota, sprawdź co Twój asystent AI mówi klientom | Fluxlab",
    description:
      "150 realnych pytań klienta zderzonych z cennikiem i regulaminem. Wyłapujemy halucynacje i obietnice, którymi firma jest związana. 69 zł.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, audyt chatbota",
      },
    ],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="audyt-chatbota"
      breadcrumb="Audyt chatbota"
      eyebrow="Jakość asystenta AI"
      h1="Sprawdź, co Twój bot naprawdę mówi klientom"
      lead="Bot działa, ale czy mówi prawdę? Zadajemy 150 realnych pytań klienta i zderzamy odpowiedzi z Twoim cennikiem i regulaminem."
      ctaLabel="Zamów audyt bota"
      ctaNote="Raport w 48 godzin"
      checks={[
        {
          title: "Obietnice, którymi jesteś związany",
          desc: "Zwrot po terminie, rabat albo darmowa dostawa, których nie oferujesz.",
        },
        {
          title: "Halucynacje o produktach",
          desc: "Wymyślone parametry, dostępność i terminy dostawy. Każdą pokazujemy z cytatem.",
        },
        {
          title: "Sprzeczności z regulaminem",
          desc: "Zwroty, reklamacje, gwarancja i faktury.",
        },
        {
          title: "Zestaw testów na przyszłość",
          desc: "Trzydzieści pytań kontrolnych do powtórzenia po każdej zmianie promptu albo modelu.",
        },
      ]}
      pricing={[
        {
          name: "Audyt",
          price: "69 zł",
          desc: "Jednorazowe sprawdzenie bota.",
          features: [
            "150 realnych pytań klienta",
            "klasyfikacja każdej odpowiedzi z cytatem",
            "lista sprzeczności z regulaminem",
            "zestaw testów kontrolnych",
          ],
          featured: true,
        },
        {
          name: "Audyt z regresją",
          price: "199 zł/mc",
          desc: "Testy co miesiąc, po każdej zmianie modelu.",
          features: [
            "wszystko z audytu",
            "comiesięczne powtórzenie testów",
            "alarm, gdy odpowiedzi się zmienią",
            "propozycje poprawek promptu",
          ],
        },
      ]}
      faq={[
        {
          q: "Czy odpowiadamy za to, co obiecał nasz bot?",
          a: "W praktyce tak. W sprawie Moffatt przeciwko Air Canada (2024) firma odpowiadała za zniżkę obiecaną przez chatbota, choć regulamin jej nie przewidywał.",
        },
        {
          q: "Czy będziecie łamali zabezpieczenia naszego bota?",
          a: "Nie. Zadajemy tylko zwykłe pytania klienta. Testy odporności robimy wyłącznie na pisemną prośbę.",
        },
        {
          q: "Czego potrzebujecie, żeby zacząć?",
          a: "Adresu strony z botem oraz aktualnego cennika i regulaminu.",
        },
        {
          q: "Co dostajemy na koniec?",
          a: "Raport PDF z listą błędów, cytatami i zrzutami oraz plik z testami kontrolnymi.",
        },
      ]}
      formId="order_audyt_chatbota"
      formHeading="Zamów audyt chatbota"
      formIntro="Podaj adres strony z botem i podlinkuj cennik oraz regulamin."
      submitLabel="Zamów audyt bota"
      microCopy="Raport w 48 godzin. Tylko zwykłe pytania klienta."
      serviceName="Audyt jakości odpowiedzi chatbota"
      serviceDesc="Weryfikacja asystenta AI: 150 realnych pytań klienta zderzonych z cennikiem i regulaminem, wykrywanie halucynacji i kosztownych obietnic, zestaw testów regresyjnych. 69 zł."
      serviceType="Audyt jakości chatbota"
    />
  );
}
