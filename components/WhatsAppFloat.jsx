"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon } from "./Icons";
import { business } from "@/lib/content";

/*
  Fixed bottom-right. Steps aside (fades + slides down, non-interactive)
  while the footer is on screen, and on phones while the hero booking form
  is on screen, so it never covers fields or footer links.
*/
export default function WhatsAppFloat() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const form = document.getElementById("book");
    const footer = document.getElementById("site-footer");
    const mq = window.matchMedia("(max-width: 1023px)");
    const state = { form: false, footer: false };
    const update = () => setHidden(state.footer || (mq.matches && state.form));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.target === form) state.form = e.isIntersecting;
          if (e.target === footer) state.footer = e.isIntersecting;
        });
        update();
      },
      { threshold: 0.05 }
    );
    form && io.observe(form);
    footer && io.observe(footer);
    mq.addEventListener("change", update);
    return () => {
      io.disconnect();
      mq.removeEventListener("change", update);
    };
  }, []);

  return (
    <div
      className={`fixed z-float transition-[opacity,transform] duration-300 ease-out ${
        hidden ? "pointer-events-none translate-y-4 opacity-0" : "opacity-100"
      }`}
      style={{
        right: "max(1.5rem, env(safe-area-inset-right))",
        bottom: "max(1.5rem, env(safe-area-inset-bottom))",
      }}
    >
      <a
        href={business.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Johno's Auto Services on WhatsApp"
        tabIndex={hidden ? -1 : 0}
        className="group relative flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_28px_-8px_rgba(37,211,102,0.55),0_4px_10px_rgba(0,0,0,0.35)] transition-transform duration-200 ease-out hover:scale-[1.06] active:scale-95 sm:h-14 sm:w-14"
      >
        <span aria-hidden="true" className="wa-pulse absolute inset-0 rounded-full bg-[#25D366]" />
        <WhatsAppIcon className="relative h-7 w-7" />
        {/* Tooltip slides out to the left on hover / keyboard focus. */}
        <span
          role="tooltip"
          className="pointer-events-none absolute right-full mr-3 hidden translate-x-2 whitespace-nowrap rounded-lg bg-white px-3 py-2 text-[13px] font-semibold text-jet opacity-0 shadow-floating transition-[opacity,transform] duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 sm:block"
        >
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}
