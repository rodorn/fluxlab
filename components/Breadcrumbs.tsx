import Link from "next/link";
import { sekcjaStrony, wszystkieStrony } from "@/lib/sekcje";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

/** Poziom pośredni (hub grupy albo sekcji) dla bieżącej strony, jeśli go brakuje w items. */
function poziomPosredni(
  items: BreadcrumbItem[],
  href?: string,
): BreadcrumbItem | undefined {
  let biezaca = href;
  if (!biezaca) {
    for (let i = items.length - 1; i >= 0; i--) {
      const h = items[i].href;
      if (h) {
        biezaca = h;
        break;
      }
    }
  }
  if (!biezaca) {
    const ostatni = items[items.length - 1]?.label;
    biezaca = wszystkieStrony().find((x) => x.nazwa === ostatni)?.href;
  }
  if (!biezaca) return undefined;

  const trafienie = sekcjaStrony(biezaca);
  if (!trafienie) return undefined;
  const { sekcja, grupa } = trafienie;
  const bez = biezaca.split(/[?#]/)[0].replace(/(.)\/+$/, "$1");

  let rodzic: BreadcrumbItem | undefined;
  if (grupa.hub && grupa.hub !== sekcja.hub) {
    rodzic = { label: grupa.nazwa, href: grupa.hub };
  } else if (sekcja.hub) {
    rodzic = { label: sekcja.nazwa, href: sekcja.hub };
  }
  if (!rodzic || rodzic.href === bez) return undefined;
  if (items.some((x) => x.href === rodzic!.href || x.label === rodzic!.label))
    return undefined;
  return rodzic;
}

export default function Breadcrumbs({
  items,
  kolumna,
  href,
}: {
  items: BreadcrumbItem[];
  /** Ścieżka bieżącej strony. Bez niej wnioskujemy z ostatniego elementu items z href. */
  href?: string;
  /** Szerokość kolumny nagłówka pod okruszkami: wąska (max-w-3xl) albo wąska wyśrodkowana. */
  kolumna?: "waska" | "srodek";
}) {
  const posredni = poziomPosredni(items, href);
  const fullItems: BreadcrumbItem[] = [
    { label: "Strona główna", href: "/" },
    ...(posredni ? [posredni] : []),
    ...items,
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: fullItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `https://fluxlab.pl${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Wewnątrz innego kontenera (sekcja z container-wide albo main z max-w)
          okruszki nie dokładają drugiego wcięcia ani górnego odstępu. */}
      <nav
        aria-label="Breadcrumb"
        className={`container-wide pt-20 pb-0 ${kolumna ? "max-w-3xl" : ""} [.container-wide_&]:mb-6 [.container-wide_&]:max-w-none [.container-wide_&]:px-0 [.container-wide_&]:pt-0 [main[class*='max-w-']_&]:mb-6 [main[class*='max-w-']_&]:max-w-none [main[class*='max-w-']_&]:px-0 [main[class*='max-w-']_&]:pt-0`}
      >
        <ol
          className={`flex flex-wrap items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 ${kolumna === "srodek" ? "justify-center" : ""}`}
        >
          {fullItems.map((item, index) => {
            const isFirst = index === 0;
            const isLast = index === fullItems.length - 1;
            const isMiddle = !isFirst && !isLast;
            const showEllipsis = isLast && fullItems.length > 2;
            return (
              <li
                key={index}
                className={`items-center gap-1.5 ${isMiddle ? "hidden sm:flex" : "flex"}`}
              >
                {index > 0 && (
                  <>
                    {showEllipsis && (
                      <span className="text-gray-500 dark:text-gray-400 sm:hidden">
                        …
                      </span>
                    )}
                    <span
                      className={`text-gray-500 dark:text-gray-400 ${showEllipsis ? "hidden sm:inline" : ""}`}
                    >
                      /
                    </span>
                  </>
                )}
                {item.href ? (
                  <Link
                    href={item.href}
                    className="hover:text-accent transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-gray-900 dark:text-white font-medium">
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
