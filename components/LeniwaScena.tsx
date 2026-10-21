"use client";

import dynamic from "next/dynamic";
import { SzkieletSceny } from "@/components/Szkielety";
import { useBliskoEkranu } from "@/components/useBliskoEkranu";

const ScenaLeada = dynamic(() => import("@/components/ScenaLeada"), {
  ssr: false,
  loading: () => <SzkieletSceny />,
});

/** Demo leada doładowywane przy zbliżeniu do ekranu. */
export default function LeniwaScena() {
  const [ref, blisko] = useBliskoEkranu<HTMLDivElement>();
  return <div ref={ref}>{blisko ? <ScenaLeada /> : <SzkieletSceny />}</div>;
}
