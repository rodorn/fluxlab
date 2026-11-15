import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import KursyNbp from "@/components/KursyNbp";

export const metadata: Metadata = {
  title: "Kursy NBP do faktur walutowych w arkuszu za darmo | Fluxlab",
  description:
    "Kurs średni NBP z dnia poprzedzającego fakturę: sprawdź go od ręki albo wklej wzór do Google Arkuszy, a kursy będą się dopisywać same. Bez rejestracji.",
  alternates: { canonical: "/kursy-nbp" },
  openGraph: {
    title: "Kursy NBP do faktur walutowych w arkuszu za darmo | Fluxlab",
    description:
    "Kurs średni NBP z dnia poprzedzającego fakturę: sprawdź go od ręki albo wklej wzór do Google Arkuszy, a kursy będą się dopisywać same. Bez rejestracji.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, kursy NBP do faktur walutowych",
      },
    ],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="kursy-nbp"
      tool={<KursyNbp />}
      breadcrumb="Kursy NBP"
      eyebrow="Faktury walutowe"
      h1="Kurs NBP do faktury walutowej, sam w Twoim arkuszu"
      lead="Wybierasz walutę i dzień faktury, a dostajesz kurs średni NBP z ostatniego dnia roboczego przed nim, razem z numerem tabeli. Jeden wzór w Google Arkuszach zapełnia kartę kursami na cały rok i dopisuje nowe sam, więc przy fakturze nie trzeba już zaglądać na stronę NBP."
      ctaLabel="Sprawdź kurs"
      ctaNote="Za darmo, bez rejestracji i bez maila"
      checks={[
        {
          title: "Kurs z dnia poprzedzającego",
          desc: "Przy przeliczaniu przychodów i kosztów wyrażonych we frankach, euro czy dolarach stosuje się kurs średni NBP z ostatniego dnia roboczego poprzedzającego dzień uzyskania przychodu, poniesienia kosztu albo wystawienia faktury. Liczymy go za Ciebie, także po weekendach i świętach.",
        },
        {
          title: "Numer tabeli do dokumentu",
          desc: "Przy kursie widzisz datę i numer tabeli NBP, więc do księgowania i do kontroli masz komplet danych, a nie samą liczbę.",
        },
        {
          title: "Arkusz uzupełnia się sam",
          desc: "Jeden wzór pobiera kursy dla każdego dnia roku. Dochodzą nowe dni, a Ty tylko wyszukujesz kurs po dacie faktury.",
        },
        {
          title: "Dane prosto z NBP",
          desc: "Źródłem jest oficjalne API Narodowego Banku Polskiego, tabela A kursów średnich walut obcych. Nic nie przechowujemy.",
        },
      ]}
      powiazane={[
        {
          przed: "Faktury walutowe też trafiają do KSeF. Sprawdź, ",
          kotwica: "czy Twoja firma jest na to gotowa",
          href: "/ksef-2027",
          po: ".",
        },
      ]}
      pricing={[
        {
          name: "Kursy NBP",
          price: "0 zł",
          desc: "Dla każdej firmy, bez limitu zapytań.",
          features: [
            "wszystkie waluty z tabeli A NBP",
            "kurs z dnia poprzedzającego z numerem tabeli",
            "wzór do Google Arkuszy i adres dla Excela",
            "kursy od 2002 roku",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Który kurs jest właściwy do faktury w walucie?",
          a: "Dla VAT oraz przychodów i kosztów w podatkach dochodowych zwykle kurs średni NBP z ostatniego dnia roboczego poprzedzającego dzień wystawienia faktury albo powstania przychodu lub kosztu. Dla VAT można wybrać też kurs z dnia poprzedzającego dzień powstania obowiązku podatkowego. W razie wątpliwości zapytaj swoje biuro rachunkowe.",
        },
        {
          q: "Jak wzór działa w arkuszu?",
          a: "Funkcja IMPORTDATA pobiera tabelę kursów z naszego adresu i odświeża ją co jakiś czas. Przy fakturze używasz zwykłego wyszukiwania po dacie, więc nic nie trzeba przepisywać.",
        },
        {
          q: "Czy działa to w Excelu?",
          a: "Tak, przez pobranie danych z sieci Web: wklejasz ten sam adres, a Excel wczytuje tabelę. Odświeżasz ją przyciskiem Odśwież wszystko.",
        },
        {
          q: "Skąd są kursy i czy są aktualne?",
          a: "Z API Narodowego Banku Polskiego, tabela A. Nowy kurs pojawia się po jego publikacji przez NBP w dni robocze.",
        },
        {
          q: "Czy muszę podawać maila?",
          a: "Nie. Narzędzie działa bez rejestracji, a zapytania nie są nigdzie zapisywane.",
        },
      ]}
      formId="order_kursy_nbp"
      formHeading="Faktury walutowe zabierają Ci czas?"
      formIntro="Napisz, ile faktur walutowych wystawiasz miesięcznie i w jakim programie. Zaproponujemy, jak przeliczać je automatycznie."
      submitLabel="Wyślij zapytanie"
      microCopy="Kursy zostają darmowe niezależnie od tego, czy odpiszesz."
      serviceName="Kursy NBP do faktur walutowych"
      serviceDesc="Darmowe narzędzie: kurs średni NBP z dnia poprzedzającego fakturę, wzór do Google Arkuszy i adres dla Excela."
      serviceType="Kursy walut NBP"
    />
  );
}
