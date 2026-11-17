"use client";

import { useRef } from "react";
import Image from "next/image";
import { m, useScroll, useTransform } from "framer-motion";
import { Reveal, RevealItem } from "./Reveal";
import { images } from "@/lib/images";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

const tiles = [
  { key: "engineBay", caption: "Engine bay", ratio: "aspect-[4/5]" },
  { key: "waxing", caption: "Hand finish", ratio: "aspect-[4/3]" },
  { key: "paintBooth", caption: "Paint booth", ratio: "aspect-[4/3]" },
  { key: "diagnostics", caption: "Diagnostics", ratio: "aspect-[4/5]" },
  { key: "headlight", caption: "Headlight restoration", ratio: "aspect-[4/3]" },
  { key: "workshop", caption: "In the workshop", ratio: "aspect-[4/5]" },
];

function Tile({ t, sizes, className = "" }) {
  const img = images[t.key];
  return (
    <figure
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-graphite bg-cover bg-center shadow-elevated ${t.ratio} ${className}`}
      style={{ backgroundImage: `url(${img.blur})` }}
    >
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes={sizes}
        quality={62}
        className="object-cover brightness-90 contrast-110 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-charcoal mix-blend-multiply" style={{ opacity: 0.25 }} />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/60 via-[rgba(0,0,0,0)] to-[rgba(0,0,0,0)]" />
      <figcaption className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-lime/35 bg-jet/75 px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-lime backdrop-blur-sm">
        {t.caption}
      </figcaption>
    </figure>
  );
}

export default function Showcase() {
  const ref = useRef(null);
  const reduced = useSafeReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const up = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [70, -70]);
  const down = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-40, 40]);

  const cols = [
    { y: down, items: [tiles[0], tiles[1]] },
    { y: up, items: [tiles[2], tiles[3]] },
    { y: down, items: [tiles[4], tiles[5]] },
  ];

  return (
    <section ref={ref} aria-labelledby="showcase-title" className="cv-auto relative overflow-hidden bg-jet py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
        <Reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <RevealItem>
            <p className="kicker">Inside the work</p>
            <h2 id="showcase-title" className="display mt-4 max-w-[16ch] text-[clamp(2.1rem,5vw,3.5rem)] leading-[1.03]">
              Every job, done properly.
            </h2>
          </RevealItem>
          <RevealItem as="p" className="body-copy max-w-[40ch] md:pb-1.5">
            Diagnosis, servicing, paint and polish. The care is the same whether it&rsquo;s a fuse or a full respray.
          </RevealItem>
        </Reveal>
      </div>

      {/* Phones + tablets: swipeable rail */}
      <div className="mt-12 lg:hidden">
        <ul
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Workshop photos"
        >
          {tiles.map((t) => (
            <li key={t.key} className="w-[78%] shrink-0 snap-start sm:w-[46%]">
              <Tile t={{ ...t, ratio: "aspect-[4/5]" }} sizes="(min-width:640px) 46vw, 78vw" />
            </li>
          ))}
          <li aria-hidden="true" className="w-1 shrink-0" />
        </ul>
        <p className="mt-2 px-5 text-[12.5px] text-white/50 sm:px-8">Swipe for more</p>
      </div>

      {/* Desktop: masonry with counter-parallax columns (transform only) */}
      <div className="mx-auto mt-16 hidden max-w-[1320px] grid-cols-3 gap-6 px-10 lg:grid">
        {cols.map((c, i) => (
          <m.div key={i} style={{ y: c.y }} className={`flex flex-col gap-6 ${i === 1 ? "pt-14" : ""}`}>
            {c.items.map((t) => (
              <Tile key={t.key} t={t} sizes="420px" />
            ))}
          </m.div>
        ))}
      </div>
    </section>
  );
}
