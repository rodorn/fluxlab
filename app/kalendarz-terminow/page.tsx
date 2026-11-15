import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import KalendarzTerminow from "@/components/KalendarzTerminow";

export const metadata: Metadata = {
  title: "Kalendarz terminów podatkowych i ZUS za darmo | Fluxlab",
  description:
    "Odpowiedz na pięć pytań o firmę i zasubskrybuj kalendarz z terminami PIT, CIT, VAT i ZUS z przypomnieniami. Odświeża się sam, bez rejestracji.",
  alternates: { canonical: "/kalendarz-terminow" },
  openGraph: {
    title: "Kalendarz terminów podatkowych i ZUS za darmo | Fluxlab",
    description:
      "Terminy PIT, CIT, VAT i ZUS dopasowane do formy Twojej firmy, w Google Kalendarzu, Apple i Outlooku. Bez rejestracji.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, kalendarz terminów podatkowych i ZUS",
      },
    ],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="kalendarz-terminow"
      tool={<KalendarzTerminow />}
      breadcrumb="Kalendarz terminów"
      eyebrow="Terminy podatkowe i ZUS"
      h1="Terminy podatkowe i ZUS w Twoim kalendarzu, bez pilnowania"
      lead="Wybierasz formę opodatkowania, rodzaj rozliczenia VAT i to, czy zatrudniasz ludzi. Dostajesz kalendarz z terminami zaliczek, JPK, składek i zeznań rocznych, z przypomnieniem dwa dni wcześniej i rano w dniu terminu. Termin wypadający w weekend albo święto jest już przesunięty na dzień roboczy."
      ctaLabel="Złóż swój kalendarz"
      ctaNote="Za darmo, bez rejestracji i bez maila"
      checks={[
        {
          title: "Dopasowany do Twojej firmy",
          desc: "Jednoosobowa firma na skali, liniowym albo ryczałcie ma inne terminy niż spółka z o.o. Płatnik VAT miesięczny inne niż kwartalny. Kalendarz zawiera tylko to, co dotyczy Ciebie.",
        },
        {
          title: "Weekendy i święta policzone",
          desc: "Gdy 20. albo 25. dzień miesiąca wypada w sobotę, niedzielę lub święto, termin przechodzi na pierwszy dzień roboczy. Widzisz oba dni: ustawowy i ten, do którego faktycznie masz zdążyć.",
        },
        {
          title: "Przypomnienia w telefonie",
          desc: "Każdy termin ma dwa alarmy: dwa dni wcześniej o 9:00 i w dniu terminu o 8:00. Działa w Google Kalendarzu, na iPhonie i w Outlooku.",
        },
        {
          title: "Odświeża się sam",
          desc: "Kalendarz to subskrypcja, nie jednorazowy plik. Zawsze obejmuje bieżący i następny rok, więc nie trzeba go ponawiać po Nowym Roku.",
        },
      ]}
      powiazane={[
        {
          przed: "Faktury wystawiane w KSeF też mają swoje daty. Sprawdź",
          kotwica: "od kiedy Twoja firma musi je wystawiać",
          href: "/ksef-2027",
          po: ".",
        },
      ]}
      pricing={[
        {
          name: "Kalendarz terminów",
          price: "0 zł",
          desc: "Dla jednej firmy, na zawsze.",
          features: [
            "PIT, CIT, ryczałt, VAT, JPK, VAT-UE i ZUS",
            "PIT-4R i PIT-11, jeśli zatrudniasz",
            "przesunięcia przez weekendy i święta",
            "przypomnienia dwa dni przed i w dniu terminu",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Skąd te terminy?",
          a: "Z ustaw o podatkach dochodowych, o VAT i o systemie ubezpieczeń społecznych: zaliczki do 20. dnia następnego miesiąca, VAT i JPK do 25., składki ZUS do 20. dla jednoosobowych firm i do 15. dla spółek z osobowością prawną. Rok podatkowy przyjmujemy kalendarzowy.",
        },
        {
          q: "Czy to zastępuje księgową?",
          a: "Nie. To przypominajka z terminami ogólnymi. Zwolnienia, ulgi i indywidualne ustalenia mogą zmienić Twoją sytuację, dlatego w razie wątpliwości zapytaj swoje biuro rachunkowe.",
        },
        {
          q: "Co jeśli zmienię formę opodatkowania?",
          a: "Złóż kalendarz od nowa z nowymi odpowiedziami i zastąp nim stary. Sam link pozostaje taki sam dla tych samych odpowiedzi.",
        },
        {
          q: "Czy muszę podawać maila?",
          a: "Nie. Link do kalendarza powstaje od razu na tej stronie. Nie zapisujemy Twoich odpowiedzi ani nie wiemy, kto subskrybuje.",
        },
        {
          q: "Czy kalendarz uwzględnia estoński CIT albo rok obrotowy inny niż kalendarzowy?",
          a: "Jeszcze nie. Terminy są przygotowane dla firm z rokiem kalendarzowym i opodatkowaniem na ogólnych zasadach.",
        },
      ]}
      formId="order_kalendarz_terminow"
      formHeading="Chcesz też automatyczne faktury z KSeF?"
      formIntro="Napisz, jakiego programu do faktur używasz. Zaproponujemy, jak podłączyć KSeF, żeby faktury kosztowe same trafiały do księgowości."
      submitLabel="Wyślij zapytanie"
      microCopy="Kalendarz zostaje darmowy niezależnie od tego, czy odpiszesz."
      serviceName="Kalendarz terminów podatkowych i ZUS"
      serviceDesc="Darmowy kalendarz z terminami PIT, CIT, VAT i ZUS dopasowanymi do formy firmy, z przypomnieniami i przesunięciami przez weekendy i święta."
      serviceType="Kalendarz terminów podatkowych"
    />
  );
}
