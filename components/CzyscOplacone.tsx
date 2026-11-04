"use client";

import { useEffect } from "react";
import { usunOplacone } from "@/lib/koszyk";

export default function CzyscOplacone() {
  useEffect(usunOplacone, []);
  return null;
}
