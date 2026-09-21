// Zglasza adresy do IndexNow, czyli wspolnego punktu zgloszen Binga, Yandeksa
// i Seznamu. Powod: strona nie ma jeszcze danych w Search Console, a nowe
// podstrony same trafiaja do indeksu tygodniami. IndexNow nie wymaga zadnego
// logowania ani konta, wystarczy plik z kluczem lezacy na tej samej domenie.
//
// Uzycie:
//   node scripts/indexnow.mjs                 zglasza wszystko z mapy strony
//   node scripts/indexnow.mjs /jakas-strona   zglasza podane adresy
//
// Dzienny limit po stronie IndexNow to 10 000 adresow, wiec caly serwis
// mozna zglosic bez obaw, ale robimy to tylko po realnej zmianie tresci.
import { readdir, readFile } from "node:fs/promises";

const HOST = "fluxlab.pl";
const BAZA = `https://${HOST}`;

async function klucz() {
  const pliki = await readdir("public");
  const k = pliki.find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
  if (!k) {
    throw new Error(
      "Brak pliku z kluczem w public/. Utworz public/<32 znaki hex>.txt zawierajacy ten sam ciag.",
    );
  }
  const w = (await readFile(`public/${k}`, "utf8")).trim();
  if (w !== k.replace(/\.txt$/, "")) {
    throw new Error("Nazwa pliku z kluczem i jego tresc musza byc identyczne.");
  }
  return w;
}

async function adresyZMapy() {
  const r = await fetch(`${BAZA}/sitemap.xml`);
  if (!r.ok) throw new Error(`Mapa strony odpowiedziala kodem ${r.status}`);
  const xml = await r.text();
  return [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
}

const k = await klucz();
const podane = process.argv.slice(2);
const urlList = podane.length
  ? podane.map((p) => (p.startsWith("http") ? p : `${BAZA}${p}`))
  : await adresyZMapy();

const odp = await fetch("https://api.indexnow.org/IndexNow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: k,
    keyLocation: `${BAZA}/${k}.txt`,
    urlList,
  }),
});

// 200 znaczy przyjete, 202 przyjete ale klucz jeszcze niesprawdzony. Oba sa
// sukcesem, wiec rozrozniamy je tylko w komunikacie.
const tresc = await odp.text();
console.log(
  `IndexNow: ${odp.status} ${odp.statusText}, zgloszono ${urlList.length} adresow` +
    (tresc ? `, odpowiedz: ${tresc.slice(0, 200)}` : ""),
);
process.exit(odp.status === 200 || odp.status === 202 ? 0 : 1);
