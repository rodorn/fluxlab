import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Integracja CRM z ERP: wdrożenie w Polsce | Fluxlab",
  description:
    "Kto wdraża integrację CRM z ERP w Polsce? My: spinamy oba systemy, żeby kontrahenci, zamówienia i faktury się zgadzały. Kierunek trwa 2-3 tygodnie.",
  alternates: { canonical: "/integracja-crm-z-erp" },
  openGraph: {
    title: "Integracja CRM z ERP: wdrożenie w Polsce | Fluxlab",
    description:
      "Kto wdraża integrację CRM z ERP w Polsce? My: spinamy oba systemy, żeby kontrahenci, zamówienia i faktury się zgadzały. Kierunek trwa 2-3 tygodnie.",
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
      lead="Integracja CRM z ERP łączy CRM handlowców z księgowością i magazynem w ERP. Spinamy oba systemy: CRM z danymi z ERP, bez przepisywania."
      ctaLabel="Opisz swoje dwa systemy"
      ctaNote="Odpisujemy w 1 dzień roboczy"
      powiazane={[
        {
          przed: "Połączenie CRM z ERP to zwykle pierwszy krok szerszej",
          kotwica: "automatyzacji procesów biznesowych w firmie",
          href: "/automatyzacja-procesow-biznesowych",
          po: ".",
        },
        {
          przed: "Przykład branżowy:",
          kotwica: "CRM dla firm leasingowych",
          href: "/automatyzacja-crm-leasing",
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
          desc: "Po NIP, nie po nazwie. Przed startem dostajesz listę rekordów bez dopasowania.",
        },
        {
          title: "Moment wysłania dokumentu",
          desc: "Przy wygranej szansie, a przy zamówieniach częściowych po potwierdzeniu dostępności.",
        },
        {
          title: "Obsługa błędów",
          desc: "Nieudane operacje wracają do kolejki, a uporczywe błędy przychodzą w jednym powiadomieniu.",
        },
        {
          title: "Stany i ceny w drugą stronę",
          desc: "Handlowiec widzi w CRM aktualną cenę i dostępność, odświeżane co kilkanaście minut.",
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
          price: "1 900 zł",
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
          price: "3 500 zł",
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
          q: "Kto wdraża integrację CRM z ERP?",
          a: "My: rozpoznanie, wdrożenie i przekazanie kodu z dokumentacją. Jeden kierunek trwa zwykle dwa do trzech tygodni, oba kierunki do sześciu.",
        },
        {
          q: "Ile kosztuje integracja ERP z CRM?",
          a: "Rozpoznanie jest bezpłatne. Jeden kierunek, z CRM do ERP, kosztuje 1 900 zł. Synchronizacja w obie strony, ze stanami i cenami wracającymi do CRM, 3 500 zł.",
        },
        {
          q: "Czy integracja CRM z ERP opłaca się w małej firmie?",
          a: "Tak, jeśli ktoś w firmie przepisuje zamówienia, kontrahentów albo faktury między CRM a ERP choćby kilka godzin w tygodniu. Jeden kierunek za 1 900 zł zwraca się wtedy w kilka miesięcy, a znikają literówki w NIP i kwotach. Przy kilku zamówieniach w miesiącu wystarczy ręczny eksport.",
        },
        {
          q: "Jak dane z ERP trafiają do CRM?",
          a: "Ceny, stany magazynowe i status płatności pobieramy z ERP przez jego interfejs albo z eksportu plików i zapisujemy w polach CRM. Odświeżanie co kilkanaście minut, handlowiec nic nie klika.",
        },
      ]}
      formId="integracja_erp"
      formHeading="Napisz, co masz po obu stronach"
      formIntro="Podaj nazwę CRM i ERP oraz co dziś ktoś przepisuje ręcznie. Odpiszemy, czy da się to spiąć i za ile."
      submitLabel="Wyślij opis i sprawdź cenę"
      microCopy="Bez rozmowy telefonicznej, jeśli nie chcesz. Ustalenia prowadzimy mailowo."
      serviceName="Integracja CRM z ERP"
      serviceDesc="Spięcie systemu CRM z systemem magazynowo-księgowym: kontrahenci, dokumenty sprzedaży, stany magazynowe i ceny, z obsługą błędów i ponowień."
      serviceType="Integracja systemów informatycznych"
    />
  );
}
