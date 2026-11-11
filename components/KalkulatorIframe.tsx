"use client";

import { useRef } from "react";

export default function KalkulatorIframe({
  src,
  title,
}: {
  src: string;
  title: string;
}) {
  const ref = useRef<HTMLIFrameElement>(null);

  function dopasuj() {
    const doc = ref.current?.contentDocument;
    if (!doc || !ref.current) return;
    const ustaw = () => {
      if (ref.current) ref.current.style.height = `${doc.documentElement.scrollHeight}px`;
    };
    ustaw();
    new ResizeObserver(ustaw).observe(doc.body);
  }

  return (
    <iframe
      ref={ref}
      src={src}
      title={title}
      onLoad={dopasuj}
      className="w-full h-[900px] rounded-xl border border-gray-200 dark:border-white/10 bg-gray-100"
      loading="lazy"
    />
  );
}
