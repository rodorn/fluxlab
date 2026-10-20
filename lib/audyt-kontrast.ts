/** Kontrast tekstu na stronie głównej według WCAG 2.2 AA: 4,5:1 dla zwykłego
 *  tekstu, 3:1 dla dużego. Kolory trzeba policzyć w przeglądarce (tło bywa
 *  z rodzica, gradientu albo obrazka), więc otwieramy stronę w Chromium bez
 *  okna i puszczamy regułę color-contrast z axe-core, tę samą co Lighthouse.
 *  Null, gdy przeglądarka nie wystartowała albo strona się nie otworzyła:
 *  wtedy nie wydajemy werdyktu. */

import axe from "axe-core";
import type { Browser } from "puppeteer-core";

export type Kontrast = {
  elementow: number;
  przyklady: {
    tekst: string;
    kolor: string;
    tlo: string;
    stosunek: number;
    wymagany: number;
  }[];
};

const CZAS_MS = 35_000;

async function przegladarka(): Promise<Browser> {
  const puppeteer = (await import("puppeteer-core")).default;
  if (process.env.VERCEL) {
    const chromium = (await import("@sparticuz/chromium")).default;
    return puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
    });
  }
  return puppeteer.launch({
    executablePath: process.env.CHROME_PATH ?? "/usr/bin/google-chrome-stable",
    headless: true,
  });
}

type WynikAxe = {
  violations: {
    nodes: {
      any: {
        data?: {
          fgColor?: string;
          bgColor?: string;
          contrastRatio?: number;
          expectedContrastRatio?: string;
        };
      }[];
      target: unknown[];
    }[];
  }[];
};

async function zbadaj(adres: string): Promise<Kontrast> {
  const b = await przegladarka();
  try {
    const s = await b.newPage();
    await s.setViewport({ width: 1366, height: 900 });
    await s
      .goto(adres, { waitUntil: "networkidle2", timeout: 15_000 })
      .catch(() => {});
    // Animacje „pojawiania się przy przewijaniu” zaczynają od bladego tekstu,
    // więc przewijamy całą stronę i czekamy, aż się zapalą.
    await s.evaluate(async () => {
      for (let y = 0; y < Math.min(document.body.scrollHeight, 16_000); y += 400) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 250));
      }
      await new Promise((r) => setTimeout(r, 2000));
    });
    await s.addScriptTag({ content: axe.source });
    const w = (await s.evaluate(async () => {
      const a = (
        window as unknown as {
          axe: { run: (c: Document, o: object) => Promise<unknown> };
        }
      ).axe;
      return a.run(document, {
        runOnly: ["color-contrast"],
        resultTypes: ["violations"],
      });
    })) as WynikAxe;
    const wezly = w.violations.flatMap((v) => v.nodes);
    const teksty = await Promise.all(
      wezly
        .slice(0, 40)
        .map((n) =>
          s
            .$eval(String(n.target[0]), (e) =>
              (e instanceof HTMLSelectElement
                ? (e.options[e.selectedIndex]?.text ?? "")
                : (e.textContent ?? "")
              )
                .replace(/\s+/g, " ")
                .trim()
                .slice(0, 60),
            )
            .catch(() => ""),
        ),
    );
    const widziane = new Set<string>();
    const przyklady: Kontrast["przyklady"] = [];
    wezly.slice(0, 40).forEach((n, i) => {
      const d = n.any[0]?.data;
      if (!d?.fgColor || !d.bgColor || !d.contrastRatio) return;
      const klucz = `${d.fgColor}|${d.bgColor}`;
      if (widziane.has(klucz)) return;
      widziane.add(klucz);
      przyklady.push({
        tekst: teksty[i],
        kolor: d.fgColor,
        tlo: d.bgColor,
        stosunek: d.contrastRatio,
        wymagany: parseFloat(d.expectedContrastRatio ?? "4.5"),
      });
    });
    return { elementow: wezly.length, przyklady: przyklady.slice(0, 5) };
  } finally {
    await b.close().catch(() => {});
  }
}

export async function zmierzKontrast(adres: string): Promise<Kontrast | null> {
  let stop: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      zbadaj(adres),
      new Promise<null>((r) => {
        stop = setTimeout(() => r(null), CZAS_MS);
      }),
    ]);
  } catch (e) {
    console.error("audyt kontrast:", e);
    return null;
  } finally {
    clearTimeout(stop);
  }
}
