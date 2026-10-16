import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import KalkulatorLeadow from "@/components/KalkulatorLeadow";

export const metadata: Metadata = {
  title: "Własny CRM dla firmy w trzy tygodnie | Fluxlab",
  description:
    "Własny CRM: lead z formularza, telefonu i poczty trafia sam do handlowca. Pakiety od 7 900 zł wdrożenia i 690 zł miesięcznie, zależnie od wielkości firmy.",
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
          name: "Mała firma",
          price: "7 900 zł",
          desc: "Do 3 handlowców. Abonament 690 zł miesięcznie.",
          features: [
            "Gotowy lejek, leady z formularza i poczty",
            "Aplikacja na komputer i telefon",
            "Import z arkusza, 1 godzina rozwoju w miesiącu",
          ],
        },
        {
          name: "Firma",
          price: "12 900 zł",
          desc: "Do 10 osób. Abonament 1 190 zł miesięcznie.",
          features: [
            "Lejek pod Twoją branżę, także leady z telefonu",
            "Przydział opiekuna i eskalacja po 30 minutach",
            "Szkolenie zespołu, 3 godziny rozwoju w miesiącu",
          ],
          featured: true,
        },
        {
          name: "Kilka zespołów",
          price: "od 24 900 zł",
          desc: "Oddziały albo ponad 10 osób. Abonament od 2 190 zł miesięcznie.",
          features: [
            "Role i widoki dla oddziałów i kierowników",
            "Integracja z systemem księgowym albo ERP",
            "Telefonia, SMS, umowy, 8 godzin rozwoju w miesiącu",
          ],
        },
      ]}
      faq={[
        {
          q: "Ile kosztuje własny CRM?",
          a: "Zależy od wielkości firmy: od 7 900 zł wdrożenia i 690 zł miesięcznie dla zespołu do 3 osób, 12 900 zł i 1 190 zł do 10 osób. Ceny netto. W abonamencie zawsze są serwer w UE, kopie, aktualizacje i godziny rozwoju.",
        },
        {
          q: "Czym to się różni od Pipedrive?",
          a: "Pipedrive to gotowe narzędzie z licencją za każdą osobę. Własny CRM ma lejek ułożony pod Twoją branżę, kilka wniosków w jednej sprawie i rozliczenie prowizji.",
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
