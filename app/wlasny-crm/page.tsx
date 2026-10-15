import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Własny CRM dla firmy w trzy tygodnie | Fluxlab",
  description:
    "FluxCRM: lead z formularza, telefonu i poczty trafia sam do opiekuna. Aplikacja na komputer i telefon, serwer w UE. 12 900 zł wdrożenia i 1 190 zł miesięcznie.",
  alternates: { canonical: "/wlasny-crm" },
  openGraph: {
    title: "Własny CRM dla firmy w trzy tygodnie | Fluxlab",
    description:
      "Lead z każdego źródła trafia sam do opiekuna z zadaniem na 15 minut. Uruchomienie w trzy tygodnie, dane zawsze Wasze.",
    locale: "pl_PL",
    type: "website",
  },
};

export default function WlasnyCrm() {
  return (
    <ProductLanding
      slug="wlasny-crm"
      typ="usluga"
      breadcrumb="Własny CRM"
      eyebrow="FluxCRM"
      h1="Własny CRM dla Waszej firmy"
      lead="Lead z formularza, telefonu i poczty trafia sam do opiekuna, z zadaniem „zadzwoń w 15 minut”. Aplikacja na komputerze i telefonie każdego handlowca, uruchomienie w trzy tygodnie."
      ctaLabel="Zapytajcie o wdrożenie"
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
          title: "System i dane są Wasze",
          desc: "Osobna instancja na serwerze w UE, kopie i aktualizacje w abonamencie. Eksport danych w każdej chwili, wypowiedzenie miesięczne.",
        },
        {
          title: "Kiedy to się nie opłaca",
          desc: "Przy kilku leadach miesięcznie wystarczy gotowy Pipedrive. Taki też wdrażamy.",
        },
      ]}
      pricing={[
        {
          name: "Wdrożenie",
          price: "12 900 zł",
          desc: "Uruchomienie w trzy tygodnie od akceptacji zakresu.",
          features: [
            "Lejek pod Waszą branżę",
            "Import leadów z arkusza i szkolenie zespołu",
            "30 dni wsparcia po starcie",
          ],
          featured: true,
        },
        {
          name: "Abonament",
          price: "1 190 zł / mies.",
          desc: "Serwer, opieka i rozwój.",
          features: [
            "Serwer w UE, kopie i aktualizacje",
            "3 godziny rozwoju miesięcznie",
            "Wypowiedzenie z miesięcznym okresem",
          ],
        },
      ]}
      faq={[
        {
          q: "Ile kosztuje własny CRM?",
          a: "12 900 zł netto za wdrożenie i 1 190 zł netto miesięcznie. W abonamencie są serwer, kopie, aktualizacje i 3 godziny rozwoju w miesiącu.",
        },
        {
          q: "Czym to się różni od Pipedrive?",
          a: "Pipedrive to gotowe narzędzie z licencją za każdą osobę. Własny CRM ma lejek ułożony pod Waszą branżę, kilka wniosków w jednej sprawie i rozliczenie prowizji.",
        },
        {
          q: "Co się stanie, gdy zrezygnujemy?",
          a: "Okres wypowiedzenia jest miesięczny. Dane i ich eksport zostają u Was.",
        },
      ]}
      formId="wlasny_crm"
      formHeading="Napiszcie, skąd dziś przychodzą Wasze leady"
      formIntro="Formularz, telefon, poczta, polecenia. Odpiszemy z zakresem i ceną."
      submitLabel="Wyślijcie opis"
      microCopy="Ustalenia prowadzimy mailowo."
      serviceName="Własny CRM (FluxCRM)"
      serviceDesc="Wdrożenie własnego systemu CRM na osobnym serwerze w UE: przydział leadów z formularza, telefonu i poczty, karta klienta z historią rozmów i dokumentów, aplikacja na komputer i telefon."
      serviceType="Wdrożenie systemu CRM"
    />
  );
}
