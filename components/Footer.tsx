import Link from "next/link";

import { SEKCJE, type Sekcja, type Strona } from "@/lib/sekcje";
import { categories } from "@/lib/categories";
import ZnakFl from "./ZnakFl";
import KopiujMail from "./KopiujMail";
import StatusOnline from "./StatusOnline";
import Kolofon from "./Kolofon";
import PrzelacznikDzwieku from "./PrzelacznikDzwieku";
import CzasZmiany from "./CzasZmiany";
import StopkaCta from "./StopkaCta";
import zmiany from "@/lib/zmiany.json";
import lighthouse from "@/lib/lighthouse.json";

const sekcja = (slug: string): Sekcja => SEKCJE.find((x) => x.slug === slug)!;

// Strony wewnętrzne i bez indeksu nie trafiają do stopki.
const POMIN = new Set(["/cv", "/panel", "/dziekuje"]);

const LINK = "text-sm text-gray-600 dark:text-gray-400 hover:text-accent transition-colors";
const NAGLOWEK_KOLUMNY =
  "text-sm font-semibold text-gray-900 dark:text-white hover:text-accent transition-colors";

function Kolumna({ s, children }: { s: Sekcja; children: React.ReactNode }) {
  return (
    <div>
      {s.hub ? (
        <Link href={s.hub} prefetch={false} className={NAGLOWEK_KOLUMNY}>
          {s.nazwa}
        </Link>
      ) : (
        <p className="text-sm font-semibold text-gray-900 dark:text-white">{s.nazwa}</p>
      )}
      <div className="mt-3 space-y-4">{children}</div>
    </div>
  );
}

function Lista({ strony }: { strony: { href: string; nazwa: string }[] }) {
  return (
    <ul className="space-y-1.5">
      {strony
        .filter((x) => !POMIN.has(x.href))
        .map((x) => (
          <li key={x.href}>
            <Link href={x.href} prefetch={false} className={LINK}>
              {x.nazwa}
            </Link>
          </li>
        ))}
    </ul>
  );
}

/** Kolumna z nazwami grup; szczegóły są na stronie sekcji. Pod nimi wybrane strony, które mają trafić do każdej podstrony. */
function Pogrupowana({ s, wyroznione = [] }: { s: Sekcja; wyroznione?: string[] }) {
  const strony = s.grupy.flatMap((g) => g.strony);
  const wybrane = wyroznione
    .map((href) => strony.find((x) => x.href === href))
    .filter((x): x is Strona => Boolean(x));
  return (
    <Kolumna s={s}>
      <Lista
        strony={s.grupy.map((g) => ({
          href: g.hub ?? g.strony[0]?.href ?? s.hub,
          nazwa: g.nazwa,
        }))}
      />
      {wybrane.length > 0 && (
        <div className="border-t border-gray-100 pt-3 dark:border-gray-800">
          <Lista strony={wybrane} />
        </div>
      )}
    </Kolumna>
  );
}

const USLUGI_W_STOPCE = [
  "/automatyzacja-dla-biur-rachunkowych",
  "/integracja-crm-z-erp",
  "/automatyzacja-crm-leasing",
  "/wdrozenie-n8n-cena",
];
const NARZEDZIA_W_STOPCE = [
  "/numer-ksef",
  "/ksef-2027",
  "/e-doreczenia-integracja",
  "/sprawdzenie-nip",
];

const PROFILE = [
  ["Facebook", "https://www.facebook.com/profile.php?id=61595121744837"],
  ["YouTube", "https://www.youtube.com/channel/UC2SCC43QCFkncFMNK1AxXfA"],
  ["TikTok", "https://www.tiktok.com/@fluxlab.pl"],
  ["Instagram", "https://www.instagram.com/fluxlab.pl/"],
  ["X", "https://x.com/PaweIwanek"],
  ["LinkedIn", "https://www.linkedin.com/company/fluxlab-pl"],
] as const;

