"use client";

import ScrollToTop from "@/components/ScrollToTop";
import KomunikatKonsoli from "@/components/KomunikatKonsoli";
import Czat from "@/components/Czat";
import NowaWersja from "@/components/NowaWersja";
import PrzejscieKarty from "@/components/PrzejscieKarty";

export default function NakladkiOpoznione() {
  return (
    <>
      <ScrollToTop />
      <KomunikatKonsoli />
      <Czat />
      <NowaWersja />
      <PrzejscieKarty />
    </>
  );
}
