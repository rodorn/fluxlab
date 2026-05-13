"use client";

import { createElement, useEffect, useRef, useState, type JSX } from "react";

type Props = {
  children: React.ReactNode;
  delay?: 0 | 1 | 2 | 3 | 4 | 5;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  threshold?: number;
  rootMargin?: string;
};

export default function RevealOnScroll({
  children,
  delay = 0,
  as = "div",
  className,
  threshold = 0.15,
  rootMargin = "0px 0px -10% 0px",
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  const classes = [
    "reveal",
    delay ? `reveal-delay-${delay}` : null,
    visible ? "reveal-visible" : null,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return createElement(as, { ref, className: classes }, children);
}
