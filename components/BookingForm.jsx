"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { AlertCircle, ChevronRight, Loader2, RotateCcw } from "lucide-react";
import { ShutterWheel } from "./Brand";
import { WhatsAppIcon } from "./Icons";
import { business, services } from "@/lib/content";

/*
  Web3Forms booking form, embedded in the hero.
  - The destination inbox is set on the Web3Forms dashboard for the access
    key (johnosautoservice@hotmail.com unless the client says otherwise).
  - Without NEXT_PUBLIC_WEB3FORMS_KEY the form still renders; in dev a
    warning shows, and a submit offers WhatsApp with the message prefilled.
*/
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";
const IS_DEV = process.env.NODE_ENV !== "production";
const EASE = [0.22, 1, 0.36, 1];

const EMPTY = { name: "", phone: "", service: "", message: "" };

function validate(field, value) {
  const v = value.trim();
  switch (field) {
    case "name":
      if (!v) return "Enter your name so Johno knows who to ask for.";
      if (v.length < 2) return "Name needs at least 2 letters.";
      return "";
    case "phone": {
      const digits = v.replace(/\D/g, "");
      if (!v) return "Enter a phone or WhatsApp number to reach you on.";
      if (digits.length < 7) return "That number looks short. Include all 7 digits, e.g. 485 9600.";
      return "";
    }
    case "service":
      return v ? "" : "Pick the service you need, or choose “Not sure yet”.";
    default:
      return "";
  }
}

const FIELDS = ["name", "phone", "service"];

