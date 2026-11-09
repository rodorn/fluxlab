import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrevNextArticle from "@/components/PrevNextArticle";

export type ArtykulWideoDane = {
  slug: string;
  tytulStrony: string;
  h1: string;
  tytulKrotki: string;
  opis: string;
  lead: string;
  youtubeId?: string;
  dlugosc?: number;
  opublikowano: string;
  kategoria?: { nazwa: string; slug: string };
  sekcje: {
    h2: string;
    od?: number;
    akapity: string[];
    lista?: string[];
    tabela?: { naglowki: string[]; wiersze: string[][] };
  }[];
  faq: { q: string; a: string }[];
  cta: { naglowek: string; opis: string; etykieta: string; href: string };
};

const adres = (d: ArtykulWideoDane) => `/strefa-wiedzy/${d.slug}`;

const czas = (s: number) =>
  `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

export function metadaneArtykuluWideo(d: ArtykulWideoDane): Metadata {
  return {
    title: `${d.tytulStrony} | Fluxlab`,
    description: d.opis,
    openGraph: {
      title: d.h1,
      description: d.opis,
      locale: "pl_PL",
      type: "article",
      ...(d.youtubeId && {
        images: [
          {
            url: `https://i.ytimg.com/vi/${d.youtubeId}/hqdefault.jpg`,
            width: 480,
            height: 360,
            alt: d.h1,
          },
        ],
      }),
    },
    alternates: { canonical: adres(d) },
  };
}

export default function ArtykulWideo({ d }: { d: ArtykulWideoDane }) {
  const url = `https://fluxlab.pl${adres(d)}`;
  const film = d.youtubeId && `https://www.youtube.com/watch?v=${d.youtubeId}`;
  const kat = d.kategoria ?? { nazwa: "Wideo", slug: "wideo" };
  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs
          href={adres(d)}
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: kat.nazwa, href: `/strefa-wiedzy/kategoria/${kat.slug}` },
            { label: d.tytulKrotki },
          ]}
        />

        <section className="pt-16 pb-8">
          <div className="container-wide max-w-3xl mx-auto text-center">
            <span className="section-label">
              Strefa wiedzy · {kat.nazwa.toLowerCase()}
            </span>
            <h1 className="mt-4 h1-artykulu">{d.h1}</h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              {d.lead}
            </p>
          </div>
        </section>

        <div className="container-wide pb-16">
          <div className="max-w-3xl mx-auto">
            {film && d.dlugosc && (
              <>
                <div className="aspect-video overflow-hidden rounded-xl border border-gray-200 dark:border-white/10">
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube-nocookie.com/embed/${d.youtubeId}`}
                    title={d.h1}
                    loading="lazy"
                    allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                  Film trwa {czas(d.dlugosc)}. Niżej ten sam materiał jako
                  tekst, przy każdej części link do miejsca w filmie.
                </p>
              </>
            )}

            <nav
              aria-label="Spis treści"
              className={`${film ? "mt-10" : ""} rounded-2xl border border-gray-200 p-6 dark:border-gray-700`}
            >
              <p className="mb-3 font-semibold text-gray-900 dark:text-white">
                W artykule
              </p>
              <ol className="space-y-1.5">
                {d.sekcje.map((s, i) => (
                  <li key={s.h2}>
                    <a
                      href={`#s${i + 1}`}
                      className="text-gray-700 hover:text-accent dark:text-gray-300"
                    >
                      {s.h2}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <article className="mt-12 space-y-12 prose-justify">
              {d.sekcje.map((s, i) => (
                <section key={s.h2} id={`s${i + 1}`} className="scroll-mt-24">
                  <h2 className="mb-4 h2-sekcji">{s.h2}</h2>
                  {s.akapity.map((a, j) => (
                    <p
                      key={j}
                      className="mt-4 first:mt-0 text-gray-600 dark:text-gray-400 leading-relaxed"
                    >
                      {a}
                    </p>
                  ))}
                  {s.lista && (
                    <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-600 dark:text-gray-400">
                      {s.lista.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  )}
                  {s.tabela && (
                    <div className="mt-6 overflow-x-auto">
                      <table className="w-full min-w-[36rem] text-left text-sm text-gray-600 dark:text-gray-400">
                        <thead className="text-gray-900 dark:text-white">
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            {s.tabela.naglowki.map((h, k) => (
                              <th key={k} className="py-2 pr-4 font-semibold align-bottom">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {s.tabela.wiersze.map((w) => (
                            <tr key={w[0]} className="border-b border-gray-100 dark:border-gray-800">
                              {w.map((k, n) =>
                                n === 0 ? (
                                  <th key={n} className="py-2 pr-4 font-semibold text-gray-900 dark:text-white align-top">
                                    {k}
                                  </th>
                                ) : (
                                  <td key={n} className="py-2 pr-4 align-top">
                                    {k}
                                  </td>
                                ),
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  {film && s.od !== undefined && (
                    <a
                      href={`${film}&t=${s.od}s`}
                      target="_blank"
                      rel="noopener"
                      className="mt-4 inline-flex text-sm text-accent hover:underline"
                    >
                      Ta część w filmie od {czas(s.od)}
                    </a>
                  )}
                </section>
              ))}

              <section>
                <h2 className="mb-4 h2-sekcji">Pytania</h2>
                <div className="space-y-4">
                  {d.faq.map((f) => (
                    <details
                      key={f.q}
                      className="group rounded-2xl border border-gray-200 dark:border-gray-700"
                    >
                      <summary className="cursor-pointer p-6 text-gray-900 dark:text-white font-medium">
                        {f.q}
                      </summary>
                      <p className="px-6 pb-6 text-gray-600 dark:text-gray-400">
                        {f.a}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            </article>

            <div className="mt-16">
              <PrevNextArticle currentHref={adres(d)} />
            </div>
          </div>
        </div>
        <CTA
          naglowek={d.cta.naglowek}
          opis={d.cta.opis}
          etykieta={d.cta.etykieta}
          href={d.cta.href}
        />
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Article",
              headline: d.h1,
              description: d.opis,
              datePublished: d.opublikowano,
              mainEntityOfPage: url,
              author: {
                "@type": "Organization",
                name: "Fluxlab",
                url: "https://fluxlab.pl",
              },
              publisher: {
                "@type": "Organization",
                name: "Fluxlab",
                url: "https://fluxlab.pl",
              },
              ...(film &&
                d.dlugosc && {
                  video: {
                    "@type": "VideoObject",
                    name: d.h1,
                    description: d.opis,
                    thumbnailUrl: `https://i.ytimg.com/vi/${d.youtubeId}/hqdefault.jpg`,
                    uploadDate: d.opublikowano,
                    duration: `PT${Math.floor(d.dlugosc / 60)}M${d.dlugosc % 60}S`,
                    embedUrl: `https://www.youtube-nocookie.com/embed/${d.youtubeId}`,
                    contentUrl: film,
                  },
                }),
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: d.faq.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ]),
        }}
      />
    </>
  );
}
