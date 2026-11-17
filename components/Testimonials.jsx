import { Star } from "lucide-react";
import { Reveal, RevealItem } from "./Reveal";
import { testimonials } from "@/lib/content";

function Stars() {
  return (
    <div className="flex gap-1" role="img" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className="h-4 w-4 fill-lime text-lime" aria-hidden="true" />
      ))}
    </div>
  );
}

// PLACEHOLDER content: see lib/content.js `testimonials`.
export default function Testimonials() {
  const [lead, ...rest] = testimonials;
  return (
    <section aria-labelledby="reviews-title" className="cv-auto relative bg-charcoal py-24 sm:py-28 lg:py-32">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[rgba(182,229,27,0)] via-lime/40 to-[rgba(182,229,27,0)]" />
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <RevealItem>
            <p className="kicker">Reviews</p>
            <h2 id="reviews-title" className="display mt-4 text-[clamp(2.1rem,5vw,3.5rem)] leading-[1.03]">
              5.0 stars, <span className="text-lime">for good reason.</span>
            </h2>
          </RevealItem>
          <RevealItem className="flex items-center gap-3 sm:pb-2">
            <Stars />
            <span className="text-[14px] font-medium text-white/70">Rated 5.0 on Google</span>
          </RevealItem>
        </Reveal>

        <Reveal className="mt-14 grid gap-5 lg:grid-cols-12 lg:gap-6" stagger={0.1}>
          <RevealItem as="figure" className="relative flex flex-col justify-between rounded-2xl border border-white/10 bg-graphite p-7 shadow-elevated sm:p-10 lg:col-span-7 lg:row-span-2">
            <span aria-hidden="true" className="pointer-events-none absolute right-8 top-2 select-none text-[160px] font-bold leading-none text-lime/10">
              &ldquo;
            </span>
            <div className="relative">
              <Stars />
              <blockquote className="mt-6 text-[clamp(1.35rem,2.6vw,1.95rem)] font-semibold leading-[1.35] tracking-[-0.015em] text-white">
                &ldquo;{lead.quote}&rdquo;
              </blockquote>
            </div>
            <figcaption className="relative mt-10 flex items-center gap-3 border-t border-white/10 pt-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-lime text-[15px] font-bold text-jet">
                {lead.name.charAt(0)}
              </span>
              <span>
                <span className="block text-[15px] font-semibold text-white">{lead.name}</span>
                <span className="block text-[13px] text-white/55">{lead.detail}</span>
              </span>
            </figcaption>
          </RevealItem>

          {rest.map((t) => (
            <RevealItem
              as="figure"
              key={t.name}
              className="flex flex-col justify-between rounded-2xl border border-white/10 bg-graphite/70 p-7 lg:col-span-5"
            >
              <div>
                <Stars />
                <blockquote className="mt-5 text-[16.5px] leading-[1.65] text-white/85">&ldquo;{t.quote}&rdquo;</blockquote>
              </div>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-lime/40 text-[13px] font-bold text-lime">
                  {t.name.charAt(0)}
                </span>
                <span className="text-[14px]">
                  <span className="font-semibold text-white">{t.name}</span>
                  <span className="text-white/50"> &middot; {t.detail}</span>
                </span>
              </figcaption>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
