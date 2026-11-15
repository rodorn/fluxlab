import { NextResponse } from "next/server";

import { wyslij } from "@/lib/audyt-wyslij";
import { BladAdresu, pobierzStrone } from "@/lib/bezpieczny-fetch";
import { anulujIZwroc, oznacz, subskrypcja, zamowieniaProduktu } from "@/lib/automaty/zamowienia";
import { skrot, szkicePostow, trescWpisu, wpisyZKanalu, znajdzKanal, type Wpis } from "@/lib/automaty/posty";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

const PRODUKT = "posty-z-artykulow";
const NA_RAZ = 2;
const PAMIEC = 40;

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

async function mailZPostami(email: string, w: Wpis, pierwszy: boolean) {
  const posty = await szkicePostow(w.tytul, await trescWpisu(w));
  const wstep = pierwszy
    ? "Usługa działa. Pilnujemy Twojego bloga, a przy każdym nowym wpisie dostaniesz tu trzy szkice postów. Na początek próbka z najnowszego artykułu."
    : "Na blogu pojawił się nowy wpis.";
  const tekst = `Dzień dobry,\n\n${wstep}\n\nArtykuł: ${w.tytul}\n${w.url}\n\n${posty
    .map((p, i) => `Szkic ${i + 1} (${p.siec}):\n${p.tekst}\n${w.url}`)
    .join("\n\n")}\n\nSzkice są do Twojej edycji i nie publikujemy ich na Twoich kontach.\n\nFluxlab`;
  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5;color:#111;max-width:640px"><p>Dzień dobry,</p><p>${esc(wstep)}</p><p><b>${esc(w.tytul)}</b><br><a href="${esc(w.url)}">${esc(w.url)}</a></p>${posty
    .map(
      (p, i) =>
        `<h3 style="margin:20px 0 4px">Szkic ${i + 1} (${esc(p.siec)})</h3><p style="margin:0;white-space:pre-wrap;background:#f4f4f5;padding:12px;border-radius:8px">${esc(p.tekst)}\n${esc(w.url)}</p>`,
    )
    .join("")}<p style="font-size:13px;color:#555">Szkice są do Twojej edycji. Nie publikujemy ich na Twoich kontach.</p><p>Fluxlab</p></div>`;
  if (!(await wyslij(email, `Posty z artykułu: ${w.tytul}`.slice(0, 120), html, tekst)))
    throw new Error("mail nie wyszedł");
}

async function obsluz() {
  const wyniki: { sesja: string; wynik: string }[] = [];
  for (const z of await zamowieniaProduktu(PRODUKT)) {
    const log = (wynik: string) => wyniki.push({ sesja: z.sesja, wynik });
    try {
      const sub = await subskrypcja(z.subskrypcja);
      if (!["active", "trialing"].includes(sub.status)) continue;
      const meta = sub.metadata ?? {};
      if (!meta.feed) {
        try {
          const k = await znajdzKanal(z.dane);
          if (!k.wpisy.length) throw new BladAdresu("Kanał jest pusty.");
          await mailZPostami(z.email, k.wpisy[0], true);
          await oznacz(z.subskrypcja, {
            feed: k.feed.slice(0, 480),
            widziane: k.wpisy.slice(0, PAMIEC).map((w) => skrot(w.url)).join(","),
          });
          log("start: próbka wysłana");
        } catch (e) {
          if (!(e instanceof BladAdresu)) throw e;
          const t = `Dzień dobry,\n\nnie udało się uruchomić postów z artykułów: ${e.message} Anulowaliśmy subskrypcję i zwróciliśmy całą opłatę, pieniądze wrócą na kartę w kilka dni. Po sprawdzeniu adresu bloga możesz zamówić ponownie: https://fluxlab.pl/posty-z-artykulow-bloga\n\nFluxlab`;
          await wyslij(z.email, "Zwracamy pieniądze: nie udało się uruchomić postów z artykułów", `<p>${esc(t).replace(/\n/g, "<br>")}</p>`, t);
          await anulujIZwroc(z.subskrypcja);
          log(`zwrot: ${e.message}`);
        }
        continue;
      }
      let wpisy: Wpis[];
      try {
        const { url, html } = await pobierzStrone(meta.feed);
        wpisy = wpisyZKanalu(html, url);
      } catch {
        log("kanał chwilowo niedostępny");
        continue;
      }
      const widziane = String(meta.widziane ?? "").split(",").filter(Boolean);
      const nowe = wpisy.filter((w) => !widziane.includes(skrot(w.url))).reverse().slice(0, NA_RAZ);
      if (!nowe.length) continue;
      let zapis = [...widziane];
      for (const w of nowe) {
        await mailZPostami(z.email, w, false);
        zapis = [skrot(w.url), ...zapis].slice(0, PAMIEC);
        await oznacz(z.subskrypcja, { widziane: zapis.join(",") });
        log(`posty wysłane: ${w.tytul.slice(0, 60)}`);
      }
    } catch (e) {
      console.error("[posty-z-artykulow]", z.sesja, e);
      log(`błąd: ${e instanceof Error ? e.message : "nieznany"}`);
    }
  }
  return wyniki;
}

export async function GET(req: Request) {
  const sekret = process.env.AUTOMAT_SEKRET;
  if (!sekret || req.headers.get("x-automat") !== sekret)
    return NextResponse.json({ error: "brak dostępu" }, { status: 401 });
  return NextResponse.json({ ok: true, wyniki: await obsluz() });
}
