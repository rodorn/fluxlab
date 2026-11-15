import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Pilnowanie rekordów DNS za 9 zł miesięcznie | Fluxlab",
  description:
    "Codziennie sprawdzamy rekordy DNS Twojej domeny i piszemy mailem, gdy ktoś je zmieni: poczta, strona, certyfikaty. 9 zł netto miesięcznie, bez umowy.",
  alternates: { canonical: "/pilnowanie-dns" },
  openGraph: {
    title: "Pilnowanie rekordów DNS za 9 zł miesięcznie | Fluxlab",
    description:
      "Alert mailem, gdy rekordy domeny się zmienią. Pokazujemy, co zniknęło i co doszło.",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, pilnowanie rekordów DNS" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="pilnowanie-dns"
      breadcrumb="Pilnowanie DNS"
      typ="usluga"
      h1="Ktoś zmienił DNS domeny? Dowiesz się o tym tego samego dnia"
      lead="Zapisujemy obecne rekordy domeny i raz dziennie porównujemy je z aktualnymi. Gdy coś się zmieni, dostajesz mail z listą: co zniknęło i co doszło. Zmiana rekordów poczty albo strony bez Twojej wiedzy to często pierwszy objaw włamania na konto domeny."
      ctaLabel="Włącz pilnowanie"
      ctaNote="9 zł netto miesięcznie, rezygnacja w każdej chwili"
      checks={[
        {
          title: "Strona i poczta",
          desc: "Rekordy A, AAAA, MX i CNAME dla www. Zmiana adresu serwera albo poczty widoczna następnego dnia.",
        },
        {
          title: "Bezpieczeństwo poczty",
          desc: "Rekordy TXT z SPF, DMARC i weryfikacjami usług oraz CAA, które wskazuje, kto może wydawać certyfikaty.",
        },
        {
          title: "Serwery nazw",
          desc: "Rekordy NS. Ich zmiana oznacza, że ktoś przeniósł całą domenę gdzie indziej.",
        },
      ]}
      pricing={[
        {
          name: "Pilnowanie jednej domeny",
          price: "9 zł",
          kup: "dns-pilnowanie",
          desc: "Netto, miesięcznie. Pierwszy mail z zapisanym stanem w kilka minut.",
          features: [
            "codzienne porównanie rekordów domeny",
            "mail tylko wtedy, gdy coś się zmieni",
            "lista: co usunięto i co dodano",
            "rezygnacja w każdej chwili",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Czy zmieniacie coś w moim DNS?",
          a: "Nie. Tylko czytamy publiczne rekordy domeny, tak jak robi to każda przeglądarka.",
        },
        {
          q: "Czy mail przyjdzie, gdy rekord zmieni sam właściciel?",
          a: "Tak, bo nie odróżniamy własnej zmiany od cudzej. Mail pokazuje, co dokładnie się zmieniło, więc łatwo go zignorować.",
        },
        {
          q: "Jak zrezygnować?",
          a: "Anulujesz subskrypcję w mailu od Stripe albo piszesz do nas. Pilnowanie kończy się samo, bez dodatkowych kroków.",
        },
        {
          q: "Co, jeśli domena nie istnieje?",
          a: "Zwracamy całą kwotę i wysyłamy mail z wyjaśnieniem, więc nic nie tracisz.",
        },
      ]}
      formId="order_pilnowanie_dns"
      formHeading="Zapytaj o pilnowanie wielu domen"
      formIntro="Masz więcej niż jedną domenę albo potrzebujesz alertu w Teams lub Slacku? Napisz, a odpiszemy z wyceną."
      submitLabel="Wyślij zapytanie"
      microCopy="Odpowiadamy w ciągu 1 dnia roboczego."
      serviceName="Pilnowanie rekordów DNS"
      serviceDesc="Codzienne sprawdzanie rekordów DNS domeny i mail o każdej zmianie za 9 zł netto miesięcznie."
      serviceType="Monitoring rekordów DNS"
    />
  );
}
