// Zgloszenie zdarzenia do wlasnego licznika. Powstalo, bo licznik mierzyl
// wylacznie odslony, wiec o narzedziach wiedzielismy tylko tyle, ze ktos
// otworzyl strone. Z tego nie da sie odczytac, czy ktokolwiek nacisnal
// przycisk, a to jest jedyna liczba, na ktorej da sie oprzec decyzje o
// platnej wersji.
export function zglosZdarzenie(zdarzenie: string, sciezka?: string): void {
  if (typeof window === "undefined") return;
  let sesja = "";
  try {
    const k = "fl_sesja";
    sesja = sessionStorage.getItem(k) ?? "";
    if (!sesja) {
      sesja = Math.random().toString(36).slice(2) + Date.now().toString(36);
      sessionStorage.setItem(k, sesja);
    }
  } catch {
    sesja = "";
  }
  // Licznik nigdy nie moze popsuc dzialania narzedzia, wiec bledy sa
  // pomijane i nie ma tu zadnego await.
  fetch("/api/wizyta", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sciezka: sciezka ?? window.location.pathname,
      sesja,
      telefon: window.matchMedia("(max-width: 640px)").matches,
      zdarzenie,
    }),
    keepalive: true,
  }).catch(() => {});
}
