// Pomiar kontrastu tekstu wzgledem tla, wprost w przegladarce.
//
// Powstal, bo audyt techniczny wskazywal kontrast liczony z samych klas
// Tailwinda, a to nie to samo, co widzi odwiedzajacy: liczy sie kolor po
// zlozeniu przezroczystosci i tlo wziete z pierwszego przodka, ktory je ma.
// Skrypt chodzi po stronach lokalnego buildu, w obu motywach, i zglasza
// kazdy wezel tekstowy ponizej progu WCAG AA.
//
//   node scripts/kontrast.mjs                      (domyslna lista stron)
//   node scripts/kontrast.mjs /kontakt /produkty   (wybrane strony)
//
// Prog: 4,5:1 dla zwyklego tekstu, 3:1 dla duzego (>=24 px albo >=18,66 px
// przy grubosci >=700), zgodnie z WCAG 2.1 AA.
import { chromium } from "playwright";

const BAZA = process.env.KONTRAST_BAZA ?? "http://localhost:3320";
const STRONY = process.argv.slice(2).filter((a) => a.startsWith("/"));
const DOMYSLNE = [
  "/",
  "/produkty",
  "/narzedzia",
  "/kontakt",
  "/audyt-strony",
  "/strefa-wiedzy",
  "/automatyzacja-leadow-crm",
  "/realizacje",
  "/jak-pracuje",
  "/cennik",
];
const cele = STRONY.length ? STRONY : DOMYSLNE;

// Sekwencje klikniec do wykonania przed pomiarem, osobno dla kazdej sciezki:
//   KONTRAST_KLIKI='{"/sciezka": [["sel1"], ["sel1","sel2"]]}'
// Kazda sekwencja mierzona jest na swiezo zaladowanej stronie, w obu motywach.
const KLIKI = JSON.parse(process.env.KONTRAST_KLIKI ?? "{}");
let stanow = 0;

