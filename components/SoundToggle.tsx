"use client";

import { useSound } from "@/components/SoundProvider";

export default function SoundToggle() {
  const { enabled, setEnabled, play } = useSound();

  function handleToggle() {
    const next = !enabled;
    setEnabled(next);
    // Gdy włączamy — odtwórz potwierdzenie, żeby user wiedział że działa
    if (next) {
      // setTimeout żeby kontekst zdążył się odpalić po user gesture
      setTimeout(() => play("hover"), 50);
    }
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={enabled ? "Wyłącz dźwięki" : "Włącz dźwięki"}
      aria-pressed={enabled}
      className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent hover:bg-accent/5 dark:hover:bg-accent/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      title={
        enabled
          ? "Dźwięki włączone — kliknij, by wyłączyć"
          : "Dźwięki wyłączone — kliknij, by włączyć"
      }
    >
      {enabled ? (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M11 5 6 9H2v6h4l5 4z" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      ) : (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M11 5 6 9H2v6h4l5 4z" />
          <line x1="22" y1="9" x2="16" y2="15" />
          <line x1="16" y1="9" x2="22" y2="15" />
        </svg>
      )}
    </button>
  );
}
