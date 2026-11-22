import type { Metadata } from "next";

import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Streszczenie umowy i ryzyk z PDF, 29 zł | Fluxlab",
  description:
    "Wgraj umowę w PDF, a dostaniesz kluczowe zapisy, terminy, kary, ryzyka i punkty do negocjacji. Wynik po kilku minutach, 29 zł netto.",
  alternates: { canonical: "/streszczenie-umowy" },
  openGraph: {
    title: "Streszczenie umowy i ryzyk z PDF | Fluxlab",
    description: "Kluczowe zapisy, terminy, kary i punkty do negocjacji z jednej umowy, po kilku minutach.",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, streszczenie umowy" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="streszczenie-umowy"
      breadcrumb="Streszczenie umowy"
      cena="29 zł netto"
      typ="narzedzie"
      h1="Streszczenie umowy i ryzyk, zanim ją podpiszesz"
      lead="Płacisz, wgrywasz PDF z umową i po kilku minutach masz na ekranie i w mailu: o czym jest umowa, jakie są terminy i kary, co jest dla Ciebie ryzykowne i co warto negocjować."
      ctaLabel="Kup za 29 zł"
      ctaNote="Bez konta, wynik po kilku minutach"
      checks={[
        {
          title: "Kluczowe zapisy z paragrafami",
          desc: "Każdy punkt ma numer paragrafu, więc od razu wiesz, gdzie go szukać w dokumencie.",
        },
        {
          title: "Terminy, kary i ryzyka",
          desc: "Okresy wypowiedzenia, terminy płatności, kary umowne, limity odpowiedzialności i zapisy niekorzystne dla strony, która podpisuje.",
        },
        {
          title: "Punkty do negocjacji",
          desc: "Przy każdym ryzyku propozycja zmiany, którą możesz wysłać drugiej stronie.",
        },
      ]}
      pricing={[
        {
          name: "Jedna umowa",
          price: "29 zł",
          kup: "umowa-streszczenie",
          desc: "Płatność kartą lub BLIK, potem wgranie pliku.",
          features: [
            "streszczenie, terminy, kary, ryzyka i punkty do negocjacji",
            "wynik na ekranie i w mailu",
            "przy nieczytelnym pliku zwrot całej płatności",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Jaki plik mogę wgrać?",
          a: "PDF z tekstem do zaznaczenia, do 4 MB. Skan bez rozpoznanego tekstu może się nie udać; wtedy zwracamy całą płatność.",
        },
        {
          q: "Czy to jest porada prawna?",
          a: "Nie. To automatyczna analiza, która wskazuje miejsca warte uwagi. Przed podpisaniem istotnej umowy pokaż ją prawnikowi.",
        },
        {
          q: "Co dzieje się z wgraną umową?",
          a: "Plik trafia do analizy i nie jest przez nas zapisywany. Zostaje wynik, który wysyłamy na adres e-mail z płatności.",
        },
        {
          q: "Czy jest faktura?",
          a: "Tak, na dane podane przy płatności, w 1 dzień roboczy.",
        },
      ]}
      formId="streszczenie_umowy"
      formHeading="Masz dużo umów do przejrzenia?"
      formIntro="Napisz, ile umów miesięcznie czytasz i jakiego rodzaju. Odpiszemy, jak to zautomatyzować."
      submitLabel="Napisz w sprawie większej liczby"
      microCopy="Odpisujemy w godzinę, oddzwaniamy w 2 godziny."
      serviceName="Streszczenie umowy i ryzyk z pliku PDF"
      serviceDesc="Automatyczna analiza umowy w PDF: kluczowe zapisy, terminy, kary, ryzyka i punkty do negocjacji. 29 zł netto, wynik po kilku minutach."
      serviceType="Analiza umów"
    />
  );
}
