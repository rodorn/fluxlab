import ArtykulWideo, { metadaneArtykuluWideo } from "@/components/ArtykulWideo";
import d from "@/lib/wiedza-wideo/ksef-2027-w-malej-firmie.json";

export async function generateMetadata() {
  return metadaneArtykuluWideo(d);
}

export default function Page() {
  return <ArtykulWideo
      d={d}
      formularz={{ formId: "ksef27", naglowek: "Integracja KSeF od 1 900 zł netto. Zostaw kontakt, odpiszemy z ceną w godzinę", opis: "Jaki program do faktur masz? *", przycisk: "Wyślij, wycena integracji KSeF" }}
      ramka={{
        tytul: "Masz już system do faktur?",
        tekst: "Podepniemy go pod KSeF. Cena w 1 dzień.",
        href: "/ksef-integracja",
      }}
    />;
}
