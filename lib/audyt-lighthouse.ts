/** Wyniki Lighthouse (te same, co w PageSpeed Insights Google) dla strony
 *  głównej, w wersji na telefon. Lighthouse działa w Chromium bez okna w naszej
 *  funkcji, więc nie zależy od klucza ani limitu API Google. Null, gdy pomiar
 *  się nie udał albo nie zdążył: wtedy nie pokazujemy wyniku. */

import type { Browser } from "puppeteer-core";

export type WynikLighthouse = {
  wydajnosc: number | null;
  dostepnosc: number | null;
  praktyki: number | null;
  seo: number | null;
  fcpMs: number | null;
  lcpMs: number | null;
  tbtMs: number | null;
  cls: number | null;
};

const CZAS_MS = 60_000;

export let ostatniBladLighthouse: string | null = null;

async function przegladarka(): Promise<Browser> {
  const puppeteer = (await import("puppeteer-core")).default;
  const port = ["--remote-debugging-port=0"];
  if (process.env.VERCEL) {
    const chromium = (await import("@sparticuz/chromium")).default;
    return puppeteer.launch({
      args: [...chromium.args, ...port],
      executablePath: await chromium.executablePath(),
      headless: true,
    });
  }
  return puppeteer.launch({
    executablePath: process.env.CHROME_PATH ?? "/usr/bin/google-chrome-stable",
    args: port,
    headless: true,
  });
}

const pkt = (s: number | null | undefined) =>
  typeof s === "number" ? Math.round(s * 100) : null;

async function zbadaj(adres: string): Promise<WynikLighthouse> {
  const b = await przegladarka();
  try {
    const port = Number(new URL(b.wsEndpoint()).port);
    const lighthouse = (await import("lighthouse")).default;
    const w = await lighthouse(adres, {
      port,
      output: "json",
      logLevel: "error",
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
    });
    const l = w?.lhr;
    if (!l) throw new Error("brak wyniku");
    const a = l.audits;
    const num = (k: string) =>
      typeof a[k]?.numericValue === "number"
        ? Math.round(a[k].numericValue as number)
        : null;
    return {
      wydajnosc: pkt(l.categories.performance?.score),
      dostepnosc: pkt(l.categories.accessibility?.score),
      praktyki: pkt(l.categories["best-practices"]?.score),
      seo: pkt(l.categories.seo?.score),
      fcpMs: num("first-contentful-paint"),
      lcpMs: num("largest-contentful-paint"),
      tbtMs: num("total-blocking-time"),
      cls:
        typeof a["cumulative-layout-shift"]?.numericValue === "number"
          ? Math.round(
              (a["cumulative-layout-shift"].numericValue as number) * 1000,
            ) / 1000
          : null,
    };
  } finally {
    await b.close().catch(() => {});
  }
}

export async function zmierzLighthouse(
  adres: string,
): Promise<WynikLighthouse | null> {
  let stop: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      zbadaj(adres),
      new Promise<null>((r) => {
        stop = setTimeout(() => r(null), CZAS_MS);
      }),
    ]);
  } catch (e) {
    console.error("audyt lighthouse:", e);
    ostatniBladLighthouse = String((e as Error)?.stack ?? e).slice(0, 600);
    return null;
  } finally {
    clearTimeout(stop);
  }
}
