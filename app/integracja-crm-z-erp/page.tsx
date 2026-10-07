import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Integracja CRM z ERP bez rozjazdu danych | Fluxlab",
  description:
    "Spinamy CRM z systemem magazynowo-księgowym: kontrahenci, oferty, zamówienia, faktury i stany. Opisujemy cztery decyzje, które o tym przesądzają.",
  alternates: { canonical: "/integracja-crm-z-erp" },
  openGraph: {
    title: "Integracja CRM z ERP bez rozjazdu danych | Fluxlab",
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
      lead="Handlowcy pracują w CRM, księgowość i magazyn w ERP, a pomiędzy nimi ktoś przepisuje dane. Spinamy oba systemy tak, żeby dane szły same, a rozjazd był widoczny od razu."
      ctaLabel="Opisz swoje dwa systemy"
      ctaNote="Odpisujemy zwykle tego samego dnia"
      powiazane={[
        {
          przed: "Połączenie CRM z ERP to zwykle pierwszy krok szerszej",
          kotwica: "automatyzacji procesów biznesowych w firmie",
          href: "/automatyzacja-procesow-biznesowych",
          po: ".",
        },
      ]}
      checks={[
        {
          title: "Źródło prawdy",
          desc: "Dla każdego rodzaju danych jeden system rozstrzyga spór. Kontrahent zwykle należy do ERP, szansa sprzedaży do CRM.",
        },
        {
          title: "Dopasowanie kontrahenta",
          desc: "Po NIP, nie po nazwie. Przed startem dostajecie listę rekordów, które nie dopasowały się automatycznie.",
        },
        {
          title: "Moment wysłania dokumentu",
          desc: "Zwykle przy wygranej szansie, a przy zamówieniach częściowych dopiero po potwierdzeniu dostępności.",
        },
        {
          title: "Obsługa błędów",
          desc: "Nieudane operacje trafiają do kolejki i są ponawiane. Jeśli dalej nie przechodzą, dostajecie jedno zbiorcze powiadomienie.",
        },
        {
          title: "Stany i ceny w drugą stronę",
          desc: "Handlowiec widzi w CRM aktualną cenę i dostępność. Wystarcza odświeżanie co kilkanaście minut.",
        },
        {
          title: "Czego nie zrobimy",
          desc: "Integracji, w której obie strony edytują te same pola, a nikt nie rozstrzyga, kto ma rację. Mówimy to na początku.",
        },
      ]}
      pricing={[
        {
          name: "Rozpoznanie",
          price: "0 zł",
          desc: "Zanim cokolwiek zlecisz.",
          features: [
            "Czy ERP ma interfejs, czy trzeba przez pliki",
            "Lista kontrahentów, którzy nie dopasują się sami",
            "Czy integracja ma sens",
          ],
        },
        {
          name: "Jeden kierunek",
          price: "2 900 zł",
          desc: "Najczęstszy start: z CRM do ERP.",
          features: [
            "Kontrahent i dokument sprzedaży z CRM do ERP",
            "Dopasowanie po NIP, z listą wyjątków",
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
          q: "Z jakimi systemami to robicie?",
          a: "Od strony CRM najczęściej Pipedrive i HubSpot. Od strony ERP liczy się, czy system ma interfejs, czy tylko import i eksport plików. Przy plikach synchronizacja działa cyklicznie.",
        },
        {
          q: "Ile to trwa?",
          a: "Wariant jednokierunkowy zwykle dwa do trzech tygodni od otrzymania dostępów testowych do obu systemów.",
        },
        {
          q: "Czy dane wychodzą poza naszą firmę?",
          a: "Nie muszą. Integrację można postawić na Waszym serwerze.",
        },
        {
          q: "Co zostaje po zakończeniu?",
          a: "Kod, dostępy i dokumentacja po Waszej stronie. Bez abonamentu, opieka jest dobrowolna.",
        },
      ]}
      formId="integracja_erp"
      formHeading="Napisz, co masz po obu stronach"
      formIntro="Podaj nazwę CRM, systemu ERP i napisz, co dziś ktoś przepisuje ręcznie. Odpiszemy, czy da się to spiąć i za ile."
      submitLabel="Wyślij opis"
      microCopy="Bez rozmowy telefonicznej, jeśli nie chcesz. Ustalenia prowadzimy mailowo."
      serviceName="Integracja CRM z ERP"
      serviceDesc="Spięcie systemu CRM z systemem magazynowo-księgowym: kontrahenci, dokumenty sprzedaży, stany magazynowe i ceny, z obsługą błędów i ponowień."
      serviceType="Integracja systemów informatycznych"
    />
  );
}
