import type { Metadata } from "next";
import Link from "next/link";
import ProductLanding from "@/components/ProductLanding";
import KalkulatorLeadow from "@/components/KalkulatorLeadow";
import KonfiguratorCrm from "@/components/KonfiguratorCrm";
import PodgladCrm from "@/components/PodgladCrm";

export const metadata: Metadata = {
  title: "Własny CRM dla firmy, pierwsza wersja w 3 tygodnie | Fluxlab",
  description:
    "Własny CRM: lead z formularza, telefonu i poczty sam trafia do handlowca. Wdrożenie 1 zł, abonament od 499 zł miesięcznie za 3 osoby.",
  alternates: { canonical: "/wlasny-crm" },
  openGraph: {
    title: "Własny CRM dla firmy, pierwsza wersja w 3 tygodnie | Fluxlab",
    description:
      "Lead z każdego źródła trafia sam do opiekuna z zadaniem na 15 minut. Pierwsza wersja w 3 tygodnie, pełne wdrożenie 4⁠–⁠8 tygodni, dane zawsze Twoje.",
    locale: "pl_PL",
    type: "website",
    images: ["/og?t=W%C5%82asny%20CRM%20dla%20firmy%2C%20pierwsza%20wersja%20w%203%20tygodnie%20%7C%20Fluxlab"],
  },
};

