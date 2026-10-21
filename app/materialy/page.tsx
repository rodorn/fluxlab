import fs from "fs";
import path from "path";
import type { Metadata } from "next";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Materiały PDF: checklisty i poradniki dla JDG | Fluxlab",
  description:
    "Bezpłatne checklisty i poradniki PDF dla właścicieli JDG i małych firm: KSeF 2027, forma opodatkowania, koniec roku, SEO. Bez zapisu.",
  alternates: { canonical: "/materialy" },
};

// Licznik pobrań odświeżany co 10 minut; lista plików z katalogu przy budowie.
export const revalidate = 600;

/** Opisy znanych plików. Nowy PDF w public/pobierz pojawi się i bez opisu. */
const OPISY: Record<string, { dla: string; opis: string }> = {
  "checklista-ksef-2027.pdf": { dla: "JDG", opis: "Co zrobić przed obowiązkowym KSeF, krok po kroku." },
  "ebook-ksef-2027-w-firmie.pdf": { dla: "Małe firmy", opis: "Jak KSeF zmienia wystawianie i odbieranie faktur w firmie." },
  "checklista-forma-opodatkowania-2027.pdf": { dla: "JDG", opis: "Pytania do przejścia przed wyborem formy opodatkowania." },
  "checklista-koniec-roku-jdg.pdf": { dla: "JDG", opis: "Co zamknąć przed 31 grudnia, żeby nie przepłacić." },
  "poradnik-seo-mala-firma.pdf": { dla: "Małe firmy", opis: "Jak mała firma może pojawić się wyżej w Google." },
};

type Material = { plik: string; tytul: string; stron: number | null; kb: number };

function tytulZPdf(bufor: Buffer): { tytul: string | null; stron: number | null } {
  const tekst = bufor.toString("latin1");
  const t = /\/Title\s*\(((?:[^()\\]|\\.)*)\)/.exec(tekst)?.[1] ?? null;
  const hex = /\/Title\s*<([0-9A-Fa-f\s]+)>/.exec(tekst)?.[1]?.replace(/\s/g, "");
  // Drzewo stron bywa zagnieżdżone; liczbę wszystkich stron ma korzeń, czyli największe /Count.
  const liczniki = [...tekst.matchAll(/\/Count\s+(\d+)/g)].map((m) => Number(m[1]));
  const strony = liczniki.length ? Math.max(...liczniki) : null;
  let tytul: string | null = null;
  if (t) {
    // Tytuł bywa zapisany w UTF-16BE (zaczyna się od BOM þÿ).
    const surowy = t.replace(/\\([()\\])/g, "$1");
    tytul = surowy.startsWith("þÿ")
      ? Buffer.from(surowy.slice(2), "latin1").swap16().toString("utf16le")
      : Buffer.from(surowy, "latin1").toString("utf8");
  }
  if (!tytul && hex) {
    const b = Buffer.from(hex, "hex");
    tytul = b[0] === 0xfe && b[1] === 0xff ? Buffer.from(b.subarray(2)).swap16().toString("utf16le") : b.toString("latin1");
  }
  return { tytul, stron: strony };
}

function materialy(): Material[] {
  const katalog = path.join(process.cwd(), "public", "pobierz");
  let pliki: string[] = [];
  try {
    pliki = fs.readdirSync(katalog).filter((f) => f.endsWith(".pdf"));
  } catch {
    return [];
  }
  return pliki
    .map((plik) => {
      const bufor = fs.readFileSync(path.join(katalog, plik));
      const { tytul, stron } = tytulZPdf(bufor);
      return {
        plik,
        tytul: tytul || plik.replace(/\.pdf$/, "").replace(/-/g, " "),
        stron,
        kb: Math.round(bufor.length / 1024),
      };
    })
    .sort((a, b) => a.tytul.localeCompare(b.tytul, "pl"));
}

async function pobrania(): Promise<Record<string, number>> {
  const adres = (process.env.RUCH_URL ?? "http://146.59.80.185:8087/wizyta").replace(/\/wizyta$/, "/pobrania");
  try {
    const r = await fetch(adres, { next: { revalidate: 600 }, signal: AbortSignal.timeout(4000) });
    return r.ok ? ((await r.json()) as Record<string, number>) : {};
  } catch {
    return {};
  }
}

const odmianaPobran = (n: number) =>
  n === 1 ? "pobranie" : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? "pobrania" : "pobrań";

export default async function MaterialyPage() {
  const lista = materialy();
  const liczby = await pobrania();
  return (
    <>
      <Header />
      <main className="pt-16">
        <div className="container-wide pt-10 pb-20">
          <Breadcrumbs href="/materialy" items={[{ label: "Materiały" }]} />
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mt-6 text-balance text-4xl font-bold tracking-tighter text-gray-900 dark:text-white lg:text-5xl">
              Materiały do pobrania
            </h1>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Checklisty i poradniki PDF dla właścicieli JDG i małych firm. Bez zapisu, od razu do pobrania.
            </p>
          </div>
          <ul className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2">
            {lista.map((m) => {
              const n = liczby[`/pobierz/${m.plik}`] ?? 0;
              const o = OPISY[m.plik];
              return (
                <li key={m.plik} className="flex flex-col rounded-2xl border border-gray-200 p-5 dark:border-white/10">
                  {o && (
                    <span className="text-xs font-semibold uppercase tracking-wider text-accent">{o.dla}</span>
                  )}
                  <h2 className="mt-1 text-lg font-bold text-gray-900 dark:text-white">{m.tytul}</h2>
                  {o && <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{o.opis}</p>}
                  <p className="mt-3 text-xs tabular-nums text-gray-600 dark:text-gray-400">
                    PDF{m.stron ? `, ${m.stron} ${m.stron === 1 ? "strona" : m.stron < 5 ? "strony" : "stron"}` : ""}, {m.kb >= 1024 ? `${(m.kb / 1024).toFixed(1).replace(".", ",")} MB` : `${m.kb} kB`}
                    {n > 0 && <>, {n} {odmianaPobran(n)}</>}
                  </p>
                  <a
                    href={`/pobierz/${m.plik}`}
                    download
                    className="btn-primary mt-4 self-start"
                  >
                    Pobierz PDF
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
