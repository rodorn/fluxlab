import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import GeneratorHasel from "@/components/GeneratorHasel";

export const metadata: Metadata = {
  title: "Polityka haseł dla firmy w PDF za 19 zł | Fluxlab",
  description:
    "Gotowa polityka haseł z nazwą Twojej firmy: zasady, menedżer haseł, 2FA i procedura odejścia pracownika. 19 zł netto, PDF mailem w kilka minut.",
  alternates: { canonical: "/polityka-hasel" },
  openGraph: {
    title: "Polityka haseł dla firmy w PDF za 19 zł | Fluxlab",
    description:
      "Jedna strona zasad dla zespołu, gotowa do podpisu. Z darmowym generatorem haseł.",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, polityka haseł" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="polityka-hasel"
      breadcrumb="Polityka haseł"
      typ="usluga"
      h1="Polityka haseł dla firmy gotowa w kilka minut"
      lead="Podajesz nazwę firmy, a po płatności dostajesz mailem PDF z zasadami dla zespołu: długość haseł, menedżer haseł, dwustopniowe logowanie i co zrobić, gdy ktoś odchodzi z firmy. Dokument jest gotowy do wydruku i podpisu."
      ctaLabel="Zamów politykę haseł"
      ctaNote="19 zł netto, jednorazowo. PDF mailem w kilka minut"
      podLeadem={<GeneratorHasel />}
      checks={[
        {
          title: "Zasady, które da się stosować",
          desc: "Długie hasła zamiast skomplikowanych, osobne hasło do każdej usługi i menedżer haseł dla całego zespołu.",
        },
        {
          title: "Dwustopniowe logowanie",
          desc: "Lista kont, na których włączenie 2FA jest obowiązkowe: poczta, bank, panel domeny i hostingu.",
        },
        {
          title: "Gdy ktoś odchodzi z firmy",
          desc: "Krótka procedura zmiany haseł i odebrania dostępów, z miejscem na daty i podpisy.",
        },
      ]}
      pricing={[
        {
          name: "Polityka haseł dla firmy",
          price: "19 zł",
          kup: "polityka-hasel",
          desc: "Netto, jednorazowo. PDF z nazwą firmy mailem w kilka minut.",
          features: [
            "zasady haseł i menedżer haseł",
            "lista kont z obowiązkowym 2FA",
            "procedura odejścia pracownika",
            "miejsce na podpisy zespołu",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Czy to dokument prawny?",
          a: "To wewnętrzna zasada bezpieczeństwa firmy, a nie opinia prawna. Pomaga przy audytach klientów i przy ubezpieczeniu od ataków w sieci.",
        },
        {
          q: "Czy generator haseł zapisuje wygenerowane hasła?",
          a: "Nie. Hasło powstaje w Twojej przeglądarce i nie opuszcza urządzenia.",
        },
        {
          q: "Co, jeśli nazwa firmy będzie pusta?",
          a: "Zwracamy całą kwotę i wysyłamy mail z wyjaśnieniem, więc nic nie tracisz.",
        },
      ]}
      formId="order_polityka_hasel"
      formHeading="Zapytaj o politykę bezpieczeństwa"
      formIntro="Potrzebujesz dokumentu dopasowanego do branży albo szkolenia zespołu? Napisz, a odpiszemy z wyceną."
      submitLabel="Wyślij zapytanie"
      microCopy="Odpowiadamy w ciągu 1 dnia roboczego."
      serviceName="Polityka haseł dla firmy"
      serviceDesc="Gotowa polityka haseł z nazwą firmy w PDF: zasady, menedżer haseł, 2FA i procedura odejścia pracownika za 19 zł netto."
      serviceType="Dokument bezpieczeństwa informacji"
    />
  );
}
