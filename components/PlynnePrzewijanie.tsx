"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/** Płynne przewijanie z bezwładnością, tylko myszką na komputerze i bez
 *  „ogranicz ruch”. Dotyk zostaje natywny. */
export default function PlynnePrzewijanie() {
  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(pointer: fine)").matches
    )
      return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.12, anchors: true });
    return () => lenis.destroy();
  }, []);
  return null;
}
