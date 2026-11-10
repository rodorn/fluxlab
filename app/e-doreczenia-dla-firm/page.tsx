import type { Metadata } from "next";
import Link from "next/link";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "e-Doręczenia dla dużych firm: konektor pism | Fluxlab",
  description:
    "Tysiące pism z adresu do e-Doręczeń nie muszą być klikane osobno. Wpinamy skrzynkę w obieg dokumentów, EZD albo system przez API. Bezpłatna diagnoza.",
  alternates: { canonical: "/e-doreczenia-dla-firm" },
  openGraph: {
    title: "e-Doręczenia dla dużych firm: konektor do obiegu pism",
    description:
      "Odbiór pism i dowodów doręczenia, rozdział do działów i wysyłka z Twojego systemu. Bezpłatna diagnoza.",
    url: "/e-doreczenia-dla-firm",
  },
};

export default function EDoreczeniaDlaFirm() {
  return (
    <ProductLanding
      slug="e-doreczenia-dla-firm"
      typ="usluga"
      cena="Wycena po bezpłatnej diagnozie"
      breadcrumb="e-Doręczenia dla firm"
      h1="e-Doręczenia dla dużych firm"
      lead="Gdy pism z adresu do e-Doręczeń są tysiące, a każde klika osobno kilka osób, panel dostawcy przestaje wystarczać. Konektor wpina skrzynkę w Twój obieg dokumentów, EZD albo system przez API: odbiór, dowody doręczenia, rozdział do działów i wysyłka."
      podLeadem={
        <>
          Mała firma z kilkoma pismami rocznie:{" "}
          <Link href="/e-doreczenia-integracja" className="text-accent hover:underline">
            sprawdź termin i integrację podstawową
          </Link>
          .
        </>
      }
      ctaLabel="Umów bezpłatną diagnozę"
      ctaNote="Wystarczy telefon i liczba pism miesięcznie"
      checks={[
        {
          title: "Banki spółdzielcze i firmy pożyczkowe",
          desc: "Pisma od klientów, komorników i sądów trafiają do właściwego działu bez przepisywania z panelu. Termin liczony od doręczenia jest zapisany przy sprawie.",
        },
        {
          title: "Windykacja i kancelarie",
          desc: "Duża liczba pism w wielu sprawach naraz. Każde pismo dostaje numer sprawy, a dowód doręczenia trafia do akt razem z pismem.",
        },
        {
          title: "Leasing i ubezpieczyciele",
          desc: "Korespondencja z urzędami i klientami wchodzi do systemu, w którym i tak prowadzisz umowy i szkody, a nie do osobnej skrzynki.",
        },
        {
          title: "Domy maklerskie",
          desc: "Pisma z urzędów i od klientów odbierane automatycznie, z kontrolą, kto i kiedy je otworzył.",
        },
        {
          title: "Odbiór i dowody doręczenia (UPO)",
          desc: "Konektor pobiera pisma i dowody doręczenia jako osobny zasób, bez logowania do panelu. Dowód zostaje przy piśmie, bo bez niego korespondencja nie ma wartości dowodowej.",
        },
        {
          title: "Rozdział do działów i wysyłka",
          desc: "Reguły kierują pismo do działu, osoby albo kolejki zadań. Odpowiedzi wychodzą z załącznikami z Twojego systemu, bez ręcznego przepisywania.",
        },
        {
          title: "Wpięcie w to, co już masz",
          desc: "Obieg dokumentów, system EZD albo własny system przez API. Nie zmieniamy narzędzi, w których ludzie pracują, tylko dokładamy do nich skrzynkę.",
        },
        {
          title: "Otwarty klient API do oceny przed decyzją",
          desc: (
            <>
              Kod klienta leży publicznie na github.com/rodorn/edoreczenia-klient, na licencji MIT.
              Szczegóły techniczne i termin obowiązku opisujemy na stronie{" "}
              <Link href="/e-doreczenia-integracja" className="text-accent hover:underline">
                integracji z e-Doręczeniami
              </Link>
              .
            </>
          ),
        },
      ]}
      pricing={[
        {
          name: "Bezpłatna diagnoza",
          price: "0 zł",
          desc: "Rozmowa telefoniczna zanim cokolwiek zlecisz.",
          features: [
            "Ile pism przychodzi i kto je dziś obsługuje",
            "Z jakiego systemu i jak da się spiąć skrzynkę",
            "Zakres, termin i wycena wdrożenia na piśmie",
          ],
          cta: "Umów diagnozę",
        },
        {
          name: "Wdrożenie konektora",
          price: "Wycena po diagnozie",
          desc: "Cena zależy od liczby skrzynek, systemu docelowego i reguł rozdziału.",
          featured: true,
          features: [
            "Odbiór pism i dowodów doręczenia",
            "Rozdział do działów według reguł",
            "Wysyłka z załącznikami z Twojego systemu",
          ],
          cta: "Umów diagnozę",
        },
      ]}
      faq={[
        {
          q: "Ile kosztuje konektor?",
          a: "Cenę ustalamy po bezpłatnej diagnozie, bo zależy od liczby skrzynek, systemu docelowego i reguł rozdziału pism. Wycenę dostajesz na piśmie, zanim cokolwiek zlecisz.",
        },
        {
          q: "Czy dane pism wychodzą poza naszą firmę?",
          a: "Nie muszą. Konektor stawiamy na Twoim serwerze i pisma idą tylko między usługą a Twoim systemem.",
        },
        {
          q: "Z jakim systemem da się to spiąć?",
          a: "Z każdym, który ma API albo import dokumentów: obieg dokumentów, EZD, system do obsługi spraw lub własna aplikacja. Co dokładnie, ustalamy na diagnozie.",
        },
        {
          q: "Co jeśli mamy kilka adresów do e-Doręczeń?",
          a: "Konektor obsługuje kilka skrzynek naraz, a pisma z każdej mogą trafiać do innego działu lub kolejki.",
        },
      ]}
      formId="e-doreczenia-firmy"
      formHeading="Bezpłatna diagnoza"
      formIntro="Napisz, jakiego systemu używa Twoja firma, i podaj telefon. Oddzwonimy i ustalimy, czy konektor ma sens."
      submitLabel="Umów bezpłatną diagnozę"
      microCopy="Oddzwonimy w dni robocze. Bez zobowiązań."
      poleFormularza={{
        etykieta: "Ile pism miesięcznie",
        placeholder: "np. 2000, w przybliżeniu",
      }}
      kontaktDomyslny="phone"
      serviceName="Integracja e-Doręczeń dla dużych firm"
      serviceDesc="Konektor wpinający skrzynkę do doręczeń elektronicznych w obieg dokumentów, EZD lub system przez API: odbiór pism i dowodów doręczenia, rozdział do działów, wysyłka."
      serviceType="Integracja systemów informatycznych"
    />
  );
}
