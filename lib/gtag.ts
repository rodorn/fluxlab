declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

type EventParams = Record<string, string | number | boolean | undefined>;

export function event(name: string, params: EventParams = {}): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function")
    return;
  window.gtag("event", name, params);
}

const ADS_ID = process.env.NEXT_PUBLIC_ADS_ID;
const ADS_ETYKIETY = {
  formularz: process.env.NEXT_PUBLIC_ADS_LABEL_FORMULARZ,
  telefon: process.env.NEXT_PUBLIC_ADS_LABEL_TEL,
} as const;

/** Konwersja Google Ads. Idzie tylko po zgodzie z banera i tylko gdy ustawiono
 *  identyfikator konta oraz etykietę danej konwersji. */
export function konwersjaAds(rodzaj: keyof typeof ADS_ETYKIETY): void {
  const etykieta = ADS_ETYKIETY[rodzaj];
  if (!ADS_ID || !etykieta) return;
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  try {
    if (localStorage.getItem("fluxlab_zgoda") !== "tak") return;
  } catch {
    return;
  }
  window.gtag("event", "conversion", { send_to: `${ADS_ID}/${etykieta}` });
}

export {};
