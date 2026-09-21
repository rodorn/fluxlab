import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import TrackedCTA from "@/components/TrackedCTA";

export const metadata: Metadata = {
  title: "Realizacje, otwarty kod i działające narzędzia | Fluxlab",
  description:
    "Publiczne repozytoria i działające prototypy Fluxlab: integracje API, automatyzacje, scraping, audyty i wideo AI. Zamiast obietnic, kod i live demo do obejrzenia.",
  alternates: { canonical: "/realizacje" },
  openGraph: {
    title: "Realizacje, otwarty kod i działające narzędzia | Fluxlab",
    description:
      "Publiczne repozytoria i działające prototypy Fluxlab: integracje API, automatyzacje, scraping, audyty i wideo AI.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, Realizacje",
      },
    ],
  },
};

interface Repo {
  name: string;
  desc: string;
  stack: string[];
  repo: string;
  live?: string;
  landing?: string;
}

interface Group {
  title: string;
  blurb: string;
  items: Repo[];
}

const GH = "https://github.com/rodorn";

const GROUPS: Group[] = [
  {
    title: "Produkty i narzędzia",
    blurb:
      "Gotowe narzędzia, które rozwiązują konkretny, policzalny problem, z działającym kodem i przykładowym raportem.",
    items: [
      {
        name: "Sprawdź auto przed zakupem",
        desc: "Raport due-diligence dla kupującego: benchmark ceny wobec podobnych ofert, checklista typowych usterek modelu, wykrywanie red-flag (niespójny przebieg, cofnięty licznik) i gotowy skrypt negocjacji.",
        stack: ["Python", "Otomoto", "PDF"],
        repo: `${GH}/fluxlab-auto-due-diligence`,
        landing: "/sprawdz-auto",
      },
      {
        name: "ImportRadar DE/NL → PL",
        desc: "Radar okazji importowych: skanuje żywe oferty z DE/NL i pokazuje, które konkretne auta realnie zarabiają po odjęciu wszystkich kosztów sprowadzenia, plus modele z kosztownymi usterkami do unikania.",
        stack: ["Python", "Kalkulator", "PDF"],
        repo: `${GH}/fluxlab-import-radar`,
        landing: "/import-radar",
      },
      {
        name: "Radar przetargów IT (Baza Konkurencyjności)",
        desc: "Monitoring unijnie finansowanych zapytań ofertowych IT z filtrem po zakresie i wymogu referencji oraz codziennym digestem, bez przeoczonych terminów.",
        stack: ["Python", "Scraping", "SQLite"],
        repo: `${GH}/fluxlab-przetargi-radar`,
      },
      {
        name: "Audyt zmarnowanego budżetu Google Ads",
        desc: "Analiza raportu wyszukiwanych haseł: ile budżetu idzie na frazy bez konwersji, gotowa lista wykluczeń i nocny skrypt-strażnik utrzymujący konto.",
        stack: ["Python", "Google Ads", "PDF"],
        repo: `${GH}/fluxlab-ads-wasted-spend`,
        landing: "/audyt-google-ads",
      },
      {
        name: "Kalkulatory lead-gen (osadzalne)",
        desc: "Gotowe kalkulatory do osadzenia na stronie klienta (oszczędności PV i pompa/EV oraz forma opodatkowania JDG), które liczą wynik i zbierają leada. Branding klienta przez jeden plik.",
        stack: ["JavaScript", "Lead-gen", "iframe"],
        repo: `${GH}/fluxlab-kalkulatory`,
        live: "https://rodorn.github.io/fluxlab-kalkulatory/",
      },
      {
        name: "Radar naborów dotacyjnych",
        desc: "Monitoring nowych naborów UE i krajowych z filtrem po specjalizacji (region, typ beneficjenta, tematyka) i codziennym digestem z terminami, dla firm doradztwa dotacyjnego.",
        stack: ["Python", "Scraping", "SQLite"],
        repo: `${GH}/fluxlab-radar-dotacji`,
      },
    ],
  },
  {
    title: "Integracje i API",
    blurb:
      "Łączenie systemów sprzedażowych i magazynowych: BaseLinker, Shopify, GoHighLevel, KSeF.",
    items: [
      {
        name: "BaseLinker, klient API i eksport zamówień",
        desc: "Podwykonawstwo integracji BaseLinker w Pythonie: pobieranie i eksport zamówień, mapowanie danych, testy i CI.",
        stack: ["Python", "BaseLinker API", "CI"],
        repo: `${GH}/fluxlab-baselinker-integracje`,
      },
      {
        name: "Synchronizacja BaseLinker ↔ Shopify (multi-magazyn)",
        desc: "Synchronizacja stanów z wielu magazynów do wielu Shopify Locations, z obsługą konfliktów i logowaniem.",
        stack: ["Python", "Shopify", "BaseLinker"],
        repo: `${GH}/fluxlab-baselinker-shopify-sync`,
      },
      {
        name: "GoHighLevel, webhook leadów i integracje",
        desc: "Odbiór leadów z GoHighLevel przez webhook i przekazywanie do zewnętrznych systemów oraz arkuszy.",
        stack: ["Python", "Webhooki", "REST"],
        repo: `${GH}/fluxlab-ghl-integration`,
      },
      {
        name: "Integracja KSeF 2.0",
        desc: "Obsługa Krajowego Systemu e-Faktur (API v2, format FA(3)), wysyłka i pobieranie faktur.",
        stack: ["Python", "KSeF API v2", "FA(3)"],
        repo: `${GH}/fluxlab-ksef-integracja`,
      },
    ],
  },
  {
    title: "Automatyzacja i dane",
    blurb:
      "Scraping, scoring i przepływy, które zamieniają rozproszone dane w gotowe do działania sygnały.",
    items: [
      {
        name: "Deal-alerts, silnik płatnego feedu",
        desc: "Scraper + scoring okazji + model subskrypcji: wykrywanie i dystrybucja alertów o okazjach.",
        stack: ["Python", "Scraping", "Scoring"],
        repo: `${GH}/fluxlab-deal-alerts-bot`,
      },
      {
        name: "Monitor licytacji komorniczych",
        desc: "Monitoring licytacji ruchomości z automatycznym scoringiem opłacalności okazji.",
        stack: ["Python", "Scraping", "Dane"],
        repo: `${GH}/fluxlab-licytacje-monitor`,
      },
      {
        name: "Listings API (FastAPI)",
        desc: "Znormalizowane dane ogłoszeń jako API, gotowe pod publikację na RapidAPI Hub.",
        stack: ["Python", "FastAPI", "REST"],
        repo: `${GH}/fluxlab-listings-api`,
      },
      {
        name: "Workflow n8n, pozyskiwanie i ocena leadów",
        desc: "Gotowy przepływ n8n łączący scraping, ocenę leadów i powiadomienia.",
        stack: ["n8n", "Python", "API"],
        repo: `${GH}/fluxlab-n8n-lead-workflow`,
      },
    ],
  },
  {
    title: "Audyty",
    blurb:
      "Automatyczne audyty, które wskazują konkretne problemy i sposób ich naprawy.",
    items: [
      {
        name: "Audyt dostępności WCAG 2.2",
        desc: "Skan dostępności (axe) z raportem HTML/PDF i oceną ryzyka względem wymogów EAA.",
        stack: ["Python", "axe", "PDF"],
        repo: `${GH}/fluxlab-wcag-audyt`,
      },
      {
        name: "Audyt feedów Merchant / Meta Catalog",
        desc: "Parser i audyt feedów produktowych Google Merchant i Meta Catalog z wykrywaniem odrzuceń i auto-poprawkami.",
        stack: ["Python", "XML/CSV", "e-commerce"],
        repo: `${GH}/fluxlab-merchant-feed-audit`,
      },
      {
        name: "Audyt martwych ofert (404 na 301)",
        desc: "Crawler wykrywa karty ofert zwracające 404 zamiast 301, linki prowadzące w pustkę i błędy sitemap, generuje gotową mapę przekierowań (nginx/.htaccess) i dowód PDF.",
        stack: ["Python", "SEO", "Redirects"],
        repo: `${GH}/fluxlab-dead-listings`,
      },
      {
        name: "Skaner Consent Mode v2 (zgody cookie)",
        desc: "Wchodzi na stronę bez klikania bannera i wykrywa, czy tagi GA4, Google Ads i Meta Pixel odpalają się przed zgodą, ocenia konfigurację Consent Mode i daje dowód PDF.",
        stack: ["Python", "Playwright", "GTM"],
        repo: `${GH}/fluxlab-consent-audit`,
      },
      {
        name: "Audyt Wizytówki Google (local pack)",
        desc: "Porównuje firmę z konkurentami w mapce Google (opinie, zdjęcia, Posty, odpowiedzi na opinie), wskazuje luki i konkretne poprawki, raport PDF.",
        stack: ["Python", "Local SEO", "PDF"],
        repo: `${GH}/fluxlab-wizytowka-audyt`,
      },
      {
        name: "Audyt GEO/AEO (widoczność w AI)",
        desc: "Sprawdza, czy ChatGPT, Perplexity i Google AI Overviews polecają markę na zapytania zakupowe, kogo polecają zamiast niej, i z jakich źródeł, z dowodem w PDF.",
        stack: ["Python", "GEO/AEO", "PDF"],
        repo: `${GH}/fluxlab-geo-audyt`,
      },
    ],
  },
  {
    title: "Wideo AI i prototypy",
    blurb:
      "Generowanie treści wideo z lektorem AI oraz interaktywne prototypy produktowe.",
    items: [
      {
        name: "Faceless AI video, pełny potok",
        desc: "Scenariusz → lektor AI (ElevenLabs, polski głos) → napisy → montaż FFmpeg → gotowy pionowy klip 9:16, z opcją tła wideo.",
        stack: ["Python", "ElevenLabs", "FFmpeg"],
        repo: `${GH}/fluxlab-faceless-ai-video`,
      },
      {
        name: "PMGMOTO+, prototyp aplikacji mobilnej",
        desc: "Premium prototyp PWA (cyfrowy garaż / prywatne biuro motoryzacyjne), 5 ekranów, do obejrzenia na żywo.",
        stack: ["PWA", "UI/UX", "Prototyp"],
        repo: `${GH}/fluxlab-pmgmoto-plus`,
        live: "https://rodorn.github.io/fluxlab-pmgmoto-plus/",
      },
      {
        name: "Lektor / dubbing PL do filmów klienta",
        desc: "Bierze gotowy film klienta, robi transkrypcję, tłumaczy na polski i podkłada profesjonalny głos AI z duckingiem pod oryginał, oddaje gotowy plik MP4.",
        stack: ["Python", "ElevenLabs", "FFmpeg"],
        repo: `${GH}/fluxlab-dubbing-pl`,
      },
      {
        name: "Fabryka wideo-reklam produktowych",
        desc: "Z karty produktu robi krótkie wideo-reklamy 9:16 w trzech wariantach A/B (hook, lektor, napisy, CTA) plus wyszukiwarka sklepów palących budżet na statykach (Meta Ad Library).",
        stack: ["Python", "FFmpeg", "Ads"],
        repo: `${GH}/fluxlab-video-reklamy`,
      },
      {
        name: "Auto-recepcja AI dla komisu",
        desc: "Bot odpowiada natychmiast na zapytania kupujących z twardymi danymi oferty i wykrytą intencją (rezerwacja, oględziny, zamiana, finansowanie), z live demo na autach komisu.",
        stack: ["Python", "FastAPI", "LLM"],
        repo: `${GH}/fluxlab-auto-recepcja`,
      },
    ],
  },
];

