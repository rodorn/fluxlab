import Link from "next/link";

const links = [
  { href: "/strony-www", label: "Strony WWW" },
  { href: "/automatyzacja-leadow-crm", label: "Automatyzacja" },
  { href: "/scraping-danych", label: "Dane" },
  { href: "/jak-pracuje", label: "Jak pracuję" },
  { href: "/strefa-wiedzy", label: "Strefa wiedzy" },
  { href: "/narzedzia", label: "Narzędzia" },
  { href: "/pilotaz", label: "Program case study" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 dark:border-gray-800 py-8">
      <div className="container-wide">
        <div className="flex flex-wrap items-start justify-between gap-x-10 gap-y-5">
          <div>
            <span className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">
              flux<span className="text-accent">lab</span>
            </span>
            <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
              Strony, automatyzacja, dane dla firm B2B
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-accent transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="border-t border-gray-100 dark:border-gray-800 mt-6 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            © {new Date().getFullYear()} Fluxlab. Wszelkie prawa zastrzeżone.
          </p>
          <div className="flex gap-4">
            <Link
              href="/polityka-prywatnosci"
              className="text-xs text-gray-400 dark:text-gray-500 hover:text-accent transition-colors"
            >
              Polityka prywatności
            </Link>
            <Link
              href="/regulamin"
              className="text-xs text-gray-400 dark:text-gray-500 hover:text-accent transition-colors"
            >
              Regulamin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
