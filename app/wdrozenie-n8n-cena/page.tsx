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
      lead="Cztery pozycje: licencja, serwer, praca nad przepływami i opieka. Poniżej rozbijam każdą z nich na liczby, z widełkami, żeby dało się oszacować budżet bez wysyłania zapytania ofertowego."
      ctaLabel="Policz swój koszt"
      ctaNote="Kalkulator niżej, bez rejestracji"
      tool={<KalkulatorAutomatyzacji />}
      checks={[
        {
          title: "Licencja: 0 zł, jeśli stoi na własnym serwerze",
          desc: "n8n w wersji Community jest darmowy i wolno go używać komercyjnie we własnej firmie. Płatne plany chmurowe zaczynają się od 20 euro miesięcznie za 2,5 tysiąca uruchomień i 50 euro za 10 tysięcy (ceny n8n.io przy płatności rocznej, stan na wrzesień 2026). Wersja chmurowa ma sens, dopóki nie chcesz zajmować się serwerem.",
        },
        {
          title: "Serwer: 30 do 90 zł miesięcznie",
          desc: "Do większości wdrożeń wystarczy najmniejszy VPS z 2 GB pamięci. Powyżej kilkudziesięciu tysięcy uruchomień miesięcznie albo przy ciężkich przepływach z przetwarzaniem plików idzie się o jeden próg wyżej. To koszt hostingu, nie nasz.",
        },
        {
          title: "Praca: od 790 zł za pojedynczy przepływ",
          desc: "Prosty przepływ, czyli formularz albo webhook, walidacja, zapis do CRM i powiadomienie, to 790 do 1 500 zł. Przepływ z wzbogacaniem danych, rozgałęzieniami i obsługą błędów: 1 500 do 3 500 zł. Komplet startowy, czyli postawiony serwer, trzy przepływy, monitoring i przekazanie: 2 400 zł.",
        },
        {
          title: "Opieka: 190 zł miesięcznie albo zero",
          desc: "Opieka to aktualizacje, alert kiedy przepływ się wywróci, i poprawki gdy zewnętrzne API zmieni format. Nie jest obowiązkowa: dostajesz dostęp do serwera i całą konfigurację, więc możesz prowadzić to sam albo oddać komukolwiek innemu.",
        },
        {
          title: "Czego w tej cenie nie ma",
          desc: "Płatnych kont po stronie narzędzi, które spinamy, czyli CRM, bramek SMS, dostawców wzbogacania danych. Jeśli przepływ korzysta z modelu językowego, rozliczasz go u dostawcy modelu. Podajemy to osobno przed startem, żeby rachunek nie wyszedł po fakcie.",
        },
        {
          title: "Kiedy to się nie opłaca",
          desc: "Przy jednym prostym scenariuszu uruchamianym kilkadziesiąt razy w miesiącu darmowy plan Zapiera albo Make wystarczy i nie ma po co nic wdrażać. Przewaga n8n zaczyna się tam, gdzie liczba kroków razy liczba uruchomień zaczyna napędzać rachunek, albo gdy dane nie mogą wyjść poza własny serwer.",
        },
      ]}
      pricing={[
        {
          name: "Pojedynczy przepływ",
          price: "790 zł",
          desc: "Jedna konkretna uciążliwość, zdjęta z głowy.",
          features: [
            "Jeden przepływ od zdarzenia do zapisu",
            "Uruchomienie na Twoim koncie n8n albo naszym serwerze testowym",
            "Obsługa błędów i powiadomienie, gdy coś nie przejdzie",
            "Przekazanie w formie działającego pliku, bez zamknięcia u nas",
          ],
        },
        {
          name: "Komplet startowy",
          price: "2 400 zł",
          desc: "Serwer, trzy przepływy i monitoring. Najczęściej wybierane.",
          features: [
            "n8n postawiony na Twoim serwerze, z kopiami zapasowymi",
            "Trzy przepływy uzgodnione po rozmowie o procesie",
            "Alert na maila, gdy przepływ przestanie działać",
            "Dokumentacja i przekazanie dostępów",
            "Pierwszy miesiąc opieki w cenie",
          ],
          featured: true,
        },
        {
          name: "Opieka",
          price: "190 zł / mc",
          desc: "Dla tych, którzy nie chcą tego pilnować sami.",
          features: [
            "Aktualizacje n8n i serwera",
            "Reakcja, gdy zewnętrzne API zmieni format",
            "Drobne zmiany w istniejących przepływach",
            "Rezygnacja z miesiąca na miesiąc",
          ],
        },
      ]}
      faq={[
        {
          q: "Czy n8n jest darmowy?",
          a: "Wersja instalowana na własnym serwerze tak, i wolno jej używać komercyjnie do własnych procesów. Płatne są plany chmurowe prowadzone przez n8n oraz licencja Enterprise z funkcjami typu SSO. Praktycznie: licencja to zwykle 0 zł, a płacisz za serwer i za pracę.",
        },
        {
          q: "Ile trwa wdrożenie?",
          a: "Pojedynczy przepływ to zwykle dwa, trzy dni robocze od momentu, w którym mamy dostępy. Komplet startowy z trzema przepływami: od jednego do dwóch tygodni. Najwięcej czasu zajmuje nie budowa, tylko ustalenie, co ma się dziać w sytuacjach nietypowych.",
        },
        {
          q: "Dlaczego nie podajesz jednej ceny?",
          a: "Bo różnica między przepływem na trzy kroki a przepływem, który wzbogaca dane, rozgałęzia się po warunkach i musi umieć ponowić nieudane wywołanie, to różnica kilkukrotna. Widełki są uczciwsze niż jedna liczba, którą i tak trzeba by potem korygować.",
        },
        {
          q: "Co, jeśli po wdrożeniu zechcę to przenieść gdzie indziej?",
          a: "Przepływy n8n to pliki, które dostajesz razem z dostępem do serwera. Nie ma tu żadnego naszego panelu, do którego trzeba mieć konto. Możesz to prowadzić sam albo przekazać komuś innemu i nie potrzebujesz do tego naszej zgody.",
        },
        {
          q: "Czym to się różni od Zapiera i Make?",
          a: "Modelem rozliczenia i miejscem, w którym leżą dane. Zapier i Make liczą każdy krok scenariusza osobno, więc rachunek rośnie razem z ruchem. n8n na własnym serwerze ma koszt stały. Kalkulator wyżej pokazuje, przy jakiej skali ta różnica przestaje być teoretyczna.",
        },
      ]}
      formId="wycena_n8n"
      formHeading="Opisz proces, odeślemy widełki"
      formIntro="Napisz, co dziś dzieje się ręcznie: skąd wpadają dane, kto je przeklepuje i co ma się stać na końcu. Odeślemy widełki i informację, czy da się to zrobić taniej niż w n8n, jeśli tak jest."
      submitLabel="Poproś o wycenę"
      microCopy="Odpisujemy zwykle tego samego dnia. Bez rozmowy telefonicznej, jeśli nie chcesz."
      serviceName="Wdrożenie n8n"
      serviceDesc="Postawienie n8n na własnym serwerze i zbudowanie przepływów automatyzujących obsługę leadów, synchronizację danych i raportowanie."
      serviceType="Automatyzacja procesów biznesowych"
    />
  );
}
