import { resolveTxt } from "node:dns/promises";
import { NextResponse } from "next/server";

import { wyslij } from "@/lib/audyt-wyslij";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

const PRODUKT = "firma-raport";
const ZNACZNIK = "firma_wyslano";
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

async function sprawdz(sciezka: string, dom: string) {
  try {
    const r = await fetch(`https://fluxlab.pl/api/${sciezka}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ domena: dom }),
      signal: AbortSignal.timeout(90_000),
    });
    return (await r.json()) as Record<string, any>;
  } catch {
    return { status: "BRAK_ODPOWIEDZI" } as Record<string, any>;
  }
}

async function txt(nazwa: string) {
  try {
    return (await resolveTxt(nazwa)).map((x) => x.join(""));
  } catch {
    return [];
  }
}

async function poczta(dom: string) {
  const spf = (await txt(dom)).find((x) => /^v=spf1/i.test(x));
  const dmarc = (await txt(`_dmarc.${dom}`)).find((x) => /^v=DMARC1/i.test(x));
  const polityka = dmarc?.match(/p=(\w+)/i)?.[1]?.toLowerCase();
  const brak: string[] = [];
  if (!spf) brak.push("brak wpisu SPF");
  if (!dmarc) brak.push("brak wpisu DMARC");
  else if (polityka === "none")
    brak.push("DMARC działa tylko w trybie obserwacji (p=none)");
  return {
    werdykt: !spf || !dmarc ? "CZERWONY" : brak.length ? "ZOLTY" : "ZIELONY",
    naglowek: brak.length
      ? `Poczta wymaga poprawek: ${brak.join(", ")}`
      : "Poczta ma wpisy SPF i DMARC",
    opis: brak.length
      ? "Bez tych wpisów maile wysyłane z domeny firmy częściej trafiają do spamu, a ktoś obcy łatwiej podszyje się pod firmę."
      : "Domena ma wpis SPF i DMARC z aktywną polityką, co ogranicza podszywanie się i trafianie maili do spamu.",
  };
}

type Wynik = Record<string, any>;
type Kontrola = { tytul: string; w: Wynik };

const KOLOR: Record<string, string> = {
  ZIELONY: "#15803d",
  ZOLTY: "#b45309",
  CZERWONY: "#b91c1c",
};
const ETYKIETA: Record<string, string> = {
  ZIELONY: "W porządku",
  ZOLTY: "Do sprawdzenia",
  CZERWONY: "Do poprawy",
};

function tresc(w: Wynik) {
  const opis = String(w.opis ?? w.komentarz ?? "");
  return { naglowek: String(w.naglowek ?? "Brak wyniku"), opis };
}

function zloz(dom: string, k: Kontrola[]) {
  const data = new Date().toLocaleDateString("pl-PL");
  const wiersze = k.map(({ tytul, w }) => {
    const t = tresc(w);
    const kol = KOLOR[w.werdykt] ?? "#555";
    const et = ETYKIETA[w.werdykt] ?? "Brak oceny";
    return { tytul, ...t, kol, et };
  });
  const sekcje = wiersze
    .map(
      (x) =>
        `<section style="border-left:5px solid ${x.kol};padding:4px 0 4px 14px;margin:0 0 18px;break-inside:avoid"><div style="font-size:12px;font-weight:700;color:${x.kol};text-transform:uppercase;letter-spacing:.04em">${esc(x.et)}</div><h2 style="font-size:17px;margin:2px 0 4px">${esc(x.tytul)}: ${esc(x.naglowek)}</h2>${x.opis ? `<p style="margin:0;color:#333">${esc(x.opis)}</p>` : ""}</section>`,
    )
    .join("");
  const zle = wiersze.filter((x) => x.et !== "W porządku").length;
  const podsumowanie = zle
    ? `Do uwagi: ${zle} z ${wiersze.length} kontroli.`
    : `Bez uwag we wszystkich ${wiersze.length} kontrolach.`;
  const tekst = `Raport o firmie w internecie: ${dom} (${data})\n${podsumowanie}\n\n${wiersze.map((x) => `${x.et}. ${x.tytul}: ${x.naglowek}. ${x.opis}`).join("\n\n")}`;
  const cialo = `<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.5;color:#111"><h1 style="font-size:24px;margin:0">Raport o firmie w internecie</h1><p style="margin:4px 0 6px;color:#555">${esc(dom)} · ${data}</p><p style="margin:0 0 22px;font-weight:700">${esc(podsumowanie)}</p>${sekcje}<p style="margin-top:26px;font-size:12px;color:#666">To automatyczne sprawdzenie publicznie dostępnych informacji, wykonane ${data}. Fluxlab, fluxlab.pl</p></div>`;
  return { tekst, cialo, podsumowanie };
}

async function pdf(cialo: string): Promise<Buffer> {
  const puppeteer = (await import("puppeteer-core")).default;
  const przegladarka = process.env.VERCEL
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
    const strona = await przegladarka.newPage();
    await strona.setContent(`<html><body style="margin:0">${cialo}</body></html>`, {
      waitUntil: "load",
    });
    return Buffer.from(
      await strona.pdf({
        format: "A4",
        margin: { top: "18mm", bottom: "18mm", left: "16mm", right: "16mm" },
      }),
    );
  } finally {
    await przegladarka.close();
  }
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
            "Zwrot za raport o firmie: nie rozpoznaliśmy adresu strony",
            "Dzień dobry,\n\nw zamówieniu nie było poprawnego adresu strony, więc nie mogliśmy zrobić raportu. Zwróciliśmy całą kwotę. Możesz zamówić ponownie, wpisując sam adres, np. twojafirma.pl.\n\nFluxlab",
            "zwrot: zły adres",
          );
          continue;
        }

        const [dm, ht, wid, ai, pocz] = await Promise.all([
          sprawdz("sprawdz-domene", dom),
          sprawdz("sprawdz-https", dom),
          sprawdz("sprawdz-widocznosc", dom),
          sprawdz("sprawdz-ai", dom),
          poczta(dom),
        ]);
        if (
          wid.status === "BRAK_STRONY" ||
          wid.status === "BRAK_ODPOWIEDZI" ||
          ht.stronaNiedostepna === true
        ) {
          await zwrot(
            "Zwrot za raport o firmie: strona nie odpowiedziała",
            `Dzień dobry,\n\nadres ${dom} nie odpowiedział stroną, więc nie mogliśmy zrobić raportu. Zwróciliśmy całą kwotę. Po sprawdzeniu adresu możesz zamówić ponownie.\n\nFluxlab`,
            "zwrot: strona nie odpowiada",
          );
          continue;
        }

        const r = zloz(dom, [
          { tytul: "Domena", w: dm },
          { tytul: "Certyfikat", w: ht },
          { tytul: "Widoczność w wyszukiwarce", w: wid },
          { tytul: "Roboty AI", w: ai },
          { tytul: "Poczta", w: pocz },
        ]);
        const plik = await pdf(r.cialo);
        const mail = `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5;color:#111;max-width:600px"><p>Dzień dobry,</p><p>w załączniku raport o firmie w internecie dla <b>${esc(dom)}</b>. ${esc(r.podsumowanie)}</p><p>To automatyczne sprawdzenie publicznie dostępnych informacji.</p><p>Fluxlab</p></div>`;
        const ok = await wyslij(
          email,
          `Raport o firmie w internecie: ${dom}`,
          mail,
          `Raport o firmie w internecie dla ${dom} jest w załączniku. ${r.podsumowanie}`,
          undefined,
          [{ filename: `raport-${dom}.pdf`, content: plik }],
        );
        if (!ok) throw new Error("mail nie wyszedł");
        await oznacz(new Date().toISOString());
        log("raport wysłany");
      } catch (e) {
        console.error("[firma-raport]", x.id, e);
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
