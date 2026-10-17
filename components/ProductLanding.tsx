import type { ReactNode } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import LandingForm from "@/components/LandingForm";
import RelatedProducts from "@/components/RelatedProducts";
import NazwaNarzedzia from "@/components/NazwaNarzedzia";
import { cenaWejscia } from "@/lib/products";
import { kotwica } from "@/lib/kotwica";
import { zLinkami, type LinkWTekscie } from "@/lib/zLinkami";
import FaqOtwieracz from "@/components/FaqOtwieracz";

export interface Tier {
  name: string;
  price: string;
  desc: string;
  features: string[];
  featured?: boolean;
  /** Opłata miesięczna pokazana osobno pod ceną jednorazową. */
  monthly?: string;
  /** Cena przed promocją, pokazana jako przekreślona. */
  oldPrice?: string;
  /** Plakietka nad nazwą, np. „Faza beta”. */
  badge?: string;
  /** Dokąd prowadzi przycisk, domyślnie do formularza na dole. */
  href?: string;
  cta?: string;
}

export interface ProductLandingProps {
  slug: string;
  /** Darmowe narzedzie renderowane tuz pod naglowkiem, przed opisem zakresu.
      Odwiedzajacy dostaje dzialajacy wynik, zanim zacznie czytac oferte. */
  tool?: ReactNode;
  /** Własny tekst ceny w nagłówku zamiast wyliczonego „Od X zł netto”. */
  cena?: string;
  breadcrumb: string;
  /** Nieużywane: etykieta nad h1 wynika z `typ`. Zostaje dla zgodności wywołań. */
  eyebrow?: string;
  /** Rodzaj strony: etykieta „Narzędzie” albo „Usługa”. Domyślnie z obecności `tool`. */
  typ?: "narzedzie" | "usluga";
  h1: string;
  lead: string;
  ctaLabel: string;
  ctaNote?: string;
  checks: { title: string; desc: ReactNode }[];
  /** Zdania z odnosnikiem do pokrewnej strony, wstawiane pod opisem zakresu. */
  powiazane?: { przed: string; kotwica: string; href: string; po: string }[];
  pricing: Tier[];
  faq: { q: string; a: string; linki?: LinkWTekscie[] }[];
  formId: string;
  /** Dodatkowy blok pod formularzem, na przykład płatny wariant narzędzia. */
  poFormularzu?: ReactNode;
  formHeading: string;
  formIntro: string;
  submitLabel: string;
  microCopy: string;
  serviceName: string;
  serviceDesc: string;
  serviceType: string;
}

/**
 * Poziom cennika zamieniony na `Offer` w schema.org.
 *
 * Wczesniej bylo tu `t.price.replace(/\D/g, "")`, czyli sklejenie wszystkich
 * cyfr z napisu i podanie ich jako ceny stalej. To zglaszalo "od 490 zl" jako
 * cene 490 zl, abonament "99 zl/mc" jako jednorazowe 99 zl, udzial "25
 * procent" jako 25 zl, a dla poziomu opisanego samymi slowami dalo by pusty
 * napis w polu `price`, czyli znacznik nie do odczytania.
 */
function oferta(t: Tier) {
  const kwota = cenaWejscia(t.price);
  const podstawa = { "@type": "Offer", name: t.name };
  // Poziom bez kwoty w zlotowkach, na przyklad udzial procentowy: lepiej nie
  // podac ceny wcale, niz podac zmyslona.
  if (kwota === null || !/zł/.test(t.price)) return podstawa;

  const widelki = /\bod\b/.test(t.price);
  const miesiecznie = /\/\s?(mc|mies)|miesi/.test(t.price);
  return {
    ...podstawa,
    priceSpecification: {
      "@type": miesiecznie ? "UnitPriceSpecification" : "PriceSpecification",
      [widelki ? "minPrice" : "price"]: kwota,
      priceCurrency: "PLN",
      ...(miesiecznie
        ? {
            referenceQuantity: {
              "@type": "QuantitativeValue",
              value: 1,
              unitCode: "MON",
            },
          }
        : {}),
    },
  };
}

