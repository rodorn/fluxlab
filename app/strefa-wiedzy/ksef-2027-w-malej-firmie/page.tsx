import ArtykulWideo, { metadaneArtykuluWideo } from "@/components/ArtykulWideo";
import d from "@/lib/wiedza-wideo/ksef-2027-w-malej-firmie.json";

export async function generateMetadata() {
  return metadaneArtykuluWideo(d);
}

export default function Page() {
  return <ArtykulWideo
      d={d}
      ramka={{
        tytul: "Masz już system do faktur?",
        tekst: "Podepniemy go pod KSeF. Cena w 1 dzień.",
        href: "/ksef-integracja",
      }}
    />;
}
