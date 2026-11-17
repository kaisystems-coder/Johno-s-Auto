"use client";

import { useEffect } from "react";
import { m, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { Swoosh } from "./Brand";
import { useFinePointer, useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

/*
  The signature: the logo's roofline, drawn as line art above the headline
  exactly as it sits above the wordmark in the logo lockup. It draws itself
  in on load (CSS stroke draw), then drifts with the pointer (desktop only)
  and slides with scroll. Transform only. Reduced motion: drawn, static.
*/
export default function HeroSwoosh({ className = "" }) {
  const reduced = useSafeReducedMotion();
  const fine = useFinePointer();
  const live = !reduced;

  const { scrollY } = useScroll();
  const driftX = useTransform(scrollY, [0, 800], [0, 110]);
  const driftY = useTransform(scrollY, [0, 800], [0, -30]);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 70, damping: 18, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 70, damping: 18, mass: 0.6 });

  const x = useTransform([driftX, sx], ([a, b]) => (live ? a + b : 0));
  const y = useTransform([driftY, sy], ([a, b]) => (live ? a + b : 0));

  // Pause the hero's CSS loops while the hero is off-screen.
  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => hero.toggleAttribute("data-offscreen", !e.isIntersecting));
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!live || !fine) return;
    let raf = 0;
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        px.set((e.clientX / window.innerWidth - 0.5) * 28);
        py.set((e.clientY / window.innerHeight - 0.5) * 12);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [live, fine, px, py]);

  return (
    <m.div aria-hidden="true" style={{ x, y }} className={`pointer-events-none ${className}`}>
      <Swoosh
        draw
        delay={200}
        limeWidth={5.5}
        whiteWidth={2.8}
        whiteOpacity={0.9}
        className="h-auto w-full"
      />
    </m.div>
  );
}