/** Najniższa cena z cennika jako jedno zdanie, np. „Od 1 490 zł netto”. */
function cenaOd(pricing: Tier[]): string | null {
  const kwoty = pricing
    .filter((t) => /zł/.test(t.price) && !/\/\s?(mc|mies)|miesi/.test(t.price))
    .map((t) => cenaWejscia(t.price))
    .filter((k): k is number => k !== null && k > 0);
  if (!kwoty.length) return null;
  return `Od ${String(Math.min(...kwoty)).replace(/\B(?=(\d{3})+$)/g, "\u00a0")} zł netto`;
}

export default function ProductLanding(p: ProductLandingProps) {
  const typ = p.typ ?? (p.tool ? "narzedzie" : "usluga");
  const etykietaTypu = typ === "narzedzie" ? "Narzędzie" : "Usługa";
  const narzedzieNajpierw = Boolean(p.tool) && typ === "narzedzie";
  const narzedzie = p.tool && (
    <div
      id="narzedzie"
      className="mt-6 md:mt-12 scroll-mt-24 [&>*]:!mx-0 [&>*]:!max-w-none"
    >
      <NazwaNarzedzia href={`/${p.slug}`} />
      {p.tool}
    </div>
  );
  return (
    <>
      <Header />
      <main>
        <Breadcrumbs items={[{ label: p.breadcrumb }]} href={`/${p.slug}`} />

        <section className="container-wide pt-6 pb-14">
          <div className="mx-auto max-w-3xl text-center">
            <p className="section-label mb-3">{etykietaTypu}</p>
            <h1 className="h1-strony">
              {p.h1}
            </h1>
            <p className="mt-5 text-lg text-gray-600 dark:text-gray-300">
              {p.lead}
            </p>
            {(p.cena ?? cenaOd(p.pricing)) && (
              <p className="mt-4 text-base font-semibold text-gray-900 dark:text-white">
                {p.cena ?? cenaOd(p.pricing)}
              </p>
            )}
            {/* Na stronie narzędzia pierwszym krokiem jest narzędzie, na
                stronie usługi zamówienie, a narzędzie stoi pod cennikiem. */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              <a href={narzedzieNajpierw ? "#narzedzie" : "#zamow"} className="btn-primary">
                {narzedzieNajpierw ? p.ctaLabel : "Napisz do nas"}
              </a>
              {p.tool && (
                <a
                  href={narzedzieNajpierw ? "#zamow" : "#narzedzie"}
                  className="text-sm font-semibold text-accent hover:underline"
                >
                  {narzedzieNajpierw ? "Napisz do nas" : p.ctaLabel} ↓
                </a>
              )}
            </div>
          </div>

          {narzedzieNajpierw && narzedzie}

          <div className="mt-16">
            <h2 className="h2-sekcji text-center">Cennik</h2>
            <div
              className={`mt-8 grid gap-6 md:grid-cols-2 ${p.pricing.length === 3 ? "lg:grid-cols-3" : ""}`}
            >
              {p.pricing.map((t) => (
                <div
                  key={t.name}
                  className={`flex flex-col rounded-2xl border p-6 ${
                    t.featured
                      ? "border-accent/60 bg-white/80 dark:bg-gray-900/60"
                      : "border-gray-200/80 dark:border-gray-800/80 bg-white/60 dark:bg-gray-900/40"
                  }`}
                >
                  {/* Miejsce na plakietkę we wszystkich kartach, żeby ceny stały w jednej linii. */}
                  {p.pricing.some((x) => x.badge) && (
                    <div className="h-7">
                      {t.badge && (
                        <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                          {t.badge}
                        </span>
                      )}
                    </div>
                  )}
                  <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                    {t.name}
                  </h3>
                  <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">
                    {t.oldPrice && (
                      <s className="mr-3 text-xl font-semibold text-gray-400 dark:text-gray-500">
                        {t.oldPrice}
                      </s>
                    )}
                    {t.price}
                  </p>
                  {t.monthly && (
                    <>
                      <p className="mt-1 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        wdrożenie jednorazowo
                      </p>
                      <p className="mt-3 text-xl font-bold text-gray-900 dark:text-white">
                        + {t.monthly}
                      </p>
                      <p className="mt-1 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        abonament
                      </p>
                    </>
                  )}
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {t.desc}
                  </p>
                  <ul className="mt-4 space-y-2 flex-1">
                    {t.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                      >
                        <svg
                          className="mt-0.5 flex-shrink-0 text-accent"
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M2.5 7l3 3 6-6"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="leading-snug">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={t.href ?? "#zamow"}
                    className="btn-primary mt-6 w-full justify-center text-center text-sm"
                  >
                    {t.cta ?? "Zamawiam"}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {!narzedzieNajpierw && narzedzie}

          <details className="mt-16 mx-auto max-w-3xl group">
            <summary className="cursor-pointer list-none text-center [&::-webkit-details-marker]:hidden">
              <h2 className="h2-sekcji inline">Jak to działa</h2>
              <span className="ml-3 text-sm font-semibold text-accent group-open:hidden">Rozwiń</span>
            </summary>
          <div className="sierota-md-2 mt-6 grid gap-6 md:grid-cols-2 mx-auto max-w-3xl">
            {p.checks.map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/60 dark:bg-gray-900/40 p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>

          {p.powiazane && (
            <div className="mt-8 mx-auto max-w-3xl">
              <h2 className="h2-sekcji">Powiązane</h2>
              <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              {p.powiazane.map((z) => (
                <p key={z.href}>
                  {z.przed}{" "}
                  <Link
                    href={z.href}
                    className="font-medium text-accent underline underline-offset-2"
                  >
                    {z.kotwica}
                  </Link>
                  {z.po}
                </p>
              ))}
              </div>
            </div>
          )}
          </details>

          <div className="mt-16 mx-auto max-w-3xl">
            <h2 className="h2-sekcji text-center">Pytania i odpowiedzi</h2>
            <div className="mt-6 space-y-4">
              {p.faq.map((item) => (
                <details
                  key={item.q}
                  id={kotwica(item.q)}
                  className="scroll-mt-20 group rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/60 dark:bg-gray-900/40"
                >
                  <summary className="cursor-pointer p-5 text-sm font-semibold text-gray-900 dark:text-white select-none list-none [&::-webkit-details-marker]:hidden">
                    {item.q}
                  </summary>
                  <div className="px-5 pb-5 text-sm text-gray-600 dark:text-gray-400">
                    {zLinkami(item.a, item.linki)}
                  </div>
                </details>
              ))}
            </div>
            <FaqOtwieracz />
          </div>

          <RelatedProducts slug={p.slug} />

          <div id="zamow" className="mt-16 scroll-mt-20">
            <LandingForm
              formId={p.formId}
              heading={p.formHeading}
              intro={p.formIntro}
              submitLabel={p.submitLabel}
              microCopy={p.microCopy}
            />
            {p.poFormularzu && <div className="mt-8">{p.poFormularzu}</div>}
          </div>
        </section>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: p.serviceName,
            description: p.serviceDesc,
            provider: { "@id": "https://fluxlab.pl/#organization" },
            areaServed: { "@type": "Country", name: "Polska" },
            serviceType: p.serviceType,
            url: `https://fluxlab.pl/${p.slug}`,
            offers: p.pricing.map(oferta),
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: p.faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              url: `https://fluxlab.pl/${p.slug}#${kotwica(f.q)}`,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />

      <Footer />
    </>
  );
}
