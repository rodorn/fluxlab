import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import KalkulatorLeadow from "@/components/KalkulatorLeadow";

export const metadata: Metadata = {
  title: "Własny CRM dla firmy w trzy tygodnie | Fluxlab",
  description:
    "Własny CRM: lead z formularza, telefonu i poczty sam trafia do handlowca. Pilotaż: wdrożenie za 1 zł, abonament 499 zł miesięcznie do 3 osób.",
  alternates: { canonical: "/wlasny-crm" },
  openGraph: {
    title: "Własny CRM dla firmy w trzy tygodnie | Fluxlab",
    description:
      "Lead z każdego źródła trafia sam do opiekuna z zadaniem na 15 minut. Uruchomienie w trzy tygodnie, dane zawsze Twoje.",
    locale: "pl_PL",
    type: "website",
  },
};

export default function WlasnyCrm() {
  return (
    <ProductLanding
      slug="wlasny-crm"
      typ="usluga"
      tool={<KalkulatorLeadow />}
      cena="Wdrożenie od 1 zł w pilotażu, abonament 499 zł miesięcznie, ceny netto"
      breadcrumb="Własny CRM"
      eyebrow="FluxCRM"
      h1="Własny CRM dla Twojej firmy"
      lead="Lead z formularza, telefonu i poczty trafia sam do opiekuna, z zadaniem „zadzwoń w 15 minut”. Aplikacja na komputerze i telefonie każdego handlowca, uruchomienie w trzy tygodnie."
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
          desc: "Osobna instancja na serwerze w UE, kopie i aktualizacje w abonamencie. Eksport danych w każdej chwili, wypowiedzenie miesięczne.",
        },
        {
          title: "Kiedy to się nie opłaca",
          desc: "Przy kilku leadach miesięcznie wystarczy gotowy Pipedrive. Taki też wdrażamy.",
        },
      ]}
      pricing={[
        {
          name: "Startup",
          oldPrice: "1 900 zł",
          price: "1 zł",
          badge: "Pilotaż, ograniczona liczba miejsc",
          monthly: "499 zł / mies.",
          desc: "Do 3 osób, pilotaż. Rozwiązania wypracowujemy razem z Tobą.",
          features: [
            "Gotowy lejek, leady z formularza i poczty",
            "Aplikacja na komputer i telefon",
            "Import kontaktów z arkusza",
          ],
        },
        {
          name: "Większa firma",
          price: "12 900 zł",
          monthly: "499 zł / mies.",
          desc: "Większy zespół, oddziały. Abonament obejmuje 3 konta, każde kolejne 99 zł miesięcznie.",
          features: [
            "Dowolne integracje i automatyzacje, jakich potrzebujesz",
            "Lejek pod Twoją branżę, także leady z telefonu",
            "Przydział opiekuna i eskalacja po 30 minutach",
            "Szkolenie zespołu",
          ],
          featured: true,
        },
        {
          name: "CRM z narzędziami AI",
          price: "24 900 zł",
          monthly: "499 zł / mies.",
          desc: "Wszystko z pakietu za 12 900 zł plus narzędzia AI. Abonament obejmuje 3 konta, każde kolejne 99 zł miesięcznie.",
          features: [
            "Dowolne narzędzia AI do tekstu i nagrań, jakich potrzebujesz",
            "Na przykład streszczenia i ocena rozmów, analiza dokumentów",
            "Dowolne integracje i automatyzacje",
          ],
        },
      ]}
      faq={[
        {
          q: "Ile kosztuje własny CRM?",
          a: "Abonament to 499 zł miesięcznie za 3 konta i 99 zł za każde kolejne. Wdrożenie zależy od wielkości firmy: do 3 osób w pilotażu 1 zł zamiast 1 900 zł (liczba miejsc ograniczona), większy zespół 12 900 zł z dowolnymi integracjami i automatyzacjami, a 24 900 zł dodatkowo z dowolnymi narzędziami AI do tekstu i nagrań. Ceny netto. W abonamencie są serwer w UE, kopie i aktualizacje.",
        },
        {
          q: "Czym to się różni od Pipedrive?",
          a: "Pipedrive to gotowe narzędzie z licencją za każdą osobę, takie samo dla wszystkich. Własny CRM ma lejek ułożony pod Twoją branżę, kilka wniosków w jednej sprawie i rozliczenie prowizji.",
        },
        {
          q: "Co się stanie, gdy zrezygnujemy?",
          a: "Okres wypowiedzenia jest miesięczny. Dane i ich eksport zostają u ciebie.",
        },
      ]}
      formId="wlasny_crm"
      formHeading="Napisz, skąd dziś przychodzą Twoje leady"
      formIntro="Formularz, telefon, poczta, polecenia. Odpiszemy z zakresem i ceną."
      submitLabel="Wyślij opis"
      microCopy="Ustalenia prowadzimy mailowo."
      serviceName="Własny CRM (FluxCRM)"
      serviceDesc="Wdrożenie własnego systemu CRM na osobnym serwerze w UE: przydział leadów z formularza, telefonu i poczty, karta klienta z historią rozmów i dokumentów, aplikacja na komputer i telefon."
      serviceType="Wdrożenie systemu CRM"
    />
  );
}
