import { NextResponse } from "next/server";
import dns from "dns/promises";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SELECTORS = [
  "default", "google", "selector1", "selector2", "k1", "dkim", "mail",
  "s1", "s2", "zoho", "zmail", "mandrill", "sendgrid", "smtp", "resend",
  "brevo", "sib", "mailjet", "amazonses", "mg", "mailgun", "protonmail",
];

type Wynik = {
  domena: string;
  mx: string[];
  dostawca: string;
  spf: string | null;
  dmarc: string | null;
  dmarcP: string | null;
  dkim: boolean;
  punkty: number;
  problemy: { tytul: string; opis: string; waga: number }[];
};

function dostawca(mx: string[]): string {
  const j = mx.join(" ").toLowerCase();
  if (j.includes("google")) return "Google Workspace";
  if (j.includes("outlook") || j.includes("protection.outlook")) return "Microsoft 365";
  if (j.includes("zoho")) return "Zoho";
  if (j.includes("home.pl")) return "home.pl";
  if (j.includes("nazwa.pl")) return "nazwa.pl";
  if (j.includes("ovh")) return "OVH";
  return mx[0] || "brak MX";
}

async function txt(name: string): Promise<string[]> {
  try {
    return (await dns.resolveTxt(name)).map((chunks) => chunks.join(""));
  } catch {
    return [];
  }
}

export async function POST(req: Request) {
  let domena = "";
  try {
    const body = await req.json();
    domena = String(body.domena || "").trim().toLowerCase()
      .replace(/^https?:\/\//, "").replace(/\/.*$/, "").replace(/^www\./, "");
  } catch {
    return NextResponse.json({ error: "Podaj domenę." }, { status: 400 });
  }
  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(domena)) {
    return NextResponse.json({ error: "To nie wygląda na poprawną domenę." }, { status: 400 });
  }

  let mx: string[] = [];
  try {
    mx = (await dns.resolveMx(domena)).sort((a, b) => a.priority - b.priority).map((m) => m.exchange);
  } catch { /* brak MX */ }

  const problemy: Wynik["problemy"] = [];

  if (mx.length === 0) {
    const w: Wynik = { domena, mx, dostawca: "brak MX", spf: null, dmarc: null,
      dmarcP: null, dkim: false, punkty: 0,
      problemy: [{ tytul: "Domena nie odbiera poczty", opis: "Brak rekordów MX.", waga: 100 }] };
    return NextResponse.json(w);
  }

  const wszTxt = await txt(domena);
  const spf = wszTxt.find((t) => t.toLowerCase().startsWith("v=spf1")) || null;
  const wieleSpf = wszTxt.filter((t) => t.toLowerCase().startsWith("v=spf1")).length > 1;

  const dmTxt = (await txt("_dmarc." + domena)).find((t) => t.toLowerCase().startsWith("v=dmarc1")) || null;
  const dmarcP = dmTxt ? (dmTxt.match(/\bp\s*=\s*(\w+)/)?.[1] || null) : null;

  // DKIM: sprawdzamy selektory rownolegle
  const dkim = (await Promise.all(
    SELECTORS.map(async (s) => {
      const t = await txt(`${s}._domainkey.${domena}`);
      if (t.some((x) => /v=dkim1|p=/i.test(x))) return true;
      try { await dns.resolveCname(`${s}._domainkey.${domena}`); return true; } catch { return false; }
    })
  )).some(Boolean);

  if (!spf) problemy.push({ tytul: "Brak rekordu SPF", waga: 40,
    opis: "Bez SPF dowolna osoba może wysłać maila podpisanego Waszą domeną, a odbiorca tego nie wykryje." });
  else {
    if (wieleSpf) problemy.push({ tytul: "Dwa rekordy SPF", waga: 35,
      opis: "Standard nakazuje odrzucić oba. W praktyce Wasz SPF nie działa wcale." });
    const all = spf.match(/([~\-+?])all/)?.[0];
    if (all === "+all") problemy.push({ tytul: "SPF kończy się +all", waga: 40,
      opis: "Rekord przepuszcza dowolnego nadawcę na świecie. To zwykle literówka." });
    else if (all === "?all") problemy.push({ tytul: "SPF neutralny (?all)", waga: 25,
      opis: "Polityka neutralna, nic nie chroni." });
  }
  if (!dmTxt) problemy.push({ tytul: "Brak rekordu DMARC", waga: 35,
    opis: "Od 2024 Gmail i Outlook wymagają DMARC. Bez niego część Waszych maili trafia do spamu, a Wy tego nie widzicie." });
  else if (dmarcP === "none") problemy.push({ tytul: "DMARC tylko obserwuje (p=none)", waga: 20,
    opis: "Rekord jest, ale nie blokuje podszywania. Dobry na start, na stałe nie chroni." });
  if (!dkim) problemy.push({ tytul: "Nie wykryto podpisu DKIM", waga: 10,
    opis: "Sprawdziliśmy typowe selektory, żaden nie odpowiedział. Bez DKIM polityka DMARC ma słabszą podstawę." });

  const waga = problemy.reduce((s, p) => s + p.waga, 0);
  const w: Wynik = { domena, mx, dostawca: dostawca(mx), spf, dmarc: dmTxt,
    dmarcP, dkim, punkty: Math.max(0, 100 - waga), problemy };
  return NextResponse.json(w);
}
