"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { m, useInView } from "framer-motion";

/*
  ADDITIVE reveals (see memory: motion-must-be-additive).

  - Server render and first client render are VISIBLE ("show"). If JS never
    runs, the section still reads.
  - After mount, a section that is still below the fold is hidden instantly,
    then revealed with a stagger when it scrolls into view.
  - One trigger per section; items are `m` children driven by variants, so a
    fast scroll can't strand the last cards (memory: framer-per-item-inview-strands).
  - Reduced motion: never hidden at all. CSS adds a second safety net.
*/

const EASE = [0.22, 1, 0.36, 1];
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function Reveal({
  as = "div",
  children,
  className,
  stagger = 0.08,
  delay = 0,
  id,
  ...rest
}) {
  const ref = useRef(null);
  const [state, setState] = useState("show");
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Measure the SECTION, not the element: sections use content-visibility,
    // and measuring inside a skipped subtree would force its layout.
    const box = el.closest("section") || el;
    const top = box.getBoundingClientRect().top;
    if (top > window.innerHeight - 40) setState("hidden");
  }, []);

  useEffect(() => {
    if (inView) setState("show");
  }, [inView]);

  const Tag = m[as] ?? m.div;
  return (
    <Tag
      ref={ref}
      id={id}
      className={className}
      data-reveal=""
      initial={false}
      animate={state}
      variants={{
        hidden: { transition: { duration: 0 } },
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({ as = "div", children, className, y = 24, scale, ...rest }) {
  const Tag = m[as] ?? m.div;
  return (
    <Tag
      className={className}
      data-reveal-item=""
      variants={{
        hidden: { opacity: 0, y, scale: scale ?? 1, transition: { duration: 0 } },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE } },
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
