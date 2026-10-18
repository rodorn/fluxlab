import Link from "next/link";

import { SEKCJE, type Sekcja } from "@/lib/sekcje";
import { categories } from "@/lib/categories";
import Znak from "./Znak";
import StatusOnline from "./StatusOnline";
import CzasZmiany from "./CzasZmiany";
import zmiany from "@/lib/zmiany.json";

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
        <Link href={s.hub} className={NAGLOWEK_KOLUMNY}>
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
            <Link href={x.href} className={LINK}>
              {x.nazwa}
            </Link>
          </li>
        ))}
    </ul>
  );
}

/** Kolumna z samymi nazwami grup; szczegóły są na stronie sekcji. */
function Pogrupowana({ s }: { s: Sekcja }) {
  return (
    <Kolumna s={s}>
      <Lista
        strony={s.grupy.map((g) => ({
          href: g.hub ?? g.strony[0]?.href ?? s.hub,
          nazwa: g.nazwa,
        }))}
      />
    </Kolumna>
  );
}

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
    <footer className="border-t border-gray-100 dark:border-gray-800 py-10">
      <div className="container-wide">
        <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
          <Pogrupowana s={uslugi} />
          <Pogrupowana s={narzedzia} />
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

        <div className="border-t border-gray-100 dark:border-gray-800 mt-8 pt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <span className="flex items-center gap-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white">
              <Znak className="h-5 w-5" />
              <span>
                flux<span className="text-accent">lab</span>
              </span>
            </span>
            <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
              Strony, automatyzacja, dane dla firm B2B
            </p>
            <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
              Paweł Iwanek, NIP 7123336008, REGON 366862577.{" "}
              <a
                href="https://www.podatki.gov.pl/wykaz-podatnikow-vat-wyszukiwarka"
                target="_blank"
                rel="noopener"
                className="underline underline-offset-2 hover:text-accent transition-colors"
              >
                Sprawdź na białej liście VAT
              </a>
            </p>
            <p className="mt-1 text-xs">
              <a
                href="mailto:pawel@fluxlab.pl"
                className="text-gray-600 dark:text-gray-400 hover:text-accent transition-colors"
              >
                pawel@fluxlab.pl
              </a>
            </p>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <a
              href="https://www.facebook.com/profile.php?id=61595121744837"
              target="_blank"
              rel="noopener"
              className="text-xs text-gray-600 dark:text-gray-400 hover:text-accent transition-colors"
            >
              Obserwuj nas na Facebooku
            </a>
            <a
              href="https://zleca.pl/wykonawca/fluxlab-strony-internetowe-i-automatyzacja-1790016801"
              target="_blank"
              rel="noopener"
              className="text-xs text-gray-600 dark:text-gray-400 hover:text-accent transition-colors"
            >
              Nasza wizytówka w Zleca.pl
            </a>
          </div>
        </div>
        <StatusOnline />
        <p className="mt-2 text-center text-xs text-gray-600 dark:text-gray-400">
          <Link href="/zmiany" className="hover:text-accent transition-colors">
            <CzasZmiany iso={zmiany[0].data} />
          </Link>
          {" · "}
          <Link href="/jak-zbudowana" className="hover:text-accent transition-colors">
            Jak zbudowana jest ta strona
          </Link>
        </p>
        <p className="mt-4 text-xs text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Fluxlab. Wszelkie prawa zastrzeżone.
        </p>
      </div>
    </footer>
  );
}
