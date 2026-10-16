/**
 * Kontrola kursora nad klikalnymi elementami, bez przeglądarki.
 *
 * Dostajemy HTML i treść stylów, a zwracamy klikalne elementy, nad którymi
 * kursor nie zmieni się w rączkę. Dopasowanie selektorów jest celowo proste:
 * patrzymy na ostatni człon selektora (znacznik, klasa, id, atrybut), bez
 * pseudoklas. Wychodzi z tego ocena raczej łagodna niż surowa, ale zawsze ta
 * sama dla tych samych plików. Moduł nie ma importów i działa także pod gołym
 * Node z usuwaniem typów, bo używa go też scripts/jakosc.mjs.
 */

export const LIMIT_CSS = 1_500_000;

type Atrybut = {
  nazwa: string;
  op: string;
  wartosc: string;
  bezWielkosci: boolean;
};
type Czlon = {
  tag: string | null;
  id: string | null;
  klasy: string[];
  atrybuty: Atrybut[];
};

export type ArkuszKursora = {
  /** Selektory z cursor: pointer (albo z kursorem nieznanym, np. var()). */
  raczka: Czlon[];
  /** Selektory z innym kursorem (default, auto, text...). */
  inny: Czlon[];
};

export type ProblemKursora = {
  tag: string;
  tekst: string;
  klasa: string;
  opis: string;
  ile: number;
};

export type WynikKursora = {
  /** Klikalne elementy razem z linkami. */
  klikalnych: number;
  /** Klikalne elementy bez rączki, scalone po opisie. */
  problemy: ProblemKursora[];
  /** Łączna liczba elementów bez rączki (z powtórzeniami). */
  bezRaczki: number;
};

/* ---------------------------- CSS ---------------------------- */

function bezEscape(s: string): string {
  return s
    .replace(/\\([0-9a-fA-F]{1,6})\s?/g, (_, h) =>
      String.fromCodePoint(parseInt(h, 16)),
    )
    .replace(/\\(.)/g, "$1");
}

/** Podział po przecinkach poza nawiasami i cudzysłowami. */
function podziel(s: string, znak: string): string[] {
  const wynik: string[] = [];
  let glebokosc = 0;
  let cudzyslow = "";
  let start = 0;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === "\\") {
      i++;
      continue;
    }
    if (cudzyslow) {
      if (c === cudzyslow) cudzyslow = "";
      continue;
    }
    if (c === '"' || c === "'") cudzyslow = c;
    else if (c === "(" || c === "[") glebokosc++;
    else if (c === ")" || c === "]") glebokosc--;
    else if (c === znak && glebokosc === 0) {
      wynik.push(s.slice(start, i));
      start = i + 1;
    }
  }
  wynik.push(s.slice(start));
  return wynik.map((x) => x.trim()).filter(Boolean);
}

/** Ostatni człon selektora złożonego (po spacji, >, +, ~). */
function ostatniCzlon(sel: string): string {
  let glebokosc = 0;
  let cudzyslow = "";
  let start = 0;
  for (let i = 0; i < sel.length; i++) {
    const c = sel[i];
    if (c === "\\") {
      i++;
      continue;
    }
    if (cudzyslow) {
      if (c === cudzyslow) cudzyslow = "";
      continue;
    }
    if (c === '"' || c === "'") cudzyslow = c;
    else if (c === "(" || c === "[") glebokosc++;
    else if (c === ")" || c === "]") glebokosc--;
    else if (glebokosc === 0 && /[\s>+~]/.test(c)) start = i + 1;
  }
  return sel.slice(start);
}

const PSEUDOELEMENTY_ELEMENTU =
  /^::?(-webkit-file-upload-button|file-selector-button)$/i;
const PSEUDOELEMENTY_LEGACY =
  /^:(before|after|first-letter|first-line|selection|placeholder|marker|backdrop)$/i;

