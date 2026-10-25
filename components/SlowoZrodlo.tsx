"use client";

import { useEffect, useState } from "react";
import { zrodlo } from "@/components/PodtytulZrodlo";

const SLOWA: Record<string, string> = {
  linkedin: "automatyzacje",
  google: "aplikacje",
  facebook: "narzędzia",
};

export default function SlowoZrodlo() {
  const [slowo, setSlowo] = useState("narzędzia");

  useEffect(() => {
    try {
      const z = zrodlo();
      if (z) setSlowo(SLOWA[z]);
    } catch {}
  }, []);

  return <>{slowo}</>;
}
