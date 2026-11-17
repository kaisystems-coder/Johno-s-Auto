/*
  Every photo on the page lives here, so swapping stock for Johno's own
  workshop photos later is a one-file change.

  All are Unsplash stock, each one opened and checked by eye on a contact
  sheet before use; alt text describes what is actually in the frame.
*/
import blur from "./blur.json";

const u = (id) => `https://images.unsplash.com/photo-${id}`;

export const images = {
  hero: {
    src: u("1567808291548-fc3ee04dbcf0"),
    alt: "Black sports car parked under strip lights in a dark workshop",
    blur: blur.hero,
  },
  mechanical: {
    src: u("1615906655593-ad0386982a0f"),
    alt: "Mechanic leaning into an engine bay with a work light",
    blur: blur.mechanical,
  },
  servicing: {
    src: u("1487754180451-c456f719a1fc"),
    alt: "Fresh motor oil being poured into an engine",
    blur: blur.servicing,
  },
  electrical: {
    src: u("1632733711679-529326f6db12"),
    alt: "Technician testing a car's fuse and relay box",
    blur: blur.electrical,
  },
  painting: {
    src: u("1674632917616-051b4d6970e3"),
    alt: "Gloved hand spraying paint onto a car panel",
    blur: blur.painting,
  },
  detailing: {
    src: u("1780558852670-3f49298ecc1f"),
    alt: "Orbital polisher working across a dark blue bonnet",
    blur: blur.detailing,
  },
  about: {
    src: u("1619642751034-765dfdf7c58e"),
    alt: "Grease-marked hands turning a wrench inside an engine",
    blur: blur.about,
  },
  engineBay: {
    src: u("1781751420178-1d8467d81ff4"),
    alt: "Open engine bay with hoses and intake in view",
    blur: blur.engineBay,
  },
  waxing: {
    src: u("1708805282706-f44730b7e527"),
    alt: "Detailer hand-finishing the paint on a black car",
    blur: blur.waxing,
  },
  paintBooth: {
    src: u("1676035291793-645c307e5a4e"),
    alt: "Car masked in plastic sheeting inside a paint booth",
    blur: blur.paintBooth,
  },
  diagnostics: {
    src: u("1727893380169-4dda123e19f7"),
    alt: "Technician running a diagnostic scan on a laptop from the driver's seat",
    blur: blur.diagnostics,
  },
  headlight: {
    src: u("1730742298439-6d82f9edc3c2"),
    alt: "Crisp LED headlight glowing in the dark",
    blur: blur.headlight,
  },
  workshop: {
    src: u("1786489283327-2fbcb441a82e"),
    alt: "Sports car with its tail lights on inside a busy repair workshop",
    blur: blur.workshop,
  },
};
