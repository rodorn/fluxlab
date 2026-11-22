"use client";

import { useEffect, useState } from "react";
import ScrollToTop from "@/components/ScrollToTop";
import KomunikatKonsoli from "@/components/KomunikatKonsoli";
import Czat from "@/components/Czat";
import NowaWersja from "@/components/NowaWersja";
import PrzejscieKarty from "@/components/PrzejscieKarty";

export default function NakladkiOpoznione() {
  const [reklama, setReklama] = useState(false);
  useEffect(() => {
    setReklama(document.documentElement.hasAttribute("data-reklama"));
  }, []);
  return (
    <>
      <ScrollToTop />
      <KomunikatKonsoli />
      {!reklama && <Czat />}
      <NowaWersja />
      <PrzejscieKarty />
    </>
  );
}
