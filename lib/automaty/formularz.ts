import { randomBytes } from "node:crypto";

import { dane, type Dok } from "@/lib/fl-dane";

export const PRODUKT = "formularz-zgloszenia";
export const BAZA = dane(PRODUKT);

export const ZGLOSZEN_NA_GODZINE = 200;
export const DNI_ZGLOSZEN = 90;
export const DNI_PO_ANULOWANIU = 30;

export type Konto = {
  email: string;
  nazwa: string;
  aktywna: boolean;
  webhook?: string;
  koniec?: string;
};
export type Zgloszenie = { pola: Record<string, string> };

export const TOKEN_RE = /^[A-Za-z0-9_-]{16,64}$/;

export function nowyToken() {
  return randomBytes(18).toString("base64url");
}

export function adresFormularza(token: string) {
  return `https://fluxlab.pl/api/formularz/${token}`;
}

export function adresArkusza(token: string) {
  return `https://fluxlab.pl/api/formularz/${token}/arkusz.csv`;
}

export function adresUstawien(token: string) {
  return `https://fluxlab.pl/formularz-do-arkusza-i-teams/ustawienia?t=${token}`;
}

export async function konto(token: string): Promise<Dok<Konto> | null> {
  return BAZA.pobierz<Konto>("konta", token);
}

/** Tylko Slack i Teams, tylko HTTPS na porcie 443: webhook to adres wpisany przez klienta, więc nie wolno wołać dowolnego hosta. */
export function webhookDozwolony(adres: string): URL | null {
  let u: URL;
  try {
    u = new URL(adres);
  } catch {
    return null;
  }
  if (
    u.protocol !== "https:" ||
    (u.port && u.port !== "443") ||
    u.username ||
    u.password
  )
    return null;
  const h = u.hostname.toLowerCase();
  const ok =
    h === "hooks.slack.com" ||
    h === "outlook.office.com" ||
    h.endsWith(".webhook.office.com") ||
    h.endsWith(".logic.azure.com") ||
    h.endsWith(".api.powerplatform.com");
  return ok ? u : null;
}

export function tekstZgloszenia(nazwa: string, pola: Record<string, string>) {
  const linie = Object.entries(pola).map(([k, v]) => `${k}: ${v}`);
  return `Nowe zgłoszenie z formularza „${nazwa}”\n\n${linie.join("\n")}`;
}

/** Wysyła wiadomość na kanał. Zwraca true, gdy odpowiedź jest 2xx. */
export async function wyslijNaKanal(
  adres: string,
  nazwa: string,
  pola: Record<string, string>,
): Promise<boolean> {
  const u = webhookDozwolony(adres);
  if (!u) return false;
  const tekst = tekstZgloszenia(nazwa, pola);
  const cialo =
    u.hostname === "hooks.slack.com"
      ? { text: tekst }
      : {
          type: "message",
          attachments: [
            {
              contentType: "application/vnd.microsoft.card.adaptive",
              content: {
                $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
                type: "AdaptiveCard",
                version: "1.4",
                body: [
                  {
                    type: "TextBlock",
                    text: `Nowe zgłoszenie: ${nazwa}`,
                    weight: "Bolder",
                    size: "Medium",
                    wrap: true,
                  },
                  {
                    type: "FactSet",
                    facts: Object.entries(pola)
                      .slice(0, 20)
                      .map(([title, value]) => ({
                        title,
                        value: value || "-",
                      })),
                  },
                ],
              },
            },
          ],
        };
  try {
    const r = await fetch(u, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cialo),
      redirect: "manual",
      signal: AbortSignal.timeout(6000),
    });
    return r.status >= 200 && r.status < 300;
  } catch {
    return false;
  }
}

const MAX_POLE = 2000;
const MAX_POL = 30;

/** Zamienia dowolne wejście na płaską mapę tekstów; klucze zaczynające się od `_` są sterujące. */
export function oczyscPola(wej: Record<string, unknown>): {
  pola: Record<string, string>;
  sterujace: Record<string, string>;
} {
  const pola: Record<string, string> = {};
  const sterujace: Record<string, string> = {};
  for (const [k, v] of Object.entries(wej)) {
    const klucz = k.trim().slice(0, 40);
    if (!klucz) continue;
    const tekst = (
      typeof v === "string"
        ? v
        : typeof v === "number" || typeof v === "boolean"
          ? String(v)
          : ""
    )
      .trim()
      .slice(0, MAX_POLE);
    if (klucz.startsWith("_")) {
      sterujace[klucz] = tekst;
      continue;
    }
    if (Object.keys(pola).length >= MAX_POL) break;
    pola[klucz] = tekst;
  }
  return { pola, sterujace };
}

function komorkaCsv(v: string) {
  const bezpieczna = /^[=+\-@\t\r]/.test(v) ? `'${v}` : v;
  return `"${bezpieczna.replace(/"/g, '""')}"`;
}

export function csv(zgloszenia: Dok<Zgloszenie>[]) {
  const kolumny: string[] = [];
  for (const z of zgloszenia)
    for (const k of Object.keys(z.dane.pola))
      if (!kolumny.includes(k)) kolumny.push(k);
  const wiersze = [["Data", ...kolumny].map(komorkaCsv).join(",")];
  for (const z of zgloszenia)
    wiersze.push(
      [z.utworzono, ...kolumny.map((k) => z.dane.pola[k] ?? "")]
        .map(komorkaCsv)
        .join(","),
    );
  return wiersze.join("\n") + "\n";
}
