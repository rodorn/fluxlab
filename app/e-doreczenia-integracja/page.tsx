import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import EDoreczeniaCheck from "@/components/EDoreczeniaCheck";
import { PODMIOTY } from "@/lib/terminy-e-doreczen";

export const metadata: Metadata = {
  title: "Integracja z e-Doręczeniami dla firm | Fluxlab",
  description:
    "Adres do doręczeń elektronicznych obejmuje kolejne podmioty. Spinamy skrzynkę z systemem, który już macie, żeby pisma nie wymagały osobnego panelu.",
  alternates: { canonical: "/e-doreczenia-integracja" },
  openGraph: {
    title: "Integracja z e-Doręczeniami dla firm | Fluxlab",
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
      tool={<EDoreczeniaCheck />}
      breadcrumb="Integracja z e-Doręczeniami"
      eyebrow="e-Doręczenia"
      h1="Integracja z e-Doręczeniami"
      lead="Skrzynka do doręczeń elektronicznych jest obowiązkowa, ale nikt nie każe obsługiwać jej ręcznie w osobnym panelu. Spinamy ją z systemem, którego już używacie, żeby pisma i dowody doręczenia trafiały tam, gdzie pracujecie."
      ctaLabel="Sprawdź swój termin"
      ctaNote="Dwa kliknięcia, bez wpisywania czegokolwiek"
      checks={[
        {
          title: "Napisaliśmy klienta tego API i oddaliśmy go za darmo",
          desc: "Kod leży publicznie pod adresem github.com/rodorn/edoreczenia-klient, na licencji MIT, do obejrzenia przed rozmową z kimkolwiek. Powstał, bo w całym otwartym kodzie nie było ani jednego klienta tego interfejsu w żadnym języku, a termin goni miliony podmiotów. Możecie go użyć sami albo dać swojemu programiście, bez pytania nas o zgodę.",
        },
        {
          title: "Dowodem doręczenia jest dowód, nie wiadomość",
          desc: "To najczęstszy błąd w takich wdrożeniach. Integracja pobiera listę pism i wygląda na gotową, tylko nie ma czym wykazać, że coś zostało doręczone. Dowody są osobnym zasobem i trzeba je pobierać i przechowywać osobno. Bez nich cała rzecz nie daje wartości dowodowej, czyli tego jedynego, po co się ją robi.",
        },
        {
          title: "Wysyłka z załącznikiem to trzy kroki, nie jeden",
          desc: "Najpierw powstaje wersja robocza, potem dołącza się do niej załączniki osobnym wywołaniem, dopiero na końcu następuje wysłanie. Pominięcie środkowego kroku kończy się pismem bez załącznika, wysłanym i nieodwracalnym. Piszemy to wprost, bo to jest dokładnie ten rodzaj błędu, który wychodzi po miesiącu.",
        },
        {
          title: "Gdzie mają trafiać pisma",
          desc: "Do systemu obiegu dokumentów, do CRM, na skrzynkę, do której już zaglądacie, albo do arkusza, jeśli tak dziś pracujecie. Nie narzucamy narzędzia, bo sens integracji polega właśnie na tym, żeby nie dokładać kolejnego miejsca do sprawdzania.",
        },
        {
          title: "Czego potrzebujemy od Was",
          desc: "Dostępu do środowiska testowego usługi, o który występuje podmiot, oraz informacji, z jakiego systemu korzystacie po swojej stronie. Wniosku o dostęp nie złożymy za Was, bo składa go właściciel skrzynki.",
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
            "Sprawdzamy, czy Wasz system da się z tym spiąć i czym",
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
          q: "Od kiedy firma musi mieć adres do e-Doręczeń?",
          a: PODMIOTY.map((p) => p.opis).join(" "),
        },
        {
          q: "Ile czeka się na aktywację adresu do e-Doręczeń po złożeniu wniosku?",
          a: "Ustawa nie podaje sztywnego terminu. Wiadomość z potwierdzeniem utworzenia adresu przychodzi mailem dopiero po tym, jak minister właściwy do spraw informatyzacji otrzyma kompletny i poprawny wniosek, a w praktyce zajmuje to od kilku dni do kilku tygodni. Im bliżej terminu obowiązku, tym więcej wniosków trafia do rozpatrzenia naraz, więc czas oczekiwania może się wydłużać. Status swojego wniosku sprawdza się w Koncie Przedsiębiorcy, w sekcji „Moje sprawy”. Kto wpisał się do CEIDG przed 2025 rokiem i ma obowiązek od 1 października 2026, nie powinien czekać z wnioskiem do ostatnich dni.",
        },
        {
          q: "Jak sprawdzić, czy nasza firma ma już aktywny adres do e-Doręczeń?",
          a: "Publiczna wyszukiwarka adresów na gov.pl pokazuje tylko urzędy i inne podmioty publiczne, adresów firm w niej nie znajdziecie. Stan własnego wniosku sprawdza się po zalogowaniu na edoreczenia.gov.pl, w opcji „Zarządzaj adresami do e-Doręczeń” w prawym górnym rogu, albo w Koncie Przedsiębiorcy, jeśli wniosek szedł przez biznes.gov.pl. Status „W trakcie weryfikacji” znaczy, że wniosek czeka, i nawet gdy zauważycie w nim błąd, nie składajcie drugiego. „Odrzucony” pokazuje powód i wymaga nowego, poprawnego wniosku. „Pozytywnie rozpatrzony” to jeszcze nie koniec, bo administrator musi aktywować skrzynkę po otrzymaniu maila. Dopiero wtedy adres działa.",
        },
        {
          q: "Co się dzieje, gdy nie odbierzemy pisma z urzędu w e-Doręczeniach?",
          a: "Pismo od urzędu, którego nie odbierzecie w ciągu 14 dni, uznaje się za doręczone po upływie tego terminu, tak jak list, po który nikt nie poszedł na pocztę. Mówi o tym art. 41 ust. 1 pkt 3 ustawy o doręczeniach elektronicznych. Od tego dnia biegną terminy na odpowiedź, odwołanie albo zapłatę, nawet jeśli nikt pisma nie otworzył. Dlatego samo założenie skrzynki nie wystarczy. Ktoś musi do niej zaglądać albo dostawać powiadomienia na zwykły adres e-mail.",
        },
        {
          q: "Czy zawieszona działalność też musi mieć adres do e-Doręczeń?",
          a: "Tak. Obowiązek dotyczy każdej firmy wpisanej do CEIDG albo do rejestru przedsiębiorców w KRS, niezależnie od tego, czy działalność jest aktywna, czy zawieszona. Urząd może wysłać pismo także do firmy w zawieszeniu, a 14 dni na odbiór biegnie tak samo. Firmowego adresu nie musi zakładać ktoś, kto nie ma wpisu ani w CEIDG, ani w KRS, na przykład rolnik bez zarejestrowanej działalności.",
        },
        {
          q: "Ile kosztuje adres do e-Doręczeń i co grozi za jego brak?",
          a: "Założenie adresu i odbieranie pism są bezpłatne, wniosek składa się przez Biznes.gov.pl albo mObywatel.gov.pl. Ustawa nie przewiduje osobnej kary pieniężnej za brak adresu. Urząd, który nie znajdzie Waszego adresu, może wysłać pismo publiczną usługą hybrydową albo listem poleconym. Prawdziwe ryzyko jest gdzie indziej: pismo w skrzynce, do której nikt nie zagląda, po 14 dniach uznaje się za doręczone.",
        },
        {
          q: "Czy adres firmy i prywatny adres do e-Doręczeń to ta sama skrzynka?",
          a: "Nie. Dla osoby prywatnej, dla firmy i dla zawodu zaufania publicznego zakłada się osobne adresy, nawet jeśli wszystkie należą do jednej osoby prowadzącej jednoosobową działalność. Pisma do firmy można odbierać na mObywatel.gov.pl, na edoreczenia.gov.pl, w aplikacji mObywatel, na Koncie Przedsiębiorcy albo w systemie obiegu dokumentów, który jest zintegrowany z usługą.",
        },
        {
          q: "Czy musimy mieć adres do doręczeń, żeby zacząć?",
          a: "Do samej integracji tak, bo to Wasza skrzynka jest jej punktem zaczepienia. Wniosek o adres składa podmiot i jest to procedura urzędowa, a nie techniczna. Rozpoznanie możemy zrobić wcześniej, na podstawie tego, z jakiego systemu korzystacie.",
        },
        {
          q: "Po co komuś integracja, skoro jest panel dostawcy?",
          a: "Przy kilku pismach rocznie po nic. Sens pojawia się wtedy, gdy ktoś codziennie loguje się do osobnego panelu, przepisuje z niego dane albo pilnuje terminów liczonych od doręczenia. Wtedy integracja zdejmuje czynność, która i tak musi się dziać, tylko dziś dzieje się ręcznie.",
        },
        {
          q: "Skąd mamy wiedzieć, że umiecie to zrobić?",
          a: "Z kodu, pod adresem github.com/rodorn/edoreczenia-klient. Jest tam komplet metod z projektu technicznego interfejsu, testy i opis trzech pułapek, na których takie wdrożenia się wykładają. Możecie go ocenić sami albo dać do oceny swojemu programiście, zanim cokolwiek zlecicie. To więcej niż referencja, bo referencji nie da się sprawdzić linijka po linijce.",
        },
        {
          q: "Czy dane pism wychodzą poza naszą firmę?",
          a: "Nie muszą. Integrację stawiamy na Waszym serwerze i wtedy pisma idą wyłącznie między usługą a Waszym systemem. Jeśli wolicie rozwiązanie chmurowe, powiemy wprost, co przez czyją infrastrukturę przechodzi, zanim cokolwiek uruchomimy.",
        },
      ]}
      formId="edoreczenia"
      formHeading="Napiszcie, z jakiego systemu korzystacie"
      formIntro="Wystarczy nazwa systemu obiegu dokumentów albo CRM, i jedno zdanie o tym, ile pism miesięcznie się u Was pojawia. Odpiszemy, czy integracja ma sens, czy panel wystarczy."
      submitLabel="Wyślij opis"
      microCopy="Ustalenia prowadzimy mailowo. Telefon, jeśli tak Wam wygodniej."
      serviceName="Integracja z e-Doręczeniami"
      serviceDesc="Spięcie skrzynki do doręczeń elektronicznych z systemem obiegu dokumentów, CRM albo inną aplikacją: odbiór pism, pobieranie dowodów doręczenia, wysyłka z załącznikami."
      serviceType="Integracja systemów informatycznych"
    />
  );
}