/** Człon na listę wariantów (więcej niż jeden przy :is()/:where()). */
function czytajCzlon(zrodlo: string): Czlon[] {
  const baza: Czlon = { tag: null, id: null, klasy: [], atrybuty: [] };
  const alternatywy: string[][] = [];
  let i = 0;
  let cos = false;
  const s = zrodlo;
  const ident = (): string => {
    let w = "";
    while (i < s.length) {
      const c = s[i];
      if (c === "\\") {
        w += s.slice(i, i + 2);
        i += 2;
        continue;
      }
      if (/[\w\u0080-￿-]/.test(c)) {
        w += c;
        i++;
      } else break;
    }
    return bezEscape(w);
  };
  const doNawiasu = (): string => {
    const start = i;
    let g = 1;
    i++;
    while (i < s.length && g > 0) {
      if (s[i] === "\\") i++;
      else if (s[i] === "(") g++;
      else if (s[i] === ")") g--;
      i++;
    }
    return s.slice(start + 1, i - 1);
  };
  while (i < s.length) {
    const c = s[i];
    if (c === "*") {
      i++;
      cos = true;
    } else if (c === ".") {
      i++;
      baza.klasy.push(ident());
      cos = true;
    } else if (c === "#") {
      i++;
      baza.id = ident();
      cos = true;
    } else if (c === "[") {
      const kon = s.indexOf("]", i);
      if (kon < 0) return [];
      const m = s
        .slice(i + 1, kon)
        .trim()
        .match(
          /^([\w:|-]+)\s*(?:([~|^$*]?=)\s*("([^"]*)"|'([^']*)'|[^\s\]]+)\s*([is])?)?$/i,
        );
      i = kon + 1;
      if (!m) return [];
      baza.atrybuty.push({
        nazwa: m[1].replace(/^.*\|/, "").toLowerCase(),
        op: m[2] ?? "",
        wartosc: bezEscape(m[4] ?? m[5] ?? m[3] ?? ""),
        bezWielkosci: (m[6] ?? "").toLowerCase() === "i",
      });
      cos = true;
    } else if (c === ":") {
      const podwojny = s[i + 1] === ":";
      i += podwojny ? 2 : 1;
      const nazwa = ident().toLowerCase();
      const pelna = (podwojny ? "::" : ":") + nazwa;
      let arg = "";
      if (s[i] === "(") arg = doNawiasu();
      if (podwojny || PSEUDOELEMENTY_LEGACY.test(pelna)) {
        if (!PSEUDOELEMENTY_ELEMENTU.test(pelna)) return [];
        continue;
      }
      if (
        ["is", "where", "matches", "-webkit-any", "-moz-any"].includes(nazwa) &&
        arg
      ) {
        alternatywy.push(podziel(arg, ",").map(ostatniCzlon));
      }
      // pozostałe pseudoklasy (:hover, :not(), :focus...) zdejmujemy
    } else if (/[\w\u0080-￿-]|\\/.test(c)) {
      baza.tag = ident().toLowerCase();
      cos = true;
    } else {
      i++;
    }
  }
  let warianty: Czlon[] = cos ? [baza] : [];
  for (const lista of alternatywy) {
    const nowe: Czlon[] = [];
    const bazowe = warianty.length
      ? warianty
      : [{ tag: null, id: null, klasy: [], atrybuty: [] } as Czlon];
    for (const b of bazowe) {
      for (const alt of lista) {
        for (const a of czytajCzlon(alt)) {
          nowe.push({
            tag: a.tag ?? b.tag,
            id: a.id ?? b.id,
            klasy: [...b.klasy, ...a.klasy],
            atrybuty: [...b.atrybuty, ...a.atrybuty],
          });
        }
      }
    }
    warianty = nowe;
  }
  return warianty;
}

