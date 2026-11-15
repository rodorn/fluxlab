import { createCipheriv, createDecipheriv, createHmac, createHash, randomBytes, timingSafeEqual } from "node:crypto";

export const REDIRECT = "https://fluxlab.pl/api/google/oauth/callback";

export const ZAKRESY: Record<string, string[]> = {
  "zalaczniki-z-maila": ["gmail.readonly", "drive.file"],
  "faktury-z-maila": ["gmail.readonly", "drive.file"],
};

const pelny = (z: string) => `https://www.googleapis.com/auth/${z}`;
const sekret = () => process.env.AUTOMAT_SEKRET ?? "";

export function podpisz(tresc: string) {
  return createHmac("sha256", sekret()).update(tresc).digest("base64url");
}

export function stan(sesja: string, produkt: string) {
  const t = `${sesja}.${produkt}`;
  return `${t}.${podpisz(t)}`;
}

export function odczytajStan(s: string): { sesja: string; produkt: string } | null {
  const [sesja, produkt, pod] = s.split(".");
  if (!sesja || !produkt || !pod) return null;
  const a = Buffer.from(podpisz(`${sesja}.${produkt}`));
  const b = Buffer.from(pod);
  return a.length === b.length && timingSafeEqual(a, b) ? { sesja, produkt } : null;
}

export function adresZgody(sesja: string, produkt: string) {
  const p = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID ?? "",
    redirect_uri: REDIRECT,
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
    include_granted_scopes: "false",
    scope: ["openid", "email", ...ZAKRESY[produkt].map(pelny)].join(" "),
    state: stan(sesja, produkt),
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${p}`;
}

const klucz = () => createHash("sha256").update(`gtoken:${sekret()}`).digest();

export function zaszyfruj(tekst: string) {
  const iv = randomBytes(12);
  const c = createCipheriv("aes-256-gcm", klucz(), iv);
  const dane = Buffer.concat([c.update(tekst, "utf8"), c.final()]);
  return Buffer.concat([iv, c.getAuthTag(), dane]).toString("base64url");
}

export function odszyfruj(zapis: string) {
  const b = Buffer.from(zapis, "base64url");
  const d = createDecipheriv("aes-256-gcm", klucz(), b.subarray(0, 12));
  d.setAuthTag(b.subarray(12, 28));
  return Buffer.concat([d.update(b.subarray(28)), d.final()]).toString("utf8");
}

async function tokenPost(body: Record<string, string>) {
  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID ?? "",
      client_secret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      ...body,
    }),
    signal: AbortSignal.timeout(20_000),
  });
  const j = await r.json().catch(() => ({}));
  return { ok: r.ok, j };
}

export async function wymienKod(kod: string) {
  const { ok, j } = await tokenPost({ grant_type: "authorization_code", code: kod, redirect_uri: REDIRECT });
  if (!ok) throw new Error(`google token: ${j.error ?? "błąd"}`);
  const email = String(JSON.parse(Buffer.from(String(j.id_token).split(".")[1], "base64url").toString()).email ?? "");
  return {
    refresh: String(j.refresh_token ?? ""),
    zakresy: String(j.scope ?? "").split(" "),
    email,
  };
}

export class OdwolanyDostep extends Error {}

export async function tokenDostepu(refresh: string) {
  const { ok, j } = await tokenPost({ grant_type: "refresh_token", refresh_token: refresh });
  if (!ok) {
    if (j.error === "invalid_grant") throw new OdwolanyDostep("dostęp odwołany");
    throw new Error(`google odświeżenie: ${j.error ?? "błąd"}`);
  }
  return String(j.access_token);
}

export async function gapi(token: string, url: string, init: RequestInit = {}) {
  const r = await fetch(url, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, ...(init.headers ?? {}) },
    signal: AbortSignal.timeout(60_000),
  });
  if (!r.ok) throw new Error(`google ${r.status} ${url.split("?")[0].slice(-40)}`);
  return r;
}
