/*
  Brand motifs, redrawn from the supplied logo (brand_assets/logo.jpg).

  Swoosh: the car-roofline line art above the wordmark. Coordinates were
  traced from an upscaled crop of the logo (viewBox = logo pixels 190..1070 x
  340..510, halved). Lime roof + spoiler, white body lines, as in the mark.

  ShutterWheel: the camera-shutter "O" in JOHNO'S. Six blades are drawn as
  lines tangent to a central hexagon, which reads the same as the logo's
  aperture at every size.
*/

export const SWOOSH_LIME = [
  // roofline (the long lime arc)
  "M240 102 C 300 62, 400 22, 505 21 C 620 20, 720 60, 795 88",
];

export const SWOOSH_WHITE = [
  // hood line
  "M12 150 C 50 124, 130 108, 236 104",
  // belt line, long and sharp
  "M34 150 C 70 132, 140 122, 230 116 L 500 106",
  // glasshouse
  "M284 101 C 340 70, 410 44, 480 42 C 545 40, 600 52, 626 64",
  "M627 65 L 598 86",
  "M284 103 L 338 103",
  // rear haunch to boot lid
  "M512 141 C 570 118, 610 103, 660 100 L 860 99",
];

export const SPOILER = "M796 108 L 864 101 L 834 126 Z";

/**
 * Static or CSS-drawn swoosh. `draw` adds the stroke-draw keyframes with a
 * stagger; reduced-motion CSS shows it fully drawn.
 */
export function Swoosh({
  className = "",
  draw = false,
  delay = 0,
  limeWidth = 5,
  whiteWidth = 2.6,
  limeOpacity = 1,
  whiteOpacity = 1,
  title,
}) {
  const lineProps = (i) =>
    draw
      ? { className: "draw-line", style: { "--d": `${delay + i * 120}ms` }, pathLength: 1 }
      : {};

  return (
    <svg
      viewBox="0 0 880 170"
      fill="none"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        stroke="#FFFFFF"
        strokeWidth={whiteWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={whiteOpacity}
      >
        {SWOOSH_WHITE.map((d, i) => (
          <path key={d} d={d} {...lineProps(i + 1)} />
        ))}
      </g>
      <g stroke="#B6E51B" strokeWidth={limeWidth} strokeLinecap="round" opacity={limeOpacity}>
        {SWOOSH_LIME.map((d) => (
          <path key={d} d={d} {...lineProps(0)} />
        ))}
      </g>
      <path
        d={SPOILER}
        fill="#B6E51B"
        opacity={limeOpacity}
        className={draw ? "anim-pop" : undefined}
        style={draw ? { "--d": `${delay + 1300}ms` } : undefined}
      />
    </svg>
  );
}

// Geometry for a 6-blade aperture in a -50..50 box.
const R = 46;
const R0 = 13;
const blades = Array.from({ length: 6 }, (_, k) => {
  const t = (k * Math.PI) / 3 + Math.PI / 12;
  const px = R0 * Math.cos(t);
  const py = R0 * Math.sin(t);
  const dx = -Math.sin(t);
  const dy = Math.cos(t);
  const a = R0 * Math.tan(Math.PI / 6);
  const run = Math.sqrt(R * R - R0 * R0);
  return {
    x1: +(px - a * dx).toFixed(2),
    y1: +(py - a * dy).toFixed(2),
    x2: +(px + run * dx).toFixed(2),
    y2: +(py + run * dy).toFixed(2),
  };
});
const hexPoints = blades.map((b) => `${b.x1},${b.y1}`).join(" ");

/**
 * variant "solid": lime disc with dark blade gaps (the logo mark).
 * variant "outline": hairline construction drawing, for large faint rings.
 */
export function ShutterWheel({
  className = "",
  variant = "solid",
  gap = "#080A0A",
  strokeWidth = 4.5,
  title,
}) {
  if (variant === "outline") {
    return (
      <svg
        viewBox="-50 -50 100 100"
        fill="none"
        className={className}
        aria-hidden="true"
        stroke="currentColor"
        strokeWidth="0.35"
      >
        <circle r="49" />
        <circle r={R} />
        <polygon points={hexPoints} />
        {blades.map((b, i) => (
          <line key={i} x1={b.x1} y1={b.y1} x2={b.x2} y2={b.y2} />
        ))}
      </svg>
    );
  }
  return (
    <svg
      viewBox="-50 -50 100 100"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <circle r={R} fill="#B6E51B" />
      <polygon points={hexPoints} fill={gap} />
      <g stroke={gap} strokeWidth={strokeWidth} strokeLinecap="butt">
        {blades.map((b, i) => (
          <line key={i} x1={b.x1} y1={b.y1} x2={b.x2} y2={b.y2} />
        ))}
      </g>
    </svg>
  );
}

/** Text + SVG fallback of the lockup, used only if the logo image fails. */
export function WordmarkFallback({ className = "" }) {
  return (
    <span className={`inline-flex flex-col items-start leading-none ${className}`}>
      <span className="text-[19px] font-medium tracking-[0.18em] text-white">
        JOHN<ShutterWheel className="mx-[1px] inline-block h-[0.82em] w-[0.82em] -translate-y-[1px]" />
        &rsquo;S
      </span>
      <span className="mt-1 text-[8.5px] font-medium tracking-[0.42em] text-lime">
        AUTO SERVICES
      </span>
    </span>
  );
}