function waLink(values) {
  const svc = services.find((s) => s.id === values.service)?.title || "a service";
  const text = `Hi Johno, I'm ${values.name || "interested"}. I'd like to book ${svc}.${
    values.message ? ` ${values.message}` : ""
  }`;
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`;
}

export default function BookingForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | done | error | nokey
  const [serverMsg, setServerMsg] = useState("");
  const refs = { name: useRef(null), phone: useRef(null), service: useRef(null), message: useRef(null) };
  const formRef = useRef(null);
  const lastPayload = useRef(null);

  // Service cards and hero CTAs ask the form to book a specific service.
  useEffect(() => {
    const onBook = (e) => {
      const svc = e.detail?.service;
      if (svc) {
        setValues((v) => ({ ...v, service: svc }));
        setErrors((er) => ({ ...er, service: "" }));
      }
      if (status === "done") setStatus("idle");
      const target = document.getElementById("book");
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
      window.setTimeout(() => refs.name.current?.focus({ preventScroll: true }), reduced ? 0 : 450);
    };
    window.addEventListener("johnos:book", onBook);
    return () => window.removeEventListener("johnos:book", onBook);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const set = (field) => (e) => {
    const value = e.target.value;
    setValues((v) => ({ ...v, [field]: value }));
    // Once a field has been judged, re-judge as the user fixes it.
    if (touched[field]) setErrors((er) => ({ ...er, [field]: validate(field, value) }));
  };

  const blur = (field) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors((er) => ({ ...er, [field]: validate(field, values[field]) }));
  };

  async function send(payload) {
    setStatus("sending");
    setServerMsg("");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.success) {
        setStatus("done");
        setValues(EMPTY);
        setTouched({});
      } else {
        setServerMsg(json.message || "The booking didn't go through.");
        setStatus("error");
      }
    } catch {
      setServerMsg("No connection. Check your signal and try again.");
      setStatus("error");
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    const next = {};
    FIELDS.forEach((f) => (next[f] = validate(f, values[f])));
    setErrors(next);
    setTouched({ name: true, phone: true, service: true });
    const firstBad = FIELDS.find((f) => next[f]);
    if (firstBad) {
      refs[firstBad].current?.focus();
      return;
    }
    if (formRef.current?.elements.botcheck?.checked) return; // honeypot

    if (!WEB3FORMS_KEY) {
      if (IS_DEV) console.warn("[BookingForm] NEXT_PUBLIC_WEB3FORMS_KEY is not set.");
      setStatus("nokey");
      return;
    }

    const svc = services.find((s) => s.id === values.service)?.title || "Not sure yet";
    const payload = {
      access_key: WEB3FORMS_KEY,
      subject: `New booking request: ${svc}`,
      from_name: "Johno's Auto Services website",
      name: values.name.trim(),
      phone: values.phone.trim(),
      service: svc,
      message: values.message.trim() || "(no message)",
      botcheck: false,
    };
    lastPayload.current = payload;
    send(payload);
  }

  const sending = status === "sending";

  const inputBase =
    "block w-full min-w-0 rounded-xl border bg-jet/60 px-4 text-[16px] text-white placeholder:text-white/40 " +
    "transition-[border-color,background-color,box-shadow] duration-200 ease-out " +
    "hover:border-white/25 focus:border-lime focus:bg-jet/80 focus:outline-none focus:ring-4 focus:ring-lime/15";
  const fieldClass = (f) =>
    `${inputBase} ${errors[f] ? "border-[#ff8f7a]/70" : "border-white/12"}`;

  const Label = ({ htmlFor, children, optional }) => (
    <label htmlFor={htmlFor} className="mb-2 flex items-baseline justify-between text-[13px] font-medium text-white/85">
      {children}
      {optional && <span className="text-[12px] font-normal text-white/50">Optional</span>}
    </label>
  );

  const ErrorText = ({ id, msg }) =>
    msg ? (
      <p id={id} className="mt-1.5 flex items-start gap-1.5 text-[13px] leading-snug text-[#ffb3a5]">
        <AlertCircle className="mt-[1px] h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        {msg}
      </p>
    ) : null;

  return (
    <div className="relative min-w-0">
      <AnimatePresence mode="wait" initial={false}>
        {status === "done" ? (
          <m.div
            key="done"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.45, ease: EASE }}
            className="flex min-h-[420px] flex-col items-center justify-center text-center"
            role="status"
            aria-live="polite"
          >
            <div className="relative h-20 w-20">
              <m.div
                className="absolute inset-0"
                initial={{ rotate: -120, scale: 0.6, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 120, damping: 14 }}
              >
                <ShutterWheel className="h-full w-full" gap="#151919" strokeWidth={5} />
              </m.div>
              <svg viewBox="0 0 80 80" className="absolute inset-0 h-full w-full" aria-hidden="true">
                <circle cx="40" cy="40" r="17" fill="#B6E51B" />
                <path
                  d="M31 40.5 L37.5 47 L50 34"
                  fill="none"
                  stroke="#080A0A"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength="1"
                  className="tick-draw"
                />
              </svg>
            </div>
            <h3 className="mt-6 text-[24px] font-bold tracking-[-0.02em] text-white">Booking received</h3>
            <p className="mt-2 max-w-[30ch] text-[15px] leading-relaxed text-white/72">
              We&rsquo;ll reach out shortly. Need it sooner? WhatsApp us now.
            </p>
            <a
              href={business.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#25D366] px-5 text-[14px] font-semibold text-jet transition-[transform,filter] duration-200 ease-out hover:brightness-110 active:scale-[0.97]"
            >
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp Johno
            </a>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-3 min-h-11 px-3 text-[13px] font-medium text-white/60 underline-offset-4 transition-colors duration-200 hover:text-white hover:underline active:opacity-70"
            >
              Book another service
            </button>
          </m.div>
        ) : (
          <m.form
            key="form"
            ref={formRef}
            onSubmit={onSubmit}
            noValidate
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="min-w-0"
            aria-describedby="book-intro"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-[22px] font-bold leading-tight tracking-[-0.02em] text-white sm:text-[24px]">
                  Book a service
                </h2>
                <p id="book-intro" className="mt-1.5 text-[14px] leading-relaxed text-white/65">
                  Tell us what&rsquo;s going on. Johno calls or WhatsApps you back.
                </p>
              </div>
              <span className="mt-1 inline-flex shrink-0 items-center gap-1.5 rounded-full border border-lime/30 bg-lime/10 px-2.5 py-1 text-[12px] font-semibold uppercase tracking-[0.1em] text-lime">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="ping absolute inset-0 rounded-full bg-lime" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-lime" />
                </span>
                Open now
              </span>
            </div>

            {IS_DEV && !WEB3FORMS_KEY && (
              <p className="mt-4 rounded-lg border border-dashed border-lime/40 px-3 py-2 text-[12px] leading-relaxed text-lime/90">
                Dev note: set NEXT_PUBLIC_WEB3FORMS_KEY in .env.local to send bookings by email.
              </p>
            )}

            {/* Honeypot: hidden from people and screen readers. */}
            <input type="checkbox" name="botcheck" tabIndex={-1} aria-hidden="true" className="hidden" />

            <div className="mt-6 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="min-w-0">
                <Label htmlFor="bk-name">Name</Label>
                <input
                  ref={refs.name}
                  id="bk-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={set("name")}
                  onBlur={blur("name")}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "bk-name-err" : undefined}
                  placeholder="Your name"
                  className={`${fieldClass("name")} h-12`}
                />
                <ErrorText id="bk-name-err" msg={errors.name} />
              </div>
              <div className="min-w-0">
                <Label htmlFor="bk-phone">Phone / WhatsApp</Label>
                <input
                  ref={refs.phone}
                  id="bk-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={values.phone}
                  onChange={set("phone")}
                  onBlur={blur("phone")}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "bk-phone-err" : undefined}
                  placeholder="868 000 0000"
                  className={`${fieldClass("phone")} h-12 tabular`}
                />
                <ErrorText id="bk-phone-err" msg={errors.phone} />
              </div>
              <div className="min-w-0 sm:col-span-2">
                <Label htmlFor="bk-service">Service interested in</Label>
                <select
                  ref={refs.service}
                  id="bk-service"
                  name="service"
                  value={values.service}
                  onChange={set("service")}
                  onBlur={blur("service")}
                  aria-invalid={!!errors.service}
                  aria-describedby={errors.service ? "bk-service-err" : undefined}
                  className={`${fieldClass("service")} select-chevron h-12 appearance-none pr-11 ${
                    values.service ? "" : "text-white/45"
                  }`}
                >
                  <option value="" disabled>
                    Choose a service
                  </option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id} className="bg-charcoal text-white">
                      {s.title}
                    </option>
                  ))}
                  <option value="unsure" className="bg-charcoal text-white">
                    Not sure yet
                  </option>
                </select>
                <ErrorText id="bk-service-err" msg={errors.service} />
              </div>
              <div className="min-w-0 sm:col-span-2">
                <Label htmlFor="bk-message" optional>
                  Message
                </Label>
                <textarea
                  ref={refs.message}
                  id="bk-message"
                  name="message"
                  rows={3}
                  value={values.message}
                  onChange={set("message")}
                  placeholder="Make, model, and what you've noticed: a noise, a warning light, a scratch."
                  className={`${fieldClass("message")} resize-none py-3 leading-relaxed`}
                />
              </div>
            </div>

            <div aria-live="polite" className="min-w-0">
              {status === "error" && (
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#ff8f7a]/35 bg-[#ff8f7a]/10 px-4 py-3">
                  <p className="text-[13.5px] leading-snug text-[#ffc9be]">
                    {serverMsg} Try again, or WhatsApp us.
                  </p>
                  <button
                    type="button"
                    onClick={() => lastPayload.current && send(lastPayload.current)}
                    className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-white/20 px-3 text-[13px] font-semibold text-white transition-colors duration-200 hover:border-lime hover:text-lime active:opacity-70"
                  >
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                    Retry
                  </button>
                </div>
              )}
              {status === "nokey" && (
                <div className="mt-4 rounded-xl border border-lime/30 bg-lime/[0.07] px-4 py-3">
                  <p className="text-[13.5px] leading-snug text-white/85">
                    Online booking isn&rsquo;t switched on yet. Send the same details on WhatsApp and Johno will reply there.
                  </p>
                  <a
                    href={waLink(values)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#25D366] px-4 text-[13.5px] font-semibold text-jet transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.97]"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Send on WhatsApp
                  </a>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={sending}
              aria-busy={sending}
              className="group mt-6 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-lime px-6 text-[14px] font-bold uppercase tracking-[0.07em] text-jet shadow-lime-lift transition-[transform,background-color,box-shadow] duration-200 ease-out hover:-translate-y-px hover:bg-lime-hi hover:shadow-lime-glow active:translate-y-0 active:scale-[0.98] active:bg-lime-lo disabled:cursor-progress disabled:opacity-80"
            >
              {sending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Sending
                </>
              ) : (
                <>
                  Book my service
                  <ChevronRight
                    className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
                    strokeWidth={2.75}
                    aria-hidden="true"
                  />
                </>
              )}
            </button>
            <p className="mt-3 text-center text-[12.5px] text-white/55">
              Rather talk?{" "}
              <a
                href={business.phoneHref}
                className="font-semibold text-lime underline-offset-4 transition-colors duration-200 hover:text-lime-hi hover:underline"
              >
                Call {business.phoneDisplay}
              </a>
            </p>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  );
}
