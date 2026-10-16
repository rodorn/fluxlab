#!/usr/bin/env node
// Kontrola gotowej strony po `next build`, zawsze z tym samym wynikiem dla tych
// samych plików: bez sieci i bez modeli.
//  1. pisownia: tekst widoczny w HTML (z alt, placeholder, aria-label, title,
//     description) przez hunspell ze słownikiem pl_PL z repo; słowo spoza
//     słownika musi być na liście scripts/slownik/dozwolone.txt (nazwy, terminy,
//     angielskie nazwy produktów). Nieznane angielskie słowo też tu wypada.
//  2. obrazy: plik z public/ musi mieć co najmniej 2x szerokość, w jakiej strona
//     go pokazuje (atrybut width), żeby był ostry na ekranie retina.
// Uruchomienie: node scripts/jakosc.mjs  (po buildzie). Wynik „JAKOSC OK”.
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import zlib from "node:zlib";
import { execFileSync } from "node:child_process";

const ROOT = path.resolve(
  path.dirname(new URL(import.meta.url).pathname),
  "..",
);
const APP = path.join(ROOT, ".next/server/app");
const SLOWNIK = path.join(ROOT, "scripts/slownik");
const bledy = [];

if (!fs.existsSync(APP)) {
  console.error("Brak .next/server/app, najpierw next build.");
  process.exit(2);
}

const strony = [];
(function zbierz(d) {
  for (const w of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, w.name);
    if (w.isDirectory()) zbierz(p);
    else if (w.name.endsWith(".html")) strony.push(p);
  }
})(APP);
strony.sort();

const ENCJE = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
const dekoduj = (s) =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) =>
      String.fromCodePoint(parseInt(h, 16)),
    )
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&(\w+);/g, (m, n) => ENCJE[n] ?? m);

function tekstStrony(html) {
  const atrybuty = [
    ...html.matchAll(/\s(?:alt|placeholder|aria-label|title)="([^"]*)"/g),
    ...html.matchAll(/<meta name="description" content="([^"]*)"/g),
  ].map((m) => m[1]);
  const body = html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<(code|pre|svg)[\s\S]*?<\/\1>/g, " ")
    .replace(/<[^>]+>/g, " ");
  return dekoduj([body, ...atrybuty].join(" "));
}

// --- 1. pisownia ---
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "jakosc-"));
for (const r of ["aff", "dic"]) {
  fs.writeFileSync(
    path.join(tmp, `pl_PL.${r}`),
    zlib.gunzipSync(fs.readFileSync(path.join(SLOWNIK, `pl_PL.${r}.gz`))),
  );
}
const dozwolone = new Set(
  fs
    .readFileSync(path.join(SLOWNIK, "dozwolone.txt"), "utf8")
    .split("\n")
    .map((l) => l.replace(/#.*/, "").trim().toLowerCase())
    .filter(Boolean),
);

const gdzie = new Map();
for (const plik of strony) {
  const adres =
    "/" +
    path
      .relative(APP, plik)
      .replace(/\.html$/, "")
      .replace(/^index$/, "");
  const slowa =
    tekstStrony(fs.readFileSync(plik, "utf8"))
      // adresy, maile, domeny i fragmenty kodu nie są tekstem
      .replace(
        /\S+@\S+|\bhttps?:\/\/\S+|\b[\w-]+\.(pl|com|eu|io|dev|app|org|net|ai)\b\S*/gi,
        " ",
      )
      .match(/[\p{L}]+/gu) ?? [];
  for (const s of slowa) {
    if (s.length < 3 || /\p{Lu}.*\p{Lu}/u.test(s)) continue; // skróty: CRM, KSeF
    if (dozwolone.has(s.toLowerCase())) continue;
    if (!gdzie.has(s)) gdzie.set(s, new Set());
    gdzie.get(s).add(adres);
  }
}
const nieznane = execFileSync(
  "hunspell",
  ["-d", path.join(tmp, "pl_PL"), "-l"],
  {
    input: [...gdzie.keys()].join("\n"),
    encoding: "utf8",
    maxBuffer: 64 << 20,
  },
)
  .split("\n")
  .filter(Boolean);
fs.rmSync(tmp, { recursive: true });
for (const s of [...new Set(nieznane)].sort((a, b) =>
  a.localeCompare(b, "pl"),
)) {
  const a = [...(gdzie.get(s) ?? [])].sort();
  bledy.push([
    "pisownia",
    `"${s}" na ${a.slice(0, 3).join(", ")}${a.length > 3 ? ` i ${a.length - 3} innych` : ""}`,
  ]);
}

// --- 2. obrazy ---
function rozmiar(plik) {
  const b = fs.readFileSync(plik);
  if (b.subarray(1, 4).toString() === "PNG")
    return [b.readUInt32BE(16), b.readUInt32BE(20)];
  if (
    b.subarray(0, 4).toString() === "RIFF" &&
    b.subarray(8, 12).toString() === "WEBP"
  ) {
    const t = b.subarray(12, 16).toString();
    if (t === "VP8X") return [1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3)];
    if (t === "VP8L") {
      const v = b.readUInt32LE(21);
      return [1 + (v & 0x3fff), 1 + ((v >> 14) & 0x3fff)];
    }
    return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff];
  }
  if (b[0] === 0xff && b[1] === 0xd8) {
    let i = 2;
    while (i < b.length) {
      const m = b[i + 1];
      if (m >= 0xc0 && m <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(m))
        return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)];
      i += 2 + b.readUInt16BE(i + 2);
    }
  }
  return null;
}
const sprawdzone = new Set();
for (const plik of strony) {
  const adres =
    "/" +
    path
      .relative(APP, plik)
      .replace(/\.html$/, "")
      .replace(/^index$/, "");
  for (const [tag] of fs.readFileSync(plik, "utf8").matchAll(/<img\b[^>]*>/g)) {
    const src = tag.match(/\ssrc="([^"]+)"/)?.[1];
    const szer = Number(tag.match(/\swidth="(\d+)"/)?.[1] ?? 0);
    if (!src || !szer) continue;
    const url = dekoduj(src);
    const lokalny = url.startsWith("/_next/image")
      ? decodeURIComponent(
          new URL(url, "http://x").searchParams.get("url") ?? "",
        )
      : url;
    if (!lokalny.startsWith("/") || lokalny.startsWith("/_next/")) continue;
    const zrodlo = path.join(ROOT, "public", lokalny.split("?")[0]);
    const klucz = `${lokalny}@${szer}`;
    if (
      sprawdzone.has(klucz) ||
      !fs.existsSync(zrodlo) ||
      zrodlo.endsWith(".svg")
    )
      continue;
    sprawdzone.add(klucz);
    const r = rozmiar(zrodlo);
    if (!r) continue;
    if (r[0] < szer)
      bledy.push([
        "obraz",
        `${lokalny} ma ${r[0]}x${r[1]} px, a ${adres} pokazuje go na ${szer} px (plik mniejszy niż deklarowany, obraz będzie rozmyty)`,
      ]);
  }
}

