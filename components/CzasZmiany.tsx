"use client";

import { useEffect, useState } from "react";

function temu(iso: string): string {
  const min = Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 60000));
  if (min < 60) return "mniej niż godzinę";
  const h = Math.floor(min / 60);
  if (h < 24) return h === 1 ? "godzinę" : `${h} godz.`;
  const d = Math.floor(h / 24);
  return d === 1 ? "dzień" : `${d} dni`;
}

export default function CzasZmiany({ iso }: { iso: string }) {
  const [t, setT] = useState<string | null>(null);
  useEffect(() => setT(temu(iso)), [iso]);
  if (!t) return <span className="invisible">Ostatnia zmiana strony</span>;
  return <>Ostatnia zmiana strony: {t} temu</>;
}