function rodzajKursora(wartosc: string): "raczka" | "inny" | null {
  const v = wartosc.trim().toLowerCase();
  if (/\b(pointer|hand)\b/.test(v) || /var\(|url\(/.test(v)) return "raczka";
  if (/^(inherit|initial|unset|revert|revert-layer)$/.test(v)) return null;
  return v ? "inny" : null;
}

function bezKomentarzy(css: string): string {
  return css.replace(/\/\*[\s\S]*?\*\//g, "");
}

/** Odczytuje reguły z kursorem z treści CSS. Wynik można trzymać w pamięci. */
export function przygotujCss(cssZrodlo: string): ArkuszKursora {
  const css = bezKomentarzy(cssZrodlo.slice(0, LIMIT_CSS));
  const ark: ArkuszKursora = { raczka: [], inny: [] };
  if (!/cursor\s*:/i.test(css)) return ark;

  // Skaner bloków: prelude { ciało }. Obsługuje @media/@supports/@layer
  // i zagnieżdżanie reguł (CSS nesting z &).
  const blok = (od: number, rodzice: string[] | null): number => {
    let i = od;
    let prelude = "";
    let deklaracje = "";
    while (i < css.length) {
      const c = css[i];
      if (c === '"' || c === "'") {
        const kon = css.indexOf(c, i + 1);
        const kawalek = css.slice(i, kon < 0 ? css.length : kon + 1);
        prelude += kawalek;
        i = kon < 0 ? css.length : kon + 1;
        continue;
      }
      if (c === "{") {
        const p = prelude.trim();
        prelude = "";
        if (p.startsWith("@")) {
          if (/^@(media|supports|layer|container|document|scope)\b/i.test(p)) {
            i = blok(i + 1, rodzice);
          } else {
            i = pomin(i + 1);
          }
          continue;
        }
        let selektory = podziel(p, ",");
        if (rodzice) {
          const pelne: string[] = [];
          for (const r of rodzice)
            for (const s of selektory)
              pelne.push(s.includes("&") ? s.split("&").join(r) : `${r} ${s}`);
          selektory = pelne;
        }
        i = blok(i + 1, selektory);
        continue;
      }
      if (c === ";") {
        deklaracje += prelude + ";";
        prelude = "";
        i++;
        continue;
      }
      if (c === "}") {
        deklaracje += prelude;
        zapisz(rodzice, deklaracje);
        return i + 1;
      }
      prelude += c;
      i++;
    }
    zapisz(rodzice, deklaracje + prelude);
    return i;
  };
  const pomin = (od: number): number => {
    let g = 1;
    let i = od;
    while (i < css.length && g > 0) {
      if (css[i] === "{") g++;
      else if (css[i] === "}") g--;
      i++;
    }
    return i;
  };
  const zapisz = (selektory: string[] | null, deklaracje: string) => {
    if (!selektory) return;
    let rodzaj: "raczka" | "inny" | null = null;
    for (const m of deklaracje.matchAll(/(?:^|[;\s])cursor\s*:\s*([^;]+)/gi)) {
      rodzaj = rodzajKursora(m[1].replace(/!important/i, "")) ?? rodzaj;
    }
    if (!rodzaj) return;
    for (const sel of selektory) {
      if (rodzaj === "inny" && /disabled|\[aria-busy|\.loading/i.test(sel))
        continue;
      for (const czlon of czytajCzlon(ostatniCzlon(sel)))
        ark[rodzaj].push(czlon);
    }
  };
  blok(0, null);
  return ark;
}

/* ---------------------------- HTML ---------------------------- */

type Element = {
  tag: string;
  atr: Map<string, string>;
  klasy: string[];
};

const PUSTE = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "source",
  "track",
  "wbr",
]);

const ENCJE: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};
function dekoduj(s: string): string {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) =>
      String.fromCodePoint(parseInt(h, 16)),
    )
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&(\w+);/g, (m, n) => ENCJE[n] ?? m);
}

function pasuje(cz: Czlon, el: Element): boolean {
  if (cz.tag && cz.tag !== el.tag) return false;
  if (cz.id && el.atr.get("id") !== cz.id) return false;
  for (const k of cz.klasy) if (!el.klasy.includes(k)) return false;
  for (const a of cz.atrybuty) {
    const v0 = el.atr.get(a.nazwa);
    if (v0 === undefined) return false;
    if (!a.op) continue;
    const v = a.bezWielkosci ? v0.toLowerCase() : v0;
    const w = a.bezWielkosci ? a.wartosc.toLowerCase() : a.wartosc;
    const ok =
      a.op === "="
        ? v === w
        : a.op === "~="
          ? v.split(/\s+/).includes(w)
          : a.op === "|="
            ? v === w || v.startsWith(w + "-")
            : a.op === "^="
              ? w !== "" && v.startsWith(w)
              : a.op === "$="
                ? w !== "" && v.endsWith(w)
                : w !== "" && v.includes(w);
    if (!ok) return false;
  }
  return true;
}

const KLIKALNE_INPUT = new Set([
  "submit",
  "button",
  "reset",
  "checkbox",
  "radio",
  "file",
  "image",
]);
const KLIKALNE_ROLE = new Set([
  "button",
  "link",
  "tab",
  "menuitem",
  "checkbox",
  "switch",
  "option",
]);
const UKRYTE_KLASY =
  /^(sr-only|visually-hidden|screen-reader-text|screen-reader-only|hidden|d-none|invisible|hide)$/;

