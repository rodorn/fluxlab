import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Landing z formularzem w 10 minut, 29 zł/mies. | Fluxlab",
  description:
    "Jedna strona ofertowa z formularzem pod adresem fluxlab.pl/l/twoja-nazwa. Wypełniasz ankietę, zgłoszenia trafiają mailem. 29 zł netto miesięcznie.",
  alternates: { canonical: "/landing-z-formularza" },
  openGraph: {
    title: "Landing z formularzem w 10 minut, 29 zł/mies. | Fluxlab",
    description: "Ankieta po płatności i gotowa strona ofertowa z formularzem. Zgłoszenia przychodzą na Twój e-mail.",
    type: "website",
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="landing-z-formularza"
      breadcrumb="Landing z formularzem"
      eyebrow="Dla małych firm i usług lokalnych"
      h1="Strona ofertowa z formularzem, gotowa w 10 minut"
      lead="Płacisz, wypełniasz krótką ankietę (nagłówek, opis, do trzech punktów, kontakt) i od razu dostajesz stronę pod adresem fluxlab.pl/l/twoja-nazwa. Zgłoszenia z formularza trafiają mailem na Twój adres."
      ctaLabel="Zamów landing"
      ctaNote="29 zł netto miesięcznie, rezygnacja w dowolnym dniu"
      powiazane={[
        {
          przed: "Potrzebujesz landingu z płatnością lub pod własną domeną? Zobacz",
          kotwica: "landing z płatnością",
          href: "/landing-z-platnoscia",
          po: ".",
        },
      ]}
      checks={[
        {
          title: "Gotowe od razu po wypełnieniu treści",
          desc: "Po zapisie ankiety strona działa. Treść zmienisz tym samym linkiem, zmiany są widoczne od razu.",
        },
        {
          title: "Zgłoszenia mailem",
          desc: "Imię, telefon lub e-mail i wiadomość przychodzą na wskazany adres. Formularz ma pole zgody na kontakt i zabezpieczenie przed botami.",
        },
        {
          title: "Telefon w pierwszej kolejności",
          desc: "Strona ma jedną kolumnę, duże pola i przycisk w wybranym kolorze, więc dobrze działa na telefonie.",
        },
      ]}
      pricing={[
        {
          name: "Landing z formularzem",
          price: "29 zł/mies.",
          kup: "landing-formularz",
          desc: "Netto. Adres fluxlab.pl/l/twoja-nazwa, formularz i zgłoszenia mailem do końca subskrypcji.",
          features: ["strona pod adresem fluxlab.pl/l/…", "formularz ze zgodą na kontakt", "rezygnacja w dowolnym dniu"],
          featured: true,
        },
      ]}
      poCenniku={
        <div className="mt-8">
          <p className="mb-3 text-sm text-gray-600">Tak wygląda formularz na stronie (wersja demonstracyjna):</p>
          <iframe
            src="/embed/landing"
            title="Formularz landingu, podgląd"
            loading="lazy"
            className="w-full max-w-[480px] rounded-xl border border-black/10"
            style={{ height: 420 }}
          />
        </div>
      }
      faq={[
        {
          q: "Czy mogę mieć własną domenę?",
          a: "Nie, strona działa pod adresem fluxlab.pl/l/twoja-nazwa. Własna domena wymaga osobnego wdrożenia, opisanego na stronie landingu z płatnością.",
        },
        {
          q: "Co z danymi osób, które wyślą formularz?",
          a: "Zgłoszenie wysyłamy mailem na Twój adres i przechowujemy do 30 dni, potem jest usuwane. Administratorem danych jest Twoja firma, a Fluxlab tylko obsługuje formularz. Po anulowaniu subskrypcji strona się wyłącza.",
        },
        {
          q: "Czy mogę zmienić treść po publikacji?",
          a: "Tak. Link do ankiety dostajesz w mailu i możesz go używać, dopóki subskrypcja jest aktywna.",
        },
        {
          q: "Co jeśli adres jest zajęty?",
          a: "Ankieta od razu o tym informuje i prosi o inny adres. Adresy są przydzielane w kolejności zapisu.",
        },
      ]}
      formId="order_landing_formularz"
      formHeading="Zamów landing z formularzem"
      formIntro="Podaj nazwę firmy lub oferty. Resztę treści uzupełnisz w formularzu treści po płatności."
      submitLabel="Zamów landing"
      microCopy="Rezygnacja w dowolnym dniu, płacisz za dni korzystania."
      serviceName="Landing z formularzem"
      serviceDesc="Strona ofertowa z formularzem pod adresem fluxlab.pl/l/…, zgłoszenia mailem. 29 zł netto miesięcznie."
      serviceType="Landing page"
    />
  );
}
