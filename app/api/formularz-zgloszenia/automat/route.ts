import { NextResponse } from "next/server";

import { wyslij } from "@/lib/audyt-wyslij";
import {
  BAZA,
  DNI_PO_ANULOWANIU,
  DNI_ZGLOSZEN,
  adresArkusza,
  adresFormularza,
  adresUstawien,
  nowyToken,
  type Konto,
} from "@/lib/automaty/formularz";
import {
  oznacz,
  subskrypcja,
  zamowieniaProduktu,
} from "@/lib/automaty/zamowienia";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

const DZIEN = 86_400_000;
const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function powitanie(nazwa: string, token: string) {
  const adres = adresFormularza(token);
  const kod = `<form method="POST" action="${adres}">\n  <input name="Imię i nazwisko">\n  <input name="E-mail" type="email">\n  <textarea name="Wiadomość"></textarea>\n  <input type="hidden" name="_next" value="https://twojastrona.pl/dziekujemy">\n  <input name="_honey" style="display:none" tabindex="-1" autocomplete="off">\n  <button>Wyślij</button>\n</form>`;
  const przed =
    `Dzień dobry,\n\nformularz „${nazwa}” jest gotowy. Każde zgłoszenie trafia do arkusza i, jeśli podłączysz kanał, do Teams albo Slacka.\n\n` +
    `1. Wyślij zgłoszenia na ten adres (POST, pola dowolne):\n${adres}\n\nGotowy formularz HTML do wklejenia na stronę:`;
  const po =
    `Pole _next to adres strony z podziękowaniem, a _honey to pułapka na boty, zostaw puste. Adres przyjmuje też JSON.\n\n` +
    `2. Arkusz Google: w komórce A1 wpisz\n=IMPORTDATA("${adresArkusza(token)}")\nArkusz pokazuje nowe zgłoszenia (Google odświeża dane mniej więcej co godzinę).\n\n` +
    `3. Teams albo Slack: wklej adres webhooka tutaj i sprawdź wiadomością testową:\n${adresUstawien(token)}\n\n` +
    `Adresy są tajne, nie publikuj ich poza stroną z formularzem. Zgłoszenia trzymamy ${DNI_ZGLOSZEN} dni. Po rezygnacji dane usuwamy po ${DNI_PO_ANULOWANIU} dniach.\n\nFluxlab`;
  const akapity = (t: string) => esc(t).replace(/\n/g, "<br>");
  const html =
    `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5;color:#111;max-width:620px">${akapity(przed)}` +
    `<pre style="background:#f3f4f6;padding:12px;border-radius:8px;white-space:pre-wrap;font-size:13px">${esc(kod)}</pre>${akapity(po)}</div>`;
  return { temat: "Twój formularz jest gotowy: adres, arkusz i Teams/Slack", tekst: `${przed}\n\n${kod}\n\n${po}`, html };
}

async function formularze() {
  const wyniki: { produkt: string; sesja: string; wynik: string }[] = [];
  for (const z of await zamowieniaProduktu("formularz-zgloszenia")) {
    const log = (wynik: string) =>
      wyniki.push({ produkt: "formularz-zgloszenia", sesja: z.sesja, wynik });
    try {
      const sub = await subskrypcja(z.subskrypcja);
      const aktywna = ["active", "trialing"].includes(sub.status);
      let meta = sub.metadata ?? {};

      if (!meta.token) {
        if (!aktywna) continue;
        const token = nowyToken();
        const konto: Konto = {
          email: z.email,
          nazwa: z.dane.trim().slice(0, 80) || "Formularz",
          aktywna: true,
        };
        await BAZA.ustaw("konta", token, { klucz: token, dane: konto });
        await oznacz(z.subskrypcja, { token });
        meta = { ...meta, token };
        log("konto utworzone");
      }
      const token = meta.token;

      if (aktywna && !meta.powitanie) {
        const k = await BAZA.pobierz<Konto>("konta", token);
        const p = powitanie(k?.dane.nazwa ?? "Formularz", token);
        if (!(await wyslij(z.email, p.temat, p.html, p.tekst)))
          throw new Error("mail nie wyszedł");
        await oznacz(z.subskrypcja, { powitanie: new Date().toISOString() });
        log("mail powitalny wysłany");
        continue;
      }

      const k = await BAZA.pobierz<Konto>("konta", token);
      if (!k) continue;
      if (!aktywna && k.dane.aktywna) {
        await BAZA.zmien("konta", token, {
          dane: { aktywna: false, koniec: new Date().toISOString() },
        });
        log("anulowany, formularz wyłączony");
      } else if (aktywna && !k.dane.aktywna) {
        await BAZA.zmien("konta", token, {
          dane: { aktywna: true, koniec: "" },
        });
        log("wznowiony");
      } else if (
        !aktywna &&
        k.dane.koniec &&
        Date.now() - Date.parse(k.dane.koniec) > DNI_PO_ANULOWANIU * DZIEN
      ) {
        await BAZA.usunKlucz(token);
        log("dane usunięte po okresie retencji");
      }
    } catch (e) {
      console.error("[formularz-zgloszenia]", z.sesja, e);
      log(`błąd: ${e instanceof Error ? e.message : "nieznany"}`);
    }
  }
  await BAZA.usunPrzed(
    "zgloszenia",
    new Date(Date.now() - DNI_ZGLOSZEN * DZIEN).toISOString(),
  ).catch(() => {});
  return wyniki;
}

export async function GET(req: Request) {
  const sekret = process.env.AUTOMAT_SEKRET;
  if (!sekret || req.headers.get("x-automat") !== sekret)
    return NextResponse.json({ error: "brak dostępu" }, { status: 401 });
  return NextResponse.json({ ok: true, wyniki: await formularze() });
}
