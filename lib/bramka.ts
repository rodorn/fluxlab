/**
 * Bramka e-mail w narzędziach: wynik skrócony widać od razu, pełny idzie
 * mailem tylko na prośbę (pole nieobowiązkowe). Zgoda obejmuje wynik i trzy
 * maile z poradami, a wypis działa jednym kliknięciem z każdej wiadomości.
 */

import { createHmac, timingSafeEqual } from "crypto";

export const NARZEDZIA_BRAMKI = {
  "numer-ksef": {
    nazwa: "Sprawdzenie numeru KSeF",
    grupa: {
      nazwa: "KSeF dla JDG i małych firm: pytania i pomoc",
      url: "https://www.facebook.com/groups/1520408590114723/",
    },
  },
  "kalkulator-podatkowy": {
    nazwa: "Kalkulator podatkowy JDG",
    grupa: {
      nazwa: "KSeF dla JDG i małych firm: pytania i pomoc",
      url: "https://www.facebook.com/groups/1520408590114723/",
    },
  },
  "audyt-strony": {
    nazwa: "Audyt strony",
    grupa: {
      nazwa: "Strona www i Google dla małej firmy: pytania i pomoc",
      url: "https://www.facebook.com/groups/2196867334594283/",
    },
  },
} as const;

export type NarzedzieBramki = keyof typeof NARZEDZIA_BRAMKI;

/** Treść zgody zapisywana razem z adresem. Zmiana tego tekstu to nowa wersja. */
export const TRESC_ZGODY_BRAMKI =
  "Zgadzam się na przesłanie pełnego wyniku na podany adres oraz trzech " +
  "maili z poradami do tego wyniku od FluxLab (Paweł Iwanek). Zgodę można wycofać " +
  "w każdej chwili jednym kliknięciem w link „Wypisz mnie” w każdej wiadomości.";

export const PYTANIE_KWALIFIKUJACE =
  "Czym zajmuje się Twoja firma i co teraz najbardziej Cię męczy?";

function klucz(): string {
  return process.env.RUCH_SEKRET ?? "";
}

/** Podpis adresu do linku wypisu: bez niego każdy mógłby wypisać każdego. */
export function podpisWypisu(email: string): string {
  return createHmac("sha256", klucz())
    .update(`wypis:${email.toLowerCase()}`)
    .digest("base64url")
    .slice(0, 22);
}

export function podpisWypisuZgodny(email: string, podpis: string): boolean {
  if (!klucz() || !podpis) return false;
  const a = Buffer.from(podpisWypisu(email));
  const b = Buffer.from(podpis);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function linkWypisu(email: string): string {
  const e = Buffer.from(email.toLowerCase()).toString("base64url");
  return `https://fluxlab.pl/api/wypis?e=${e}&t=${podpisWypisu(email)}`;
}

export function emailZLinku(e: string): string {
  try {
    return Buffer.from(e, "base64url").toString("utf8").toLowerCase();
  } catch {
    return "";
  }
}

/** Nagłówki, dzięki którym Gmail i Outlook pokazują „Wypisz” obok nadawcy. */
export function naglowkiWypisu(email: string): Record<string, string> {
  return {
    "List-Unsubscribe": `<${linkWypisu(email)}>, <mailto:pawel@fluxlab.pl?subject=Wypisz%20mnie>`,
    "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
  };
}

const esc = (t: string) =>
  t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function mailWyniku(o: {
  narzedzie: NarzedzieBramki;
  tytul: string;
  linie: string[];
  email: string;
}): { temat: string; html: string; tekst: string } {
  const n = NARZEDZIA_BRAMKI[o.narzedzie];
  const wypis = linkWypisu(o.email);
  const umow = `https://fluxlab.pl/kontakt?utm_source=bramka&utm_medium=email&utm_campaign=${o.narzedzie}`;
  const html = `<!doctype html><html lang="pl"><body style="margin:0;background:#f5f5fb;font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#111827">
<div style="max-width:600px;margin:0 auto;padding:24px">
  <p style="margin:0 0 4px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#4f46e5;font-weight:700">${esc(n.nazwa)}</p>
  <h1 style="margin:0 0 16px;font-size:22px;line-height:1.3">${esc(o.tytul)}</h1>
  <div style="background:#fff;border:1px solid #e5e7eb;border-radius:14px;padding:18px 20px">
    ${o.linie.map((l) => `<p style="margin:0 0 10px;font-size:15px;line-height:1.55">${esc(l)}</p>`).join("")}
  </div>
  <p style="margin:20px 0 8px;font-size:15px;line-height:1.55">Chcesz, żeby ktoś spojrzał na to razem z Tobą? Mamy 15 minut na krótką rozmowę online, bez zobowiązań.</p>
  <p style="margin:0 0 24px"><a href="${umow}" style="display:inline-block;background:#4f46e5;color:#fff;text-decoration:none;font-weight:600;padding:12px 20px;border-radius:12px">Umów 15 minut</a></p>
  <p style="margin:0 0 24px;font-size:14px;line-height:1.55">Pytania możesz też zadać w grupie <a href="${n.grupa.url}" style="color:#4f46e5">${esc(n.grupa.nazwa)}</a>. Albo po prostu odpisz na tego maila.</p>
  <p style="margin:0;font-size:12px;line-height:1.5;color:#6b7280">FluxLab, Paweł Iwanek, NIP 7123336008. Dostajesz tę wiadomość, bo na fluxlab.pl padła prośba o wynik na ten adres. W najbliższych dniach wyślemy jeszcze trzy krótkie maile z poradami. <a href="${wypis}" style="color:#6b7280">Wypisz mnie</a> (jedno kliknięcie).</p>
</div></body></html>`;
  const tekst = [
    n.nazwa,
    o.tytul,
    "",
    ...o.linie,
    "",
    `Umów 15 minut: ${umow}`,
    `Grupa z pytaniami: ${n.grupa.url}`,
    "",
    "FluxLab, Paweł Iwanek, NIP 7123336008.",
    `Wypisz mnie (jedno kliknięcie): ${wypis}`,
  ].join("\n");
  return { temat: `${n.nazwa}: ${o.tytul}`, html, tekst };
}
