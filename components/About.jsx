import Image from "next/image";
import { Reveal, RevealItem } from "./Reveal";
import { ShutterWheel, Swoosh } from "./Brand";
import { Icon } from "./Icons";
import { images } from "@/lib/images";
import { reasons } from "@/lib/content";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="cv-auto relative overflow-hidden bg-charcoal py-24 sm:py-28 lg:py-32">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[rgba(182,229,27,0)] via-lime/40 to-[rgba(182,229,27,0)]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[20%] top-[10%] h-[70%] w-[60%] rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(182,229,27,0.06), rgba(182,229,27,0))" }}
      />

      <div className="mx-auto grid max-w-[1320px] gap-14 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20 lg:px-10">
        {/* Photo column */}
        <Reveal className="relative min-w-0">
          <RevealItem className="relative" y={32}>
            <div
              className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-graphite bg-cover bg-center shadow-floating sm:aspect-[5/4] lg:aspect-[4/5]"
              style={{ backgroundImage: `url(${images.about.blur})` }}
            >
              <Image
                src={images.about.src}
                alt={images.about.alt}
                fill
                sizes="(min-width:1024px) 520px, 100vw"
                quality={65}
                className="object-cover brightness-90 contrast-110"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-charcoal mix-blend-multiply" style={{ opacity: 0.25 }} />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/60 via-[rgba(0,0,0,0)] to-[rgba(0,0,0,0)]" />
              <p className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/12 bg-jet/70 px-3 py-1.5 text-[12.5px] font-medium text-white/85 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-lime" aria-hidden="true" />
                On the tools in Diego Martin
              </p>
            </div>
            {/* Floating badge: the shutter mark + promise */}
            <div className="absolute -bottom-7 right-4 flex items-center gap-3 rounded-2xl border border-white/12 bg-steel px-4 py-3 shadow-floating sm:-right-6 sm:px-5 sm:py-4">
              <ShutterWheel className="spin-60 h-9 w-9" gap="#1C2121" />
              <div className="leading-tight">
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-lime">The promise</p>
                <p className="mt-1 text-[15px] font-bold text-white">We get you road ready.</p>
              </div>
            </div>
          </RevealItem>
        </Reveal>

        {/* Copy column */}
        <div className="min-w-0">
          <Reveal>
            <RevealItem as="p" className="kicker">
              About Johno
            </RevealItem>
            <RevealItem as="h2" id="about-title" className="display mt-4 text-[clamp(2.1rem,5vw,3.5rem)] leading-[1.03]">
              The name on the sign is the person <span className="text-lime">under the hood.</span>
            </RevealItem>
            <RevealItem as="p" className="body-copy mt-6 max-w-[58ch]">
              Johnathan Gowrie named the shop after the name everyone already calls him: Johno. It
              was meant to feel personal, and it is. When you bring your car in, you deal with the
              owner, start to finish. Customers say what they notice most is how carefully he
              explains the job, and how much he clearly loves the work.
            </RevealItem>
            <RevealItem aria-hidden="true" className="mt-8 w-[220px] opacity-80">
              <Swoosh limeWidth={6} whiteWidth={3} whiteOpacity={0.5} className="h-auto w-full" />
            </RevealItem>
          </Reveal>

          <Reveal as="ul" className="mt-12 grid grid-cols-1 border-t border-white/10 sm:grid-cols-2" stagger={0.1}>
            {reasons.map((r, i) => (
              <RevealItem
                as="li"
                key={r.title}
                className={`border-b border-white/10 py-7 sm:py-8 ${i % 2 === 0 ? "sm:pr-8" : "sm:border-l sm:pl-8"}`}
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-lime/25 bg-lime/[0.08] text-lime">
                  <Icon name={r.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-[18px] font-bold tracking-[-0.01em] text-white">{r.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.65] text-white/65">{r.copy}</p>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
