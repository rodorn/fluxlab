import dns from "dns/promises";
import net from "net";

const MAX_BAJTOW = 1_000_000;
const TIMEOUT_MS = 8_000;
const MAX_PRZEKIEROWAN = 3;

function ipPrywatne(ip: string): boolean {
  if (ip.startsWith("::ffff:")) return ipPrywatne(ip.slice(7));
  if (net.isIPv4(ip)) {
    const [a, b] = ip.split(".").map(Number);
    return (
      a === 0 ||
      a === 10 ||
      a === 127 ||
      (a === 100 && b >= 64 && b <= 127) ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      (a === 192 && b === 0) ||
      (a === 198 && (b === 18 || b === 19)) ||
      a >= 224
    );
  }
  if (net.isIPv6(ip)) {
    const l = ip.toLowerCase();
    return (
      l === "::" ||
      l === "::1" ||
      l.startsWith("fc") ||
      l.startsWith("fd") ||
      /^fe[89ab]/.test(l) ||
      l.startsWith("ff")
    );
  }
  return true;
}

export class BladAdresu extends Error {}

export async function sprawdzAdres(surowy: string): Promise<URL> {
  let url: URL;
  try {
    url = new URL(/^https?:\/\//i.test(surowy) ? surowy : `https://${surowy}`);
  } catch {
    throw new BladAdresu("To nie wygląda na adres strony.");
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new BladAdresu("Obsługujemy tylko adresy http i https.");
  }
  if (url.username || url.password) {
    throw new BladAdresu("Adres z hasłem jest niedozwolony.");
  }
  const host = url.hostname.replace(/^\[|\]$/g, "");
  if (host === "localhost" || host.endsWith(".localhost") || host.endsWith(".local") || host.endsWith(".internal")) {
    throw new BladAdresu("Ten adres jest niedostępny.");
  }
  if (net.isIP(host)) {
    if (ipPrywatne(host)) throw new BladAdresu("Ten adres jest niedostępny.");
    return url;
  }
  if (!host.includes(".")) throw new BladAdresu("Podaj pełny adres strony.");
  let adresy: { address: string }[];
  try {
    adresy = await dns.lookup(host, { all: true });
  } catch {
    throw new BladAdresu("Nie znaleźliśmy takiej strony.");
  }
  if (!adresy.length || adresy.some((a) => ipPrywatne(a.address))) {
    throw new BladAdresu("Ten adres jest niedostępny.");
  }
  return url;
}

/** Pobiera HTML (max 1 MB, 8 s, przekierowania sprawdzane ręcznie). */
export async function pobierzStrone(
  surowy: string,
): Promise<{ url: URL; html: string }> {
  const koniec = Date.now() + TIMEOUT_MS;
  let url = await sprawdzAdres(surowy);
  for (let i = 0; i <= MAX_PRZEKIEROWAN; i++) {
    const zostalo = koniec - Date.now();
    if (zostalo <= 0) throw new BladAdresu("Strona odpowiada zbyt wolno.");
    let res: Response;
    try {
      res = await fetch(url, {
        redirect: "manual",
        signal: AbortSignal.timeout(zostalo),
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; FluxlabMakieta/1.0; +https://fluxlab.pl)",
          Accept: "text/html,application/xhtml+xml",
        },
      });
    } catch {
      throw new BladAdresu("Nie udało się pobrać strony.");
    }
    if (res.status >= 300 && res.status < 400) {
      const loc = res.headers.get("location");
      await res.body?.cancel();
      if (!loc) throw new BladAdresu("Nie udało się pobrać strony.");
      url = await sprawdzAdres(new URL(loc, url).toString());
      continue;
    }
    if (!res.ok) {
      await res.body?.cancel();
      throw new BladAdresu(`Strona zwróciła błąd ${res.status}.`);
    }
    const typ = res.headers.get("content-type") ?? "";
    if (typ && !/html|xml/i.test(typ)) {
      await res.body?.cancel();
      throw new BladAdresu("Pod tym adresem nie ma strony HTML.");
    }
    const reader = res.body?.getReader();
    if (!reader) throw new BladAdresu("Pusta odpowiedź strony.");
    const kawalki: Uint8Array[] = [];
    let razem = 0;
    try {
      while (razem < MAX_BAJTOW) {
        const { done, value } = await reader.read();
        if (done) break;
        kawalki.push(value);
        razem += value.length;
      }
    } catch {
      throw new BladAdresu("Strona przerwała odpowiedź.");
    } finally {
      reader.cancel().catch(() => {});
    }
    const html = Buffer.concat(kawalki).subarray(0, MAX_BAJTOW).toString("utf8");
    return { url, html };
  }
  throw new BladAdresu("Za dużo przekierowań.");
}
