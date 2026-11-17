"use client";

import { useEffect, useRef } from "react";
import { animate, m, useInView, useMotionValue, useTransform } from "framer-motion";
import { Star } from "lucide-react";
import { stats } from "@/lib/content";

/*
  Count-ups run when the strip scrolls into view, never on load.
  The rendered default is the FINAL value (SSR + no-JS + reduced motion all
  show the real figure); the effect resets to 0 only once it knows it will
  animate. See memory: countup-inview-zero-bug, countup-smoothness.
*/
function CountUp({ to, decimals = 0, suffix = "", format = true }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const value = useMotionValue(to);
  const text = useTransform(value, (v) => {
    const n = decimals ? v.toFixed(decimals) : Math.round(v);
    return `${format ? Number(n).toLocaleString("en-US", { minimumFractionDigits: decimals }) : n}${suffix}`;
  });
  const armed = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = (ref.current?.closest("section") || ref.current)?.getBoundingClientRect();
    if (r && r.top > window.innerHeight) {
      value.set(0);
      armed.current = true;
    }
  }, [value]);

  useEffect(() => {
    if (!inView || !armed.current) return;
    armed.current = false;
    // Smaller targets get MORE time so every step gets frames.
    const duration = to <= 10 ? 1.6 : to <= 120 ? 1.9 : 2.1;
    const controls = animate(value, to, { duration, ease: [0.33, 0.35, 0.2, 1] });
    return () => {
      controls.stop();
      value.set(to);
    };
  }, [inView, to, value]);

  return (
    <m.span ref={ref} className="tabular">
      {text}
    </m.span>
  );
}

const items = [
  { key: "rating", value: <CountUp to={5} decimals={1} />, label: "Google rating", star: true },
  // PLACEHOLDER figure: see lib/content.js stats.yearsActive
  { key: "years", value: <CountUp to={stats.yearsActive} suffix="+" />, label: "Years on the tools" },
  // PLACEHOLDER figure: see lib/content.js stats.clientsServed
  { key: "clients", value: <CountUp to={stats.clientsServed} suffix="+" />, label: "Drivers back on the road" },
  { key: "hours", value: <span className="tabular">24/7</span>, label: "Open every day, all night" },
];

export default function ProofStrip() {
  return (
    <section aria-label="Johno's Auto Services at a glance" className="relative bg-charcoal">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[rgba(182,229,27,0)] via-lime/40 to-[rgba(182,229,27,0)]" />
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {items.map((it, idx) => (
            <div
              key={it.key}
              className={`flex flex-col gap-1.5 py-8 sm:py-10 ${idx % 2 === 1 ? "pl-5 sm:pl-8" : "pr-5 sm:pr-8"} ${
                idx > 0 ? "lg:border-l lg:border-white/10 lg:pl-10" : "lg:pl-0"
              } ${idx % 2 === 1 ? "border-l border-white/10" : ""} ${idx < 2 ? "border-b border-white/10 lg:border-b-0" : ""}`}
            >
              <dt className="order-2 text-[13px] font-medium text-white/60 sm:text-[14px]">{it.label}</dt>
              <dd className="order-1 flex items-center gap-2 text-[34px] font-bold leading-none tracking-[-0.03em] text-white sm:text-[44px]">
                {it.value}
                {it.star && <Star className="h-6 w-6 fill-lime text-lime sm:h-7 sm:w-7" aria-label="stars" />}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-white/[0.06]" />
    </section>
  );
}
