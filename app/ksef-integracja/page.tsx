import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import KsefCheck from "@/components/KsefCheck";
import ListaKsef2027 from "@/components/ListaKsef2027";
import { PODATNICY } from "@/lib/terminy-ksef";

export const metadata: Metadata = {
  title: "Od kiedy KSeF jest obowiązkowy? Terminy dla firm | Fluxlab",
  description:
    "Duże firmy od 1 lutego 2026, pozostałe od 1 kwietnia, sprzedaż do 10 tys. zł miesięcznie i kasy od 1 stycznia 2027. Sprawdźcie swój termin, bez rejestracji.",
  alternates: { canonical: "/ksef-integracja" },
  openGraph: {
    title:
      "Od kiedy KSeF obowiązuje Waszą firmę? Sprawdzenie w dwóch kliknięciach",
    description:
      "Wybieracie rodzaj sprzedaży i sposób wystawiania faktur, a wynik pokazuje termin, liczbę dni do 1 stycznia 2027 i co zrobić przy Waszym programie. Bez rejestracji.",
    locale: "pl_PL",
    type: "website",
  },
};

export default function KsefIntegracja() {
  return (
    <ProductLanding
      slug="ksef-integracja"
      tool={
        <>
          <KsefCheck />
          <ListaKsef2027 />
        </>
      }
      breadcrumb="Integracja z KSeF"
      eyebrow="KSeF"
      h1="Integracja z KSeF"
      lead="KSeF jest obowiązkowy, ale faktur nie trzeba przeklejać ręcznie. Spinamy z nim system, którego już używacie, a numer KSeF i UPO zapisują się przy dokumencie."
      ctaLabel="Sprawdź, co Was obowiązuje"
      ctaNote="Dwa kliknięcia, bez wpisywania czegokolwiek"
      powiazane={[
        {
          przed:
            "Literówka w NIP nabywcy wysyła fakturę do cudzej firmy. Numer sprawdzicie przez",
          kotwica: "sprawdzenie NIP w wykazie VAT",
          href: "/sprawdzenie-nip",
          po: ".",
        },
      ]}
      checks={[
        {
          title: "Kod klienta API jest publiczny",
          desc: "Klient KSeF API v2 z wysyłką faktur FA(3) i pobieraniem UPO leży na github.com/rodorn/fluxlab-ksef-integracja. Działa w trybie demo, więc ocenicie go przed rozmową z nami.",
        },
        {
          title: "Numer KSeF i UPO zapisane przy dokumencie",
          desc: "Bez nich nie wykażecie, że faktura została przyjęta. Od 1 stycznia 2027 numer KSeF trzeba też podawać przy płatności.",
        },
        {
          title: "Odrzucona faktura nie przejdzie po cichu",
          desc: "Budujemy kolejkę z ponowieniami i widokiem stanu każdej faktury. Odrzucenie widać od razu, a nie przy zamknięciu miesiąca.",
        },
        {
          title: "Kiedy to się nie opłaca",
          desc: "Przy kilku fakturach miesięcznie wystarczy darmowa Aplikacja Podatnika KSeF. Integracja ma sens, gdy ktoś dziś przenosi faktury ręcznie.",
        },
      ]}
      pricing={[
        {
          name: "Rozpoznanie",
          price: "0 zł",
          desc: "Zanim cokolwiek zlecicie.",
          features: [
            "Sprawdzamy, czy Wasz system da się z tym spiąć i czym",
            "Informacja, czy wystarczy Wam gotowy program zamiast wdrożenia",
            "Gotowy klient API do uruchomienia u siebie, publicznie",
          ],
        },
        {
          name: "Odbiór faktur kosztowych",
          price: "4 900 zł",
          desc: "Najczęstszy zakres na start.",
          features: [
            "Faktury zakupowe pobierane z KSeF automatycznie",
            "Trafiają do księgowości, obiegu dokumentów albo arkusza",
            "Numer KSeF i UPO zapisane przy każdym dokumencie",
            "Kod i dostępy zostają u Was",
          ],
          featured: true,
        },
        {
          name: "Wystawianie i odbiór",
          price: "9 900 zł",
          desc: "Z wysyłaniem faktur z Waszego systemu.",
          features: [
            "Wszystko z wariantu podstawowego",
            "Wysyłka w schemacie FA(3), z walidacją przed wysłaniem",
            "Kolejka ponowień i widok stanu każdej faktury",
            "Rozdzielenie sprzedaży dla firm i dla osób prywatnych",
            "Pierwszy miesiąc opieki w cenie",
          ],
        },
      ]}
      faq={[
        {
          q: "Od kiedy KSeF jest obowiązkowy?",
          a: `${PODATNICY.map((p) => p.opis).join(" ")} Odbierać faktury w KSeF muszą wszyscy od 1 lutego 2026. Do 31 grudnia 2026 nie ma kar za błędy, a od 1 stycznia 2027 numer KSeF trzeba podawać przy płatności.`,
        },
        {
          q: "Co się zmienia w KSeF 1 stycznia 2027?",
          a: "Kończą się przepisy przejściowe: znika limit 10 tys. zł miesięcznie na faktury poza KSeF, a faktury z kas też muszą przechodzić przez system. Kary z art. 106ni według projektu ustawy UD477 przesunięto na 1 stycznia 2028, ale sam obowiązek wystawiania faktur w KSeF zostaje bez zmian.",
        },
        {
          q: "Mamy program księgowy, który obsługuje KSeF. Po co nam integracja?",
          a: "Najpewniej po nic i tak powiemy. Integracja ma sens, gdy faktury powstają poza programem księgowym, np. w sklepie albo CRM, albo gdy faktury kosztowe trzeba pobierać ręcznie.",
        },
        {
          q: "Zdążymy przed 1 stycznia 2027?",
          a: "Typowe wdrożenie zajmuje kilka tygodni, więc tak. Grudzień 2026 będzie jednak najgorszym momentem na start.",
        },
      ]}
      formId="ksef"
      formHeading="Napiszcie, w czym dziś wystawiacie faktury"
      formIntro="Nazwa programu i liczba faktur miesięcznie wystarczą. Odpiszemy, czy integracja ma sens."
      submitLabel="Wyślij opis"
      microCopy="Ustalenia prowadzimy mailowo. Telefon, jeśli tak Wam wygodniej."
      serviceName="Integracja z KSeF"
      serviceDesc="Spięcie systemu sprzedażowego, ERP albo programu księgowego z Krajowym Systemem e-Faktur: wysyłka faktur w schemacie FA(3) przez API v2, zapis numeru KSeF i UPO, pobieranie faktur kosztowych."
      serviceType="Integracja systemów informatycznych"
    />
  );
}
