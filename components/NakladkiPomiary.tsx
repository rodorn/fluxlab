"use client";

import LicznikWizyt from "@/components/LicznikWizyt";
import ScrollProgress from "@/components/ScrollProgress";
import PlynnePrzewijanie from "@/components/PlynnePrzewijanie";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

export default function NakladkiPomiary() {
  return (
    <>
      <LicznikWizyt />
      <ScrollProgress />
      <PlynnePrzewijanie />
      <SpeedInsights />
      <Analytics />
    </>
  );
}