// --- 3. mapa witryny ---
// Każdy adres z sitemap.xml ma zbudowaną stronę bez noindex, każda zbudowana
// strona bez noindex jest w mapie, bez powtórzeń i bez dat z przyszłości.
{
  const xml = fs.readFileSync(path.join(APP, "sitemap.xml.body"), "utf8");
  const wpisy = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => ({
    loc: m[1].match(/<loc>([^<]+)<\/loc>/)?.[1] ?? "",
    lastmod: m[1].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1],
  }));
  const zbudowane = new Map(
    strony.map((p) => [
      "/" + path.relative(APP, p).replace(/\.html$/, "").replace(/^index$/, ""),
      p,
    ]),
  );
  const noindex = (p) => /<meta name="robots" content="[^"]*noindex/.test(fs.readFileSync(p, "utf8"));
  const wMapie = new Set();
  for (const { loc, lastmod } of wpisy) {
    const adres = loc.replace(/^https:\/\/fluxlab\.pl/, "") || "/";
    if (!loc.startsWith("https://fluxlab.pl")) bledy.push(["mapa", `${loc} poza domeną https://fluxlab.pl`]);
    if (wMapie.has(adres)) bledy.push(["mapa", `${adres} dwa razy w mapie`]);
    wMapie.add(adres);
    const plik = zbudowane.get(adres);
    if (!plik) bledy.push(["mapa", `${adres} jest w mapie, a takiej strony nie ma w buildzie`]);
    else if (noindex(plik)) bledy.push(["mapa", `${adres} jest w mapie, a ma noindex`]);
    if (lastmod && lastmod.slice(0, 10) > (process.env.JAKOSC_DZIS ?? new Date().toISOString().slice(0, 10)))
      bledy.push(["mapa", `${adres} ma lastmod z przyszłości: ${lastmod}`]);
  }
  for (const [adres, plik] of zbudowane) {
    if (adres.startsWith("/_") || wMapie.has(adres) || noindex(plik)) continue;
    bledy.push(["mapa", `${adres} nie ma w mapie witryny (ani noindex)`]);
  }
}

if (!bledy.length) {
  console.log(
    `JAKOSC OK: ${strony.length} stron, ${gdzie.size} słów, ${sprawdzone.size} obrazów, mapa witryny zgodna.`,
  );
  process.exit(0);
}
const ile = Number(process.env.JAKOSC_ILE ?? 60);
const grupy = {};
for (const [k, m] of bledy) (grupy[k] ??= []).push(m);
console.log(`JAKOSC: ${bledy.length} do poprawy\n`);
for (const [k, msgs] of Object.entries(grupy)) {
  console.log(`[${k}] ${msgs.length}`);
  for (const m of msgs.slice(0, ile)) console.log("  - " + m);
}
process.exit(1);
