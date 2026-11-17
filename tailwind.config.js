/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      // Brand palette: Johno's Auto Services brand guide, page 02. Exact values.
      colors: {
        jet: "#080A0A", // primary background, hero, nav
        charcoal: "#101313", // cards, alt sections
        lime: {
          DEFAULT: "#B6E51B", // CTAs, links, icons, active/focus ONLY
          hi: "#C6EE45", // hover step (lighter, still lime)
          lo: "#93BA12", // pressed step
        },
        // Derived steps between jet and charcoal for the surface ladder.
        graphite: "#151919", // elevated surface (base -> elevated -> floating)
        steel: "#1C2121", // floating surface / inputs
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "Segoe UI", "Roboto", "Arial", "sans-serif"],
      },
      boxShadow: {
        // Layered, low-opacity shadows; lime-tinted where the element is "lit".
        elevated: "0 1px 0 rgba(255,255,255,0.04) inset, 0 2px 6px rgba(0,0,0,0.35), 0 18px 40px -18px rgba(0,0,0,0.7)",
        floating: "0 1px 0 rgba(255,255,255,0.08) inset, 0 8px 24px -8px rgba(0,0,0,0.6), 0 40px 80px -32px rgba(0,0,0,0.85)",
        "lime-lift": "0 6px 16px -6px rgba(182,229,27,0.45), 0 18px 40px -16px rgba(182,229,27,0.35)",
        "lime-glow": "0 0 0 1px rgba(182,229,27,0.45), 0 18px 48px -18px rgba(182,229,27,0.35)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)", // ease-out-quint
        spring: "cubic-bezier(0.34, 1.3, 0.64, 1)",
      },
      // Tailwind's stock opacity ladder silently drops off-ladder steps like
      // /72; register every integer so nothing compiles to nothing.
      // See memory: tailwind-offladder-opacity-silently-drops.
      opacity: Object.fromEntries(Array.from({ length: 101 }, (_, i) => [i, String(i / 100)])),
      zIndex: { nav: "40", progress: "45", float: "50", skip: "60" },
    },
  },
  plugins: [],
};
