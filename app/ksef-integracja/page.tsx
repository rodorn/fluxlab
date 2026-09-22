import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import KsefCheck from "@/components/KsefCheck";

export const metadata: Metadata = {
  title: "Integracja z KSeF dla firm | Fluxlab",
  description:
    "Faktury w KSeF obowiązują od 1 kwietnia 2026. Spinam Wasz system z API v2: wysyłka w FA(3), zapis numeru KSeF i UPO, odbiór faktur. Kod otwarty.",
  alternates: { canonical: "/ksef-integracja" },
  openGraph: {
    title: "Integracja z KSeF dla firm | Fluxlab",
    description:
      "Faktury wychodzą z systemu, w którym już pracujecie, a numer KSeF i UPO zapisują się przy dokumencie. Bez przeklejania przez osobną aplikację.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, integracja z KSeF",
      },
    ],
  },
};

export default function KsefIntegracja() {
  return (
    <ProductLanding
      slug="ksef-integracja"
      tool={<KsefCheck />}
      breadcrumb="Integracja z KSeF"
      eyebrow="KSeF"
      h1="Integracja z KSeF"
      lead="Krajowy System e-Faktur jest obowiązkowy, ale nikt nie każe przeklejać do niego faktur ręcznie z osobnej aplikacji. Spinam z nim system, którego już używacie, żeby faktura wychodziła tam, gdzie powstaje, a numer KSeF i UPO zapisywały się przy dokumencie."
      ctaLabel="Sprawdź, co Was obowiązuje"
      ctaNote="Dwa kliknięcia, bez wpisywania czegokolwiek"
      checks={[
        {
          title: "Napisałem klienta tego API i oddałem go za darmo",
          desc: "Kod leży publicznie pod adresem github.com/rodorn/fluxlab-ksef-integracja: klient API v2 z uwierzytelnianiem tokenem, obsługą sesji, wysyłką faktury i pobraniem UPO, budowanie XML w schemacie FA(3) z walidacją struktury i numeru NIP, oraz gotowy przykład importu faktur kosztowych do pliku CSV. Repozytorium działa w trybie demo, bez konta w KSeF, więc można je uruchomić u siebie w kilka minut i ocenić przed rozmową z kimkolwiek.",
        },
        {
          title: "Numer KSeF i UPO to nie są szczegóły techniczne",
          desc: "To najczęstszy błąd w takich wdrożeniach. Integracja wysyła fakturę, dostaje odpowiedź i wygląda na gotową, tylko nigdzie nie zapisuje numeru KSeF ani urzędowego poświadczenia odbioru. Bez nich nie ma czym wykazać, że faktura została przyjęta, a od 1 stycznia 2027 numer KSeF trzeba podawać przy płatności, czyli musi być dostępny poza systemem księgowym.",
        },
        {
          title: "Faktura odrzucona wygląda jak wystawiona",
          desc: "Sesja potrafi nie odpowiedzieć, a dokument zostać odrzucony na poziomie schematu. Jeżeli nie ma kolejki z ponowieniami i miejsca, w którym widać stan każdej faktury, odrzucenie przechodzi po cichu i wychodzi dopiero przy zamknięciu miesiąca. Buduję to jako kolejkę ze stanami, a nie jako jedno wywołanie po zapisaniu dokumentu.",
        },
        {
          title: "Druga strona, czyli faktury kosztowe",
          desc: "Odbiór faktur w KSeF obowiązuje wszystkich od 1 lutego 2026, więc dokumenty od dostawców już tam są, niezależnie od tego, czy ktoś je stamtąd zabiera. Pobieranie ich automatycznie i wkładanie do systemu obiegu dokumentów albo do księgowości bywa większą oszczędnością niż sama wysyłka, bo tę i tak wykonuje program.",
        },
        {
          title: "Co zostaje poza systemem",
          desc: "Sprzedaż dla osób prywatnych, procedury OSS i IOSS oraz, do 31 grudnia 2026, faktury z kas rejestrujących. Przy sprzedaży mieszanej te strumienie trzeba rozdzielić na etapie wdrożenia, inaczej do KSeF trafi dokument, którego tam być nie powinno.",
        },
        {
          title: "Kiedy to się nie opłaca",
          desc: "Przy kilku fakturach miesięcznie wystarczy darmowa Aplikacja Podatnika KSeF od Ministerstwa Finansów albo zwykły program do fakturowania z wbudowaną obsługą systemu. Integracja ma sens tam, gdzie faktury powstają w Waszym systemie sprzedażowym albo jest ich na tyle dużo, że ktoś je dziś przenosi ręcznie.",
        },
      ]}
      pricing={[
        {
          name: "Rozpoznanie",
          price: "0 zł",
          desc: "Zanim cokolwiek zlecicie.",
          features: [
            "Sprawdzam, czy Wasz system da się z tym spiąć i czym",
            "Informacja, czy wystarczy Wam gotowy program zamiast wdrożenia",
            "Gotowy klient API do uruchomienia u siebie, publicznie",
          ],
        },
        {
          name: "Odbiór faktur kosztowych",
          price: "4 900 zł",
          desc: "Najczęstszy zakres na start.",
          features: [
            "Faktury zakupowe pobierane z KSeF automatycznie",
            "Trafiają do księgowości, obiegu dokumentów albo arkusza",
            "Numer KSeF i UPO zapisane przy każdym dokumencie",
            "Kod i dostępy zostają u Was",
          ],
          featured: true,
        },
        {
          name: "Wystawianie i odbiór",
          price: "9 900 zł",
          desc: "Z wysyłaniem faktur z Waszego systemu.",
          features: [
            "Wszystko z wariantu podstawowego",
            "Wysyłka w schemacie FA(3), z walidacją przed wysłaniem",
            "Kolejka ponowień i widok stanu każdej faktury",
            "Rozdzielenie sprzedaży dla firm i dla osób prywatnych",
            "Pierwszy miesiąc opieki w cenie",
          ],
        },
      ]}
      faq={[
        {
          q: "Mamy program księgowy, który obsługuje KSeF. Po co nam integracja?",
          a: "Najprawdopodobniej po nic i tak powiem, jeśli tak wyjdzie z rozpoznania. Integracja przydaje się wtedy, gdy faktury powstają poza programem księgowym, na przykład w sklepie, w systemie zamówień albo w CRM, i ktoś je dziś przenosi ręcznie. Drugi przypadek to faktury kosztowe, których program księgowy często nie pobiera sam.",
        },
        {
          q: "Czy to znaczy, że musimy zmienić program do faktur?",
          a: "Nie. Sens integracji polega właśnie na tym, żeby zostawić Wam narzędzie, w którym umiecie pracować, i dołożyć pod spodem warstwę rozmawiającą z KSeF. Zmiana programu jest osobną decyzją i jeżeli i tak ją rozważacie, lepiej najpierw ją podjąć, a dopiero potem spinać cokolwiek.",
        },
        {
          q: "Skąd mam wiedzieć, że umiecie to zrobić?",
          a: "Z kodu, pod adresem github.com/rodorn/fluxlab-ksef-integracja. Jest tam klient API v2, budowanie faktury w schemacie FA(3), testy uruchamiane automatycznie przy każdej zmianie i tryb demo, który działa bez konta w KSeF. Możecie go uruchomić sami albo dać do oceny swojemu programiście, zanim cokolwiek zlecicie. To więcej niż referencja, bo referencji nie da się sprawdzić linijka po linijce.",
        },
        {
          q: "Gdzie trzymane są nasze dane i token do KSeF?",
          a: "U Was. Integrację stawiam na Waszym serwerze, a klient czyta konfigurację wyłącznie ze zmiennych środowiskowych, więc w kodzie nie ma żadnych sekretów. Jeżeli wolicie rozwiązanie chmurowe, powiem wprost, co przez czyją infrastrukturę przechodzi, zanim cokolwiek uruchomimy.",
        },
        {
          q: "Zdążymy przed 1 stycznia 2027?",
          a: "Przy typowym zakresie wdrożenie zajmuje kilka tygodni, więc tak, ale grudzień 2026 będzie najgorszym możliwym momentem na zaczynanie. Wtedy naraz kończą się wszystkie przepisy przejściowe i wszyscy, którzy odkładali temat, będą szukać tego samego w tym samym tygodniu.",
        },
      ]}
      formId="ksef"
      formHeading="Napiszcie, w czym dziś wystawiacie faktury"
      formIntro="Wystarczy nazwa programu księgowego albo systemu sprzedażowego i jedno zdanie o tym, ile faktur miesięcznie z niego wychodzi. Odpiszę, czy integracja ma sens, czy wystarczy Wam gotowy program."
      submitLabel="Wyślij opis"
      microCopy="Ustalenia prowadzę mailowo. Telefon, jeśli tak Wam wygodniej."
      serviceName="Integracja z KSeF"
      serviceDesc="Spięcie systemu sprzedażowego, ERP albo programu księgowego z Krajowym Systemem e-Faktur: wysyłka faktur w schemacie FA(3) przez API v2, zapis numeru KSeF i UPO, pobieranie faktur kosztowych."
      serviceType="Integracja systemów informatycznych"
    />
  );
}
