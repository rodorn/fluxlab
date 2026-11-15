import axe from "axe-core";
import { NextResponse } from "next/server";

import { wyslij } from "@/lib/audyt-wyslij";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

const PRODUKT = "wcag-raport";
const ZNACZNIK = "wcag_wyslano";
const NA_RAZ = 2;

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function domena(raw: string) {
  return raw
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/[/?#].*$/, "")
    .replace(/:\d+$/, "");
}

const PL: Record<string, string> = {
  "color-contrast": "Za niski kontrast tekstu do tła",
  "image-alt": "Obrazki bez tekstu alternatywnego",
  label: "Pola formularza bez etykiety",
  "link-name": "Linki bez czytelnej nazwy",
  "button-name": "Przyciski bez nazwy",
  "html-has-lang": "Brak języka strony w znaczniku html",
  "html-lang-valid": "Niepoprawny język strony w znaczniku html",
  "document-title": "Brak tytułu strony",
  "heading-order": "Zaburzona kolejność nagłówków",
  "empty-heading": "Puste nagłówki",
  "page-has-heading-one": "Brak nagłówka pierwszego poziomu",
  "landmark-one-main": "Brak głównego obszaru treści (main)",
  region: "Treść poza obszarami strony (landmarks)",
  "link-in-text-block": "Linki w tekście odróżnione tylko kolorem",
  "meta-viewport": "Zablokowane powiększanie na telefonie",
  "frame-title": "Ramki iframe bez tytułu",
  "duplicate-id": "Powtórzone identyfikatory elementów",
  "aria-allowed-attr": "Niedozwolone atrybuty ARIA",
  "aria-required-attr": "Brak wymaganych atrybutów ARIA",
  "aria-valid-attr-value": "Błędne wartości atrybutów ARIA",
  "aria-hidden-focus": "Ukryte elementy, do których da się przejść klawiaturą",
  "select-name": "Listy rozwijane bez etykiety",
  "input-image-alt": "Przyciski-obrazki bez tekstu alternatywnego",
  "tabindex": "Dodatni tabindex zaburza kolejność klawiatury",
  "scrollable-region-focusable": "Przewijane obszary niedostępne z klawiatury",
  list: "Niepoprawna struktura list",
  listitem: "Elementy listy poza listą",
  "target-size": "Za małe obszary kliknięcia",
  bypass: "Brak linku pomijającego menu",
};

const WAGA: Record<string, string> = {
  critical: "krytyczny",
  serious: "poważny",
  moderate: "umiarkowany",
  minor: "drobny",
};

type Blad = {
  id: string;
  impact: string | null;
  help: string;
  nodes: { target: unknown[]; html: string }[];
};

async function test(adres: string): Promise<Blad[] | null> {
  const puppeteer = (await import("puppeteer-core")).default;
  const b = process.env.VERCEL
    ? await (async () => {
        const chromium = (await import("@sparticuz/chromium")).default;
        return puppeteer.launch({
          args: chromium.args,
          executablePath: await chromium.executablePath(),
          headless: true,
        });
      })()
    : await puppeteer.launch({
        executablePath:
          process.env.CHROME_PATH ?? "/usr/bin/google-chrome-stable",
        headless: true,
      });
  try {
    const s = await b.newPage();
    await s.setViewport({ width: 1366, height: 900 });
    const odp = await s
      .goto(adres, { waitUntil: "networkidle2", timeout: 25_000 })
      .catch(() => null);
    if (!odp || odp.status() >= 400) return null;
    await s.evaluate(async () => {
      for (let y = 0; y < Math.min(document.body.scrollHeight, 16_000); y += 400) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 200));
      }
      await new Promise((r) => setTimeout(r, 1500));
    });
    await s.addScriptTag({ content: axe.source });
    const w = (await s.evaluate(async () => {
      const a = (
        window as unknown as {
          axe: { run: (c: Document, o: object) => Promise<unknown> };
        }
      ).axe;
      return a.run(document, {
        runOnly: {
          type: "tag",
          values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"],
        },
        resultTypes: ["violations"],
      });
    })) as { violations: Blad[] };
    return w.violations;
  } finally {
    await b.close().catch(() => {});
  }
}

