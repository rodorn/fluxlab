import type { Metadata } from "next";

import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Porównanie dwóch wersji umowy z PDF, 19 zł | Fluxlab",
  description:
    "Wgraj dwie wersje umowy w PDF, a dostaniesz listę zmian: co było, co jest i co to zmienia. Wynik po kilku minutach, 19 zł netto.",
  alternates: { canonical: "/porownanie-umow" },
  openGraph: {
    title: "Porównanie dwóch wersji umowy z PDF | Fluxlab",
    description: "Lista merytorycznych zmian między dwiema wersjami umowy, po kilku minutach.",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, porównanie umów" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="porownanie-umow"
      breadcrumb="Porównanie umów"
      cena="19 zł netto"
      typ="narzedzie"
      h1="Porównanie dwóch wersji umowy, żeby nic nie umknęło"
      lead="Płacisz, wgrywasz starszą i nowszą wersję umowy w PDF, a po kilku minutach masz na ekranie i w mailu listę zmian merytorycznych: kwoty, terminy, kary i zakres, z oceną skutków."
      ctaLabel="Kup za 19 zł"
      ctaNote="Bez konta, wynik po kilku minutach"
      checks={[
        {
          title: "Tylko zmiany, które mają znaczenie",
          desc: "Pomijamy różnice w układzie i interpunkcji, a pokazujemy zmienione kwoty, terminy, kary, zakres oraz prawa i obowiązki.",
        },
        {
          title: "Było, jest, skutek",
          desc: "Przy każdej zmianie paragraf, treść w obu wersjach i krótka informacja, co to znaczy dla strony podpisującej.",
        },
        {
          title: "Ocena całości",
          desc: "Zdanie o tym, czy nowa wersja jest korzystniejsza, gorsza czy mieszana.",
        },
      ]}
      pricing={[
        {
          name: "Dwie wersje umowy",
          price: "19 zł",
          kup: "umowa-porownanie",
          desc: "Płatność kartą lub BLIK, potem wgranie pliku.",
          features: [
            "lista zmian z paragrafami i skutkami",
            "ocena, czy nowa wersja jest korzystniejsza",
            "wynik na ekranie i w mailu",
            "przy nieczytelnym pliku zwrot całej płatności",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Jaki plik mogę wgrać?",
          a: "Dwa PDF-y z tekstem do zaznaczenia, razem do 4 MB. Skan bez rozpoznanego tekstu może się nie udać; wtedy zwracamy całą płatność.",
        },
        {
          q: "Czy to jest porada prawna?",
          a: "Nie. To automatyczna analiza, która wskazuje miejsca warte uwagi. Przed podpisaniem istotnej umowy pokaż ją prawnikowi.",
        },
        {
          q: "Co dzieje się z wgraną umową?",
          a: "Pliki trafiają do analizy i nie są przez nas zapisywane. Zostaje wynik, który wysyłamy na adres e-mail z płatności.",
        },
        {
          q: "Czy jest faktura?",
          a: "Tak, na dane podane przy płatności, w ciągu 1 dnia roboczego.",
        },
      ]}
      formId="porownanie_umow"
      formHeading="Negocjujesz wiele umów naraz?"
      formIntro="Napisz, ile umów miesięcznie czytasz i jakiego rodzaju. Odpiszemy, jak to zautomatyzować."
      submitLabel="Napisz w sprawie większej liczby"
      microCopy="Odpisujemy w 1 dzień roboczy."
      serviceName="Streszczenie umowy i ryzyk z pliku PDF"
      serviceDesc="Automatyczne porównanie dwóch wersji umowy w PDF: lista zmian merytorycznych z oceną skutków. 19 zł netto, wynik po kilku minutach."
      serviceType="Porównanie umów"
    />
  );
}
