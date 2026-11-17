/*
  All business facts in one place. Sourced from the build brief + brand guide.
  Anything marked PLACEHOLDER must be confirmed with Johno before launch.
*/

export const business = {
  name: "Johno's Auto Services",
  owner: 'Johnathan "Johno" Gowrie',
  tagline: "We Get You Road Ready!",
  location: "Diego Martin, Trinidad & Tobago",
  locality: "Diego Martin",
  phoneDisplay: "+1 (868) 485-9600",
  phoneHref: "tel:+18684859600",
  whatsapp: "18684859600",
  whatsappHref:
    "https://wa.me/18684859600?text=Hi%2C%20I%27m%20interested%20in%20Johno%27s%20Auto%20Services",
  email: "johnosautoservice@hotmail.com",
  hours: "Open 24 hours, Monday to Sunday",
  hoursShort: "Open 24/7",
  visitNote: "Call or WhatsApp before visiting",
  rating: 5.0,
  instagram: "https://www.instagram.com/johnosautoservices/",
  facebook: "https://www.facebook.com/p/Johnos-Auto-Services-100068103550555/",
};

export const stats = {
  // PLACEHOLDER: confirm real years in business with Johno.
  yearsActive: 10,
  // PLACEHOLDER: confirm real number of customers served.
  clientsServed: 1500,
};

export const services = [
  {
    id: "mechanical",
    title: "General Mechanical Repairs",
    short: "Mechanical repairs",
    copy: "Engine and mechanical diagnosis and repair, for everyday faults and roadside emergencies alike.",
    includes: ["Engine diagnosis", "Mechanical repair", "Emergency call-outs"],
    icon: "wrench",
    image: "mechanical",
  },
  {
    id: "servicing",
    title: "Full Vehicle Servicing",
    short: "Full servicing",
    copy: "A proper service, done to schedule, so small problems never become big ones.",
    includes: ["Engine oil & filter", "Transmission oil", "Air filter", "Brake fluid"],
    icon: "gauge",
    image: "servicing",
  },
  {
    id: "electrical",
    title: "Auto Electrical",
    short: "Auto electrical",
    copy: "Electrical troubleshooting and wiring repair, traced to the fault instead of guessed at.",
    includes: ["Fault tracing", "Wiring repair"],
    icon: "zap",
    image: "electrical",
  },
  {
    id: "painting",
    title: "Painting",
    short: "Paint & body",
    copy: "Automotive bodywork and paint that brings a tired panel back to factory finish.",
    includes: ["Bodywork", "Panel painting"],
    icon: "spray",
    image: "painting",
  },
  {
    id: "detailing",
    title: "Auto Detailing",
    short: "Detailing",
    copy: "Deep clean to paint correction. Your car leaves looking the way it should.",
    includes: ["Deep wash", "One-step polish", "Paint correction", "Headlight restoration"],
    icon: "sparkles",
    image: "detailing",
  },
];

export const reasons = [
  {
    icon: "message",
    title: "Explained in plain English",
    copy: "You hear what's wrong, what it takes to fix, and why, before any work starts. No jargon, no surprises on the bill.",
  },
  {
    icon: "clock",
    title: "Open 24/7 for emergencies",
    copy: "Breakdowns don't keep office hours. Call at 2am and you'll reach someone who can help.",
  },
  {
    icon: "layers",
    title: "One roof, every job",
    copy: "Mechanical, electrical, paint and detailing in one place. One call, one shop, one person accountable.",
  },
  {
    icon: "user",
    title: "Owner-run, by Johno himself",
    copy: "The name on the sign is the person looking after your car. That's the whole point.",
  },
];

// PLACEHOLDER testimonials: written around themes from real Google reviews
// (clear explanations, honesty, passion for the work). Replace with verbatim
// reviews + reviewer names (with permission) before launch.
export const testimonials = [
  {
    quote:
      "Johno walked me through exactly what was wrong before he touched anything. First mechanic I've used who actually explains things so they make sense.",
    name: "Kevin R.", // PLACEHOLDER
    detail: "Mechanical repair", // PLACEHOLDER
  },
  {
    quote:
      "Broke down late on a Sunday and he picked up. Honest about the cost, and the car has been perfect since.",
    name: "Alana M.", // PLACEHOLDER
    detail: "Emergency repair", // PLACEHOLDER
  },
  {
    quote:
      "You can tell he loves the work. The detailing brought my paint back to life. It looks better than when I bought it.",
    name: "Darren S.", // PLACEHOLDER
    detail: "Auto detailing", // PLACEHOLDER
  },
];

export const nav = [
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];
