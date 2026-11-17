"use client";

import { m } from "framer-motion";
import { SPOILER, SWOOSH_LIME, SWOOSH_WHITE } from "./Brand";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

/*
  The roofline returns as a divider and draws itself as it scrolls into view.
  Motion props stay identical in both modes (dropping them after mount would
  strand an inline opacity:0, see memory: framer-stranded-initial-opacity);
  reduced motion only zeroes the durations.
*/
const EASE = [0.65, 0, 0.35, 1];

export default function SwooshDivider({ className = "" }) {
  const reduced = useSafeReducedMotion();
  const line = (i) => ({
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, margin: "0px 0px -40px 0px" },
    transition: reduced ? { duration: 0 } : { duration: 1.5, ease: EASE, delay: i * 0.1 },
  });

  return (
    <svg viewBox="0 0 880 170" fill="none" aria-hidden="true" className={className}>
      <g stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.4">
        {SWOOSH_WHITE.map((d, i) => (
          <m.path key={d} d={d} {...line(i + 1)} />
        ))}
      </g>
      <g stroke="#B6E51B" strokeWidth="4.5" strokeLinecap="round">
        {SWOOSH_LIME.map((d) => (
          <m.path key={d} d={d} {...line(0)} />
        ))}
      </g>
      <m.path
        d={SPOILER}
        fill="#B6E51B"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={reduced ? { duration: 0 } : { delay: 1.2, duration: 0.4 }}
      />
    </svg>
  );
}
