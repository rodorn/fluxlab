import ArtykulWideo, { metadaneArtykuluWideo } from "@/components/ArtykulWideo";
import d from "@/lib/wiedza-wideo/automatyzacja-obslugi-klienta.json";

export async function generateMetadata() {
  return metadaneArtykuluWideo(d);
}

export default function Page() {
  return <ArtykulWideo
      d={d}
      formularz={{ formId: "obsluga", naglowek: "Zautomatyzuj obsługę klienta. Zostaw kontakt, odpiszemy z wyceną w 1 dzień roboczy", opis: "Co chcesz zautomatyzować? Jedno zdanie *", przycisk: "Wyślij, bezpłatna wycena" }}
      ramka={{
        tytul: "Zapytania klientów giną w skrzynce?",
        tekst: "Ustawimy automatyczne potwierdzenie i przypisanie do osoby. Cena w 1 dzień.",
        href: "/automatyzacja-procesow-biznesowych",
      }}
    />;
}
