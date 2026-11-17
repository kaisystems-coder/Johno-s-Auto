import Image from "next/image";
import { Phone, Star, MapPin } from "lucide-react";
import HeroSwoosh from "./HeroSwoosh";
import BookingForm from "./BookingForm";
import { MagneticBookButton } from "./Buttons";
import { ShutterWheel } from "./Brand";
import { images } from "@/lib/images";
import { business } from "@/lib/content";

/*
  Server component. The load sequence is CSS (anim-word / anim-rise with
  --d delays) so the headline never waits on hydration; only the swoosh
  parallax, the magnetic CTA and the form are client islands.
*/

const LINE_1 = ["Get", "back", "on", "the", "road"];
const LINE_2 = ["with", "confidence."];
const WORD_START = 120;
const WORD_STEP = 70;

const chips = [
  { key: "rating", label: "5.0 Google rating", short: "5.0 on Google", icon: "star" },
  { key: "open", label: "Open 24/7", short: "Open 24/7", icon: "dot" },
  { key: "emergency", label: "Emergency repairs", short: "Emergencies", icon: null },
  { key: "range", label: "Mechanical + Electrical + Paint + Detailing", short: null, icon: null },
];

export default function Hero() {
  let i = 0;
  const wordDelay = () => `${WORD_START + WORD_STEP * i++}ms`;
  const afterWords = WORD_START + WORD_STEP * (LINE_1.length + LINE_2.length);

  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-jet">
      {/* 1. Base field: jet into charcoal. */}
      <div aria-hidden="true" className="absolute inset-0 -z-30 bg-gradient-to-b from-jet via-jet to-charcoal" />

      {/* 2. Moody workshop photo, low opacity, graded dark. */}
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        <Image
          src={images.hero.src}
          alt=""
          fill
          // Eager but not preloaded: at 30% opacity it is atmosphere, not the
          // LCP element (the headline/subhead is). A high-priority preload
          // competed with CSS + font on slow 4G and pushed FCP back.
          loading="eager"
          fetchPriority="low"
          sizes="100vw"
          quality={55}
          className="object-cover object-[50%_40%] opacity-30 brightness-90 contrast-110 lg:opacity-[0.34]"
        />
        {/* colour treatment + legibility scrims */}
        <div className="absolute inset-0 bg-charcoal mix-blend-multiply" style={{ opacity: 0.35 }} />
        <div className="absolute inset-0 bg-gradient-to-r from-jet via-jet/70 to-jet/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-[rgba(8,10,10,0.2)] to-jet/60" />
      </div>

      {/* 3. Lime light blooms (gradient falloff, no blur filter). */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="bloom-a absolute left-[-18%] top-[2%] h-[78vh] w-[78vw] max-w-[1100px] rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(182,229,27,0.16), rgba(182,229,27,0.05) 55%, rgba(182,229,27,0) 100%)" }}
        />
        <div
          className="bloom-b absolute right-[-10%] top-[22%] hidden h-[60vh] w-[42vw] rounded-full lg:block"
          style={{ background: "radial-gradient(closest-side, rgba(182,229,27,0.12), rgba(182,229,27,0) 100%)" }}
        />
      </div>

      {/* 6. Vignette + grain.  7. Headlight glint. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "radial-gradient(120% 90% at 40% 45%, rgba(8,10,10,0) 55%, rgba(8,10,10,0.75) 100%)" }}
      />
      <div aria-hidden="true" className="grain absolute inset-0 -z-10" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="sweep absolute -top-[10%] left-0 h-[120%] w-[22%]"
          style={{ background: "linear-gradient(90deg, rgba(182,229,27,0) 0%, rgba(182,229,27,0.07) 45%, rgba(220,255,140,0.12) 50%, rgba(182,229,27,0.07) 55%, rgba(182,229,27,0) 100%)" }}
        />
      </div>

      <div
        className="relative mx-auto grid min-h-[100dvh] max-w-[1320px] grid-cols-1 content-center gap-x-14 gap-y-8 px-5 pb-16 pt-[100px] [grid-template-areas:'copy'_'form'_'extras'] sm:px-8 sm:pt-[118px] lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-y-9 lg:px-10 lg:pb-20 lg:[grid-template-areas:'copy_form'_'extras_form'] xl:gap-x-16"
      >
        {/* Copy */}
        <div className="min-w-0 self-end [grid-area:copy]">
          {/* 4. Signature roofline swoosh, sitting over the headline like the logo lockup. */}
          <HeroSwoosh className="-ml-[3%] mb-5 w-[92%] max-w-[600px] sm:mb-7 sm:w-[86%]" />
          <p className="kicker anim-rise flex items-center gap-2.5" style={{ "--d": "40ms" }}>
            <ShutterWheel className="h-4 w-4" />
            Auto care you can trust
          </p>
          <h1
            id="hero-title"
            className="display mt-5 text-[clamp(2.55rem,9.4vw,4.1rem)] leading-[1] sm:mt-6 xl:text-[4.4rem]"
          >
            <span className="block">
              {LINE_1.map((w) => (
                <span key={w} className="anim-word" style={{ "--d": wordDelay() }}>
                  {w}
                  {" "}
                </span>
              ))}
            </span>
            <span className="block text-lime">
              {LINE_2.map((w) => (
                <span key={w} className="anim-word" style={{ "--d": wordDelay() }}>
                  {w}
                  {w !== "confidence." && " "}
                </span>
              ))}
            </span>
          </h1>
          <p
            className="body-copy anim-lift mt-6 max-w-[34rem] sm:text-[19px]"
            style={{ "--d": `${afterWords + 60}ms` }}
          >
            Breakdown, warning light, or tired paint? Diego Martin&rsquo;s 5&#8209;star shop gets you
            road ready, day or night.
          </p>
        </div>

        {/* Form card (right on desktop, right after the subhead on phones) */}
        <div id="book" className="relative min-w-0 self-center [grid-area:form] scroll-mt-24">
          {/* 5. Faint rotating shutter ring behind the card. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 hidden h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 lg:block"
          >
            <ShutterWheel variant="outline" className="spin-60 h-full w-full text-white/[0.07]" />
          </div>

          <div
            className="anim-lift relative rounded-[24px] border border-white/15 bg-graphite/95 p-5 shadow-floating sm:p-7 lg:bg-white/[0.06] lg:p-8 lg:backdrop-blur-2xl"
            style={{ "--d": `${afterWords + 420}ms` }}
          >
            {/* lime top-edge highlight */}
            <div
              aria-hidden="true"
              className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-[rgba(182,229,27,0)] via-lime to-[rgba(182,229,27,0)]"
            />
            {/* slow border glow (opacity only) */}
            <div
              aria-hidden="true"
              className="glow-pulse pointer-events-none absolute -inset-px rounded-[24px] border border-lime/25"
              style={{ boxShadow: "0 0 40px -12px rgba(182,229,27,0.35)" }}
            />
            <div className="relative">
              <BookingForm />
            </div>
          </div>
        </div>

        {/* Trust chips + CTAs */}
        <div className="min-w-0 self-start [grid-area:extras]">
          <ul
            aria-label="Why drivers choose Johno's"
            className="anim-rise flex flex-nowrap gap-2 sm:flex-wrap"
            style={{ "--d": `${afterWords + 180}ms` }}
          >
            {chips.map((c) => (
              <li
                key={c.key}
                className={`items-center gap-1.5 whitespace-nowrap rounded-full border border-white/12 bg-white/[0.05] px-3 py-1.5 text-[12.5px] font-medium text-white/85 sm:px-3.5 sm:text-[13px] ${
                  c.short ? "inline-flex" : "hidden sm:inline-flex"
                }`}
              >
                {c.icon === "star" && <Star className="h-3.5 w-3.5 fill-lime text-lime" aria-hidden="true" />}
                {c.icon === "dot" && (
                  <span className="relative mr-0.5 flex h-1.5 w-1.5" aria-hidden="true">
                    <span className="ping absolute inset-0 rounded-full bg-lime" />
                    <span className="relative h-1.5 w-1.5 rounded-full bg-lime" />
                  </span>
                )}
                {c.short ? (
                  <>
                    <span className="sm:hidden">{c.short}</span>
                    <span className="hidden sm:inline">{c.label}</span>
                  </>
                ) : (
                  c.label
                )}
              </li>
            ))}
          </ul>

          <div
            className="anim-rise mt-7 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ "--d": `${afterWords + 300}ms` }}
          >
            {/* Phones: the form is directly above, so the call button leads. */}
            <MagneticBookButton className="hidden lg:inline-flex" />
            <a
              href={business.phoneHref}
              className="group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-white/20 px-6 text-[14px] font-semibold text-white transition-[border-color,background-color,transform] duration-200 ease-out hover:border-lime/70 hover:bg-lime/[0.06] active:scale-[0.97]"
            >
              <Phone
                className="h-4 w-4 text-lime transition-transform duration-300 ease-spring group-hover:-rotate-12"
                strokeWidth={2}
                aria-hidden="true"
              />
              Call now
              <span className="tabular text-white/55">{business.phoneDisplay.replace("+1 ", "")}</span>
            </a>
          </div>

          <p
            className="anim-rise mt-6 flex items-center gap-2 text-[13px] text-white/55"
            style={{ "--d": `${afterWords + 380}ms` }}
          >
            <MapPin className="h-3.5 w-3.5 text-lime" aria-hidden="true" />
            {business.location} &middot; {business.visitNote}
          </p>
        </div>
      </div>
    </section>
  );
}
