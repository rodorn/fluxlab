import ArtykulWideo, { metadaneArtykuluWideo } from "@/components/ArtykulWideo";
import d from "@/lib/wiedza-wideo/automatyzacja-obslugi-klienta.json";

export async function generateMetadata() {
  return metadaneArtykuluWideo(d);
}

export default function Page() {
  return <ArtykulWideo
      d={d}
      ramka={{
        tytul: "Zapytania klientów giną w skrzynce?",
        tekst: "Ustawimy automatyczne potwierdzenie i przypisanie do osoby. Cena w 1 dzień.",
        href: "/automatyzacja-procesow-biznesowych",
      }}
    />;
}
