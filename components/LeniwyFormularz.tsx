"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";
import type LandingFormTyp from "@/components/LandingForm";
import { SzkieletFormularza } from "@/components/Szkielety";
import { useBliskoEkranu } from "@/components/useBliskoEkranu";

const LandingForm = dynamic(() => import("@/components/LandingForm"), {
  ssr: false,
  loading: () => <SzkieletFormularza />,
});

/** Formularz z landingu doładowywany przy zbliżeniu do ekranu. */
export default function LeniwyFormularz(props: ComponentProps<typeof LandingFormTyp>) {
  const [ref, blisko] = useBliskoEkranu<HTMLDivElement>();
  return <div ref={ref}>{blisko ? <LandingForm {...props} /> : <SzkieletFormularza />}</div>;
}
