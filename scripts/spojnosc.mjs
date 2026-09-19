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
  if (href && price && name) catalog.push({ href, price, name });
}
for (const c of catalog) {
  const page = `app${c.href}/page.tsx`;
  if (!exists(page)) {
    add("brak-strony", `${c.name} wskazuje na ${c.href}, a strony nie ma`);
    continue;
  }
  const body = read(page);
  const nums = c.price.match(/\d+/g) || [];
  if (nums.length && !nums.every((n) => body.includes(n))) {
    add(
      "cena",
      `${c.href}: katalog mowi "${c.price}" (${c.name}), a strona tej kwoty nie podaje`,
    );
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
  if (["/cv", "/dziekuje"].includes(route)) continue;
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
