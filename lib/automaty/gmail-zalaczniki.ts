import { wyslij } from "@/lib/audyt-wyslij";
import { OdwolanyDostep, gapi, odszyfruj, tokenDostepu } from "@/lib/google";
import {
  anulujIZwroc,
  oznacz,
  subskrypcja,
  zamowieniaProduktu,
} from "@/lib/automaty/zamowienia";

export const PRODUKTY_ZALACZNIKOW = ["zalaczniki-z-maila", "faktury-z-maila"] as const;
type Produkt = (typeof PRODUKTY_ZALACZNIKOW)[number];

const NA_RAZ = 8;
const WIADOMOSCI_NA_RAZ = 10;
const MAX_BAJTOW = 20 * 1024 * 1024;
const GMAIL = "https://gmail.googleapis.com/gmail/v1/users/me";
const DRIVE = "https://www.googleapis.com/drive/v3/files";
const FAKTURA = /faktur|invoice|rachunek|proforma|\bfv\b|\bfvat\b/i;

type Czesc = {
  filename?: string;
  mimeType?: string;
  body?: { attachmentId?: string; size?: number };
  parts?: Czesc[];
};
type Wiadomosc = {
  id: string;
  internalDate: string;
  payload: Czesc & { headers?: { name: string; value: string }[] };
};

const bezpieczna = (s: string) =>
  s.replace(/[^\p{L}\p{N}@._ -]/gu, "_").replace(/\s+/g, " ").trim().slice(0, 80) || "inne";

const naglowek = (m: Wiadomosc, n: string) =>
  m.payload.headers?.find((h) => h.name.toLowerCase() === n)?.value ?? "";

const adresNadawcy = (m: Wiadomosc) => {
  const f = naglowek(m, "from");
  return (f.match(/<([^>]+)>/)?.[1] ?? f).trim().toLowerCase();
};

export const nadawcyZ = (dane: string) =>
  dane
    .split(/[,;\s]+/)
    .map((s) => s.trim().toLowerCase())
    .filter((s) => /^[\w.+-]*@?[\w-]+(\.[\w-]+)+$/.test(s))
    .slice(0, 10);

function zalaczniki(c: Czesc, wynik: Czesc[] = []) {
  if (c.filename && c.body?.attachmentId) wynik.push(c);
  c.parts?.forEach((p) => zalaczniki(p, wynik));
  return wynik;
}

const q = (s: string) => s.replace(/\\/g, "\\\\").replace(/'/g, "\\'");

async function znajdzLubZaloz(token: string, nazwa: string, rodzic?: string, typ = "application/vnd.google-apps.folder") {
  const zap = `mimeType='${typ}' and name='${q(nazwa)}' and trashed=false${rodzic ? ` and '${rodzic}' in parents` : ""}`;
  const r = await (await gapi(token, `${DRIVE}?q=${encodeURIComponent(zap)}&fields=files(id)&pageSize=1`)).json();
  if (r.files?.[0]?.id) return String(r.files[0].id);
  const c = await (
    await gapi(token, `${DRIVE}?fields=id`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: nazwa, mimeType: typ, ...(rodzic ? { parents: [rodzic] } : {}) }),
    })
  ).json();
  return String(c.id);
}

async function wgraj(token: string, nazwa: string, rodzic: string, mime: string, bajty: Buffer) {
  const g = `fluxlab${Date.now()}`;
  const czesci = [
    Buffer.from(`--${g}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify({ name: nazwa, parents: [rodzic] })}\r\n--${g}\r\nContent-Type: ${mime || "application/octet-stream"}\r\n\r\n`),
    bajty,
    Buffer.from(`\r\n--${g}--`),
  ];
  const r = await (
    await gapi(token, "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,webViewLink", {
      method: "POST",
      headers: { "Content-Type": `multipart/related; boundary=${g}` },
      body: Buffer.concat(czesci),
    })
  ).json();
  return String(r.webViewLink ?? "");
}

async function arkusz(token: string, rodzic: string, meta: Record<string, string>, sub: string) {
  if (meta.sid) return meta.sid;
  const id = await znajdzLubZaloz(token, "Faktury z maila", rodzic, "application/vnd.google-apps.spreadsheet");
  await gapi(token, `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/A1:E1?valueInputOption=RAW`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ values: [["Data maila", "Nadawca", "Temat", "Plik", "Link do pliku"]] }),
  });
  await oznacz(sub, { sid: id });
  meta.sid = id;
  return id;
}

const dzien = (ms: number) => new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Warsaw" }).format(new Date(ms));

async function ramkaMail(email: string, temat: string, tekst: string) {
  await wyslij(email, temat, `<p>${tekst.replace(/\n/g, "<br>")}</p>`, tekst);
}

