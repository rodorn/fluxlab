import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Audyt szybkości i błędów strony, 19 zł | Fluxlab",
  description:
    "Automat przechodzi po Twojej stronie, mierzy czas ładowania na telefonie, znajduje błędy konsoli, martwe linki i braki SEO. Lista poprawek uszeregowana po realnym wpływie, nie 200 uwag bez priorytetów. 19 zł.",
  alternates: { canonical: "/audyt-strony" },
};

export default function Page() {
  return (
    <ProductLanding
      slug="audyt-strony"
      breadcrumb="Audyt strony"
      eyebrow="Audyt techniczny"
      h1="Sprawdź, co spowalnia i psuje Twoją stronę"
      lead="Darmowe narzędzia wypluwają setkę uwag bez znaczenia i zostawiają Cię z pytaniem, od czego zacząć. Ja przechodzę po stronie automatem i oddaję listę poprawek ustawioną według tego, co realnie wpływa na szybkość i na to, jak widzi Cię Google."
      ctaLabel="Zamów audyt za 19 zł"
      ctaNote="Raport tego samego dnia"
      checks={[
        {
          title: "Szybkość tam, gdzie boli",
          desc: "Pomiar na warunkach telefonu, bo tam traci się klientów. Wskazuję konkretne pliki i obrazy, które blokują wyświetlenie treści.",
        },
        {
          title: "Błędy, których nie widzisz",
          desc: "Błędy konsoli, nieładujące się zasoby, mieszana zawartość i martwe odnośniki, czyli rzeczy działające u Ciebie w przeglądarce, a psujące się u innych.",
        },
        {
          title: "Braki widoczne dla Google",
          desc: "Brakujące tytuły i opisy, duplikaty, nagłówki w złej kolejności, brak opisów obrazków, nieprawidłowe adresy kanoniczne.",
        },
        {
          title: "Priorytety, nie lista życzeń",
          desc: "Każda pozycja ma szacowany wpływ i pracochłonność, żeby dało się zacząć od trzech rzeczy, które dają najwięcej.",
        },
      ]}
      pricing={[
        {
          name: "Audyt strony",
          price: "19 zł",
          desc: "Jedna strona lub sklep do dwustu podstron.",
          features: [
            "szybkość na telefonie i desktopie",
            "błędy techniczne i martwe linki",
            "braki SEO na stronach kluczowych",
            "lista poprawek według wpływu",
          ],
          featured: true,
        },
        {
          name: "Audyt z wdrożeniem",
          price: "od 149 zł",
          desc: "Nie masz kogo poprosić o naprawę.",
          features: [
            "wszystko z audytu",
            "wdrożenie poprawek technicznych",
            "ponowny pomiar po zmianach",
            "krótkie podsumowanie, co się poprawiło",
          ],
        },
      ]}
      faq={[
        {
          q: "Czym to się różni od darmowego PageSpeed?",
          a: "PageSpeed ocenia pojedynczy adres i podaje uwagi bez kontekstu Twojej strony. Ja przechodzę po wielu podstronach, łączę wyniki z błędami technicznymi i brakami SEO, a potem układam to w kolejność działania.",
        },
        {
          q: "Czy potrzebujesz dostępu do mojej strony?",
          a: "Nie do audytu. Wystarczy publiczny adres. Dostęp jest potrzebny dopiero, gdy zamawiasz wdrożenie poprawek.",
        },
        {
          q: "Czy audyt czymś obciąży serwer?",
          a: "Nie. Przechodzę po stronie spokojnie, z opóźnieniami między żądaniami, tak jak zwykły użytkownik, a nie jak masowy skaner.",
        },
        {
          q: "Co dostaję fizycznie?",
          a: "Raport PDF z listą poprawek, pomiarami i zrzutami. Jeśli chcesz, dorzucam wersję w arkuszu do odhaczania.",
        },
      ]}
      formId="order_audyt_strony"
      formHeading="Zamów audyt strony"
      formIntro="Podaj adres strony i napisz, co Cię najbardziej uwiera: wolne ładowanie, spadki w Google, błędy na telefonie. Jeśli masz konkretne podstrony do sprawdzenia, wypisz je."
      submitLabel="Zamów audyt"
      microCopy="Raport zwykle tego samego dnia. Płatność ustalamy mailowo po potwierdzeniu zakresu."
      serviceName="Audyt szybkości i błędów strony"
      serviceDesc="Automatyczny audyt techniczny strony: szybkość na telefonie, błędy konsoli, martwe linki i braki SEO, z listą poprawek według realnego wpływu. 19 zł."
      serviceType="Audyt techniczny strony internetowej"
    />
  );
}
