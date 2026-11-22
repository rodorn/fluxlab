import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import { PodgladRaportu } from "@/components/RaportKontrahenta";

export const metadata: Metadata = {
  title: "Raport o kontrahencie w PDF, 19 zł | Fluxlab",
  description:
    "Wpisujesz NIP, a w kilka minut dostajesz mailem PDF: status VAT, rachunki z białej listy, odpis z KRS i ogłoszenia w MSiG. 19 zł netto.",
  alternates: { canonical: "/raport-kontrahenta" },
  openGraph: {
    title: "Raport o kontrahencie w PDF, 19 zł | Fluxlab",
    description: "Status VAT, rachunki, KRS i Monitor Sądowy i Gospodarczy w jednym PDF.",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, raport o kontrahencie w PDF" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="raport-kontrahenta"
      tool={<PodgladRaportu />}
      typ="usluga"
      breadcrumb="Raport kontrahenta"
      h1="Sprawdź nowego kontrahenta, zanim podpiszesz umowę albo zapłacisz"
      lead="Podajesz NIP, a my zbieramy dane z trzech rejestrów publicznych w jeden PDF: wykaz podatników VAT, Krajowy Rejestr Sądowy i Monitor Sądowy i Gospodarczy. Raport przychodzi mailem."
      ctaLabel="Zamów raport"
      ctaNote="19 zł netto jednorazowo, płatność kartą"
      checks={[
        {
          title: "Status VAT i rachunki",
          desc: "Czy firma jest czynnym podatnikiem i jakie rachunki ma na białej liście. Całą listę rachunków dostajesz w PDF.",
        },
        {
          title: "Odpis z KRS",
          desc: "Forma prawna, adres, kapitał zakładowy, sposób reprezentacji i adres do e-Doręczeń, jeśli firma go wpisała.",
        },
        {
          title: "Ogłoszenia w MSiG",
          desc: "Ogłoszenia o spółce z ostatnich 5 lat z datą i numerem Monitora. Na górze raportu jest krótkie podsumowanie, na co zwrócić uwagę.",
        },
      ]}
      pricing={[
        {
          name: "Raport kontrahenta",
          price: "19 zł",
          kup: "raport-kontrahenta",
          desc: "Netto, jednorazowo. Jeden NIP, jeden raport w PDF.",
          features: [
            "wykaz VAT, KRS i MSiG w jednym pliku",
            "podsumowanie z oznaczeniem rzeczy do sprawdzenia",
            "PDF na Twój adres e-mail, zwykle w ciągu kilku minut",
            "zwrot pieniędzy, gdy NIP jest błędny albo firmy nie ma w wykazie",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Co dokładnie dostaniesz?",
          a: "Plik PDF z podsumowaniem, danymi z wykazu podatników VAT, odpisem z KRS (dla spółek i innych podmiotów wpisanych do KRS) oraz listą ogłoszeń w Monitorze Sądowym i Gospodarczym.",
        },
        {
          q: "Czy raport pokazuje członków zarządu?",
          a: "Nie. Podajemy tylko liczbę osób w organie i sposób reprezentacji. Danych osób fizycznych nie umieszczamy w raporcie.",
        },
        {
          q: "A jeśli firma nie jest w KRS?",
          a: "Jednoosobowa działalność nie ma wpisu w KRS. Raport zawiera wtedy dane z wykazu VAT, a części o KRS i MSiG nie ma.",
        },
        {
          q: "Czy raport obejmuje upadłość?",
          a: "Nie. Od 2021 roku postanowienia o upadłości są publikowane w Krajowym Rejestrze Zadłużonych, którego raport nie obejmuje. Piszemy o tym w samym PDF.",
        },
        {
          q: "Co jeśli wpiszę zły NIP?",
          a: "Gdy NIP jest błędny albo firmy nie ma w wykazie podatników VAT, zwracamy całą kwotę i dostajesz o tym maila.",
        },
        {
          q: "Czy raport jest opinią o wiarygodności firmy?",
          a: "Nie. To zestawienie danych z rejestrów publicznych z dnia raportu, bez oceny uczciwości kontrahenta.",
        },
      ]}
      formId="order_raport_kontrahenta"
      formHeading="Potrzebujesz raportów o wielu firmach?"
      formIntro="Napisz, ile kontrahentów sprawdzasz miesięcznie. Odpiszemy z propozycją."
      submitLabel="Wyślij zapytanie"
      microCopy="Odpisujemy w godzinę, oddzwaniamy w 2 godziny."
      serviceName="Raport o kontrahencie w PDF"
      serviceDesc="Raport z wykazu VAT, KRS i MSiG w pliku PDF wysyłanym mailem, za 19 zł netto."
      serviceType="Weryfikacja kontrahenta"
    />
  );
}
