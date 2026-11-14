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

/** Konwersja Google Ads. Idzie zawsze: bez zgody z banera Google dostaje ją
 *  jako sygnał bez ciasteczek (Consent Mode, kolejka gtag z app/layout.tsx).
 *  Zdarzenie gtag-teraz ładuje tag od razu, żeby nie czekał na ciszę na stronie. */
export function konwersjaAds(rodzaj: keyof typeof ADS_ETYKIETY): void {
  const etykieta = ADS_ETYKIETY[rodzaj];
  if (!ADS_ID || !etykieta) return;
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "conversion", { send_to: `${ADS_ID}/${etykieta}` });
  window.dispatchEvent(new Event("gtag-teraz"));
}

export {};