export default function RealizacjePage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <section className="container-wide py-14 md:py-20">
          <Breadcrumbs items={[{ label: "Realizacje" }]} />

          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
              Realizacje
            </p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              Zamiast obietnic, otwarty kod i działające narzędzia
            </h1>
            <p className="mt-5 text-lg text-gray-600 dark:text-gray-300">
              Poniżej publiczne repozytoria i prototypy Fluxlab. Każdy projekt
              możesz otworzyć na GitHubie i ocenić jakość kodu, zanim cokolwiek
              zlecisz. To są rzeczy zbudowane przeze mnie, nie opisy cudzych
              wdrożeń ani referencje, których nie mam.
            </p>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Osobno rozpisuję{" "}
              <Link
                href="/case-study"
                className="text-accent hover:underline font-medium"
              >
                modelowe przepływy z policzonym czasem
              </Link>
              , czyli ile minut zajmuje obsługa leada i tygodniowy raport przed
              automatyzacją i po niej, czynność po czynności.
            </p>
          </div>

          <div className="mt-14 space-y-16">
            {GROUPS.map((group) => (
              <div key={group.title}>
                <div className="max-w-2xl mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {group.title}
                  </h2>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    {group.blurb}
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  {group.items.map((item) => (
                    <div
                      key={item.repo}
                      className="flex flex-col rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/60 dark:bg-gray-900/40 p-6 transition-colors hover:border-accent/50"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {item.name}
                      </h3>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 grow">
                        {item.desc}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.stack.map((s) => (
                          <span
                            key={s}
                            className="inline-block rounded-full bg-gray-100 dark:bg-gray-800 px-2.5 py-1 text-xs font-medium text-gray-600 dark:text-gray-300"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                      <div className="mt-5 flex flex-wrap items-center gap-4">
                        {item.landing && (
                          <Link
                            href={item.landing}
                            className="text-sm font-semibold text-accent hover:underline"
                          >
                            Zamów / szczegóły →
                          </Link>
                        )}
                        <a
                          href={item.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-sm font-semibold hover:underline ${
                            item.landing
                              ? "text-gray-900 dark:text-white"
                              : "text-accent"
                          }`}
                        >
                          Kod na GitHubie →
                        </a>
                        {item.live && (
                          <a
                            href={item.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-semibold text-gray-900 dark:text-white hover:underline"
                          >
                            Zobacz na żywo →
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-gray-50/60 dark:bg-gray-900/40 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Masz proces, który da się zautomatyzować?
            </h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Zacznę od bezpłatnej diagnozy i darmowego dowodu na wąskim
              wycinku, żebyś zobaczył efekt, zanim cokolwiek zlecisz.
            </p>
            <div className="mt-6">
              <TrackedCTA
                href="/kontakt"
                location="realizacje_cta"
                className="btn-primary"
              >
                Bezpłatna diagnoza
              </TrackedCTA>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
