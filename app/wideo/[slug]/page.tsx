import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import obsluga from "@/lib/wideo/automatyzacja-obslugi-klienta.json";
import edoreczenia from "@/lib/wideo/e-doreczenia-w-firmie.json";
import ksef2027 from "@/lib/wideo/ksef-2027-przewodnik.json";

type Wideo = {
  slug: string;
  tytul: string;
  youtubeId: string | null;
  dlugosc: number;
  opis: string;
  rozdzialy: { tytul: string; od: number; akapity: string[] }[];
};

const WIDEO: Record<string, Wideo> = {
  [obsluga.slug]: obsluga as Wideo,
  [edoreczenia.slug]: edoreczenia as Wideo,
  [ksef2027.slug]: ksef2027 as Wideo,
};

const POWIAZANE: Record<string, { href: string; nazwa: string }[]> = {
  "automatyzacja-obslugi-klienta": [
    {
      href: "/czas-reakcji-na-leada",
      nazwa: "Jak skrócić czas reakcji na zapytanie",
    },
    {
      href: "/automatyzacja-procesow-biznesowych",
      nazwa: "Automatyzacja procesów w firmie",
    },
    { href: "/automatyzacja-follow-up", nazwa: "Automatyzacja follow-upów" },
  ],
  "e-doreczenia-w-firmie": [
    {
      href: "/e-doreczenia-integracja",
      nazwa: "Sprawdź, czy spółka ma adres do e-Doręczeń",
    },
    {
      href: "/strefa-wiedzy/e-doreczenia-adres-prywatny-i-firmowy",
      nazwa: "Adres do e-Doręczeń: prywatny a firmowy",
    },
  ],
  "ksef-2027-przewodnik": [
    { href: "/ksef-2027", nazwa: "KSeF 2027 dla małej firmy" },
    { href: "/numer-ksef", nazwa: "Sprawdź numer KSeF faktury" },
    {
      href: "/sprawdz-kontrahenta",
      nazwa: "Sprawdź kontrahenta przed przelewem",
    },
  ],
};

const KANAL = "https://www.youtube.com/channel/UC2SCC43QCFkncFMNK1AxXfA";

const czas = (s: number) =>
  `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

export function generateStaticParams() {
  return Object.keys(WIDEO).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const w = WIDEO[(await params).slug];
  if (!w) return {};
  const title = `${w.tytul} (wideo z transkrypcją) | Fluxlab`;
  return {
    title,
    description: w.opis,
    openGraph: {
      title,
      description: w.opis,
      locale: "pl_PL",
      type: "video.other",
    },
    alternates: { canonical: `/wideo/${w.slug}` },
  };
}

export default async function WideoStrona({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const w = WIDEO[(await params).slug];
  if (!w) notFound();
  const powiazane = POWIAZANE[w.slug] ?? [];

  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs
          href={`/wideo/${w.slug}`}
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Wideo" },
          ]}
        />

        <section className="pt-16 pb-6">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <span className="section-label">Wideo z transkrypcją</span>
            <h1 className="h1-artykulu mt-4">{w.tytul}</h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              {w.opis}
            </p>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-6 lg:px-8 pb-16">
          {w.youtubeId ? (
            <div className="aspect-video overflow-hidden rounded-xl border border-gray-200 dark:border-white/10">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${w.youtubeId}`}
                title={w.tytul}
                loading="lazy"
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <p className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-gray-300">
              Film ukazuje się na{" "}
              <a href={KANAL} className="text-accent hover:underline">
                kanale FluxLab na YouTube
              </a>
              . Poniżej pełny tekst z podziałem na rozdziały.
            </p>
          )}

          <nav aria-label="Rozdziały" className="mt-10">
            <h2 className="h2-sekcji mb-4">Rozdziały</h2>
            <ol className="grid gap-1 sm:grid-cols-2">
              {w.rozdzialy.map((r, i) => (
                <li key={r.tytul}>
                  <a
                    href={`#r${i}`}
                    className="flex gap-3 rounded-lg px-2 py-1.5 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
                  >
                    <span className="w-10 shrink-0 tabular-nums text-accent">
                      {czas(r.od)}
                    </span>
                    {r.tytul}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="mt-12 prose-justify">
            <h2 className="h2-sekcji mb-6">Transkrypcja</h2>
            {w.rozdzialy.map((r, i) => (
              <section key={r.tytul} id={`r${i}`} className="mt-8 scroll-mt-24">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  <span className="mr-2 tabular-nums text-sm font-normal text-accent">
                    {czas(r.od)}
                  </span>
                  {r.tytul}
                </h3>
                {r.akapity.map((a, j) => (
                  <p
                    key={j}
                    className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed"
                  >
                    {a}
                  </p>
                ))}
              </section>
            ))}
          </article>

          {powiazane.length > 0 && (
            <aside className="mt-12 border-t border-gray-200 pt-6 dark:border-white/10">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                Czytaj dalej
              </h2>
              <ul className="mt-3 space-y-2">
                {powiazane.map((p) => (
                  <li key={p.href}>
                    <Link href={p.href} className="text-accent hover:underline">
                      {p.nazwa}
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>

        <CTA naglowek="Sprawdź, które kroki obsługi klienta w Twojej firmie zrobią się same" />
      </main>
      <Footer />
    </>
  );
}
