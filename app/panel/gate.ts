import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const PANEL_COOKIE = "fluxlab_panel";
export const PANEL_SESSION_MAX_AGE = 60 * 60 * 24 * 30;

export interface PanelLink {
  url: string;
  label: string;
  hint: string;
}

function env(name: string, fallback: string): string {
  const value = process.env[name]?.trim();
  return value ? value : fallback;
}

/** Brak hasła w środowisku = bramka nie istnieje, zamiast wpuszczać każdego. */
export function getGatePassword(): string | null {
  const value = process.env.PANEL_GATE_PASSWORD?.trim();
  return value ? value : null;
}

function digest(value: string): Buffer {
  return createHash("sha256").update(value, "utf8").digest();
}

export function passwordMatches(candidate: string, password: string): boolean {
  // Skróty mają stałą długość, więc porównanie nie rzuca i nie zdradza długości hasła.
  return timingSafeEqual(digest(candidate), digest(password));
}

function signature(payload: string, password: string): string {
  return createHmac("sha256", password).update(payload).digest("hex");
}

export function createSession(password: string): string {
  const expiresAt = Date.now() + PANEL_SESSION_MAX_AGE * 1000;
  return `${expiresAt}.${signature(String(expiresAt), password)}`;
}

export function isSessionValid(
  cookieValue: string | undefined,
  password: string,
): boolean {
  if (!cookieValue) return false;

  const dot = cookieValue.indexOf(".");
  if (dot < 1) return false;

  const payload = cookieValue.slice(0, dot);
  const provided = cookieValue.slice(dot + 1);

  const expiresAt = Number(payload);
  if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) return false;

  const expected = signature(payload, password);
  // Długości liczymy w BAJTACH, nie w znakach: ciasteczko ze znakiem
  // wielobajtowym przechodziło porównanie znakowe i wywracało timingSafeEqual,
  // co zamieniało zwykłą odmowę w błąd 500 dostępny dla każdego.
  const got = Buffer.from(provided, "utf8");
  const want = Buffer.from(expected, "utf8");
  if (got.length !== want.length) return false;

  return timingSafeEqual(got, want);
}

/**
 * Adresów panelu nie ma w kodzie i nie ma dla nich wartości domyślnych:
 * to repozytorium jest publiczne, a są to drzwi do prywatnej maszyny.
 * Nieustawiona zmienna znaczy „nie pokazuj tego wejścia", a nie „pokaż moje".
 */
export function getPanelLinks(): PanelLink[] {
  return [
    {
      url: process.env.PANEL_URL_TAILSCALE ?? "",
      label: "Przez Tailscale",
      hint: "Działa z każdej sieci, szyfrowane, certyfikat zaufany.",
    },
    {
      url: process.env.PANEL_URL_LAN ?? "",
      label: "Domowe wifi",
      hint: "Tylko w sieci domowej, połączenie bez szyfrowania.",
    },
  ].filter((link) => link.url);
}
