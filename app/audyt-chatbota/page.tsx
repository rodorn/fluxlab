import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Audyt chatbota, sprawdź co Twój asystent AI mówi klientom | Fluxlab",
  description:
    "Zadaję Twojemu botowi 150 realnych pytań klienta i zderzam każdą odpowiedź z cennikiem, regulaminem i zasadami zwrotów. Wyłapuję halucynacje i obietnice, którymi firma jest związana. 69 zł.",
  alternates: { canonical: "/audyt-chatbota" },
};

export default function Page() {
  return (
    <ProductLanding
      slug="audyt-chatbota"
      breadcrumb="Audyt chatbota"
      eyebrow="Jakość asystenta AI"
      h1="Sprawdź, co Twój bot naprawdę mówi klientom"
      lead="Bot na stronie działa, więc wygląda, że jest dobrze. Problem w tym, że narzędzia sprawdzają, czy okienko się otwiera, a nie czy odpowiedzi są prawdziwe. Zadaję 150 realnych pytań klienta i każdą odpowiedź zderzam z tym, co faktycznie masz w cenniku i regulaminie."
      ctaLabel="Zamów audyt bota"
      ctaNote="Raport w 48 godzin"
      checks={[
        {
          title: "Obietnice, którymi jesteś związany",
          desc: "Bot potrafi obiecać zwrot po terminie, rabat albo darmową dostawę, których nie oferujesz. To nie jest tylko wpadka wizerunkowa, klient ma zrzut ekranu.",
        },
        {
          title: "Halucynacje o produktach",
          desc: "Wymyślone parametry, dostępność towaru, którego nie ma, i terminy dostawy wzięte z powietrza. Każdą taką odpowiedź pokazuję z cytatem.",
        },
        {
          title: "Sprzeczności z regulaminem",
          desc: "Zwroty, reklamacje, gwarancja i faktury, czyli miejsca, gdzie rozbieżność między botem a regulaminem kosztuje najwięcej.",
        },
        {
          title: "Zestaw testów na przyszłość",
          desc: "Trzydzieści pytań kontrolnych do powtórzenia po każdej zmianie promptu albo modelu, bo bot potrafi po cichu zmienić zachowanie po aktualizacji.",
        },
      ]}
      pricing={[
        {
          name: "Audyt",
          price: "69 zł",
          desc: "Chcesz wiedzieć, czy bot Cię nie topi.",
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
          desc: "Bot zmienia się po każdej aktualizacji modelu.",
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
          q: "Czy będziesz łamał zabezpieczenia mojego bota?",
          a: "Nie. W standardowym audycie zadaję wyłącznie normalne pytania klienta, czyli rozmowę, którą może odbyć każdy odwiedzający. Testy odporności na manipulację robię tylko wtedy, gdy wyraźnie o to poprosisz na piśmie.",
        },
        {
          q: "Czego potrzebujesz, żeby zacząć?",
          a: "Adresu strony z botem oraz aktualnego cennika i regulaminu, najlepiej jako link albo plik. Bez nich mogę ocenić spójność odpowiedzi, ale nie ich prawdziwość.",
        },
        {
          q: "Mam bota regułowego, nie AI. Ma to sens?",
          a: "Mniejszy. Bot regułowy nie halucynuje, więc audyt sprowadza się do luk w scenariuszach. Napisz, co masz, i powiem wprost, czy warto.",
        },
        {
          q: "Co dostaję na koniec?",
          a: "Raport PDF z listą wpadek, każdą z cytatem i zrzutem, oraz plik z testami kontrolnymi do ponownego użycia.",
        },
      ]}
      formId="order_audyt_chatbota"
      formHeading="Zamów audyt chatbota"
      formIntro="Podaj adres strony z botem, napisz na czym jest zbudowany, jeśli wiesz, i podlinkuj cennik oraz regulamin. Jeśli masz obszary, które szczególnie Cię niepokoją, wypisz je."
      submitLabel="Zamów audyt bota"
      microCopy="Raport w 48 godzin. Zadaję wyłącznie zwykłe pytania klienta, bez prób obchodzenia zabezpieczeń."
      serviceName="Audyt jakości odpowiedzi chatbota"
      serviceDesc="Weryfikacja asystenta AI: 150 realnych pytań klienta zderzonych z cennikiem i regulaminem, wykrywanie halucynacji i kosztownych obietnic, zestaw testów regresyjnych. 69 zł."
      serviceType="Audyt jakości chatbota"
    />
  );
}