function zloz(dom: string, bledy: Blad[]) {
  const data = new Date().toLocaleDateString("pl-PL");
  const kolej = ["critical", "serious", "moderate", "minor"];
  const lista = [...bledy].sort(
    (a, b) => kolej.indexOf(a.impact ?? "minor") - kolej.indexOf(b.impact ?? "minor"),
  );
  const razem = lista.reduce((n, x) => n + x.nodes.length, 0);
  const podsumowanie = lista.length
    ? `Axe znalazł ${lista.length} rodzajów błędów w ${razem} miejscach.`
    : "Axe nie znalazł błędów w teście strony głównej.";
  const opis = (x: Blad) => PL[x.id] ?? x.help;
  const przyklad = (x: Blad) =>
    x.nodes[0]?.html.replace(/\s+/g, " ").slice(0, 140) ?? "";
  const tekst = `Raport dostępności WCAG: ${dom} (${data})\n${podsumowanie}\n\n${lista
    .map(
      (x) =>
        `- ${opis(x)} (${WAGA[x.impact ?? "minor"] ?? "drobny"}, miejsc: ${x.nodes.length}). Przykład: ${przyklad(x)}`,
    )
    .join("\n")}`;
  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5;color:#111;max-width:680px"><p>Dzień dobry,</p><p>poniżej wynik testu dostępności strony głównej <b>${esc(dom)}</b> według WCAG 2.2 AA (${data}). ${esc(podsumowanie)}</p>${
    lista.length
      ? `<ul style="padding-left:20px">${lista
          .map(
            (x) =>
              `<li style="margin:0 0 10px"><b>${esc(opis(x))}</b> (${esc(WAGA[x.impact ?? "minor"] ?? "drobny")}, miejsc: ${x.nodes.length})<br><code style="font-size:12px;color:#444">${esc(przyklad(x))}</code></li>`,
          )
          .join("")}</ul>`
      : ""
  }<p style="font-size:13px;color:#555">Test automatyczny wykrywa tylko część błędów dostępności, więc brak wyników nie oznacza zgodności z WCAG. To nie jest opinia prawna.</p><p>Fluxlab</p></div>`;
  return { tekst, html, podsumowanie };
}

async function obsluz() {
  const wyniki: { sesja: string; wynik: string }[] = [];
  let zrobione = 0;
  let po = "";
  for (let i = 0; i < 10 && zrobione < NA_RAZ; i++) {
    const s = await stripe(`checkout/sessions?status=complete&limit=100${po}`);
    for (const x of s.data) {
      if (zrobione >= NA_RAZ) break;
      const ids = String(x.metadata?.produkt ?? "")
        .split(",")
        .map((v: string) => v.trim());
      if (
        !ids.includes(PRODUKT) ||
        x.mode !== "payment" ||
        x.payment_status !== "paid"
      )
        continue;
      if (x.metadata?.[ZNACZNIK]) continue;
      zrobione++;
      const log = (wynik: string) => wyniki.push({ sesja: x.id, wynik });
      try {
        const email = x.customer_details?.email ?? "";
        const pole = (x.custom_fields ?? []).find(
          (f: { key: string }) => f.key === "dane",
        );
        const dom = domena(String(pole?.text?.value ?? ""));
        if (!email) throw new Error("brak adresu e-mail");
        const oznacz = (v: string) =>
          stripe(
            `checkout/sessions/${x.id}`,
            new URLSearchParams({ [`metadata[${ZNACZNIK}]`]: v }),
          );
        const zwrot = async (temat: string, t: string, znacznik: string) => {
          await stripe(
            "refunds",
            new URLSearchParams({ payment_intent: String(x.payment_intent) }),
          );
          await wyslij(
            email,
            temat,
            `<p>${esc(t).replace(/\n/g, "<br>")}</p>`,
            t,
          );
          await oznacz(`zwrot ${new Date().toISOString()}`);
          log(znacznik);
        };

        if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(dom)) {
          await zwrot(
            "Zwrot za raport dostępności: nie rozpoznaliśmy adresu strony",
            "Dzień dobry,\n\nw zamówieniu nie było poprawnego adresu strony, więc nie mogliśmy zrobić raportu. Zwróciliśmy całą kwotę. Możesz zamówić ponownie, wpisując sam adres, np. twojafirma.pl.\n\nFluxlab",
            "zwrot: zły adres",
          );
          continue;
        }

        const bledy = await test(`https://${dom}`).catch(() => null);
        if (!bledy) {
          await zwrot(
            "Zwrot za raport dostępności: strona nie odpowiedziała",
            `Dzień dobry,\n\nadres ${dom} nie odpowiedział stroną, więc nie mogliśmy zrobić raportu. Zwróciliśmy całą kwotę. Po sprawdzeniu adresu możesz zamówić ponownie.\n\nFluxlab`,
            "zwrot: strona nie odpowiada",
          );
          continue;
        }

        const r = zloz(dom, bledy);
        const ok = await wyslij(
          email,
          `Raport dostępności WCAG dla ${dom}`,
          r.html,
          r.tekst,
        );
        if (!ok) throw new Error("mail nie wyszedł");
        await oznacz(new Date().toISOString());
        log("raport wysłany");
      } catch (e) {
        console.error("[wcag-raport]", x.id, e);
        log(`błąd: ${e instanceof Error ? e.message : "nieznany"}`);
      }
    }
    if (!s.has_more) break;
    po = `&starting_after=${s.data[s.data.length - 1].id}`;
  }
  return wyniki;
}

export async function GET(req: Request) {
  const sekret = process.env.AUTOMAT_SEKRET;
  if (!sekret || req.headers.get("x-automat") !== sekret)
    return NextResponse.json({ error: "brak dostępu" }, { status: 401 });
  return NextResponse.json({ ok: true, wyniki: await obsluz() });
}
