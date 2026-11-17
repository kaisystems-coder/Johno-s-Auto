"use client";

import { useRef } from "react";
import { m, useMotionValue, useSpring } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useFinePointer, useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

/** Scroll to the hero form, optionally preselecting a service, and focus it. */
export function requestBooking(serviceId) {
  window.dispatchEvent(new CustomEvent("johnos:book", { detail: { service: serviceId } }));
}

const primaryClass =
  "group relative inline-flex min-h-[52px] items-center justify-center gap-1.5 rounded-xl bg-lime px-7 text-[14px] font-bold uppercase tracking-[0.07em] text-jet shadow-lime-lift " +
  "transition-[background-color,box-shadow] duration-200 ease-out hover:bg-lime-hi hover:shadow-lime-glow active:bg-lime-lo";

/**
 * Primary CTA: lime, dark text, ">" arrow. Magnetic on desktop only; the
 * press squash runs everywhere. Clicking books via the hero form.
 */
export function MagneticBookButton({ service, label = "Book a service", className = "" }) {
  const ref = useRef(null);
  const fine = useFinePointer();
  const reduced = useSafeReducedMotion();
  const magnetic = fine && !reduced;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(my, { stiffness: 220, damping: 16, mass: 0.4 });

  const onMove = (e) => {
    if (!magnetic || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.22);
    my.set((e.clientY - (r.top + r.height / 2)) * 0.32);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <m.a
      ref={ref}
      href="#book"
      onClick={(e) => {
        e.preventDefault();
        requestBooking(service);
      }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x, y }}
      whileTap={{ scale: 0.96 }}
      className={`${primaryClass} ${className}`}
    >
      {label}
      <ChevronRight
        className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
        strokeWidth={2.75}
        aria-hidden="true"
      />
    </m.a>
  );
}

/** Small text-style "Book this" link used on service cards. */
export function BookServiceLink({ service, children, className = "" }) {
  return (
    <a
      href="#book"
      onClick={(e) => {
        e.preventDefault();
        requestBooking(service);
      }}
      className={className}
    >
      {children}
    </a>
  );
}
