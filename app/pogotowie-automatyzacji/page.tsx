import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Pogotowie automatyzacji, naprawa n8n, Make i integracji | Fluxlab",
  description:
    "Stanęła integracja i nie schodzą zamówienia albo nie wystawiają się faktury. Czytam logi wykonań, znajduję wygasłe poświadczenia i ciche awarie. Diagnoza 49 zł, naprawa od 490 zł, opieka 299 zł miesięcznie.",
  alternates: { canonical: "/pogotowie-automatyzacji" },
};

export default function Page() {
  return (
    <ProductLanding
      slug="pogotowie-automatyzacji"
      breadcrumb="Pogotowie automatyzacji"
      eyebrow="Awaria automatyzacji"
      h1="Stanęła integracja, a wykonawca zniknął"
      lead="Scenariusz świeci na zielono, a zamówienia nie schodzą, faktury się nie wystawiają albo leady nie trafiają do CRM. Wchodzę w logi wykonań, znajduję wygasłe poświadczenia, zmienione API i ciche awarie, czyli przebiegi, które kończą się sukcesem, ale nic nie przenoszą."
      ctaLabel="Zgłoś awarię"
      ctaNote="Odpowiedź do 2 godzin w godzinach pracy"
      checks={[
        {
          title: "Ciche awarie, najgorszy rodzaj",
          desc: "Scenariusz zielony, ale pusty. Filtr przestał przepuszczać rekordy po zmianie nazwy pola i nikt tego nie zauważył przez trzy tygodnie.",
        },
        {
          title: "Wygasłe poświadczenia i tokeny",
          desc: "Najczęstsza przyczyna nagłego zatrzymania. Odnawiam połączenia i ustawiam ostrzeganie, zanim wygasną następnym razem.",
        },
        {
          title: "Przejęcie po poprzedniku",
          desc: "Porządkuję to, co zostało: co robi każdy scenariusz, gdzie są dostępy, co można wyłączyć. Dostajesz opis, który zrozumie też ktoś inny niż ja.",
        },
        {
          title: "Monitoring, żeby nie dowiadywać się od klienta",
          desc: "Alarm, gdy przelot się wywali albo gdy przez dobę nie przeszedł ani jeden rekord, choć powinien.",
        },
      ]}
      pricing={[
        {
          name: "Diagnoza",
          price: "49 zł",
          desc: "Chcesz wiedzieć, co się dzieje i ile to kosztuje.",
          features: [
            "przegląd logów wykonań i błędów",
            "lista zepsutych i cichych scenariuszy",
            "wskazanie przyczyny, nie objawu",
            "wycena naprawy bez zobowiązania",
          ],
        },
        {
          name: "Naprawa",
          price: "od 490 zł",
          desc: "Ma znowu działać, najlepiej dzisiaj.",
          features: [
            "wszystko z diagnozy",
            "naprawa i test na realnych danych",
            "zabezpieczenie przed powtórką",
            "krótka notatka, co było nie tak",
          ],
          featured: true,
        },
        {
          name: "Opieka",
          price: "299 zł/mc",
          desc: "Nie chcesz już nigdy się o tym dowiadywać od klienta.",
          features: [
            "monitoring przelotów i alarmy",
            "reakcja do 2 godzin w godzinach pracy",
            "drobne zmiany w ramach abonamentu",
            "kwartalny przegląd i porządki",
          ],
        },
      ]}
      faq={[
        {
          q: "Z czym pracujesz?",
          a: "n8n, Make, Zapier, integracje BaseLinker, WooCommerce, Allegro, Apilo, Pipedrive, webhooki i zwykłe skrypty po poprzednim wykonawcy. Jeśli ma API albo logi, da się to rozebrać.",
        },
        {
          q: "Nie mam kontaktu do osoby, która to robiła.",
          a: "To najczęstsza sytuacja i nie jest problemem. Potrzebuję dostępu do samego narzędzia, resztę odtwarzam z konfiguracji i logów.",
        },
        {
          q: "Jak przekazać dostępy bezpiecznie?",
          a: "Nie przysyłasz mi haseł. Zakładasz konto o ograniczonych uprawnieniach albo dzielisz się dostępem przez funkcję zapraszania w danym narzędziu, a po zakończeniu je odbierasz.",
        },
        {
          q: "Czy diagnoza przepada, jeśli zlecę naprawę?",
          a: "Nie. Kwota diagnozy odlicza się od naprawy, więc płacisz za nią tylko wtedy, gdy zdecydujesz się nic dalej nie robić.",
        },
      ]}
      formId="order_pogotowie_automatyzacji"
      formHeading="Zgłoś awarię automatyzacji"
      formIntro="Napisz, na czym to działa (n8n, Make, Zapier, własny skrypt), co przestało działać i od kiedy, oraz czy masz dostęp do narzędzia. Jeśli sprawa jest pilna, bo stoją zamówienia, zaznacz to."
      submitLabel="Zgłoś awarię"
      microCopy="Odpowiedź do 2 godzin w godzinach pracy. Diagnoza płatna z góry i odliczana od naprawy."
      serviceName="Pogotowie automatyzacji, naprawa integracji"
      serviceDesc="Diagnoza i naprawa zepsutych automatyzacji: n8n, Make, Zapier, BaseLinker, WooCommerce, Allegro, webhooki. Diagnoza 49 zł, naprawa od 490 zł, opieka 299 zł miesięcznie."
      serviceType="Naprawa i utrzymanie automatyzacji"
    />
  );
}
