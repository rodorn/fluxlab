import { NextResponse } from "next/server";

import { wyslij } from "@/lib/audyt-wyslij";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

const PRODUKT = "omnibus-sklep";
const ZNACZNIK = "omnibus_wyslano";
const NA_RAZ = 3;

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
  const r = await fetch(`https://fluxlab.pl/api/${sciezka}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ domena: dom }),
    signal: AbortSignal.timeout(90_000),
  });
  return (await r.json()) as Record<string, any>;
}

type Produkt = {
  nazwa: string;
  url: string;
  regularna: number;
  promocyjna: number;
  zgodny: boolean;
  powod?: string;
  obnizka: number;
};
type Wymog = { etykieta: string; waga: string; jest: boolean; brak?: string };

function raport(
  dom: string,
  ceny: Record<string, any>,
  zwroty: Record<string, any>,
) {
  const linie: string[] = [];
  const html: string[] = [];
  const h = (t: string) => {
    linie.push(`\n${t}\n${"-".repeat(t.length)}`);
    html.push(`<h3 style="margin:22px 0 6px">${esc(t)}</h3>`);
  };
  const p = (t: string) => {
    linie.push(t);
    html.push(`<p style="margin:6px 0">${esc(t)}</p>`);
  };

  h("1. Najniższa cena z 30 dni przy obniżkach");
  p(ceny.naglowek ?? "Brak wyniku.");
  if (ceny.opis) p(ceny.opis);
  const produkty: Produkt[] = ceny.produkty ?? [];
  const zle = produkty.filter((x) => !x.zgodny);
  if (zle.length) {
    linie.push("");
    html.push('<ul style="margin:6px 0;padding-left:20px">');
    for (const x of zle.slice(0, 40)) {
      const t =
        `${x.nazwa}: cena regularna ${x.regularna} zł, promocyjna ${x.promocyjna} zł (−${x.obnizka}%). ${x.powod ?? ""} ${x.url}`.trim();
      linie.push(`- ${t}`);
      html.push(
        `<li>${esc(`${x.nazwa}: cena regularna ${x.regularna} zł, promocyjna ${x.promocyjna} zł (−${x.obnizka}%). ${x.powod ?? ""}`)} <a href="${esc(x.url)}">link</a></li>`,
      );
    }
    html.push("</ul>");
    if (zle.length > 40) p(`…i ${zle.length - 40} kolejnych pozycji.`);
  }

  h("2. Informacje o zwrotach i reklamacjach");
  p(zwroty.naglowek ?? "Brak wyniku.");
  if (zwroty.opis) p(zwroty.opis);
  const braki = ((zwroty.wymogi ?? []) as Wymog[]).filter((w) => !w.jest);
  if (braki.length) {
    html.push('<ul style="margin:6px 0;padding-left:20px">');
    for (const w of braki) {
      const t = `${w.etykieta}${w.waga === "krytyczny" ? " (ważne)" : ""}${w.brak ? `: ${w.brak}` : ""}`;
      linie.push(`- ${t}`);
      html.push(`<li>${esc(t)}</li>`);
    }
    html.push("</ul>");
  }
  const zbadane: string[] = zwroty.zbadaneStrony ?? [];
  if (zbadane.length) p(`Zbadane strony: ${zbadane.join(", ")}`);

  const tekst = `Raport dla sklepu ${dom}\n${linie.join("\n")}`;
  const razem = `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5;color:#111;max-width:640px"><p>Dzień dobry,</p><p>poniżej raport dla sklepu <b>${esc(dom)}</b>: najniższa cena z 30 dni przy obniżkach oraz informacje o zwrotach. To automatyczne sprawdzenie publicznie widocznych stron, nie porada prawna.</p>${html.join("")}<p style="margin-top:24px">Fluxlab</p></div>`;
  return { tekst, html: razem };
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

        if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(dom)) {
          await stripe(
            "refunds",
            new URLSearchParams({ payment_intent: String(x.payment_intent) }),
          );
          const t = `Dzień dobry,\n\nw zamówieniu nie było poprawnego adresu sklepu, więc nie mogliśmy sprawdzić. Zwróciliśmy całą kwotę. Możesz zamówić ponownie, wpisując sam adres, np. twojsklep.pl.\n\nFluxlab`;
          await wyslij(
            email,
            "Zwrot za raport Omnibus: nie rozpoznaliśmy adresu sklepu",
            `<p>${esc(t).replace(/\n/g, "<br>")}</p>`,
            t,
          );
          await oznacz(`zwrot ${new Date().toISOString()}`);
          log("zwrot: zły adres");
          continue;
        }

        const [ceny, zwroty] = await Promise.all([
          sprawdz("sprawdz-ceny", dom),
          sprawdz("sprawdz-zwroty", dom),
        ]);
        if (
          ceny.status === "BRAK_ODPOWIEDZI" ||
          zwroty.status === "BRAK_SKLEPU"
        ) {
          await stripe(
            "refunds",
            new URLSearchParams({ payment_intent: String(x.payment_intent) }),
          );
          const t = `Dzień dobry,\n\nadres ${dom} nie odpowiedział stroną sklepu, więc nie mogliśmy zrobić raportu. Zwróciliśmy całą kwotę. Po sprawdzeniu adresu możesz zamówić ponownie.\n\nFluxlab`;
          await wyslij(
            email,
            "Zwrot za raport Omnibus: sklep nie odpowiedział",
            `<p>${esc(t).replace(/\n/g, "<br>")}</p>`,
            t,
          );
          await oznacz(`zwrot ${new Date().toISOString()}`);
          log("zwrot: sklep nie odpowiada");
          continue;
        }

        const r = raport(dom, ceny, zwroty);
        if (
          !(await wyslij(email, `Raport Omnibus dla ${dom}`, r.html, r.tekst))
        )
          throw new Error("mail nie wyszedł");
        await oznacz(new Date().toISOString());
        log("raport wysłany");
      } catch (e) {
        console.error("[omnibus-sklep]", x.id, e);
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
