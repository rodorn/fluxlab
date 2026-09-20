import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import LandingForm from "@/components/LandingForm";
import TrackedCTA from "@/components/TrackedCTA";
import RelatedProducts from "@/components/RelatedProducts";

export interface Tier {
  name: string;
  price: string;
  desc: string;
  features: string[];
  featured?: boolean;
}

export interface ProductLandingProps {
  slug: string;
  /** Darmowe narzedzie renderowane tuz pod naglowkiem, przed opisem zakresu.
      Odwiedzajacy dostaje dzialajacy wynik, zanim zacznie czytac oferte. */
  tool?: ReactNode;
  breadcrumb: string;
  eyebrow: string;
  h1: string;
  lead: string;
  ctaLabel: string;
  ctaNote?: string;
  checks: { title: string; desc: string }[];
  pricing: Tier[];
  faq: { q: string; a: string }[];
  formId: string;
  formHeading: string;
  formIntro: string;
  submitLabel: string;
  microCopy: string;
  serviceName: string;
  serviceDesc: string;
  serviceType: string;
}

export default function ProductLanding(p: ProductLandingProps) {
  return (
    <>
      <Header />
      <main>
        <Breadcrumbs items={[{ label: p.breadcrumb }]} />

        <section className="container-wide pt-6 pb-14">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
              {p.eyebrow}
            </p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              {p.h1}
            </h1>
            <p className="mt-5 text-lg text-gray-600 dark:text-gray-300">
              {p.lead}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <TrackedCTA
                href="#zamow"
                location={`${p.formId}_hero`}
                className="btn-primary"
              >
                {p.ctaLabel}
              </TrackedCTA>
              {p.ctaNote && (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {p.ctaNote}
                </span>
              )}
            </div>
          </div>

          {p.tool && <div className="mt-12">{p.tool}</div>}

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {p.checks.map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/60 dark:bg-gray-900/40 p-6"
              >
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  {c.title}
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Cennik
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 max-w-3xl">
              {p.pricing.map((t) => (
                <div
                  key={t.name}
                  className={`flex flex-col rounded-2xl border p-6 ${
                    t.featured
                      ? "border-accent/60 bg-white/80 dark:bg-gray-900/60"
                      : "border-gray-200/80 dark:border-gray-800/80 bg-white/60 dark:bg-gray-900/40"
                  }`}
                >
                  {t.featured && (
                    <span className="self-start rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                      Najczęściej wybierany
                    </span>
                  )}
                  <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                    {t.name}
                  </h3>
                  <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">
                    {t.price}
                  </p>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {t.desc}
                  </p>
                  <ul className="mt-4 space-y-2">
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
                    href="#zamow"
                    className="btn-primary mt-6 w-full justify-center text-center text-sm"
                  >
                    Zamów
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Najczęstsze pytania
            </h2>
            <div className="mt-6 space-y-4">
              {p.faq.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/60 dark:bg-gray-900/40"
                >
                  <summary className="cursor-pointer p-5 text-sm font-semibold text-gray-900 dark:text-white select-none list-none [&::-webkit-details-marker]:hidden">
                    {item.q}
                  </summary>
                  <div className="px-5 pb-5 text-sm text-gray-600 dark:text-gray-400">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
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
            offers: p.pricing.map((t) => ({
              "@type": "Offer",
              name: t.name,
              price: t.price.replace(/\D/g, ""),
              priceCurrency: "PLN",
            })),
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
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />

      <Footer />
    </>
  );
}
