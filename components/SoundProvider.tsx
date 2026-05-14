"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { playSound, type SoundName } from "@/lib/sounds";

type SoundContextValue = {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
  play: (name: SoundName) => void;
};

const SoundContext = createContext<SoundContextValue | null>(null);

const STORAGE_KEY = "fluxlab.sound.enabled";

export default function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabledState] = useState(false);
  const [visible, setVisible] = useState(true);

  // Inicjalizacja z localStorage (po mount)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "1") setEnabledState(true);
  }, []);

  // Visibility API — wycisza gdy user na innej karcie
  useEffect(() => {
    if (typeof document === "undefined") return;
    const handler = () => {
      setVisible(document.visibilityState === "visible");
    };
    handler();
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);

  // Respect prefers-reduced-motion — wyłącza audio (audio = motion w UX)
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const onChange = () => setReducedMotion(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const setEnabled = useCallback((next: boolean) => {
    setEnabledState(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
    }
  }, []);

  const play = useCallback(
    (name: SoundName) => {
      if (!enabled || !visible || reducedMotion) return;
      playSound(name);
    },
    [enabled, visible, reducedMotion],
  );

  const value = useMemo<SoundContextValue>(
    () => ({ enabled, setEnabled, play }),
    [enabled, setEnabled, play],
  );

  return (
    <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
  );
}

export function useSound(): SoundContextValue {
  const ctx = useContext(SoundContext);
  if (!ctx) {
    // Fallback dla server-side render albo poza providerem — no-op
    return {
      enabled: false,
      setEnabled: () => {},
      play: () => {},
    };
  }
  return ctx;
}