export default function Footer() {
  const uslugi = sekcja("uslugi");
  const narzedzia = sekcja("narzedzia");
  const cennik = sekcja("cennik");
  const wiedza = sekcja("strefa-wiedzy");
  const oNas = sekcja("o-nas");
  const prawne = sekcja("prawne");

  const wiedzaStrony = categories.map((c) => ({
    href: `/strefa-wiedzy/kategoria/${c.slug}`,
    nazwa: c.name,
  }));

  return (
    <>
    <StopkaCta />
    <footer className="border-t border-gray-100 dark:border-gray-800 py-10">
      <div className="container-wide">
        <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
          <Pogrupowana s={uslugi} wyroznione={USLUGI_W_STOPCE} />
          <Pogrupowana s={narzedzia} wyroznione={NARZEDZIA_W_STOPCE} />
          <Kolumna s={wiedza}>
            <Lista strony={wiedzaStrony} />
          </Kolumna>
          <Kolumna s={oNas}>
            <Lista
              strony={[
                ...oNas.grupy.flatMap((g) => g.strony),
                ...cennik.grupy.flatMap((g) => g.strony),
              ]}
            />
          </Kolumna>
          <Kolumna s={prawne}>
            <Lista strony={prawne.grupy.flatMap((g) => g.strony)} />
          </Kolumna>
        </div>

        {/* Dół stopki jak u Tesli: jedna oś, drobne pozycje w rzędzie. */}
        <div className="mt-8 border-t border-gray-100 pt-6 text-center text-xs text-gray-600 dark:border-gray-800 dark:text-gray-400">
          <span className="inline-flex items-center gap-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white">
            <ZnakFl className="h-5 w-5" />
            <span>
              flux<span className="text-accent">lab</span>
            </span>
          </span>
          <p className="mx-auto mt-3 flex max-w-4xl flex-col items-center gap-y-1.5 [&_a]:inline-flex [&_a]:min-h-6 [&_a]:items-center sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-2">
            <span>Fluxlab © {new Date().getFullYear()}</span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span>Paweł Iwanek, NIP 7123336008, REGON 366862577</span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <a
              href="https://www.podatki.gov.pl/wykaz-podatnikow-vat-wyszukiwarka"
              target="_blank"
              rel="noopener"
              className="hover:text-accent transition-colors"
            >
              Sprawdź na białej liście VAT
            </a>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <KopiujMail adres="pawel@fluxlab.pl" className="hover:text-accent transition-colors" />
            <span className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 sm:basis-full sm:gap-x-2">
            {PROFILE.map(([nazwa, href], i) => (
              <span key={nazwa} className="contents">
                {i > 0 && <span aria-hidden="true" className="hidden sm:inline">·</span>}
                <a
                  href={href}
                  target="_blank"
                  rel="noopener"
                  className="hover:text-accent transition-colors"
                >
                  {nazwa}
                </a>
              </span>
            ))}
            </span>
          </p>
          <StatusOnline />
          <Kolofon />
          {/* Wynik z prawdziwego pomiaru (lib/lighthouse.json). Pokazujemy go tylko
              przy 100 we wszystkich kategoriach; link pozwala sprawdzić samemu. */}
          {[lighthouse.wydajnosc, lighthouse.dostepnosc, lighthouse.praktyki, lighthouse.seo].every((x) => x === 100) && (
            <p className="mt-2">
              <a
                href="https://pagespeed.web.dev/analysis?url=https%3A%2F%2Ffluxlab.pl%2F&form_factor=desktop"
                target="_blank"
                rel="noopener"
                className="inline-flex min-h-6 items-center gap-1.5 hover:text-accent transition-colors"
              >
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-emerald-500" />
                Lighthouse na komputerze: 100 / 100 / 100 / 100, pomiar{" "}
                {new Date(lighthouse.data).toLocaleDateString("pl-PL")}
              </a>
            </p>
          )}
          <p className="mt-2 flex flex-col items-center gap-y-1.5 [&_a]:inline-flex [&_a]:min-h-6 [&_a]:items-center sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-2">
            <Link href="/zmiany" prefetch={false} className="hover:text-accent transition-colors">
              <CzasZmiany iso={zmiany[0].data} />
            </Link>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <Link href="/jak-zbudowana" prefetch={false} className="hover:text-accent transition-colors">
              Jak zbudowana jest ta strona
            </Link>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <PrzelacznikDzwieku />
          </p>
        </div>
        {/* Znak wodny jako SVG: to grafika, nie tekst, więc nie podlega
            wymaganiom kontrastu tekstu. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1000 230"
          className="mx-auto mt-12 block w-full max-w-5xl select-none fill-gray-100 dark:fill-white/[0.04]"
        >
          <text x="500" y="195" textAnchor="middle" fontSize="285" fontWeight="700" letterSpacing="-14">
            fluxlab
          </text>
        </svg>
      </div>
    </footer>
    </>
  );
}
