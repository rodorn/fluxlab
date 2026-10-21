"use client";

import ScrollToTop from "@/components/ScrollToTop";
import MagnesPrzyciskow from "@/components/MagnesPrzyciskow";
import KomunikatKonsoli from "@/components/KomunikatKonsoli";
import Czat from "@/components/Czat";
import NowaWersja from "@/components/NowaWersja";

export default function NakladkiOpoznione() {
  return (
    <>
      <ScrollToTop />
      <MagnesPrzyciskow />
      <KomunikatKonsoli />
      <Czat />
      <NowaWersja />
    </>
  );
}
