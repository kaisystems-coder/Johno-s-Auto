import { Facebook, Instagram } from "lucide-react";
import Logo from "./Logo";
import { WhatsAppIcon } from "./Icons";
import { business } from "@/lib/content";

const social = [
  { href: business.instagram, label: "Johno's Auto Services on Instagram", Icon: Instagram },
  { href: business.facebook, label: "Johno's Auto Services on Facebook", Icon: Facebook },
];

const linkClass =
  "inline-flex min-h-8 items-center text-white/75 underline-offset-4 transition-colors duration-200 hover:text-lime hover:underline";

export default function Footer() {
  return (
    <footer id="site-footer" className="cv-auto relative border-t border-white/10 bg-charcoal">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 pb-10 pt-16 sm:px-8 md:grid-cols-[1.3fr_1fr_1fr_auto] lg:px-10">
        <div>
          <Logo variant="full" sizes="240px" className="h-auto w-[220px]" />
          <p className="mt-5 max-w-[34ch] text-[14px] leading-relaxed text-white/60">
            Mechanical, electrical, paint and detailing in {business.location}. Owner-run by Johno.
          </p>
        </div>

        <div>
          <h2 className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white/50">Contact</h2>
          <ul className="mt-4 space-y-1.5 text-[14.5px]">
            <li>
              <a href={business.phoneHref} className={`${linkClass} tabular`}>
                {business.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={business.whatsappHref} target="_blank" rel="noopener noreferrer" className={`${linkClass} gap-1.5`}>
                <WhatsAppIcon className="h-3.5 w-3.5 text-lime" />
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${business.email}`} className={`${linkClass} break-all`}>
                {business.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white/50">Hours &amp; location</h2>
          <ul className="mt-4 space-y-2 text-[14.5px] text-white/75">
            <li>Open 24 hours, Mon&ndash;Sun</li>
            <li>Emergency auto needs welcome</li>
            <li>{business.location}</li>
            <li className="text-lime">{business.visitNote}</li>
          </ul>
        </div>

        <div>
          <h2 className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white/50">Follow</h2>
          <ul className="mt-3 flex gap-2">
            {social.map(({ href, label, Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/12 text-white/80 transition-[transform,border-color,color] duration-200 ease-out hover:-translate-y-0.5 hover:border-lime/60 hover:text-lime active:translate-y-0 active:scale-95"
                >
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/[0.07]">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-2 px-5 py-6 pb-28 text-[12.5px] text-white/50 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:pb-6 lg:px-10">
          <p>&copy; {new Date().getFullYear()} {business.name}. We get you road ready.</p>
          <p>Diego Martin, Trinidad &amp; Tobago</p>
        </div>
      </div>
    </footer>
  );
}
