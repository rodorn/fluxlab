"use client";

import { useEffect, useState } from "react";

/**
 * Przycisk powrotu na górę — pojawia się po przewinięciu strony.
 */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ticking = false;
    function update() {
      ticking = false;
      setVisible(window.scrollY > 700);
    }
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollUp() {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  }

  return (
    <button
      type="button"
      onClick={scrollUp}
      aria-label="Wróć na górę strony"
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-6 right-6 z-40 w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-lg shadow-accent/30 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      style={{
        backgroundImage: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M9 14V4M9 4l-4.5 4.5M9 4l4.5 4.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