const ZBIERZ = () => {
  const rozbij = (s) => {
    const m = s.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const cz = m[1]
      .split(/[,\s/]+/)
      .filter(Boolean)
      .map(Number);
    return { r: cz[0], g: cz[1], b: cz[2], a: cz.length > 3 ? cz[3] : 1 };
  };
  const zloz = (wierzch, spod) => ({
    r: wierzch.r * wierzch.a + spod.r * (1 - wierzch.a),
    g: wierzch.g * wierzch.a + spod.g * (1 - wierzch.a),
    b: wierzch.b * wierzch.a + spod.b * (1 - wierzch.a),
    a: 1,
  });
  const jasnosc = ({ r, g, b }) => {
    const k = [r, g, b].map((v) => {
      const x = v / 255;
      return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * k[0] + 0.7152 * k[1] + 0.0722 * k[2];
  };
  const stosunek = (a, b) => {
    const x = jasnosc(a),
      y = jasnosc(b);
    return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
  };
  const hex = ({ r, g, b }) =>
    "#" +
    [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");

  // Tlo pod elementem: pierwszy przodek z niezerowa alfa, zlozony z tym,
  // co jest jeszcze nizej. Gradient traktujemy osobno, bo nie ma jednego koloru.
  const tlo = (el) => {
    const warstwy = [];
    let w = el;
    let gradient = null;
    while (w && w !== document.documentElement.parentNode) {
      const s = getComputedStyle(w);
      if (
        !gradient &&
        s.backgroundImage &&
        s.backgroundImage.includes("gradient")
      ) {
        gradient = s.backgroundImage;
      }
      const t = rozbij(s.backgroundColor);
      if (t && t.a > 0) {
        warstwy.push(t);
        if (t.a === 1) break;
      }
      w = w.parentElement;
    }
    let pod = { r: 255, g: 255, b: 255, a: 1 };
    for (let i = warstwy.length - 1; i >= 0; i--) pod = zloz(warstwy[i], pod);
    return { kolor: pod, gradient };
  };

  const wynik = [];
  for (const el of document.querySelectorAll("body *")) {
    const tekst = [...el.childNodes]
      .filter((n) => n.nodeType === 3)
      .map((n) => n.textContent.trim())
      .join(" ")
      .trim();
    if (!tekst) continue;
    const s = getComputedStyle(el);
    if (
      s.display === "none" ||
      s.visibility === "hidden" ||
      Number(s.opacity) === 0
    )
      continue;
    const p = el.getBoundingClientRect();
    if (p.width < 1 || p.height < 1) continue;
    let ukryty = false;
    for (let w = el; w; w = w.parentElement) {
      const ws = getComputedStyle(w);
      if (
        ws.display === "none" ||
        ws.visibility === "hidden" ||
        Number(ws.opacity) === 0
      ) {
        ukryty = true;
        break;
      }
    }
    if (ukryty) continue;

    // Tekst lezacy na wideo albo zdjeciu: kolor tla nie istnieje, bo pod
    // spodem jest ruchomy obraz. Takich nie da sie zmierzyc tym sposobem,
    // wiec trafiaja do osobnego worka zamiast podbijac liczbe bledow.
    let naMediach = false;
    for (let w = el; w && w !== document.body; w = w.parentElement) {
      for (const m of w.querySelectorAll(
        ":scope > video, :scope > img, :scope > picture",
      )) {
        const ms = getComputedStyle(m);
        if (ms.position === "absolute" || ms.position === "fixed") {
          const mp = m.getBoundingClientRect();
          if (mp.width >= p.width && mp.height >= p.height) naMediach = true;
        }
      }
      if (naMediach) break;
    }

    const { kolor: podlozeRaw, gradient } = tlo(el);
    const barwa = rozbij(s.color);
    if (!barwa) continue;
    const przod = barwa.a < 1 ? zloz(barwa, podlozeRaw) : barwa;

    // Gradient zakrywa to, co pod nim, wiec liczymy wylacznie jego przystanki,
    // kazdy zlozony z warstwa nizsza, gdy jest przezroczysty. Bez tego bialy
    // napis na fioletowym przycisku wychodzil jako bialy na bialym.
    let podloza = [podlozeRaw];
    if (gradient) {
      const przystanki = [];
      for (const m of gradient.matchAll(/rgba?\([^)]+\)/g)) {
        const t = rozbij(m[0]);
        if (t && t.a > 0) przystanki.push(t.a < 1 ? zloz(t, podlozeRaw) : t);
      }
      if (przystanki.length) podloza = przystanki;
    }
    let najgorszy = Infinity;
    let podloze = podlozeRaw;
    for (const t of podloza) {
      const r = stosunek(przod, t);
      if (r < najgorszy) {
        najgorszy = r;
        podloze = t;
      }
    }

    const px = parseFloat(s.fontSize);
    const grubosc = Number(s.fontWeight) || 400;
    const duzy = px >= 24 || (px >= 18.66 && grubosc >= 700);
    const prog = duzy ? 3 : 4.5;
    if (najgorszy >= prog) continue;
    wynik.push({
      tekst: tekst.slice(0, 60),
      klasy: typeof el.className === "string" ? el.className.slice(0, 120) : "",
      tag: el.tagName.toLowerCase(),
      przod: hex(przod),
      tlo: hex(podloze),
      gradient: Boolean(gradient),
      px: Math.round(px * 10) / 10,
      stosunek: Math.round(najgorszy * 100) / 100,
      prog,
      naMediach,
    });
  }
  return wynik;
};

const przegladarka = await chromium.launch();
const raport = [];
for (const motyw of ["light", "dark"]) {
  const kontekst = await przegladarka.newContext({
    colorScheme: motyw,
    viewport: { width: 1440, height: 900 },
  });
  const karta = await kontekst.newPage();
  for (const sciezka of cele) {
    await karta.goto(BAZA + sciezka, {
      waitUntil: "networkidle",
      timeout: 45000,
    });
    // Motyw trzyma klasa na <html>, wiec ustawiamy go wprost, nie licząc
    // na to, ze skrypt startowy zdazy zareagowac na preferencje systemu.
    await karta.evaluate((m) => {
      document.documentElement.classList.toggle("dark", m === "dark");
    }, motyw);
    await karta.waitForTimeout(250);
    const bledy = await karta.evaluate(ZBIERZ);
    for (const b of bledy) raport.push({ motyw, sciezka, ...b });

    // Stany, ktore powstaja dopiero po nacisnieciu. Bez tego skrypt mierzyl
    // wylacznie to, co widac od razu, a wyniki wszystkich pietnastu sprawdzen
    // mierzylo sie co cykl doklejanym skryptem od nowa.
    for (const sekwencja of KLIKI[sciezka] ?? []) {
      // Wchodzimy pod czysty adres, a nie przez reload: zakladki dopisuja
      // kotwice przez replaceState, wiec reload otwieralby zakladke z
      // poprzedniej sekwencji zamiast stanu poczatkowego.
      await karta.goto(BAZA + sciezka, {
        waitUntil: "networkidle",
        timeout: 45000,
      });
      await karta.evaluate((m) => {
        document.documentElement.classList.toggle("dark", m === "dark");
      }, motyw);
      for (const selektor of sekwencja) {
        await karta.click(selektor, { timeout: 10000 });
      }
      // Przejscia kolorow trwaja, a kolor zmierzony w polowie animacji nie
      // jest kolorem, ktory ktokolwiek widzi.
      await karta.waitForTimeout(600);
      const poKliknieciu = await karta.evaluate(ZBIERZ);
      const opis = `${sciezka} [${sekwencja.join(" > ")}]`;
      for (const b of poKliknieciu) raport.push({ motyw, sciezka: opis, ...b });
      stanow += 1;
    }
  }
  await kontekst.close();
}
await przegladarka.close();

const mierzalne = raport.filter((r) => !r.naMediach);
const naMediach = raport.filter((r) => r.naMediach);
console.log(
  `Zbadano ${cele.length} stron w dwoch motywach, w tym ${stanow} stanow po` +
    ` kliknieciu. Zgloszen: ${mierzalne.length}` +
    ` (plus ${naMediach.length} napisow na wideo lub zdjeciu, tlo niemierzalne)\n`,
);
for (const motyw of ["light", "dark"]) {
  const g = mierzalne.filter((r) => r.motyw === motyw);
  console.log(`== motyw ${motyw}: ${g.length} zgloszen ==`);
  const wg = new Map();
  for (const r of g) {
    const k = `${r.przod} na ${r.tlo}${r.gradient ? " (gradient)" : ""} = ${r.stosunek}:1, prog ${r.prog}`;
    if (!wg.has(k)) wg.set(k, []);
    wg.get(k).push(r);
  }
  for (const [k, v] of [...wg].sort((a, b) => b[1].length - a[1].length)) {
    console.log(`  ${String(v.length).padStart(4)}x  ${k}`);
    console.log(`        np. <${v[0].tag}> "${v[0].tekst}" na ${v[0].sciezka}`);
    console.log(`        klasy: ${v[0].klasy}`);
  }
  console.log("");
}
if (naMediach.length) {
  console.log(
    `== napisy na wideo lub zdjeciu: ${naMediach.length}, tla nie da sie policzyc ==`,
  );
  for (const r of naMediach.slice(0, 8)) {
    console.log(`  <${r.tag}> "${r.tekst}" na ${r.sciezka} (${r.motyw})`);
  }
  console.log("");
}
process.exit(mierzalne.length ? 1 : 0);
