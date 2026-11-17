import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { Reveal, RevealItem } from "./Reveal";
import SwooshDivider from "./SwooshDivider";
import { WhatsAppIcon } from "./Icons";
import { business } from "@/lib/content";

const details = [
  { icon: Phone, label: "Call", value: business.phoneDisplay, href: business.phoneHref, tabular: true },
  { icon: Mail, label: "Email", value: business.email, href: `mailto:${business.email}` },
  { icon: Clock3, label: "Hours", value: "24 hours, Monday to Sunday" },
  { icon: MapPin, label: "Where", value: "Diego Martin, Trinidad & Tobago", note: business.visitNote },
];

export default function FinalCta() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="cv-auto relative isolate overflow-hidden bg-jet pb-24 pt-20 sm:pb-28 lg:pb-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[30%] -z-10 h-[80%] w-[110%] -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(182,229,27,0.10), rgba(182,229,27,0.03) 55%, rgba(182,229,27,0))" }}
      />
      <div aria-hidden="true" className="grain absolute inset-0 -z-10" />

      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
        <SwooshDivider className="mx-auto h-auto w-full max-w-[760px]" />

        <Reveal className="mt-14 text-center sm:mt-16">
          <RevealItem as="p" className="kicker">
            Day or night
          </RevealItem>
          <RevealItem
            as="h2"
            id="contact-title"
            className="display mx-auto mt-5 max-w-[14ch] text-[clamp(2.9rem,10vw,6rem)] leading-[0.95]"
          >
            We get you <span className="text-lime">road ready.</span>
          </RevealItem>
          <RevealItem as="p" className="body-copy mx-auto mt-7 max-w-[46ch]">
            Call at any hour, or send a WhatsApp with what&rsquo;s wrong. Johno will tell you straight
            what it needs and when he can see it.
          </RevealItem>
          <RevealItem className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <a
              href={business.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-[56px] items-center justify-center gap-2.5 rounded-xl bg-lime px-8 text-[15px] font-bold uppercase tracking-[0.07em] text-jet shadow-lime-lift transition-[transform,background-color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:bg-lime-hi hover:shadow-lime-glow active:translate-y-0 active:scale-[0.97] active:bg-lime-lo"
            >
              <WhatsAppIcon className="h-5 w-5 transition-transform duration-300 ease-spring group-hover:scale-110" />
              WhatsApp Johno
            </a>
            <a
              href={business.phoneHref}
              className="group inline-flex min-h-[56px] items-center justify-center gap-2.5 rounded-xl border border-white/20 px-8 text-[15px] font-semibold text-white transition-[transform,border-color,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-lime/70 hover:bg-lime/[0.06] active:translate-y-0 active:scale-[0.97]"
            >
              <Phone className="h-5 w-5 text-lime transition-transform duration-300 ease-spring group-hover:-rotate-12" aria-hidden="true" />
              Call <span className="tabular">{business.phoneDisplay}</span>
            </a>
          </RevealItem>
        </Reveal>

        <Reveal as="dl" className="mx-auto mt-16 grid max-w-[1100px] grid-cols-1 overflow-hidden rounded-2xl border border-white/10 bg-charcoal/80 shadow-elevated sm:grid-cols-2 lg:grid-cols-[1fr_1.3fr_1fr_1.1fr]" stagger={0.07}>
          {details.map((d, i) => {
            const Ico = d.icon;
            const inner = (
              <>
                <dt className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/55">
                  <Ico className="h-4 w-4 text-lime" aria-hidden="true" />
                  {d.label}
                </dt>
                <dd className={`mt-2.5 text-[15px] font-semibold text-white [overflow-wrap:anywhere] ${d.tabular ? "tabular" : ""}`}>
                  {d.href ? (
                    <a href={d.href} className="underline-offset-4 transition-colors duration-200 hover:text-lime hover:underline">
                      {d.value}
                    </a>
                  ) : (
                    d.value
                  )}
                  {d.note && <span className="mt-1 block text-[13px] font-normal text-white/55">{d.note}</span>}
                </dd>
              </>
            );
            return (
              <RevealItem
                key={d.label}
                y={14}
                className={`min-w-0 p-6 sm:p-7 ${i > 0 ? "border-t border-white/10" : ""} ${
                  i === 1 ? "sm:border-l sm:border-t-0" : ""
                } ${i === 3 ? "sm:border-l" : ""} ${i >= 2 ? "lg:border-t-0" : ""} ${i > 0 ? "lg:border-l" : ""}`}
              >
                {inner}
              </RevealItem>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
