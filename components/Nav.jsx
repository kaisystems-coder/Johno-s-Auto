"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m, useScroll, useSpring } from "framer-motion";
import { ChevronRight, Menu, Phone, X } from "lucide-react";
import Logo from "./Logo";
import { business, nav } from "@/lib/content";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active-section highlight: whichever section crosses the upper-middle band.
  useEffect(() => {
    const els = nav.map((n) => document.getElementById(n.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    els.forEach((el) => io.observe(el));
    const top = () => window.scrollY < window.innerHeight * 0.5 && setActive("");
    window.addEventListener("scroll", top, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", top);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
      {/* Scroll progress: thin lime line, top edge. */}
      <m.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-progress h-[2px] origin-left bg-lime"
        style={{ scaleX: progress }}
      />

      <header className="fixed inset-x-0 top-0 z-nav">
        {/* Solid layer fades in rather than animating background-color. */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 border-b border-white/8 bg-jet/85 transition-opacity duration-300 ease-out ${
            solid ? "opacity-100 backdrop-blur-xl" : "opacity-0"
          }`}
        />
        {/* Lime underline draws across once the bar goes solid. */}
        <div
          aria-hidden="true"
          className={`absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-[rgba(182,229,27,0)] via-lime/70 to-[rgba(182,229,27,0)] transition-transform duration-700 ease-out ${
            solid ? "scale-x-100" : "scale-x-0"
          }`}
        />

        <nav
          aria-label="Main"
          className="relative mx-auto flex h-[68px] max-w-[1320px] items-center justify-between gap-4 px-[max(20px,env(safe-area-inset-left))] sm:h-[76px] lg:px-10"
        >
          <a
            href="#top"
            className="-ml-1 flex min-h-11 items-center rounded-md p-1 transition-transform duration-200 ease-out active:scale-[0.97]"
            aria-label="Johno's Auto Services, back to top"
          >
            <Logo variant="nav" priority sizes="120px" className="h-10 w-auto sm:h-11" />
          </a>

          <div className="flex items-center gap-1 sm:gap-2">
            <ul className="mr-3 hidden items-center gap-1 md:flex">
              {nav.map((n) => {
                const isActive = active === n.id;
                return (
                  <li key={n.id}>
                    <a
                      href={`#${n.id}`}
                      aria-current={isActive ? "true" : undefined}
                      className={`group relative inline-flex min-h-11 items-center px-3.5 text-[14px] font-medium transition-colors duration-200 ease-out hover:text-white active:opacity-70 ${
                        isActive ? "text-white" : "text-white/65"
                      }`}
                    >
                      {n.label}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-3.5 bottom-2 h-[2px] origin-left rounded-full bg-lime transition-transform duration-300 ease-out ${
                          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>

            <a
              href={business.phoneHref}
              aria-label={`Call ${business.phoneDisplay}`}
              className="hidden min-h-11 items-center gap-2 rounded-xl px-3 text-[14px] font-medium text-white/80 transition-colors duration-200 ease-out hover:text-lime active:opacity-70 lg:inline-flex"
            >
              <Phone className="h-4 w-4 text-lime" strokeWidth={2} aria-hidden="true" />
              <span className="tabular">{business.phoneDisplay}</span>
            </a>

            <a
              href="#book"
              className="group inline-flex min-h-11 items-center gap-1 rounded-xl bg-lime px-4 text-[13px] font-bold uppercase tracking-[0.06em] text-jet shadow-lime-lift transition-[transform,background-color] duration-200 ease-out hover:-translate-y-px hover:bg-lime-hi active:translate-y-0 active:scale-[0.97] active:bg-lime-lo sm:px-5"
            >
              <span className="sm:hidden">Book</span>
              <span className="hidden sm:inline">Book a service</span>
              <ChevronRight
                className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                strokeWidth={2.5}
                aria-hidden="true"
              />
            </a>

            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-white transition-[transform,background-color] duration-200 ease-out hover:bg-white/8 active:scale-95 md:hidden"
            >
              {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <m.div
              id="mobile-menu"
              key="menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative border-b border-white/10 bg-jet px-5 pb-6 pt-2 md:hidden"
            >
              <ul className="flex flex-col">
                {nav.map((n) => (
                  <li key={n.id} className="border-b border-white/8">
                    <a
                      href={`#${n.id}`}
                      onClick={() => setOpen(false)}
                      className="flex min-h-[52px] items-center justify-between text-[17px] font-semibold text-white transition-colors duration-200 hover:text-lime active:opacity-70"
                    >
                      {n.label}
                      <ChevronRight className="h-4 w-4 text-lime" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href={business.phoneHref}
                className="mt-5 flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 text-[15px] font-semibold text-white transition-colors duration-200 hover:border-lime/60 active:opacity-70"
              >
                <Phone className="h-4 w-4 text-lime" aria-hidden="true" />
                Call {business.phoneDisplay}
              </a>
            </m.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
