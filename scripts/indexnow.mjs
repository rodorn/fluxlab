// Zglasza adresy do IndexNow, czyli wspolnego punktu zgloszen Binga, Yandeksa
// i Seznamu. Powod: strona nie ma jeszcze danych w Search Console, a nowe
// podstrony same trafiaja do indeksu tygodniami. IndexNow nie wymaga zadnego
// logowania ani konta, wystarczy plik z kluczem lezacy na tej samej domenie.
//
// Uzycie:
//   node scripts/indexnow.mjs                 zglasza adresy z mapy, ktorych lastmod
//                                             jest nowszy niz ostatnie zgloszenie
//   node scripts/indexnow.mjs --wszystko      zglasza cala mape strony
//   node scripts/indexnow.mjs /jakas-strona   zglasza podane adresy
//
// Wysylanie calej mapy po kazdym wdrozeniu dawalo tysiace zgloszen dziennie
// niezmienionych stron, dlatego domyslnie idzie tylko to, co sie zmienilo.
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { homedir } from "node:os";

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

const STAN_KATALOG = `${homedir()}/.cache/fluxlab-indexnow`;
const STAN = `${STAN_KATALOG}/ostatnio`;

async function adresyZMapy(od) {
  const r = await fetch(`${BAZA}/sitemap.xml`);
  if (!r.ok) throw new Error(`Mapa strony odpowiedziala kodem ${r.status}`);
  const xml = await r.text();
  return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)]
    .map((m) => ({
      loc: m[1].match(/<loc>\s*([^<\s]+)\s*<\/loc>/)?.[1],
      lastmod: Date.parse(m[1].match(/<lastmod>\s*([^<\s]+)\s*<\/lastmod>/)?.[1] ?? ""),
    }))
    .filter((u) => u.loc && (od === undefined || u.lastmod > od))
    .map((u) => u.loc);
}

async function ostatnieZgloszenie() {
  try {
    return Date.parse((await readFile(STAN, "utf8")).trim());
  } catch {
    return Date.now() - 24 * 3600 * 1000;
  }
}

const k = await klucz();
const argumenty = process.argv.slice(2);
const wszystko = argumenty.includes("--wszystko");
const podane = argumenty.filter((a) => a !== "--wszystko");
const start = new Date().toISOString();
const urlList = podane.length
  ? podane.map((p) => (p.startsWith("http") ? p : `${BAZA}${p}`))
  : await adresyZMapy(wszystko ? undefined : await ostatnieZgloszenie());

if (!urlList.length) {
  console.log("Brak adresow zmienionych od ostatniego zgloszenia, nic nie wysylam.");
  process.exit(0);
}

// Wspolny punkt api.indexnow.org odrzuca domeny, ktorych Bing jeszcze nie zna
// (403 UserForbiddedToAccessSite), a Yandex te same adresy przyjmuje. Dlatego
// pytamy kazdy punkt osobno i wypisujemy wynik kazdego, zamiast uznawac
// odmowe jednego za porazke calosci.
const PUNKTY = [
  ["IndexNow (wspolny)", "https://api.indexnow.org/IndexNow"],
  ["Yandex", "https://yandex.com/indexnow"],
  ["Naver", "https://searchadvisor.naver.com/indexnow"],
];

const ciało = JSON.stringify({
  host: HOST,
  key: k,
  keyLocation: `${BAZA}/${k}.txt`,
  urlList,
});

let udane = 0;
for (const [nazwa, punkt] of PUNKTY) {
  try {
    const odp = await fetch(punkt, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: ciało,
    });
    const tresc = (await odp.text()).slice(0, 160);
    const ok = odp.status === 200 || odp.status === 202;
    if (ok) udane++;
    console.log(`${nazwa}: ${odp.status}${ok ? " przyjete" : " ODRZUCONE"}${tresc ? `, ${tresc}` : ""}`);
  } catch (e) {
    console.log(`${nazwa}: blad polaczenia, ${e.message}`);
  }
}

if (udane > 0 && !podane.length) {
  await mkdir(STAN_KATALOG, { recursive: true });
  await writeFile(STAN, start);
}

console.log(`Zgloszono ${urlList.length} adresow, punktow, ktore przyjely: ${udane} z ${PUNKTY.length}`);
process.exit(udane > 0 ? 0 : 1);
