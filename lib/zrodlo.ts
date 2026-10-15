// Zrodlo wejscia z kampanii (link partnera, reklama) trzeba pamietac dluzej
// niz jedna odslone: widz z YouTube wchodzi na strone glowna, czyta oferte i
// dopiero na /kontakt wypelnia formularz, a wtedy w adresie nie ma juz utm.
// Bez tego nie da sie policzyc prowizji partnera. Zapamietujemy tylko wejscia
// z utm_medium, bo linki wewnetrzne strony (utm_source=narzedzie itp.) go nie
// maja i nie moga nadpisac zrodla zewnetrznego. Waznosc 90 dni = okno
// prowizji w umowach z partnerami.

export interface UtmFields {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  landing_page: string;
  referrer: string;
}

const KLUCZ = "fl_zrodlo";
const WAZNOSC_MS = 90 * 24 * 60 * 60 * 1000;

export const PUSTE_UTM: UtmFields = {
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_term: "",
  utm_content: "",
  landing_page: "",
  referrer: "",
};

function zAdresu(): UtmFields {
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source: p.get("utm_source") ?? "",
    utm_medium: p.get("utm_medium") ?? "",
    utm_campaign: p.get("utm_campaign") ?? "",
    utm_term: p.get("utm_term") ?? "",
    utm_content: p.get("utm_content") ?? "",
    landing_page: window.location.pathname,
    referrer: document.referrer ?? "",
  };
}

export function zapamietajZrodlo(): void {
  if (typeof window === "undefined") return;
  const teraz = zAdresu();
  if (!teraz.utm_source || !teraz.utm_medium) return;
  try {
    localStorage.setItem(KLUCZ, JSON.stringify({ ...teraz, czas: Date.now() }));
  } catch {
    /* zablokowana pamiec: zostaje atrybucja z biezacego adresu */
  }
}

function zapamietane(): UtmFields | null {
  try {
    const z = JSON.parse(localStorage.getItem(KLUCZ) ?? "null");
    if (!z || Date.now() - Number(z.czas) > WAZNOSC_MS) return null;
    return { ...PUSTE_UTM, ...z };
  } catch {
    return null;
  }
}

export function readUtm(): UtmFields {
  if (typeof window === "undefined") return { ...PUSTE_UTM };
  zapamietajZrodlo();
  const teraz = zAdresu();
  const z = zapamietane();
  if (!z) return teraz;
  // Zrodlo zewnetrzne wygrywa, a wewnetrzne oznaczenie biezacej strony
  // (np. utm_source=narzedzie) zostaje w utm_content, zeby nie zniknelo.
  const wewn =
    teraz.utm_source && teraz.utm_source !== z.utm_source
      ? `wewn:${teraz.utm_source}${teraz.utm_campaign ? "/" + teraz.utm_campaign : ""}`
      : "";
  return {
    ...z,
    utm_content: [z.utm_content, wewn].filter(Boolean).join(" "),
    referrer: z.referrer || teraz.referrer,
  };
}