function ukryty(el: Element): boolean {
  if (
    el.atr.has("hidden") ||
    el.atr.get("aria-hidden") === "true" ||
    el.atr.get("type") === "hidden"
  )
    return true;
  const styl = (el.atr.get("style") ?? "").replace(/\s/g, "").toLowerCase();
  if (/display:none|visibility:hidden|opacity:0(?![.\d])/.test(styl))
    return true;
  return el.klasy.some((k) => UKRYTE_KLASY.test(k));
}

/** Adresy arkuszy podpiętych w dokumencie, bezwzględne, bez powtórzeń. */
export function arkuszeZHtml(html: string, baza: string): string[] {
  const wynik: string[] = [];
  for (const m of html.matchAll(/<link\b[^>]*>/gi)) {
    if (!/\brel\s*=\s*["']?[^"'>]*\bstylesheet\b/i.test(m[0])) continue;
    if (/\bdisabled\b/i.test(m[0].replace(/["'][^"']*["']/g, ""))) continue;
    const h = m[0].match(/\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
    const href = h ? dekoduj(h[1] ?? h[2] ?? h[3] ?? "") : "";
    if (!href || href.startsWith("data:")) continue;
    try {
      const a = new URL(href, baza).toString();
      if (!wynik.includes(a)) wynik.push(a);
    } catch {
      /* zły adres pomijamy */
    }
  }
  return wynik;
}

/**
 * Pobiera arkusze strony funkcją wywołującego (ona trzyma pamięć podręczną)
 * do łącznego limitu LIMIT_CSS. Zwraca przygotowane arkusze i liczbę tych,
 * których nie udało się przeczytać.
 */
export async function arkuszeStrony(
  html: string,
  baza: string,
  pobierz: (adres: string) => Promise<{ arkusz: ArkuszKursora; bajty: number } | null>,
): Promise<{ arkusze: ArkuszKursora[]; nieprzeczytane: number }> {
  const adresy = arkuszeZHtml(html, baza).slice(0, 40);
  const wyniki = await Promise.all(adresy.map((a) => pobierz(a)));
  const arkusze: ArkuszKursora[] = [];
  let nieprzeczytane = 0;
  let suma = 0;
  for (const w of wyniki) {
    suma += w?.bajty ?? 0;
    if (!w || suma > LIMIT_CSS) nieprzeczytane++;
    else arkusze.push(w.arkusz);
  }
  return { arkusze, nieprzeczytane };
}

/**
 * Główna kontrola. Style z <style> w dokumencie czyta sama, arkusze
 * zewnętrzne dostaje jako tekst albo jako wynik przygotujCss.
 */
export function sprawdzKursor(
  htmlZrodlo: string,
  css: (string | ArkuszKursora)[] = [],
): WynikKursora {
  const inline = [
    ...htmlZrodlo.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi),
  ]
    .map((m) => m[1])
    .join("\n");
  const arkusze = [...css, inline].map((c) =>
    typeof c === "string" ? przygotujCss(c) : c,
  );
  const raczka = arkusze.flatMap((a) => a.raczka);
  const inny = arkusze.flatMap((a) => a.inny);

  const html = htmlZrodlo
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(
      /<(script|style|template|noscript|textarea)\b[\s\S]*?<\/\1\s*>/gi,
      (m, t) => `<${t}></${t}>`,
    );

  // Pierwsze przejście: id pól wyboru, do których mogą prowadzić etykiety.
  const polaWyboru = new Set<string>();
  for (const m of html.matchAll(/<input\b[^>]*>/gi)) {
    if (!/\btype\s*=\s*["']?(checkbox|radio)\b/i.test(m[0])) continue;
    const id = m[0].match(/\bid\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
    if (id) polaWyboru.add(dekoduj(id[1] ?? id[2] ?? id[3] ?? ""));
  }

  type Wezel = {
    el: Element;
    raczka: boolean;
    problem: ProblemKursora | null;
    start: number;
    ukryty: boolean;
  };
  const stos: Wezel[] = [];
  const problemy = new Map<string, ProblemKursora>();
  let klikalnych = 0;
  let bezRaczki = 0;

  const opisz = (w: Wezel, koniec: number) => {
    if (!w.problem) return;
    let tekst = dekoduj(html.slice(w.start, koniec).replace(/<[^>]+>/g, " "))
      .replace(/\s+/g, " ")
      .trim();
    const a = w.el.atr;
    if (!tekst || w.el.tag === "select")
      tekst =
        a.get("aria-label") ??
        a.get("title") ??
        a.get("value") ??
        a.get("placeholder") ??
        a.get("name") ??
        "";
    if (!tekst && w.el.tag === "input") tekst = a.get("type") ?? "";
    tekst = tekst.trim().slice(0, 40);
    const p = w.problem;
    p.tekst = tekst;
    p.opis = `${p.tag}${tekst ? ` „${tekst}”` : ""}${p.klasa ? ` (${p.klasa})` : ""}`;
    const juz = problemy.get(p.opis);
    if (juz) juz.ile++;
    else problemy.set(p.opis, p);
  };

  const re =
    /<(\/?)([a-zA-Z][\w:-]*)((?:\s+[^\s"'>/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'>]+))?)*)\s*(\/?)>/g;
  for (const m of html.matchAll(re)) {
    const tag = m[2].toLowerCase();
    const poz = m.index ?? 0;
    if (m[1]) {
      const idx = stos.map((w) => w.el.tag).lastIndexOf(tag);
      if (idx < 0) continue;
      while (stos.length > idx) opisz(stos.pop()!, poz);
      continue;
    }
    const atr = new Map<string, string>();
    for (const a of m[3].matchAll(
      /([^\s"'>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g,
    )) {
      const n = a[1].toLowerCase();
      if (!atr.has(n)) atr.set(n, dekoduj(a[2] ?? a[3] ?? a[4] ?? ""));
    }
    const el: Element = {
      tag,
      atr,
      klasy: (atr.get("class") ?? "").split(/\s+/).filter(Boolean),
    };
    const rodzic = stos[stos.length - 1];
    const ukrytyEl = (rodzic?.ukryty ?? false) || ukryty(el);

    const stylInline = (atr.get("style") ?? "").match(
      /(?:^|;)\s*cursor\s*:\s*([^;]+)/i,
    )?.[1];
    const inlineRodzaj = stylInline ? rodzajKursora(stylInline) : null;
    const wlasnaRaczka =
      inlineRodzaj === "raczka" ||
      (inlineRodzaj === null && raczka.some((c) => pasuje(c, el)));
    const wlasnyInny =
      inlineRodzaj === "inny" ||
      (inlineRodzaj === null &&
        !wlasnaRaczka &&
        inny.some((c) => pasuje(c, el)));

    const typ = (atr.get("type") ?? "").toLowerCase();
    const rola = (atr.get("role") ?? "").toLowerCase();
    const link = tag === "a" && atr.has("href");
    const klikalny =
      !link &&
      (tag === "button" ||
        (tag === "input" && KLIKALNE_INPUT.has(typ)) ||
        tag === "select" ||
        tag === "summary" ||
        KLIKALNE_ROLE.has(rola) ||
        (atr.has("onclick") && tag !== "body" && tag !== "html") ||
        (tag === "label" && polaWyboru.has(atr.get("for") ?? "\u0000")));
    const wylaczony =
      atr.has("disabled") ||
      atr.get("aria-disabled") === "true" ||
      stos.some((w) => w.el.tag === "fieldset" && w.el.atr.has("disabled"));

    let maRaczke: boolean;
    if (link) maRaczke = wlasnaRaczka || !wlasnyInny;
    else maRaczke = wlasnaRaczka || (!wlasnyInny && (rodzic?.raczka ?? false));

    let problem: ProblemKursora | null = null;
    if ((klikalny || link) && !wylaczony && !ukrytyEl) {
      klikalnych++;
      if (!maRaczke) {
        bezRaczki++;
        const tagOpis =
          tag === "input"
            ? `input type=${typ}`
            : rola && tag !== "button"
              ? `${tag} role=${rola}`
              : tag;
        problem = {
          tag: tagOpis,
          tekst: "",
          klasa: el.klasy
            .slice(0, 3)
            .map((k) => "." + k)
            .join(""),
          opis: "",
          ile: 1,
        };
      }
    }
    const wezel: Wezel = {
      el,
      raczka: maRaczke,
      problem,
      start: poz + m[0].length,
      ukryty: ukrytyEl,
    };
    if (PUSTE.has(tag) || m[4]) opisz(wezel, wezel.start);
    else stos.push(wezel);
  }
  while (stos.length) opisz(stos.pop()!, html.length);

  return { klikalnych, problemy: [...problemy.values()], bezRaczki };
}
