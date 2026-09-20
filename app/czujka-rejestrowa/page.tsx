import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import SpolkaCheck from "@/components/SpolkaCheck";

export const metadata: Metadata = {
  title: "Twój dłużnik może zniknąć z KRS w trzy miesiące | Fluxlab",
  description:
    "Sąd wszczyna z urzędu postępowanie o rozwiązanie spółki bez likwidacji i daje trzy miesiące na sprzeciw. Sprawdź za darmo, czy Twój kontrahent jest na takiej liście. Monitoring listy kontrahentów od 99 zł miesięcznie.",
  alternates: { canonical: "/czujka-rejestrowa" },
  openGraph: {
    title: "Twój dłużnik może zniknąć z KRS w trzy miesiące | Fluxlab",
    description:
      "Obwieszczenie w Monitorze Sądowym uruchamia trzymiesięczny termin. Sprawdź kontrahenta za darmo, bez rejestracji.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, monitoring Monitora Sądowego i Gospodarczego",
      },
    ],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="czujka-rejestrowa"
      tool={<SpolkaCheck />}
      breadcrumb="Czujka rejestrowa"
      eyebrow="Należności i kontrahenci"
      h1="Dłużnik może zniknąć z rejestru, a Ty się o tym nie dowiesz"
      lead="Sąd rejestrowy wszczyna z urzędu postępowanie o rozwiązanie spółki, która nie składa sprawozdań, i robi to bez likwidacji. Publikuje obwieszczenie w Monitorze Sądowym i Gospodarczym, od którego biegną trzy miesiące na zgłoszenie sprzeciwu. Po tym terminie podmiot znika z rejestru, a jego majątek przechodzi na Skarb Państwa. Zawiadomienia nikt do Ciebie nie wyśle."
      ctaLabel="Sprawdź kontrahenta"
      ctaNote="Sprawdzenie za darmo, od ręki"
      checks={[
        {
          title: "Czy trwa postępowanie o rozwiązanie",
          desc: "Szukam obwieszczeń o rozwiązaniu bez likwidacji i pokazuję datę publikacji razem z dniem, w którym mija termin na sprzeciw.",
        },
        {
          title: "Cała historia ogłoszeń od 2013 roku",
          desc: "Nie tylko dzisiejszy stan. Widać, co się z podmiotem działo przez lata, bo sekwencja ogłoszeń mówi więcej niż jedno z nich.",
        },
        {
          title: "Codzienne pilnowanie Twojej listy",
          desc: "Wgrywasz listę kontrahentów, a ja porównuję ją z każdym nowym wydaniem Monitora i odzywam się w dniu publikacji, nie miesiąc później.",
        },
        {
          title: "Skan wsteczny całego portfela",
          desc: "Jednorazowe sprawdzenie, czy coś już przegapiłeś. Przy setkach kontrahentów to jedyny sposób, żeby się dowiedzieć.",
        },
      ]}
      pricing={[
        {
          name: "Sprawdzenie",
          price: "0 zł",
          desc: "Jeden podmiot, od ręki.",
          features: [
            "historia ogłoszeń od 2013 roku",
            "wykrycie postępowania o rozwiązanie",
            "data, do której można zgłosić sprzeciw",
          ],
        },
        {
          name: "Skan wsteczny portfela",
          price: "od 290 zł",
          desc: "Cała lista kontrahentów, raz.",
          features: [
            "dopasowanie po numerze KRS i po nazwie",
            "lista podmiotów z wszczętym postępowaniem",
            "wskazanie terminów, które już minęły",
            "plik do wgrania do Waszego systemu",
          ],
          featured: true,
        },
        {
          name: "Codzienne pilnowanie",
          price: "od 99 zł/mc",
          desc: "Lista do 500 podmiotów.",
          features: [
            "sprawdzanie każdego nowego wydania",
            "alert mailem w dniu obwieszczenia",
            "miesięczne zestawienie zmian",
          ],
        },
      ]}
      faq={[
        {
          q: "Skąd biorą się te dane?",
          a: "Z wyszukiwarki Monitora Sądowego i Gospodarczego prowadzonej przez Ministerstwo Sprawiedliwości. To dane jawne, publikowane po to, żeby każdy mógł się z nimi zapoznać. Nie wymaga to logowania ani niczyjej zgody.",
        },
        {
          q: "Czy to znaczy, że spółka na pewno zostanie wykreślona?",
          a: "Nie. Obwieszczenie oznacza wszczęcie postępowania, a nie jego wynik. Nie wiem, jaki odsetek kończy się faktycznym wykreśleniem, i nie będę tego zgadywał. Wiem natomiast, że termin na reakcję biegnie od dnia publikacji i że po nim możliwości są znacznie mniejsze.",
        },
        {
          q: "Dlaczego dopasowanie idzie po nazwie, a nie po NIP?",
          a: "Bo w ogłoszeniach numer NIP pojawia się w około dwóch procentach przypadków, a numer KRS w dwóch trzecich. Sprawdziłem to na próbce. Dopasowanie po NIP wyglądałoby precyzyjnie, a przepuszczałoby prawie wszystko.",
        },
        {
          q: "Czy monitorujecie też upadłości?",
          a: "Nie i mówię to wprost, żeby nie było nieporozumienia. Od 2021 roku postanowienia o upadłości trafiają do Krajowego Rejestru Zadłużonych, a nie do Monitora, więc na tych danych nie da się zbudować monitoringu upadłości.",
        },
      ]}
      formId="order_czujka_rejestrowa"
      formHeading="Zamów sprawdzenie listy kontrahentów"
      formIntro="Napisz, ilu macie kontrahentów i w jakiej formie trzymacie listę. Odeślę zakres, cenę i przykładowy raport."
      submitLabel="Zamów sprawdzenie"
      microCopy="Do sprawdzenia potrzebuję wyłącznie listy nazw albo numerów KRS. Żadnych danych osobowych, faktur ani dostępów do Waszych systemów."
      serviceName="Monitoring Monitora Sądowego i Gospodarczego dla listy kontrahentów"
      serviceDesc="Codzienne porównywanie listy kontrahentów klienta z nowymi wydaniami Monitora Sądowego i Gospodarczego, ze szczególnym uwzględnieniem postępowań o rozwiązanie podmiotu bez likwidacji, wraz z alertem w dniu obwieszczenia. Od 99 zł miesięcznie."
      serviceType="Monitoring rejestrów publicznych"
    />
  );
}
