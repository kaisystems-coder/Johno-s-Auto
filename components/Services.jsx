import Image from "next/image";
import { Check, ChevronRight } from "lucide-react";
import { Reveal, RevealItem } from "./Reveal";
import { BookServiceLink } from "./Buttons";
import { ShutterWheel } from "./Brand";
import { Icon } from "./Icons";
import { images } from "@/lib/images";
import { services } from "@/lib/content";

// 12-col bento: feature card top-left, wide card bottom-right (zig-zag).
const LAYOUT = {
  mechanical: { cell: "md:col-span-2 lg:col-span-7 lg:row-span-2", media: "aspect-[16/10] lg:aspect-auto lg:min-h-[300px] lg:flex-1", feature: true },
  servicing: { cell: "lg:col-span-5", media: "aspect-[16/9] lg:aspect-[2/1]" },
  electrical: { cell: "lg:col-span-5", media: "aspect-[16/9] lg:aspect-[2/1]" },
  painting: { cell: "lg:col-span-5", media: "aspect-[16/9]" },
  detailing: { cell: "md:col-span-2 lg:col-span-7", media: "aspect-[16/9] lg:aspect-[21/9]", wide: true },
};

function ServiceCard({ s }) {
  const L = LAYOUT[s.id];
  const img = images[s.image];
  return (
    // Motion owns the outer wrapper's transform (reveal); the hover lift lives
    // on the inner article so Framer's inline transform never overrides it.
    <RevealItem className={`flex min-w-0 ${L.cell}`}>
    <article
      className="group relative flex w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-graphite shadow-elevated transition-transform duration-300 ease-out hover:-translate-y-1"
    >
      {/* lime border glow on hover (opacity only) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 shadow-lime-glow transition-opacity duration-300 ease-out group-hover:opacity-100"
      />

      <div
        className={`relative overflow-hidden bg-cover bg-center ${L.media}`}
        style={{ backgroundImage: `url(${img.blur})` }}
      >
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes={L.feature || L.wide ? "(min-width:1024px) 760px, (min-width:768px) 90vw, 100vw" : "(min-width:1024px) 540px, (min-width:768px) 45vw, 100vw"}
          quality={65}
          className="object-cover brightness-90 contrast-110 transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-charcoal mix-blend-multiply" style={{ opacity: 0.3 }} />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-graphite via-[rgba(21,25,25,0.25)] to-black/10" />

        <span className="absolute left-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-jet/70 text-lime backdrop-blur-sm">
          <Icon name={s.icon} className="h-5 w-5" />
        </span>
        <ShutterWheel
          className="absolute right-4 top-4 h-7 w-7 opacity-80 transition-transform duration-[900ms] ease-out group-hover:rotate-[240deg]"
        />
      </div>

      <div className={`relative flex flex-1 flex-col p-6 ${L.feature ? "sm:p-8" : ""}`}>
        <h3 className={`font-bold tracking-[-0.02em] text-white ${L.feature ? "text-[26px] sm:text-[30px]" : "text-[21px]"}`}>
          {s.title}
        </h3>
        <p className="mt-2 max-w-[48ch] text-[15px] leading-[1.65] text-white/68">{s.copy}</p>
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2" aria-label={`${s.title} includes`}>
          {s.includes.map((x) => (
            <li key={x} className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-white/80">
              <Check className="h-3.5 w-3.5 text-lime" strokeWidth={3} aria-hidden="true" />
              {x}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-6">
          <BookServiceLink
            service={s.id}
            className={
              L.wide
                ? "inline-flex min-h-12 items-center gap-1.5 rounded-xl bg-lime px-5 text-[13px] font-bold uppercase tracking-[0.07em] text-jet shadow-lime-lift transition-[transform,background-color] duration-200 ease-out hover:-translate-y-px hover:bg-lime-hi active:translate-y-0 active:scale-[0.97] active:bg-lime-lo"
                : "group/link inline-flex min-h-11 items-center gap-1 text-[14px] font-semibold text-lime transition-colors duration-200 ease-out hover:text-lime-hi active:opacity-70"
            }
          >
            Book {s.short.toLowerCase()}
            <ChevronRight
              className="h-4 w-4 transition-transform duration-200 ease-out group-hover/link:translate-x-1"
              strokeWidth={2.75}
              aria-hidden="true"
            />
          </BookServiceLink>
        </div>
      </div>
    </article>
    </RevealItem>
  );
}

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="cv-auto relative bg-jet py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
        <Reveal className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
          <RevealItem>
            <p className="kicker">Services</p>
            <h2 id="services-title" className="display mt-4 text-[clamp(2.1rem,5.2vw,3.6rem)] leading-[1.02]">
              Everything your car needs, <span className="text-lime">under one roof.</span>
            </h2>
          </RevealItem>
          <RevealItem as="p" className="body-copy max-w-[52ch] lg:pb-1.5">
            From a check-engine light at midnight to a full paint correction, Johno handles the job
            himself and tells you straight what it needs.
          </RevealItem>
        </Reveal>

        <Reveal className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12 lg:gap-6" stagger={0.09}>
          {services.map((s) => (
            <ServiceCard key={s.id} s={s} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
