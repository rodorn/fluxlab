import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Realizacje, otwarty kod i działające narzędzia | Fluxlab",
  description:
    "Publiczne repozytoria i działające prototypy Fluxlab: integracje API, automatyzacje, scraping, audyty i wideo AI. Zamiast obietnic, kod i demo.",
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
    title: "Integracje i API",
    blurb: "Łączymy systemy sprzedażowe i magazynowe.",
    items: [
      {
        name: "BaseLinker, klient API i eksport zamówień",
        desc: "Pobieranie i eksport zamówień z mapowaniem danych, testami i CI.",
        stack: ["Python", "BaseLinker API", "CI"],
        repo: `${GH}/fluxlab-baselinker-integracje`,
      },
      {
        name: "Synchronizacja BaseLinker ↔ Shopify",
        desc: "Stany z wielu magazynów w wielu lokalizacjach Shopify, z obsługą konfliktów.",
        stack: ["Python", "Shopify", "BaseLinker"],
        repo: `${GH}/fluxlab-baselinker-shopify-sync`,
      },
      {
        name: "GoHighLevel, webhook leadów",
        desc: "Leady z GoHighLevel trafiają do zewnętrznych systemów i arkuszy.",
        stack: ["Python", "Webhooki", "REST"],
        repo: `${GH}/fluxlab-ghl-integration`,
      },
      {
        name: "Integracja KSeF 2.0",
        desc: "Wysyłka i pobieranie e-faktur przez API v2 w formacie FA(3).",
        stack: ["Python", "KSeF API v2", "FA(3)"],
        repo: `${GH}/fluxlab-ksef-integracja`,
      },
    ],
  },
  {
    title: "Automatyzacja i dane",
    blurb: "Rozproszone dane zamieniamy w gotowe sygnały.",
    items: [
      {
        name: "Radar przetargów IT",
        desc: "Codzienny przegląd zapytań ofertowych z Bazy Konkurencyjności z filtrem po zakresie.",
        stack: ["Python", "Scraping", "SQLite"],
        repo: `${GH}/fluxlab-przetargi-radar`,
      },
      {
        name: "Workflow n8n, pozyskiwanie i ocena leadów",
        desc: "Przepływ łączący scraping, ocenę leadów i powiadomienia.",
        stack: ["n8n", "Python", "API"],
        repo: `${GH}/fluxlab-n8n-lead-workflow`,
      },
      {
        name: "Listings API (FastAPI)",
        desc: "Znormalizowane dane ogłoszeń udostępnione jako API.",
        stack: ["Python", "FastAPI", "REST"],
        repo: `${GH}/fluxlab-listings-api`,
      },
    ],
  },
  {
    title: "Audyty",
    blurb: "Automaty, które wskazują problem i sposób naprawy.",
    items: [
      {
        name: "Audyt dostępności WCAG 2.2",
        desc: "Skan axe z raportem PDF i oceną ryzyka względem wymogów EAA.",
        stack: ["Python", "axe", "PDF"],
        repo: `${GH}/fluxlab-wcag-audyt`,
      },
      {
        name: "Audyt feedów Merchant i Meta",
        desc: "Wykrywa odrzucenia w feedach produktowych i proponuje poprawki.",
        stack: ["Python", "XML/CSV", "e-commerce"],
        repo: `${GH}/fluxlab-merchant-feed-audit`,
      },
      {
        name: "Skaner Consent Mode v2",
        desc: "Sprawdza, czy GA4, Google Ads i Meta Pixel startują przed zgodą na cookies.",
        stack: ["Python", "Playwright", "GTM"],
        repo: `${GH}/fluxlab-consent-audit`,
      },
      {
        name: "Audyt widoczności w AI",
        desc: "Sprawdza, czy ChatGPT i Perplexity polecają markę i kogo polecają zamiast niej.",
        stack: ["Python", "GEO/AEO", "PDF"],
        repo: `${GH}/fluxlab-geo-audyt`,
      },
    ],
  },
  {
    title: "AI w praktyce",
    blurb: "Modele językowe i głos AI w konkretnych zadaniach.",
    items: [
      {
        name: "Auto-recepcja AI",
        desc: "Bot od razu odpowiada na zapytania danymi z oferty i rozpoznaje intencję klienta.",
        stack: ["Python", "FastAPI", "LLM"],
        repo: `${GH}/fluxlab-auto-recepcja`,
      },
      {
        name: "Lektor PL do filmów",
        desc: "Transkrypcja, tłumaczenie i polski głos AI podłożony pod gotowy film.",
        stack: ["Python", "ElevenLabs", "FFmpeg"],
        repo: `${GH}/fluxlab-dubbing-pl`,
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
          <Breadcrumbs href="/realizacje" items={[{ label: "Realizacje" }]} />

          <div className="max-w-3xl mx-auto text-center">
            <p className="section-label mb-3">O nas</p>
            <h1 className="h1-strony">
              Zamiast obietnic, otwarty kod i działające narzędzia
            </h1>
            <p className="mt-5 text-lg text-gray-600 dark:text-gray-300">
              Publiczne repozytoria zbudowane przez nas. Otwórz kod na GitHubie
              i oceń jakość, zanim cokolwiek zlecisz.
            </p>
          </div>

          <div className="mt-14 space-y-16">
            {GROUPS.map((group) => (
              <div key={group.title}>
                <div className="max-w-2xl mb-6">
                  <h2 className="h2-sekcji">
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
        </section>
        <CTA />
      </main>
      <Footer />
    </>
  );
}
