import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import { PilnowanieCertyfikatu } from "@/components/MonitoringTool";

export const metadata: Metadata = {
  title: "Pilnowanie certyfikatu i domeny za darmo | Fluxlab",
  description:
    "Podaj domenę i e-mail. Raz na dobę sprawdzamy certyfikat HTTPS i ważność domeny, a mail dostajesz 30, 14 i 3 dni przed końcem. Za darmo.",
  alternates: { canonical: "/pilnowanie-certyfikatu" },
  openGraph: {
    title: "Pilnowanie certyfikatu i domeny za darmo | Fluxlab",
    description:
    "Podaj domenę i e-mail. Raz na dobę sprawdzamy certyfikat HTTPS i ważność domeny, a mail dostajesz 30, 14 i 3 dni przed końcem. Za darmo.",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, pilnowanie certyfikatu i domeny" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="pilnowanie-certyfikatu"
      tool={<PilnowanieCertyfikatu />}
      breadcrumb="Pilnowanie certyfikatu i domeny"
      h1="Dowiesz się o wygasającym certyfikacie, zanim zrobi to klient"
      lead="Wpisz domenę i adres e-mail. Od razu pokażemy, ile dni zostało certyfikatowi HTTPS i domenie, a potem sprawdzamy je raz na dobę. Napiszemy tylko wtedy, gdy trzeba działać."
      cena="Za darmo"
      ctaLabel="Włącz pilnowanie"
      ctaNote="Bez karty i bez konta, do 3 domen na jeden adres e-mail"
      checks={[
        {
          title: "Certyfikat HTTPS",
          desc: "Data ważności, zgodność z domeną i zaufanie przeglądarek. Alert 30, 14 i 3 dni przed końcem oraz od razu po wygaśnięciu.",
        },
        {
          title: "Ważność domeny",
          desc: "Data wygaśnięcia z publicznego rejestru. Te same progi, żeby nie stracić adresu przez nieopłaconą fakturę.",
        },
        {
          title: "Cisza, gdy jest dobrze",
          desc: "Jeden mail na start ze stanem na dziś, potem wiadomość tylko przy progu albo awarii certyfikatu.",
        },
      ]}
      pricing={[
        {
          name: "Pilnowanie certyfikatu i domeny",
          price: "0 zł",
          desc: "Bez limitu czasu, do 3 domen na jeden adres e-mail.",
          features: [
            "sprawdzanie raz na dobę",
            "mail 30, 14 i 3 dni przed końcem",
            "wyłączenie jednym kliknięciem w każdym mailu",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Skąd wiecie, kiedy wygasa domena?",
          a: "Z publicznego rejestru RDAP. Dla niektórych końcówek rejestr nie podaje daty, wtedy pilnujemy samego certyfikatu i piszemy o tym w mailu startowym.",
        },
        {
          q: "Ile maili przychodzi?",
          a: "Mało. Jeden na start i potem tylko przy progach 30, 14 i 3 dni albo gdy certyfikat wygaśnie lub przestanie pasować do domeny.",
        },
        {
          q: "Jak to wyłączyć?",
          a: "Każdy mail ma link „Wyłącz pilnowanie”. Jedno kliknięcie i usuwamy domenę z listy.",
        },
        {
          q: "Co zrobić po alercie?",
          a: "Certyfikat odnawia się u firmy od hostingu, zwykle jednym kliknięciem. Domenę odnawia się u rejestratora, u którego ją kupiono.",
        },
      ]}
      formId="order_pilnowanie_certyfikatu"
      formHeading="Zapytaj o pilnowanie wielu domen"
      formIntro="Masz więcej niż 3 domeny albo chcesz, żeby alerty szły do kilku osób? Napisz, odpiszemy z propozycją."
      submitLabel="Wyślij zapytanie"
      microCopy="Odpisujemy w godzinę, oddzwaniamy w 2 godziny."
      serviceName="Pilnowanie certyfikatu i domeny"
      serviceDesc="Darmowe codzienne sprawdzanie certyfikatu HTTPS i ważności domeny z mailem 30, 14 i 3 dni przed końcem."
      serviceType="Monitoring certyfikatu"
    />
  );
}
