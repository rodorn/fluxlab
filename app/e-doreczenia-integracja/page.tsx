import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Integracja z e-Doręczeniami: spięcie skrzynki z Twoim systemem | Fluxlab",
  description:
    "Od 1 października adres do doręczeń elektronicznych obejmuje kolejne podmioty. Spinam skrzynkę z systemem, który już macie, żeby pisma nie wymagały logowania się do osobnego panelu. Napisałem otwarty klient tego API.",
  alternates: { canonical: "/e-doreczenia-integracja" },
  openGraph: {
    title: "Integracja z e-Doręczeniami: spięcie skrzynki z Twoim systemem | Fluxlab",
    description:
      "Pisma wpadają do systemu, który już macie, razem z dowodami doręczenia. Bez osobnego panelu i bez przepisywania.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, integracja z e-Doręczeniami",
      },
    ],
  },
};

export default function EDoreczeniaIntegracja() {
  return (
    <ProductLanding
      slug="e-doreczenia-integracja"
      breadcrumb="Integracja z e-Doręczeniami"
      eyebrow="e-Doręczenia"
      h1="Integracja z e-Doręczeniami"
      lead="Skrzynka do doręczeń elektronicznych jest obowiązkowa, ale nikt nie każe obsługiwać jej ręcznie w osobnym panelu. Spinam ją z systemem, którego już używacie, żeby pisma i dowody doręczenia trafiały tam, gdzie pracujecie."
      ctaLabel="Opisz, czego używacie"
      ctaNote="Odpisuję zwykle tego samego dnia"
      checks={[
        {
          title: "Napisałem klienta tego API i oddałem go za darmo",
          desc: "Kod leży publicznie pod adresem github.com/rodorn/edoreczenia-klient, na licencji MIT, do obejrzenia przed rozmową z kimkolwiek. Powstał, bo w całym otwartym kodzie nie było ani jednego klienta tego interfejsu w żadnym języku, a termin goni miliony podmiotów. Możecie go użyć sami albo dać swojemu programiście, bez pytania mnie o zgodę.",
        },
        {
          title: "Dowodem doręczenia jest dowód, nie wiadomość",
          desc: "To najczęstszy błąd w takich wdrożeniach. Integracja pobiera listę pism i wygląda na gotową, tylko nie ma czym wykazać, że coś zostało doręczone. Dowody są osobnym zasobem i trzeba je pobierać i przechowywać osobno. Bez nich cała rzecz nie daje wartości dowodowej, czyli tego jedynego, po co się ją robi.",
        },
        {
          title: "Wysyłka z załącznikiem to trzy kroki, nie jeden",
          desc: "Najpierw powstaje wersja robocza, potem dołącza się do niej załączniki osobnym wywołaniem, dopiero na końcu następuje wysłanie. Pominięcie środkowego kroku kończy się pismem bez załącznika, wysłanym i nieodwracalnym. Piszę to wprost, bo to jest dokładnie ten rodzaj błędu, który wychodzi po miesiącu.",
        },
        {
          title: "Gdzie mają trafiać pisma",
          desc: "Do systemu obiegu dokumentów, do CRM, na skrzynkę, do której już zaglądacie, albo do arkusza, jeśli tak dziś pracujecie. Nie narzucam narzędzia, bo sens integracji polega właśnie na tym, żeby nie dokładać kolejnego miejsca do sprawdzania.",
        },
        {
          title: "Czego potrzebuję od Was",
          desc: "Dostępu do środowiska testowego usługi, o który występuje podmiot, oraz informacji, z jakiego systemu korzystacie po swojej stronie. Wniosku o dostęp nie złożę za Was, bo składa go właściciel skrzynki.",
        },
        {
          title: "Kiedy to się nie opłaca",
          desc: "Przy kilku pismach rocznie panel dostawcy w zupełności wystarczy i nie ma czego automatyzować. Integracja zaczyna mieć sens tam, gdzie pism jest na tyle dużo, że ktoś je przepisuje, albo gdzie termin liczy się od doręczenia i ktoś musi tego pilnować.",
        },
      ]}
      pricing={[
        {
          name: "Rozpoznanie",
          price: "0 zł",
          desc: "Zanim cokolwiek zlecicie.",
          features: [
            "Sprawdzam, czy Wasz system da się z tym spiąć i czym",
            "Informacja, ile pism trzeba mieć, żeby to się zwróciło",
            "Gotowy klient API do obejrzenia, publicznie",
          ],
        },
        {
          name: "Odbiór pism",
          price: "3 900 zł",
          desc: "Najczęstszy zakres na start.",
          features: [
            "Pisma trafiają do Waszego systemu automatycznie",
            "Dowody doręczenia pobierane i przechowywane razem z nimi",
            "Powiadomienie o nowym piśmie tam, gdzie je zobaczycie",
            "Kod i dostępy zostają u Was",
          ],
          featured: true,
        },
        {
          name: "Odbiór i wysyłka",
          price: "7 900 zł",
          desc: "Z wysyłaniem pism z Waszego systemu.",
          features: [
            "Wszystko z wariantu podstawowego",
            "Wysyłka z załącznikami, z obsługą wersji roboczej",
            "Kolejka ponowień, gdy usługa nie odpowiada",
            "Panel z historią i ręcznym ponowieniem",
            "Pierwszy miesiąc opieki w cenie",
          ],
        },
      ]}
      faq={[
        {
          q: "Czy muszę mieć adres do doręczeń, żeby zacząć?",
          a: "Do samej integracji tak, bo to Wasza skrzynka jest jej punktem zaczepienia. Wniosek o adres składa podmiot i jest to procedura urzędowa, a nie techniczna. Rozpoznanie mogę zrobić wcześniej, na podstawie tego, z jakiego systemu korzystacie.",
        },
        {
          q: "Po co komuś integracja, skoro jest panel dostawcy?",
          a: "Przy kilku pismach rocznie po nic. Sens pojawia się wtedy, gdy ktoś codziennie loguje się do osobnego panelu, przepisuje z niego dane albo pilnuje terminów liczonych od doręczenia. Wtedy integracja zdejmuje czynność, która i tak musi się dziać, tylko dziś dzieje się ręcznie.",
        },
        {
          q: "Skąd mam wiedzieć, że umiecie to zrobić?",
          a: "Z kodu, pod adresem github.com/rodorn/edoreczenia-klient. Jest tam komplet metod z projektu technicznego interfejsu, testy i opis trzech pułapek, na których takie wdrożenia się wykładają. Możecie go ocenić sami albo dać do oceny swojemu programiście, zanim cokolwiek zlecicie. To więcej niż referencja, bo referencji nie da się sprawdzić linijka po linijce.",
        },
        {
          q: "Czy dane pism wychodzą poza naszą firmę?",
          a: "Nie muszą. Integrację stawiam na Waszym serwerze i wtedy pisma idą wyłącznie między usługą a Waszym systemem. Jeśli wolicie rozwiązanie chmurowe, powiem wprost, co przez czyją infrastrukturę przechodzi, zanim cokolwiek uruchomimy.",
        },
      ]}
      formId="edoreczenia"
      formHeading="Napiszcie, z jakiego systemu korzystacie"
      formIntro="Wystarczy nazwa systemu obiegu dokumentów albo CRM, i jedno zdanie o tym, ile pism miesięcznie się u Was pojawia. Odpiszę, czy integracja ma sens, czy panel wystarczy."
      submitLabel="Wyślij opis"
      microCopy="Ustalenia prowadzę mailowo. Telefon, jeśli tak Wam wygodniej."
      serviceName="Integracja z e-Doręczeniami"
      serviceDesc="Spięcie skrzynki do doręczeń elektronicznych z systemem obiegu dokumentów, CRM albo inną aplikacją: odbiór pism, pobieranie dowodów doręczenia, wysyłka z załącznikami."
      serviceType="Integracja systemów informatycznych"
    />
  );
}
