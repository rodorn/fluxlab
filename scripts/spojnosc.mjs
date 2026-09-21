// Kontrola spojnosci fluxlab.pl. Uruchamiac przed kazdym commitem:
//   node scripts/spojnosc.mjs            (bez sieci)
//   node scripts/spojnosc.mjs --live     (dokłada sprawdzenie kodow HTTP)
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const LIVE = process.argv.includes("--live");
const problems = [];
const add = (kind, msg) => problems.push({ kind, msg });

const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");
const exists = (p) => fs.existsSync(path.join(ROOT, p));

// --- 1. ceny z katalogu maja pokrycie na stronie docelowej ---
const products = read("lib/products.ts");
const blocks = products.split(/\n  \{\n/).slice(1);
const catalog = [];
for (const b of blocks) {
  const href = b.match(/href:\s*"([^"]+)"/)?.[1];
  const price = b.match(/price:\s*"([^"]+)"/)?.[1];
  const name = b.match(/name:\s*"([^"]+)"/)?.[1];
  const bullets = [...(b.match(/bullets:\s*\[([^\]]*)\]/s)?.[1] ?? "").matchAll(/"([^"]*)"/g)].map(
    (m) => m[1],
  );
  if (href && price && name) catalog.push({ href, price, name, bullets });
}

// Tysiace w tresciach pisze sie ze spacja ("3 900 zl"), w kodzie bywa bez niej.
// Bez tego kroku kwota z katalogu nigdy nie zgodzilaby sie ze strona.
const scisnij = (s) => s.replace(/(\d)[\s\u00a0\u202f](?=\d)/g, "$1");
// Kwoty, czyli liczby stojace przed "zl". Sama liczba nie wystarczy: w
// bulletach sa tez ilosci ("kilkanascie rekordow") i wersje protokolow.
const kwoty = (text) => [...scisnij(text).matchAll(/(\d+)\s*zł/g)].map((m) => m[1]);
// Zapisy ceny, ktore rozumie `cenaWejscia` z lib/products.ts. Nowy format
// wpadlby po cichu do zlego przedzialu na filtrze /produkty.
const ZNANA_CENA =
  /^(od\s)?\d[\d\s]*\szł(\/mc)?$|^diagnoza\s\d+\szł$|^sprawdzenie za darmo$|^wycena po diagnozie$/;
for (const c of catalog) {
  const page = `app${c.href}/page.tsx`;
  if (!exists(page)) {
    add("brak-strony", `${c.name} wskazuje na ${c.href}, a strony nie ma`);
    continue;
  }
  // Strona moze byc cienkim opakowaniem na komponent kliencki, bo "use client"
  // wyklucza eksport metadanych. Wtedy ceny szukamy takze w sasiednich plikach
  // tego katalogu, inaczej rozdzielenie strony wyglada jak znikniecie ceny.
  let body = read(page);
  const katalog = path.join(ROOT, `app${c.href}`);
  if (fs.existsSync(katalog)) {
    for (const f of fs.readdirSync(katalog)) {
      if (f !== "page.tsx" && /\.tsx?$/.test(f)) {
        body += fs.readFileSync(path.join(katalog, f), "utf8");
      }
    }
  }
  if (!ZNANA_CENA.test(c.price)) {
    add("cena", `${c.href}: cena "${c.price}" jest w formacie, ktorego nie czyta cenaWejscia`);
  }
  // Kazda kwota widoczna w katalogu, tak z pola ceny jak i z bulletow, musi
  // padac na stronie docelowej. Rozjazd 900 kontra 490 zl na panelu zwrotow
  // siedzial wlasnie w bullecie, poza zasiegiem starszej wersji tej reguly.
  const scisniete = scisnij(body);
  for (const zrodlo of [c.price, ...c.bullets]) {
    for (const kwota of kwoty(zrodlo)) {
      if (!scisniete.includes(kwota)) {
        add(
          "cena",
          `${c.href}: katalog mowi "${zrodlo}" (${c.name}), a strona kwoty ${kwota} zl nie podaje`,
        );
      }
    }
  }
}

