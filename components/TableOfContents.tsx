"use client";

import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

interface TableOfContentsProps {
  containerSelector?: string;
}

function slugify(input: string): string {
  const map: Record<string, string> = {
    ą: "a",
    ć: "c",
    ę: "e",
    ł: "l",
    ń: "n",
    ó: "o",
    ś: "s",
    ź: "z",
    ż: "z",
    Ą: "a",
    Ć: "c",
    Ę: "e",
    Ł: "l",
    Ń: "n",
    Ó: "o",
    Ś: "s",
    Ź: "z",
    Ż: "z",
  };
  return input
    .split("")
    .map((ch) => map[ch] ?? ch)
    .join("")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function TableOfContents({
  containerSelector,
}: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const container =
      (containerSelector && document.querySelector(containerSelector)) ||
      document.querySelector("article") ||
      document.querySelector("main");
    if (!container) return;

    const nodes = Array.from(
      container.querySelectorAll<HTMLHeadingElement>("h2, h3"),
    );
    const used = new Set<string>();
    const list: Heading[] = [];

    nodes.forEach((node) => {
      const text = (node.textContent ?? "").trim();
      if (!text) return;
      let id = node.id;
      if (!id) {
        const base = slugify(text) || "sekcja";
        id = base;
        let i = 2;
        while (used.has(id)) {
          id = `${base}-${i++}`;
        }
        node.id = id;
      }
      used.add(id);
      list.push({
        id,
        text,
        level: node.tagName === "H3" ? 3 : 2,
      });
    });

    setHeadings(list);

    if (list.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-96px 0px -60% 0px",
        threshold: [0, 1],
      },
    );

    list.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [containerSelector]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    if (typeof window !== "undefined" && window.history) {
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  if (headings.length === 0) return null;

  return (
    <aside className="hidden lg:block">
      <nav
        aria-label="Spis treści"
        className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto"
      >
        <p className="section-label mb-3">Spis treści</p>
        <ul className="space-y-2 text-sm border-l border-gray-200 dark:border-gray-700">
          {headings.map((h) => {
            const isActive = activeId === h.id;
            return (
              <li key={h.id} className={h.level === 3 ? "pl-6" : "pl-3"}>
                <a
                  href={`#${h.id}`}
                  onClick={(e) => handleClick(e, h.id)}
                  className={`block -ml-px border-l-2 pl-3 py-1 transition-colors ${
                    isActive
                      ? "border-accent text-accent font-medium"
                      : "border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  }`}
                >
                  {h.text}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
