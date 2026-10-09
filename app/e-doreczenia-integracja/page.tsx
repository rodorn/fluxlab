import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import EDoreczeniaCheck from "@/components/EDoreczeniaCheck";
import { PODMIOTY } from "@/lib/terminy-e-doreczen";

export const metadata: Metadata = {
  title: "e-Doręczenia dla JDG i spółek: od kiedy? | Fluxlab",
  description:
    "Jednoosobowa firma z CEIDG wpisana przed 2025 ma obowiązek od 1 października 2026, spółka od 1 kwietnia 2025. Termin i odpis po KRS w 10 sekund.",
  alternates: { canonical: "/e-doreczenia-integracja" },
  openGraph: {
    title:
      "Od kiedy Wasza firma musi mieć adres do e-Doręczeń? Sprawdzenie w jednym kliknięciu",
    description:
      "Wybieracie formę działalności, a wynik pokazuje termin obowiązku, ile dni zostało albo minęło i co zrobić dalej. Firmy z CEIDG wpisane przed 2025 mają obowiązek od 1 października 2026. Bez rejestracji.",
    locale: "pl_PL",
    type: "website",
  },
};

export default function EDoreczeniaIntegracja() {
  return (
    <ProductLanding
      slug="e-doreczenia-integracja"
      tool={
        <>
          <EDoreczeniaCheck />
          <section className="mt-10 max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Spółka z KRS bez adresu do e-Doręczeń: co to znaczy i jak sprawdzić
            </h2>
            <div className="mt-4 space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                Spółka wpisana do KRS przed 2025 rokiem musi mieć adres od 1 kwietnia
                2025, później wpisana od dnia wpisu. Adres widać w odpisie KRS, w dziale
                1. Gdy go tam nie ma, spółka adresu nie ma albo nie aktywowała skrzynki.
              </p>
              <p>
                5 października 2026 sprawdziliśmy tak 119 spółek: 27 z nich nadal nie ma
                adresu w bazie. Wpiszcie numer KRS w narzędziu powyżej, w trybie „Spółka:
                po numerze KRS”, a pokażemy, czy adres jest w odpisie.
              </p>
            </div>
          </section>
        </>
      }
      breadcrumb="Integracja z e-Doręczeniami"
      eyebrow="e-Doręczenia"
      h1="Integracja z e-Doręczeniami"
      lead="Skrzynka do e-Doręczeń jest obowiązkowa, ale nie musicie obsługiwać jej ręcznie w osobnym panelu. Spinamy ją z Waszym systemem: pisma i dowody doręczenia trafiają tam, gdzie pracujecie."
      ctaLabel="Sprawdź swój termin"
      ctaNote="Dwa kliknięcia, bez wpisywania czegokolwiek"
      powiazane={[
        {
          przed: "Przed wpisaniem kontrahenta do systemu:",
          kotwica: "darmowe sprawdzenie NIP w wykazie VAT",
          href: "/sprawdzenie-nip",
          po: ".",
        },
      ]}
      checks={[
        {
          title: "Otwarty klient tego API, do obejrzenia przed decyzją",
          desc: "Kod leży publicznie na github.com/rodorn/edoreczenia-klient, na licencji MIT. Możecie go ocenić sami albo dać swojemu programiście.",
        },
        {
          title: "Pobieramy dowody doręczenia, nie tylko pisma",
          desc: "Dowody są osobnym zasobem. Bez nich integracja nie ma wartości dowodowej, a to jedyny powód, dla którego się ją robi.",
        },
        {
          title: "Pisma trafiają tam, gdzie już pracujecie",
          desc: "Do obiegu dokumentów, CRM, skrzynki mailowej albo arkusza. Nie dokładamy kolejnego miejsca do sprawdzania.",
        },
        {
          title: "Kiedy to się nie opłaca",
          desc: "Przy kilku pismach rocznie panel w zupełności wystarczy. Integracja ma sens, gdy ktoś pisma przepisuje albo pilnuje terminów od doręczenia.",
        },
      ]}
      pricing={[
        {
          name: "Rozpoznanie",
          price: "0 zł",
          desc: "Zanim cokolwiek zlecicie.",
          features: [
            "Czy i czym da się spiąć Wasz system",
            "Przy jakiej liczbie pism to się zwraca",
          ],
        },
        {
          name: "Odbiór pism",
          price: "3 900 zł",
          desc: "Najczęstszy zakres na start.",
          features: [
            "Pisma i dowody doręczenia w Waszym systemie",
            "Powiadomienie o nowym piśmie",
            "Kod i dostępy zostają u Was",
          ],
          featured: true,
        },
        {
          name: "Odbiór i wysyłka",
          price: "7 900 zł",
          desc: "Z wysyłaniem pism z Waszego systemu.",
          features: [
            "Wszystko z odbioru pism",
            "Wysyłka z załącznikami i ponowieniami",
            "Pierwszy miesiąc opieki w cenie",
          ],
        },
      ]}
      faq={[
        {
          q: "Od kiedy firma musi mieć adres do e-Doręczeń?",
          a: PODMIOTY.map((p) => p.opis).join(" "),
        },
        {
          q: "Ile kosztuje adres do e-Doręczeń i co grozi za jego brak?",
          a: "Adres jest bezpłatny, wniosek składa się przez Biznes.gov.pl. Kary pieniężnej za brak nie ma. Ryzyko jest inne: pismo z urzędu nieodebrane w ciągu 14 dni uznaje się za doręczone.",
        },
        {
          q: "Po co komuś integracja, skoro jest panel dostawcy?",
          a: "Przy kilku pismach rocznie po nic. Ma sens, gdy ktoś codziennie loguje się do panelu, przepisuje z niego dane albo pilnuje terminów liczonych od doręczenia.",
        },
        {
          q: "Czy dane pism wychodzą poza naszą firmę?",
          a: "Nie muszą. Integrację stawiamy na Waszym serwerze i pisma idą tylko między usługą a Waszym systemem.",
        },
      ]}
      formId="edoreczenia"
      formHeading="Napiszcie, z jakiego systemu korzystacie"
      formIntro="Nazwa systemu i liczba pism miesięcznie wystarczą. Odpiszemy, czy integracja ma sens, czy panel wystarczy."
      submitLabel="Wyślij opis"
      microCopy="Ustalenia prowadzimy mailowo. Telefon, jeśli tak Wam wygodniej."
      serviceName="Integracja z e-Doręczeniami"
      serviceDesc="Spięcie skrzynki do doręczeń elektronicznych z systemem obiegu dokumentów, CRM albo inną aplikacją: odbiór pism, pobieranie dowodów doręczenia, wysyłka z załącznikami."
      serviceType="Integracja systemów informatycznych"
    />
  );
}