// --- 1b. lista narzedzi zgadza sie z katalogiem ---
// Kazdy produkt oznaczony jako majacy darmowe sprawdzenie musi byc do
// znalezienia z /narzedzia: albo wlasnym kafelkiem, albo przez wskazanie,
// ze uruchamia to samo narzedzie co inna pozycja.
const narzedzia = read("lib/narzedzia.ts");
const sekcjaB2B = narzedzia.slice(
  narzedzia.indexOf("export const businessTools"),
  narzedzia.indexOf("export const otherTools"),
);
const kafelki = [...sekcjaB2B.matchAll(/href: "([^"]+)"/g)].map((m) => m[1]);
const wspolne = [
  ...narzedzia
    .slice(narzedzia.indexOf("export const NARZEDZIE_WSPOLNE"))
    .matchAll(/"([^"]+)":\s*"([^"]+)"/g),
].map((m) => [m[1], m[2]]);
const wspolneOd = new Map(wspolne);

for (const b of blocks) {
  const href = b.match(/href:\s*"([^"]+)"/)?.[1];
  if (!href || !/narzedzie:\s*true/.test(b)) continue;
  if (kafelki.includes(href)) continue;
  const zamiast = wspolneOd.get(href);
  if (!zamiast) {
    add(
      "narzedzia",
      `${href}: produkt ma narzedzie: true, a nie ma go na /narzedzia ani w NARZEDZIE_WSPOLNE`,
    );
  } else if (!kafelki.includes(zamiast)) {
    add(
      "narzedzia",
      `${href}: wskazuje na ${zamiast}, a tej pozycji nie ma na /narzedzia`,
    );
  }
}
for (const h of kafelki) {
  if (!exists(`app${h}/page.tsx`)) {
    add("narzedzia", `${h}: kafelek na /narzedzia wskazuje na nieistniejaca strone`);
  }
}
// Kazde narzedzie musi dac sie wskazac w wyborze po sytuacji, inaczej
// przyciski na gorze listy pomijaja czesc oferty.
const wybor = read("components/WyborNarzedzia.tsx");
for (const h of kafelki) {
  if (!wybor.includes(`href: "${h}"`)) {
    add("narzedzia", `${h}: zadna sytuacja w WyborNarzedzia.tsx nie wskazuje tego narzedzia`);
  }
}

// --- 1c. kazda pozycja katalogu ma grupe, kazda grupa ma pozycje ---
// Filtr na /produkty i naglowki na stronach filarow biora sie wylacznie z
// pola `grupa`. Pozycja bez grupy wypadlaby z katalogu po cichu, a grupa bez
// pozycji zostawilaby przycisk, ktory niczego nie pokazuje.
const grupyTypu = [
  ...products
    .slice(products.indexOf("export type ProductGroup"), products.indexOf("export interface Product"))
    .matchAll(/\|\s*"([a-z]+)"/g),
].map((m) => m[1]);
const grupyUzyte = new Set();
for (const b of blocks) {
  const href = b.match(/href:\s*"([^"]+)"/)?.[1];
  const grupa = b.match(/grupa:\s*"([a-z]+)"/)?.[1];
  if (!href) continue;
  if (!grupa) {
    add("grupa", `${href}: pozycja katalogu bez pola grupa`);
    continue;
  }
  if (!grupyTypu.includes(grupa)) {
    add("grupa", `${href}: grupa "${grupa}" spoza typu ProductGroup`);
    continue;
  }
  grupyUzyte.add(grupa);
}
for (const g of grupyTypu) {
  if (!grupyUzyte.has(g)) {
    add("grupa", `grupa "${g}" nie ma ani jednej pozycji, a ma przycisk w katalogu`);
  }
}
// Kolejnosc filarow i grup trzymana w jednym miejscu, zeby katalog i strony
// filarow nie rozjechaly sie po dodaniu grupy.
const blokKolejnosci = products.slice(
  products.indexOf("export const GROUP_ORDER"),
  products.indexOf("export const GROUP_ORDER") + products.slice(products.indexOf("export const GROUP_ORDER")).indexOf("];"),
);
for (const g of grupyTypu) {
  if (!blokKolejnosci.includes(`"${g}"`)) {
    add("grupa", `grupa "${g}" nie wystepuje w GROUP_ORDER`);
  }
}

