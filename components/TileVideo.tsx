"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Tło kafelka na stronie głównej: nieruchomy obraz, a pod myszką wideo.
 *
 * Wcześniej ta sama strona ciągnęła 21 MB, bo w dokumencie stały dwa
 * elementy wideo naraz, ciemny i jasny, przeglądarka pobierała oba, także
 * ten ukryty przez CSS, a na telefonie odtwarzała wszystkie sześć plików
 * automatycznie, skoro nie ma tam najechania myszką. Trzy kafelki razy dwa
 * warianty to był cały katalog.
 *
 * Teraz jest tak: adres pliku trafia do elementu dopiero w chwili, gdy wideo
 * ma faktycznie zagrać, i tylko dla tego wariantu kolorystycznego, który
 * widać. Bez myszki nie pobieramy nic i zostaje sam obraz, który waży
 * kilkanaście kilobajtów.
 */
export default function TileVideo({
  srcDark,
  srcLight,
  poster,
}: {
  srcDark: string;
  srcLight: string;
  poster: string;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [gra, setGra] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video || typeof window === "undefined") return;

    // Dotyk bez myszki: wideo nie ma jak zagrać na najechanie, a puszczanie go
    // z automatu kosztowałoby megabajty na łączu komórkowym. Zostaje obraz.
    if (!window.matchMedia("(hover: hover)").matches) return;

    // Osoby, które w systemie poprosiły o ograniczenie animacji, dostają
    // nieruchomy obraz. To ustawienie istnieje między innymi dla ludzi,
    // którym ruch na ekranie szkodzi.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const karta = video.closest("a");
    if (!karta) return;

    const ciemny = () =>
      document.documentElement.classList.contains("dark") ||
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    const wejscie = () => {
      // Pobranie zaczyna się tutaj, nie przy wczytaniu strony.
      if (!video.getAttribute("src")) {
        video.setAttribute("src", ciemny() ? srcDark : srcLight);
        video.load();
      }
      void video
        .play()
        .then(() => setGra(true))
        .catch(() => {});
    };
    const wyjscie = () => {
      video.pause();
      setGra(false);
    };

    karta.addEventListener("pointerenter", wejscie);
    karta.addEventListener("pointerleave", wyjscie);
    return () => {
      karta.removeEventListener("pointerenter", wejscie);
      karta.removeEventListener("pointerleave", wyjscie);
    };
  }, [srcDark, srcLight]);

  return (
    <video
      ref={ref}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out ${
        gra
          ? "opacity-100 saturate-150"
          : "opacity-90 saturate-[0.9] dark:opacity-60"
      }`}
    />
  );
}
