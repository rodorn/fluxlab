"use client";

import { useEffect, useState } from "react";
import { zglosZdarzenie } from "@/lib/zdarzenie";

/** Nagłówek w trzech wersjach: ?h=1|2|3 w adresie wybiera wariant (domyślnie 1,
 *  te same słowa co w reklamie). Wyświetlenie zapisuje zdarzenie h1_wariant_N
 *  w liczniku (ruch.sqlite), razem ze ścieżką, sesją i źródłem. */
export default function H1Wariant({ warianty, className }: { warianty: [string, string, string]; className?: string }) {
  const [n, setN] = useState(1);
  useEffect(() => {
    const h = Number(new URLSearchParams(location.search).get("h"));
    const wybrany = h === 2 || h === 3 ? h : 1;
    setN(wybrany);
    zglosZdarzenie(`h1_wariant_${wybrany}`);
  }, []);
  return <h1 className={className}>{warianty[n - 1]}</h1>;
}