export async function obsluzZalaczniki(produkt: Produkt) {
  const wyniki: { sesja: string; wynik: string }[] = [];
  let zrobione = 0;
  for (const z of await zamowieniaProduktu(produkt)) {
    if (zrobione >= NA_RAZ) break;
    const log = (wynik: string) => wyniki.push({ sesja: z.sesja, wynik });
    try {
      const sub = await subskrypcja(z.subskrypcja);
      if (sub.status !== "active" && sub.status !== "trialing") continue;
      const meta: Record<string, string> = { ...(sub.metadata ?? {}) };

      if (!meta.gtoken) {
        if (!meta.przyp && Date.now() / 1000 - Number(sub.created) > 2 * 3600) {
          await ramkaMail(
            z.email,
            "Dokończ uruchomienie usługi: połącz konto Google",
            `Dzień dobry,\n\nusługa czeka na zgodę na dostęp do konta Google. Połącz konto tutaj: https://fluxlab.pl/polacz-google?sesja=${z.sesja}\n\nBez tego usługa nie ruszy. Jeśli nie chcesz jej używać, odpisz na ten mail, a zwrócimy opłatę.\n\nFluxlab`,
          );
          await oznacz(z.subskrypcja, { przyp: "1" });
          log("przypomnienie o połączeniu konta");
          zrobione++;
        }
        continue;
      }
      zrobione++;

      const nadawcy = nadawcyZ(z.dane);
      if (produkt === "zalaczniki-z-maila" && !nadawcy.length) {
        await ramkaMail(
          z.email,
          "Zwracamy pieniądze: brak adresów nadawców",
          "Dzień dobry,\n\nw zamówieniu nie było poprawnych adresów nadawców, których pliki mamy zapisywać, więc nie mogliśmy uruchomić usługi. Zwróciliśmy opłatę i anulowaliśmy subskrypcję. Możesz zamówić ponownie.\n\nFluxlab",
        );
        await anulujIZwroc(z.subskrypcja);
        log("zwrot: brak nadawców");
        continue;
      }

      let token: string;
      try {
        token = await tokenDostepu(odszyfruj(meta.gtoken));
      } catch (e) {
        if (!(e instanceof OdwolanyDostep)) throw e;
        if (meta.gblad !== "1") {
          await ramkaMail(
            z.email,
            "Usługa wstrzymana: dostęp do konta Google wygasł",
            `Dzień dobry,\n\ndostęp do konta Google został odwołany albo wygasł, więc usługa jest wstrzymana. Połącz konto ponownie: https://fluxlab.pl/polacz-google?sesja=${z.sesja}\n\nFluxlab`,
          );
          await oznacz(z.subskrypcja, { gblad: "1" });
        }
        log("dostęp odwołany");
        continue;
      }

      const od = nadawcy.length ? ` from:(${nadawcy.join(" OR ")})` : "";
      const ost = Number(meta.ost ?? 0);
      const start = Number(meta.start ?? 0);
      const lista = await (
        await gapi(token, `${GMAIL}/messages?q=${encodeURIComponent(`after:${Math.max(start, Math.floor(ost / 1000) - 1)} has:attachment${od}${produkt === "faktury-z-maila" ? " filename:pdf" : ""}`)}&maxResults=40`)
      ).json();
      const wiadomosci: Wiadomosc[] = [];
      for (const { id } of (lista.messages ?? []) as { id: string }[])
        wiadomosci.push(await (await gapi(token, `${GMAIL}/messages/${id}?format=full`)).json());
      const nowe = wiadomosci
        .filter((m) => Number(m.internalDate) > ost)
        .sort((a, b) => Number(a.internalDate) - Number(b.internalDate))
        .slice(0, WIADOMOSCI_NA_RAZ);
      if (!nowe.length) {
        log("brak nowych maili");
        continue;
      }

      const korzen = meta.fid ?? (await znajdzLubZaloz(token, "Fluxlab"));
      if (!meta.fid) await oznacz(z.subskrypcja, { fid: korzen });
      const folderGlowny = await znajdzLubZaloz(
        token,
        produkt === "faktury-z-maila" ? "Faktury z maila" : "Załączniki z maila",
        korzen,
      );
      let zapisane = 0;
      for (const m of nowe) {
        const ms = Number(m.internalDate);
        const temat = naglowek(m, "subject");
        const nadawca = adresNadawcy(m);
        let czesci = zalaczniki(m.payload);
        if (produkt === "faktury-z-maila")
          czesci = czesci.filter((c) => /\.pdf$/i.test(c.filename ?? "") && (FAKTURA.test(temat) || FAKTURA.test(c.filename ?? "")));
        else
          czesci = czesci.filter((c) => !((c.mimeType ?? "").startsWith("image/") && (c.body?.size ?? 0) < 15_000));
        if (czesci.length) {
          const folder = await znajdzLubZaloz(
            token,
            produkt === "faktury-z-maila" ? dzien(ms).slice(0, 7) : bezpieczna(nadawca),
            folderGlowny,
          );
          for (const c of czesci) {
            if ((c.body?.size ?? 0) > MAX_BAJTOW) continue;
            const a = await (await gapi(token, `${GMAIL}/messages/${m.id}/attachments/${c.body!.attachmentId}`)).json();
            const bajty = Buffer.from(String(a.data ?? ""), "base64url");
            const link = await wgraj(token, `${dzien(ms)} ${bezpieczna(c.filename ?? "plik")}`, folder, c.mimeType ?? "", bajty);
            zapisane++;
            if (produkt === "faktury-z-maila") {
              const sid = await arkusz(token, korzen, meta, z.subskrypcja);
              const komorka = (s: string) => (/^[=+\-@]/.test(s) ? `'${s}` : s);
              await gapi(token, `https://sheets.googleapis.com/v4/spreadsheets/${sid}/values/A:E:append?valueInputOption=RAW`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ values: [[dzien(ms), komorka(nadawca), komorka(temat.slice(0, 200)), komorka(c.filename ?? ""), link]] }),
              });
            }
          }
        }
        meta.ost = String(ms);
        await oznacz(z.subskrypcja, { ost: meta.ost });
      }
      log(`zapisano plików: ${zapisane}`);
    } catch (e) {
      console.error(`[${produkt}]`, z.sesja, e instanceof Error ? e.message : e);
      log(`błąd: ${e instanceof Error ? e.message : "nieznany"}`);
    }
  }
  return wyniki;
}
