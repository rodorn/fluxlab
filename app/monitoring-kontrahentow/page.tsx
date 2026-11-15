import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import { PodgladMonitoringu } from "@/components/MonitoringKontrahentow";

export const metadata: Metadata = {
  title: "Monitoring kontrahentów VAT, 29 zł/mies. | Fluxlab",
  description:
    "Podajesz do 50 NIP-ów, a my codziennie sprawdzamy status VAT i rachunki w wykazie MF. Mail tylko przy zmianie. 29 zł netto miesięcznie.",
  alternates: { canonical: "/monitoring-kontrahentow" },
  openGraph: {
    title: "Monitoring kontrahentów VAT, 29 zł/mies. | Fluxlab",
    description: "Codzienne sprawdzanie statusu VAT i rachunków do 50 kontrahentów, alert mailem przy każdej zmianie.",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, monitoring kontrahentów na białej liście VAT" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="monitoring-kontrahentow"
      tool={<PodgladMonitoringu />}
      typ="usluga"
      breadcrumb="Monitoring kontrahentów"
      h1="Dowiedz się od razu, gdy kontrahent wypadnie z białej listy VAT"
      lead="Wpisujesz NIP-y firm, z którymi pracujesz. Codziennie porównujemy je z wykazem podatników VAT Ministerstwa Finansów i piszemy do Ciebie tylko wtedy, gdy u którejś zmieni się status VAT albo lista rachunków."
      ctaLabel="Włącz monitoring"
      ctaNote="29 zł netto miesięcznie, płatność kartą, rezygnacja w dowolnym dniu"
      checks={[
        {
          title: "Status VAT każdego kontrahenta",
          desc: "Czynny, zwolniony albo niezarejestrowany. Gdy firma zniknie z wykazu albo straci status czynnego podatnika, dostajesz mail tego samego dnia.",
        },
        {
          title: "Zmiana rachunku",
          desc: "Porównujemy listę rachunków z poprzednim dniem i pokazujemy, który numer doszedł, a który zniknął. Podmiana rachunku to typowy sposób wyłudzeń.",
        },
        {
          title: "Cisza, gdy nic się nie dzieje",
          desc: "Bez codziennych raportów. Pierwszy mail dostajesz od razu po zapisaniu listy, kolejne tylko przy zmianie.",
        },
      ]}
      pricing={[
        {
          name: "Monitoring kontrahentów",
          price: "29 zł/mies.",
          kup: "monitoring-kontrahentow",
          desc: "Netto. Do 50 firm na jednej liście.",
          features: [
            "codzienne sprawdzenie w wykazie podatników VAT",
            "alert mailem przy zmianie statusu VAT albo rachunków",
            "listę zmienisz w dowolnej chwili pod tym samym linkiem",
            "rezygnacja w dowolnym dniu, płacisz za dni korzystania",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Co się dzieje po zapłacie?",
          a: "Po płatności trafiasz na stronę, na której wpisujesz NIP-y. Zaraz po zapisaniu listy dostajesz mailem pierwszy wynik, a ten sam link dostajesz też osobnym mailem.",
        },
        {
          q: "Jakie alerty wysyłacie?",
          a: "Piszemy o zmianie statusu VAT firmy (na przykład z czynnego na wykreślonego), o pojawieniu się albo zniknięciu rachunku w wykazie oraz o tym, że firmy nie ma już w wykazie.",
        },
        {
          q: "Skąd dane?",
          a: "Z wykazu podatników VAT Ministerstwa Finansów, czyli białej listy. Sprawdzamy go raz dziennie rano.",
        },
        {
          q: "Czy mogę zmienić listę firm?",
          a: "Tak. Pod linkiem z maila wpisujesz nową listę i zapisujesz. Zmiana działa od razu, a pierwszy wynik nowej listy przychodzi mailem.",
        },
        {
          q: "Jak zrezygnować?",
          a: "Subskrypcję anulujesz w mailu z potwierdzeniem płatności od Stripe. Po anulowaniu przestajemy sprawdzać Twoją listę.",
        },
      ]}
      formId="order_monitoring_kontrahentow"
      formHeading="Masz więcej niż 50 kontrahentów?"
      formIntro="Napisz, ilu kontrahentów chcesz pilnować. Odpiszemy z propozycją."
      submitLabel="Wyślij zapytanie"
      microCopy="Odpowiadamy w ciągu 1 dnia roboczego."
      serviceName="Monitoring kontrahentów na białej liście VAT"
      serviceDesc="Codzienne sprawdzanie statusu VAT i rachunków do 50 kontrahentów w wykazie podatników VAT, z alertem mailem przy zmianie, za 29 zł netto miesięcznie."
      serviceType="Monitoring kontrahentów"
    />
  );
}