// --- 2. dlugie myslniki w widocznej tresci ---
const walk = (dir, out = []) => {
  for (const e of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
    const rel = `${dir}/${e.name}`;
    if (e.isDirectory()) {
      if (e.name === "node_modules" || e.name === ".next") continue;
      walk(rel, out);
    } else if (/\.(tsx|ts)$/.test(e.name)) out.push(rel);
  }
  return out;
};
const sourceFiles = [...walk("app"), ...walk("components"), ...walk("lib")];
const stripComments = (s) =>
  s.replace(/\{\/\*[\s\S]*?\*\/\}/g, "").replace(/\/\/[^\n]*/g, "").replace(/\/\*[\s\S]*?\*\//g, "");
for (const f of sourceFiles) {
  const clean = stripComments(read(f));
  if (clean.includes("—")) {
    const lines = clean.split("\n").filter((l) => l.includes("—")).length;
    add("em-dash", `${f}: dlugi myslnik w widocznej tresci, linii: ${lines}`);
  }
}

// --- 3. metadata na kazdej stronie ---
const pages = sourceFiles.filter((f) => /^app\/.*\/page\.tsx$/.test(f) || f === "app/page.tsx");
for (const f of pages) {
  const body = read(f);
  if (body.startsWith('"use client"')) continue; // metadata siedzi w layout albo rodzicu
  if (f === "app/page.tsx") continue; // strona glowna dziedziczy metadata z layoutu
  if (f === "app/panel/page.tsx") continue; // chroniony haslem, poza indeksem
  if (/export async function generateMetadata/.test(body)) continue; // trasy dynamiczne
  if (!/export const metadata/.test(body)) add("metadata", `${f}: brak metadata`);
  else {
    if (!/title:/.test(body)) add("metadata", `${f}: brak title`);
    if (!/description:/.test(body)) add("metadata", `${f}: brak description`);
    if (!/alternates:\s*\{[\s\S]{0,120}canonical/.test(body))
      add("metadata", `${f}: brak canonical`);
  }
}

// --- 4. strony sieroty: brak linku wewnetrznego ---
const allSource = sourceFiles.map((f) => read(f)).join("\n");
const routeOf = (f) => "/" + f.replace(/^app\//, "").replace(/\/page\.tsx$/, "").replace(/^page\.tsx$/, "");
for (const f of pages) {
  const route = routeOf(f);
  if (route === "/" || /\[/.test(route)) continue;
  const linked =
    allSource.includes(`href="${route}"`) ||
    allSource.includes(`href: "${route}"`) ||
    allSource.includes(`"${route}"`);
  if (!linked) add("sierota", `${route}: zadna strona do niej nie linkuje`);
}

// --- 5. sitemap zawiera kazda strone i odwrotnie ---
const sitemap = read("app/sitemap.ts");
for (const f of pages) {
  const route = routeOf(f);
  if (route === "/") continue;
  if (/\[/.test(route)) continue; // trasy dynamiczne
  // artykuly wchodza do sitemap petla po tablicy articles, nie literalem
  if (route.startsWith("/strefa-wiedzy/")) continue;
  // strony celowo poza indeksem
  if (["/cv", "/dziekuje", "/panel"].includes(route)) continue;
  if (!sitemap.includes(route)) add("sitemap", `${route}: brak w sitemap`);
}

// --- 6. kody HTTP na produkcji ---
if (LIVE) {
  const urls = [...sitemap.matchAll(/\$\{baseUrl\}(\/[a-z0-9\-/]*)/g)].map((m) => m[1]);
  const uniq = [...new Set(urls)];
  const results = await Promise.all(
    uniq.map(async (u) => {
      try {
        const r = await fetch(`https://www.fluxlab.pl${u}`, { redirect: "follow" });
        return { u, status: r.status };
      } catch {
        return { u, status: 0 };
      }
    }),
  );
  for (const r of results) if (r.status !== 200) add("http", `${r.u}: kod ${r.status}`);
  console.log(`Sprawdzono ${uniq.length} adresow na produkcji.`);
}

const byKind = {};
for (const p of problems) (byKind[p.kind] ||= []).push(p.msg);

if (!problems.length) {
  console.log("SPOJNOSC OK: brak rozjazdow.");
  process.exit(0);
}
console.log(`ROZJAZDY: ${problems.length}`);
for (const [kind, msgs] of Object.entries(byKind)) {
  console.log(`\n[${kind}] ${msgs.length}`);
  for (const m of msgs.slice(0, 40)) console.log("  - " + m);
  if (msgs.length > 40) console.log(`  ... i ${msgs.length - 40} wiecej`);
}
process.exit(1);
