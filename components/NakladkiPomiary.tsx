"use client";

import LicznikWizyt from "@/components/LicznikWizyt";
import ContactClickTracker from "@/components/ContactClickTracker";
import ScrollProgress from "@/components/ScrollProgress";
import PlynnePrzewijanie from "@/components/PlynnePrzewijanie";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

export default function NakladkiPomiary() {
  return (
    <>
      <LicznikWizyt />
      <ContactClickTracker />
      <ScrollProgress />
      <PlynnePrzewijanie />
      <SpeedInsights />
      <Analytics />
    </>
  );
}
