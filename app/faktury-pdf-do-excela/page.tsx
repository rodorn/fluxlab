import type { Metadata } from "next";

import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Faktury PDF do Excela, 49 zł/mies. | Fluxlab",
  description:
    "Wgraj faktury w PDF, a dostaniesz arkusz Excel z numerem, datami, NIP-ami i kwotami. Do 100 faktur w miesiącu, 49 zł netto miesięcznie.",
  alternates: { canonical: "/faktury-pdf-do-excela" },
  openGraph: {
    title: "Faktury PDF do Excela, 49 zł/mies. | Fluxlab",
    description: "Zamiast przepisywać faktury ręcznie: wgrywasz PDF-y i dostajesz gotowy arkusz Excel.",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, faktury PDF do Excela" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="faktury-pdf-do-excela"
      breadcrumb="Faktury PDF do Excela"
      cena="49 zł netto miesięcznie"
      typ="narzedzie"
      h1="Faktury z PDF-ów trafiają do Excela bez przepisywania"
      lead="Wgrywasz do 10 faktur w PDF naraz. Po chwili masz tabelę na ekranie, plik Excel do pobrania i ten sam plik w mailu: numer, daty, sprzedawca i nabywca z NIP-ami, netto, VAT, brutto i rachunek do przelewu. Do 100 faktur w miesiącu."
      ctaLabel="Włącz za 49 zł miesięcznie"
      ctaNote="Rezygnacja w dowolnym dniu"
      checks={[
        {
          title: "Komplet danych w jednym arkuszu",
          desc: "Jeden wiersz na fakturę, kolumny gotowe do sortowania i sum. Kwoty są liczbami, a nie tekstem, więc Excel od razu je sumuje.",
        },
        {
          title: "Tylko to, co jest na fakturze",
          desc: "Dane są przepisywane z dokumentu, nic nie jest zgadywane. Brakującej kwoty nie ma, zamiast wymyślonej. Korekty i nietypowe dokumenty dostają uwagę w ostatniej kolumnie.",
        },
        {
          title: "Wracasz, kiedy masz nowe faktury",
          desc: "W każdym mailu z wynikiem jest link do kolejnej paczki. Limit liczy się od pierwszego dnia miesiąca.",
        },
      ]}
      pricing={[
        {
          name: "Faktury do Excela",
          price: "49 zł/mies.",
          kup: "faktury-excel",
          desc: "Netto. Do 100 faktur w miesiącu, do 10 plików PDF w jednej paczce.",
          features: [
            "tabela na ekranie, Excel do pobrania i w mailu",
            "numer, daty, NIP-y, netto, VAT, brutto, rachunek",
            "PDF z tekstem, do 4 MB w paczce",
            "rezygnacja w dowolnym dniu",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Czy odczyt jest w stu procentach pewny?",
          a: "Nie. Odczyt jest automatyczny i przy nietypowym układzie faktury może się pomylić, dlatego sprawdź kwoty, zanim wgrasz arkusz do księgowości.",
        },
        {
          q: "Czy zadziała na zeskanowaną fakturę?",
          a: "Najlepiej działa na PDF-ach z tekstem, takich jak z programów do fakturowania i sklepów. Zdjęcie lub skan może wyjść gorzej albo nie zostać odczytane.",
        },
        {
          q: "Co się dzieje z wgranymi plikami?",
          a: "Plik trafia do dostawcy modelu AI tylko na czas odczytu i nie jest u nas zapisywany. Zostaje tabela w mailu, który dostajesz.",
        },
        {
          q: "Jak zrezygnować?",
          a: "W dowolnym dniu, odpisując na mail z wynikiem. Za niewykorzystane dni zwracamy pieniądze.",
        },
        {
          q: "Czy jest faktura?",
          a: "Tak, na dane podane przy płatności, w ciągu 1 dnia roboczego.",
        },
      ]}
      formId="faktury_pdf_excel"
      formHeading="Masz setki faktur w miesiącu?"
      formIntro="Napisz, ile faktur przychodzi do Ciebie i w jakim programie je księgujesz. Odpiszemy, jak to podłączyć."
      submitLabel="Napisz w sprawie większej liczby faktur"
      microCopy="Odpisujemy w 1 dzień roboczy."
      serviceName="Faktury PDF do Excela"
      serviceDesc="Wgrywasz faktury w PDF i dostajesz arkusz Excel z numerem, datami, NIP-ami i kwotami. Do 100 faktur w miesiącu, 49 zł netto miesięcznie."
      serviceType="Automatyzacja księgowości"
    />
  );
}