export default function WlasnyCrm() {
  return (
    <ProductLanding
      slug="wlasny-crm"
      typ="usluga"
      tool={
        <>
          <KalkulatorLeadow />
          <KonfiguratorCrm />
          <div className="mt-16">
            <PodgladCrm />
          </div>
        </>
      }
      cena="Wdrożenie 1 zł, abonament od 499 zł miesięcznie, ceny netto"
      breadcrumb="Własny CRM"
      eyebrow="FluxCRM"
      h1="Własny CRM dla Twojej firmy"
      lead="Lead z formularza, telefonu i poczty trafia sam do opiekuna, z zadaniem „zadzwoń w 15 minut”. Aplikacja na komputerze i telefonie każdego handlowca. Pierwsza działająca wersja w 3 tygodnie, pełne wdrożenie w 4⁠–⁠8 tygodni."
      podLeadem={
        <>
          Pośrednik kredytowy?{" "}
          <Link href="/crm-dla-posrednikow-kredytowych" className="font-semibold text-accent hover:underline">
            Umów 30 minut demo FluxCRM
          </Link>
        </>
      }
      ctaLabel="Policz, ile kosztują cię gubione leady"
      checks={[
        {
          title: "Żaden lead nie ginie",
          desc: "Każde zgłoszenie dostaje źródło i opiekuna. Gdy nikt nie odezwie się w 30 minut, sprawa idzie do kierownika.",
        },
        {
          title: "Cała historia w jednej karcie",
          desc: "Rozmowy, SMS, maile i dokumenty klienta w jednym miejscu, także kilka wniosków w jednej sprawie.",
        },
        {
          title: "System i dane są Twoje",
          desc: "Osobna instancja na serwerze w UE, kopie i aktualizacje w abonamencie. Eksport danych w każdej chwili, rezygnacja w dowolnym dniu.",
        },
        {
          title: "Otwarte API i konfiguracja bez kodu",
          desc: "Publiczna dokumentacja REST API (OpenAPI), webhooki na każde ważne zdarzenie, z podpisem HMAC i dziennikiem dostaw, połączenie z Zapier, Make i n8n. Własne pola, etapy, role i reguły ustawiasz w panelu, a dane eksportujesz do JSON albo CSV.",
        },
        {
          title: "Procedura oceny rozmowy",
          desc: "Ustawiasz kroki rozmowy (nazwa, waga, frazy kluczowe, do 30 kroków), a system sprawdza w transkrypcji, czy doradca je spełnił. Potwierdzenie przez AI z cytatem jest opcjonalne i domyślnie wyłączone, włączasz je sam.",
        },
        {
          title: "Oferta zaakceptowana podpisem online",
          desc: "Klient otwiera ofertę z linku bez logowania i akceptuje ją podpisem narysowanym palcem. Szansa przechodzi na etap „umowa”, a CRM tworzy szkic umowy z kwotą z oferty. Nic nie wychodzi do klienta bez akceptacji człowieka.",
        },
        {
          title: "Kiedy to się nie opłaca",
          desc: "Przy kilku leadach miesięcznie wystarczy gotowy Pipedrive. Taki też wdrażamy.",
        },
      ]}
      pricing={[
        {
          name: "Gotowy CRM",
          price: "499 zł / mies.",
          href: "#kup-pilotaz",
          cta: "Kup online",
          desc: "Wdrożenie 1 zł. Abonament obejmuje 3 konta, każde kolejne 99 zł miesięcznie.",
          features: [
            "Gotowy lejek, leady z formularza i poczty",
            "Aplikacja na komputer i telefon",
            "Import kontaktów z arkusza",
          ],
        },
        {
          name: "Z integracjami",
          price: "1 490 zł / mies.",
          href: "#kup-integracje",
          cta: "Kup online",
          desc: "Wdrożenie 1 zł. Integracje i automatyzacje dokładamy co miesiąc w abonamencie. 3 konta, każde kolejne 99 zł.",
          features: [
            "Dowolne integracje i automatyzacje, jakich potrzebujesz",
            "Lejek pod Twoją branżę, także leady z telefonu",
            "Przydział opiekuna i eskalacja po 30 minutach",
            "Szkolenie zespołu",
          ],
          featured: true,
        },
        {
          name: "Moduły AI",
          price: "od 99 zł / mies.",
          desc: "Dokładasz do dowolnego wariantu i wyłączasz w każdej chwili.",
          features: [
            "Ocena handlowców przez AI z notatek, SMS-ów, maili i rozmów: 199 zł/mies.",
            "Szkice maili i SMS-ów dopasowane do sytuacji klienta: 99 zł/mies.",
          ],
        },
      ]}
      faq={[
        {
          q: "Ile kosztuje własny CRM?",
          a: "Wdrożenie 1 zł, płacisz tylko abonament za 3 konta i 99 zł za każde kolejne: gotowy CRM 499 zł miesięcznie, z dowolnymi integracjami i automatyzacjami 1 490 zł, do każdego wariantu możesz dołożyć moduły AI: ocenę handlowców za 199 zł i szkice maili i SMS-ów za 99 zł miesięcznie. Ceny netto. W abonamencie są serwer w UE, kopie, aktualizacje i rozwój.",
        },
        {
          q: "Czym to się różni od Pipedrive?",
          a: "Pipedrive to gotowe narzędzie z licencją za każdą osobę, takie samo dla wszystkich. Własny CRM ma lejek ułożony pod Twoją branżę, kilka wniosków w jednej sprawie i rozliczenie prowizji.",
        },
        {
          q: "Co się stanie, gdy zrezygnujemy?",
          a: "Rezygnujesz w dowolnym dniu i płacisz tylko za dni korzystania. Dane i ich eksport zostają u ciebie.",
        },
      ]}
      formId="wlasny_crm"
      formHeading="Napisz, skąd dziś przychodzą Twoje leady"
      formIntro="Formularz, telefon, poczta, polecenia. Odpiszemy z zakresem i ceną."
      submitLabel="Wyślij opis i sprawdź cenę"
      microCopy="Ustalenia prowadzimy mailowo."
      serviceName="Własny CRM (FluxCRM)"
      serviceDesc="Własny system CRM w abonamencie, bez opłaty za wdrożenie, na osobnym serwerze w UE: przydział leadów z formularza, telefonu i poczty, karta klienta z historią rozmów i dokumentów, aplikacja na komputer i telefon."
      serviceType="Wdrożenie systemu CRM"
    />
  );
}
