import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Integracja CRM z ERP: jak to zrobić, żeby nie rozjechały się dane | Fluxlab",
  description:
    "Spinam CRM z systemem magazynowo-księgowym: kontrahenci, oferty, zamówienia, faktury i stany. Opisuję cztery decyzje, które przesądzają o powodzeniu, i podaję widełki kosztu.",
  alternates: { canonical: "/integracja-crm-z-erp" },
  openGraph: {
    title: "Integracja CRM z ERP: jak to zrobić, żeby nie rozjechały się dane | Fluxlab",
    description:
      "Kierunek prawdy, klucz dopasowania kontrahenta, moment wypchnięcia dokumentu i obsługa błędów. Cztery decyzje, od których zależy, czy integracja przeżyje pierwszy kwartał.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, integracja CRM z ERP",
      },
    ],
  },
};

export default function IntegracjaCrmZErp() {
  return (
    <ProductLanding
      slug="integracja-crm-z-erp"
      breadcrumb="Integracja CRM z ERP"
      eyebrow="Integracje"
      h1="Integracja CRM z ERP"
      lead="Handlowcy pracują w CRM, księgowość i magazyn w systemie ERP, a między nimi stoi człowiek, który przepisuje dane w obie strony. Spinam te dwa światy tak, żeby dane szły same, a rozjazd był widoczny od razu, nie na koniec miesiąca."
      ctaLabel="Opisz swoje dwa systemy"
      ctaNote="Odpisuję zwykle tego samego dnia"
      checks={[
        {
          title: "Pierwsza decyzja: gdzie jest źródło prawdy",
          desc: "Dla każdego rodzaju danych musi istnieć jeden system, który rozstrzyga spór. Kontrahent zwykle należy do ERP, bo tam powstaje faktura i tam pilnuje się numeru identyfikacyjnego. Szansa sprzedaży należy do CRM, bo w ERP nie ma czegoś takiego. Integracje psują się najczęściej wtedy, gdy obie strony wolno edytować i obie wygrywają na zmianę.",
        },
        {
          title: "Druga decyzja: po czym poznajemy, że to ten sam kontrahent",
          desc: "Dopasowanie po nazwie nie działa, bo w CRM stoi nazwa handlowa, a w ERP pełna nazwa rejestrowa ze spółką i skrótami. Klucz buduję na numerze identyfikacji podatkowej, a jeśli go nie ma, na parze adres i numer klienta. Przed uruchomieniem robię zestawienie tego, co się nie dopasowało, bo to zwykle kilka procent bazy i lepiej rozstrzygnąć je ręcznie raz niż produkować duplikaty w nieskończoność.",
        },
        {
          title: "Trzecia decyzja: w którym momencie dokument idzie do ERP",
          desc: "Zwykle przy przejściu szansy sprzedaży w wygraną, ale nie zawsze. W firmach z zamówieniami częściowymi sensowniej wypychać dokument dopiero po potwierdzeniu dostępności, inaczej magazyn dostaje zamówienia na towar, którego nie ma. Ten jeden wybór decyduje o tym, czy księgowość będzie potem ręcznie anulować dokumenty.",
        },
        {
          title: "Czwarta decyzja: co się dzieje, gdy nie zadziała",
          desc: "Integracja bez obsługi błędów to integracja, o której dowiadujesz się od klienta. Każda nieudana operacja trafia do kolejki i jest ponawiana, a jeśli dalej nie przechodzi, dostajesz jedno zbiorcze powiadomienie z treścią błędu i możliwością ponowienia jednym kliknięciem. Cisza oznacza wtedy, że naprawdę wszystko poszło, a nie że nikt nie patrzył.",
        },
        {
          title: "Stany magazynowe i ceny w drugą stronę",
          desc: "Handlowiec potrzebuje w CRM aktualnej ceny i informacji o dostępności, żeby nie obiecywać rzeczy, których nie ma. To synchronizacja odwrotna, z ERP do CRM, i zwykle wystarczy jej odświeżanie cykliczne zamiast reakcji na każde zdarzenie, bo stan sprzed kwadransa jest wystarczająco dobry, a obciążenie systemu dużo mniejsze.",
        },
        {
          title: "Czego nie zrobię",
          desc: "Nie wejdę w integrację, w której obie strony mają swobodnie edytować te same pola i nikt nie chce rozstrzygnąć, kto ma rację. To nie jest problem techniczny, tylko decyzja organizacyjna, i bez niej każde rozwiązanie będzie generować rozjazdy. Powiem to na początku, a nie po wdrożeniu.",
        },
      ]}
      pricing={[
        {
          name: "Rozpoznanie",
          price: "0 zł",
          desc: "Zanim cokolwiek zlecisz.",
          features: [
            "Sprawdzam, czy Twój ERP wystawia interfejs programistyczny, czy trzeba przez pliki",
            "Zestawienie kontrahentów, którzy nie dopasują się automatycznie",
            "Informacja, czy integracja ma sens, czy taniej wyjdzie zmiana procesu",
          ],
        },
        {
          name: "Jeden kierunek",
          price: "2 900 zł",
          desc: "Najczęstszy start: z CRM do ERP.",
          features: [
            "Kontrahent i dokument sprzedaży z CRM do ERP",
            "Dopasowanie po numerze identyfikacji podatkowej, z listą wyjątków",
            "Kolejka ponowień i powiadomienie o błędach",
            "Dokumentacja i przekazanie dostępów",
          ],
          featured: true,
        },
        {
          name: "W obie strony",
          price: "5 900 zł",
          desc: "Z synchronizacją stanów i cen z powrotem.",
          features: [
            "Wszystko z wariantu jednokierunkowego",
            "Stany magazynowe i cennik z ERP do CRM",
            "Status płatności widoczny przy szansie sprzedaży",
            "Panel z historią synchronizacji i ręcznym ponowieniem",
            "Pierwszy miesiąc opieki w cenie",
          ],
        },
      ]}
      faq={[
        {
          q: "Z jakimi systemami to robisz?",
          a: "Od strony CRM najczęściej Pipedrive i HubSpot, bo oba mają porządny interfejs programistyczny i zdarzenia. Od strony ERP liczy się nie nazwa, tylko to, czy system udostępnia interfejs, czy tylko import i eksport plików. Przy plikach integracja też jest możliwa, tylko działa cyklicznie zamiast natychmiast, i mówię o tym wprost przed wyceną.",
        },
        {
          q: "Co, jeśli nasz ERP nie ma żadnego interfejsu?",
          a: "Wtedy zostaje wymiana plikami w uzgodnionym formacie, podłożonych w miejsce, które ERP sam odczytuje, albo praca na jego bazie danych w trybie odczytu. Drugie rozwiązanie bywa jedyne, ale niesie ryzyko przy aktualizacjach systemu i traktuję je jako ostateczność, nie jako domyślny wybór.",
        },
        {
          q: "Ile to trwa?",
          a: "Wariant jednokierunkowy to zwykle od dwóch do trzech tygodni, licząc od momentu, w którym mam dostępy testowe do obu systemów. Największą część tego czasu zajmuje nie kod, tylko uzgodnienie, co ma się dziać z kontrahentami, którzy nie dopasowali się automatycznie.",
        },
        {
          q: "Czy dane wychodzą poza naszą firmę?",
          a: "Nie muszą. Integrację można postawić na Waszym serwerze, wtedy dane idą wyłącznie między Waszym CRM a Waszym ERP. Jeśli wolicie rozwiązanie chmurowe, powiem, co dokładnie przechodzi przez czyją infrastrukturę, zanim cokolwiek uruchomimy.",
        },
        {
          q: "Co zostaje po zakończeniu?",
          a: "Kod, dostępy i dokumentacja, po Waszej stronie. Nie ma tu żadnego mojego panelu, bez którego integracja przestaje działać, i nie ma abonamentu, który trzeba płacić, żeby dane dalej się synchronizowały. Opieka jest dobrowolna i dotyczy reagowania na zmiany po stronie dostawców, nie dostępu do własnego rozwiązania.",
        },
      ]}
      formId="integracja_erp"
      formHeading="Napisz, co masz po obu stronach"
      formIntro="Wystarczy nazwa CRM, nazwa systemu ERP i jedno zdanie o tym, co dziś ktoś przepisuje ręcznie. Odpiszę, czy da się to spiąć, w którą stronę zacząć i jakie są widełki."
      submitLabel="Wyślij opis"
      microCopy="Bez rozmowy telefonicznej, jeśli nie chcesz. Ustalenia prowadzę mailowo."
      serviceName="Integracja CRM z ERP"
      serviceDesc="Spięcie systemu CRM z systemem magazynowo-księgowym: kontrahenci, dokumenty sprzedaży, stany magazynowe i ceny, z obsługą błędów i ponowień."
      serviceType="Integracja systemów informatycznych"
    />
  );
}
