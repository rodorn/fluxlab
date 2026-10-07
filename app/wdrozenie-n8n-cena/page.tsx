import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import KalkulatorAutomatyzacji from "@/components/KalkulatorAutomatyzacji";

export const metadata: Metadata = {
  title: "Wdrożenie n8n, cena: z czego składa się koszt | Fluxlab",
  description:
    "Ile realnie kosztuje wdrożenie n8n: licencja, serwer, praca nad przepływami i opieka. Widełki za jeden przepływ i za komplet, plus kalkulator.",
  alternates: { canonical: "/wdrozenie-n8n-cena" },
  openGraph: {
    title: "Wdrożenie n8n, cena: z czego składa się koszt | Fluxlab",
    description:
      "Licencja, serwer, praca i opieka rozbite na osobne pozycje, z widełkami. Bez zapytania ofertowego, żeby poznać rząd wielkości.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, koszt wdrożenia n8n",
      },
    ],
  },
};

export default function WdrozenieN8nCena() {
  return (
    <ProductLanding
      slug="wdrozenie-n8n-cena"
      breadcrumb="Wdrożenie n8n, cena"
      eyebrow="n8n"
      h1="Ile kosztuje wdrożenie n8n"
      lead="Cztery pozycje: licencja, serwer, praca i opieka. Każdą podajemy z widełkami, żeby budżet dało się oszacować bez zapytania ofertowego."
      ctaLabel="Policz swój koszt"
      ctaNote="Kalkulator niżej, bez rejestracji"
      tool={<KalkulatorAutomatyzacji />}
      checks={[
        {
          title: "Licencja: 0 zł na własnym serwerze",
          desc: "n8n Community jest darmowy także komercyjnie. Chmura n8n kosztuje od 20 euro miesięcznie (n8n.io, wrzesień 2026).",
        },
        {
          title: "Serwer: 30 do 90 zł miesięcznie",
          desc: "Zwykle wystarczy najmniejszy VPS z 2 GB pamięci. To koszt hostingu, nie nasz.",
        },
        {
          title: "Praca: od 790 zł za przepływ",
          desc: "Prosty przepływ to 790 do 1 500 zł, rozbudowany 1 500 do 3 500 zł. Komplet startowy z trzema przepływami: 2 400 zł.",
        },
        {
          title: "Opieka: 190 zł miesięcznie albo zero",
          desc: "Aktualizacje, alerty i poprawki po zmianach API. Nieobowiązkowa, bo dostajesz serwer i całą konfigurację.",
        },
        {
          title: "Kiedy się nie opłaca",
          desc: "Przy jednym prostym scenariuszu wystarczy darmowy plan Zapiera albo Make. n8n wygrywa przy dużym ruchu albo gdy dane muszą zostać u Ciebie.",
        },
      ]}
      pricing={[
        {
          name: "Pojedynczy przepływ",
          price: "790 zł",
          desc: "Jedna uciążliwość rozwiązana na stałe.",
          features: [
            "przepływ od zdarzenia do zapisu",
            "obsługa błędów i powiadomienie",
            "przekazanie pliku, bez zamknięcia u nas",
          ],
        },
        {
          name: "Komplet startowy",
          price: "2 400 zł",
          desc: "Serwer, trzy przepływy i monitoring.",
          features: [
            "n8n na Twoim serwerze z kopiami zapasowymi",
            "trzy przepływy uzgodnione po rozmowie",
            "alert, gdy przepływ przestanie działać",
            "pierwszy miesiąc opieki w cenie",
          ],
          featured: true,
        },
        {
          name: "Opieka",
          price: "190 zł / mc",
          desc: "Gdy nie chcesz tego pilnować sam.",
          features: [
            "aktualizacje n8n i serwera",
            "poprawki po zmianach API",
            "rezygnacja z miesiąca na miesiąc",
          ],
        },
      ]}
      faq={[
        {
          q: "Czy n8n jest darmowy?",
          a: "Wersja na własnym serwerze tak, także do użytku komercyjnego. Płacisz za serwer i za pracę.",
        },
        {
          q: "Ile trwa wdrożenie?",
          a: "Pojedynczy przepływ to dwa, trzy dni robocze od otrzymania dostępów. Komplet startowy: jeden do dwóch tygodni.",
        },
        {
          q: "Co, jeśli zechcemy to przenieść gdzie indziej?",
          a: "Przepływy to pliki, które dostajesz razem z dostępem do serwera. Możesz je prowadzić sam albo oddać komuś innemu.",
        },
        {
          q: "Czym to się różni od Zapiera i Make?",
          a: "Zapier i Make liczą każdy krok, więc rachunek rośnie z ruchem. n8n na własnym serwerze ma koszt stały.",
        },
      ]}
      formId="wycena_n8n"
      formHeading="Opisz proces, odeślemy widełki"
      formIntro="Napisz, co dziś robicie ręcznie i co ma się stać na końcu. Odeślemy widełki."
      submitLabel="Poproś o wycenę"
      microCopy="Odpisujemy zwykle tego samego dnia. Bez rozmowy telefonicznej, jeśli nie chcesz."
      serviceName="Wdrożenie n8n"
      serviceDesc="Postawienie n8n na własnym serwerze i zbudowanie przepływów automatyzujących obsługę leadów, synchronizację danych i raportowanie."
      serviceType="Automatyzacja procesów biznesowych"
    />
  );
}
