import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SEKCJE } from "@/lib/sekcje";
import { categories } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Spis stron | Fluxlab",
  description:
    "Pełny spis stron serwisu Fluxlab: usługi, narzędzia, cennik, strefa wiedzy, informacje o firmie i dokumenty.",
  alternates: { canonical: "/spis-stron" },
};

const POMIN = new Set(["/cv", "/panel", "/dziekuje", "/nie-licz-mnie", "/spis-stron"]);
const KATEGORIA = "/strefa-wiedzy/kategoria/[slug]";

export default function SpisStron() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <section className="container-wide py-14 md:py-20">
          <Breadcrumbs href="/spis-stron" items={[{ label: "Spis stron" }]} />
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Spis stron
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Wszystkie strony serwisu w jednym miejscu, pogrupowane tak jak w menu.
          </p>

          <div className="mt-12 space-y-14">
            {SEKCJE.map((sekcja) => {
              const grupy = sekcja.grupy
                .map((g) => ({
                  ...g,
                  strony: g.strony.filter((x) => x.href !== KATEGORIA && !POMIN.has(x.href) && x.href !== sekcja.hub),
                }))
                .filter((g) => g.strony.length > 0);
              const wiedza = sekcja.slug === "strefa-wiedzy";
              if (grupy.length === 0) return null;
              return (
                <section key={sekcja.slug} aria-labelledby={`s-${sekcja.slug}`}>
                  <h2
                    id={`s-${sekcja.slug}`}
                    className="text-2xl font-bold text-gray-900 dark:text-white"
                  >
                    {sekcja.hub ? (
                      <Link href={sekcja.hub} className="hover:text-accent transition-colors">
                        {sekcja.nazwa}
                      </Link>
                    ) : (
                      sekcja.nazwa
                    )}
                  </h2>
                  <div className="mt-5 grid gap-x-8 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                    {grupy.map((g) => (
                      <div key={g.nazwa}>
                        {grupy.length > 1 && (
                          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                            {g.nazwa}
                          </h3>
                        )}
                        <ul className="space-y-1.5">
                          {g.strony.map((x) => (
                            <li key={x.href}>
                              <Link
                                href={x.href}
                                className="text-sm text-gray-700 hover:text-accent dark:text-gray-300 transition-colors"
                              >
                                {x.nazwa}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        {wiedza && (
                          <>
                            <h3 className="mb-2 mt-6 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                              Kategorie artykułów
                            </h3>
                            <ul className="space-y-1.5">
                              {categories.map((c) => (
                                <li key={c.slug}>
                                  <Link
                                    href={`/strefa-wiedzy/kategoria/${c.slug}`}
                                    className="text-sm text-gray-700 hover:text-accent dark:text-gray-300 transition-colors"
                                  >
                                    {c.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
