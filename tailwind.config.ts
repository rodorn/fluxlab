import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /**
         * Akcent nie moze byc jednym kolorem. Odcien czytelny na bialym tle
         * (co najmniej 4,5:1) jest za ciemny na czarnym i odwrotnie: te dwa
         * warunki nie maja wspolnego rozwiazania. Stad zmienna, ktora
         * przestawia sie razem z motywem, i osobny `solid` na tla pod bialym
         * napisem, ktory musi zostac ciemny w obu motywach.
         */
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          hover: "rgb(var(--accent-hover) / <alpha-value>)",
          solid: "rgb(var(--accent-solid) / <alpha-value>)",
          light: "#eef2ff",
          "dark-light": "#1e1b4b",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        // Krój systemowy zamiast wczytywanego: font-mono stoi przy 22 drobnych
        // etykietach, a wczytywany plik kosztowal 23 KB wymuszonego pobrania
        // na kazdej stronie serwisu, takze tam, gdzie zadnej z nich nie ma.
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "Liberation Mono",
          "monospace",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
