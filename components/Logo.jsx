"use client";

import { useState } from "react";
import Image from "next/image";
import { WordmarkFallback } from "./Brand";

/*
  The supplied logo, cut out of its black square (colour-to-alpha) so it sits
  on any dark surface without a visible box. Never recoloured or stretched:
  width/height keep the source ratio. If the file is missing, a text + SVG
  wordmark of the same lockup renders instead.
*/
const VARIANTS = {
  nav: { src: "/brand/logo-nav.png", width: 440, height: 194 },
  full: { src: "/brand/logo-full.png", width: 560, height: 301 },
};

export default function Logo({ variant = "nav", className = "", priority = false, sizes }) {
  const [failed, setFailed] = useState(false);
  const v = VARIANTS[variant];

  if (failed) return <WordmarkFallback className={className} />;

  return (
    <Image
      src={v.src}
      width={v.width}
      height={v.height}
      alt="Johno's Auto Services"
      priority={priority}
      sizes={sizes}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
