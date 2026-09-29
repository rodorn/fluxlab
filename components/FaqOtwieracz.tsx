"use client";

import { useEffect } from "react";

export default function FaqOtwieracz() {
  useEffect(() => {
    const otworz = () => {
      const id = decodeURIComponent(location.hash.slice(1));
      if (!id) return;
      const el = document.getElementById(id);
      if (el instanceof HTMLDetailsElement) {
        el.open = true;
        el.scrollIntoView({ block: "start" });
      }
    };
    otworz();
    window.addEventListener("hashchange", otworz);
    return () => window.removeEventListener("hashchange", otworz);
  }, []);
  return null;
}
